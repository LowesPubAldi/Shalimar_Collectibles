const CARD_API_URL = "http://127.0.0.1:3000/api/yyh/cards";
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

const DEFAULT_PRICE_STATUS = "Unpriced";

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
    const aliases = [];

    if (setName === "Gateway") {
        if (cardId === "C35" || normalizedName === "hieiinsert") {
            aliases.push("Insert01");
        }

        if (normalizedName === "joinaleagueinsert") {
            aliases.push("Insert02");
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
        primaryAlias,
        primaryAlias && primaryVariantShortToken ? `${primaryAlias}${primaryVariantShortToken}` : "",
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

function parseQueryContext() {
    const params = new URLSearchParams(window.location.search);
    return {
        cardQuery: resolveFirstNonEmpty(params.get("card"), params.get("q")),
        idQuery: resolveFirstNonEmpty(params.get("id"), params.get("number")),
        setQuery: resolveFirstNonEmpty(params.get("set")),
        gameQuery: resolveFirstNonEmpty(params.get("game"), "Yu Yu Hakusho"),
        variantQuery: resolveFirstNonEmpty(params.get("variant"))
    };
}

async function fetchCards(query) {
    const url = new URL(CARD_API_URL);

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

    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to load card data (${response.status})`);
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
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

function buildVariantOptions(records) {
    const byLabel = new Map();

    for (const record of records) {
        const label = resolveFirstNonEmpty(record.variant, "Standard");
        if (byLabel.has(label)) {
            continue;
        }

        byLabel.set(label, {
            name: label,
            imageCandidates: buildCardImageCandidates(record),
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

function createDetailItem(label, value) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}`;
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
        detailsList.appendChild(createDetailItem(label, value));
    });

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

    const renderSelectedVariant = (variantName) => {
        selectedVariantName = variantName;
        const selectedVariant = variantOptions.find((variant) => variant.name === variantName) || variantOptions[0];

        cardVariantControls.querySelectorAll("button").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.variant === selectedVariantName));
        });

        applyImageCandidates(cardVariantImage, selectedVariant.imageCandidates, `${selectedVariant.name} scan`);
        cardVariantName.textContent = selectedVariant.name;
        cardVariantMeta.textContent = `${card.set} | ${card.cardNumber}`;
    };

    cardVariantControls.innerHTML = "";
    variantOptions.forEach((variant) => {
        const button = createVariantControl(variant, selectedVariantName);
        button.addEventListener("click", () => renderSelectedVariant(variant.name));
        cardVariantControls.appendChild(button);
    });

    renderSelectedVariant(selectedVariantName);

    const backlink = document.querySelector(".card-panel__backlink");
    backlink.textContent = "Back to Inventory";
    backlink.href = `inventory.html?q=${encodeURIComponent(card.title)}&game=${encodeURIComponent(card.game)}`;
}

async function buildCardContext(context) {
    const searchText = resolveFirstNonEmpty(context.idQuery, context.cardQuery);
    if (!searchText) {
        return null;
    }

    let candidateCards = await fetchCards({
        q: searchText,
        game: context.gameQuery,
        set: context.setQuery
    });

    if (candidateCards.length === 0 && context.setQuery) {
        candidateCards = await fetchCards({
            q: searchText,
            game: context.gameQuery
        });
    }

    if (candidateCards.length === 0) {
        candidateCards = await fetchCards({ q: searchText });
    }

    const selected = pickBestCardMatch(candidateCards, context);
    if (!selected) {
        return null;
    }

    const relatedCards = await fetchCards({
        q: selected.name,
        game: selected.game,
        set: selected.set
    });

    const exactRelated = relatedCards.filter((card) => normalizeForSearch(card.name) === normalizeForSearch(selected.name));
    const variantBase = exactRelated.length > 0 ? exactRelated : [selected];
    const variantOptions = buildVariantOptions(variantBase);
    const fallbackVariant = variantOptions[0]?.name || "Standard";
    const selectedVariantName = variantOptions.some((option) => normalizeForSearch(option.name) === normalizeForSearch(context.variantQuery))
        ? variantOptions.find((option) => normalizeForSearch(option.name) === normalizeForSearch(context.variantQuery)).name
        : fallbackVariant;

    const pricingPayload = await loadSetPricing(selected.set);
    const pricing = resolvePricingEntry(pricingPayload, {
        id: selected.id,
        number: selected.number,
        name: selected.name,
        variant: selectedVariantName
    });

    return {
        card: {
            title: resolveFirstNonEmpty(selected.name, "Unnamed Card"),
            intro: selected.effect
                ? "Card details loaded from the YYH catalog for this specific card."
                : "Card details loaded from the YYH catalog.",
            game: resolveFirstNonEmpty(selected.game, "Yu Yu Hakusho"),
            set: resolveFirstNonEmpty(selected.set, "Unknown Set"),
            cardNumber: resolveFirstNonEmpty(selected.id, selected.number, "Unknown"),
            type: resolveFirstNonEmpty(selected.type, "Unknown Type"),
            rarity: resolveFirstNonEmpty(selected.rarity, "Unknown Rarity"),
            variant: resolveFirstNonEmpty(selected.variant, "Standard"),
            source: resolveFirstNonEmpty(selected.source, "YYH catalog"),
            effect: resolveFirstNonEmpty(selected.effect)
        },
        pricing,
        variantOptions,
        selectedVariantName
    };
}

async function initCardPage() {
    const context = parseQueryContext();

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