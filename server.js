const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env.local") });

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
const EBAY_TOKEN_EXPIRY_BUFFER_MS = 60 * 1000;
let ebayTokenCache = {
    accessToken: "",
    expiresAt: 0,
    scope: ""
};
const DATA_FILE_PATHS = [
    path.join(__dirname, "data", "yyh-cards-full.json"),
    path.join(__dirname, "data", "yyh-cards.json"),
    path.join(__dirname, "data", "yyh-cards-slice.json")
];

app.use(express.json());

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
        variant: resolveFirstNonEmpty(rawCard.variant, rawCard.finish, rawCard.foil, rawCard.version) || "Standard"
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

function getEbayTokenUrl() {
    return `${getEbayIdentityBaseUrl()}/identity/v1/oauth2/token`;
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
        shippingCost: item.shippingOptions && item.shippingOptions[0] && item.shippingOptions[0].shippingCost
            ? item.shippingOptions[0].shippingCost.value
            : "",
        shippingCurrency: item.shippingOptions && item.shippingOptions[0] && item.shippingOptions[0].shippingCost
            ? item.shippingOptions[0].shippingCost.currency
            : ""
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
            tokenScope: ebayTokenCache.scope
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

app.listen(PORT, () => {
    console.log(`Shalimar API running at http://127.0.0.1:${PORT}`);
});
