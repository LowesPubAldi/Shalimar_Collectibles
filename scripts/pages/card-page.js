const CARD_API_URL = "/api/yyh/cards";
const YGO_CARDINFO_API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const CARD_FALLBACK_DATA_URLS = [
    "data/yyh-cards-full.json",
    "data/yyh-cards.json",
    "data/yyh-cards-slice.json"
];
const YYH_PRICING_DATA_ROOT = "data/pricing/yyh";
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
const HIGH_REPRINT_CARD_NAMES = new Set([
    "blue eyes white dragon",
    "mystical space typhoon",
    "call of the haunted",
    "dark magician",
    "polymerization",
    "monster reborn",
    "cyber dragon",
    "reinforcement of the army",
    "book of moon",
    "dark magician girl",
    "dark hole",
    "swords of revealing light",
    "red eyes black dragon",
    "terraforming",
    "enemy controller",
    "mirror force",
    "foolish burial",
    "dust tornado",
    "trap hole",
    "ash blossom joyous spring",
    "compulsory evacuation device",
    "solemn judgment",
    "torrential tribute",
    "magic cylinder"
]);

const CARD_PAGE_GAME_NAV_CONFIG = {
    "Yu Yu Hakusho": {
        featureLabel: "Kings",
        featureHref: "kings.html",
        inventoryHref: "inventory.html?game=Yu%20Yu%20Hakusho",
        setsHref: "sets.html?game=Yu%20Yu%20Hakusho",
        footerMeta: "Single-card pages for the Yu Yu Hakusho inventory."
    },
    "Yu-Gi-Oh": {
        featureLabel: "Win Cons",
        featureHref: "kings.html?game=Yu-Gi-Oh&mode=wincons",
        inventoryHref: "inventory.html?game=Yu-Gi-Oh",
        setsHref: "sets.html?game=Yu-Gi-Oh",
        footerMeta: "Single-card pages for the Yu-Gi-Oh inventory."
    },
    "Pokemon": {
        featureLabel: "Starters",
        featureHref: "kings.html?game=Pokemon&mode=starters",
        inventoryHref: "inventory.html?game=Pokemon",
        setsHref: "sets.html?game=Pokemon",
        footerMeta: "Single-card pages for the Pokemon inventory."
    }
};

const DEFAULT_PRICE_STATUS = "Unpriced";
let fallbackCardsPromise = null;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
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

function normalizeForSearch(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function getSearchTokens(value) {
    const normalized = normalizeForSearch(value);
    return normalized ? normalized.split(" ").filter(Boolean) : [];
}

function normalizeFallbackCardRecord(rawCard) {
    const id = resolveFirstNonEmpty(
        rawCard.id,
        rawCard.number,
        rawCard.cardNumber,
        rawCard.card_number,
        rawCard.cardNo,
        rawCard.code,
        rawCard.cardId
    ) || "UNKNOWN";

    return {
        id,
        number: resolveFirstNonEmpty(rawCard.number, rawCard.cardNumber, rawCard.card_number, id),
        game: resolveFirstNonEmpty(rawCard.game, rawCard.gameName) || "Yu Yu Hakusho",
        set: resolveFirstNonEmpty(rawCard.set, rawCard.setName) || "Unknown Set",
        name: resolveFirstNonEmpty(rawCard.name, rawCard.cardName, rawCard.title) || "Unnamed Card",
        type: resolveFirstNonEmpty(rawCard.type, rawCard.cardType, rawCard.kind) || "Unknown Type",
        rarity: resolveFirstNonEmpty(rawCard.rarity, rawCard.rarityCode, rawCard.rarity_name) || "Unknown Rarity",
        variant: resolveFirstNonEmpty(rawCard.variant, rawCard.finish, rawCard.foil, rawCard.version) || "Standard",
        effect: resolveFirstNonEmpty(rawCard.effect, rawCard.text, rawCard.notes),
        source: resolveFirstNonEmpty(rawCard.source, "YYH catalog"),
        imageUrl: resolveFirstNonEmpty(rawCard.imageUrl, rawCard.image_url_small, rawCard.image_url, rawCard.image_url_cropped)
    };
}

function normalizeYgoCardRecord(cardPayload, setEntry) {
    const firstImage = Array.isArray(cardPayload?.card_images) ? cardPayload.card_images[0] : null;
    const setCode = resolveFirstNonEmpty(setEntry?.set_code, String(cardPayload?.id || "")) || "UNKNOWN";
    const setPrice = Number(setEntry?.set_price);

    return {
        id: setCode,
        number: setCode,
        passcode: String(cardPayload?.id || "").trim(),
        game: "Yu-Gi-Oh",
        set: resolveFirstNonEmpty(setEntry?.set_name, "Various Sets"),
        name: resolveFirstNonEmpty(cardPayload?.name, "Unnamed Card"),
        type: resolveFirstNonEmpty(cardPayload?.type, cardPayload?.race, "Unknown Type"),
        rarity: resolveFirstNonEmpty(setEntry?.set_rarity, "Unknown Rarity"),
        variant: resolveFirstNonEmpty(setEntry?.set_code, setEntry?.set_rarity, "Standard"),
        effect: resolveFirstNonEmpty(cardPayload?.desc),
        source: "YGOPRODeck API",
        imageUrl: resolveFirstNonEmpty(firstImage?.image_url, firstImage?.image_url_small, firstImage?.image_url_cropped),
        artworkCandidates: Array.isArray(cardPayload?.card_images)
            ? cardPayload.card_images.map((image) => resolveFirstNonEmpty(image?.image_url, image?.image_url_small, image?.image_url_cropped)).filter(Boolean)
            : [],
        pricing: Number.isFinite(setPrice)
            ? { priceUsd: setPrice, status: "Priced", notes: "Set print pricing from YGOPRODeck." }
            : null
    };
}

function isYgoGame(value) {
    return normalizeForSearch(value) === "yu gi oh";
}

function getCardPageNavConfig(gameName) {
    return CARD_PAGE_GAME_NAV_CONFIG[gameName] || CARD_PAGE_GAME_NAV_CONFIG["Yu Yu Hakusho"];
}

function syncCardPageNav(gameName) {
    const navConfig = getCardPageNavConfig(gameName);
    const updateLinkSet = (container) => {
        if (!(container instanceof HTMLElement)) {
            return;
        }

        const links = Array.from(container.querySelectorAll("a"));
        const inventoryLink = links.find((link) => String(link.textContent || "").trim() === "Inventory") || null;
        const setsLink = links.find((link) => String(link.textContent || "").trim() === "Sets") || null;
        const featureLink = links.find((link) => {
            const text = String(link.textContent || "").trim();
            return text === "Kings" || text === "Win Cons" || text === "Starters";
        }) || null;

        if (inventoryLink instanceof HTMLAnchorElement) {
            inventoryLink.href = navConfig.inventoryHref;
        }

        if (setsLink instanceof HTMLAnchorElement) {
            setsLink.href = navConfig.setsHref;
        }

        if (featureLink instanceof HTMLAnchorElement) {
            featureLink.textContent = navConfig.featureLabel;
            featureLink.href = navConfig.featureHref;
        }
    };

    updateLinkSet(document.getElementById("primaryNavLinks"));
    updateLinkSet(document.querySelector(".site-footer__nav"));

    const footerMeta = document.querySelector(".site-footer__meta");
    if (footerMeta instanceof HTMLElement) {
        footerMeta.textContent = navConfig.footerMeta;
    }
}

async function loadFallbackCards() {
    if (!fallbackCardsPromise) {
        fallbackCardsPromise = (async () => {
            for (const sourceUrl of CARD_FALLBACK_DATA_URLS) {
                try {
                    const response = await fetch(sourceUrl, { cache: "no-store" });
                    if (!response.ok) {
                        continue;
                    }

                    const payload = await response.json();
                    if (!Array.isArray(payload)) {
                        continue;
                    }

                    return payload.map(normalizeFallbackCardRecord);
                } catch {
                    // Keep trying fallback files until one succeeds.
                }
            }

            throw new Error("No fallback card data found.");
        })();
    }

    try {
        return await fallbackCardsPromise;
    } catch (error) {
        fallbackCardsPromise = null;
        throw error;
    }
}

function filterFallbackCards(cards, query) {
    const searchTokens = getSearchTokens(query.q);
    const game = normalizeForSearch(query.game);
    const set = normalizeForSearch(query.set);

    return cards.filter((card) => {
        if (game && normalizeForSearch(card.game) !== game) {
            return false;
        }

        if (set && normalizeForSearch(card.set) !== set) {
            return false;
        }

        if (searchTokens.length === 0) {
            return true;
        }

        const haystack = normalizeForSearch(
            `${card.name} ${card.id} ${card.number} ${card.set} ${card.type} ${card.rarity} ${card.variant} ${card.effect || ""}`
        );
        return searchTokens.every((token) => haystack.includes(token));
    });
}

function normalizeVariantLabel(variant) {
    const normalized = String(variant || "").trim().toLowerCase();
    return normalized || "standard";
}

function isStandardLikeVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return normalized === "standard" || normalized === "unlimited" || normalized === "common";
}

function isRainbowVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return normalized.includes("rainbow") || normalized.includes("spirit rare") || normalized.includes("dark rare");
}

function isDoubleRainbowVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return normalized.includes("double rainbow") || normalized.includes("dark rare");
}

function isFoilLikeVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    if (isStandardLikeVariant(normalized)) {
        return false;
    }

    return normalized.includes("foil")
        || normalized.includes("rainbow")
        || normalized.includes("lined")
        || normalized.includes("cloudy")
        || normalized.includes("jagged")
        || normalized.includes("dark rare")
        || normalized.includes("spirit rare")
        || normalized.includes("team leader")
        || normalized.includes("score stamped")
        || normalized.includes("corrected");
}

function getVariantPremiumTier(variant) {
    const normalized = normalizeVariantLabel(variant);

    if (isDoubleRainbowVariant(normalized)) {
        return "foil-ultra";
    }

    if (isRainbowVariant(normalized)) {
        return "foil-strong";
    }

    if (isFoilLikeVariant(normalized)) {
        return "foil";
    }

    return "standard";
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

    if ((normalizedVariant.includes("dark") && normalizedVariant.includes("rare")) || (normalizedVariant.includes("double") && normalizedVariant.includes("rainbow"))) {
        tokens.push("DR");
    }

    if ((normalizedVariant.includes("spirit") && normalizedVariant.includes("rare")) || (normalizedVariant.includes("single") && normalizedVariant.includes("rainbow"))) {
        tokens.push("SR");
    }

    return Array.from(new Set(tokens));
}

