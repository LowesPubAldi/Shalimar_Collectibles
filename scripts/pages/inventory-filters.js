const INVENTORY_API_URL = "http://127.0.0.1:3000/api/yyh/cards";
const INVENTORY_SETS_API_URL = "http://127.0.0.1:3000/api/yyh/sets";
const INVENTORY_FALLBACK_DATA_URLS = [
    "data/yyh-cards-full.json",
    "data/yyh-cards.json",
    "data/yyh-cards-slice.json"
];
const INVENTORY_DEFAULT_OFFSET = 0;
const INVENTORY_PAGE_LIMIT = 120;
const YYH_IMAGE_ROOT = "assets/seasonal/yyh-source";
const YYH_IMAGE_SET_FOLDERS = {
    "Alliance": "alliance",
    "Betrayal": "betrayal",
    "Dark Tournament": "dark-tournament",
    "Exile": "exile",
    "Extra Cards": "extra-cards",
    "Gateway": "gateway",
    "Ghost Files": "ghost-files",
    "Pre-Release Cards": "pre-release-cards",
    "Products": "products"
};
let fallbackDataCache = null;

const FILTER_OPTIONS_BY_GAME = {
    "All Games": {
        sets: [
            "All Sets",
            "Set Placeholder 01",
            "Set Placeholder 02",
            "Set Placeholder 03",
            "Set Placeholder 04",
            "Set Placeholder 05",
            "Set Placeholder 06"
        ],
        types: ["All Types", "Character", "Technique", "Spirit", "Trainer", "Monster", "Spell", "Trap"],
        rarities: ["All Rarities", "Common", "Uncommon", "Rare", "Super Rare", "Ultra Rare"]
    },
    "Yu Yu Hakusho": {
        sets: [
            "All Sets",
            "Ghost Files",
            "Dark Tournament",
            "Exile",
            "Betrayal",
            "Alliance",
            "Gateway"
        ],
        types: ["All Types", "Character", "Technique", "Spirit", "Item", "Event"],
        rarities: [
            "All Rarities",
            "G - Ghost Rare",
            "U - Uber Rare",
            "S - Spirit Rare",
            "R - Rare (standard)",
            "C - Common",
            "F - Storm of Torment misprint marker",
            "ST - Starter Deck",
            "L - League card",
            "TG - Tournament Ghost Rare",
            "TU - Tournament Uber Rare",
            "TS - Tournament Spirit Rare",
            "TR - Tournament Rare",
            "TC - Tournament Common",
            "P - Promo",
            "TP - Tournament Promo",
            "R - Redemption (redemption card)",
            "V - Video",
            "X - Team Challenge/Box Topper",
            "SK - Skannerz",
            "TX - Texas Team Challenge",
            "No Code - Kurama, Entrapped Demon (Gateway)"
        ]
    },
    "Yu-Gi-Oh": {
        sets: [
            "All Sets",
            "YGO Set Placeholder 01",
            "YGO Set Placeholder 02",
            "YGO Set Placeholder 03",
            "YGO Set Placeholder 04",
            "YGO Set Placeholder 05",
            "YGO Set Placeholder 06"
        ],
        types: ["All Types", "Monster", "Spell", "Trap", "Fusion", "Synchro", "Xyz", "Link"],
        rarities: [
            "All Rarities",
            "Common",
            "Rare",
            "Super Rare",
            "Ultra Rare",
            "Ultimate Rare",
            "Secret Rare",
            "Ultra Secret Rare",
            "Prismatic Secret Rare",
            "Ghost Rare",
            "Gold Rare",
            "Ghost/Gold Rare",
            "Parallel Rare",
            "Starfoil Rare",
            "Mosaic Rare",
            "Shatterfoil Rare",
            "Duel Terminal Rare",
            "Duel Terminal Parallel Rare",
            "Collector's Rare",
            "Starlight Rare",
            "Quarter Century Secret Rare",
            "Millennium Rare",
            "Platinum Secret Rare",
            "Promo",
            "Tournament Pack"
        ]
    },
    "Pokemon": {
        sets: [
            "All Sets",
            "Pokemon Set Placeholder 01",
            "Pokemon Set Placeholder 02",
            "Pokemon Set Placeholder 03",
            "Pokemon Set Placeholder 04",
            "Pokemon Set Placeholder 05",
            "Pokemon Set Placeholder 06"
        ],
        types: ["All Types", "Pokemon", "Trainer", "Item", "Supporter", "Stadium", "Energy"],
        rarities: [
            "All Rarities",
            "Common",
            "Uncommon",
            "Rare",
            "Double Rare",
            "Triple Rare",
            "Illustration Rare",
            "Ultra Rare",
            "Special Illustration Rare",
            "Hyper Rare",
            "Mega Hyper Rare"
        ]
    }
};

