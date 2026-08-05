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
    clientSecret: process.env.EBAY_CLIENT_SECRET || ""
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

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "shalimar-cards-api",
        ebayConfigured: Boolean(EBAY_CONFIG.appId && EBAY_CONFIG.devId && EBAY_CONFIG.clientSecret),
        timestamp: new Date().toISOString()
    });
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