function resolveSpecialImageAliases(cardRecord) {
    const setName = String(cardRecord.set || "").trim();
    const cardId = String(cardRecord.id || cardRecord.number || "").trim().toUpperCase();
    const normalizedName = normalizeForSearch(cardRecord.name).replace(/\s+/g, "");
    const normalizedVariant = normalizeForSearch(cardRecord.variant).replace(/\s+/g, "");
    const aliases = [];

    const gatewayTeamBonusAliasByName = {
        teamgenkai: "TB01",
        teamichigaki: "TB02",
        teamkoenma: "TB03",
        teammasho: "TB04",
        teamrokuyukai: "TB05",
        teamsarayashki: "TB06",
        teamsensui: "TB07",
        teamstbeasts: "TB08",
        teamtoguro: "TB09",
        teamurameshi: "TB10",
        teamuraotogi: "TB11"
    };

    const darkTournamentTeamBonusAliasByName = {
        teamgenkai: "TB01",
        teamichigaki: "TB02",
        teammasho: "TB03",
        teamrokuyukai: "TB04",
        teamsarayashki: "TB05",
        teamstbeasts: "TB06",
        teamtoguro: "TB07",
        teamurameshi: "TB08",
        teamuraotogi: "TB09"
    };

    const betrayalTeamBonusAliasByName = {
        teamkuroko: "TB1",
        teammukuro: "TB2",
        teamraizen: "TB3",
        teamyomi: "TB5",
        spiritdefenseforce: "TB4"
    };

    if (setName === "Gateway") {
        const gatewayTournamentMatch = cardId.match(/^(TG|TU|TS|TR|TC)(\d+)/);
        if (gatewayTournamentMatch) {
            const tournamentNumber = gatewayTournamentMatch[2].padStart(2, "0");
            aliases.push(`T${tournamentNumber}`);
        }

        if (cardId === "TC17" || normalizedName === "viruscarriers") {
            if (normalizedVariant === "lined") {
                aliases.push("T17L");
            } else if (normalizedVariant === "cloudy") {
                aliases.push("T17C");
            } else if (normalizedVariant === "jagged") {
                aliases.push("T17J");
            } else if (normalizedVariant === "doublerainbow") {
                aliases.push("T17DR");
            } else {
                aliases.push("T17");
            }
        }

        if (cardId === "TR7" || normalizedName === "gamebattler") {
            aliases.push("T07");
        }

        if (cardId === "TR8" || normalizedName === "minigameflightshooter") {
            aliases.push("T08");
        }

        if (cardId === "TR9" || normalizedName === "minigamemasterquiz") {
            aliases.push("T09");
        }

        if (cardId === "TR10" || normalizedName === "minigametennis") {
            aliases.push("T10");
        }

        if (cardId === "TR11" || normalizedName === "recall") {
            aliases.push("T11");
        }

        if (cardId === "TR12" || normalizedName === "sensuispiritdetective") {
            aliases.push("T12");
        }

        const gatewayTeamBonusAlias = gatewayTeamBonusAliasByName[normalizedName] || "";
        if (gatewayTeamBonusAlias) {
            aliases.push(gatewayTeamBonusAlias);
        }

        if (cardId === "C35" || normalizedName === "hieiinsert") {
            aliases.push("Insert01");
        }

        if (normalizedName === "joinaleagueinsert") {
            aliases.push("Insert02");
        }
    }

    if (setName === "Dark Tournament") {
        const darkTournamentTeamBonusAlias = darkTournamentTeamBonusAliasByName[normalizedName] || "";
        if (darkTournamentTeamBonusAlias) {
            aliases.push(darkTournamentTeamBonusAlias);
        }
    }

    if (setName === "Betrayal") {
        if (cardId === "TX1" || normalizedName === "grimdetermination") {
            aliases.push("TX1");
        }

        if (cardId === "TP4" || normalizedName === "hajime") {
            aliases.push("TP4");
        }

        const betrayalTeamBonusAlias = betrayalTeamBonusAliasByName[normalizedName] || "";
        if (betrayalTeamBonusAlias) {
            aliases.push(betrayalTeamBonusAlias);
        }
    }

    if (setName === "Exile" && normalizedName === "mukuroenslavedsoul") {
        if (normalizedVariant === "topleft") {
            aliases.push("T01");
        } else if (normalizedVariant === "topright") {
            aliases.push("009");
        } else if (normalizedVariant === "bottomleft") {
            aliases.push("018");
        } else if (normalizedVariant === "bottomright") {
            aliases.push("019");
        }
    }

    if (setName === "Alliance") {
        if (normalizedName === "raizensalliance") {
            aliases.push("TB02", "Tb02", "Tb 02", "T02");
        }

        if (normalizedName === "teamkurama") {
            aliases.push("TB01", "Tb01", "Tb 01", "T01");
        }
    }

    if (setName === "Exile") {
        if (cardId === "TP3" || normalizedName === "theend") {
            aliases.push("TP3");
        }
    }

    return aliases;
}

function buildCardImageCandidates(cardRecord) {
    const setFolder = resolveImageSetFolder(cardRecord.set);
    const cardId = String(cardRecord.id || "").trim();
    const cardNumber = String(cardRecord.number || "").trim();
    const normalizedId = normalizeImageToken(cardId);
    const normalizedNumber = normalizeImageToken(cardNumber);
    const firstNumberMatch = cardId.match(/\d+/) || cardNumber.match(/\d+/) || normalizedId.match(/\d+/);
    const firstNumber = firstNumberMatch ? firstNumberMatch[0] : "";
    const paddedThreeDigitNumber = firstNumber ? firstNumber.padStart(3, "0") : "";
    const alphaPrefixMatch = cardId.match(/^[A-Za-z]+/);
    const alphaPrefix = alphaPrefixMatch ? alphaPrefixMatch[0] : "";
    const firstAlpha = alphaPrefix.charAt(0);
    const variantShortTokens = extractVariantShortTokens(cardRecord.variant);
    const primaryVariantShortToken = variantShortTokens[0] || "";
    const primaryAlias = resolveSpecialImageAliases(cardRecord)[0] || "";

    const candidateNames = [
        primaryAlias && primaryVariantShortToken ? `${primaryAlias}${primaryVariantShortToken}` : "",
        primaryAlias,
        paddedThreeDigitNumber,
        primaryVariantShortToken && paddedThreeDigitNumber ? `${paddedThreeDigitNumber}${primaryVariantShortToken}` : "",
        firstNumber,
        primaryVariantShortToken && firstNumber ? `${firstNumber}${primaryVariantShortToken}` : "",
        firstAlpha && firstNumber ? `${firstAlpha}${firstNumber}` : "",
        primaryVariantShortToken && firstAlpha && firstNumber ? `${firstAlpha}${firstNumber}${primaryVariantShortToken}` : "",
        alphaPrefix && firstNumber ? `${alphaPrefix}${firstNumber}` : "",
        primaryVariantShortToken && alphaPrefix && firstNumber ? `${alphaPrefix}${firstNumber}${primaryVariantShortToken}` : "",
        normalizedId,
        primaryVariantShortToken && normalizedId ? `${normalizedId}${primaryVariantShortToken}` : "",
        normalizedNumber,
        primaryVariantShortToken && normalizedNumber ? `${normalizedNumber}${primaryVariantShortToken}` : "",
        cardId.replace(/\s+/g, ""),
        cardNumber.replace(/\s+/g, "")
    ];

    return Array.from(new Set(candidateNames.filter(Boolean))).map((name) => `${YYH_IMAGE_ROOT}/${setFolder}/${name}.jpg`);
}

