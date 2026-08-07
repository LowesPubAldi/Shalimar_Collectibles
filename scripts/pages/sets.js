const YYH_SETS_SUMMARY_URL = "http://127.0.0.1:3000/api/yyh/sets/summary?game=Yu%20Yu%20Hakusho";
const YYH_SEALED_PRICES_URL = "http://127.0.0.1:3000/api/yyh/sets/sealed-prices";
const YYH_CARDS_FALLBACK_URLS = [
    "data/yyh-cards-full.json",
    "data/yyh-cards.json",
    "data/yyh-cards-slice.json"
];

const DEFAULT_SET_SORT = "release-asc";
const SETS_SORT_STORAGE_KEY = "yyh_sets_sort_mode";
const ALLOWED_SORT_MODES = new Set([
    "release-asc",
    "release-desc",
    "alpha-asc",
    "alpha-desc"
]);

const YYH_SET_RELEASE_ORDER = {
    "ghost files": 1,
    "dark tournament": 2,
    gateway: 3,
    exile: 4,
    betrayal: 5,
    alliance: 6
};

const YYH_SET_RELEASE_DATES = {
    "ghost files": "September 15, 2003",
    "dark tournament": "December 12, 2003",
    gateway: "April 9, 2004",
    exile: "June 30, 2004",
    betrayal: "September 22, 2004",
    alliance: "January 15, 2005"
};

const YYH_SET_MEDIA = {
    alliance: {
        box: "assets/seasonal/yyh-source/products/Booster-Blister Products/Alliance Booster Box Standard Edition.jpg"
    },
    betrayal: {
        box: "assets/seasonal/yyh-source/products/Booster-Blister Products/Betrayal Booster Box Standard Edition.jpg",
        pack: "assets/seasonal/yyh-source/products/Booster-Blister Products/Betrayal Blister Pack Standard Edition - Yoko.jpg"
    },
    "dark tournament": {
        box: "assets/seasonal/yyh-source/products/Booster-Blister Products/Dark Tournament Booster Box Standard Edition.jpg",
        pack: "assets/seasonal/yyh-source/products/Booster-Blister Products/Dark Tournament Blister Pack Standard Edition - Yoko.jpg"
    },
    exile: {
        box: "assets/seasonal/yyh-source/products/Booster-Blister Products/Exile Booster Box Standard Edition.jpg",
        pack: "assets/seasonal/yyh-source/products/Booster-Blister Products/Exile Blister Pack Standard Edition - Hiei.jpg"
    },
    gateway: {
        box: "assets/seasonal/yyh-source/products/Booster-Blister Products/Gateway Booster Box Standard Edition.jpg",
        pack: "assets/seasonal/yyh-source/products/Booster-Blister Products/Gateway Blister Pack Standard Edition - Sensui.jpg"
    },
    "ghost files": {
        box: "assets/seasonal/yyh-source/products/Booster-Blister Products/Ghost Files Booster Box Standard Edition.jpg",
        pack: "assets/seasonal/yyh-source/products/Booster-Blister Products/Ghost Files Blister Pack Standard Edition - Yusuke.jpg"
    }
};

const YYH_SET_PRICE_OVERRIDES = {
    alliance: {
        firstEditionBbRange: [600, 850],
        unlimitedEditionBbRange: [500, 750]
    },
    betrayal: {
        firstEditionBbRange: [360, 405],
        unlimitedEditionBbRange: [275, 325],
        packRange: [13, 16]
    },
    "dark tournament": {
        firstEditionBbRange: [230, 265],
        unlimitedEditionBbRange: [180, 200],
        packRange: [2, 5]
    },
    exile: {
        firstEditionBbRange: [350, 400],
        unlimitedEditionBbRange: [300, 350],
        packRange: [9, 12]
    },
    gateway: {
        firstEditionBbRange: [275, 325],
        unlimitedEditionBbRange: [225, 275],
        packRange: [12, 18]
    },
    "ghost files": {
        boxText: "1st ed Booster Box (BB): $180 and Unlimited ed BB: $130",
        packText: "Blister Pack: $7"
    }
};

function normalizeSetKey(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function formatUsd(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
    }).format(value);
}

