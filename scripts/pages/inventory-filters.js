const INVENTORY_API_URL = "http://127.0.0.1:3000/api/yyh/cards";
const INVENTORY_SETS_API_URL = "http://127.0.0.1:3000/api/yyh/sets";
const INVENTORY_FALLBACK_DATA_URLS = [
    "data/yyh-cards-full.json",
    "data/yyh-cards.json",
    "data/yyh-cards-slice.json"
];
const INVENTORY_DEFAULT_OFFSET = 0;
const INVENTORY_PAGE_LIMIT_DESKTOP = 120;
const INVENTORY_PAGE_LIMIT_TABLET = 72;
const INVENTORY_PAGE_LIMIT_MOBILE = 48;
const INVENTORY_PAGE_LIMIT_MOBILE_NARROW = 24;
const INVENTORY_PAGE_LIMIT_MOBILE_COMPACT = 16;
const MIN_SEARCH_CHARACTERS = 3;
const DEFAULT_SORT_OPTION = "Card Number (Low-High)";
const DEFAULT_EDITION_OPTION = "All Editions";
const DEFAULT_VARIANT_FOCUS_OPTION = "All Finishes";
const DEFAULT_PRICE_STATUS_OPTION = "All Price Statuses";
const DEFAULT_GAMEPLAY_STATUS_OPTION = "All Gameplay Statuses";
const PRICE_STATUS_UNPRICED_OPTION = "Unpriced";
const PRICE_STATUS_PRICED_OPTION = "Priced";
const PRICE_STATUS_REVIEW_OPTION = "Needs Review";
const PRICE_STATUS_OPTIONS = [
    DEFAULT_PRICE_STATUS_OPTION,
    PRICE_STATUS_UNPRICED_OPTION,
    PRICE_STATUS_PRICED_OPTION,
    PRICE_STATUS_REVIEW_OPTION
];
const GAMEPLAY_STATUS_OPTIONS = [
    DEFAULT_GAMEPLAY_STATUS_OPTION,
    "Banned",
    "Limit 1 per Deck"
];
const EDITION_UNLIMITED_OPTION = "Unlimited / Not Marked";
const EDITION_FIRST_OPTION = "1st Edition";
const EDITION_UNSPECIFIED_OPTION = "Unspecified / Likely Both";
const VARIANT_FOCUS_OPTIONS = [
    DEFAULT_VARIANT_FOCUS_OPTION,
    "Standard Only",
    "Foils Only",
    "Rainbow Only"
];
const YYH_IMAGE_ROOT = "assets/seasonal/yyh-source";
const YYH_PRICING_DATA_ROOT = "data/pricing/yyh";
const YYH_KING_SET_NOTES_URL = `${YYH_PRICING_DATA_ROOT}/king-sets-notes.json`;
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
const YYH_GAMEPLAY_STATUS_BY_CARD = {
    "bui's final strike||exile": "Banned",
    "demonic clash||exile": "Banned",
    "dragon's victory||exile": "Banned",
    "enki, the champion||alliance": "Banned",
    "psychic scalpel||alliance": "Banned",
    "rinku's rush||exile": "Banned",
    "angelic embrace||exile": "Limit 1 per Deck",
    "breaking point||exile": "Limit 1 per Deck",
    "challenge of wills||exile": "Limit 1 per Deck",
    "code||exile": "Limit 1 per Deck",
    "desu button||alliance": "Limit 1 per Deck",
    "double slash||exile": "Limit 1 per Deck",
    "humans on the hunt||gateway": "Limit 1 per Deck",
    "malefic grenade||exile": "Limit 1 per Deck",
    "malevolent influence||exile": "Limit 1 per Deck",
    "mini game, flight shooter||gateway": "Limit 1 per Deck",
    "mukuro's unforgiving glare||exile": "Limit 1 per Deck",
    "overpowered||ghost files": "Limit 1 per Deck",
    "overwhelming odds||betrayal": "Limit 1 per Deck",
    "reckless charge||exile": "Limit 1 per Deck",
    "rejected||exile": "Limit 1 per Deck",
    "rejected!||exile": "Limit 1 per Deck",
    "sacrifice of life||ghost files": "Limit 1 per Deck",
    "scatter shot||exile": "Limit 1 per Deck",
    "take me!||exile": "Limit 1 per Deck",
    "team raizen's support||exile": "Limit 1 per Deck",
    "unconsious||ghost files": "Limit 1 per Deck",
    "yusuke's fury||betrayal": "Limit 1 per Deck"
};
let fallbackDataCache = null;
let pricingDataCache = new Map();
let allYyhSetPricingCache = null;
let kingSetNotesCache = null;

function createEmptyPricingData() {
    return {
        pricingByLookupKey: new Map(),
        fallbackPricingRules: [],
        setNotes: []
    };
}

function getInventoryPageLimit() {
    if (window.innerWidth <= 420) {
        return INVENTORY_PAGE_LIMIT_MOBILE_COMPACT;
    }

    if (window.innerWidth <= 560) {
        return INVENTORY_PAGE_LIMIT_MOBILE_NARROW;
    }

    if (window.innerWidth <= 768) {
        return INVENTORY_PAGE_LIMIT_MOBILE;
    }

    if (window.innerWidth <= 1100) {
        return INVENTORY_PAGE_LIMIT_TABLET;
    }

    return INVENTORY_PAGE_LIMIT_DESKTOP;
}

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

function normalizeGameplayLookupValue(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function getGameplayStatus(cardRecord) {
    if (normalizeGameplayLookupValue(cardRecord.game) !== "yu yu hakusho") {
        return "";
    }

    const lookupKey = [cardRecord.name, cardRecord.set]
        .map(normalizeGameplayLookupValue)
        .join("||");

    return YYH_GAMEPLAY_STATUS_BY_CARD[lookupKey] || "";
}

function isLikelyCardNumberQuery(value) {
    const normalized = normalizeCardNumberForFilter(value);
    return normalized.length >= 2 && /\d/.test(normalized);
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

function resolveSpecialImageAliases(cardRecord) {
    const setName = String(cardRecord.set || "").trim();
    const cardId = String(cardRecord.id || cardRecord.number || "").trim().toUpperCase();
    const normalizedName = normalizeForSearch(cardRecord.name).replace(/\s+/g, "");
    const aliases = [];

    if (setName === "Gateway") {
        if (cardId === "C35" || normalizedName === "hieiinsert") {
            aliases.push("Insert01");
        }

        if (normalizedName === "joinaleagueinsert") {
            aliases.push("Insert02");
        }

        if (cardId === "TR8" || normalizedName === "minigameflightshooter") {
            aliases.push("T08");
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
    const alphaPrefixMatch = cardId.match(/^[A-Za-z]+/);
    const alphaPrefix = alphaPrefixMatch ? alphaPrefixMatch[0] : "";
    const firstAlpha = alphaPrefix.charAt(0);
    const variantToken = extractUsefulVariantToken(cardRecord.variant);
    const variantShortTokens = extractVariantShortTokens(cardRecord.variant);
    const primaryVariantShortToken = variantShortTokens[0] || "";
    const paddedThreeDigitNumber = firstNumber ? firstNumber.padStart(3, "0") : "";
    const paddedTwoDigitNumber = firstNumber ? firstNumber.padStart(2, "0") : "";
    const specialAliases = resolveSpecialImageAliases(cardRecord);
    const primaryAlias = specialAliases[0] || "";

    const candidateNames = [
        primaryAlias && primaryVariantShortToken ? `${primaryAlias}${primaryVariantShortToken}` : "",
        primaryAlias && variantToken ? `${primaryAlias}${variantToken}` : "",
        primaryAlias,
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
            name: imageElement.dataset.cardName || "",
            variant: imageElement.dataset.cardVariant || ""
        });

        if (candidates.length === 0) {
            imageElement.removeAttribute("src");
            continue;
        }

        let candidateIndex = 0;
        const tryNextCandidate = () => {
            const nextSource = candidates[candidateIndex];
            candidateIndex += 1;

            if (!nextSource) {
                imageElement.onerror = null;
                imageElement.removeAttribute("src");

                const retryCount = Number(imageElement.dataset.imageRetryCount || "0");
                if (retryCount < 1) {
                    imageElement.dataset.imageRetryCount = String(retryCount + 1);
                    imageElement.dataset.imageHydrated = "retry-pending";

                    window.setTimeout(() => {
                        if (!imageElement.isConnected) {
                            return;
                        }

                        imageElement.dataset.imageHydrated = "";
                        hydrateInventoryCardImages(rootElement);
                    }, 350);
                }

                return;
            }

            imageElement.src = nextSource;
        };

        imageElement.onerror = tryNextCandidate;
        tryNextCandidate();
    }
}

function isNonFoilCommonCard(cardRecord) {
    const rarity = String(cardRecord.rarity || "").toLowerCase();
    const variant = String(cardRecord.variant || "").toLowerCase();
    const isCommonRarity = rarity.startsWith("c - common") || rarity === "common";
    const looksFoil = variant.includes("foil") || variant.includes("rainbow") || variant.includes("lined") || variant.includes("cloudy") || variant.includes("jagged");
    const isStandardLike = !variant || variant === "standard" || variant === "unlimited";

    return isCommonRarity && isStandardLike && !looksFoil;
}

function isCommonRarityLabel(rarity) {
    const normalizedRarity = String(rarity || "").trim().toLowerCase();
    return normalizedRarity === "common"
        || normalizedRarity.startsWith("c - common")
        || normalizedRarity.startsWith("tc - tournament common");
}

function isTournamentCommonRarityLabel(rarity) {
    const normalizedRarity = String(rarity || "").trim().toLowerCase();
    return normalizedRarity.startsWith("tc - tournament common");
}

function normalizeVariantLabel(variant) {
    const normalized = String(variant || "").trim().toLowerCase();
    return normalized || "standard";
}

function isAlternateVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return !(normalized === "standard" || normalized === "unlimited" || normalized === "common");
}

function isStandardLikeVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return normalized === "standard" || normalized === "unlimited" || normalized === "common";
}

function isRainbowVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return normalized.includes("single rainbow") || normalized.includes("double rainbow");
}

function isDoubleRainbowVariant(variant) {
    const normalized = normalizeVariantLabel(variant);
    return normalized.includes("double rainbow");
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
        || normalized.includes("corrected")
        || isAlternateVariant(normalized);
}

function getVariantPremiumRank(variant) {
    const normalized = normalizeVariantLabel(variant);

    if (isDoubleRainbowVariant(normalized)) {
        return 6;
    }

    if (normalized.includes("single rainbow") || normalized.includes("rainbow")) {
        return 5;
    }

    if (normalized.includes("lined") || normalized.includes("cloudy") || normalized.includes("jagged")) {
        return 4;
    }

    if (isFoilLikeVariant(normalized)) {
        return 3;
    }

    if (isStandardLikeVariant(normalized)) {
        return 0;
    }

    return 1;
}

function getVariantEmphasisClass(cardRecord, familyVariantCount) {
    const variant = cardRecord.variant;
    if (!isAlternateVariant(variant) || familyVariantCount < 2) {
        return "";
    }

    if (isDoubleRainbowVariant(variant)) {
        return "inventory-card--variant-emphasis-ultra";
    }

    if (familyVariantCount >= 3 || isRainbowVariant(variant)) {
        return "inventory-card--variant-emphasis-strong";
    }

    return "inventory-card--variant-emphasis";
}

function getRarityAccentClass(cardRecord) {
    const rarity = String(cardRecord.rarity || "").toLowerCase();

    if (rarity.includes("ghost rare")) {
        return "inventory-card--rarity-ghost";
    }

    if (rarity.includes("spirit rare")) {
        return "inventory-card--rarity-spirit";
    }

    if (rarity.includes("uber rare")) {
        return "inventory-card--rarity-uber";
    }

    if (isCommonRarityLabel(rarity)) {
        return "inventory-card--rarity-common";
    }

    return "";
}

function getRarityChipData(cardRecord) {
    const rarityText = String(cardRecord.rarity || "").trim();
    const normalizedRarity = rarityText.toLowerCase();

    if (isCommonRarityLabel(normalizedRarity)) {
        return {
            label: isTournamentCommonRarityLabel(normalizedRarity) ? "TC" : "C",
            chipClass: "inventory-card__rarity-chip--common",
            ariaLabel: `${rarityText} rarity`
        };
    }

    if (normalizedRarity.includes("spirit rare")) {
        return {
            label: normalizedRarity.includes("tournament") ? "TS" : "S",
            chipClass: "inventory-card__rarity-chip--spirit",
            ariaLabel: `${rarityText} rarity`
        };
    }

    if (normalizedRarity.includes("ghost rare")) {
        return {
            label: normalizedRarity.includes("tournament") ? "TG" : "G",
            chipClass: "inventory-card__rarity-chip--ghost",
            ariaLabel: `${rarityText} rarity`
        };
    }

    if (normalizedRarity.includes("uber rare")) {
        return {
            label: normalizedRarity.includes("tournament") ? "TU" : "U",
            chipClass: "inventory-card__rarity-chip--uber",
            ariaLabel: `${rarityText} rarity`
        };
    }

    return null;
}

function getVariantFamilyKey(cardRecord) {
    return [cardRecord.set, cardRecord.id, cardRecord.name]
        .map((value) => String(value || "").trim().toLowerCase())
        .join("||");
}

function buildVariantFamilyCountMap(records) {
    const variantsByFamily = new Map();

    for (const record of records) {
        const familyKey = getVariantFamilyKey(record);
        const variantLabel = normalizeVariantLabel(record.variant);
        if (!variantsByFamily.has(familyKey)) {
            variantsByFamily.set(familyKey, new Set());
        }

        variantsByFamily.get(familyKey).add(variantLabel);
    }

    const counts = new Map();
    for (const [familyKey, variantSet] of variantsByFamily.entries()) {
        counts.set(familyKey, variantSet.size);
    }

    return counts;
}

function buildCardPageUrl(cardRecord) {
    const destination = new URL("card-template.html", window.location.href);
    const game = resolveFirstNonEmpty(cardRecord.game);
    const setName = resolveFirstNonEmpty(cardRecord.set);
    const id = resolveFirstNonEmpty(cardRecord.id, cardRecord.number);
    const name = resolveFirstNonEmpty(cardRecord.name);
    const variant = resolveFirstNonEmpty(cardRecord.variant);

    if (name) {
        destination.searchParams.set("q", name);
    }

    if (game) {
        destination.searchParams.set("game", game);
    }

    if (setName) {
        destination.searchParams.set("set", setName);
    }

    if (id) {
        destination.searchParams.set("id", id);
    }

    if (variant) {
        destination.searchParams.set("variant", variant);
    }

    return destination.toString();
}

