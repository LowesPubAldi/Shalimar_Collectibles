const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env.local"), override: true });

const app = express();
const PORT = process.env.PORT || 3000;
const EBAY_CONFIG = {
    appId: process.env.EBAY_APP_ID || "",
    devId: process.env.EBAY_DEV_ID || "",
    clientSecret: process.env.EBAY_CLIENT_SECRET || "",
    environment: (process.env.EBAY_ENV || "sandbox").trim().toLowerCase() === "production" ? "production" : "sandbox",
    marketplaceId: process.env.EBAY_MARKETPLACE_ID || "EBAY-US"
};
const EBAY_SCOPES = ["https://api.ebay.com/oauth/api_scope"]; 
const EBAY_API_BASE_URLS = {
    sandbox: "https://api.sandbox.ebay.com",
    production: "https://api.ebay.com"
};
const EBAY_IDENTITY_BASE_URLS = {
    sandbox: "https://api.sandbox.ebay.com",
    production: "https://api.ebay.com"
};
const EBAY_AUTH_BASE_URLS = {
    sandbox: "https://auth.sandbox.ebay.com",
    production: "https://auth.ebay.com"
};
const EBAY_TOKEN_EXPIRY_BUFFER_MS = 60 * 1000;
const EBAY_AUTH_REDIRECT_URI = process.env.EBAY_REDIRECT_URI || "https://shalimar-collectibles-inky.vercel.app/api/ebay/auth/callback";
const EBAY_AUTH_SCOPES = (process.env.EBAY_AUTH_SCOPES || "https://api.ebay.com/oauth/api_scope").split(",").map((value) => value.trim()).filter(Boolean);
let ebayTokenCache = {
    accessToken: "",
    expiresAt: 0,
    scope: ""
};
let ebayUserTokenCache = {
    accessToken: "",
    refreshToken: "",
    expiresAt: 0,
    tokenType: "",
    scope: ""
};
const DATA_FILE_PATHS = [
    path.join(__dirname, "data", "yyh-cards-full.json"),
    path.join(__dirname, "data", "yyh-cards.json"),
    path.join(__dirname, "data", "yyh-cards-slice.json")
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, {
    etag: false,
    lastModified: false,
    setHeaders: (res, filePath) => {
        if (/\.(html|css|js)$/i.test(filePath)) {
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
            res.setHeader("Surrogate-Control", "no-store");
        }
    }
}));

// Allow the frontend to call this API even when the site is served by another local server.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

function resolveFirstNonEmpty(...values) {
    for (const value of values) {
        if (typeof value !== "string") {
            continue;
        }
        const trimmed = value.trim();
        if (trimmed) {
            return trimmed;
        }
    }

    return "";
}

function resolveCardId(rawCard) {
    return resolveFirstNonEmpty(
        rawCard.id,
        rawCard.number,
        rawCard.cardNumber,
        rawCard.card_number,
        rawCard.cardNo,
        rawCard.code,
        rawCard.cardId
    ) || "UNKNOWN";
}

function normalizeCardRecord(rawCard) {
    const id = resolveCardId(rawCard);
    return {
        id,
        number: id,
        game: resolveFirstNonEmpty(rawCard.game, rawCard.gameName) || "Yu Yu Hakusho",
        set: resolveFirstNonEmpty(rawCard.set, rawCard.setName) || "Unknown Set",
        name: resolveFirstNonEmpty(rawCard.name, rawCard.cardName, rawCard.title) || "Unnamed Card",
        type: resolveFirstNonEmpty(rawCard.type, rawCard.cardType, rawCard.kind) || "Unknown Type",
        rarity: resolveFirstNonEmpty(rawCard.rarity, rawCard.rarityCode, rawCard.rarity_name) || "Unknown Rarity",
        variant: resolveFirstNonEmpty(rawCard.variant, rawCard.finish, rawCard.foil, rawCard.version) || "Standard",
        effect: resolveFirstNonEmpty(rawCard.effect, rawCard.text, rawCard.notes)
    };
}

async function readYyhCardsFromFile(filePath) {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
        throw new Error("YYH card data file is not an array");
    }

    return parsed.map(normalizeCardRecord);
}

async function readYyhCards() {
    for (const filePath of DATA_FILE_PATHS) {
        try {
            const cards = await readYyhCardsFromFile(filePath);
            if (cards.length > 0) {
                return cards;
            }
        } catch {
            // Try the next candidate file until one is available.
        }
    }

    throw new Error("No YYH card data file found. Add data/yyh-cards-full.json, data/yyh-cards.json, or data/yyh-cards-slice.json.");
}

function applyCardFilters(cards, query) {
    const q = typeof query.q === "string"
        ? query.q.trim()
        : typeof query.search === "string"
            ? query.search.trim()
            : "";
    const searchTokens = getSearchTokens(q);
    const game = typeof query.game === "string" ? query.game.trim() : "";
    const set = typeof query.set === "string" ? query.set.trim() : "";
    const type = typeof query.type === "string" ? query.type.trim() : "";
    const rarity = typeof query.rarity === "string" ? query.rarity.trim() : "";

    return cards.filter((card) => {
        if (game && card.game !== game) {
            return false;
        }

        if (set && card.set !== set) {
            return false;
        }

        if (type && card.type !== type) {
            return false;
        }

        if (rarity && card.rarity !== rarity) {
            return false;
        }

        if (searchTokens.length === 0) {
            return true;
        }

        const haystack = normalizeForSearch(
            `${card.name} ${card.id} ${card.number || ""} ${card.set} ${card.type} ${card.rarity} ${card.variant || ""} ${card.effect || ""}`
        );
        return searchTokens.every((token) => haystack.includes(token));
    });
}

