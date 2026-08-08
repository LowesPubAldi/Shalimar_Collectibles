const KING_NOTES_URL = "data/pricing/yyh/king-sets-notes.json";
const KING_PRICING_ROOT = "data/pricing/yyh";

function kingsNormalize(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function kingsSlugifySetName(setName) {
    return String(setName || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function kingsFormatCurrency(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
        return "Price pending";
    }

    return `$${value.toFixed(2)}`;
}

function kingsFormatRange(minPriceUsd, maxPriceUsd) {
    if (typeof minPriceUsd === "number" && typeof maxPriceUsd === "number") {
        if (minPriceUsd === maxPriceUsd) {
            return kingsFormatCurrency(minPriceUsd);
        }

        return `$${minPriceUsd.toFixed(2)}-$${maxPriceUsd.toFixed(2)}`;
    }

    if (typeof minPriceUsd === "number") {
        return kingsFormatCurrency(minPriceUsd);
    }

    if (typeof maxPriceUsd === "number") {
        return kingsFormatCurrency(maxPriceUsd);
    }

    return "Price pending";
}

async function kingsLoadJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

function kingsResolvePiecePrice(pricingItems, piece) {
    const targetId = kingsNormalize(piece.id);
    const targetName = kingsNormalize(piece.name);
    const targetVariant = kingsNormalize(piece.variant);
    let best = null;
    let bestScore = -1;

    for (const item of pricingItems) {
        const itemId = kingsNormalize(item.id || item.number || item.cardNumber || "");
        const itemName = kingsNormalize(item.name || "");
        const itemVariant = kingsNormalize(item.variant || "");
        let score = 0;

        if (targetId && itemId === targetId) {
            score += 120;
        }
        if (targetName && itemName === targetName) {
            score += 80;
        }
        if (targetVariant && itemVariant === targetVariant) {
            score += 40;
        }

        if (score > bestScore) {
            best = item;
            bestScore = score;
        }
    }

    return bestScore > 0 ? best : null;
}

async function initKingsPricing() {
    const kingCards = Array.from(document.querySelectorAll("[data-king-card]"));
    const priceList = document.getElementById("kingsPriceList");

    if (kingCards.length === 0 || !priceList) {
        return;
    }

    let notesPayload;
    try {
        notesPayload = await kingsLoadJson(KING_NOTES_URL);
    } catch {
        notesPayload = { sets: [] };
    }

    const completeKings = Array.isArray(notesPayload?.sets)
        ? notesPayload.sets.flatMap((setEntry) => {
            const setName = String(setEntry.set || "").trim();
            const entries = Array.isArray(setEntry.completeKingSets) ? setEntry.completeKingSets : [];
            return entries.map((entry) => ({ ...entry, set: setName }));
        })
        : [];

    const pricingCache = new Map();
    const getSetPricing = async (setName) => {
        const slug = kingsSlugifySetName(setName);
        if (!slug) {
            return [];
        }

        if (pricingCache.has(slug)) {
            return pricingCache.get(slug);
        }

        try {
            const payload = await kingsLoadJson(`${KING_PRICING_ROOT}/${slug}-pricing.json`);
            const items = Array.isArray(payload?.items) ? payload.items : [];
            pricingCache.set(slug, items);
            return items;
        } catch {
            pricingCache.set(slug, []);
            return [];
        }
    };

    priceList.innerHTML = completeKings.length > 0
        ? completeKings.map((entry) => {
            const priceRange = kingsFormatRange(entry.minPriceUsd, entry.maxPriceUsd);
            const noteSuffix = entry.notes ? ` ${entry.notes}` : "";
            return `<li><span class="kings-price-list__label">${entry.name}:</span> ${priceRange}${noteSuffix}</li>`;
        }).join("")
        : "<li>King set pricing is not available yet.</li>";

    for (const card of kingCards) {
        const setName = card.getAttribute("data-king-set") || "";
        const kingName = card.getAttribute("data-king-name") || "";
        const priceElement = card.querySelector("[data-king-set-price]");
        const matchingKing = completeKings.find((entry) => (
            kingsNormalize(entry.set) === kingsNormalize(setName)
            && kingsNormalize(entry.name).includes(kingsNormalize(kingName))
        ));

        if (priceElement) {
            if (matchingKing) {
                priceElement.textContent = `Complete set: ${kingsFormatRange(matchingKing.minPriceUsd, matchingKing.maxPriceUsd)}`;
            } else {
                priceElement.textContent = "Complete set price pending";
            }
        }

        const pricingItems = await getSetPricing(setName);
        const pieces = Array.from(card.querySelectorAll("[data-piece-price]"));
        for (const piece of pieces) {
            const pricingEntry = kingsResolvePiecePrice(pricingItems, {
                id: piece.getAttribute("data-id") || "",
                name: piece.getAttribute("data-name") || "",
                variant: piece.getAttribute("data-variant") || ""
            });
            const priceLabel = piece.querySelector(".kings-king-card__piece-price");

            if (!priceLabel) {
                continue;
            }

            if (pricingEntry && typeof pricingEntry.priceUsd === "number") {
                priceLabel.textContent = kingsFormatCurrency(pricingEntry.priceUsd);
            } else {
                priceLabel.textContent = "Price pending";
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    void initKingsPricing();
});