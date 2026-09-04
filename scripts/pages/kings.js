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

function kingsRevealVisibleCards() {
    const kingCards = Array.from(document.querySelectorAll("[data-king-card]"));
    if (!kingCards.length) {
        return;
    }

    const viewportTop = window.innerHeight * 0.82;
    kingCards.forEach((card) => {
        if (!(card instanceof HTMLElement)) {
            return;
        }

        const rect = card.getBoundingClientRect();
        if (rect.top < viewportTop && rect.bottom > 30) {
            card.classList.add("is-visible");
        } else {
            card.classList.remove("is-visible");
        }
    });
}

function kingsObserveKingCards() {
    kingsRevealVisibleCards();

    if (typeof IntersectionObserver === "undefined") {
        window.addEventListener("scroll", kingsRevealVisibleCards, { passive: true });
        window.addEventListener("resize", kingsRevealVisibleCards, { passive: true });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, {
        threshold: 0.24,
        rootMargin: "0px 0px -8% 0px"
    });

    const kingCards = Array.from(document.querySelectorAll("[data-king-card]"));
    kingCards.forEach((card) => observer.observe(card));
    window.addEventListener("scroll", kingsRevealVisibleCards, { passive: true });
    window.addEventListener("resize", kingsRevealVisibleCards, { passive: true });
}

function isYugiohWinConsPage() {
    const params = new URLSearchParams(window.location.search);
    return params.get("game") === "Yu-Gi-Oh" && params.get("mode") === "wincons";
}

function isPokemonStartersPage() {
    const params = new URLSearchParams(window.location.search);
    return params.get("game") === "Pokemon" && params.get("mode") === "starters";
}

function pokemonStarterSets() {
    return [
        { generation: "Generation 1", era: "Kanto", name: "Charizard", cardPosition: 5, companion: "Parasect" },
        { generation: "Generation 2", era: "Johto", name: "Feraligatr", cardPosition: 9, companion: "Espeon" },
        { generation: "Generation 3", era: "Hoenn", name: "Sceptile", cardPosition: 4, companion: "Relicanth" },
        { generation: "Generation 4", era: "Sinnoh", name: "Empoleon", cardPosition: -1, companion: "Bidoof" },
        { generation: "Generation 5", era: "Unova", name: "Serperior", cardPosition: 8, companion: "Scrafty" },
        { generation: "Generation 6", era: "Kalos", name: "Greninja", cardPosition: 7, companion: "Goodra" },
        { generation: "Generation 7", era: "Alola", name: "Incineroar", cardPosition: 3, companion: "Toxapex" },
        { generation: "Generation 8", era: "Galar", name: "Cinderace", cardPosition: 5, companion: "Corviknight" },
        { generation: "Generation 9", era: "Paldea", name: "Meowscarada", cardPosition: 2, companion: "Garganacl", centered: true }
    ];
}

function pokemonEscapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function fetchPokemonStarterCards(name) {
    try {
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(name)}`, { cache: "no-store" });
        if (!response.ok) {
            return [];
        }

        const payload = await response.json();
        return Array.isArray(payload)
            ? payload
                .filter((card) => card?.name === name && card?.image)
                .map((card) => ({ ...card, image: `${card.image}/low.webp` }))
            : [];
    } catch {
        return [];
    }
}

function pokemonStarterCardMarkup(name, card, isCompanion = false) {
    const image = card?.image || "assets/Shalimar-card-icon.svg";
    const isFireSpinTrigger = name === "Charizard" && !isCompanion;
    return `
        <div class="pokemon-starter-card__starter pokemon-starter-card__starter--${isCompanion ? "companion" : "primary"}${isFireSpinTrigger ? " pokemon-starter-card__starter--fire-spin" : ""}"${isFireSpinTrigger ? " data-pokemon-fire-spin-trigger role=\"button\" tabindex=\"0\" aria-label=\"Use Fire Spin on Parasect\"" : ""}>
            <img src="${pokemonEscapeHtml(image)}" alt="${pokemonEscapeHtml(name)} card" loading="lazy" />
        </div>`;
}

function playPokemonFireSpin(main) {
    const charizard = main.querySelector(".pokemon-starter-card__starter--fire-spin");
    const parasect = main.querySelector("[data-pokemon-starter=\"Charizard\"] .pokemon-starter-card__starter--companion");
    if (!(charizard instanceof HTMLElement) || !(parasect instanceof HTMLElement)) {
        return;
    }

    const mainBounds = main.getBoundingClientRect();
    const charizardImage = charizard.querySelector("img");
    const parasectImage = parasect.querySelector("img");
    const charizardBounds = (charizardImage instanceof HTMLImageElement ? charizardImage : charizard).getBoundingClientRect();
    const parasectBounds = (parasectImage instanceof HTMLImageElement ? parasectImage : parasect).getBoundingClientRect();
    const spin = document.createElement("span");
    const startX = charizardBounds.left - mainBounds.left + (charizardBounds.width * 0.73);
    const startY = charizardBounds.top - mainBounds.top + (charizardBounds.height * 0.24);
    const endX = parasectBounds.left - mainBounds.left + (parasectBounds.width / 2);
    const endY = parasectBounds.top - mainBounds.top + (parasectBounds.height / 2);

    spin.className = "pokemon-fire-spin";
    spin.style.setProperty("--fire-spin-x", `${endX - startX}px`);
    spin.style.setProperty("--fire-spin-y", `${endY - startY}px`);
    spin.style.left = `${startX}px`;
    spin.style.top = `${startY}px`;
    main.appendChild(spin);
    parasect.classList.remove("is-fire-spun");

    window.setTimeout(() => parasect.classList.add("is-fire-spun"), 560);
    window.setTimeout(() => parasect.classList.remove("is-fire-spun"), 1600);
    window.setTimeout(() => spin.remove(), 1700);
}

async function renderPokemonStartersPage() {
    const main = document.querySelector("main.kings-page");
    if (!(main instanceof HTMLElement)) {
        return false;
    }

    const generations = pokemonStarterSets();

    document.title = "Shalimar Collectibles | Pokemon Starters";
    const footerMeta = document.querySelector(".site-footer__meta");
    if (footerMeta instanceof HTMLElement) {
        footerMeta.textContent = "One featured Pokemon from each of the nine current generations.";
    }

    main.classList.add("pokemon-starters-page");
    main.innerHTML = `
        <section class="kings-hero pokemon-starters-hero" aria-label="Pokemon starter overview">
            <div class="kings-hero__content">
                <p class="kings-hero__eyebrow">Pokemon Starters</p>
                <h1>Choose your first partner across nine generations.</h1>
                <p>Explore one featured evolved starter from each mainline Pokemon generation.</p>
            </div>
            <aside class="kings-hero__panel" aria-label="Pokemon starter snapshot">
                <p class="kings-hero__panel-label">Starter Snapshot</p>
                <ul class="kings-hero__list">
                    <li>Generations: 9</li>
                    <li>Featured Pokemon: 9</li>
                    <li>Source: TCGdex API</li>
                </ul>
            </aside>
        </section>
        <section class="kings-shell pokemon-starters-shell" aria-label="Pokemon starter generations">
            <article class="kings-panel kings-panel--cards">
                <div class="kings-panel__head">
                    <h2>Featured Starters</h2>
                    <p>One featured Pokemon per current generation, grouped by region and presented without animation for now.</p>
                </div>
                <div class="pokemon-starter-grid">
                    ${generations.map((entry) => `
                        <article class="pokemon-starter-card${entry.centered ? " pokemon-starter-card--centered" : ""}" data-pokemon-starter="${pokemonEscapeHtml(entry.name)}">
                            <div class="pokemon-starter-card__heading">
                                <span>${pokemonEscapeHtml(entry.generation)}</span>
                                ${entry.name === "Charizard" ? '<button class="pokemon-fire-spin-control" type="button" data-pokemon-fire-spin-trigger aria-label="Use Fire Spin on Parasect" title="Use Fire Spin"></button>' : ""}
                                <strong>${pokemonEscapeHtml(entry.era)}</strong>
                            </div>
                            <div class="pokemon-starter-card__family">
                                ${pokemonStarterCardMarkup(entry.name)}
                                ${entry.companion ? pokemonStarterCardMarkup(entry.companion, null, true) : ""}
                            </div>
                        </article>
                    `).join("")}
                </div>
            </article>
        </section>`;

    main.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("[data-pokemon-fire-spin-trigger]")) {
            event.preventDefault();
            playPokemonFireSpin(main);
        }
    });
    main.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && event.target instanceof Element && event.target.closest("[data-pokemon-fire-spin-trigger]")) {
            event.preventDefault();
            playPokemonFireSpin(main);
        }
    });

    generations.forEach((entry) => {
        void fetchPokemonStarterCards(entry.name).then((cards) => {
            if (!cards.length) {
                return;
            }

            const starter = Array.from(document.querySelectorAll("[data-pokemon-starter]")).find((element) => element.dataset.pokemonStarter === entry.name);
            if (!(starter instanceof HTMLElement)) {
                return;
            }

            const family = starter.querySelector(".pokemon-starter-card__family");
            if (family instanceof HTMLElement) {
                const cardIndex = entry.cardPosition < 0 ? cards.length - 1 : entry.cardPosition - 1;
                const selectedCard = cards[cardIndex] || cards[0];
                const primaryCard = family.querySelector(".pokemon-starter-card__starter--primary");
                if (primaryCard instanceof HTMLElement) {
                    primaryCard.outerHTML = pokemonStarterCardMarkup(entry.name, selectedCard);
                }
            }
        });

        if (!entry.companion) {
            return;
        }

        void fetchPokemonStarterCards(entry.companion).then((cards) => {
            const companion = cards[0];
            if (!companion) {
                return;
            }

            const starter = Array.from(document.querySelectorAll("[data-pokemon-starter]")).find((element) => element.dataset.pokemonStarter === entry.name);
            const family = starter?.querySelector(".pokemon-starter-card__family");
            if (!(family instanceof HTMLElement)) {
                return;
            }

            const existingCompanion = family.querySelector(".pokemon-starter-card__starter--companion");
            if (existingCompanion instanceof HTMLElement) {
                existingCompanion.outerHTML = pokemonStarterCardMarkup(entry.companion, companion, true);
            }
        });
    });

    return true;
}

function renderYugiohWinConsPage() {
    const main = document.querySelector("main.kings-page");
    if (!(main instanceof HTMLElement)) {
        return false;
    }

    const exodiaPieces = [
        "Exodia the Forbidden One",
        "Right Arm of the Forbidden One",
        "Left Arm of the Forbidden One",
        "Right Leg of the Forbidden One",
        "Left Leg of the Forbidden One"
    ];

    document.title = "Shalimar Collectibles | Yu-Gi-Oh Win Cons";
    const footerMeta = document.querySelector(".site-footer__meta");
    if (footerMeta instanceof HTMLElement) {
        footerMeta.textContent = "Yu-Gi-Oh win condition research, card links, and strategy pathways are live for the current content pass.";
    }
    main.classList.add("wincons-page");
    main.innerHTML = `
        <section class="wincons-hero" aria-label="Yu-Gi-Oh win conditions overview">
            <div class="wincons-hero__content">
                <p class="wincons-hero__eyebrow">Yu-Gi-Oh Strategy Archive</p>
                <h1>Win the duel before the duel gets away from you.</h1>
                <p>Explore the cards, engines, and finish lines that turn a Yu-Gi-Oh deck from a collection of ideas into a complete victory plan.</p>
                <div class="wincons-hero__actions">
                    <a class="wincons-action wincons-action--primary" href="inventory.html?game=Yu-Gi-Oh">Explore Yu-Gi-Oh Inventory</a>
                    <a class="wincons-action" href="sets.html?game=Yu-Gi-Oh">Browse Sets</a>
                </div>
            </div>
            <aside class="wincons-hero__panel" aria-label="Win condition snapshot">
                <p class="wincons-hero__panel-label">Strategy Snapshot</p>
                <ul>
                    <li><strong>5</strong><span>core finish lines</span></li>
                    <li><strong>14,516</strong><span>unique cards in inventory</span></li>
                    <li><strong>Live</strong><span>card details via API</span></li>
                </ul>
            </aside>
        </section>

        <section class="wincons-shell" aria-label="Yu-Gi-Oh win condition categories">
            <div class="wincons-section-heading">
                <div>
                    <p class="wincons-hero__eyebrow">Choose your finish line</p>
                    <h2>Every deck tells its story at the moment it wins.</h2>
                </div>
                <p>Start with a victory pattern, then follow it into the cards that make the plan possible.</p>
            </div>
            <div class="wincons-grid">
                <a class="wincon-card wincon-card--alternate" data-wincon-card="Exodia the Forbidden One" href="card-template.html?q=Exodia%20the%20Forbidden%20One&game=Yu-Gi-Oh&variantMode=rarity">
                    <span class="wincon-card__number">01</span>
                    <div class="wincon-card__image-wrap wincon-card__image-wrap--pieces">
                        ${exodiaPieces.map((piece) => `<div class="wincon-card__piece"><img class="wincon-card__image" data-card-image="${piece}" alt="" loading="lazy" /></div>`).join("")}
                    </div>
                    <p class="wincon-card__quote" aria-live="polite">Exodia, Incinerate!</p>
                    <h3>Exodia the Forbidden One</h3>
                    <p>The classic five-card alternate victory: assemble the complete Forbidden One before the opponent can break the hand or field.</p>
                    <span class="wincon-card__pieces">Head + Left Arm + Right Arm + Left Leg + Right Leg</span>
                    <span class="wincon-card__link">Search the Exodia pieces <span aria-hidden="true">-&gt;</span></span>
                </a>
                <a class="wincon-card wincon-card--burn" data-wincon-card="Gagaga Cowboy" href="card-template.html?q=Gagaga%20Cowboy&game=Yu-Gi-Oh&variantMode=rarity">
                    <span class="wincon-card__number">02</span>
                    <div class="wincon-card__life-counter" data-cowboy-life-counter aria-live="polite">800 <span>LP</span><button type="button" data-cowboy-reset aria-label="Reset Gagaga Cowboy life points">Reset</button></div>
                    <div class="wincon-card__image-wrap wincon-card__image-wrap--cowboy">
                        <div class="wincon-card__filler-card wincon-card__filler-card--back" data-cowboy-material aria-hidden="true"></div>
                        <div class="wincon-card__filler-card wincon-card__filler-card--front" data-cowboy-material aria-hidden="true"></div>
                        <img class="wincon-card__image" alt="" loading="lazy" />
                    </div>
                    <h3>Gagaga Cowboy</h3>
                    <p>Close the duel from Defense Position with a clean 800-point burn finish when the opponent is already within range.</p>
                    <span class="wincon-card__pieces">Detach 1 Xyz Material -&gt; inflict 800 damage</span>
                    <span class="wincon-card__cowboy-quote" data-cowboy-quote aria-live="polite"></span>
                    <span class="wincon-card__link">Search Gagaga Cowboy <span aria-hidden="true">-&gt;</span></span>
                </a>
                <a class="wincon-card wincon-card--lock" data-wincon-card="Destiny Board" href="card-template.html?q=Destiny%20Board&game=Yu-Gi-Oh&variantMode=rarity">
                    <span class="wincon-card__number">03</span>
                    <div class="wincon-card__image-wrap wincon-card__image-wrap--destiny">
                        <div class="destiny-board-core"><img class="wincon-card__image" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--i"><img class="wincon-card__image" data-card-image="Spirit Message I" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--n"><img class="wincon-card__image" data-card-image="Spirit Message N" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--a"><img class="wincon-card__image" data-card-image="Spirit Message A" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--l"><img class="wincon-card__image" data-card-image="Spirit Message L" alt="" loading="lazy" /></div>
                        <span class="destiny-callout" aria-live="polite">The End!</span>
                    </div>
                    <h3>Destiny Board</h3>
                    <p>Build the complete message across five Spell and Trap zones, then let the final letter deliver the alternate win.</p>
                    <span class="wincon-card__pieces">Destiny Board + Spirit Message I, N, A, L</span>
                    <span class="wincon-card__link">Search Destiny Board pieces <span aria-hidden="true">-&gt;</span></span>
                </a>
                <a class="wincon-card wincon-card--combat" data-wincon-card="Vennominaga the Deity of Poisonous Snakes" href="card-template.html?q=Vennominaga%20the%20Deity%20of%20Poisonous%20Snakes&game=Yu-Gi-Oh&variantMode=rarity">
                    <span class="wincon-card__number">04</span>
                    <div class="wincon-card__venom-counter" data-venom-counter aria-live="polite">0 <span>/ 3</span><button type="button" data-venom-reset aria-label="Reset Hyper-Venom Counters">Reset</button></div>
                    <div class="wincon-card__image-wrap wincon-card__image-wrap--venom">
                        <img class="wincon-card__image" alt="" loading="lazy" />
                    </div>
                    <h3>Vennominaga the Deity of Poisonous Snakes</h3>
                    <p>Protect the Deity, build its Hyper-Venom Counters, and turn a long setup into an untouchable alternate victory condition.</p>
                    <span class="wincon-card__pieces">Summon condition + Hyper-Venom Counters</span>
                    <span class="wincon-card__venom-quote" data-venom-quote aria-live="polite"></span>
                    <span class="wincon-card__link">Search Vennominaga <span aria-hidden="true">-&gt;</span></span>
                </a>
                <a class="wincon-card wincon-card--deckout" data-wincon-card="Blue-Eyes Ultimate Dragon" href="card-template.html?q=Blue-Eyes%20Ultimate%20Dragon&game=Yu-Gi-Oh&variantMode=rarity">
                    <span class="wincon-card__number">05</span>
                    <button class="blueeyes-mode-block" type="button" data-blueeyes-toggle aria-live="polite" aria-label="Defuse Blue-Eyes Ultimate Dragon"><span class="blueeyes-mode blueeyes-mode--unfuse">UNFUSE</span><span class="blueeyes-mode blueeyes-mode--fuse">FUSE</span></button>
                    <div class="wincon-card__image-wrap wincon-card__image-wrap--blueeyes">
                        <span class="blueeyes-callout blueeyes-callout--fusion">Neutron Blast</span>
                        <span class="blueeyes-callout blueeyes-callout--split">White Lightning</span>
                        <div class="blueeyes-ultimate"><img class="wincon-card__image" alt="" loading="lazy" /></div>
                        <div class="blueeyes-split blueeyes-split--left"><img class="wincon-card__image" data-card-image="Blue-Eyes White Dragon" data-blue-eyes-art="0" alt="" loading="lazy" /></div>
                        <div class="blueeyes-split blueeyes-split--center"><img class="wincon-card__image" data-card-image="Blue-Eyes White Dragon" data-blue-eyes-art="1" alt="" loading="lazy" /></div>
                        <div class="blueeyes-split blueeyes-split--right"><img class="wincon-card__image" data-card-image="Blue-Eyes White Dragon" data-blue-eyes-art="2" alt="" loading="lazy" /></div>
                    </div>
                    <h3>Blue-Eyes Ultimate Dragon</h3>
                    <p>Bring three Blue-Eyes White Dragons together into a 4500 ATK closer that makes the battle phase the entire argument.</p>
                    <span class="wincon-card__pieces">Blue-Eyes White Dragon x3 -&gt; Fusion Summon</span>
                    <span class="wincon-card__link">Search Blue-Eyes Ultimate Dragon <span aria-hidden="true">-&gt;</span></span>
                </a>
            </div>
        </section>`;

    observeWinConCards();
    observeDestinyBoard();
    observeBlueEyesDefusion();
    hydrateWinConImages();
    initCowboyInteraction();
    initVennominagaInteraction();
    return true;
}

function initVennominagaInteraction() {
    const card = document.querySelector(".wincon-card--combat");
    if (!(card instanceof HTMLAnchorElement)) {
        return;
    }

    const counter = card.querySelector("[data-venom-counter]");
    const resetButton = card.querySelector("[data-venom-reset]");
    const image = card.querySelector(".wincon-card__image");
    const quote = card.querySelector("[data-venom-quote]");
    if (!(counter instanceof HTMLElement) || !(resetButton instanceof HTMLButtonElement) || !(image instanceof HTMLImageElement) || !(quote instanceof HTMLElement)) {
        return;
    }

    let hyperVenomCounters = 0;

    const renderCounter = () => {
        counter.firstChild.textContent = `${hyperVenomCounters} `;
        card.dataset.venomLevel = String(hyperVenomCounters);
        card.classList.toggle("is-venom-awakened", hyperVenomCounters === 3);
        const filters = [
            "none",
            "hue-rotate(10deg) saturate(1.2) sepia(0.08)",
            "hue-rotate(34deg) saturate(1.55) sepia(0.16) brightness(0.96)",
            "hue-rotate(58deg) saturate(2.05) sepia(0.28) brightness(0.88)"
        ];
        image.style.filter = filters[hyperVenomCounters];
        quote.textContent = hyperVenomCounters === 3 ? "Hyper-Venom Victory!" : "";
        quote.style.opacity = hyperVenomCounters === 3 ? "1" : "0";
        quote.style.transform = hyperVenomCounters === 3 ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)";
    };

    card.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.closest("[data-venom-reset]")) {
            event.preventDefault();
            event.stopPropagation();
            hyperVenomCounters = 0;
            renderCounter();
            return;
        }

        if (!(event.target instanceof HTMLElement) || !event.target.closest(".wincon-card__image-wrap--venom")) {
            return;
        }

        event.preventDefault();
        if (hyperVenomCounters < 3) {
            hyperVenomCounters += 1;
            renderCounter();
        }
    });
}

function observeDestinyBoard() {
    const card = document.querySelector(".wincon-card--lock");
    if (!(card instanceof HTMLElement)) {
        return;
    }

    const revealWhenScrolledTo = () => {
        const rect = card.getBoundingClientRect();
        if (window.scrollY > 0 && rect.top < window.innerHeight * 0.82 && rect.bottom > 0) {
            card.classList.add("is-visible");
            window.setTimeout(() => {
                const callout = card.querySelector(".destiny-callout");
                if (callout instanceof HTMLElement) {
                    callout.classList.add("is-complete");
                }
            }, 5600);
            clearInterval(positionWatcher);
            window.removeEventListener("scroll", revealWhenScrolledTo);
            window.removeEventListener("resize", revealWhenScrolledTo);
        }
    };

    const positionWatcher = window.setInterval(revealWhenScrolledTo, 120);
    window.addEventListener("scroll", revealWhenScrolledTo, { passive: true });
    window.addEventListener("resize", revealWhenScrolledTo, { passive: true });
}

function setBlueEyesState(card, isDefused) {
    const ultimate = card.querySelector(".blueeyes-ultimate");
    const splitCards = Array.from(card.querySelectorAll(".blueeyes-split"));
    const fuseMode = card.querySelector(".blueeyes-mode--fuse");
    const unfuseMode = card.querySelector(".blueeyes-mode--unfuse");
    const fusionCallout = card.querySelector(".blueeyes-callout--fusion");
    const splitCallout = card.querySelector(".blueeyes-callout--split");
    const toggle = card.querySelector("[data-blueeyes-toggle]");
    const timers = card.blueEyesTimers || [];
    timers.forEach((timer) => clearTimeout(timer));
    card.blueEyesTimers = [];

    card.classList.toggle("is-visible", isDefused);
    if (ultimate instanceof HTMLElement) {
        ultimate.style.opacity = isDefused ? "0" : "1";
        ultimate.style.transform = isDefused
            ? "translateX(-50%) scale(0.58) rotate(8deg)"
            : "translateX(-50%) scale(1) rotate(0deg)";
    }

    [fuseMode, splitCallout].forEach((element) => {
        if (element instanceof HTMLElement) element.style.opacity = isDefused ? "1" : "0";
    });
    [unfuseMode, fusionCallout].forEach((element) => {
        if (element instanceof HTMLElement) element.style.opacity = isDefused ? "0" : "1";
    });
    if (toggle instanceof HTMLButtonElement) {
        toggle.setAttribute("aria-label", isDefused ? "Fuse the three Blue-Eyes White Dragons" : "Defuse Blue-Eyes Ultimate Dragon");
    }

    const splitStates = [
        { left: "20%", top: "32px", transform: "translateX(-50%) rotate(-8deg) rotateY(0deg) scale(0.92)", delay: 700 },
        { left: "50%", top: "4px", transform: "translateX(-50%) rotateY(0deg) scale(1)", delay: 1500 },
        { left: "80%", top: "32px", transform: "translateX(-50%) rotate(8deg) rotateY(0deg) scale(0.92)", delay: 2300 }
    ];
    splitCards.forEach((splitCard, index) => {
        if (!(splitCard instanceof HTMLElement)) return;
        const state = splitStates[index];
        if (!isDefused || !state) {
            splitCard.style.left = "50%";
            splitCard.style.top = "8px";
            splitCard.style.opacity = "0";
            splitCard.style.transform = "translateX(-50%) rotateY(90deg) scale(0.82)";
            return;
        }
        const timer = window.setTimeout(() => {
            splitCard.style.left = state.left;
            splitCard.style.top = state.top;
            splitCard.style.opacity = "1";
            splitCard.style.transform = state.transform;
        }, state.delay);
        card.blueEyesTimers.push(timer);
    });
}

function observeBlueEyesDefusion() {
    const card = document.querySelector(".wincon-card--deckout");
    if (!(card instanceof HTMLElement)) {
        return;
    }

    const revealWhenReached = () => {
        const rect = card.getBoundingClientRect();
        if (window.scrollY > 0 && rect.top < window.innerHeight * 0.82 && rect.bottom > 0) {
            setBlueEyesState(card, true);
            clearInterval(positionWatcher);
            window.removeEventListener("scroll", revealWhenReached);
            window.removeEventListener("resize", revealWhenReached);
        }
    };

    const positionWatcher = window.setInterval(revealWhenReached, 120);
    window.addEventListener("scroll", revealWhenReached, { passive: true });
    window.addEventListener("resize", revealWhenReached, { passive: true });

    card.addEventListener("click", (event) => {
        const toggle = event.target instanceof HTMLElement && event.target.closest("[data-blueeyes-toggle]");
        if (!toggle) {
            return;
        }
        event.preventDefault();
        setBlueEyesState(card, !card.classList.contains("is-visible"));
        event.stopPropagation();
    });
}

function initCowboyInteraction() {
    const card = document.querySelector(".wincon-card--burn");
    if (!(card instanceof HTMLAnchorElement)) {
        return;
    }

    const materials = Array.from(card.querySelectorAll("[data-cowboy-material]"));
    const lifeCounter = card.querySelector("[data-cowboy-life-counter]");
    const resetButton = card.querySelector("[data-cowboy-reset]");
    if (materials.length < 2 || !(lifeCounter instanceof HTMLElement) || !(resetButton instanceof HTMLButtonElement)) {
        return;
    }

    let detachedMaterial = null;
    let countdownFrame = null;
    let quoteTimer = null;
    const quote = card.querySelector("[data-cowboy-quote]");

    const setLifePoints = (value) => {
        lifeCounter.firstChild.textContent = `${Math.round(value)} `;
    };

    const animateLifePoints = (from, to) => {
        if (countdownFrame) {
            cancelAnimationFrame(countdownFrame);
        }

        const startedAt = performance.now();
        const duration = 900;
        const tick = (now) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setLifePoints(from + ((to - from) * easedProgress));
            if (progress < 1) {
                countdownFrame = requestAnimationFrame(tick);
            } else {
                countdownFrame = null;
            }
        };

        countdownFrame = requestAnimationFrame(tick);
    };

    const detachMaterial = () => {
        if (detachedMaterial || materials.length < 2) {
            return;
        }

        detachedMaterial = materials[0];
        detachedMaterial.remove();
        card.classList.add("is-cowboy-resolved");
        animateLifePoints(800, 0);

        if (quote instanceof HTMLElement) {
            quote.textContent = "";
            if (quoteTimer) {
                clearInterval(quoteTimer);
            }

            const message = "Cowboy, for Game?";
            let characterIndex = 0;
            quoteTimer = setInterval(() => {
                quote.textContent = message.slice(0, characterIndex + 1);
                characterIndex += 1;
                if (characterIndex >= message.length) {
                    clearInterval(quoteTimer);
                    quoteTimer = null;
                }
            }, 75);
        }
    };

    const resetState = () => {
        if (detachedMaterial) {
            const image = card.querySelector(".wincon-card__image-wrap--cowboy .wincon-card__image");
            const wrap = card.querySelector(".wincon-card__image-wrap--cowboy");
            if (image instanceof HTMLImageElement && wrap instanceof HTMLElement) {
                wrap.insertBefore(detachedMaterial, image);
            }
            detachedMaterial = null;
        }

        card.classList.remove("is-cowboy-resolved");
        if (quoteTimer) {
            clearInterval(quoteTimer);
            quoteTimer = null;
        }
        if (quote instanceof HTMLElement) {
            quote.textContent = "";
        }
        animateLifePoints(0, 800);
    };

    card.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.closest("[data-cowboy-reset]")) {
            event.preventDefault();
            event.stopPropagation();
            resetState();
            return;
        }

        if (!(event.target instanceof HTMLElement) || !event.target.closest(".wincon-card__image-wrap--cowboy")) {
            return;
        }

        event.preventDefault();
        detachMaterial();
    });
}

function observeWinConCards() {
    const cards = Array.from(document.querySelectorAll(".wincon-card"));
    if (cards.length === 0) {
        return;
    }

    const reveal = (card) => card.classList.add("is-visible");
    if (typeof IntersectionObserver === "undefined") {
        cards.forEach((card) => {
            if (window.scrollY > 0) {
                reveal(card);
            }
        });
        return;
    }

    const initialObservation = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.target instanceof HTMLElement && entry.target.classList.contains("wincon-card--lock") && entry.isIntersecting) {
                reveal(entry.target);
                observer.unobserve(entry.target);
                return;
            }

            if (!initialObservation.has(entry.target)) {
                initialObservation.add(entry.target);
                if (window.scrollY === 0 && entry.isIntersecting) {
                    return;
                }
            }

            if (entry.isIntersecting) {
                reveal(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    cards.forEach((card) => observer.observe(card));
}

async function hydrateWinConImages() {
    const images = Array.from(document.querySelectorAll(".wincon-card__image"));
    await Promise.all(images.map(async (image) => {
        const card = image.closest("[data-wincon-card]");
        const cardName = image.getAttribute("data-card-image") || card?.getAttribute("data-wincon-card") || "";
        if (!(image instanceof HTMLImageElement) || !cardName) {
            return;
        }

        try {
            const endpoint = new URL("https://db.ygoprodeck.com/api/v7/cardinfo.php");
            const spiritMatch = cardName.match(/^Spirit Message ([INAL])$/);
            const candidateNames = spiritMatch
                ? [`Spirit Message "${spiritMatch[1]}"`, cardName]
                : [cardName];
            let payload = null;
            for (const candidateName of candidateNames) {
                endpoint.searchParams.set("name", candidateName);
                const response = await fetch(endpoint.toString(), { cache: "no-store" });
                if (response.ok) {
                    payload = await response.json();
                    break;
                }
            }
            if (!payload) {
                return;
            }

            const imageIndex = Number(image.dataset.blueEyesArt);
            const cardImages = Array.isArray(payload?.data?.[0]?.card_images) ? payload.data[0].card_images : [];
            const selectedImage = Number.isInteger(imageIndex) && imageIndex >= 0
                ? (cardImages[imageIndex] || cardImages[0])
                : cardImages[0];
            const firstImage = selectedImage;
            const imageUrl = firstImage?.image_url || firstImage?.image_url_cropped || "";
            if (!imageUrl) {
                return;
            }

            image.src = imageUrl;
            image.alt = `${cardName} card image`;
            card?.classList.add("has-image");
        } catch {
            // Keep the card polished if the external image service is unavailable.
        }
    }));
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
    if (isPokemonStartersPage()) {
        void renderPokemonStartersPage();
        return;
    }

    if (isYugiohWinConsPage()) {
        renderYugiohWinConsPage();
        return;
    }

    requestAnimationFrame(() => {
        kingsRevealVisibleCards();
        kingsObserveKingCards();
    });
    void initKingsPricing();
});