function normalizeForSearch(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function getSearchTokens(value) {
    const normalizedQuery = normalizeForSearch(value);
    if (!normalizedQuery) {
        return [];
    }

    return normalizedQuery.split(" ").filter(Boolean);
}

function parseNonNegativeInt(value, defaultValue) {
    if (value === undefined || value === null || value === "") {
        return defaultValue;
    }

    const parsed = Number.parseInt(String(value), 10);
    if (Number.isNaN(parsed) || parsed < 0) {
        return defaultValue;
    }

    return parsed;
}

function parsePositiveInt(value, defaultValue) {
    if (value === undefined || value === null || value === "") {
        return defaultValue;
    }

    const parsed = Number.parseInt(String(value), 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
        return defaultValue;
    }

    return parsed;
}

function clampLimit(value, defaultValue, maxValue) {
    const requested = parsePositiveInt(value, defaultValue);
    return Math.min(requested, maxValue);
}

function isEbayConfigured() {
    return Boolean(EBAY_CONFIG.appId && EBAY_CONFIG.devId && EBAY_CONFIG.clientSecret);
}

function getEbayApiBaseUrl() {
    return EBAY_API_BASE_URLS[EBAY_CONFIG.environment];
}

function getEbayIdentityBaseUrl() {
    return EBAY_IDENTITY_BASE_URLS[EBAY_CONFIG.environment];
}

function getEbayAuthBaseUrl() {
    return EBAY_AUTH_BASE_URLS[EBAY_CONFIG.environment];
}

function getEbayTokenUrl() {
    return `${getEbayIdentityBaseUrl()}/identity/v1/oauth2/token`;
}

function getEbayAuthorizationUrl(state, redirectUri = EBAY_AUTH_REDIRECT_URI) {
    const params = new URLSearchParams({
        client_id: EBAY_CONFIG.appId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: EBAY_AUTH_SCOPES.join(" ")
    });

    if (state) {
        params.set("state", state);
    }

    return `${getEbayAuthBaseUrl()}/oauth/authorize?${params.toString()}`;
}

function getEbayBrowseSearchUrl() {
    return `${getEbayApiBaseUrl()}/buy/browse/v1/item_summary/search`;
}

function buildEbayBasicAuthHeader() {
    const raw = `${EBAY_CONFIG.appId}:${EBAY_CONFIG.clientSecret}`;
    const encoded = Buffer.from(raw, "utf8").toString("base64");
    return `Basic ${encoded}`;
}

function tokenIsFresh() {
    return Boolean(
        ebayTokenCache.accessToken &&
        ebayTokenCache.expiresAt - Date.now() > EBAY_TOKEN_EXPIRY_BUFFER_MS
    );
}

function mapEbayError(errorPayload) {
    if (!errorPayload || typeof errorPayload !== "object") {
        return [];
    }

    if (Array.isArray(errorPayload.errors)) {
        return errorPayload.errors.map((entry) => ({
            errorId: entry.errorId,
            domain: entry.domain,
            category: entry.category,
            message: entry.message,
            longMessage: entry.longMessage,
            inputRefIds: entry.inputRefIds
        }));
    }

    return [];
}

async function fetchEbayAccessToken(forceRefresh = false) {
    if (!forceRefresh && tokenIsFresh()) {
        return ebayTokenCache.accessToken;
    }

    if (!isEbayConfigured()) {
        throw new Error("eBay credentials are missing in .env.local");
    }

    const tokenUrl = getEbayTokenUrl();
    const body = new URLSearchParams({
        grant_type: "client_credentials",
        scope: EBAY_SCOPES.join(" ")
    });

    const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            Authorization: buildEbayBasicAuthHeader(),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
    });

    let payload = null;
    try {
        payload = await tokenResponse.json();
    } catch {
        payload = null;
    }

    if (!tokenResponse.ok) {
        const mappedErrors = mapEbayError(payload);
        const topLevelMessage = payload && typeof payload.error_description === "string"
            ? payload.error_description
            : payload && typeof payload.error === "string"
                ? payload.error
                : "Unable to obtain OAuth token from eBay";

        const err = new Error(topLevelMessage);
        err.statusCode = tokenResponse.status;
        err.ebayErrors = mappedErrors;
        throw err;
    }

    const accessToken = payload && typeof payload.access_token === "string" ? payload.access_token : "";
    const expiresInSeconds = payload && Number.isFinite(payload.expires_in) ? payload.expires_in : 0;

    if (!accessToken || expiresInSeconds <= 0) {
        throw new Error("eBay OAuth response did not include a valid access token");
    }

    ebayTokenCache = {
        accessToken,
        expiresAt: Date.now() + expiresInSeconds * 1000,
        scope: payload.scope || ""
    };

    return accessToken;
}

function userTokenIsFresh() {
    return Boolean(
        ebayUserTokenCache.accessToken &&
        ebayUserTokenCache.expiresAt - Date.now() > EBAY_TOKEN_EXPIRY_BUFFER_MS
    );
}