function formatCurrency(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
        return "Unpriced";
    }

    return `$${value.toFixed(2)}`;
}

function normalizePriceStatus(status) {
    const normalized = normalizeForSearch(status);
    if (normalized === "needs review") {
        return "Needs Review";
    }

    if (normalized === "priced") {
        return "Priced";
    }

    if (normalized === "unpriced") {
        return "Unpriced";
    }

    return DEFAULT_PRICE_STATUS;
}

function toMaybeNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }

    return null;
}

function normalizeQueryAliases(context) {
    const setToken = normalizeForSearch(context.setQuery);
    const idToken = normalizeForSearch(context.idQuery);

    // Legacy About page links used Exile scan token T01 for Mukuro's top-left piece.
    // Resolve that alias to the canonical catalog id so routing is deterministic.
    if (setToken === "exile" && idToken === "t01") {
        return {
            ...context,
            cardQuery: resolveFirstNonEmpty(context.cardQuery, "Mukuro, Enslaved Soul"),
            idQuery: "TG1",
            variantQuery: resolveFirstNonEmpty(context.variantQuery, "Top Left")
        };
    }

    return context;
}

function parseQueryContext() {
    const params = new URLSearchParams(window.location.search);
    const context = {
        cardQuery: resolveFirstNonEmpty(params.get("card"), params.get("q")),
        idQuery: resolveFirstNonEmpty(params.get("id"), params.get("number")),
        setQuery: resolveFirstNonEmpty(params.get("set")),
        gameQuery: resolveFirstNonEmpty(params.get("game"), "Yu Yu Hakusho"),
        variantQuery: resolveFirstNonEmpty(params.get("variant")),
        variantMode: resolveFirstNonEmpty(params.get("variantMode"))
    };

    return normalizeQueryAliases(context);
}

