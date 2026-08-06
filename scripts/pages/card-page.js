const INDIVIDUAL_CARD_PAGE = {
    slug: "bulls-eye",
    eyebrow: "Gateway Single Card",
    title: "Bull's-Eye",
    intro: "A single-card detail page focused on one Gateway scan and its current market note.",
    set: "Gateway",
    cardNumber: "G1",
    type: "Event",
    rarity: "G - Ghost Rare",
    variant: "Lined",
    edition: "Unlimited / Not Marked",
    finish: "Single card view",
    priceText: "$82.50",
    priceRange: "$70-$95",
    summary: "Bull's-Eye is a Gateway Ghost Rare event card with a setup search effect and a stronger market band than the Ghost Files card that was here before.",
    source: "gateway-checklist.txt",
    variantOptions: [
        {
            name: "Lined",
            image: "assets/seasonal/yyh-source/gateway/001L.jpg"
        },
        {
            name: "Cloudy",
            image: "assets/seasonal/yyh-source/gateway/001C.jpg"
        },
        {
            name: "Jagged",
            image: "assets/seasonal/yyh-source/gateway/001J.jpg"
        }
    ],
    details: [
        "This page is built around one card instead of a four-piece composite.",
        "Gateway pricing notes currently place this card around $70-$95.",
        "The source scan comes from the existing Gateway image folder.",
        "Use this shell as the base for other individual card pages later."
    ],
    notes: [
        "Current price note: $82.50.",
        "Cataloged from Gateway pricing data.",
        "Single-card detail view, not a King set display."
    ]
};

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
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

function renderCardPage(card) {
    const cardTitle = document.getElementById("cardTitle");
    const cardIntro = document.getElementById("cardIntro");
    const cardFacts = document.getElementById("cardFacts");
    const cardDetailsIntro = document.getElementById("cardDetailsIntro");
    const cardNotesIntro = document.getElementById("cardNotesIntro");
    const cardNotes = document.getElementById("cardNotes");
    const cardBadges = document.getElementById("cardBadges");
    const cardVariantControls = document.getElementById("cardVariantControls");
    const cardVariantImage = document.getElementById("cardVariantImage");
    const cardVariantName = document.getElementById("cardVariantName");
    const cardVariantMeta = document.getElementById("cardVariantMeta");

    document.title = `Shalimar Collectibles | ${card.title}`;
    document.querySelector(".card-page").dataset.cardSlug = card.slug;
    document.querySelector(".card-page").classList.add("card-page--single-card");

    cardTitle.textContent = card.title;
    cardIntro.textContent = card.intro;
    cardFacts.innerHTML = `
        <li>Set: ${escapeHtml(card.set)}</li>
        <li>Card number: ${escapeHtml(card.cardNumber)}</li>
        <li>Type: ${escapeHtml(card.type)}</li>
        <li>Rarity: ${escapeHtml(card.rarity)}</li>
    `;
    cardDetailsIntro.textContent = "Set, card number, and type are listed below.";
    cardNotesIntro.textContent = "Pricing and source notes for the individual card are kept here.";
    cardNotes.innerHTML = card.notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("");
    cardBadges.innerHTML = "";

    const details = [
        ["Set", card.set],
        ["Card number", card.cardNumber],
        ["Type", card.type]
    ];

    cardBadges.innerHTML = "";
    [card.set, card.rarity, card.priceText].forEach((label) => {
        cardBadges.appendChild(createBadge(label));
    });

    const detailsList = document.getElementById("cardDetailsList");
    detailsList.innerHTML = "";
    details.forEach(([label, value]) => {
        detailsList.appendChild(createDetailItem(label, value));
    });

    const cardNotesPanel = document.getElementById("cardNotes");
    cardNotesPanel.innerHTML = `
        <p>${escapeHtml(card.summary)}</p>
        <p>Price note: ${escapeHtml(card.priceText)} today, with a broader tracked range of ${escapeHtml(card.priceRange)}.</p>
        <p>Source: ${escapeHtml(card.source)}</p>
    `;

    let selectedVariantName = card.variantOptions[0].name;

    const renderSelectedVariant = (variantName) => {
        selectedVariantName = variantName;
        const selectedVariant = card.variantOptions.find((variant) => variant.name === variantName) || card.variantOptions[0];

        cardVariantControls.querySelectorAll("button").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.variant === selectedVariantName));
        });

        cardVariantImage.src = selectedVariant.image;
        cardVariantImage.alt = `${selectedVariant.name} scan`;
        cardVariantName.textContent = selectedVariant.name;
        cardVariantMeta.textContent = `${card.set} | ${card.cardNumber}`;
    };

    cardVariantControls.innerHTML = "";
    card.variantOptions.forEach((variant) => {
        const button = createVariantControl(variant, selectedVariantName);
        button.addEventListener("click", () => renderSelectedVariant(variant.name));
        cardVariantControls.appendChild(button);
    });

    renderSelectedVariant(selectedVariantName);

    const backlink = document.querySelector(".card-panel__backlink");
    backlink.textContent = "Back to Inventory";
    backlink.href = "inventory.html";

    window.history.replaceState({}, "", "card-template.html");
}

function initCardPage() {
    renderCardPage(INDIVIDUAL_CARD_PAGE);
}

document.addEventListener("DOMContentLoaded", initCardPage);