function replaceSelectOptions(selectElement, options) {
    selectElement.innerHTML = "";
    for (const optionLabel of options) {
        const option = document.createElement("option");
        option.value = optionLabel;
        option.textContent = optionLabel;
        selectElement.appendChild(option);
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function slugifySetName(setName) {
    return String(setName || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function resolveImageSetFolder(setName) {
    return YYH_IMAGE_SET_FOLDERS[setName] || slugifySetName(setName) || "unknown-set";
}

function normalizeImageToken(value) {
    return String(value || "")
        .trim()
        .replace(/[^a-z0-9]+/gi, "");
}

function extractUsefulVariantToken(variant) {
    const normalizedVariant = String(variant || "").toLowerCase();

    if (!normalizedVariant) {
        return "";
    }

    if (normalizedVariant.includes("score") && normalizedVariant.includes("stamped")) {
        return "ScoreStamped";
    }
    if (normalizedVariant.includes("corrected")) {
        return "Corrected";
    }
    if (normalizedVariant.includes("lined")) {
        return "Lined";
    }
    if (normalizedVariant.includes("cloudy")) {
        return "Cloudy";
    }
    if (normalizedVariant.includes("jagged")) {
        return "Jagged";
    }
    if (normalizedVariant.includes("team leader") || normalizedVariant.includes("teamleader") || normalizedVariant.includes("alternate")) {
        return "TeamLeader";
    }

    const usefulWords = normalizedVariant
        .split(/[^a-z0-9]+/g)
        .filter((word) => word && !/^[0-9]+(st|nd|rd|th)?$/.test(word) && word !== "edition" && word !== "version" && word !== "standard");

    if (usefulWords.length === 0) {
        return "";
    }

    return usefulWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

function extractVariantShortTokens(variant) {
    const normalizedVariant = String(variant || "").toLowerCase();
    const tokens = [];

    if (normalizedVariant.includes("lined")) {
        tokens.push("L");
    }

    if (normalizedVariant.includes("cloudy")) {
        tokens.push("C");
    }

    if (normalizedVariant.includes("jagged")) {
        tokens.push("J");
    }

    if (normalizedVariant.includes("dark") && normalizedVariant.includes("rare")) {
        tokens.push("DR");
    }

    if (normalizedVariant.includes("double") && normalizedVariant.includes("rainbow")) {
        tokens.push("DR");
    }

    if (normalizedVariant.includes("spirit") && normalizedVariant.includes("rare")) {
        tokens.push("SR");
    }

    if (normalizedVariant.includes("single") && normalizedVariant.includes("rainbow")) {
        tokens.push("SR");
    }

    return Array.from(new Set(tokens));
}

function buildCardImageCandidates(cardRecord) {
    const setFolder = resolveImageSetFolder(cardRecord.set);
    const cardId = String(cardRecord.id || "").trim();
    const cardNumber = String(cardRecord.number || "").trim();
    const normalizedId = normalizeImageToken(cardId);
    const normalizedNumber = normalizeImageToken(cardNumber);
    const firstNumberMatch = cardId.match(/\d+/) || cardNumber.match(/\d+/) || normalizedId.match(/\d+/);
    const firstNumber = firstNumberMatch ? firstNumberMatch[0] : "";
    const alphaPrefixMatch = cardId.match(/^[A-Za-z]+/);
    const alphaPrefix = alphaPrefixMatch ? alphaPrefixMatch[0] : "";
    const firstAlpha = alphaPrefix.charAt(0);
    const variantToken = extractUsefulVariantToken(cardRecord.variant);
    const variantShortTokens = extractVariantShortTokens(cardRecord.variant);
    const primaryVariantShortToken = variantShortTokens[0] || "";
    const paddedThreeDigitNumber = firstNumber ? firstNumber.padStart(3, "0") : "";
    const paddedTwoDigitNumber = firstNumber ? firstNumber.padStart(2, "0") : "";

    const candidateNames = [
        variantToken && paddedThreeDigitNumber ? `${paddedThreeDigitNumber}${variantToken}` : "",
        variantToken && firstNumber ? `${firstNumber}${variantToken}` : "",
        variantToken && firstAlpha && firstNumber ? `${firstAlpha}${firstNumber}${variantToken}` : "",
        variantToken && alphaPrefix && firstNumber ? `${alphaPrefix}${firstNumber}${variantToken}` : "",
        variantToken && firstAlpha && paddedTwoDigitNumber ? `${firstAlpha}${paddedTwoDigitNumber}${variantToken}` : "",
        primaryVariantShortToken && paddedThreeDigitNumber ? `${paddedThreeDigitNumber}${primaryVariantShortToken}` : "",
        primaryVariantShortToken && firstNumber ? `${firstNumber}${primaryVariantShortToken}` : "",
        primaryVariantShortToken && firstAlpha && firstNumber ? `${firstAlpha}${firstNumber}${primaryVariantShortToken}` : "",
        primaryVariantShortToken && alphaPrefix && firstNumber ? `${alphaPrefix}${firstNumber}${primaryVariantShortToken}` : "",
        primaryVariantShortToken && firstAlpha && paddedTwoDigitNumber ? `${firstAlpha}${paddedTwoDigitNumber}${primaryVariantShortToken}` : "",
        variantToken && firstNumber ? `Reprint${firstNumber}${variantToken}` : "",
        primaryVariantShortToken && firstNumber ? `Reprint${firstNumber}${primaryVariantShortToken}` : "",
        firstNumber ? `Reprint${firstNumber}` : "",
        firstAlpha && firstNumber ? `${firstAlpha}${firstNumber.padStart(2, "0")}` : "",
        firstAlpha && firstNumber ? `${firstAlpha}${firstNumber}` : "",
        alphaPrefix && firstNumber ? `${alphaPrefix}${firstNumber}` : "",
        alphaPrefix && firstNumber ? `${alphaPrefix}${firstNumber.padStart(2, "0")}` : "",
        paddedThreeDigitNumber,
        variantToken && normalizedId ? `${normalizedId}${variantToken}` : "",
        variantToken && normalizedNumber ? `${normalizedNumber}${variantToken}` : "",
        primaryVariantShortToken && normalizedId ? `${normalizedId}${primaryVariantShortToken}` : "",
        primaryVariantShortToken && normalizedNumber ? `${normalizedNumber}${primaryVariantShortToken}` : "",
        normalizedId,
        normalizedNumber,
        cardId.replace(/\s+/g, ""),
        cardNumber.replace(/\s+/g, "")
    ]
        .map((value) => value.trim())
        .filter(Boolean);

    return Array.from(new Set(candidateNames)).map((name) => `${YYH_IMAGE_ROOT}/${setFolder}/${name}.jpg`);
}

function hydrateInventoryCardImages(rootElement) {
    const imageElements = rootElement.querySelectorAll("[data-inventory-card-image]");

    for (const imageElement of imageElements) {
        if (imageElement.dataset.imageHydrated === "true") {
            continue;
        }

        imageElement.dataset.imageHydrated = "true";
        const candidates = buildCardImageCandidates({
            id: imageElement.dataset.cardId || "",
            number: imageElement.dataset.cardNumber || "",
            set: imageElement.dataset.cardSet || "",
            variant: imageElement.dataset.cardVariant || ""
        });

        if (candidates.length === 0) {
            imageElement.remove();
            continue;
        }

        let candidateIndex = 0;
        const tryNextCandidate = () => {
            const nextSource = candidates[candidateIndex];
            candidateIndex += 1;

            if (!nextSource) {
                imageElement.onerror = null;
                imageElement.remove();
                return;
            }

            imageElement.src = nextSource;
        };

        imageElement.onerror = tryNextCandidate;
        tryNextCandidate();
    }
}

function makeInventoryCard(cardRecord, collisionCountMap) {
    const collisionKey = [cardRecord.name, cardRecord.set, cardRecord.variant]
        .map((value) => String(value || "").trim().toLowerCase())
        .join("||");
    const collisionCount = collisionCountMap ? collisionCountMap.get(collisionKey) || 0 : 0;
    const displayTitle = collisionCount > 1 ? `${cardRecord.name} (${cardRecord.id})` : cardRecord.name;

    return `
        <article class="inventory-card">
            <div class="inventory-card__image" aria-hidden="true">
                <img
                    class="inventory-card__image-media"
                    data-inventory-card-image="true"
                    data-card-id="${escapeHtml(cardRecord.id)}"
                    data-card-number="${escapeHtml(cardRecord.number || "") }"
                    data-card-set="${escapeHtml(cardRecord.set)}"
                    data-card-variant="${escapeHtml(cardRecord.variant || "") }"
                    alt="${escapeHtml(cardRecord.name)}"
                    decoding="async"
                />
            </div>
            <h3 class="inventory-card__title">${escapeHtml(displayTitle)}</h3>
            <p class="inventory-card__meta">${escapeHtml(cardRecord.id)} • ${escapeHtml(cardRecord.type)} • ${escapeHtml(cardRecord.rarity)}</p>
            <span class="inventory-card__tag">${escapeHtml(cardRecord.set)} • ${escapeHtml(cardRecord.variant)}</span>
        </article>
    `;
}

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

function resolveCardId(card) {
    return resolveFirstNonEmpty(
        card.id,
        card.number,
        card.cardNumber,
        card.card_number,
        card.cardNo,
        card.code,
        card.cardId
    ) || "UNKNOWN";
}

function normalizeCardRecord(card) {
    const id = resolveCardId(card);
    const name = resolveFirstNonEmpty(card.name, card.cardName, card.title) || "Unnamed Card";
    const sourceVariant = resolveFirstNonEmpty(card.variant, card.finish, card.foil, card.version) || "Standard";
    const inferredVariantMatch = name.match(/\(([^)]+)\)/);
    const inferredVariant = inferredVariantMatch ? inferredVariantMatch[1].trim() : "";
    const variant = sourceVariant === "Standard" && inferredVariant ? inferredVariant : sourceVariant;

    return {
        id,
        number: id,
        game: resolveFirstNonEmpty(card.game, card.gameName) || "Yu Yu Hakusho",
        set: resolveFirstNonEmpty(card.set, card.setName) || "Unknown Set",
        name,
        type: resolveFirstNonEmpty(card.type, card.cardType, card.kind) || "Unknown Type",
        rarity: resolveFirstNonEmpty(card.rarity, card.rarityCode, card.rarity_name) || "Unknown Rarity",
        variant
    };
}

function filterRecords(records, filterState) {
    const searchTokens = getSearchTokens(filterState.query);

    return records.filter((record) => {
        if (filterState.game !== "All Games" && record.game !== filterState.game) {
            return false;
        }

        if (filterState.set !== "All Sets" && record.set !== filterState.set) {
            return false;
        }

        if (filterState.type !== "All Types" && record.type !== filterState.type) {
            return false;
        }

        if (filterState.rarity !== "All Rarities" && record.rarity !== filterState.rarity) {
            return false;
        }

        if (searchTokens.length === 0) {
            return true;
        }

        const haystack = normalizeForSearch(
            `${record.name} ${record.id} ${record.number || ""} ${record.set} ${record.type} ${record.rarity} ${record.variant || ""} ${record.effect || ""}`
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

function updateSetOptionsForAllGames(setFilter, records) {
    const sets = Array.from(new Set(records.map((record) => record.set))).sort((a, b) => a.localeCompare(b));
    FILTER_OPTIONS_BY_GAME["All Games"].sets = ["All Sets", ...sets];
    if (setFilter) {
        replaceSelectOptions(setFilter, FILTER_OPTIONS_BY_GAME["All Games"].sets);
    }
}

function renderInventoryError(resultsGrid, resultsMeta, message) {
    resultsGrid.hidden = false;
    resultsGrid.innerHTML = `
        <article class="inventory-card">
            <div class="inventory-card__image" aria-hidden="true"></div>
            <h3 class="inventory-card__title">Inventory data unavailable</h3>
            <p class="inventory-card__meta">${message}</p>
            <span class="inventory-card__tag">YYH starter slice</span>
        </article>
    `;
    resultsMeta.textContent = "0 cards matched • data unavailable";
}

function renderGameSelectionPrompt(resultsGrid, resultsMeta) {
    resultsGrid.hidden = true;
    resultsGrid.innerHTML = "";
    resultsMeta.textContent = "Select a game to view cards.";
}

function setDependentFilterState(setFilter, typeFilter, enabled) {
    setFilter.disabled = !enabled;
    typeFilter.disabled = !enabled;
}

function getCardDisplayKey(cardRecord) {
    return [cardRecord.game, cardRecord.set, cardRecord.id, cardRecord.name]
        .map((value) => String(value || "").trim().toLowerCase())
        .join("||");
}

function countUniqueCards(records) {
    return new Set(records.map(getCardDisplayKey)).size;
}

function getCollisionKey(cardRecord) {
    return [cardRecord.name, cardRecord.set, cardRecord.variant]
        .map((value) => String(value || "").trim().toLowerCase())
        .join("||");
}

function buildCollisionCountMap(records) {
    const counts = new Map();

    for (const record of records) {
        const key = getCollisionKey(record);
        counts.set(key, (counts.get(key) || 0) + 1);
    }

    return counts;
}

function makeFilterState(searchFilter, gameFilter, setFilter, typeFilter, rarityFilter, variantsToggle) {
    return {
        query: searchFilter.value,
        game: gameFilter.value,
        set: setFilter.value,
        type: typeFilter.value,
        rarity: rarityFilter.value,
        includeVariants: Boolean(variantsToggle.checked)
    };
}

function readInitialFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
        query: params.get("q") || params.get("search") || "",
        game: params.get("game") || "",
        set: params.get("set") || "",
        type: params.get("type") || "",
        rarity: params.get("rarity") || "",
        variants: params.get("variants") || ""
    };
}

function parseCardsPayload(payload) {
    if (Array.isArray(payload)) {
        return {
            items: payload.map(normalizeCardRecord),
            total: payload.length
        };
    }

    if (!payload || !Array.isArray(payload.items)) {
        throw new Error("Invalid card payload shape");
    }

    const total = typeof payload.total === "number" ? payload.total : payload.items.length;
    return {
        items: payload.items.map(normalizeCardRecord),
        total
    };
}

function parseSetsPayload(payload) {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (!payload || !Array.isArray(payload.items)) {
        throw new Error("Invalid sets payload shape");
    }

    return payload.items;
}

async function loadFallbackData() {
    if (fallbackDataCache) {
        return fallbackDataCache;
    }

    for (const sourceUrl of INVENTORY_FALLBACK_DATA_URLS) {
        try {
            const response = await fetch(sourceUrl, { cache: "no-store" });
            if (!response.ok) {
                continue;
            }

            const records = await response.json();
            if (!Array.isArray(records)) {
                continue;
            }

            fallbackDataCache = records.map(normalizeCardRecord);
            return fallbackDataCache;
        } catch {
            // Keep trying fallback files until one succeeds.
        }
    }

    throw new Error("No fallback data file found.");
}

async function loadSetsForAllGames(records) {
    try {
        const response = await fetch(INVENTORY_SETS_API_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const items = parseSetsPayload(payload);
        return ["All Sets", ...items];
    } catch {
        const sets = Array.from(new Set(records.map((record) => record.set))).sort((a, b) => a.localeCompare(b));
        return ["All Sets", ...sets];
    }
}

function buildApiQueryString(filterState, offset = INVENTORY_DEFAULT_OFFSET) {
    const params = new URLSearchParams();
    const query = filterState.query.trim();

    if (query) {
        params.set("q", query);
    }
    if (filterState.game !== "All Games") {
        params.set("game", filterState.game);
    }
    if (filterState.set !== "All Sets") {
        params.set("set", filterState.set);
    }
    if (filterState.type !== "All Types") {
        params.set("type", filterState.type);
    }
    if (filterState.rarity !== "All Rarities") {
        params.set("rarity", filterState.rarity);
    }
    params.set("limit", String(INVENTORY_PAGE_LIMIT));
    params.set("offset", String(offset));

    return params.toString();
}

async function loadAllInventoryRecords() {
    try {
        const response = await fetch(`${INVENTORY_API_URL}?limit=5000&offset=0`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const parsed = parseCardsPayload(payload);
        return parsed.items;
    } catch {
        return loadFallbackData();
    }
}

async function loadInventoryData(filterState, offset = INVENTORY_DEFAULT_OFFSET) {
    const queryString = buildApiQueryString(filterState, offset);
    const requestUrl = queryString ? `${INVENTORY_API_URL}?${queryString}` : INVENTORY_API_URL;

    try {
        const response = await fetch(requestUrl, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const parsed = parseCardsPayload(payload);
        const hasMore = typeof payload?.hasMore === "boolean"
            ? payload.hasMore
            : offset + parsed.items.length < parsed.total;

        return {
            ...parsed,
            hasMore
        };
    } catch {
        const fallbackRecords = await loadFallbackData();
        const filteredItems = filterRecords(fallbackRecords, filterState);
        const items = filteredItems.slice(offset, offset + INVENTORY_PAGE_LIMIT);

        return {
            items,
            total: filteredItems.length,
            hasMore: offset + items.length < filteredItems.length
        };
    }
}

async function initInventoryFilters() {
    const searchFilter = document.getElementById("inventory-search-filter");
    const gameFilter = document.getElementById("inventory-game-filter");
    const setFilter = document.getElementById("inventory-set-filter");
    const typeFilter = document.getElementById("inventory-type-filter");
    const rarityFilter = document.getElementById("inventory-rarity-filter");
    const variantsToggle = document.getElementById("inventory-variants-toggle");
    const resultsMeta = document.getElementById("inventory-results-meta");
    const resultsGrid = document.getElementById("inventory-results-grid");
    const loadMoreButton = document.getElementById("inventory-load-more");
    const loadMoreProgress = document.getElementById("inventory-load-more-progress");
    const initialFilters = readInitialFiltersFromUrl();

    if (!searchFilter || !gameFilter || !setFilter || !typeFilter || !rarityFilter || !variantsToggle || !resultsMeta || !resultsGrid || !loadMoreButton || !loadMoreProgress) {
        return;
    }

    let inventoryRecords = [];
    try {
        inventoryRecords = await loadAllInventoryRecords();
    } catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown loading error";
        renderInventoryError(resultsGrid, resultsMeta, `Unable to load YYH data (${reason}).`);
        return;
    }

    const allSets = await loadSetsForAllGames(inventoryRecords);
    FILTER_OPTIONS_BY_GAME["All Games"].sets = allSets;
    FILTER_OPTIONS_BY_GAME["Yu Yu Hakusho"].sets = allSets;
    updateSetOptionsForAllGames(setFilter, inventoryRecords);

    let renderRequestId = 0;
    let cardsShown = 0;
    let fetchedCount = 0;
    let canLoadMore = false;
    let renderedCardKeys = new Set();

    const setLoadMoreProgress = (shown, total, includeVariants) => {
        loadMoreProgress.hidden = false;
        if (includeVariants) {
            loadMoreProgress.textContent = `Showing ${shown} of ${total} total entries`;
            return;
        }

        if (total > shown) {
            loadMoreProgress.textContent = `Showing ${shown} of ${total} unique cards`;
            return;
        }

        loadMoreProgress.textContent = `Showing ${shown} unique cards`;
    };

    const hideLoadMoreProgress = () => {
        loadMoreProgress.hidden = true;
        loadMoreProgress.textContent = "";
    };

    const updateLoadMoreButtonState = () => {
        if (cardsShown === 0) {
            loadMoreButton.hidden = true;
            loadMoreButton.disabled = false;
            loadMoreButton.textContent = "Load More Cards";
            return;
        }

        if (canLoadMore) {
            loadMoreButton.hidden = false;
            loadMoreButton.disabled = false;
            loadMoreButton.textContent = "Load More Cards";
            return;
        }

        loadMoreButton.hidden = false;
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = "All Cards Loaded";
    };

    const renderResults = async (append = false) => {
        const requestId = ++renderRequestId;
        const filterState = makeFilterState(searchFilter, gameFilter, setFilter, typeFilter, rarityFilter, variantsToggle);
        const offset = append ? fetchedCount : INVENTORY_DEFAULT_OFFSET;

        if (filterState.game === "All Games") {
            if (requestId !== renderRequestId) {
                return;
            }

            cardsShown = 0;
            fetchedCount = 0;
            canLoadMore = false;
            renderedCardKeys.clear();
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            updateLoadMoreButtonState();
            hideLoadMoreProgress();
            renderGameSelectionPrompt(resultsGrid, resultsMeta);
            return;
        }

        resultsGrid.hidden = false;
        if (!append) {
            cardsShown = 0;
            fetchedCount = 0;
            canLoadMore = false;
            renderedCardKeys.clear();
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            updateLoadMoreButtonState();
            hideLoadMoreProgress();
            resultsMeta.textContent = "Loading records...";
        } else {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "Loading...";
        }

        let result = { items: [], total: 0, hasMore: false };
        try {
            result = await loadInventoryData(filterState, offset);
        } catch (error) {
            if (requestId !== renderRequestId) {
                return;
            }

            canLoadMore = false;
            updateLoadMoreButtonState();
            hideLoadMoreProgress();
            const reason = error instanceof Error ? error.message : "Unknown loading error";
            renderInventoryError(resultsGrid, resultsMeta, `Unable to load YYH data (${reason}).`);
            return;
        }

        if (requestId !== renderRequestId) {
            return;
        }

        const filteredRecords = filterRecords(inventoryRecords, filterState);
        const uniqueTotal = countUniqueCards(filteredRecords);
        const collisionCountMap = buildCollisionCountMap(filteredRecords);
        const totalForDisplay = filterState.includeVariants ? result.total : uniqueTotal;

        if (!append && result.items.length === 0) {
            resultsGrid.hidden = false;
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            resultsGrid.innerHTML = `
                <article class="inventory-card">
                    <div class="inventory-card__image" aria-hidden="true"></div>
                    <h3 class="inventory-card__title">No matching cards found</h3>
                    <p class="inventory-card__meta">Try adjusting game, set, rarity, or search text.</p>
                    <span class="inventory-card__tag">YYH searchable inventory</span>
                </article>
            `;
            canLoadMore = false;
            updateLoadMoreButtonState();
            setLoadMoreProgress(0, 0, filterState.includeVariants);
            resultsMeta.textContent = "0 cards matched • YYH searchable inventory";
            return;
        }

        fetchedCount = offset + result.items.length;

        const renderedItems = [];
        for (const cardRecord of result.items) {
            if (filterState.includeVariants) {
                renderedItems.push(cardRecord);
                continue;
            }

            const displayKey = getCardDisplayKey(cardRecord);
            if (renderedCardKeys.has(displayKey)) {
                continue;
            }

            renderedCardKeys.add(displayKey);
            renderedItems.push(cardRecord);
        }

        if (append) {
            resultsGrid.insertAdjacentHTML("beforeend", renderedItems.map((cardRecord) => makeInventoryCard(cardRecord, collisionCountMap)).join(""));
            resultsGrid.classList.add("inventory-grid--thumbnail-mode");
        } else {
            resultsGrid.innerHTML = renderedItems.map((cardRecord) => makeInventoryCard(cardRecord, collisionCountMap)).join("");
        }

        cardsShown += renderedItems.length;
        canLoadMore = Boolean(result.hasMore) && cardsShown < totalForDisplay;
        updateLoadMoreButtonState();
        setLoadMoreProgress(cardsShown, totalForDisplay, filterState.includeVariants);
        hydrateInventoryCardImages(resultsGrid);
        if (filterState.includeVariants) {
            resultsMeta.textContent = `${cardsShown} of ${totalForDisplay} total entries • YYH searchable inventory`;
        } else if (totalForDisplay > cardsShown) {
            resultsMeta.textContent = `${cardsShown} unique cards shown • ${totalForDisplay} unique total • YYH searchable inventory`;
        } else {
            resultsMeta.textContent = `${cardsShown} unique cards shown • YYH searchable inventory`;
        }
    };

    const syncConditionalFilters = () => {
        const selectedGame = gameFilter.value;
        const gameOptions = FILTER_OPTIONS_BY_GAME[selectedGame] || FILTER_OPTIONS_BY_GAME["All Games"];
        const previousSet = setFilter.value;
        const previousType = typeFilter.value;
        const previousRarity = rarityFilter.value;
        const hasSelectedGame = selectedGame !== "All Games";

        replaceSelectOptions(setFilter, gameOptions.sets);
        replaceSelectOptions(typeFilter, gameOptions.types);
        replaceSelectOptions(rarityFilter, gameOptions.rarities);
        setDependentFilterState(setFilter, typeFilter, hasSelectedGame);

        if (hasSelectedGame && gameOptions.sets.includes(previousSet)) {
            setFilter.value = previousSet;
        } else if (!hasSelectedGame) {
            setFilter.value = "All Sets";
        }
        if (hasSelectedGame && gameOptions.types.includes(previousType)) {
            typeFilter.value = previousType;
        } else if (!hasSelectedGame) {
            typeFilter.value = "All Types";
        }
        if (gameOptions.rarities.includes(previousRarity)) {
            rarityFilter.value = previousRarity;
        }

        void renderResults(false);
    };

    if (initialFilters.query) {
        searchFilter.value = initialFilters.query;
    }
    if (initialFilters.game && Array.from(gameFilter.options).some((option) => option.value === initialFilters.game)) {
        gameFilter.value = initialFilters.game;
    }
    if (initialFilters.variants.toLowerCase() === "all") {
        variantsToggle.checked = true;
    }

    gameFilter.addEventListener("change", syncConditionalFilters);
    setFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    typeFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    rarityFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    searchFilter.addEventListener("input", () => {
        void renderResults(false);
    });
    variantsToggle.addEventListener("change", () => {
        void renderResults(false);
    });
    loadMoreButton.addEventListener("click", () => {
        if (!canLoadMore || loadMoreButton.disabled) {
            return;
        }

        void renderResults(true);
    });

    syncConditionalFilters();

    if (initialFilters.set && Array.from(setFilter.options).some((option) => option.value === initialFilters.set)) {
        setFilter.value = initialFilters.set;
    }
    if (initialFilters.type && Array.from(typeFilter.options).some((option) => option.value === initialFilters.type)) {
        typeFilter.value = initialFilters.type;
    }
    if (initialFilters.rarity && Array.from(rarityFilter.options).some((option) => option.value === initialFilters.rarity)) {
        rarityFilter.value = initialFilters.rarity;
    }

    void renderResults(false);
}

document.addEventListener("DOMContentLoaded", initInventoryFilters);