async function exchangeEbayAuthorizationCode(code, redirectUri = EBAY_AUTH_REDIRECT_URI) {
    if (!code) {
        throw new Error("Missing authorization code from eBay callback");
    }

    const tokenUrl = getEbayTokenUrl();
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri
    });

    const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            Authorization: buildEbayBasicAuthHeader(),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
    });

    let payload = null;
    try {
        payload = await tokenResponse.json();
    } catch {
        payload = null;
    }

    if (!tokenResponse.ok) {
        const mappedErrors = mapEbayError(payload);
        const topLevelMessage = payload && typeof payload.error_description === "string"
            ? payload.error_description
            : payload && typeof payload.error === "string"
                ? payload.error
                : "Unable to exchange eBay authorization code";

        const err = new Error(topLevelMessage);
        err.statusCode = tokenResponse.status;
        err.ebayErrors = mappedErrors;
        throw err;
    }

    const accessToken = payload && typeof payload.access_token === "string" ? payload.access_token : "";
    const refreshToken = payload && typeof payload.refresh_token === "string" ? payload.refresh_token : "";
    const expiresInSeconds = payload && Number.isFinite(payload.expires_in) ? payload.expires_in : 0;

    if (!accessToken || expiresInSeconds <= 0) {
        throw new Error("eBay authorization response did not include a valid access token");
    }

    ebayUserTokenCache = {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + expiresInSeconds * 1000,
        tokenType: payload && typeof payload.token_type === "string" ? payload.token_type : "",
        scope: payload && typeof payload.scope === "string" ? payload.scope : ""
    };

    return ebayUserTokenCache;
}

function buildSearchParams(query) {
    const q = typeof query.q === "string" ? query.q.trim() : "";
    const limit = clampLimit(query.limit, 20, 200);
    const offset = parseNonNegativeInt(query.offset, 0);
    const categoryIds = typeof query.category_ids === "string" ? query.category_ids.trim() : "";
    const sort = typeof query.sort === "string" ? query.sort.trim() : "";
    const filter = typeof query.filter === "string" ? query.filter.trim() : "";

    const params = new URLSearchParams();
    if (q) {
        params.set("q", q);
    }
    params.set("limit", String(limit));
    params.set("offset", String(offset));
    if (categoryIds) {
        params.set("category_ids", categoryIds);
    }
    if (sort) {
        params.set("sort", sort);
    }
    if (filter) {
        params.set("filter", filter);
    }

    return params;
}

function normalizeBrowseItem(item) {
    return {
        itemId: item.itemId || "",
        legacyItemId: item.legacyItemId || "",
        title: item.title || "",
        condition: item.condition || "",
        imageUrl: item.image && item.image.imageUrl ? item.image.imageUrl : "",
        itemWebUrl: item.itemWebUrl || "",
        sellerUsername: item.seller && item.seller.username ? item.seller.username : "",
        currentPrice: item.price && item.price.value ? item.price.value : "",
        currentPriceCurrency: item.price && item.price.currency ? item.price.currency : "",
        itemCreationDate: item.itemCreationDate || "",
        itemEndDate: item.itemEndDate || "",
        shippingCost: item.shippingOptions && item.shippingOptions[0] && item.shippingOptions[0].shippingCost
            ? item.shippingOptions[0].shippingCost.value
            : "",
        shippingCurrency: item.shippingOptions && item.shippingOptions[0] && item.shippingOptions[0].shippingCost
            ? item.shippingOptions[0].shippingCost.currency
            : ""
    };
}

function parseUsdAmount(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    const cleaned = String(value || "").replace(/[^0-9.-]+/g, "").trim();
    if (!cleaned) {
        return null;
    }

    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
}

function decodeHtmlEntities(value) {
    return String(value || "")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&#x27;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">");
}

