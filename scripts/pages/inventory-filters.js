const INVENTORY_API_URL = "/api/yyh/cards";
const INVENTORY_SETS_API_URL = "/api/yyh/sets";
const YGO_CARDINFO_API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const YGO_CARDSETS_API_URL = "https://db.ygoprodeck.com/api/v7/cardsets.php";
const YGO_ARCHETYPES_API_URL = "https://db.ygoprodeck.com/api/v7/archetypes.php";
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
const YGO_VARIANT_FETCH_LIMIT = 2000;
const MIN_SEARCH_CHARACTERS = 3;
const DEFAULT_SORT_OPTION = "Card Number (Low-High)";
const YGO_DEFAULT_SORT_OPTION = "Set Release (Latest First)";
const DEFAULT_EDITION_OPTION = "All Editions";
const DEFAULT_VARIANT_FOCUS_OPTION = "All Finishes";
const DEFAULT_PRICE_STATUS_OPTION = "All Price Statuses";
const DEFAULT_GAMEPLAY_STATUS_OPTION = "All Gameplay Statuses";
const YGO_DEFAULT_ARCHETYPE_OPTION = "All Archetypes";
const YGO_DEFAULT_ATTRIBUTE_OPTION = "All Attributes";
const YGO_DEFAULT_RACE_OPTION = "All Races";
const YGO_DEFAULT_FORMAT_OPTION = "All Formats";
const YGO_DEFAULT_EFFECT_OPTION = "All Effect Types";
const YGO_DEFAULT_LEVEL_OPTION = "All Levels / Ranks";
const YYH_PROMO_FAMILY_RARITY_OPTION = "Promo Family (P/V/X/TX/SK)";
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
    "Limit 1 per Deck",
    "Limit 2 per Deck"
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
const YGO_VARIANT_ROLLOUT_SET = "Legendary Arc-V Decks";
const YGO_VARIANT_ROLLOUT_NEXT_SET = "THANK YOU PACK";
const YGO_VARIANT_ROLLOUT_NEXT_IDS = new Set([
    "TYP1-EN024", "TYP1-EN027", "TYP1-EN019", "TYP1-EN004", "TYP1-EN021", "TYP1-EN018",
    "TYP1-EN015", "TYP1-EN030", "TYP1-EN028", "TYP1-EN013", "TYP1-EN029", "TYP1-EN008"
]);
const YGO_VARIANT_ROLLOUT_THIRD_SET = "Winner's Pack 2026-2027";
const YGO_VARIANT_ROLLOUT_THIRD_IDS = new Set([
    "WI26-EN015", "WI26-EN026", "WI26-EN013", "WI26-EN027", "WI26-EN039", "WI26-EN031", "WI26-EN036", "WI26-EN004", "WI26-EN008", "WI26-EN025",
    "WI26-EN033", "WI26-EN030", "WI26-EN014", "WI26-EN003", "WI26-EN001", "WI26-EN019", "WI26-EN020", "WI26-EN017", "WI26-EN037", "WI26-EN006",
    "WI26-EN012", "WI26-EN002", "WI26-EN010", "WI26-EN011", "WI26-EN009", "WI26-EN007", "WI26-EN023", "WI26-EN034", "WI26-EN016", "WI26-EN032",
    "WI26-EN024", "WI26-EN018", "WI26-EN040", "WI26-EN035", "WI26-EN028", "WI26-EN022", "WI26-EN021", "WI26-EN005", "WI26-EN029", "WI26-EN038"
]);
const YGO_VARIANT_ROLLOUT_FOURTH_SET = "Chaos Origins";
const YGO_VARIANT_ROLLOUT_FOURTH_IDS = new Set([
    "CORI-EN067", "CORI-EN016", "CORI-EN015", "CORI-EN091", "CORI-EN092", "CORI-EN095", "CORI-EN093", "CORI-EN096", "CORI-EN094", "CORI-EN090",
    "CORI-EN079", "CORI-EN023", "CORI-EN001", "CORI-EN028", "CORI-EN051", "CORI-EN052", "CORI-EN069", "CORI-EN068", "CORI-EN003", "CORI-EN087",
    "CORI-EN046", "CORI-EN045", "CORI-EN042", "CORI-EN076", "CORI-EN012", "CORI-EN082", "CORI-EN035", "CORI-EN072", "CORI-EN014", "CORI-EN048",
    "CORI-EN077", "CORI-EN070", "CORI-EN080", "CORI-EN036", "CORI-EN013", "CORI-EN026", "CORI-EN004", "CORI-EN006", "CORI-EN050", "CORI-EN033",
    "CORI-EN097", "CORI-EN088", "CORI-EN053", "CORI-EN031", "CORI-EN032", "CORI-EN030", "CORI-EN078", "CORI-EN044", "CORI-EN027", "CORI-EN009",
    "CORI-EN059", "CORI-EN038", "CORI-EN075", "CORI-EN021", "CORI-EN034", "CORI-EN065", "CORI-EN085", "CORI-EN089", "CORI-EN022", "CORI-EN099",
    "CORI-EN061", "CORI-EN071", "CORI-EN055", "CORI-EN039", "CORI-EN062", "CORI-EN007", "CORI-EN041", "CORI-EN040", "CORI-EN058", "CORI-EN020",
    "CORI-EN074", "CORI-EN066", "CORI-EN047", "CORI-EN049", "CORI-EN054", "CORI-EN086", "CORI-EN002", "CORI-EN024", "CORI-EN060", "CORI-EN098",
    "CORI-EN064", "CORI-EN008", "CORI-EN063", "CORI-EN011", "CORI-EN029", "CORI-EN018", "CORI-EN019", "CORI-EN037", "CORI-EN073", "CORI-EN057",
    "CORI-EN100", "CORI-EN056", "CORI-EN084", "CORI-EN025", "CORI-EN005", "CORI-EN017", "CORI-EN010", "CORI-EN081", "CORI-EN083", "CORI-EN043"
]);
const YGO_VARIANT_ROLLOUT_IDS = new Set([
    "LAVD-ENO34", "LAVD-ENO32", "LAVD-ENL06", "LAVD-ENO07", "LAVD-ENO35", "LAVD-ENL36", "LAVD-ENL19", "LAVD-ENO25", "LAVD-ENS29", "LAVD-ENS24",
    "LAVD-ENL40", "LAVD-ENL21", "LAVD-ENS34", "LAVD-ENS32", "LAVD-ENO01", "LAVD-ENL01", "LAVD-ENO36", "LAVD-ENL16", "LAVD-ENL15", "LAVD-ENL18",
    "LAVD-ENL25", "LAVD-ENS25", "LAVD-ENS33", "LAVD-ENS31", "LAVD-ENS35", "LAVD-ENS26", "LAVD-ENS30", "LAVD-ENS28", "LAVD-ENS36", "LAVD-ENO33",
    "LAVD-ENL27", "LAVD-ENL17", "LAVD-ENL02", "LAVD-ENL30", "LAVD-ENL07", "LAVD-ENL20", "LAVD-ENL11", "LAVD-ENL05", "LAVD-ENL32", "LAVD-ENL34",
    "LAVD-ENL26", "LAVD-ENL31", "LAVD-ENL33", "LAVD-ENL13", "LAVD-ENL28", "LAVD-ENL04", "LAVD-ENL08", "LAVD-ENS13", "LAVD-ENL10", "LAVD-ENO18",
    "LAVD-ENS10", "LAVD-ENO28", "LAVD-ENO11", "LAVD-ENO06", "LAVD-ENO38", "LAVD-ENO05", "LAVD-ENO29", "LAVD-ENO27", "LAVD-ENO30", "LAVD-ENO12",
    "LAVD-ENO26", "LAVD-ENO24", "LAVD-ENL37", "LAVD-ENO15", "LAVD-ENO16", "LAVD-ENO13", "LAVD-ENO09", "LAVD-ENO17", "LAVD-ENO10", "LAVD-ENO14",
    "LAVD-ENO02", "LAVD-ENO03", "LAVD-ENL14", "LAVD-ENL23", "LAVD-ENO23", "LAVD-ENO21",
    "LAVD-ENL35", "LAVD-ENL12", "LAVD-ENL03", "LAVD-ENO04",
    "LAVD-ENO31", "LAVD-ENL41", "LAVD-ENL39", "LAVD-ENS23", "LAVD-ENS15",
    "LAVD-ENS07", "LAVD-ENS04", "LAVD-ENS22", "LAVD-ENS06", "LAVD-ENS12",
    "LAVD-ENS27", "LAVD-ENL29", "LAVD-ENL38", "LAVD-ENL09", "LAVD-ENL22", "LAVD-ENL24",
    "LAVD-ENO22", "LAVD-ENO19", "LAVD-ENS16", "LAVD-ENS11", "LAVD-ENS09", "LAVD-ENS20", "LAVD-ENS05", "LAVD-ENS03", "LAVD-ENS19", "LAVD-ENS14"
]);
const YGO_ATTRIBUTE_OPTIONS = [
    YGO_DEFAULT_ATTRIBUTE_OPTION,
    "DARK",
    "DIVINE",
    "EARTH",
    "FIRE",
    "LIGHT",
    "WATER",
    "WIND"
];
const YGO_RACE_OPTIONS = [
    YGO_DEFAULT_RACE_OPTION,
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Creator-God",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
    "Normal",
    "Field",
    "Equip",
    "Continuous",
    "Quick-Play",
    "Ritual",
    "Counter"
];
const YGO_FORMAT_OPTIONS = [
    YGO_DEFAULT_FORMAT_OPTION,
    "TCG",
    "OCG",
    "Goat",
    "Speed Duel",
    "Duel Links",
    "Master Duel",
    "Rush Duel"
];
const YGO_EFFECT_OPTIONS = [
    YGO_DEFAULT_EFFECT_OPTION,
    "Has Effect Text",
    "No Effect Text"
];
const YGO_LEVEL_OPTIONS = [
    YGO_DEFAULT_LEVEL_OPTION,
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
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
    "overpowered||ghost files": "Limit 1 per Deck",
    "overwhelming odds||betrayal": "Limit 1 per Deck",
    "reckless charge||exile": "Limit 1 per Deck",
    "rejected||exile": "Limit 1 per Deck",
    "rejected!||exile": "Limit 1 per Deck",
    "sacrifice of life||ghost files": "Limit 1 per Deck",
    "scatter shot||exile": "Limit 1 per Deck",
    "take me!||exile": "Limit 1 per Deck",
    "team raizen's support||exile": "Limit 1 per Deck",
    "together until the end of time||dark tournament": "Limit 1 per Deck",
    "unconsious||ghost files": "Limit 1 per Deck",
    "yusuke's fury||betrayal": "Limit 1 per Deck",
    "recuperation||ghost files": "Limit 1 per Deck",
    "recuperation||betrayal": "Limit 1 per Deck",
    "burst of power||ghost files": "Limit 1 per Deck",
    "burst of power||dark tournament": "Limit 1 per Deck",
    "forlorn hope||dark tournament": "Limit 1 per Deck",
    "allied forces||dark tournament": "Limit 1 per Deck",
    "ooops||dark tournament": "Limit 1 per Deck",
    "ooops!||dark tournament": "Limit 1 per Deck",
    "genkai's hat||dark tournament": "Limit 1 per Deck",
    "mini game, action battle||gateway": "Limit 1 per Deck",
    "invasion||gateway": "Limit 1 per Deck",
    "yusuke's tainted glare||gateway": "Limit 1 per Deck",
    "hiei's tainted glare||gateway": "Limit 1 per Deck",
    "kurama's tainted glare||gateway": "Limit 1 per Deck",
    "kuwabara's tainted glare||gateway": "Limit 1 per Deck",
    "mad bomb||gateway": "Limit 1 per Deck",
    "in shadow||exile": "Limit 1 per Deck",
    "yusuke's altar||exile": "Limit 1 per Deck",
    "grand entrance||exile": "Limit 1 per Deck",
    "unknown allies||exile": "Limit 1 per Deck",
    "bizarre!||exile": "Limit 1 per Deck",
    "dark artifacts||exile": "Limit 1 per Deck",
    "magical drink||exile": "Limit 1 per Deck",
    "the end||exile": "Limit 1 per Deck",
    "villainous energy||exile": "Limit 1 per Deck",
    "grudge match||betrayal": "Limit 1 per Deck",
    "quick freeze||alliance": "Limit 1 per Deck",
    "double block||gateway": "Limit 1 per Deck",
    "virus carriers||gateway": "Limit 1 per Deck",
    "stand off||dark tournament": "Limit 2 per Deck",
    "freak show||dark tournament": "Limit 2 per Deck"
};
const YYH_LIMIT_ONE_EXCLUSION_LOOKUP = {
    "molotov cocktail||alliance": true,
    "kaitou's rules||alliance": true,
    "bond of friends||betrayal": true,
    "bond of friends||dark tournament": true,
    "jin, the wind master||betrayal": true,
    "koto, the mc||betrayal": true,
    "mother's tears||betrayal": true,
    "determination||dark tournament": true,
    "ace of spades||dark tournament": true,
    "genkai, young fighter||dark tournament": true,
    "flee the arena||dark tournament": true,
    "mukuro's unforgiving glare||exile": true,
    "kuroko, former spirit detective||exile": true,
    "kuwabara, righteous warrior||gateway": true,
    "surprised?||gateway": true,
    "sayaka, the investigator||gateway": true,
    "game battler||gateway": true
};
let fallbackDataCache = null;
let pricingDataCache = new Map();
let allYyhSetPricingCache = null;
let kingSetNotesCache = null;
let ygoSetOptionsCache = null;
let ygoSetReleaseDateCache = new Map();
let ygoArchetypeOptionsCache = null;
let ygoVariantInventoryCache = new Map();

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
            YYH_PROMO_FAMILY_RARITY_OPTION,
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
        types: [
            "All Types",
            "Normal Monster",
            "Effect Monster",
            "Ritual Monster",
            "Fusion Monster",
            "Synchro Monster",
            "XYZ Monster",
            "Link Monster",
            "Pendulum Effect Monster",
            "Spell Card",
            "Trap Card",
            "Token",
            "Skill Card"
        ],
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

