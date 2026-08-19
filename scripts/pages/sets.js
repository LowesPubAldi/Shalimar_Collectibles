const SETS_GAME_NAV_CONFIG = {
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

const YGO_SETS_API_URL = "https://db.ygoprodeck.com/api/v7/cardsets.php";
const YYH_CARDS_URL = "data/yyh-cards-full.json";
const YGO_CARDINFO_COUNT_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=0";
const YGO_CARDINFO_PAGE_SIZE = 100;
const SHOW_CATEGORY_OPTIONS = [
    "Duel Monsters • Sep 2001",
    "GX • Oct 2005",
    "5D's • Sep 2008",
    "ZEXAL • Oct 2011",
    "ARC-V • Sep 2015",
    "VRAINS • Sep 2018",
    "SEVENS • Jun 2022",
    "GO RUSH!! • Jan 2025"
];

const SHOW_CATEGORY_RULES = [
    { category: "Duel Monsters • Sep 2001", pattern: /\bduel\s*monsters?\b|\blegend\b|\bblue[- ]eyes\b|\bmetal\s*raiders\b|\bpharaoh\b|\bancient\s*sanctuary\b|\bduel\s*starter\b|\bmagical\s*merchant\b/i },
    { category: "GX • Oct 2005", pattern: /\bgx\b|\bduel\s*academy\b|\bgenex\b|\bduel\s*monster\s*gx\b/i },
    { category: "5D's • Sep 2008", pattern: /\b5d['’]s\b|\b5ds\b|\b5d\s*s\b|\bduel\s*terminal\s*5d['’]s\b/i },
    { category: "ZEXAL • Oct 2011", pattern: /\bzexal\b|\bduelist\s*pack\s*:\s*zexal\b|\bduel\s*disorder\b/i },
    { category: "ARC-V • Sep 2015", pattern: /\barc[- ]v\b|\barc\s*v\b|\barcv\b|\bduelists\b.*\barc\b/i },
    { category: "VRAINS • Sep 2018", pattern: /\bvrains\b|\bv\s*rains\b|\bduelist\s*pack\s*:\s*vrains\b/i },
    { category: "SEVENS • Jun 2022", pattern: /\bsevens\b|\byu[- ]?gi[- ]?oh!\s*sevens\b/i },
    { category: "GO RUSH!! • Jan 2025", pattern: /\bgo\s*rush\b|\bgo\s*rush!!\b|\byu[- ]?gi[- ]?oh!\s*go\s*rush\b/i }
];

const SHOW_CATEGORY_DATE_BUCKETS = [
    { category: "Duel Monsters • Sep 2001", start: "2001-09-29", end: "2005-10-10" },
    { category: "GX • Oct 2005", start: "2005-10-10", end: "2008-09-13" },
    { category: "5D's • Sep 2008", start: "2008-09-13", end: "2011-10-15" },
    { category: "ZEXAL • Oct 2011", start: "2011-10-15", end: "2015-09-19" },
    { category: "ARC-V • Sep 2015", start: "2015-09-19", end: "2018-09-01" },
    { category: "VRAINS • Sep 2018", start: "2018-09-01", end: "2022-06-06" },
    { category: "SEVENS • Jun 2022", start: "2022-06-06", end: "2025-01-11" },
    { category: "GO RUSH!! • Jan 2025", start: "2025-01-11", end: null }
];

const DEFAULT_SET_SORT = "release-asc";
const SETS_SORT_STORAGE_KEY = "ygo_sets_sort_mode";
const ALLOWED_SORT_MODES = new Set([
    "release-asc",
    "release-desc",
    "alpha-asc",
    "alpha-desc"
]);

function normalizeSetKey(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function getSelectedSetsGame() {
    const params = new URLSearchParams(window.location.search);
    const game = String(params.get("game") || "").trim();
    return SETS_GAME_NAV_CONFIG[game] ? game : "Yu-Gi-Oh";
}

function syncSetsNav(selectedGame) {
    const navConfig = SETS_GAME_NAV_CONFIG[selectedGame] || SETS_GAME_NAV_CONFIG["Yu-Gi-Oh"];
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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function parseReleaseDate(dateValue) {
    if (typeof dateValue !== "string" || !dateValue.trim()) {
        return Number.NaN;
    }

    const parsed = new Date(dateValue).getTime();
    return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function getReleaseOrderValue(setEntry) {
    const stamp = parseReleaseDate(setEntry.releaseDate);
    return Number.isFinite(stamp) ? stamp : Number.MAX_SAFE_INTEGER;
}

function sortSetEntries(items, sortMode) {
    const sorted = [...items];

    if (sortMode === "alpha-desc") {
        return sorted.sort((a, b) => b.set.localeCompare(a.set));
    }

    if (sortMode === "release-asc") {
        return sorted.sort((a, b) => {
            const releaseCompare = getReleaseOrderValue(a) - getReleaseOrderValue(b);
            if (releaseCompare !== 0) {
                return releaseCompare;
            }
            return a.set.localeCompare(b.set);
        });
    }

    if (sortMode === "release-desc") {
        return sorted.sort((a, b) => {
            const releaseCompare = getReleaseOrderValue(b) - getReleaseOrderValue(a);
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

function getSetCategoryLabel(setName, releaseDate) {
    const text = String(setName || "").trim();
    const parsedDate = parseReleaseDate(String(releaseDate || ""));

    if (Number.isFinite(parsedDate)) {
        const bucket = SHOW_CATEGORY_DATE_BUCKETS.find((entry) => {
            const startValue = Date.parse(entry.start);
            const endValue = entry.end ? Date.parse(entry.end) : Number.POSITIVE_INFINITY;
            return parsedDate >= startValue && parsedDate < endValue;
        });

        if (bucket) {
            return bucket.category;
        }
    }

    if (!text) {
        return "Duel Monsters • Sep 2001";
    }

    const normalizedText = text.toLowerCase().replace(/[^a-z0-9\s'’&-]/g, " ").replace(/\s+/g, " ").trim();
    const match = SHOW_CATEGORY_RULES.find((entry) => entry.pattern.test(normalizedText));
    return match ? match.category : "Duel Monsters • Sep 2001";
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

function makeInventorySetLink(setName) {
    return makeInventorySetLinkForGame(setName, "Yu-Gi-Oh");
}

function makeInventorySetLinkForGame(setName, gameName) {
    const params = new URLSearchParams({
        game: gameName,
        set: setName
    });
    return `inventory.html?${params.toString()}`;
}

function makeSetCard(setEntry) {
    const setCodeText = setEntry.code ? `Set code: ${escapeHtml(setEntry.code)}` : "Set code: unavailable";
    const releaseText = setEntry.releaseDate ? `Released: ${escapeHtml(setEntry.releaseDate)}` : "Release date: unavailable";
    const inventoryLink = makeInventorySetLinkForGame(setEntry.set, setEntry.game || "Yu-Gi-Oh");

    return `
        <article class="set-card" data-set-name="${escapeHtml(setEntry.set)}">
            <div class="set-card__top">
                <div class="set-card__copy">
                    <h3 class="set-card__name">${escapeHtml(setEntry.set)}</h3>
                    <p class="set-card__meta">${setEntry.cardCount} cards listed in this set</p>
                    <p class="set-card__meta">${setCodeText}</p>
                    <p class="set-card__meta">${releaseText}</p>
                    <p class="set-card__meta">Source: ${escapeHtml(setEntry.source || "YGOPRODeck API")}</p>
                </div>
            </div>
            <a class="set-card__action" href="${inventoryLink}">Open in Inventory</a>
        </article>
    `;
}

function buildSetSummaryFromApi(payload) {
    if (!Array.isArray(payload)) {
        throw new Error("Invalid Yu-Gi-Oh set response");
    }

    const items = payload
        .map((item) => {
            const setName = String(item?.set_name || "").trim();
            const code = String(item?.set_code || "").trim();
            const cardCount = Number(item?.num_of_cards ?? 0);
            const releaseDate = String(item?.tcg_date || "").trim();

            if (!setName) {
                return null;
            }

            return {
                set: setName,
                code,
                cardCount: Number.isFinite(cardCount) ? cardCount : 0,
                releaseDate
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.set.localeCompare(b.set));

    return { items, source: "api" };
}

async function loadSetSummary() {
    const response = await fetch(YGO_SETS_API_URL, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    return buildSetSummaryFromApi(payload);
}

async function loadYyhSetSummary() {
    const response = await fetch(YYH_CARDS_URL, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
        throw new Error("Invalid Yu Yu Hakusho card response");
    }

    const counts = new Map();
    payload.forEach((card) => {
        const setName = String(card?.set || "").trim();
        if (setName) {
            counts.set(setName, (counts.get(setName) || 0) + 1);
        }
    });

    const items = Array.from(counts, ([set, cardCount]) => ({
        set,
        game: "Yu Yu Hakusho",
        code: "",
        cardCount,
        releaseDate: "",
        source: "YYH card catalog"
    })).sort((a, b) => a.set.localeCompare(b.set));

    return { items, source: "catalog" };
}

function applySetsPageCopy(selectedGame) {
    const isYyh = selectedGame === "Yu Yu Hakusho";
    const eyebrow = document.getElementById("sets-hero-eyebrow");
    const title = document.getElementById("sets-hero-title");
    const description = document.getElementById("sets-hero-description");
    const primaryNote = document.getElementById("sets-note-primary");
    const secondaryNote = document.getElementById("sets-note-secondary");
    const footerMeta = document.getElementById("sets-footer-meta");
    const footerCredit = document.getElementById("sets-footer-credit");
    const heroImage = document.querySelector(".sets-hero__media img");
    const shell = document.querySelector(".sets-shell");

    if (eyebrow) eyebrow.textContent = `${selectedGame} Sets`;
    if (title) title.textContent = `Browse the ${selectedGame} set archive.`;
    if (description) {
        description.textContent = isYyh
            ? "Browse the local Yu Yu Hakusho card catalog, then open any set in a prefiltered Inventory view."
            : "This page pulls the live set list from YGOPRODeck, then links each entry into a prefiltered Inventory view so you can inspect cards by set quickly.";
    }
    if (primaryNote) {
        primaryNote.textContent = isYyh ? "Organized by Yu Yu Hakusho card set." : "Organized by anime era and series association.";
    }
    if (secondaryNote) {
        secondaryNote.textContent = isYyh
            ? "Card counts are summarized from the local YYH card catalog."
            : "Live set counts and print totals stay connected to the YGOPRODeck feed.";
    }
    if (footerMeta) {
        footerMeta.textContent = isYyh
            ? "Yu Yu Hakusho set discovery powered by the local card catalog."
            : "Yu-Gi-Oh set discovery powered by the live YGOPRODeck set feed.";
    }
    if (footerCredit) {
        footerCredit.textContent = isYyh ? "Data credit: Shalimar YYH card catalog." : "Data credit: YGOPRODeck API.";
    }
    if (heroImage instanceof HTMLImageElement && isYyh) {
        heroImage.src = "assets/yyh-source/yu-yu-hakusho1.jpg";
        heroImage.alt = "Yu Yu Hakusho banner";
    }
    if (shell) {
        shell.setAttribute("aria-label", `${selectedGame} set directory`);
    }
}

async function loadYgoExpandedPrintingsTotal() {
    let offset = 0;
    let totalPrintings = 0;

    while (true) {
        const endpoint = new URL(YGO_CARDINFO_COUNT_URL);
        endpoint.searchParams.set("num", String(YGO_CARDINFO_PAGE_SIZE));
        endpoint.searchParams.set("offset", String(offset));

        const response = await fetch(endpoint.toString(), { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Card count request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const cards = Array.isArray(payload?.data) ? payload.data : [];

        if (cards.length === 0) {
            break;
        }

        totalPrintings += cards.reduce((sum, card) => {
            const setEntries = Array.isArray(card?.card_sets) ? card.card_sets : [];
            return sum + (setEntries.length > 0 ? setEntries.length : 1);
        }, 0);

        const totalRows = Number(payload?.meta?.total_rows);
        if (!Number.isFinite(totalRows) || offset + cards.length >= totalRows) {
            break;
        }

        offset += cards.length;
    }

    return totalPrintings;
}

async function initSetsPage() {
    const selectedGame = getSelectedSetsGame();
    const isYyh = selectedGame === "Yu Yu Hakusho";
    syncSetsNav(selectedGame);
    applySetsPageCopy(selectedGame);

    const meta = document.getElementById("sets-meta");
    const grid = document.getElementById("sets-grid");
    const sortSelect = document.getElementById("sets-sort");
    const filterWrapper = document.getElementById("sets-category-filters");

    if (!meta || !grid || !filterWrapper || !(sortSelect instanceof HTMLSelectElement)) {
        return;
    }

    const initialSortMode = getStoredSortMode();
    sortSelect.value = initialSortMode;

    let summary;
    try {
        summary = await (isYyh ? loadYyhSetSummary() : loadSetSummary());
    } catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown loading error";
        meta.textContent = `Unable to load ${selectedGame} set summary.`;
        grid.innerHTML = `
            <article class="set-card">
                <h3 class="set-card__name">Set data unavailable</h3>
                <p class="set-card__meta">${escapeHtml(reason)}</p>
            </article>
        `;
        return;
    }

    const categoryOptions = isYyh
        ? summary.items.map((item) => item.set)
        : SHOW_CATEGORY_OPTIONS;
    let selectedCategory = categoryOptions[0] || "";

    const renderCategoryButtons = () => {
        filterWrapper.innerHTML = categoryOptions.map((category) => {
            const isActive = category === selectedCategory;
            return `
                <button
                    type="button"
                    class="sets-category-filter ${isActive ? "is-active" : ""}"
                    data-category="${escapeHtml(category)}"
                    aria-pressed="${isActive ? "true" : "false"}"
                >
                    ${escapeHtml(category)}
                </button>
            `;
        }).join("");

        filterWrapper.querySelectorAll(".sets-category-filter").forEach((button) => {
            button.addEventListener("click", () => {
                selectedCategory = button.getAttribute("data-category") || categoryOptions[0] || "";
                renderCategoryButtons();
                renderGrid();
            });
        });
    };

    const renderGrid = () => {
        const rawMode = sortSelect.value || DEFAULT_SET_SORT;
        const mode = ALLOWED_SORT_MODES.has(rawMode) ? rawMode : DEFAULT_SET_SORT;
        const visibleItems = summary.items.filter((item) => isYyh
            ? item.set === selectedCategory
            : getSetCategoryLabel(item.set, item.releaseDate) === selectedCategory);
        const sortedItems = sortSetEntries(visibleItems, mode);

        if (sortedItems.length === 0) {
            grid.innerHTML = `
                <article class="set-card">
                    <h3 class="set-card__name">No sets found</h3>
                    <p class="set-card__meta">No sets match the selected category.</p>
                </article>
            `;
            return;
        }

        grid.innerHTML = `
            <section class="set-category" aria-label="${escapeHtml(selectedCategory)} collection">
                <div class="set-category__header">
                    <h3>${escapeHtml(selectedCategory)}</h3>
                    <span>${sortedItems.length.toLocaleString()} sets</span>
                </div>
                <div class="set-category__grid">
                    ${sortedItems.map(makeSetCard).join("")}
                </div>
            </section>
        `;
    };

    renderCategoryButtons();
    renderGrid();

    sortSelect.addEventListener("change", () => {
        saveSortMode(sortSelect.value);
        renderGrid();
    });

    let expandedPrintingsTotal = 0;

    try {
        if (isYyh) {
            throw new Error("Use catalog totals for Yu Yu Hakusho.");
        }
        expandedPrintingsTotal = await loadYgoExpandedPrintingsTotal();
    } catch {
        expandedPrintingsTotal = summary.items.reduce((sum, entry) => sum + entry.cardCount, 0);
    }

    const setEntryCount = summary.items.length.toLocaleString();
    const printingsTotal = expandedPrintingsTotal.toLocaleString();
    meta.innerHTML = `
        <span class="sets-meta__secondary">${setEntryCount} set entries</span>
        <span class="sets-meta__primary">${printingsTotal}</span>
        <span class="sets-meta__secondary">total printings</span>
        <span class="sets-meta__source">source: ${isYyh ? "YYH card catalog" : "YGOPRODeck API"}</span>
    `;
}

document.addEventListener("DOMContentLoaded", initSetsPage);