function stripHtml(value) {
    return decodeHtmlEntities(String(value || "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function parseDateBoundary(value, isEndBoundary = false) {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    const raw = value.trim();
    const explicit = /^\d{4}-\d{2}-\d{2}$/i.test(raw) ? `${raw}T00:00:00.000Z` : raw;
    const parsedMs = Date.parse(explicit);
    if (!Number.isFinite(parsedMs)) {
        return null;
    }

    const date = new Date(parsedMs);
    if (isEndBoundary) {
        date.setUTCHours(23, 59, 59, 999);
    } else {
        date.setUTCHours(0, 0, 0, 0);
    }

    return date;
}

function parseEbaySoldDateFromText(value) {
    const match = String(value || "").match(/Sold\s+([A-Za-z]{3}\s+\d{1,2},\s+\d{4})/i);
    if (!match) {
        return null;
    }

    const parsedMs = Date.parse(match[1]);
    if (!Number.isFinite(parsedMs)) {
        return null;
    }

    const date = new Date(parsedMs);
    date.setUTCHours(12, 0, 0, 0);
    return date;
}

function parseSoldDate(value) {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    const parsedMs = Date.parse(value.trim());
    if (!Number.isFinite(parsedMs)) {
        return parseEbaySoldDateFromText(value);
    }

    return new Date(parsedMs);
}

function itemIsInsideDateWindow(item, startDate, endDate) {
    if (!startDate && !endDate) {
        return true;
    }

    const soldDate = parseSoldDate(item && item.soldDate ? item.soldDate : "");
    if (!soldDate) {
        return false;
    }

    if (startDate && soldDate < startDate) {
        return false;
    }

    if (endDate && soldDate > endDate) {
        return false;
    }

    return true;
}

function filterItemsByDateWindow(items, startDate, endDate) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items.filter((item) => itemIsInsideDateWindow(item, startDate, endDate));
}

function median(values) {
    if (!Array.isArray(values) || values.length === 0) {
        return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

function getDefaultYyhSets() {
    return [
        "Alliance",
        "Betrayal",
        "Dark Tournament",
        "Exile",
        "Gateway",
        "Ghost Files"
    ];
}

function buildYyhSealedSearchQuery(setName) {
    return `${setName} yu yu hakusho tcg booster box sealed`;
}

function getEbayFindingCompletedUrl(query) {
    const params = new URLSearchParams({
        "OPERATION-NAME": "findCompletedItems",
        "SERVICE-VERSION": "1.13.0",
        "SECURITY-APPNAME": EBAY_CONFIG.appId,
        "RESPONSE-DATA-FORMAT": "JSON",
        "REST-PAYLOAD": "true",
        keywords: query,
        "paginationInput.entriesPerPage": "100",
        "itemFilter(0).name": "SoldItemsOnly",
        "itemFilter(0).value": "true",
        "sortOrder": "EndTimeSoonest"
    });

    return `https://svcs.ebay.com/services/search/FindingService/v1?${params.toString()}`;
}

function getEbaySoldListingsHtmlUrl(query, page = 1) {
    const params = new URLSearchParams({
        _nkw: query,
        LH_Sold: "1",
        LH_Complete: "1",
        _sop: "13",
        _ipg: "240",
        _pgn: String(Math.max(1, Number(page) || 1))
    });

    return `https://www.ebay.com/sch/i.html?${params.toString()}`;
}

function extractFindingItems(payload) {
    const responseRoot = Array.isArray(payload && payload.findCompletedItemsResponse)
        ? payload.findCompletedItemsResponse[0]
        : null;
    const searchResult = responseRoot && Array.isArray(responseRoot.searchResult)
        ? responseRoot.searchResult[0]
        : null;
    const rawItems = searchResult && Array.isArray(searchResult.item)
        ? searchResult.item
        : [];

    return rawItems.map((item) => {
        const title = Array.isArray(item.title) ? item.title[0] : "";
        const viewUrl = Array.isArray(item.viewItemURL) ? item.viewItemURL[0] : "";
        const sellingStatus = Array.isArray(item.sellingStatus) ? item.sellingStatus[0] : null;
        const currentPrice = sellingStatus && Array.isArray(sellingStatus.currentPrice)
            ? sellingStatus.currentPrice[0]
            : null;
        const listingInfo = Array.isArray(item.listingInfo) ? item.listingInfo[0] : null;
        const priceValue = currentPrice && typeof currentPrice.__value__ === "string"
            ? currentPrice.__value__
            : "";
        const currency = currentPrice && typeof currentPrice["@currencyId"] === "string"
            ? currentPrice["@currencyId"]
            : "USD";
        const soldDate = listingInfo && Array.isArray(listingInfo.endTime) && typeof listingInfo.endTime[0] === "string"
            ? listingInfo.endTime[0]
            : "";

        return {
            title,
            itemWebUrl: viewUrl,
            currentPrice: priceValue,
            currentPriceCurrency: currency,
            soldDate
        };
    });
}

function extractSoldItemsFromHtml(html) {
    const blocks = String(html || "").match(/<li[^>]*class="[^"]*\bs-item\b[^"]*"[^>]*>[\s\S]*?<\/li>/gi) || [];
    const items = [];

    for (const block of blocks) {
        const titleMatch = block.match(/class="s-item__title[^\"]*"[^>]*>([\s\S]*?)<\/[^>]+>/i);
        const linkMatch = block.match(/class="s-item__link"[^>]*href="([^"]+)"/i);
        const priceMatch = block.match(/class="s-item__price"[^>]*>([\s\S]*?)<\/span>/i);
        const soldMatch = block.match(/Sold\s+[A-Za-z]{3}\s+\d{1,2},\s+\d{4}/i);

        const title = stripHtml(titleMatch ? titleMatch[1] : "");
        if (!title || /^shop on ebay$/i.test(title)) {
            continue;
        }

        const itemWebUrl = decodeHtmlEntities(linkMatch ? linkMatch[1] : "");
        const currentPrice = stripHtml(priceMatch ? priceMatch[1] : "").replace(/^[A-Za-z]{2}\s*/i, "");
        const soldLabel = soldMatch ? soldMatch[0] : "";
        const soldDate = parseEbaySoldDateFromText(soldLabel);

        items.push({
            title,
            itemWebUrl,
            currentPrice,
            currentPriceCurrency: "USD",
            soldDate: soldDate ? soldDate.toISOString() : ""
        });
    }

    return items;
}

async function runEbayCompletedSearchViaHtml(query, options = {}) {
    const maxPages = Math.min(Math.max(parsePositiveInt(options.maxPages, 3), 1), 8);
    const allItems = [];
    let firstHref = "";

    for (let page = 1; page <= maxPages; page += 1) {
        const href = getEbaySoldListingsHtmlUrl(query, page);
        if (!firstHref) {
            firstHref = href;
        }

        const response = await fetch(href, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0",
                Accept: "text/html"
            }
        });

        if (!response.ok) {
            const err = new Error(`eBay sold listings HTML search failed (HTTP ${response.status})`);
            err.statusCode = response.status;
            throw err;
        }

        const html = await response.text();
        const pageItems = extractSoldItemsFromHtml(html);
        if (pageItems.length === 0) {
            break;
        }

        allItems.push(...pageItems);
    }

    return {
        items: allItems,
        total: allItems.length,
        href: firstHref,
        source: "ebay-sold-html"
    };
}