function formatUsdWhole(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(value);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildSetsPriceQueryParam(setNames) {
    return setNames.join(",");
}

function getReleaseOrderValue(setName) {
    return YYH_SET_RELEASE_ORDER[normalizeSetKey(setName)] || Number.MAX_SAFE_INTEGER;
}

function sortSetEntries(items, sortMode) {
    const sorted = [...items];

    if (sortMode === "alpha-desc") {
        return sorted.sort((a, b) => b.set.localeCompare(a.set));
    }

    if (sortMode === "release-asc") {
        return sorted.sort((a, b) => {
            const releaseCompare = getReleaseOrderValue(a.set) - getReleaseOrderValue(b.set);
            if (releaseCompare !== 0) {
                return releaseCompare;
            }
            return a.set.localeCompare(b.set);
        });
    }

    if (sortMode === "release-desc") {
        return sorted.sort((a, b) => {
            const releaseCompare = getReleaseOrderValue(b.set) - getReleaseOrderValue(a.set);
            if (releaseCompare !== 0) {
                return releaseCompare;
            }
            return b.set.localeCompare(a.set);
        });
    }

    return sorted.sort((a, b) => a.set.localeCompare(b.set));
}

function getStoredSortMode() {
    try {
        const stored = localStorage.getItem(SETS_SORT_STORAGE_KEY);
        if (stored && ALLOWED_SORT_MODES.has(stored)) {
            return stored;
        }
    } catch {
        // Ignore storage access issues and use default mode.
    }

    return DEFAULT_SET_SORT;
}

function saveSortMode(mode) {
    if (!ALLOWED_SORT_MODES.has(mode)) {
        return;
    }

    try {
        localStorage.setItem(SETS_SORT_STORAGE_KEY, mode);
    } catch {
        // Ignore storage access issues.
    }
}

function floorAverageRange(rangeValues) {
    if (!Array.isArray(rangeValues) || rangeValues.length !== 2) {
        return null;
    }

    const low = Number(rangeValues[0]);
    const high = Number(rangeValues[1]);
    if (!Number.isFinite(low) || !Number.isFinite(high)) {
        return null;
    }

    return Math.floor((low + high) / 2);
}

function getManualPriceText(setName, mediaType) {
    const override = YYH_SET_PRICE_OVERRIDES[normalizeSetKey(setName)] || null;
    if (!override) {
        return "";
    }

    if (override.boxText || override.packText) {
        return mediaType === "pack" ? override.packText : override.boxText;
    }

    const firstEditionBb = floorAverageRange(override.firstEditionBbRange);
    const unlimitedEditionBb = floorAverageRange(override.unlimitedEditionBbRange);
    const packAverage = floorAverageRange(override.packRange);

    if (mediaType === "pack" && Number.isFinite(packAverage)) {
        return `Blister Pack: ${formatUsdWhole(packAverage)}`;
    }

    if (Number.isFinite(firstEditionBb) && Number.isFinite(unlimitedEditionBb)) {
        return `1st ed Booster Box (BB): ${formatUsdWhole(firstEditionBb)} and Unlimited ed BB: ${formatUsdWhole(unlimitedEditionBb)}`;
    }

    return "";
}

function formatPriceText(setName, priceEntry, mediaType = "box") {
    const manualText = getManualPriceText(setName, mediaType);
    if (manualText) {
        return manualText;
    }

    if (!priceEntry || !Number.isFinite(priceEntry.medianPrice)) {
        return "Sealed booster box sold median: unavailable";
    }

    const sampleCount = Number.isFinite(priceEntry.sampleCount) ? priceEntry.sampleCount : 0;
    const inspectedCount = Number.isFinite(priceEntry.inspectedCount) ? priceEntry.inspectedCount : sampleCount;
    return `Sealed booster box sold median: ${formatUsd(priceEntry.medianPrice)} (${sampleCount} sold comps, ${inspectedCount} inspected)`;
}

async function loadSealedSetPrices(setNames) {
    const url = new URL(YYH_SEALED_PRICES_URL);
    url.searchParams.set("sets", buildSetsPriceQueryParam(setNames));

    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Sealed price request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (!payload || !Array.isArray(payload.items)) {
        throw new Error("Invalid sealed price response");
    }

    const bySet = new Map();
    for (const item of payload.items) {
        bySet.set(normalizeSetKey(item.set), item);
    }

    return bySet;
}

function applySealedPricesToCards(grid, priceMap) {
    const cards = Array.from(grid.querySelectorAll(".set-card"));
    for (const card of cards) {
        const setName = card.getAttribute("data-set-name") || "";
        const mediaType = card.getAttribute("data-media-selected") === "pack" ? "pack" : "box";
        const priceLabel = card.querySelector(".set-card__price");
        if (!priceLabel) {
            continue;
        }

        const priceEntry = priceMap.get(normalizeSetKey(setName));
        priceLabel.textContent = formatPriceText(setName, priceEntry, mediaType);
    }
}

function getSetMedia(setName) {
    const setKey = normalizeSetKey(setName);
    const entry = YYH_SET_MEDIA[setKey] || null;
    if (!entry || !entry.box) {
        return null;
    }

    return {
        box: entry.box,
        pack: entry.pack || "",
        releaseDate: YYH_SET_RELEASE_DATES[setKey] || ""
    };
}

function makeMediaToggleButtons(media) {
    if (!media || !media.box || !media.pack) {
        return "";
    }

    return `
        <div class="set-card__media-toggle" role="group" aria-label="Switch sealed product view">
            <button type="button" class="set-card__media-btn is-active" data-media-type="box">Box</button>
            <button type="button" class="set-card__media-btn" data-media-type="pack">Pack</button>
        </div>
    `;
}

function makeInventorySetLink(setName) {
    const params = new URLSearchParams({
        game: "Yu Yu Hakusho",
        set: setName
    });
    return `inventory.html?${params.toString()}`;
}

function makeSetCard(setEntry) {
    const media = getSetMedia(setEntry.set);
    const inventoryLink = makeInventorySetLink(setEntry.set);
    const thumbMarkup = media
        ? `
            <div class="set-card__media" data-has-pack="${media.pack ? "true" : "false"}">
                <a class="set-card__media-link" href="${inventoryLink}" aria-label="Open ${escapeHtml(setEntry.set)} inventory gallery">
                    <div class="set-card__thumb" data-release-date="${escapeHtml(media.releaseDate)}" title="Release Date: ${escapeHtml(media.releaseDate)}" role="img" aria-label="${escapeHtml(setEntry.set)} release date ${escapeHtml(media.releaseDate)}">
                        <img src="${media.box}" alt="${escapeHtml(setEntry.set)} sealed booster box" loading="lazy" data-media-image />
                    </div>
                </a>
                ${makeMediaToggleButtons(media)}
            </div>
        `
        : "";

    return `
        <article class="set-card" data-set-name="${escapeHtml(setEntry.set)}" data-box-src="${media ? escapeHtml(media.box) : ""}" data-pack-src="${media ? escapeHtml(media.pack) : ""}" data-media-selected="box">
            <div class="set-card__top">
                <div class="set-card__copy">
                    <h3 class="set-card__name">${setEntry.set}</h3>
                    <p class="set-card__meta">${setEntry.cardCount} cards in current dataset</p>
                    <p class="set-card__price">Sealed booster box sold median: loading...</p>
                </div>
                ${thumbMarkup}
            </div>
            <a class="set-card__action" href="${inventoryLink}">Open in Inventory</a>
        </article>
    `;
}

function wireSetMediaToggle(grid) {
    grid.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const button = target.closest(".set-card__media-btn");
        if (!(button instanceof HTMLButtonElement)) {
            return;
        }

        const selectedType = button.getAttribute("data-media-type");
        if (selectedType !== "box" && selectedType !== "pack") {
            return;
        }

        const card = button.closest(".set-card");
        if (!(card instanceof HTMLElement)) {
            return;
        }

        const image = card.querySelector("[data-media-image]");
        if (!(image instanceof HTMLImageElement)) {
            return;
        }

        const boxSrc = card.getAttribute("data-box-src") || "";
        const packSrc = card.getAttribute("data-pack-src") || "";
        const setName = card.getAttribute("data-set-name") || "";
        const nextSrc = selectedType === "pack" ? packSrc : boxSrc;
        if (!nextSrc) {
            return;
        }

        image.src = nextSrc;
        image.alt = `${setName} sealed ${selectedType === "pack" ? "blister pack" : "booster box"}`;
        card.setAttribute("data-media-selected", selectedType);

        const group = button.closest(".set-card__media-toggle");
        if (!(group instanceof HTMLElement)) {
            return;
        }

        const buttons = group.querySelectorAll(".set-card__media-btn");
        buttons.forEach((entry) => {
            entry.classList.toggle("is-active", entry === button);
        });

        const priceLabel = card.querySelector(".set-card__price");
        if (priceLabel instanceof HTMLElement) {
            const manualText = getManualPriceText(setName, selectedType);
            if (manualText) {
                priceLabel.textContent = manualText;
            }
        }
    });
}

