const YYH_SETS_SUMMARY_URL = "http://127.0.0.1:3000/api/yyh/sets/summary?game=Yu%20Yu%20Hakusho";
const YYH_CARDS_FALLBACK_URLS = [
    "data/yyh-cards-full.json",
    "data/yyh-cards.json",
    "data/yyh-cards-slice.json"
];

function makeInventorySetLink(setName) {
    const params = new URLSearchParams({
        game: "Yu Yu Hakusho",
        set: setName
    });
    return `inventory.html?${params.toString()}`;
}

function makeSetCard(setEntry) {
    return `
        <article class="set-card">
            <h3 class="set-card__name">${setEntry.set}</h3>
            <p class="set-card__meta">${setEntry.cardCount} cards in current dataset</p>
            <a class="set-card__action" href="${makeInventorySetLink(setEntry.set)}">Open in Inventory</a>
        </article>
    `;
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

    if (!meta || !grid) {
        return;
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

    grid.innerHTML = summary.items.map(makeSetCard).join("");

    const sourceLabel = summary.source === "api" ? "API" : "fallback JSON";
    const totalCards = summary.items.reduce((sum, entry) => sum + entry.cardCount, 0);
    meta.textContent = `${summary.items.length} sets • ${totalCards} cards • source: ${sourceLabel}`;
}

document.addEventListener("DOMContentLoaded", initSetsPage);