function normalizeTitleForFilter(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function itemLooksLikeSealedBoosterBox(item, setName) {
    const titleNorm = normalizeTitleForFilter(item.title);
    const setTokens = normalizeTitleForFilter(setName).split(" ").filter(Boolean);

    const includesSet = setTokens.every((token) => titleNorm.includes(token));
    const includesCoreTerms =
        titleNorm.includes("booster") &&
        titleNorm.includes("box") &&
        titleNorm.includes("yu") &&
        titleNorm.includes("hakusho") &&
        titleNorm.includes("sealed");

    const excludedTerms = [
        "pack",
        "blister",
        "lot",
        "case",
        "starter",
        "deck",
        "single",
        "wrapper",
        "empty",
        "box only",
        "just the box"
    ];
    const hasExcludedTerm = excludedTerms.some((term) => titleNorm.includes(term));

    return includesSet && includesCoreTerms && !hasExcludedTerm;
}

function itemLooksLikeSingleCard(item, setName) {
    const titleNorm = normalizeTitleForFilter(item.title);
    const setTokens = normalizeTitleForFilter(setName).split(" ").filter(Boolean);

    const includesSet = setTokens.every((token) => titleNorm.includes(token));
    const includesCoreTerms =
        titleNorm.includes("yu") &&
        titleNorm.includes("hakusho") &&
        titleNorm.includes("tcg");

    const excludedTerms = [
        "booster",
        "box",
        "pack",
        "blister",
        "starter",
        "deck",
        "display",
        "case",
        "sealed",
        "lot",
        "binder",
        "collection",
        "playset",
        "set of",
        "factory",
        "empty"
    ];
    const hasExcludedTerm = excludedTerms.some((term) => titleNorm.includes(term));

    return includesSet && includesCoreTerms && !hasExcludedTerm;
}

function splitCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];

        if (char === '"') {
            const next = line[i + 1];
            if (inQuotes && next === '"') {
                current += '"';
                i += 1;
                continue;
            }

            inQuotes = !inQuotes;
            continue;
        }

        if (char === "," && !inQuotes) {
            cells.push(current.trim());
            current = "";
            continue;
        }

        current += char;
    }

    cells.push(current.trim());
    return cells;
}

function parseCsvRows(rawCsv) {
    const lines = String(rawCsv || "").split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (lines.length < 2) {
        return [];
    }

    const headers = splitCsvLine(lines[0]).map((cell) => normalizeForSearch(cell));
    return lines.slice(1).map((line) => {
        const values = splitCsvLine(line);
        const row = {};
        for (let index = 0; index < headers.length; index += 1) {
            row[headers[index]] = values[index] || "";
        }
        return row;
    });
}

function resolveCsvPath(csvPathInput) {
    const csvPath = typeof csvPathInput === "string" ? csvPathInput.trim() : "";
    if (!csvPath) {
        return "";
    }

    const resolved = path.resolve(__dirname, csvPath);
    if (!resolved.startsWith(__dirname)) {
        throw new Error("csv_path must stay inside the project workspace");
    }

    return resolved;
}

function normalizeLocalSoldCsvRow(row) {
    const title = row.title || row["item title"] || row.name || "";
    const soldPrice = row["sold price"] || row.price || row.amount || "";
    const soldDateRaw = row.date || row["sold date"] || row["end date"] || "";
    const parsedDate = parseDateBoundary(soldDateRaw, false);

    return {
        title: String(title || "").trim(),
        itemWebUrl: "",
        currentPrice: String(soldPrice || "").trim(),
        currentPriceCurrency: "USD",
        soldDate: parsedDate ? parsedDate.toISOString() : ""
    };
}

async function runEbayCompletedSearchViaLocalCsv(csvPathInput) {
    const csvPath = resolveCsvPath(csvPathInput);
    if (!csvPath) {
        throw new Error("Missing csv_path for local completed-listings fallback");
    }

    const raw = await fs.readFile(csvPath, "utf8");
    const rows = parseCsvRows(raw);
    const items = rows.map(normalizeLocalSoldCsvRow).filter((item) => item.title);

    return {
        items,
        total: items.length,
        href: csvPath,
        source: "local-sold-csv"
    };
}

async function runEbayCompletedSearch(query, options = {}) {
    if (options.localCsvPath) {
        return runEbayCompletedSearchViaLocalCsv(options.localCsvPath);
    }

    if (!EBAY_CONFIG.appId) {
        throw new Error("Missing EBAY_APP_ID in .env.local");
    }

    const url = getEbayFindingCompletedUrl(query);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    let payload = null;
    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        if (response.status === 418 || response.status === 403) {
            return runEbayCompletedSearchViaHtml(query, options);
        }

        const err = new Error(`eBay completed listings search failed (HTTP ${response.status})`);
        err.statusCode = response.status;
        throw err;
    }

    const items = extractFindingItems(payload);

    return {
        items,
        total: items.length,
        href: url,
        source: "ebay-completed"
    };
}

async function fetchYyhSetSealedPrice(setName, options = {}) {
    const query = buildYyhSealedSearchQuery(setName);
    let searchResult;

    try {
        searchResult = await runEbayCompletedSearch(query, options);
    } catch (error) {
        if (options.localCsvPath) {
            throw error;
        }

        searchResult = await runEbayBrowseSealedSearch(setName, options);
    }

    const startDate = options.startDate || null;
    const endDate = options.endDate || null;
    const dateScopedItems = searchResult.source === "ebay-browse-live"
        ? searchResult.items
        : filterItemsByDateWindow(searchResult.items, startDate, endDate);

    const filteredItems = dateScopedItems.filter((item) => itemLooksLikeSealedBoosterBox(item, setName));

    const priceCandidates = [];
    let currency = "USD";

    for (const item of filteredItems) {
        const parsedPrice = parseUsdAmount(item.currentPrice);
        if (parsedPrice === null) {
            continue;
        }

        priceCandidates.push(parsedPrice);
        if (item.currentPriceCurrency) {
            currency = item.currentPriceCurrency;
        }
    }

    const medianPrice = median(priceCandidates);

    return {
        set: setName,
        query,
        sampleCount: priceCandidates.length,
        medianPrice,
        currency,
        source: searchResult.source || "ebay-completed",
        inspectedCount: dateScopedItems.length,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null
    };
}