function makeInventoryCard(cardRecord, collisionCountMap, variantFamilyCountMap, showCardIdInMeta = true, showPricing = true) {
    const collisionKey = [cardRecord.name, cardRecord.set, cardRecord.variant]
        .map((value) => String(value || "").trim().toLowerCase())
        .join("||");
    const collisionCount = collisionCountMap ? collisionCountMap.get(collisionKey) || 0 : 0;
    const displayTitle = collisionCount > 1 ? `${cardRecord.name} (${cardRecord.id})` : cardRecord.name;
    const familyKey = getVariantFamilyKey(cardRecord);
    const familyVariantCount = variantFamilyCountMap ? variantFamilyCountMap.get(familyKey) || 1 : 1;
    const cardClasses = ["inventory-card"];
    if (isNonFoilCommonCard(cardRecord)) {
        cardClasses.push("inventory-card--common-base");
    }
    const variantEmphasisClass = getVariantEmphasisClass(cardRecord, familyVariantCount);
    if (variantEmphasisClass) {
        cardClasses.push(variantEmphasisClass);
    }
    const rarityAccentClass = getRarityAccentClass(cardRecord);
    if (rarityAccentClass) {
        cardClasses.push(rarityAccentClass);
    }
    if (showPricing) {
        cardClasses.push(cardRecord.pricing && cardRecord.pricing.priceUsd !== null ? "inventory-card--priced" : "inventory-card--unpriced");
    }
    const cardClassName = cardClasses.join(" ");
    const rarityChipData = getRarityChipData(cardRecord);
    const rarityChipMarkup = rarityChipData
        ? `<span class="inventory-card__rarity-chip ${rarityChipData.chipClass}" aria-label="${escapeHtml(rarityChipData.ariaLabel)}">${escapeHtml(rarityChipData.label)}</span>`
        : "";

    const metaPieces = [cardRecord.type, cardRecord.rarity].filter(Boolean);
    if (showCardIdInMeta) {
        metaPieces.unshift(cardRecord.id);
    }

    const priceStatus = cardRecord.priceStatus || PRICE_STATUS_UNPRICED_OPTION;
    const cardPageUrl = buildCardPageUrl(cardRecord);
    const gameplayStatus = getGameplayStatus(cardRecord);
    const gameplayChipMarkup = gameplayStatus
        ? `<span class="inventory-card__gameplay-chip inventory-card__gameplay-chip--${escapeHtml(gameplayStatus === "Banned" ? "banned" : "limited")}" data-gameplay-status="Gameplay Status: ${escapeHtml(gameplayStatus)}" title="Gameplay Status: ${escapeHtml(gameplayStatus)}" aria-label="Gameplay status ${escapeHtml(gameplayStatus)}">${escapeHtml(gameplayStatus === "Banned" ? "Banned" : "Limit 1")}</span>`
        : "";

    return `
        <article class="${cardClassName}" data-price-status="${escapeHtml(priceStatus)}">
            <a class="inventory-card__link" href="${escapeHtml(cardPageUrl)}" aria-label="Open ${escapeHtml(displayTitle)} card page">
                ${rarityChipMarkup}
                ${gameplayChipMarkup}
                <div class="inventory-card__image" aria-hidden="true">
                    <img
                        class="inventory-card__image-media"
                        data-inventory-card-image="true"
                        data-card-id="${escapeHtml(cardRecord.id)}"
                        data-card-number="${escapeHtml(cardRecord.number || "") }"
                        data-card-set="${escapeHtml(cardRecord.set)}"
                        data-card-name="${escapeHtml(cardRecord.name)}"
                        data-card-variant="${escapeHtml(cardRecord.variant || "") }"
                        alt="${escapeHtml(cardRecord.name)}"
                        decoding="async"
                    />
                </div>
                <h3 class="inventory-card__title">${escapeHtml(displayTitle)}</h3>
                <p class="inventory-card__meta">${escapeHtml(metaPieces.join(" • "))}</p>
                ${showPricing ? `<p class="inventory-card__price">${escapeHtml(formatPriceLabel(cardRecord))}</p>` : ""}
                <div class="inventory-card__actions">
                    <span class="inventory-card__tag">${escapeHtml(cardRecord.set)} • ${escapeHtml(cardRecord.variant)}</span>
                </div>
            </a>
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
    const setName = resolveFirstNonEmpty(card.set, card.setName) || "Unknown Set";

    // Gateway data correction: Huh??? standard print is C56, not C57.
    let normalizedId = id;
    if (
        setName === "Gateway"
        && normalizeForSearch(name) === "huh"
        && normalizeVariantLabel(variant) === "standard"
        && String(id).trim().toUpperCase() === "C57"
    ) {
        normalizedId = "C56";
    }

    return {
        id: normalizedId,
        number: normalizedId,
        game: resolveFirstNonEmpty(card.game, card.gameName) || "Yu Yu Hakusho",
        set: setName,
        name,
        type: resolveFirstNonEmpty(card.type, card.cardType, card.kind) || "Unknown Type",
        rarity: resolveFirstNonEmpty(card.rarity, card.rarityCode, card.rarity_name) || "Unknown Rarity",
        variant,
        edition: resolveFirstNonEmpty(card.edition, card.printing)
    };
}

function resolveCardEdition(record) {
    const explicitEdition = resolveFirstNonEmpty(record.edition);
    if (explicitEdition) {
        const normalizedExplicitEdition = explicitEdition.toLowerCase();
        if (normalizedExplicitEdition.includes("1st")) {
            return EDITION_FIRST_OPTION;
        }
        if (normalizedExplicitEdition.includes("unlimited")) {
            return EDITION_UNLIMITED_OPTION;
        }
    }

    const variantText = String(record.variant || "").toLowerCase();
    const nameText = String(record.name || "").toLowerCase();
    const setText = String(record.set || "").trim();
    const cardId = String(record.id || record.number || "").trim().toUpperCase();
    const idPrefixMatch = cardId.match(/^[A-Z]+/);
    const idPrefix = idPrefixMatch ? idPrefixMatch[0] : "";
    const looksLikeInsert = nameText.includes("insert");

    if (variantText.includes("1st edition") || nameText.includes("1st edition")) {
        return EDITION_FIRST_OPTION;
    }

    if (variantText.includes("unlimited") || nameText.includes("unlimited") || variantText.includes("standard") || nameText.includes("standard") || variantText.includes("2nd edition") || nameText.includes("2nd edition")) {
        return EDITION_UNLIMITED_OPTION;
    }

    // Known standard-only exceptions from YYH community documentation.
    if (setText === "Ghost Files" && (idPrefix === "P" || idPrefix === "V")) {
        return EDITION_UNLIMITED_OPTION;
    }
    if (setText === "Dark Tournament" && looksLikeInsert) {
        return EDITION_UNLIMITED_OPTION;
    }
    if (setText === "Gateway" && nameText.includes("join a league insert")) {
        return EDITION_UNLIMITED_OPTION;
    }

    // Known first-edition-only exception.
    if (cardId === "C156/176" && (nameText.includes("corrected") || variantText.includes("corrected"))) {
        return EDITION_FIRST_OPTION;
    }

    // Promos/spirit-pack style cards are typically 1st edition outside Ghost Files, with noted exceptions.
    const firstEditionLeaningPrefixes = new Set(["P", "TP", "TC", "TR", "TS", "TU", "TG", "L", "SK", "TX", "V"]);
    if (setText !== "Ghost Files" && firstEditionLeaningPrefixes.has(idPrefix)) {
        if (setText === "Gateway" && cardId === "X0") {
            return EDITION_UNSPECIFIED_OPTION;
        }
        return EDITION_FIRST_OPTION;
    }

    return EDITION_UNSPECIFIED_OPTION;
}

function filterRecords(records, filterState) {
    const searchTokens = getSearchTokens(filterState.query);
    const rawQuery = String(filterState.query || "").trim();
    const normalizedQuery = normalizeForSearch(rawQuery);
    const cardNumberQuery = isLikelyCardNumberQuery(rawQuery)
        ? normalizeCardNumberForFilter(rawQuery)
        : "";
    const hasPunctuationQuery = /[^a-z0-9\s]/i.test(rawQuery);
    const queryTooShort = normalizedQuery.length > 0 && normalizedQuery.length < MIN_SEARCH_CHARACTERS && !cardNumberQuery;

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

        if (filterState.edition !== DEFAULT_EDITION_OPTION && resolveCardEdition(record) !== filterState.edition) {
            return false;
        }

        if (filterState.variantFocus === "Standard Only" && !isStandardLikeVariant(record.variant)) {
            return false;
        }

        if (filterState.variantFocus === "Foils Only" && !isFoilLikeVariant(record.variant)) {
            return false;
        }

        if (filterState.variantFocus === "Rainbow Only" && !isRainbowVariant(record.variant)) {
            return false;
        }

        if (filterState.priceStatus && filterState.priceStatus !== DEFAULT_PRICE_STATUS_OPTION && (record.priceStatus || PRICE_STATUS_UNPRICED_OPTION) !== filterState.priceStatus) {
            return false;
        }

        if (filterState.gameplayStatus && filterState.gameplayStatus !== DEFAULT_GAMEPLAY_STATUS_OPTION) {
            if (getGameplayStatus(record) !== filterState.gameplayStatus) {
                return false;
            }
        }

        if (queryTooShort) {
            return false;
        }

        if (searchTokens.length === 0 && !cardNumberQuery) {
            return true;
        }

        const recordNumber = normalizeCardNumberForFilter(record.id || record.number);
        const cardNumberMatches = cardNumberQuery ? recordNumber.includes(cardNumberQuery) : false;

        if (hasPunctuationQuery && normalizedQuery) {
            const strictName = normalizeForSearch(record.name);
            if (strictName.includes(normalizedQuery)) {
                return true;
            }

            return cardNumberMatches;
        }

        const nameWords = normalizeForSearch(record.name).split(" ").filter(Boolean);
        const nameMatches = searchTokens.length > 0
            ? searchTokens.every((token) => nameWords.some((word) => word.startsWith(token)))
            : false;

        return nameMatches || cardNumberMatches;
    });
}

function escapeRegex(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeForSearch(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function normalizeCardNumberForFilter(value) {
    return String(value || "")
        .toUpperCase()
        .replace(/\s+/g, "")
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

function buildPricingLookupKey(cardLike) {
    const setPart = normalizeForSearch(cardLike.set);
    const idPart = String(cardLike.id || cardLike.number || "").trim().toUpperCase();
    const namePart = normalizeForSearch(cardLike.name);
    const variantPart = normalizeVariantLabel(cardLike.variant);
    return `${setPart}||${idPart}||${namePart}||${variantPart}`;
}

function buildPricingLookupKeyWithoutVariant(cardLike) {
    const setPart = normalizeForSearch(cardLike.set);
    const idPart = String(cardLike.id || cardLike.number || "").trim().toUpperCase();
    const namePart = normalizeForSearch(cardLike.name);
    return `${setPart}||${idPart}||${namePart}||any-variant`;
}

function getPricingVariantLookupAliases(variant) {
    const normalizedVariant = normalizeVariantLabel(variant);
    const aliases = [normalizedVariant];

    if (normalizedVariant === "lined" || normalizedVariant === "cloudy" || normalizedVariant === "jagged") {
        aliases.push("reprint");
    }

    if (normalizedVariant === "stamped") {
        aliases.push("score stamped");
    }

    if (normalizedVariant.includes("corrected")) {
        aliases.push("corrected");
    }

    return Array.from(new Set(aliases));
}

function getPricingLookupCandidates(cardLike, options = {}) {
    const set = cardLike.set;
    const id = cardLike.id || cardLike.number || "";
    const name = cardLike.name || "";
    const variant = cardLike.variant || "Standard";
    const includeVariantAgnostic = options.includeVariantAgnostic !== false;

    const variantAliases = getPricingVariantLookupAliases(variant);
    const candidates = [];

    for (const variantAlias of variantAliases) {
        candidates.push(
            buildPricingLookupKey({ set, id, name, variant: variantAlias }),
            buildPricingLookupKey({ set, id, name: "", variant: variantAlias }),
            buildPricingLookupKey({ set, id: "", name, variant: variantAlias })
        );
    }

    if (includeVariantAgnostic) {
        candidates.push(
            buildPricingLookupKeyWithoutVariant({ set, id, name }),
            buildPricingLookupKeyWithoutVariant({ set, id, name: "" }),
            buildPricingLookupKeyWithoutVariant({ set, id: "", name })
        );
    }

    return Array.from(new Set(candidates));
}

function normalizePriceStatusLabel(status) {
    const normalized = String(status || "").trim().toLowerCase();
    if (!normalized) {
        return PRICE_STATUS_UNPRICED_OPTION;
    }

    if (normalized.includes("review")) {
        return PRICE_STATUS_REVIEW_OPTION;
    }

    if (normalized.includes("price") || normalized.includes("complete") || normalized.includes("done")) {
        return PRICE_STATUS_PRICED_OPTION;
    }

    if (normalized.includes("unpriced") || normalized.includes("missing") || normalized.includes("todo")) {
        return PRICE_STATUS_UNPRICED_OPTION;
    }

    return PRICE_STATUS_UNPRICED_OPTION;
}

function normalizePriceValue(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const cleaned = value.replace(/[^0-9.\-]+/g, "").trim();
        if (!cleaned) {
            return null;
        }

        const parsed = Number(cleaned);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

function normalizeCompsCount(value) {
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
        return Math.floor(value);
    }

    if (Array.isArray(value)) {
        return value.length;
    }

    if (typeof value === "string") {
        const parsed = Number(value.trim());
        if (Number.isFinite(parsed) && parsed >= 0) {
            return Math.floor(parsed);
        }
    }

    return 0;
}

function parsePricingItems(payload) {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (payload && Array.isArray(payload.items)) {
        return payload.items;
    }

    return [];
}

function parsePricingFallbackRules(payload) {
    if (!payload || !Array.isArray(payload.fallbackPricing)) {
        return [];
    }

    return payload.fallbackPricing
        .map((rule) => {
            const min = normalizePriceValue(rule.minPriceUsd);
            const max = normalizePriceValue(rule.maxPriceUsd);
            if (min === null || max === null) {
                return null;
            }

            const rarityPrefix = String(rule?.match?.rarityPrefix || "").trim();
            const foil = typeof rule?.match?.foil === "boolean" ? rule.match.foil : null;
            const variantIncludes = Array.isArray(rule?.match?.variantIncludes)
                ? rule.match.variantIncludes.map((value) => normalizeForSearch(value)).filter(Boolean)
                : normalizeForSearch(rule?.match?.variantIncludes || "")
                    ? [normalizeForSearch(rule.match.variantIncludes)]
                    : [];
            const typeIncludes = Array.isArray(rule?.match?.typeIncludes)
                ? rule.match.typeIncludes.map((value) => normalizeForSearch(value)).filter(Boolean)
                : normalizeForSearch(rule?.match?.typeIncludes || "")
                    ? [normalizeForSearch(rule.match.typeIncludes)]
                    : [];
            const typeExcludes = Array.isArray(rule?.match?.typeExcludes)
                ? rule.match.typeExcludes.map((value) => normalizeForSearch(value)).filter(Boolean)
                : normalizeForSearch(rule?.match?.typeExcludes || "")
                    ? [normalizeForSearch(rule.match.typeExcludes)]
                    : [];
            if (!rarityPrefix) {
                return null;
            }

            return {
                name: resolveFirstNonEmpty(rule.name) || "Fallback Band",
                rarityPrefix,
                foil,
                variantIncludes,
                typeIncludes,
                typeExcludes,
                minPriceUsd: Math.min(min, max),
                maxPriceUsd: Math.max(min, max),
                status: normalizePriceStatusLabel(rule.status) || PRICE_STATUS_PRICED_OPTION,
                notes: resolveFirstNonEmpty(rule.notes) || ""
            };
        })
        .filter(Boolean);
}

function parseSetPricingNotes(payload) {
    if (!payload || !Array.isArray(payload.setNotes)) {
        return [];
    }

    return payload.setNotes
        .map((note) => {
            const title = resolveFirstNonEmpty(note?.title, note?.label);
            const body = resolveFirstNonEmpty(note?.notes, note?.text, note?.body);
            if (!title && !body) {
                return null;
            }

            return {
                title,
                notes: body
            };
        })
        .filter(Boolean);
}

function parseKingSetNotes(payload) {
    if (!payload || !Array.isArray(payload.sets)) {
        return new Map();
    }

    const notesBySet = new Map();
    for (const setEntry of payload.sets) {
        const setName = resolveFirstNonEmpty(setEntry?.set);
        if (!setName || !Array.isArray(setEntry.completeKingSets)) {
            continue;
        }

        const normalizedEntries = setEntry.completeKingSets
            .map((entry) => {
                const name = resolveFirstNonEmpty(entry?.name);
                if (!name) {
                    return null;
                }

                return {
                    name,
                    minPriceUsd: normalizePriceValue(entry?.minPriceUsd),
                    maxPriceUsd: normalizePriceValue(entry?.maxPriceUsd),
                    notes: resolveFirstNonEmpty(entry?.notes)
                };
            })
            .filter(Boolean);

        if (normalizedEntries.length > 0) {
            notesBySet.set(setName, normalizedEntries);
        }
    }

    return notesBySet;
}

function parseSetPricingPayload(payload, setName) {
    const items = parsePricingItems(payload);
    const pricingByLookupKey = new Map();
    const fallbackPricingRules = parsePricingFallbackRules(payload);
    const setNotes = parseSetPricingNotes(payload);

    for (const item of items) {
        const name = resolveFirstNonEmpty(item.name, item.cardName, item.title);
        if (!name) {
            continue;
        }

        const variant = resolveFirstNonEmpty(item.variant, item.finish, item.foil, item.version) || "Standard";
        const itemSet = resolveFirstNonEmpty(item.set, item.setName) || setName;
        const id = resolveFirstNonEmpty(item.id, item.number, item.cardNumber, item.card_number, item.cardNo, item.code, item.cardId);
        const priceUsd = normalizePriceValue(item.priceUsd ?? item.price ?? item.marketPrice ?? item.ebayMedian);
        const compsCount = normalizeCompsCount(item.compsCount ?? item.ebayComps ?? item.comps);
        const notes = resolveFirstNonEmpty(item.notes, item.note);
        const declaredStatus = normalizePriceStatusLabel(item.status);
        const status = declaredStatus === PRICE_STATUS_REVIEW_OPTION
            ? PRICE_STATUS_REVIEW_OPTION
            : (priceUsd !== null ? PRICE_STATUS_PRICED_OPTION : declaredStatus);

        const lookupCandidates = getPricingLookupCandidates({
            set: itemSet,
            id,
            name,
            variant
        }, {
            includeVariantAgnostic: isStandardLikeVariant(variant)
        });

        const pricingRecord = {
            priceUsd,
            compsCount,
            status,
            notes
        };

        for (const lookupKey of lookupCandidates) {
            if (!pricingByLookupKey.has(lookupKey)) {
                pricingByLookupKey.set(lookupKey, pricingRecord);
            }
        }
    }

    return {
        pricingByLookupKey,
        fallbackPricingRules,
        setNotes
    };
}

function buildSetPricingUrl(setName) {
    return `${YYH_PRICING_DATA_ROOT}/${slugifySetName(setName)}-pricing.json`;
}

async function loadSetPricingMap(setName) {
    const normalizedSet = String(setName || "").trim();
    if (!normalizedSet || normalizedSet === "All Sets") {
        return createEmptyPricingData();
    }

    if (pricingDataCache.has(normalizedSet)) {
        return pricingDataCache.get(normalizedSet);
    }

    const sourceUrl = buildSetPricingUrl(normalizedSet);
    try {
        const response = await fetch(sourceUrl, { cache: "no-store" });
        if (!response.ok) {
            pricingDataCache.set(normalizedSet, createEmptyPricingData());
            return pricingDataCache.get(normalizedSet);
        }

        const payload = await response.json();
        const parsedMap = parseSetPricingPayload(payload, normalizedSet);
        pricingDataCache.set(normalizedSet, parsedMap);
        return parsedMap;
    } catch {
        pricingDataCache.set(normalizedSet, createEmptyPricingData());
        return pricingDataCache.get(normalizedSet);
    }
}

async function loadAllYyhSetPricingMap(records) {
    if (allYyhSetPricingCache) {
        return allYyhSetPricingCache;
    }

    const yyhSets = Array.from(
        new Set(
            (Array.isArray(records) ? records : [])
                .filter((record) => String(record.game || "").trim() === "Yu Yu Hakusho")
                .map((record) => String(record.set || "").trim())
                .filter((setName) => Boolean(setName) && setName !== "All Sets")
        )
    );

    if (yyhSets.length === 0) {
        allYyhSetPricingCache = createEmptyPricingData();
        return allYyhSetPricingCache;
    }

    const perSetPricing = await Promise.all(yyhSets.map((setName) => loadSetPricingMap(setName)));
    const mergedPricingByLookupKey = new Map();
    const mergedFallbackPricingRules = [];

    for (const setPricing of perSetPricing) {
        for (const [lookupKey, pricingRecord] of (setPricing.pricingByLookupKey || new Map()).entries()) {
            if (!mergedPricingByLookupKey.has(lookupKey)) {
                mergedPricingByLookupKey.set(lookupKey, pricingRecord);
            }
        }

        if (Array.isArray(setPricing.fallbackPricingRules)) {
            mergedFallbackPricingRules.push(...setPricing.fallbackPricingRules);
        }
    }

    allYyhSetPricingCache = {
        pricingByLookupKey: mergedPricingByLookupKey,
        fallbackPricingRules: mergedFallbackPricingRules,
        setNotes: []
    };

    return allYyhSetPricingCache;
}

async function loadKingSetNotesMap() {
    if (kingSetNotesCache) {
        return kingSetNotesCache;
    }

    try {
        const response = await fetch(YYH_KING_SET_NOTES_URL, { cache: "no-store" });
        if (!response.ok) {
            kingSetNotesCache = new Map();
            return kingSetNotesCache;
        }

        const payload = await response.json();
        kingSetNotesCache = parseKingSetNotes(payload);
        return kingSetNotesCache;
    } catch {
        kingSetNotesCache = new Map();
        return kingSetNotesCache;
    }
}

function formatPriceRange(minPriceUsd, maxPriceUsd) {
    if (typeof minPriceUsd === "number" && typeof maxPriceUsd === "number") {
        if (minPriceUsd === maxPriceUsd) {
            return `$${minPriceUsd.toFixed(2)}`;
        }

        return `$${minPriceUsd.toFixed(2)}-$${maxPriceUsd.toFixed(2)}`;
    }

    if (typeof minPriceUsd === "number") {
        return `$${minPriceUsd.toFixed(2)}`;
    }

    if (typeof maxPriceUsd === "number") {
        return `$${maxPriceUsd.toFixed(2)}`;
    }

    return "";
}

function renderSetContext(setContextElement, filterState, setPricingData, kingSetNotesMap) {
    if (!setContextElement) {
        return;
    }

    if (filterState.game !== "Yu Yu Hakusho" || !filterState.set || filterState.set === "All Sets") {
        setContextElement.hidden = true;
        setContextElement.innerHTML = "";
        return;
    }

    const setNotes = Array.isArray(setPricingData?.setNotes) ? setPricingData.setNotes : [];
    const kingSetNotes = kingSetNotesMap instanceof Map ? kingSetNotesMap.get(filterState.set) || [] : [];

    if (setNotes.length === 0 && kingSetNotes.length === 0) {
        setContextElement.hidden = true;
        setContextElement.innerHTML = "";
        return;
    }

    const setNoteMarkup = setNotes.map((note) => {
        const titleMarkup = note.title ? `<span class="inventory-set-context__label">${escapeHtml(note.title)}:</span> ` : "";
        return `<li>${titleMarkup}${escapeHtml(note.notes)}</li>`;
    }).join("");

    const kingSetMarkup = kingSetNotes.map((entry) => {
        const priceRange = formatPriceRange(entry.minPriceUsd, entry.maxPriceUsd);
        const noteSuffix = entry.notes ? ` ${escapeHtml(entry.notes)}` : "";
        return `<li><span class="inventory-set-context__label">${escapeHtml(entry.name)}:</span> ${escapeHtml(priceRange)}${noteSuffix}</li>`;
    }).join("");

    setContextElement.innerHTML = `
        <div class="inventory-set-context__header">
            <p class="inventory-set-context__eyebrow">Set Pricing Context</p>
            <h3 class="inventory-set-context__title">${escapeHtml(filterState.set)}</h3>
        </div>
        ${setNotes.length > 0 ? `<ul class="inventory-set-context__list">${setNoteMarkup}</ul>` : ""}
        ${kingSetNotes.length > 0 ? `<ul class="inventory-set-context__list">${kingSetMarkup}</ul>` : ""}
    `;
    setContextElement.hidden = false;
}

function getFallbackPricingForRecord(cardRecord, fallbackPricingRules) {
    if (!Array.isArray(fallbackPricingRules) || fallbackPricingRules.length === 0) {
        return null;
    }

    const rarity = String(cardRecord.rarity || "").toLowerCase();
    const foilLike = isFoilLikeVariant(cardRecord.variant);
    const normalizedVariant = normalizeForSearch(cardRecord.variant);
    const normalizedType = normalizeForSearch(cardRecord.type);

    for (const rule of fallbackPricingRules) {
        const ruleRarityPrefix = String(rule.rarityPrefix || "").toLowerCase();
        if (!rarity.startsWith(ruleRarityPrefix)) {
            continue;
        }

        if (rule.foil !== null && rule.foil !== foilLike) {
            continue;
        }

        if (Array.isArray(rule.variantIncludes) && rule.variantIncludes.length > 0) {
            const variantMatches = rule.variantIncludes.every((variantToken) => normalizedVariant.includes(variantToken));
            if (!variantMatches) {
                continue;
            }
        }

        if (Array.isArray(rule.typeIncludes) && rule.typeIncludes.length > 0) {
            const includesType = rule.typeIncludes.every((typeToken) => normalizedType.includes(typeToken));
            if (!includesType) {
                continue;
            }
        }

        if (Array.isArray(rule.typeExcludes) && rule.typeExcludes.length > 0) {
            const excludesType = rule.typeExcludes.some((typeToken) => normalizedType.includes(typeToken));
            if (excludesType) {
                continue;
            }
        }

        const midpoint = (Number(rule.minPriceUsd) + Number(rule.maxPriceUsd)) / 2;
        return {
            priceUsd: midpoint,
            minPriceUsd: Number(rule.minPriceUsd),
            maxPriceUsd: Number(rule.maxPriceUsd),
            compsCount: 0,
            status: normalizePriceStatusLabel(rule.status || PRICE_STATUS_PRICED_OPTION),
            notes: rule.notes || rule.name,
            isFallbackBand: true
        };
    }

    return null;
}

function applyPricingToRecords(records, pricingData) {
    const pricingMap = pricingData?.pricingByLookupKey || new Map();
    const fallbackPricingRules = pricingData?.fallbackPricingRules || [];

    return records.map((record) => {
        const candidateKeys = getPricingLookupCandidates(record);
        const explicitPricing = candidateKeys.reduce((found, key) => found || pricingMap.get(key) || null, null);
        const pricing = explicitPricing || getFallbackPricingForRecord(record, fallbackPricingRules);
        const priceStatus = pricing?.status || PRICE_STATUS_UNPRICED_OPTION;
        return {
            ...record,
            pricing,
            priceStatus
        };
    });
}

function formatPriceLabel(cardRecord) {
    const pricing = cardRecord.pricing;
    if (!pricing || pricing.priceUsd === null || typeof pricing.priceUsd === "undefined") {
        return "Unpriced";
    }

    const needsReview = (cardRecord.priceStatus || "") === PRICE_STATUS_REVIEW_OPTION;

    if (typeof pricing.minPriceUsd === "number" && typeof pricing.maxPriceUsd === "number") {
        const rangeLabel = `$${pricing.minPriceUsd.toFixed(2)}-$${pricing.maxPriceUsd.toFixed(2)}`;
        return needsReview ? `${rangeLabel} • Needs Review` : rangeLabel;
    }

    const amount = `$${Number(pricing.priceUsd).toFixed(2)}`;
    const compsCount = Number(pricing.compsCount || 0);
    const suffix = needsReview ? " • Needs Review" : "";
    if (compsCount > 0) {
        return `${amount} • ${compsCount} comps${suffix}`;
    }

    return `${amount}${suffix}`;
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

function getScopedRarityOptions(records, filterState, gameOptions) {
    const baseRarities = Array.isArray(gameOptions?.rarities) ? gameOptions.rarities : ["All Rarities"];
    const lookupState = {
        ...filterState,
        rarity: "All Rarities"
    };
    const scopedRecords = filterRecords(records, lookupState);
    const presentRarities = new Set(scopedRecords.map((record) => record.rarity));
    const scopedOptions = baseRarities.filter((rarityOption) => rarityOption === "All Rarities" || presentRarities.has(rarityOption));

    if (scopedOptions.length === 0) {
        return ["All Rarities"];
    }

    if (!scopedOptions.includes("All Rarities")) {
        return ["All Rarities", ...scopedOptions];
    }

    return scopedOptions;
}

function getScopedEditionOptions(records, filterState) {
    const lookupState = {
        ...filterState,
        edition: DEFAULT_EDITION_OPTION
    };
    const scopedRecords = filterRecords(records, lookupState);
    const presentEditions = new Set(scopedRecords.map(resolveCardEdition));
    const options = [DEFAULT_EDITION_OPTION];

    if (presentEditions.has(EDITION_UNLIMITED_OPTION)) {
        options.push(EDITION_UNLIMITED_OPTION);
    }

    if (presentEditions.has(EDITION_FIRST_OPTION)) {
        options.push(EDITION_FIRST_OPTION);
    }

    if (presentEditions.has(EDITION_UNSPECIFIED_OPTION)) {
        options.push(EDITION_UNSPECIFIED_OPTION);
    }

    return options;
}

function parseCardIdParts(cardRecord) {
    const cardId = String(cardRecord.id || cardRecord.number || "").trim().toUpperCase();
    const prefixMatch = cardId.match(/^[A-Z]+/);
    const numberMatch = cardId.match(/\d+/);
    const suffixMatch = cardId.match(/[A-Z]+$/);

    return {
        prefix: prefixMatch ? prefixMatch[0] : "",
        number: numberMatch ? Number(numberMatch[0]) : Number.POSITIVE_INFINITY,
        suffix: suffixMatch ? suffixMatch[0] : ""
    };
}

function getVariantSortRank(variant) {
    const normalized = String(variant || "").trim().toLowerCase();

    if (!normalized || normalized === "standard" || normalized === "common") {
        return 0;
    }

    if (normalized === "foil") {
        return 1;
    }

    return 2;
}

function compareCardNumberOrder(a, b, direction = 1) {
    const aParts = parseCardIdParts(a);
    const bParts = parseCardIdParts(b);

    const setCompare = a.set.localeCompare(b.set);
    if (setCompare !== 0) {
        return setCompare;
    }

    const prefixCompare = aParts.prefix.localeCompare(bParts.prefix);
    if (prefixCompare !== 0) {
        return prefixCompare;
    }

    if (aParts.number !== bParts.number) {
        return (aParts.number - bParts.number) * direction;
    }

    const suffixCompare = aParts.suffix.localeCompare(bParts.suffix);
    if (suffixCompare !== 0) {
        return suffixCompare;
    }

    const idCompare = a.id.localeCompare(b.id);
    if (idCompare !== 0) {
        return idCompare;
    }

    const variantRankCompare = getVariantSortRank(a.variant) - getVariantSortRank(b.variant);
    if (variantRankCompare !== 0) {
        return variantRankCompare;
    }

    const variantNameCompare = String(a.variant || "").localeCompare(String(b.variant || ""));
    if (variantNameCompare !== 0) {
        return variantNameCompare;
    }

    return a.name.localeCompare(b.name);
}

function sortInventoryRecords(records, sortOption) {
    const sorted = [...records];

    const getPriceValue = (record) => {
        const value = record?.pricing?.priceUsd;
        return typeof value === "number" && Number.isFinite(value) ? value : null;
    };

    switch (sortOption) {
    case "Price (High-Low)":
        sorted.sort((a, b) => {
            const aPrice = getPriceValue(a);
            const bPrice = getPriceValue(b);
            if (aPrice === null && bPrice === null) {
                return compareCardNumberOrder(a, b, 1);
            }
            if (aPrice === null) {
                return 1;
            }
            if (bPrice === null) {
                return -1;
            }

            if (aPrice !== bPrice) {
                return bPrice - aPrice;
            }

            return compareCardNumberOrder(a, b, 1);
        });
        break;
    case "Price (Low-High)":
        sorted.sort((a, b) => {
            const aPrice = getPriceValue(a);
            const bPrice = getPriceValue(b);
            if (aPrice === null && bPrice === null) {
                return compareCardNumberOrder(a, b, 1);
            }
            if (aPrice === null) {
                return 1;
            }
            if (bPrice === null) {
                return -1;
            }

            if (aPrice !== bPrice) {
                return aPrice - bPrice;
            }

            return compareCardNumberOrder(a, b, 1);
        });
        break;
    case "Variant Premium (High-Low)":
        sorted.sort((a, b) => {
            const premiumRankDiff = getVariantPremiumRank(b.variant) - getVariantPremiumRank(a.variant);
            if (premiumRankDiff !== 0) {
                return premiumRankDiff;
            }

            return compareCardNumberOrder(a, b, 1);
        });
        break;
    case "Card Number (High-Low)":
        sorted.sort((a, b) => compareCardNumberOrder(a, b, -1));
        break;
    case "Name (A-Z)":
        sorted.sort((a, b) => a.name.localeCompare(b.name) || compareCardNumberOrder(a, b, 1));
        break;
    case "Name (Z-A)":
        sorted.sort((a, b) => b.name.localeCompare(a.name) || compareCardNumberOrder(a, b, 1));
        break;
    case "Rarity (A-Z)":
        sorted.sort((a, b) => a.rarity.localeCompare(b.rarity) || compareCardNumberOrder(a, b, 1));
        break;
    case "Set (A-Z)":
        sorted.sort((a, b) => a.set.localeCompare(b.set) || compareCardNumberOrder(a, b, 1));
        break;
    case "Card Number (Low-High)":
    default:
        sorted.sort((a, b) => compareCardNumberOrder(a, b, 1));
        break;
    }

    return sorted;
}

function makeFilterState(searchFilter, gameFilter, setFilter, typeFilter, rarityFilter, editionFilter, variantFocusFilter, priceStatusFilter, gameplayStatusFilter, sortFilter, variantsToggle) {
    return {
        query: searchFilter.value,
        game: gameFilter.value,
        set: setFilter.value,
        type: typeFilter.value,
        rarity: rarityFilter.value,
        edition: editionFilter.value,
        variantFocus: variantFocusFilter.value,
        priceStatus: priceStatusFilter.value,
        gameplayStatus: gameplayStatusFilter.value,
        sort: sortFilter.value,
        includeVariants: Boolean(variantsToggle.checked)
    };
}

function readInitialFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
        query: params.get("q") || params.get("search") || params.get("number") || params.get("cardNumber") || params.get("id") || "",
        game: params.get("game") || "",
        set: params.get("set") || "",
        type: params.get("type") || "",
        rarity: params.get("rarity") || "",
        edition: params.get("edition") || "",
        variantFocus: params.get("variantFocus") || params.get("finish") || "",
        priceStatus: params.get("priceStatus") || params.get("pricing") || "",
        gameplayStatus: params.get("gameplayStatus") || params.get("gameplay") || "",
        sort: params.get("sort") || "",
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
    const pageLimit = getInventoryPageLimit();

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
    params.set("limit", String(pageLimit));
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
        const pageLimit = getInventoryPageLimit();
        const items = filteredItems.slice(offset, offset + pageLimit);

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
    const editionFilter = document.getElementById("inventory-edition-filter");
    const variantFocusFilter = document.getElementById("inventory-variant-focus-filter");
    const priceStatusFilter = document.getElementById("inventory-price-status-filter");
    const gameplayStatusFilter = document.getElementById("inventory-gameplay-status-filter");
    const sortFilter = document.getElementById("inventory-sort-filter");
    const variantsToggle = document.getElementById("inventory-variants-toggle");
    const resultsMeta = document.getElementById("inventory-results-meta");
    const resultsGrid = document.getElementById("inventory-results-grid");
    const loadMoreButton = document.getElementById("inventory-load-more");
    const loadMoreProgress = document.getElementById("inventory-load-more-progress");
    const setContextElement = document.getElementById("inventory-set-context");
    const initialFilters = readInitialFiltersFromUrl();

    if (!searchFilter || !gameFilter || !setFilter || !typeFilter || !rarityFilter || !editionFilter || !variantFocusFilter || !priceStatusFilter || !gameplayStatusFilter || !sortFilter || !variantsToggle || !resultsMeta || !resultsGrid || !loadMoreButton || !loadMoreProgress || !setContextElement) {
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
    let canLoadMore = false;

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
        const filterState = makeFilterState(searchFilter, gameFilter, setFilter, typeFilter, rarityFilter, editionFilter, variantFocusFilter, priceStatusFilter, gameplayStatusFilter, sortFilter, variantsToggle);
        const normalizedQuery = normalizeForSearch(filterState.query);
        const queryTooShort = normalizedQuery.length > 0
            && normalizedQuery.length < MIN_SEARCH_CHARACTERS
            && !isLikelyCardNumberQuery(filterState.query);
        const offset = append ? cardsShown : INVENTORY_DEFAULT_OFFSET;

        if (filterState.game === "All Games") {
            if (requestId !== renderRequestId) {
                return;
            }

            cardsShown = 0;
            canLoadMore = false;
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            updateLoadMoreButtonState();
            hideLoadMoreProgress();
            renderSetContext(setContextElement, filterState, null, new Map());
            renderGameSelectionPrompt(resultsGrid, resultsMeta);
            return;
        }

        resultsGrid.hidden = false;
        if (!append) {
            cardsShown = 0;
            canLoadMore = false;
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            updateLoadMoreButtonState();
            hideLoadMoreProgress();
            resultsMeta.textContent = "Loading records...";
        } else {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "Loading...";
        }

        if (queryTooShort) {
            resultsGrid.hidden = false;
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            resultsGrid.innerHTML = `
                <article class="inventory-card">
                    <div class="inventory-card__image" aria-hidden="true"></div>
                    <h3 class="inventory-card__title">Keep typing to search</h3>
                    <p class="inventory-card__meta">Enter at least ${MIN_SEARCH_CHARACTERS} characters to run search.</p>
                    <span class="inventory-card__tag">Search threshold enabled</span>
                </article>
            `;
            canLoadMore = false;
            updateLoadMoreButtonState();
            setLoadMoreProgress(0, 0, filterState.includeVariants);
            resultsMeta.textContent = `Type ${MIN_SEARCH_CHARACTERS} or more characters to search`;
            return;
        }

        if (requestId !== renderRequestId) {
            return;
        }

        const setPricingData = filterState.game === "Yu Yu Hakusho"
            ? (filterState.set === "All Sets"
                ? await loadAllYyhSetPricingMap(inventoryRecords)
                : await loadSetPricingMap(filterState.set))
            : createEmptyPricingData();
        const kingSetNotesMap = filterState.game === "Yu Yu Hakusho"
            ? await loadKingSetNotesMap()
            : new Map();
        renderSetContext(setContextElement, filterState, setPricingData, kingSetNotesMap);
        const recordsWithPricing = applyPricingToRecords(inventoryRecords, setPricingData);

        const filteredRecords = filterRecords(recordsWithPricing, filterState);
        const sortedRecords = sortInventoryRecords(filteredRecords, filterState.sort);
        const showCardIdInMeta = false;
        const showPricing = filterState.game === "Yu Yu Hakusho";
        const sourceRecords = filterState.includeVariants
            ? sortedRecords
            : sortedRecords.filter((record, index, allRecords) => {
                const displayKey = getCardDisplayKey(record);
                return allRecords.findIndex((item) => getCardDisplayKey(item) === displayKey) === index;
            });
        const collisionCountMap = buildCollisionCountMap(sourceRecords);
        const variantFamilyCountMap = buildVariantFamilyCountMap(sourceRecords);
        const totalForDisplay = sourceRecords.length;

        if (!append && sourceRecords.length === 0) {
            resultsGrid.hidden = false;
            resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
            resultsGrid.innerHTML = `
                <article class="inventory-card">
                    <div class="inventory-card__image" aria-hidden="true"></div>
                    <h3 class="inventory-card__title">No matching cards found</h3>
                    <p class="inventory-card__meta">Try adjusting game, set, rarity, gameplay status, or search text.</p>
                    <span class="inventory-card__tag">YYH searchable inventory</span>
                </article>
            `;
            canLoadMore = false;
            updateLoadMoreButtonState();
            setLoadMoreProgress(0, 0, filterState.includeVariants);
            resultsMeta.textContent = "0 cards matched • YYH searchable inventory";
            return;
        }

        const pageLimit = getInventoryPageLimit();
        const renderedItems = sourceRecords.slice(offset, offset + pageLimit);

        if (append) {
            resultsGrid.insertAdjacentHTML("beforeend", renderedItems.map((cardRecord) => makeInventoryCard(cardRecord, collisionCountMap, variantFamilyCountMap, showCardIdInMeta, showPricing)).join(""));
            resultsGrid.classList.add("inventory-grid--thumbnail-mode");
        } else {
            resultsGrid.innerHTML = renderedItems.map((cardRecord) => makeInventoryCard(cardRecord, collisionCountMap, variantFamilyCountMap, showCardIdInMeta, showPricing)).join("");
        }

        cardsShown = append ? cardsShown + renderedItems.length : renderedItems.length;
        canLoadMore = cardsShown < totalForDisplay;
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
        const previousEdition = editionFilter.value;
        const previousVariantFocus = variantFocusFilter.value;
        const previousPriceStatus = priceStatusFilter.value;
        const previousGameplayStatus = gameplayStatusFilter.value;
        const previousSort = sortFilter.value;
        const hasSelectedGame = selectedGame !== "All Games";
        const isYyhSelected = selectedGame === "Yu Yu Hakusho";

        replaceSelectOptions(setFilter, gameOptions.sets);
        replaceSelectOptions(typeFilter, gameOptions.types);
        replaceSelectOptions(variantFocusFilter, VARIANT_FOCUS_OPTIONS);
        replaceSelectOptions(priceStatusFilter, PRICE_STATUS_OPTIONS);
        replaceSelectOptions(gameplayStatusFilter, isYyhSelected ? GAMEPLAY_STATUS_OPTIONS : [DEFAULT_GAMEPLAY_STATUS_OPTION]);
        gameplayStatusFilter.disabled = !isYyhSelected;
        replaceSelectOptions(sortFilter, [
            DEFAULT_SORT_OPTION,
            "Card Number (High-Low)",
            "Name (A-Z)",
            "Name (Z-A)",
            "Rarity (A-Z)",
            "Set (A-Z)",
            "Price (High-Low)",
            "Price (Low-High)",
            "Variant Premium (High-Low)"
        ]);
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
        const scopedRarityOptions = getScopedRarityOptions(
            inventoryRecords,
            {
                query: searchFilter.value,
                game: gameFilter.value,
                set: setFilter.value,
                type: typeFilter.value,
                rarity: "All Rarities",
                edition: editionFilter.value,
                variantFocus: variantFocusFilter.value,
                priceStatus: priceStatusFilter.value,
                gameplayStatus: gameplayStatusFilter.value,
                sort: sortFilter.value,
                includeVariants: Boolean(variantsToggle.checked)
            },
            gameOptions
        );
        replaceSelectOptions(rarityFilter, scopedRarityOptions);

        if (scopedRarityOptions.includes(previousRarity)) {
            rarityFilter.value = previousRarity;
        }

        const scopedEditionOptions = getScopedEditionOptions(inventoryRecords, {
            query: searchFilter.value,
            game: gameFilter.value,
            set: setFilter.value,
            type: typeFilter.value,
            rarity: rarityFilter.value,
            edition: DEFAULT_EDITION_OPTION,
            variantFocus: variantFocusFilter.value,
            priceStatus: priceStatusFilter.value,
            gameplayStatus: gameplayStatusFilter.value,
            sort: sortFilter.value,
            includeVariants: Boolean(variantsToggle.checked)
        });
        replaceSelectOptions(editionFilter, scopedEditionOptions);

        if (scopedEditionOptions.includes(previousEdition)) {
            editionFilter.value = previousEdition;
        } else {
            editionFilter.value = DEFAULT_EDITION_OPTION;
        }

        if (VARIANT_FOCUS_OPTIONS.includes(previousVariantFocus)) {
            variantFocusFilter.value = previousVariantFocus;
        } else {
            variantFocusFilter.value = DEFAULT_VARIANT_FOCUS_OPTION;
        }

        if (PRICE_STATUS_OPTIONS.includes(previousPriceStatus)) {
            priceStatusFilter.value = previousPriceStatus;
        } else {
            priceStatusFilter.value = DEFAULT_PRICE_STATUS_OPTION;
        }

        if (isYyhSelected && GAMEPLAY_STATUS_OPTIONS.includes(previousGameplayStatus)) {
            gameplayStatusFilter.value = previousGameplayStatus;
        } else {
            gameplayStatusFilter.value = DEFAULT_GAMEPLAY_STATUS_OPTION;
        }

        if (Array.from(sortFilter.options).some((option) => option.value === previousSort)) {
            sortFilter.value = previousSort;
        } else {
            sortFilter.value = DEFAULT_SORT_OPTION;
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
        syncConditionalFilters();
    });
    typeFilter.addEventListener("change", () => {
        syncConditionalFilters();
    });
    rarityFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    editionFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    variantFocusFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    priceStatusFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    gameplayStatusFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    sortFilter.addEventListener("change", () => {
        void renderResults(false);
    });
    searchFilter.addEventListener("input", () => {
        syncConditionalFilters();
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

    let lastPageLimit = getInventoryPageLimit();
    let resizeTimer = null;
    window.addEventListener("resize", () => {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }

        resizeTimer = setTimeout(() => {
            const nextPageLimit = getInventoryPageLimit();
            if (nextPageLimit === lastPageLimit) {
                return;
            }

            lastPageLimit = nextPageLimit;
            void renderResults(false);
        }, 120);
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
    if (initialFilters.edition && Array.from(editionFilter.options).some((option) => option.value === initialFilters.edition)) {
        editionFilter.value = initialFilters.edition;
    }
    if (initialFilters.variantFocus && Array.from(variantFocusFilter.options).some((option) => option.value === initialFilters.variantFocus)) {
        variantFocusFilter.value = initialFilters.variantFocus;
    }
    if (initialFilters.priceStatus && Array.from(priceStatusFilter.options).some((option) => option.value === initialFilters.priceStatus)) {
        priceStatusFilter.value = initialFilters.priceStatus;
    }
    if (initialFilters.gameplayStatus && Array.from(gameplayStatusFilter.options).some((option) => option.value === initialFilters.gameplayStatus)) {
        gameplayStatusFilter.value = initialFilters.gameplayStatus;
    }
    if (initialFilters.sort && Array.from(sortFilter.options).some((option) => option.value === initialFilters.sort)) {
        sortFilter.value = initialFilters.sort;
    } else {
        sortFilter.value = DEFAULT_SORT_OPTION;
    }

    void renderResults(false);
}

document.addEventListener("DOMContentLoaded", initInventoryFilters);
