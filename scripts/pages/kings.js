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
                <a class="wincon-card wincon-card--alternate" data-wincon-card="Exodia the Forbidden One" href="inventory.html?game=Yu-Gi-Oh&q=Exodia">
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
                <a class="wincon-card wincon-card--burn" data-wincon-card="Gagaga Cowboy" href="inventory.html?game=Yu-Gi-Oh&q=Gagaga Cowboy">
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
                <a class="wincon-card wincon-card--lock" data-wincon-card="Destiny Board" href="inventory.html?game=Yu-Gi-Oh&q=Destiny Board">
                    <span class="wincon-card__number">03</span>
                    <div class="wincon-card__image-wrap wincon-card__image-wrap--destiny">
                        <div class="destiny-board-core"><img class="wincon-card__image" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--i"><img class="wincon-card__image" data-card-image="Spirit Message I" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--n"><img class="wincon-card__image" data-card-image="Spirit Message N" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--a"><img class="wincon-card__image" data-card-image="Spirit Message A" alt="" loading="lazy" /></div>
                        <div class="destiny-message destiny-message--l"><img class="wincon-card__image" data-card-image="Spirit Message L" alt="" loading="lazy" /></div>
                    </div>
                    <h3>Destiny Board</h3>
                    <p>Build the complete message across five Spell and Trap zones, then let the final letter deliver the alternate win.</p>
                    <span class="wincon-card__pieces">Destiny Board + Spirit Message I, N, A, L</span>
                    <span class="wincon-card__link">Search Destiny Board pieces <span aria-hidden="true">-&gt;</span></span>
                </a>
                <a class="wincon-card wincon-card--combat" data-wincon-card="Vennominaga the Deity of Poisonous Snakes" href="inventory.html?game=Yu-Gi-Oh&q=Vennominaga">
                    <span class="wincon-card__number">04</span>
                    <div class="wincon-card__image-wrap"><img class="wincon-card__image" alt="" loading="lazy" /></div>
                    <h3>Vennominaga the Deity of Poisonous Snakes</h3>
                    <p>Protect the Deity, build its Hyper-Venom Counters, and turn a long setup into an untouchable alternate victory condition.</p>
                    <span class="wincon-card__pieces">Summon condition + Hyper-Venom Counters</span>
                    <span class="wincon-card__link">Search Vennominaga <span aria-hidden="true">-&gt;</span></span>
                </a>
                <a class="wincon-card wincon-card--deckout" data-wincon-card="Blue-Eyes Ultimate Dragon" href="inventory.html?game=Yu-Gi-Oh&q=Blue-Eyes Ultimate Dragon">
                    <span class="wincon-card__number">05</span>
                    <div class="wincon-card__image-wrap"><img class="wincon-card__image" alt="" loading="lazy" /></div>
                    <h3>Blue-Eyes Ultimate Dragon</h3>
                    <p>Bring three Blue-Eyes White Dragons together into a 4500 ATK closer that makes the battle phase the entire argument.</p>
                    <span class="wincon-card__pieces">Blue-Eyes White Dragon x3 -&gt; Fusion Summon</span>
                    <span class="wincon-card__link">Search Blue-Eyes Ultimate Dragon <span aria-hidden="true">-&gt;</span></span>
                </a>
            </div>
        </section>`;

    observeWinConCards();
    observeDestinyBoard();
    hydrateWinConImages();
    initCowboyInteraction();
    return true;
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
            clearInterval(positionWatcher);
            window.removeEventListener("scroll", revealWhenScrolledTo);
            window.removeEventListener("resize", revealWhenScrolledTo);
        }
    };

    const positionWatcher = window.setInterval(revealWhenScrolledTo, 120);
    window.addEventListener("scroll", revealWhenScrolledTo, { passive: true });
    window.addEventListener("resize", revealWhenScrolledTo, { passive: true });
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

            const firstImage = payload?.data?.[0]?.card_images?.[0];
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