function itemHasDateInsideWindow(item, startDate, endDate, candidateFields) {
    if (!startDate && !endDate) {
        return true;
    }

    for (const fieldName of candidateFields) {
        const parsed = parseSoldDate(item && item[fieldName] ? item[fieldName] : "");
        if (!parsed) {
            continue;
        }

        if (startDate && parsed < startDate) {
            continue;
        }

        if (endDate && parsed > endDate) {
            continue;
        }

        return true;
    }

    return false;
}

async function runEbayBrowseSealedSearch(setName, options = {}) {
    const startDate = options.startDate || null;
    const endDate = options.endDate || null;
    const query = buildYyhSealedSearchQuery(setName);
    const perPage = 200;
    const maxPages = Math.min(Math.max(parsePositiveInt(options.maxPages, 3), 1), 6);
    const matched = [];

    for (let page = 0; page < maxPages; page += 1) {
        const result = await runEbayBrowseSearch({
            q: query,
            limit: String(perPage),
            offset: String(page * perPage),
            sort: "newlyListed"
        });

        if (!Array.isArray(result.items) || result.items.length === 0) {
            break;
        }

        for (const item of result.items) {
            if (!itemLooksLikeSealedBoosterBox(item, setName)) {
                continue;
            }

            if (!itemHasDateInsideWindow(item, startDate, endDate, ["itemCreationDate", "itemEndDate"])) {
                continue;
            }

            matched.push(item);
        }

        if (result.items.length < perPage) {
            break;
        }
    }

    return {
        items: matched,
        total: matched.length,
        href: `${getEbayBrowseSearchUrl()}?q=${encodeURIComponent(query)}`,
        source: "ebay-browse-live"
    };
}

function average(values) {
    if (!Array.isArray(values) || values.length === 0) {
        return null;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
}

function buildYyhSinglesSearchQuery(setName) {
    return `${setName} yu yu hakusho tcg`;
}

async function runEbayBrowseSinglesSearch(setName, options = {}) {
    const startDate = options.startDate || null;
    const endDate = options.endDate || null;
    const query = buildYyhSinglesSearchQuery(setName);
    const perPage = 200;
    const maxPages = Math.min(Math.max(parsePositiveInt(options.maxPages, 3), 1), 6);
    const matched = [];

    for (let page = 0; page < maxPages; page += 1) {
        const result = await runEbayBrowseSearch({
            q: query,
            limit: String(perPage),
            offset: String(page * perPage),
            sort: "newlyListed"
        });

        if (!Array.isArray(result.items) || result.items.length === 0) {
            break;
        }

        for (const item of result.items) {
            if (!itemLooksLikeSingleCard(item, setName)) {
                continue;
            }

            if (!itemHasDateInsideWindow(item, startDate, endDate, ["itemCreationDate", "itemEndDate"])) {
                continue;
            }

            matched.push(item);
        }

        if (result.items.length < perPage) {
            break;
        }
    }

    return {
        items: matched,
        total: matched.length,
        href: `${getEbayBrowseSearchUrl()}?q=${encodeURIComponent(query)}`,
        source: "ebay-browse-live"
    };
}

async function fetchYyhSetSinglesPrice(setName, options = {}) {
    const query = buildYyhSinglesSearchQuery(setName);
    const searchResult = await runEbayBrowseSinglesSearch(setName, options);

    const prices = [];
    let currency = "USD";

    for (const item of searchResult.items) {
        const parsed = parseUsdAmount(item.currentPrice);
        if (parsed === null) {
            continue;
        }

        prices.push(parsed);
        if (item.currentPriceCurrency) {
            currency = item.currentPriceCurrency;
        }
    }

    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : null;

    return {
        set: setName,
        query,
        sampleCount: prices.length,
        medianPrice: median(prices),
        averagePrice: average(prices),
        minPrice,
        maxPrice,
        currency,
        source: searchResult.source,
        inspectedCount: searchResult.items.length,
        startDate: options.startDate ? options.startDate.toISOString() : null,
        endDate: options.endDate ? options.endDate.toISOString() : null
    };
}

async function runEbayBrowseSearch(reqQuery) {
    const accessToken = await fetchEbayAccessToken();
    const params = buildSearchParams(reqQuery);
    const searchUrl = `${getEbayBrowseSearchUrl()}?${params.toString()}`;

    const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-EBAY-C-MARKETPLACE-ID": EBAY_CONFIG.marketplaceId,
            "Content-Type": "application/json"
        }
    });

    let payload = null;
    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        const mappedErrors = mapEbayError(payload);
        const topLevelMessage = payload && typeof payload.message === "string"
            ? payload.message
            : "eBay browse search failed";
        const err = new Error(topLevelMessage);
        err.statusCode = response.status;
        err.ebayErrors = mappedErrors;
        throw err;
    }

    const rawItems = Array.isArray(payload && payload.itemSummaries) ? payload.itemSummaries : [];

    return {
        href: payload && payload.href ? payload.href : "",
        total: Number.isFinite(payload && payload.total) ? payload.total : rawItems.length,
        limit: Number.isFinite(payload && payload.limit) ? payload.limit : rawItems.length,
        offset: Number.isFinite(payload && payload.offset) ? payload.offset : 0,
        next: payload && payload.next ? payload.next : "",
        items: rawItems.map(normalizeBrowseItem)
    };
}

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "shalimar-cards-api",
        ebayConfigured: isEbayConfigured(),
        ebayEnvironment: EBAY_CONFIG.environment,
        ebayMarketplaceId: EBAY_CONFIG.marketplaceId,
        timestamp: new Date().toISOString()
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "shalimar-cards-api",
        ebayConfigured: isEbayConfigured(),
        ebayEnvironment: EBAY_CONFIG.environment,
        ebayMarketplaceId: EBAY_CONFIG.marketplaceId,
        timestamp: new Date().toISOString()
    });
});