function buildFallbackSummary(cards) {
    const counts = new Map();
    for (const card of cards) {
        if (card.game !== "Yu Yu Hakusho") {
            continue;
        }
        counts.set(card.set, (counts.get(card.set) || 0) + 1);
    }

    return Array.from(counts.entries())
        .map(([set, cardCount]) => ({ set, cardCount }))
        .sort((a, b) => a.set.localeCompare(b.set));
}

async function loadCardsFallback() {
    for (const sourceUrl of YYH_CARDS_FALLBACK_URLS) {
        try {
            const response = await fetch(sourceUrl, { cache: "no-store" });
            if (!response.ok) {
                continue;
            }

            const cards = await response.json();
            if (Array.isArray(cards)) {
                return cards;
            }
        } catch {
            // Keep trying fallback files until one succeeds.
        }
    }

    throw new Error("No fallback card data found.");
}

async function loadSetSummary() {
    try {
        const response = await fetch(YYH_SETS_SUMMARY_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (!payload || !Array.isArray(payload.items)) {
            throw new Error("Invalid set summary response");
        }

        return {
            items: payload.items,
            source: "api"
        };
    } catch {
        const cards = await loadCardsFallback();

        return {
            items: buildFallbackSummary(cards),
            source: "fallback"
        };
    }
}

async function initSetsPage() {
    const meta = document.getElementById("sets-meta");
    const grid = document.getElementById("sets-grid");
    const sortSelect = document.getElementById("sets-sort");

    if (!meta || !grid) {
        return;
    }

    wireSetMediaToggle(grid);

    if (sortSelect instanceof HTMLSelectElement) {
        const initialSortMode = getStoredSortMode();
        sortSelect.value = initialSortMode;
    }

    let summary;
    try {
        summary = await loadSetSummary();
    } catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown loading error";
        meta.textContent = "Unable to load set summary.";
        grid.innerHTML = `
            <article class="set-card">
                <h3 class="set-card__name">Set data unavailable</h3>
                <p class="set-card__meta">${reason}</p>
            </article>
        `;
        return;
    }

    if (summary.items.length === 0) {
        meta.textContent = "No sets found in current YYH dataset.";
        grid.innerHTML = `
            <article class="set-card">
                <h3 class="set-card__name">No sets found</h3>
                <p class="set-card__meta">Add cards to the data source to populate this page.</p>
            </article>
        `;
        return;
    }

    const sourceItems = [...summary.items];
    let sealedPricesBySet = new Map();

    const renderGrid = () => {
        const rawMode = sortSelect instanceof HTMLSelectElement ? sortSelect.value : DEFAULT_SET_SORT;
        const mode = ALLOWED_SORT_MODES.has(rawMode) ? rawMode : DEFAULT_SET_SORT;
        const sortedItems = sortSetEntries(sourceItems, mode);
        grid.innerHTML = sortedItems.map(makeSetCard).join("");
        applySealedPricesToCards(grid, sealedPricesBySet);
    };

    renderGrid();

    if (sortSelect instanceof HTMLSelectElement) {
        sortSelect.addEventListener("change", () => {
            saveSortMode(sortSelect.value);
            renderGrid();
        });
    }

    const sourceLabel = summary.source === "api" ? "API" : "fallback JSON";
    const totalCards = summary.items.reduce((sum, entry) => sum + entry.cardCount, 0);
    meta.textContent = `${summary.items.length} sets • ${totalCards} cards • source: ${sourceLabel}`;

    try {
        const setNames = summary.items.map((entry) => entry.set);
        sealedPricesBySet = await loadSealedSetPrices(setNames);
        applySealedPricesToCards(grid, sealedPricesBySet);
    } catch {
        sealedPricesBySet = new Map();
        applySealedPricesToCards(grid, sealedPricesBySet);
    }
}

document.addEventListener("DOMContentLoaded", initSetsPage);