async function fetchCards(query) {
    if (isYgoGame(query.game)) {
        const exactName = resolveFirstNonEmpty(query.q);
        const queryId = resolveFirstNonEmpty(query.id);
        const attempts = [];

        if (exactName && query.set) {
            attempts.push({ name: exactName, cardset: query.set });
        }
        if (exactName) {
            attempts.push({ name: exactName });
            attempts.push({ fname: exactName, ...(query.set ? { cardset: query.set } : {}) });
        }
        if (/^\d+$/.test(queryId)) {
            attempts.push({ id: queryId });
        }
        if (queryId && !/^\d+$/.test(queryId)) {
            attempts.push({ fname: queryId, ...(query.set ? { cardset: query.set } : {}) });
        }

        let lastStatus = 0;
        for (const attempt of attempts) {
            const url = new URL(YGO_CARDINFO_API_URL);
            Object.entries(attempt).forEach(([key, value]) => {
                if (value) {
                    url.searchParams.set(key, value);
                }
            });

            const response = await fetch(url.toString(), { cache: "no-store" });
            if (!response.ok) {
                lastStatus = response.status;
                continue;
            }

            const payload = await response.json();
            const items = Array.isArray(payload?.data) ? payload.data : [];
            return items.flatMap((cardPayload) => {
                const setRows = Array.isArray(cardPayload?.card_sets) && cardPayload.card_sets.length > 0
                    ? cardPayload.card_sets.filter((row) => !query.set || String(row?.set_name || "").trim() === query.set)
                    : [null];
                const scopedRows = setRows.length > 0 ? setRows : [null];
                return scopedRows.map((setEntry) => normalizeYgoCardRecord(cardPayload, setEntry));
            });
        }

        throw new Error(`Failed to load Yu-Gi-Oh card data (${lastStatus || 400})`);
    }

    const url = new URL(CARD_API_URL, window.location.origin);

    if (query.game) {
        url.searchParams.set("game", query.game);
    }

    if (query.set) {
        url.searchParams.set("set", query.set);
    }

    if (query.q) {
        url.searchParams.set("q", query.q);
    }

    url.searchParams.set("limit", "5000");

    try {
        const response = await fetch(url.toString(), { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load card data (${response.status})`);
        }

        const payload = await response.json();
        return Array.isArray(payload.items) ? payload.items : [];
    } catch {
        const fallbackCards = await loadFallbackCards();
        return filterFallbackCards(fallbackCards, query);
    }
}

function scoreCardMatch(card, context) {
    const targetCard = normalizeForSearch(context.cardQuery);
    const targetId = normalizeForSearch(context.idQuery);
    const targetSet = normalizeForSearch(context.setQuery);
    const targetGame = normalizeForSearch(context.gameQuery);
    const cardName = normalizeForSearch(card.name);
    const cardId = normalizeForSearch(card.id || card.number);
    const cardSet = normalizeForSearch(card.set);
    const cardGame = normalizeForSearch(card.game);

    let score = 0;

    if (targetId && cardId === targetId) {
        score += 160;
    }

    if (targetCard) {
        if (cardName === targetCard) {
            score += 120;
        } else if (cardName.includes(targetCard) || targetCard.includes(cardName)) {
            score += 80;
        } else {
            const cardTokens = cardName.split(" ").filter(Boolean);
            const queryTokens = targetCard.split(" ").filter(Boolean);
            const overlap = queryTokens.filter((token) => cardTokens.includes(token)).length;
            score += overlap * 10;
        }
    }

    if (targetSet && cardSet === targetSet) {
        score += 30;
    }

    if (targetGame && cardGame === targetGame) {
        score += 20;
    }

    return score;
}

function pickBestCardMatch(cards, context) {
    if (!Array.isArray(cards) || cards.length === 0) {
        return null;
    }

    const scored = cards
        .map((card) => ({ card, score: scoreCardMatch(card, context) }))
        .sort((a, b) => b.score - a.score);

    return scored[0]?.card || null;
}

async function loadSetPricing(setName) {
    const setSlug = slugifySetName(setName);
    if (!setSlug) {
        return null;
    }

    const response = await fetch(`${YYH_PRICING_DATA_ROOT}/${setSlug}-pricing.json`, { cache: "no-store" });
    if (!response.ok) {
        return null;
    }

    const payload = await response.json();
    return payload && typeof payload === "object" ? payload : null;
}

function resolvePricingEntry(pricingPayload, card) {
    const items = Array.isArray(pricingPayload?.items) ? pricingPayload.items : [];
    if (items.length === 0) {
        return null;
    }

    const targetId = normalizeForSearch(card.id || card.number);
    const targetName = normalizeForSearch(card.name);
    const targetVariant = normalizeForSearch(card.variant);

    let best = null;
    let bestScore = -1;

    for (const item of items) {
        const itemId = normalizeForSearch(resolveFirstNonEmpty(item.id, item.number, item.cardNumber, item.cardId));
        const itemName = normalizeForSearch(item.name);
        const itemVariant = normalizeForSearch(item.variant);
        let score = 0;

        if (itemId && targetId && itemId === targetId) {
            score += 120;
        }
        if (itemName && targetName && itemName === targetName) {
            score += 80;
        }
        if (itemVariant && targetVariant && itemVariant === targetVariant) {
            score += 40;
        }

        if (score > bestScore) {
            best = item;
            bestScore = score;
        }
    }

    return bestScore > 0 ? best : null;
}

function buildVariantOptions(records, options = {}) {
    const byLabel = new Map();
    const normalizedCardName = normalizeForSearch(records[0]?.name);
    const isGroupedYgoCard = options.groupByRarity === true;

    if (isGroupedYgoCard) {
        const byRarity = new Map();
        records.forEach((record) => {
            const rarity = resolveFirstNonEmpty(record.rarity, "Unknown Rarity");
            const label = `${resolveFirstNonEmpty(record.set, "Various Sets")} | ${rarity} | ${resolveFirstNonEmpty(record.number, "Unknown")}`;
            if (!byRarity.has(rarity)) {
                byRarity.set(rarity, []);
            }
            if (!byRarity.get(rarity).some((variant) => variant.name === label)) {
                byRarity.get(rarity).push({
                    name: label,
                    imageCandidates: record.imageUrl ? [record.imageUrl] : buildCardImageCandidates(record),
                    artworkCandidates: record.artworkCandidates || [],
                    record
                });
            }
        });

        return Array.from(byRarity.entries()).map(([rarity, variants]) => ({
            name: rarity,
            variants,
            imageCandidates: variants[0]?.imageCandidates || [],
            artworkCandidates: variants[0]?.artworkCandidates || [],
            record: variants[0]?.record || null
        }));
    }

    for (const record of records) {
        const label = resolveFirstNonEmpty(record.variant, "Standard");
        if (byLabel.has(label)) {
            continue;
        }

        byLabel.set(label, {
            name: label,
            imageCandidates: record.imageUrl ? [record.imageUrl] : buildCardImageCandidates(record),
            record
        });
    }

    return Array.from(byLabel.values());
}

function applyImageCandidates(imageElement, candidates, altText) {
    const safeCandidates = Array.isArray(candidates) ? candidates.filter(Boolean) : [];

    if (safeCandidates.length === 0) {
        imageElement.removeAttribute("src");
        imageElement.alt = altText;
        return;
    }

    let index = 0;
    imageElement.alt = altText;
    imageElement.onerror = () => {
        index += 1;
        if (index >= safeCandidates.length) {
            imageElement.onerror = null;
            return;
        }

        imageElement.src = safeCandidates[index];
    };

    imageElement.src = safeCandidates[index];
}

function createBadge(label) {
    const span = document.createElement("span");
    span.className = "card-badge";
    span.textContent = label;
    return span;
}

function createDetailItem(label, value, valueId = "") {
    const item = document.createElement("li");
    const valueIdAttribute = valueId ? ` id="${escapeHtml(valueId)}"` : "";
    item.innerHTML = `<strong>${escapeHtml(label)}:</strong> <span${valueIdAttribute}>${escapeHtml(value)}</span>`;
    return item;
}

function createVariantTag(label) {
    const button = document.createElement("button");
    button.className = "card-variant-tag";
    button.type = "button";

    button.innerHTML = `
        <span class="card-variant-tag__name">${escapeHtml(label.name)}</span>
        <span class="card-variant-tag__preview" aria-hidden="true">
            <img src="${escapeHtml(label.image)}" alt="${escapeHtml(label.name)} card thumbnail" loading="lazy" />
            <span class="card-variant-tag__preview-name">${escapeHtml(label.name)}</span>
        </span>
    `;

    return button;
}

function createVariantControl(variant, selectedName) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card-variant-controls__button";
    button.dataset.variant = variant.name;
    button.setAttribute("aria-pressed", String(variant.name === selectedName));
    button.textContent = variant.name;
    return button;
}

function renderNotFoundState(context) {
    const cardTitle = document.getElementById("cardTitle");
    const cardIntro = document.getElementById("cardIntro");
    const cardFacts = document.getElementById("cardFacts");
    const cardDetailsList = document.getElementById("cardDetailsList");
    const cardVariantControls = document.getElementById("cardVariantControls");
    const cardVariantImage = document.getElementById("cardVariantImage");
    const cardVariantName = document.getElementById("cardVariantName");
    const cardVariantMeta = document.getElementById("cardVariantMeta");
    const cardNotes = document.getElementById("cardNotes");

    document.title = "Shalimar Collectibles | Card Not Found";
    cardTitle.textContent = "Card not found";
    cardIntro.textContent = "We could not find a matching card for this link.";
    cardFacts.innerHTML = "<li>Set: Unknown</li><li>Card number: Unknown</li><li>Type: Unknown</li><li>Rarity: Unknown</li>";
    cardDetailsList.innerHTML = "";
    cardVariantControls.innerHTML = "";
    cardVariantImage.removeAttribute("src");
    cardVariantName.textContent = "No variant";
    cardVariantMeta.textContent = "Try opening from Inventory";
    cardNotes.innerHTML = `
        <p>No records matched this request.</p>
        <p>Requested card: ${escapeHtml(context.cardQuery || "(missing)")}</p>
        <p>Requested game: ${escapeHtml(context.gameQuery || "(missing)")}</p>
    `;
}

function renderCardPage(cardContext) {
    const card = cardContext.card;
    const cardTitle = document.getElementById("cardTitle");
    const cardEyebrow = document.getElementById("cardEyebrow");
    const cardIntro = document.getElementById("cardIntro");
    const cardFacts = document.getElementById("cardFacts");
    const cardVariantsIntro = document.getElementById("cardVariantsIntro");
    const cardDetailsIntro = document.getElementById("cardDetailsIntro");
    const cardNotesIntro = document.getElementById("cardNotesIntro");
    const cardNotes = document.getElementById("cardNotes");
    const cardBadges = document.getElementById("cardBadges");
    const cardVariantControls = document.getElementById("cardVariantControls");
    const cardVariantImage = document.getElementById("cardVariantImage");
    const cardVariantName = document.getElementById("cardVariantName");
    const cardVariantMeta = document.getElementById("cardVariantMeta");
    const cardVariantStage = document.querySelector(".card-variant-stage");
    const cardPage = document.querySelector(".card-page");

    const pricing = cardContext.pricing;
    const priceValue = toMaybeNumber(pricing?.priceUsd);
    const priceText = formatCurrency(priceValue);
    const priceStatus = normalizePriceStatus(pricing?.status);

    document.title = `Shalimar Collectibles | ${card.title}`;
    cardPage.dataset.cardSlug = slugifySetName(card.name || card.id || "card");
    cardPage.classList.add("card-page--single-card");

    cardEyebrow.textContent = `${card.game} Single Card`;

    cardTitle.textContent = card.title;
    cardIntro.textContent = card.intro;
    cardFacts.innerHTML = `
        <li>Set: ${escapeHtml(card.set)}</li>
        <li>Card number: ${escapeHtml(card.cardNumber)}</li>
        <li>Type: ${escapeHtml(card.type)}</li>
        <li>Rarity: ${escapeHtml(card.rarity)}</li>
    `;
    cardVariantsIntro.textContent = "Pick the scan you want to view.";
    cardDetailsIntro.textContent = "Set, card number, type, and variant details are listed below.";
    cardNotesIntro.textContent = "Pricing and source notes for this card are shown below.";

    const details = [
        ["Set", card.set],
        ["Card number", card.cardNumber],
        ["Type", card.type],
        ["Rarity", card.rarity],
        ["Variant", card.variant],
        ["Game", card.game]
    ];

    cardBadges.innerHTML = "";
    [card.set, card.rarity, `${priceText} • ${priceStatus}`].forEach((label) => {
        cardBadges.appendChild(createBadge(label));
    });

    const detailsList = document.getElementById("cardDetailsList");
    detailsList.innerHTML = "";
    details.forEach(([label, value]) => {
        const valueId = label === "Variant" ? "cardDetailsVariantValue" : "";
        detailsList.appendChild(createDetailItem(label, value, valueId));
    });

    const cardDetailsVariantValue = document.getElementById("cardDetailsVariantValue");

    const noteLines = [];
    if (card.effect) {
        noteLines.push(`<p>Effect text: ${escapeHtml(card.effect)}</p>`);
    }
    noteLines.push(`<p>Price: ${escapeHtml(priceText)} (${escapeHtml(priceStatus)})</p>`);
    if (pricing?.notes) {
        noteLines.push(`<p>Pricing note: ${escapeHtml(pricing.notes)}</p>`);
    }
    if (card.source) {
        noteLines.push(`<p>Source: ${escapeHtml(card.source)}</p>`);
    }

    cardNotes.innerHTML = noteLines.join("");

    const variantOptions = cardContext.variantOptions;
    let selectedVariantName = cardContext.selectedVariantName;
    const isBlueEyesVariantPicker = Array.isArray(variantOptions[0]?.variants);
    const isBlueEyesWhitePicker = normalizeForSearch(card.title) === "blue eyes white dragon";
    if (isBlueEyesVariantPicker) {
        const printingCount = variantOptions.reduce((total, rarity) => total + (rarity.variants?.length || 0), 0);
        const artworkCount = variantOptions[0]?.artworkCandidates?.length || 0;
        cardVariantsIntro.textContent = `${variantOptions.length} rarities | ${printingCount} set printings | ${artworkCount} alternate artworks`;
    }
    let selectedRarityName = isBlueEyesVariantPicker
        ? (variantOptions.find((variant) => variant.name === selectedVariantName)?.name || variantOptions[0]?.name || "")
        : "";
    let selectedBlueEyesVariant = isBlueEyesVariantPicker
        ? (variantOptions[0]?.variants?.[0] || variantOptions[0])
        : null;
    const isDropdownVariantPicker = HIGH_REPRINT_CARD_NAMES.has(normalizeForSearch(card.title));

    const renderBlueEyesPrintingControls = (rarityOption) => {
        if (!isBlueEyesVariantPicker) {
            return;
        }

        let printingControls = document.getElementById("blueEyesPrintingControls");
        if (!printingControls) {
            printingControls = document.createElement("div");
            printingControls.id = "blueEyesPrintingControls";
            printingControls.className = "card-variant-controls card-variant-controls--sub";
            cardVariantControls.insertAdjacentElement("afterend", printingControls);
        }

        printingControls.innerHTML = "";
        (rarityOption?.variants || []).forEach((variant) => {
            const button = createVariantControl(variant, selectedBlueEyesVariant?.name || "");
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                renderSelectedVariant(variant.name, rarityOption.name);
            });
            printingControls.appendChild(button);
        });
    };

    const renderBlueEyesArtworkControls = (selectedVariant) => {
        if (!isBlueEyesWhitePicker) {
            return;
        }

        let artworkControls = document.getElementById("blueEyesArtworkControls");
        if (!artworkControls) {
            artworkControls = document.createElement("div");
            artworkControls.id = "blueEyesArtworkControls";
            artworkControls.className = "card-variant-controls card-variant-controls--sub";
            cardVariantControls.insertAdjacentElement("afterend", artworkControls);
        }

        artworkControls.innerHTML = "";
        const artworkCandidates = selectedVariant?.artworkCandidates || [];
        artworkCandidates.forEach((artworkUrl, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "card-variant-controls__button";
            button.dataset.artworkIndex = String(index);
            button.textContent = `Artwork ${index + 1}`;
            button.setAttribute("aria-pressed", String(index === 0));
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                artworkControls.querySelectorAll("button").forEach((control) => control.setAttribute("aria-pressed", "false"));
                button.setAttribute("aria-pressed", "true");
                applyImageCandidates(cardVariantImage, [artworkUrl], `Blue-Eyes White Dragon artwork ${index + 1}`);
            });
            artworkControls.appendChild(button);
        });
    };

    const renderSwordsControls = (rarityOption) => {
        if (!isDropdownVariantPicker) {
            return;
        }

        let swordsControls = document.getElementById("swordsVariantControls");
        if (!swordsControls) {
            swordsControls = document.createElement("div");
            swordsControls.id = "swordsVariantControls";
            swordsControls.className = "card-variant-selects";
            cardVariantControls.appendChild(swordsControls);
        }

        const printingOptions = [];
        const seenPrintingKeys = new Set();
        (rarityOption?.variants || []).forEach((variant) => {
            const printingKey = variant.record?.number || variant.name;
            if (!seenPrintingKeys.has(printingKey)) {
                seenPrintingKeys.add(printingKey);
                printingOptions.push(variant);
            }
        });
        swordsControls.innerHTML = `
            <label class="card-variant-select">
                <span>Rarity</span>
                <select id="swordsRaritySelect" aria-label="Filter ${escapeHtml(card.title)} by rarity">
                    ${variantOptions.map((option) => `<option value="${escapeHtml(option.name)}"${option.name === rarityOption?.name ? " selected" : ""}>${escapeHtml(option.name)}</option>`).join("")}
                </select>
            </label>
            <label class="card-variant-select">
                <span>Set / printing</span>
                <select id="swordsSetSelect" aria-label="Filter ${escapeHtml(card.title)} by set">
                    ${printingOptions.map((variant) => `<option value="${escapeHtml(variant.name)}"${variant.name === selectedBlueEyesVariant?.name ? " selected" : ""}>${escapeHtml(`${variant.record?.set || variant.name} | ${variant.record?.number || "Code unavailable"}`)}</option>`).join("")}
                </select>
            </label>
            ${(selectedBlueEyesVariant?.artworkCandidates || []).length > 1 ? `
                <label class="card-variant-select">
                    <span>Artwork</span>
                    <select id="blueEyesArtworkSelect" aria-label="Filter ${escapeHtml(card.title)} by artwork">
                        ${(selectedBlueEyesVariant?.artworkCandidates || []).map((artworkUrl, index) => `<option value="${index}">Artwork ${index + 1}</option>`).join("")}
                    </select>
                </label>
            ` : ""}
        `;

        const raritySelect = swordsControls.querySelector("#swordsRaritySelect");
        const setSelect = swordsControls.querySelector("#swordsSetSelect");
        raritySelect?.addEventListener("change", () => {
            const nextRarity = variantOptions.find((option) => option.name === raritySelect.value) || variantOptions[0];
            const nextVariant = nextRarity?.variants?.[0];
            if (nextVariant) {
                renderSelectedVariant(nextVariant.name, nextRarity.name);
            }
        });
        setSelect?.addEventListener("change", () => {
            renderSelectedVariant(setSelect.value, rarityOption?.name || "");
        });
        const artworkSelect = swordsControls.querySelector("#blueEyesArtworkSelect");
        artworkSelect?.addEventListener("change", () => {
            const artworkUrl = selectedBlueEyesVariant?.artworkCandidates?.[Number(artworkSelect.value)];
            if (artworkUrl) {
                applyImageCandidates(cardVariantImage, [artworkUrl], `${card.title} artwork ${Number(artworkSelect.value) + 1}`);
            }
        });
    };

    const renderSelectedVariant = (variantName, rarityName = "") => {
        let selectedVariant;
        if (isBlueEyesVariantPicker) {
            const rarityOption = variantOptions.find((variant) => variant.name === (rarityName || variantName)) || variantOptions[0];
            selectedRarityName = rarityOption.name;
            selectedVariant = rarityOption.variants.find((variant) => variant.name === variantName) || rarityOption.variants[0];
            selectedBlueEyesVariant = selectedVariant;
            selectedVariantName = selectedVariant.name;
            if (isDropdownVariantPicker) {
                renderSwordsControls(rarityOption);
            } else {
                renderBlueEyesPrintingControls(rarityOption);
                renderBlueEyesArtworkControls(selectedVariant);
            }
        } else {
            selectedVariantName = variantName;
            selectedVariant = variantOptions.find((variant) => variant.name === variantName) || variantOptions[0];
        }
        const variantPremiumTier = getVariantPremiumTier(selectedVariant.record?.variant || selectedVariant.name);

        cardVariantControls.querySelectorAll("button").forEach((button) => {
            const isActiveButton = isBlueEyesVariantPicker
                ? button.dataset.variant === selectedRarityName
                : button.dataset.variant === selectedVariantName;
            button.setAttribute("aria-pressed", String(isActiveButton));
            button.classList.toggle("card-variant-controls__button--foil-active", isActiveButton && variantPremiumTier !== "standard");
            button.classList.toggle("card-variant-controls__button--foil-strong-active", isActiveButton && variantPremiumTier === "foil-strong");
            button.classList.toggle("card-variant-controls__button--foil-ultra-active", isActiveButton && variantPremiumTier === "foil-ultra");
        });

        if (cardVariantStage) {
            cardVariantStage.classList.remove("card-variant-stage--foil", "card-variant-stage--foil-strong", "card-variant-stage--foil-ultra");

            if (variantPremiumTier === "foil") {
                cardVariantStage.classList.add("card-variant-stage--foil");
            }

            if (variantPremiumTier === "foil-strong") {
                cardVariantStage.classList.add("card-variant-stage--foil", "card-variant-stage--foil-strong");
            }

            if (variantPremiumTier === "foil-ultra") {
                cardVariantStage.classList.add("card-variant-stage--foil", "card-variant-stage--foil-strong", "card-variant-stage--foil-ultra");
            }
        }

        applyImageCandidates(cardVariantImage, selectedVariant.imageCandidates, `${selectedVariant.name} scan`);
        cardVariantName.textContent = selectedVariant.name;
        cardVariantMeta.textContent = `${selectedVariant.record?.set || card.set} | ${selectedVariant.record?.number || card.cardNumber}`;
        if (cardDetailsVariantValue) {
            cardDetailsVariantValue.textContent = selectedVariant.name;
        }
    };

    cardVariantControls.innerHTML = "";
    if (isDropdownVariantPicker) {
        renderSwordsControls(variantOptions.find((variant) => variant.name === selectedRarityName) || variantOptions[0]);
    } else {
        variantOptions.forEach((variant) => {
            const button = createVariantControl(variant, selectedVariantName);
            button.addEventListener("click", () => renderSelectedVariant(variant.name));
            cardVariantControls.appendChild(button);
        });
    }

    renderSelectedVariant(selectedVariantName);

    const backlink = document.querySelector(".card-panel__backlink");
    backlink.textContent = "Back to Inventory";
    backlink.href = `inventory.html?q=${encodeURIComponent(card.title)}&game=${encodeURIComponent(card.game)}`;
}

async function buildCardContext(context) {
    const searchText = isYgoGame(context.gameQuery)
        ? resolveFirstNonEmpty(context.cardQuery, context.idQuery)
        : resolveFirstNonEmpty(context.idQuery, context.cardQuery);
    if (!searchText) {
        return null;
    }

    let candidateCards = await fetchCards({
        q: searchText,
        id: context.idQuery,
        game: context.gameQuery,
        set: context.setQuery
    });

    if (candidateCards.length === 0 && context.setQuery) {
        candidateCards = await fetchCards({
            q: searchText,
            id: context.idQuery,
            game: context.gameQuery
        });
    }

    if (candidateCards.length === 0) {
        candidateCards = await fetchCards({ q: searchText, id: context.idQuery, game: context.gameQuery });
    }

    const selected = pickBestCardMatch(candidateCards, context);
    if (!selected) {
        return null;
    }

    const normalizedSelectedName = normalizeForSearch(selected.name);
    const isBlueEyesCard = normalizedSelectedName === "blue eyes ultimate dragon" || normalizedSelectedName === "blue eyes white dragon";
    const isHighReprintCard = HIGH_REPRINT_CARD_NAMES.has(normalizedSelectedName);
    const isGroupedYgoCard = isYgoGame(selected.game);
    const relatedCards = await fetchCards({
        q: selected.name,
        id: selected.passcode,
        game: selected.game,
        ...(isGroupedYgoCard ? {} : { set: selected.set })
    });

    const exactRelated = relatedCards.filter((card) => normalizeForSearch(card.name) === normalizeForSearch(selected.name));
    const variantBase = exactRelated.length > 0 ? exactRelated : [selected];
    const variantOptions = buildVariantOptions(variantBase, { groupByRarity: isGroupedYgoCard });
    const fallbackVariant = variantOptions[0]?.name || "Standard";
    const selectedVariantName = variantOptions.some((option) => normalizeForSearch(option.name) === normalizeForSearch(context.variantQuery))
        ? variantOptions.find((option) => normalizeForSearch(option.name) === normalizeForSearch(context.variantQuery)).name
        : fallbackVariant;

    let pricing = selected.pricing || null;
    if (!isYgoGame(selected.game)) {
        const pricingPayload = await loadSetPricing(selected.set);
        pricing = resolvePricingEntry(pricingPayload, {
            id: selected.id,
            number: selected.number,
            name: selected.name,
            variant: selectedVariantName
        });
    }

    return {
        card: {
            title: resolveFirstNonEmpty(selected.name, "Unnamed Card"),
            intro: isYgoGame(selected.game)
                ? (selected.effect ? "Card details loaded from the Yu-Gi-Oh API for this specific print." : "Card details loaded from the Yu-Gi-Oh API.")
                : (selected.effect ? "Card details loaded from the YYH catalog for this specific card." : "Card details loaded from the YYH catalog."),
            game: resolveFirstNonEmpty(selected.game, "Yu Yu Hakusho"),
            set: resolveFirstNonEmpty(selected.set, "Unknown Set"),
            cardNumber: resolveFirstNonEmpty(selected.id, selected.number, "Unknown"),
            type: resolveFirstNonEmpty(selected.type, "Unknown Type"),
            rarity: resolveFirstNonEmpty(selected.rarity, "Unknown Rarity"),
            variant: resolveFirstNonEmpty(selected.variant, "Standard"),
            source: resolveFirstNonEmpty(selected.source, isYgoGame(selected.game) ? "YGOPRODeck API" : "YYH catalog"),
            effect: resolveFirstNonEmpty(selected.effect)
        },
        pricing,
        variantOptions,
        selectedVariantName
    };
}

async function initCardPage() {
    const context = parseQueryContext();
    syncCardPageNav(context.gameQuery || "Yu Yu Hakusho");

    try {
        const cardContext = await buildCardContext(context);
        if (!cardContext) {
            renderNotFoundState(context);
            return;
        }

        renderCardPage(cardContext);
    } catch (error) {
        renderNotFoundState(context);
        const cardNotes = document.getElementById("cardNotes");
        cardNotes.innerHTML = `${cardNotes.innerHTML}<p>Load error: ${escapeHtml(error instanceof Error ? error.message : "Unknown error")}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", initCardPage);