app.get("/api/ebay/auth/start", (req, res) => {
    if (!isEbayConfigured()) {
        return res.status(400).json({
            error: "eBay credentials are missing in .env.local",
            details: "Set EBAY_APP_ID, EBAY_DEV_ID, and EBAY_CLIENT_SECRET first"
        });
    }

    const state = typeof req.query.state === "string" && req.query.state.trim()
        ? req.query.state.trim()
        : crypto.randomUUID();
    const redirectUri = typeof req.query.redirect_uri === "string" && req.query.redirect_uri.trim()
        ? req.query.redirect_uri.trim()
        : EBAY_AUTH_REDIRECT_URI;
    const authUrl = getEbayAuthorizationUrl(state, redirectUri);

    if (req.query.redirect === "1" || req.query.redirect === "true") {
        return res.redirect(authUrl);
    }

    return res.json({
        authUrl,
        state,
        redirectUri,
        scopes: EBAY_AUTH_SCOPES
    });
});

app.get("/api/ebay/auth/callback", async (req, res) => {
    try {
        const code = typeof req.query.code === "string" ? req.query.code.trim() : "";
        const state = typeof req.query.state === "string" ? req.query.state.trim() : "";
        const error = typeof req.query.error === "string" ? req.query.error : "";
        const errorDescription = typeof req.query.error_description === "string" ? req.query.error_description : "";

        if (error) {
            return res.status(400).json({
                error: "eBay authorization failed",
                details: errorDescription || error
            });
        }

        const token = await exchangeEbayAuthorizationCode(code, EBAY_AUTH_REDIRECT_URI);
        return res.json({
            status: "ok",
            message: "eBay user token exchanged successfully",
            state,
            accessToken: token.accessToken,
            tokenType: token.tokenType,
            tokenExpiresAt: new Date(token.expiresAt).toISOString(),
            tokenScope: token.scope
        });
    } catch (error) {
        const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
        return res.status(statusCode).json({
            error: "Failed to exchange eBay authorization code",
            details: error instanceof Error ? error.message : "Unknown eBay auth error",
            ebayErrors: Array.isArray(error.ebayErrors) ? error.ebayErrors : []
        });
    }
});

app.get("/api/ebay/auth/status", (req, res) => {
    res.json({
        hasUserAccessToken: Boolean(ebayUserTokenCache.accessToken),
        tokenExpiresAt: ebayUserTokenCache.expiresAt ? new Date(ebayUserTokenCache.expiresAt).toISOString() : null,
        tokenScope: ebayUserTokenCache.scope,
        tokenType: ebayUserTokenCache.tokenType
    });
});

app.get("/api/ebay/test", async (req, res) => {
    try {
        const token = await fetchEbayAccessToken(Boolean(req.query.refresh));
        res.json({
            status: "ok",
            configured: isEbayConfigured(),
            environment: EBAY_CONFIG.environment,
            marketplaceId: EBAY_CONFIG.marketplaceId,
            hasAccessToken: Boolean(token),
            tokenExpiresAt: new Date(ebayTokenCache.expiresAt).toISOString(),
            tokenScope: ebayTokenCache.scope,
            hasUserAccessToken: Boolean(ebayUserTokenCache.accessToken),
            userTokenExpiresAt: ebayUserTokenCache.expiresAt ? new Date(ebayUserTokenCache.expiresAt).toISOString() : null
        });
    } catch (error) {
        const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
        res.status(statusCode).json({
            error: "Failed to authenticate with eBay",
            details: error instanceof Error ? error.message : "Unknown eBay auth error",
            ebayErrors: Array.isArray(error.ebayErrors) ? error.ebayErrors : []
        });
    }
});

app.get("/api/ebay/search", async (req, res) => {
    try {
        const queryValue = typeof req.query.q === "string" ? req.query.q.trim() : "";
        if (!queryValue) {
            return res.status(400).json({
                error: "Missing required query parameter",
                details: "Provide q (example: /api/ebay/search?q=yu+yuhakusho+tcg)"
            });
        }

        const result = await runEbayBrowseSearch(req.query);
        res.json(result);
    } catch (error) {
        const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
        res.status(statusCode).json({
            error: "Failed to query eBay browse API",
            details: error instanceof Error ? error.message : "Unknown eBay API error",
            ebayErrors: Array.isArray(error.ebayErrors) ? error.ebayErrors : []
        });
    }
});