const INVENTORY_GAME_NAV_CONFIG = {
    "All Games": {
        featureLabel: "Kings",
        featureHref: "kings.html",
        inventoryHref: "inventory.html",
        setsHref: "sets.html"
    },
    "Yu Yu Hakusho": {
        featureLabel: "Kings",
        featureHref: "kings.html",
        inventoryHref: "inventory.html?game=Yu%20Yu%20Hakusho",
        setsHref: "sets.html?game=Yu%20Yu%20Hakusho"
    },
    "Yu-Gi-Oh": {
        featureLabel: "Win Cons",
        featureHref: "kings.html?game=Yu-Gi-Oh&mode=wincons",
        inventoryHref: "inventory.html?game=Yu-Gi-Oh",
        setsHref: "sets.html?game=Yu-Gi-Oh"
    },
    "Pokemon": {
        featureLabel: "Starters",
        featureHref: "kings.html?game=Pokemon&mode=starters",
        inventoryHref: "inventory.html?game=Pokemon",
        setsHref: "sets.html?game=Pokemon"
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

function hasLimitOnePerDeckText(effectText) {
    const normalizedEffect = normalizeForSearch(effectText);
    if (!normalizedEffect) {
        return false;
    }

    // Handles common OCR/typing variants such as "limt 1 per deck" and "limit 1 deck".
    return /\blim(?:it|t)\s+1\s+per\s+deck\b/.test(normalizedEffect)
        || /\blim(?:it|t)\s+1\s+deck\b/.test(normalizedEffect);
}

function getGameplayStatus(cardRecord) {
    if (normalizeGameplayLookupValue(cardRecord.game) !== "yu yu hakusho") {
        return "";
    }

    const lookupKey = [cardRecord.name, cardRecord.set]
        .map(normalizeGameplayLookupValue)
        .join("||");
    const isLimitOneExclusion = Boolean(YYH_LIMIT_ONE_EXCLUSION_LOOKUP[lookupKey]);

    const explicitStatus = YYH_GAMEPLAY_STATUS_BY_CARD[lookupKey] || "";
    if (explicitStatus === "Limit 1 per Deck" && isLimitOneExclusion) {
        return "";
    }

    if (explicitStatus) {
        return explicitStatus;
    }

    if (isLimitOneExclusion) {
        return "";
    }

    return "";
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

        if (cardId === "TR8" || normalizedName === "minigameflightshooter") {
            aliases.push("T08");
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
    const normalizedSet = normalizeForSearch(cardRecord.set);
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
    const isGatewayReprintVariant = normalizedSet === "gateway" && Boolean(primaryVariantShortToken);

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
        isGatewayReprintVariant && primaryVariantShortToken && paddedThreeDigitNumber ? `Reprint${paddedThreeDigitNumber}${primaryVariantShortToken}` : "",
        isGatewayReprintVariant && primaryVariantShortToken && alphaPrefix && paddedTwoDigitNumber ? `Reprint${alphaPrefix}${paddedTwoDigitNumber}${primaryVariantShortToken}` : "",
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
        const directImageUrl = String(imageElement.dataset.cardImageUrl || "").trim();
        if (directImageUrl) {
            imageElement.onerror = null;
            imageElement.src = directImageUrl;
            continue;
        }

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

    if (rarity.includes("gold rare")) {
        return "inventory-card--rarity-gold";
    }

    if (rarity.includes("ultimate rare")) {
        return "inventory-card--rarity-ultimate";
    }

    if (rarity.includes("secret rare")) {
        return "inventory-card--rarity-secret";
    }

    if (rarity.includes("super rare")) {
        return "inventory-card--rarity-super";
    }

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

function isDarkOneCard(cardRecord) {
    const name = String(cardRecord?.name || "").trim().toLowerCase();
    return name === "the dark one" || name.startsWith("the dark one (");
}

function isSignedDarkOneCard(cardRecord) {
    return isDarkOneCard(cardRecord) && String(cardRecord?.variant || "").trim().toLowerCase() === "signed";
}

function getRarityChipData(cardRecord) {
    const rarityText = String(cardRecord.rarity || "").trim();
    const normalizedRarity = rarityText.toLowerCase();

    if (normalizedRarity.includes("ultimate rare")) {
        return {
            label: "Ult R",
            chipClass: "inventory-card__rarity-chip--ultimate",
            ariaLabel: `${rarityText} rarity`
        };
    }

    if (normalizedRarity.includes("secret rare")) {
        return {
            label: "SCR",
            chipClass: "inventory-card__rarity-chip--secret",
            ariaLabel: `${rarityText} rarity`
        };
    }

    if (normalizedRarity.includes("super rare")) {
        return {
            label: "SR",
            chipClass: "inventory-card__rarity-chip--super",
            ariaLabel: `${rarityText} rarity`
        };
    }

    if (normalizedRarity.includes("ultra rare")) {
        return {
            label: "UR",
            chipClass: "inventory-card__rarity-chip--ultra",
            ariaLabel: `${rarityText} rarity`
        };
    }

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

    const isRolloutCard = game === "Yu-Gi-Oh" && (
        (setName === YGO_VARIANT_ROLLOUT_SET && YGO_VARIANT_ROLLOUT_IDS.has(id))
        || (setName === YGO_VARIANT_ROLLOUT_NEXT_SET && YGO_VARIANT_ROLLOUT_NEXT_IDS.has(id))
        || (setName === YGO_VARIANT_ROLLOUT_THIRD_SET && YGO_VARIANT_ROLLOUT_THIRD_IDS.has(id))
        || (setName === YGO_VARIANT_ROLLOUT_FOURTH_SET && YGO_VARIANT_ROLLOUT_FOURTH_IDS.has(id))
    );
    if (isRolloutCard) {
        destination.searchParams.set("variantMode", "rarity");
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
    const isDarkOne = isDarkOneCard(cardRecord);
    if (isDarkOne) {
        cardClasses.push("inventory-card--dark-one");
    }
    if (isSignedDarkOneCard(cardRecord)) {
        cardClasses.push("inventory-card--dark-one-signed");
    }
    const cardClassName = cardClasses.join(" ");
    const rarityChipData = getRarityChipData(cardRecord);
    const rarityChipMarkup = rarityChipData
        ? `<span class="inventory-card__rarity-chip ${rarityChipData.chipClass}" aria-label="${escapeHtml(rarityChipData.ariaLabel)}" data-rarity-tooltip="${escapeHtml(cardRecord.rarity)}" title="${escapeHtml(cardRecord.rarity)}">${escapeHtml(rarityChipData.label)}</span>`
        : "";

    const metaPieces = [cardRecord.type, cardRecord.rarity].filter(Boolean);
    if (showCardIdInMeta) {
        metaPieces.unshift(cardRecord.id);
    }

    const priceStatus = cardRecord.priceStatus || PRICE_STATUS_UNPRICED_OPTION;
    const cardPageUrl = buildCardPageUrl(cardRecord);
    const gameplayStatus = getGameplayStatus(cardRecord);
    const gameplayClass = gameplayStatus === "Banned" ? "banned" : "limited";
    const gameplayBadgeText = gameplayStatus === "Banned"
        ? "B"
        : gameplayStatus === "Limit 2 per Deck"
            ? "2"
            : "1";
    const gameplayChipMarkup = gameplayStatus
        ? `<span class="inventory-card__gameplay-chip inventory-card__gameplay-chip--${escapeHtml(gameplayClass)}" data-gameplay-status="Gameplay Status: ${escapeHtml(gameplayStatus)}" title="Gameplay Status: ${escapeHtml(gameplayStatus)}" aria-label="Gameplay status ${escapeHtml(gameplayStatus)}">${escapeHtml(gameplayBadgeText)}</span>`
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
                        data-card-image-url="${escapeHtml(cardRecord.imageUrl || "") }"
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
        edition: resolveFirstNonEmpty(card.edition, card.printing),
        effect: resolveFirstNonEmpty(card.effect, card.text, card.notes),
        imageUrl: resolveFirstNonEmpty(
            card.imageUrl,
            card.image_url_small,
            card.image_url,
            card.image_url_cropped
        ),
        setReleaseDate: resolveFirstNonEmpty(card.setReleaseDate)
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

        if (filterState.rarity !== "All Rarities") {
            if (filterState.rarity === YYH_PROMO_FAMILY_RARITY_OPTION) {
                if (!isYyhPromoFamilyRarity(record.rarity)) {
                    return false;
                }
            } else if (record.rarity !== filterState.rarity) {
                return false;
            }
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

function syncInventoryNotes(filterState) {
    const gameplayNote = document.getElementById("inventory-gameplay-note");
    const dataNote = document.getElementById("inventory-data-note");
    const isYyhSelected = filterState.game === "Yu Yu Hakusho";

    if (gameplayNote instanceof HTMLElement) {
        gameplayNote.hidden = !isYyhSelected;
        gameplayNote.textContent = isYyhSelected
            ? "Gameplay note: YYH-only banned and limit 1 status can be filtered here."
            : "";
    }

    if (dataNote instanceof HTMLElement) {
        dataNote.hidden = !isYyhSelected;
        dataNote.textContent = isYyhSelected
            ? "YYH inventory reads live API data and supports full card datasets; source credit remains with inviso (Mike) and the Yu Yu Hakusho TCG Database."
            : "";
    }
}

function syncInventoryNav(selectedGame) {
    const navConfig = INVENTORY_GAME_NAV_CONFIG[selectedGame] || INVENTORY_GAME_NAV_CONFIG["All Games"];
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
}

function syncYgoFilterLabels(rarityFilter, editionFilter, variantFocusFilter, priceStatusFilter, gameplayStatusFilter) {
    rarityFilter.setAttribute("aria-label", "Filter by attribute");
    editionFilter.setAttribute("aria-label", "Filter by race");
    variantFocusFilter.setAttribute("aria-label", "Filter by format");
    priceStatusFilter.setAttribute("aria-label", "Filter by effect text");
    gameplayStatusFilter.setAttribute("aria-label", "Filter by level or rank");
}

function syncDefaultFilterLabels(rarityFilter, editionFilter, variantFocusFilter, priceStatusFilter, gameplayStatusFilter) {
    rarityFilter.setAttribute("aria-label", "Filter by rarity");
    editionFilter.setAttribute("aria-label", "Filter by edition");
    variantFocusFilter.setAttribute("aria-label", "Filter by finish");
    priceStatusFilter.setAttribute("aria-label", "Filter by price status");
    gameplayStatusFilter.setAttribute("aria-label", "Filter by gameplay status");
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
    const scopedOptions = baseRarities.filter((rarityOption) => {
        if (rarityOption === "All Rarities") {
            return true;
        }

        if (rarityOption === YYH_PROMO_FAMILY_RARITY_OPTION) {
            return scopedRecords.some((record) => isYyhPromoFamilyRarity(record.rarity));
        }

        return presentRarities.has(rarityOption);
    });

    if (scopedOptions.length === 0) {
        return ["All Rarities"];
    }

    if (!scopedOptions.includes("All Rarities")) {
        return ["All Rarities", ...scopedOptions];
    }

    return scopedOptions;
}

function isYyhPromoFamilyRarity(rarityValue) {
    const rarityLabel = String(rarityValue || "").toUpperCase();
    const rarityPrefix = rarityLabel.split("-")[0].trim();
    return rarityPrefix === "P"
        || rarityPrefix === "V"
        || rarityPrefix === "X"
        || rarityPrefix === "TX"
        || rarityPrefix === "SK";
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

function parseComparableReleaseDate(value) {
    const timestamp = new Date(String(value || "")).getTime();
    return Number.isFinite(timestamp) ? timestamp : Number.NaN;
}

function isYyhCardRecord(cardRecord) {
    return normalizeGameplayLookupValue(cardRecord?.game) === "yu yu hakusho";
}

function getYyhRarityChecklistRank(cardRecord) {
    const rarityLabel = String(cardRecord?.rarity || "").toUpperCase();
    const rarityPrefix = rarityLabel.split("-")[0].trim();
    const rankByPrefix = {
        G: 0,
        U: 1,
        S: 2,
        R: 3,
        C: 4,
        TG: 5,
        TU: 6,
        TS: 7,
        TR: 8,
        TC: 9,
        P: 10,
        V: 11,
        X: 12,
        TX: 13,
        SK: 14,
        ST: 15
    };

    if (Object.prototype.hasOwnProperty.call(rankByPrefix, rarityPrefix)) {
        return rankByPrefix[rarityPrefix];
    }

    return 99;
}

function compareCardNumberOrder(a, b, direction = 1) {
    const aParts = parseCardIdParts(a);
    const bParts = parseCardIdParts(b);

    const setCompare = a.set.localeCompare(b.set);
    if (setCompare !== 0) {
        return setCompare;
    }

    // YYH checklist order is rarity-bucket-first inside each set.
    if (isYyhCardRecord(a) && isYyhCardRecord(b)) {
        const rarityRankCompare = getYyhRarityChecklistRank(a) - getYyhRarityChecklistRank(b);
        if (rarityRankCompare !== 0) {
            return rarityRankCompare * direction;
        }
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
    case "Set Release (Latest First)":
        sorted.sort((a, b) => {
            const aDate = parseComparableReleaseDate(a.setReleaseDate);
            const bDate = parseComparableReleaseDate(b.setReleaseDate);
            const aHasDate = Number.isFinite(aDate);
            const bHasDate = Number.isFinite(bDate);

            if (aHasDate && bHasDate && aDate !== bDate) {
                return bDate - aDate;
            }
            if (aHasDate && !bHasDate) {
                return -1;
            }
            if (!aHasDate && bHasDate) {
                return 1;
            }

            return compareCardNumberOrder(a, b, 1);
        });
        break;
    case "Set Release (Earliest First)":
        sorted.sort((a, b) => {
            const aDate = parseComparableReleaseDate(a.setReleaseDate);
            const bDate = parseComparableReleaseDate(b.setReleaseDate);
            const aHasDate = Number.isFinite(aDate);
            const bHasDate = Number.isFinite(bDate);

            if (aHasDate && bHasDate && aDate !== bDate) {
                return aDate - bDate;
            }
            if (aHasDate && !bHasDate) {
                return -1;
            }
            if (!aHasDate && bHasDate) {
                return 1;
            }

            return compareCardNumberOrder(a, b, 1);
        });
        break;
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
    const archetypeFilter = document.getElementById("inventory-archetype-filter");
    return {
        query: searchFilter.value,
        game: gameFilter.value,
        set: setFilter.value,
        type: typeFilter.value,
        archetype: archetypeFilter instanceof HTMLSelectElement ? archetypeFilter.value : YGO_DEFAULT_ARCHETYPE_OPTION,
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
        archetype: params.get("archetype") || "",
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

async function loadYgoSetOptions() {
    if (Array.isArray(ygoSetOptionsCache) && ygoSetOptionsCache.length > 0) {
        return ygoSetOptionsCache;
    }

    try {
        const response = await fetch(YGO_CARDSETS_API_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`YGO set request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (!Array.isArray(payload)) {
            throw new Error("Invalid YGO set payload shape");
        }

        const setNames = payload
            .map((item) => String(item?.set_name || "").trim())
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

        ygoSetReleaseDateCache = new Map(
            payload
                .map((item) => {
                    const setName = String(item?.set_name || "").trim();
                    const tcgDate = String(item?.tcg_date || "").trim();
                    return setName ? [setName, tcgDate] : null;
                })
                .filter(Boolean)
        );

        ygoSetOptionsCache = ["All Sets", ...Array.from(new Set(setNames))];
        FILTER_OPTIONS_BY_GAME["Yu-Gi-Oh"].sets = ygoSetOptionsCache;
        return ygoSetOptionsCache;
    } catch {
        return FILTER_OPTIONS_BY_GAME["Yu-Gi-Oh"].sets;
    }
}

async function loadYgoArchetypeOptions() {
    if (Array.isArray(ygoArchetypeOptionsCache) && ygoArchetypeOptionsCache.length > 0) {
        return ygoArchetypeOptionsCache;
    }

    try {
        const response = await fetch(YGO_ARCHETYPES_API_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`YGO archetype request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const archetypeNames = Array.isArray(payload)
            ? payload.map((item) => String(item?.archetype_name || item?.archetype || "").trim()).filter(Boolean)
            : [];

        ygoArchetypeOptionsCache = [YGO_DEFAULT_ARCHETYPE_OPTION, ...Array.from(new Set(archetypeNames)).sort((a, b) => a.localeCompare(b))];
        return ygoArchetypeOptionsCache;
    } catch {
        return [YGO_DEFAULT_ARCHETYPE_OPTION];
    }
}

function getSelectedYgoSetEntry(cardPayload, selectedSetName) {
    const setRows = Array.isArray(cardPayload?.card_sets) ? cardPayload.card_sets : [];
    if (selectedSetName && selectedSetName !== "All Sets") {
        const exactMatch = setRows.find((row) => String(row?.set_name || "").trim() === selectedSetName);
        if (exactMatch) {
            return exactMatch;
        }
    }

    return setRows[0] || null;
}

function getSelectedYgoSetEntries(cardPayload, selectedSetName, includeVariants = false) {
    const setRows = Array.isArray(cardPayload?.card_sets) ? cardPayload.card_sets : [];
    if (setRows.length === 0) {
        return [null];
    }

    const scopedRows = selectedSetName && selectedSetName !== "All Sets"
        ? setRows.filter((row) => String(row?.set_name || "").trim() === selectedSetName)
        : setRows;

    const selectedRows = scopedRows.length > 0 ? scopedRows : setRows;
    if (!includeVariants) {
        return [selectedRows[0] || null];
    }

    return selectedRows;
}

function mapYgoCardToInventoryRecord(cardPayload, setEntry, includeVariants = false) {
    const firstImage = Array.isArray(cardPayload?.card_images) ? cardPayload.card_images[0] : null;
    const setCode = String(setEntry?.set_code || cardPayload?.id || "").trim() || String(cardPayload?.id || "UNKNOWN");
    const variantLabel = includeVariants
        ? resolveFirstNonEmpty(setEntry?.set_code, setEntry?.set_rarity, "Standard")
        : "Standard";

    return normalizeCardRecord({
        id: setCode,
        number: setCode,
        game: "Yu-Gi-Oh",
        set: String(setEntry?.set_name || "Various Sets").trim() || "Various Sets",
        name: String(cardPayload?.name || "").trim(),
        archetype: resolveFirstNonEmpty(cardPayload?.archetype),
        type: String(cardPayload?.type || cardPayload?.race || "Unknown Type").trim(),
        rarity: String(setEntry?.set_rarity || "Unknown Rarity").trim() || "Unknown Rarity",
        variant: variantLabel,
        edition: resolveFirstNonEmpty(setEntry?.set_edition),
        effect: String(cardPayload?.desc || "").trim(),
        setReleaseDate: resolveFirstNonEmpty(ygoSetReleaseDateCache.get(String(setEntry?.set_name || "").trim())),
        imageUrl: resolveFirstNonEmpty(
            firstImage?.image_url_small,
            firstImage?.image_url,
            firstImage?.image_url_cropped
        )
    });
}

function buildYgoVariantCacheKey(filterState) {
    return JSON.stringify({
        query: String(filterState.query || "").trim(),
        game: filterState.game,
        set: filterState.set,
        type: filterState.type,
        archetype: filterState.archetype,
        attribute: filterState.rarity,
        race: filterState.edition,
        format: filterState.variantFocus,
        effect: filterState.priceStatus,
        level: filterState.gameplayStatus
    });
}

async function loadAllYgoVariantRecords(filterState) {
    const cacheKey = buildYgoVariantCacheKey(filterState);
    if (ygoVariantInventoryCache.has(cacheKey)) {
        return ygoVariantInventoryCache.get(cacheKey);
    }

    const collectedCards = [];
    let offset = 0;
    let totalRows = Number.POSITIVE_INFINITY;

    while (collectedCards.length < totalRows) {
        const endpoint = new URL(YGO_CARDINFO_API_URL);
        const query = String(filterState.query || "").trim();

        if (query) {
            if (/^\d+$/.test(query)) {
                endpoint.searchParams.set("id", query);
            } else {
                endpoint.searchParams.set("fname", query);
            }
        }

        if (filterState.set && filterState.set !== "All Sets") {
            endpoint.searchParams.set("cardset", filterState.set);
        }
        if (filterState.type && filterState.type !== "All Types") {
            endpoint.searchParams.set("type", filterState.type);
        }
        if (filterState.archetype && filterState.archetype !== YGO_DEFAULT_ARCHETYPE_OPTION) {
            endpoint.searchParams.set("archetype", filterState.archetype);
        }
        if (filterState.rarity && filterState.rarity !== YGO_DEFAULT_ATTRIBUTE_OPTION) {
            endpoint.searchParams.set("attribute", filterState.rarity);
        }
        if (filterState.edition && filterState.edition !== YGO_DEFAULT_RACE_OPTION) {
            endpoint.searchParams.set("race", filterState.edition);
        }
        if (filterState.variantFocus && filterState.variantFocus !== YGO_DEFAULT_FORMAT_OPTION) {
            endpoint.searchParams.set("format", filterState.variantFocus);
        }
        if (filterState.priceStatus === "Has Effect Text") {
            endpoint.searchParams.set("has_effect", "true");
        } else if (filterState.priceStatus === "No Effect Text") {
            endpoint.searchParams.set("has_effect", "false");
        }
        if (filterState.gameplayStatus && filterState.gameplayStatus !== YGO_DEFAULT_LEVEL_OPTION) {
            endpoint.searchParams.set("level", filterState.gameplayStatus);
        }

        endpoint.searchParams.set("num", String(YGO_VARIANT_FETCH_LIMIT));
        endpoint.searchParams.set("offset", String(offset));

        const response = await fetch(endpoint.toString(), { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`YGO variant request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const pageCards = Array.isArray(payload?.data) ? payload.data : [];
        const metaTotalRows = Number(payload?.meta?.total_rows);
        totalRows = Number.isFinite(metaTotalRows) ? metaTotalRows : pageCards.length;
        collectedCards.push(...pageCards);

        if (pageCards.length === 0 || collectedCards.length >= totalRows) {
            break;
        }

        offset += pageCards.length;
    }

    const expandedRecords = collectedCards.flatMap((cardPayload) => {
        const setEntries = getSelectedYgoSetEntries(cardPayload, filterState.set, true);
        return setEntries.map((setEntry) => mapYgoCardToInventoryRecord(cardPayload, setEntry, true));
    });

    ygoVariantInventoryCache.set(cacheKey, expandedRecords);
    return expandedRecords;
}

async function loadYgoInventoryPage(filterState, offset = INVENTORY_DEFAULT_OFFSET) {
    const endpoint = new URL(YGO_CARDINFO_API_URL);
    const query = String(filterState.query || "").trim();
    const pageLimit = getInventoryPageLimit();

    if (query) {
        if (/^\d+$/.test(query)) {
            endpoint.searchParams.set("id", query);
        } else {
            endpoint.searchParams.set("fname", query);
        }
    }

    if (filterState.set && filterState.set !== "All Sets") {
        endpoint.searchParams.set("cardset", filterState.set);
    }

    if (filterState.type && filterState.type !== "All Types") {
        endpoint.searchParams.set("type", filterState.type);
    }
    if (filterState.archetype && filterState.archetype !== YGO_DEFAULT_ARCHETYPE_OPTION) {
        endpoint.searchParams.set("archetype", filterState.archetype);
    }

    if (filterState.rarity && filterState.rarity !== YGO_DEFAULT_ATTRIBUTE_OPTION) {
        endpoint.searchParams.set("attribute", filterState.rarity);
    }

    if (filterState.edition && filterState.edition !== YGO_DEFAULT_RACE_OPTION) {
        endpoint.searchParams.set("race", filterState.edition);
    }

    if (filterState.variantFocus && filterState.variantFocus !== YGO_DEFAULT_FORMAT_OPTION) {
        endpoint.searchParams.set("format", filterState.variantFocus);
    }

    if (filterState.priceStatus === "Has Effect Text") {
        endpoint.searchParams.set("has_effect", "true");
    } else if (filterState.priceStatus === "No Effect Text") {
        endpoint.searchParams.set("has_effect", "false");
    }

    if (filterState.gameplayStatus && filterState.gameplayStatus !== YGO_DEFAULT_LEVEL_OPTION) {
        endpoint.searchParams.set("level", filterState.gameplayStatus);
    }

    endpoint.searchParams.set("num", String(pageLimit));
    endpoint.searchParams.set("offset", String(offset));

    const response = await fetch(endpoint.toString(), { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`YGO inventory request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.data)
        ? payload.data.map((cardPayload) => {
            const setEntry = getSelectedYgoSetEntries(cardPayload, filterState.set, false)[0] || getSelectedYgoSetEntry(cardPayload, filterState.set);
            return mapYgoCardToInventoryRecord(cardPayload, setEntry, false);
        })
        : [];
    const total = Number(payload?.meta?.total_rows) || items.length;
    const rowsRemaining = Number(payload?.meta?.rows_remaining);

    return {
        items,
        total,
        hasMore: Number.isFinite(rowsRemaining) ? rowsRemaining > 0 : offset + items.length < total
    };
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
    const archetypeFilter = document.getElementById("inventory-archetype-filter");
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
    const variantsSummary = document.getElementById("inventory-variants-summary");
    const initialFilters = readInitialFiltersFromUrl();

    if (!searchFilter || !gameFilter || !setFilter || !typeFilter || !archetypeFilter || !rarityFilter || !editionFilter || !variantFocusFilter || !priceStatusFilter || !gameplayStatusFilter || !sortFilter || !variantsToggle || !resultsMeta || !resultsGrid || !loadMoreButton || !loadMoreProgress || !setContextElement || !variantsSummary) {
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
    await loadYgoSetOptions();
    await loadYgoArchetypeOptions();

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

    const updateVariantsSummary = (filterState, totalCount) => {
        if (!(variantsSummary instanceof HTMLElement)) {
            return;
        }

        if (filterState.game === "Yu-Gi-Oh") {
            variantsSummary.textContent = filterState.includeVariants
                ? `Expanded view shows ${Number(totalCount || 0).toLocaleString()} total printings.`
                : `Collapsed view groups printings into ${Number(totalCount || 0).toLocaleString()} unique cards.`;
            return;
        }

        variantsSummary.textContent = "Collapsed view groups printings into one card entry.";
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
            updateVariantsSummary(filterState, 0);
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
            updateVariantsSummary(filterState, 0);
            resultsMeta.textContent = `Type ${MIN_SEARCH_CHARACTERS} or more characters to search`;
            return;
        }

        if (requestId !== renderRequestId) {
            return;
        }

        if (filterState.game === "Yu-Gi-Oh") {
            let sourceRecords = [];
            let ygoTotal = 0;
            let ygoHasMore = false;

            try {
                if (normalizedQuery) {
                    const allSearchRecords = await loadAllYgoVariantRecords(filterState);
                    if (requestId !== renderRequestId) {
                        return;
                    }

                    const groupedSearchRecords = filterState.includeVariants
                        ? allSearchRecords
                        : allSearchRecords.filter((record, index, records) => {
                            const displayKey = getCardDisplayKey(record);
                            return records.findIndex((item) => getCardDisplayKey(item) === displayKey) === index;
                        });
                    const sortedSearchRecords = sortInventoryRecords(groupedSearchRecords, "Name (A-Z)");

                    ygoTotal = sortedSearchRecords.length;
                    sourceRecords = sortedSearchRecords.slice(offset, offset + getInventoryPageLimit());
                    ygoHasMore = offset + sourceRecords.length < ygoTotal;
                } else if (filterState.includeVariants) {
                    const ygoVariantRecords = await loadAllYgoVariantRecords(filterState);
                    if (requestId !== renderRequestId) {
                        return;
                    }

                    const sortedVariantRecords = sortInventoryRecords(ygoVariantRecords, filterState.sort);
                    ygoTotal = sortedVariantRecords.length;
                    sourceRecords = sortedVariantRecords.slice(offset, offset + getInventoryPageLimit());
                    ygoHasMore = offset + sourceRecords.length < ygoTotal;
                } else {
                    const ygoResult = await loadYgoInventoryPage(filterState, offset);
                    if (requestId !== renderRequestId) {
                        return;
                    }

                    sourceRecords = sortInventoryRecords(ygoResult.items, filterState.sort);
                    ygoTotal = ygoResult.total;
                    ygoHasMore = Boolean(ygoResult.hasMore);
                }
            } catch (error) {
                const reason = error instanceof Error ? error.message : "Unknown loading error";
                renderInventoryError(resultsGrid, resultsMeta, `Unable to load Yu-Gi-Oh data (${reason}).`);
                return;
            }

            const collisionCountMap = buildCollisionCountMap(sourceRecords);
            const variantFamilyCountMap = buildVariantFamilyCountMap(sourceRecords);

            if (!append && sourceRecords.length === 0) {
                resultsGrid.hidden = false;
                resultsGrid.classList.remove("inventory-grid--thumbnail-mode");
                resultsGrid.innerHTML = `
                    <article class="inventory-card">
                        <div class="inventory-card__image" aria-hidden="true"></div>
                        <h3 class="inventory-card__title">No matching cards found</h3>
                        <p class="inventory-card__meta">Try adjusting game, set, type, rarity, or search text.</p>
                        <span class="inventory-card__tag">Searchable inventory</span>
                    </article>
                `;
                canLoadMore = false;
                updateLoadMoreButtonState();
                setLoadMoreProgress(0, 0, filterState.includeVariants);
                updateVariantsSummary(filterState, 0);
                resultsMeta.textContent = "0 cards matched • searchable inventory";
                return;
            }

            if (append) {
                resultsGrid.insertAdjacentHTML("beforeend", sourceRecords.map((cardRecord) => makeInventoryCard(cardRecord, collisionCountMap, variantFamilyCountMap, false, false)).join(""));
                resultsGrid.classList.add("inventory-grid--thumbnail-mode");
            } else {
                resultsGrid.innerHTML = sourceRecords.map((cardRecord) => makeInventoryCard(cardRecord, collisionCountMap, variantFamilyCountMap, false, false)).join("");
            }

            cardsShown = append ? cardsShown + sourceRecords.length : sourceRecords.length;
            canLoadMore = ygoHasMore;
            updateLoadMoreButtonState();
            setLoadMoreProgress(cardsShown, ygoTotal, filterState.includeVariants);
            updateVariantsSummary(filterState, ygoTotal);
            hydrateInventoryCardImages(resultsGrid);
            resultsMeta.textContent = filterState.includeVariants
                ? `${cardsShown} of ${ygoTotal} total printings shown • searchable inventory`
                : `${cardsShown} of ${ygoTotal} cards shown • searchable inventory`;
            return;
        }

        const setPricingData = filterState.game === "Yu Yu Hakusho"
            ? (filterState.set === "All Sets"
                ? await loadAllYyhSetPricingMap(inventoryRecords)
                : await loadSetPricingMap(filterState.set))
            : createEmptyPricingData();
        if (requestId !== renderRequestId) {
            return;
        }
        const kingSetNotesMap = filterState.game === "Yu Yu Hakusho"
            ? await loadKingSetNotesMap()
            : new Map();
        if (requestId !== renderRequestId) {
            return;
        }
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
                    <span class="inventory-card__tag">Searchable inventory</span>
                </article>
            `;
            canLoadMore = false;
            updateLoadMoreButtonState();
            setLoadMoreProgress(0, 0, filterState.includeVariants);
            updateVariantsSummary(filterState, 0);
            resultsMeta.textContent = "0 cards matched • searchable inventory";
            return;
        }

        const pageLimit = getInventoryPageLimit();
        const renderedItems = sourceRecords.slice(offset, offset + pageLimit);
        if (requestId !== renderRequestId) {
            return;
        }

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
        updateVariantsSummary(filterState, totalForDisplay);
        hydrateInventoryCardImages(resultsGrid);
        if (filterState.includeVariants) {
            resultsMeta.textContent = `${cardsShown} of ${totalForDisplay} total entries • searchable inventory`;
        } else if (totalForDisplay > cardsShown) {
            resultsMeta.textContent = `${cardsShown} unique cards shown • ${totalForDisplay} unique total • searchable inventory`;
        } else {
            resultsMeta.textContent = `${cardsShown} unique cards shown • searchable inventory`;
        }
    };

    const syncConditionalFilters = (shouldRender = true) => {
        const selectedGame = gameFilter.value;
        const gameOptions = FILTER_OPTIONS_BY_GAME[selectedGame] || FILTER_OPTIONS_BY_GAME["All Games"];
        const previousSet = setFilter.value;
        const previousType = typeFilter.value;
        const previousArchetype = archetypeFilter.value;
        const previousRarity = rarityFilter.value;
        const previousEdition = editionFilter.value;
        const previousVariantFocus = variantFocusFilter.value;
        const previousPriceStatus = priceStatusFilter.value;
        const previousGameplayStatus = gameplayStatusFilter.value;
        const previousSort = sortFilter.value;
        const hasSelectedGame = selectedGame !== "All Games";
        const isYyhSelected = selectedGame === "Yu Yu Hakusho";
        const isYgoSelected = selectedGame === "Yu-Gi-Oh";

        syncInventoryNav(selectedGame);
        syncInventoryNotes({ game: selectedGame });

        const selectedGameSetOptions = selectedGame === "Yu-Gi-Oh"
            ? (Array.isArray(ygoSetOptionsCache) && ygoSetOptionsCache.length > 0
                ? ygoSetOptionsCache
                : gameOptions.sets)
            : gameOptions.sets;

        replaceSelectOptions(setFilter, selectedGameSetOptions);
        replaceSelectOptions(typeFilter, gameOptions.types);
        if (isYgoSelected) {
            replaceSelectOptions(archetypeFilter, Array.isArray(ygoArchetypeOptionsCache) && ygoArchetypeOptionsCache.length > 0
                ? ygoArchetypeOptionsCache
                : [YGO_DEFAULT_ARCHETYPE_OPTION]);
            archetypeFilter.disabled = false;
        } else {
            replaceSelectOptions(archetypeFilter, [YGO_DEFAULT_ARCHETYPE_OPTION]);
            archetypeFilter.disabled = true;
        }
        if (isYgoSelected) {
            replaceSelectOptions(rarityFilter, YGO_ATTRIBUTE_OPTIONS);
            replaceSelectOptions(editionFilter, YGO_RACE_OPTIONS);
            replaceSelectOptions(variantFocusFilter, YGO_FORMAT_OPTIONS);
            replaceSelectOptions(priceStatusFilter, YGO_EFFECT_OPTIONS);
            replaceSelectOptions(gameplayStatusFilter, YGO_LEVEL_OPTIONS);
            gameplayStatusFilter.disabled = false;
            syncYgoFilterLabels(rarityFilter, editionFilter, variantFocusFilter, priceStatusFilter, gameplayStatusFilter);
        } else {
            replaceSelectOptions(variantFocusFilter, VARIANT_FOCUS_OPTIONS);
            replaceSelectOptions(priceStatusFilter, PRICE_STATUS_OPTIONS);
            replaceSelectOptions(gameplayStatusFilter, isYyhSelected ? GAMEPLAY_STATUS_OPTIONS : [DEFAULT_GAMEPLAY_STATUS_OPTION]);
            gameplayStatusFilter.disabled = !isYyhSelected;
            syncDefaultFilterLabels(rarityFilter, editionFilter, variantFocusFilter, priceStatusFilter, gameplayStatusFilter);
        }
        replaceSelectOptions(sortFilter, isYgoSelected ? [
            YGO_DEFAULT_SORT_OPTION,
            "Set Release (Earliest First)",
            "Card Number (Low-High)",
            "Card Number (High-Low)",
            "Name (A-Z)",
            "Name (Z-A)",
            "Rarity (A-Z)",
            "Set (A-Z)"
        ] : [
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
        if (isYgoSelected && Array.from(archetypeFilter.options).some((option) => option.value === previousArchetype)) {
            archetypeFilter.value = previousArchetype;
        } else {
            archetypeFilter.value = YGO_DEFAULT_ARCHETYPE_OPTION;
        }
        const scopedRarityOptions = selectedGame === "Yu-Gi-Oh"
            ? YGO_ATTRIBUTE_OPTIONS
            : getScopedRarityOptions(
                inventoryRecords,
                {
                    query: searchFilter.value,
                    game: gameFilter.value,
                    set: setFilter.value,
                    type: typeFilter.value,
                    archetype: archetypeFilter.value,
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
        rarityFilter.disabled = false;

        if (scopedRarityOptions.includes(previousRarity)) {
            rarityFilter.value = previousRarity;
        }

        const scopedEditionOptions = selectedGame === "Yu-Gi-Oh"
            ? YGO_RACE_OPTIONS
            : getScopedEditionOptions(inventoryRecords, {
                query: searchFilter.value,
                game: gameFilter.value,
                set: setFilter.value,
                type: typeFilter.value,
                archetype: archetypeFilter.value,
                rarity: rarityFilter.value,
                edition: DEFAULT_EDITION_OPTION,
                variantFocus: variantFocusFilter.value,
                priceStatus: priceStatusFilter.value,
                gameplayStatus: gameplayStatusFilter.value,
                sort: sortFilter.value,
                includeVariants: Boolean(variantsToggle.checked)
            });
        replaceSelectOptions(editionFilter, scopedEditionOptions);
        editionFilter.disabled = false;

        if (scopedEditionOptions.includes(previousEdition)) {
            editionFilter.value = previousEdition;
        } else {
            editionFilter.value = DEFAULT_EDITION_OPTION;
        }

        if (VARIANT_FOCUS_OPTIONS.includes(previousVariantFocus)) {
            variantFocusFilter.value = previousVariantFocus;
        } else {
            variantFocusFilter.value = isYgoSelected ? YGO_DEFAULT_FORMAT_OPTION : DEFAULT_VARIANT_FOCUS_OPTION;
        }
        variantFocusFilter.disabled = false;

        if ((isYgoSelected ? YGO_EFFECT_OPTIONS : PRICE_STATUS_OPTIONS).includes(previousPriceStatus)) {
            priceStatusFilter.value = previousPriceStatus;
        } else {
            priceStatusFilter.value = isYgoSelected ? YGO_DEFAULT_EFFECT_OPTION : DEFAULT_PRICE_STATUS_OPTION;
        }
        priceStatusFilter.disabled = false;

        if (isYgoSelected && YGO_LEVEL_OPTIONS.includes(previousGameplayStatus)) {
            gameplayStatusFilter.value = previousGameplayStatus;
        } else if (isYyhSelected && GAMEPLAY_STATUS_OPTIONS.includes(previousGameplayStatus)) {
            gameplayStatusFilter.value = previousGameplayStatus;
        } else {
            gameplayStatusFilter.value = isYgoSelected ? YGO_DEFAULT_LEVEL_OPTION : DEFAULT_GAMEPLAY_STATUS_OPTION;
        }

        if (Array.from(sortFilter.options).some((option) => option.value === previousSort)) {
            sortFilter.value = previousSort;
        } else {
            sortFilter.value = isYgoSelected ? YGO_DEFAULT_SORT_OPTION : DEFAULT_SORT_OPTION;
        }

        if (variantsToggle instanceof HTMLInputElement) {
            variantsToggle.disabled = false;
        }

        if (shouldRender) {
            void renderResults(false);
        }
    };

    if (initialFilters.query) {
        searchFilter.value = initialFilters.query;
    }
    if (initialFilters.game && Array.from(gameFilter.options).some((option) => option.value === initialFilters.game)) {
        gameFilter.value = initialFilters.game;
    }
    syncInventoryNav(gameFilter.value || "All Games");
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
    archetypeFilter.addEventListener("change", () => {
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

    syncConditionalFilters(false);

    if (initialFilters.set && Array.from(setFilter.options).some((option) => option.value === initialFilters.set)) {
        setFilter.value = initialFilters.set;
    }
    if (initialFilters.type && Array.from(typeFilter.options).some((option) => option.value === initialFilters.type)) {
        typeFilter.value = initialFilters.type;
    }
    if (initialFilters.archetype && Array.from(archetypeFilter.options).some((option) => option.value === initialFilters.archetype)) {
        archetypeFilter.value = initialFilters.archetype;
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
        sortFilter.value = gameFilter.value === "Yu-Gi-Oh" ? YGO_DEFAULT_SORT_OPTION : DEFAULT_SORT_OPTION;
    }

    void renderResults(false);
}

document.addEventListener("DOMContentLoaded", initInventoryFilters);