app.get("/api/yyh/cards", async (req, res) => {
    try {
        const cards = await readYyhCards();
        const filteredCards = applyCardFilters(cards, req.query);
        const total = filteredCards.length;
        const limit = clampLimit(req.query.limit, total || 1, 5000);
        const offset = parseNonNegativeInt(req.query.offset, 0);
        const items = filteredCards.slice(offset, offset + limit);

        res.json({
            items,
            total,
            limit,
            offset,
            hasMore: offset + items.length < total
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown API error";
        res.status(500).json({
            error: "Failed to load YYH cards",
            details: message
        });
    }
});

app.get("/api/yyh/sets", async (req, res) => {
    try {
        const cards = await readYyhCards();
        const selectedGame = typeof req.query.game === "string" ? req.query.game.trim() : "";
        const scopedCards = selectedGame ? cards.filter((card) => card.game === selectedGame) : cards;

        const items = Array.from(new Set(scopedCards.map((card) => card.set))).sort((a, b) => a.localeCompare(b));
        res.json({
            items,
            total: items.length
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown API error";
        res.status(500).json({
            error: "Failed to load YYH sets",
            details: message
        });
    }
});

app.get("/api/yyh/sets/summary", async (req, res) => {
    try {
        const cards = await readYyhCards();
        const selectedGame = typeof req.query.game === "string" ? req.query.game.trim() : "";
        const scopedCards = selectedGame ? cards.filter((card) => card.game === selectedGame) : cards;

        const counts = new Map();
        for (const card of scopedCards) {
            const key = card.set;
            counts.set(key, (counts.get(key) || 0) + 1);
        }

        const items = Array.from(counts.entries())
            .map(([set, cardCount]) => ({ set, cardCount }))
            .sort((a, b) => a.set.localeCompare(b.set));

        res.json({
            items,
            totalSets: items.length,
            totalCards: scopedCards.length
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown API error";
        res.status(500).json({
            error: "Failed to load YYH set summary",
            details: message
        });
    }
});

app.get("/api/yyh/sets/sealed-prices", async (req, res) => {
    if (!isEbayConfigured()) {
        return res.status(400).json({
            error: "eBay credentials are missing in .env.local",
            details: "Set EBAY_APP_ID, EBAY_DEV_ID, and EBAY_CLIENT_SECRET first"
        });
    }

    try {
        const rawSets = typeof req.query.sets === "string" ? req.query.sets : "";
        const localCsvPath = typeof req.query.csv_path === "string" ? req.query.csv_path : "";
        const startDate = parseDateBoundary(typeof req.query.start_date === "string" ? req.query.start_date : "", false);
        const endDate = parseDateBoundary(typeof req.query.end_date === "string" ? req.query.end_date : "", true);
        const maxPages = clampLimit(req.query.max_pages, 3, 8);
        const requestedSets = rawSets
            ? rawSets.split(",").map((value) => value.trim()).filter(Boolean)
            : getDefaultYyhSets();

        const items = await Promise.all(requestedSets.map(async (setName) => {
            try {
                return await fetchYyhSetSealedPrice(setName, {
                    startDate,
                    endDate,
                    maxPages,
                    localCsvPath
                });
            } catch (error) {
                return {
                    set: setName,
                    query: buildYyhSealedSearchQuery(setName),
                    sampleCount: 0,
                    medianPrice: null,
                    currency: "USD",
                    source: "ebay-completed",
                    error: error instanceof Error ? error.message : "Unknown eBay API error"
                };
            }
        }));

        res.json({
            items,
            totalSets: items.length,
            source: items.some((entry) => entry.source === "local-sold-csv")
                ? "local-sold-csv"
                : items.some((entry) => entry.source === "ebay-sold-html")
                    ? "ebay-sold-html"
                    : items.some((entry) => entry.source === "ebay-browse-live")
                        ? "ebay-browse-live"
                    : "ebay-completed",
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            csvPath: localCsvPath || null,
            maxPages,
            fetchedAt: new Date().toISOString()
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown API error";
        res.status(500).json({
            error: "Failed to load YYH sealed set prices",
            details: message
        });
    }
});

app.get("/api/yyh/sets/singles-prices", async (req, res) => {
    if (!isEbayConfigured()) {
        return res.status(400).json({
            error: "eBay credentials are missing in .env.local",
            details: "Set EBAY_APP_ID, EBAY_DEV_ID, and EBAY_CLIENT_SECRET first"
        });
    }

    try {
        const rawSets = typeof req.query.sets === "string" ? req.query.sets : "";
        const startDate = parseDateBoundary(typeof req.query.start_date === "string" ? req.query.start_date : "", false);
        const endDate = parseDateBoundary(typeof req.query.end_date === "string" ? req.query.end_date : "", true);
        const maxPages = clampLimit(req.query.max_pages, 3, 6);
        const includeOneOfs = req.query.include_one_ofs === "1" || req.query.include_one_ofs === "true";
        const minComps = includeOneOfs ? 1 : clampLimit(req.query.min_comps, 2, 50);
        const requestedSets = rawSets
            ? rawSets.split(",").map((value) => value.trim()).filter(Boolean)
            : getDefaultYyhSets();

        const items = await Promise.all(requestedSets.map(async (setName) => {
            try {
                return await fetchYyhSetSinglesPrice(setName, {
                    startDate,
                    endDate,
                    maxPages
                });
            } catch (error) {
                return {
                    set: setName,
                    query: buildYyhSinglesSearchQuery(setName),
                    sampleCount: 0,
                    medianPrice: null,
                    averagePrice: null,
                    minPrice: null,
                    maxPrice: null,
                    currency: "USD",
                    source: "ebay-browse-live",
                    error: error instanceof Error ? error.message : "Unknown eBay API error"
                };
            }
        }));

        const filteredItems = items.filter((entry) => Number(entry.sampleCount || 0) >= minComps);

        res.json({
            items: filteredItems,
            totalSets: filteredItems.length,
            source: "ebay-browse-live",
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            minComps,
            includeOneOfs,
            droppedSetCount: items.length - filteredItems.length,
            maxPages,
            fetchedAt: new Date().toISOString()
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown API error";
        res.status(500).json({
            error: "Failed to load YYH singles set prices",
            details: message
        });
    }
});

if (require.main === module) {
    app.listen(PORT, "127.0.0.1", () => {
        console.log(`Shalimar API running at http://localhost:${PORT}`);
    });
}

module.exports = app;
