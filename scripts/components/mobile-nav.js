function initMobileNav() {
    const toggle = document.getElementById("mobileNavToggle");
    const links = document.getElementById("primaryNavLinks");
    const overlay = document.getElementById("mobileNavOverlay");

    if (!toggle || !links || !overlay) {
        return;
    }

    const closeNav = () => {
        document.body.classList.remove("is-mobile-nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
    };

    const openNav = () => {
        document.body.classList.add("is-mobile-nav-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close navigation menu");
    };

    toggle.addEventListener("click", () => {
        const isOpen = document.body.classList.contains("is-mobile-nav-open");
        if (isOpen) {
            closeNav();
            return;
        }
        openNav();
    });

    overlay.addEventListener("click", closeNav);

    links.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.closest("a")) {
            closeNav();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNav();
        }
    });

    const mobileNavQuery = window.matchMedia("(max-width: 768px)");
    const syncNavState = () => {
        if (!mobileNavQuery.matches) {
            closeNav();
        }
    };

    if (typeof mobileNavQuery.addEventListener === "function") {
        mobileNavQuery.addEventListener("change", syncNavState);
    } else {
        mobileNavQuery.addListener(syncNavState);
    }
}

function initNavSearch() {
    const form = document.getElementById("navSearch");
    const input = document.getElementById("navSearchInput");
    if (!(form instanceof HTMLFormElement) || !(input instanceof HTMLInputElement)) {
        return;
    }

    const gameSelect = document.getElementById("gameModeSelect") || document.getElementById("homeGameModeSelect");
    const gameNames = {
        yyh: "Yu Yu Hakusho",
        ygo: "Yu-Gi-Oh",
        pokemon: "Pokemon"
    };
    const params = new URLSearchParams(window.location.search);
    input.value = params.get("q") || params.get("search") || "";

    const suggestionList = document.createElement("ul");
    suggestionList.className = "nav-search__suggestions";
    suggestionList.hidden = true;
    suggestionList.setAttribute("role", "listbox");
    form.appendChild(suggestionList);

    let suggestionRequestId = 0;
    let suggestionTimer = null;

    const hideSuggestions = () => {
        suggestionList.hidden = true;
        suggestionList.innerHTML = "";
    };

    const makeCardUrl = (card) => {
        const destination = new URL("card-template.html", window.location.href);
        destination.searchParams.set("q", card.name);
        destination.searchParams.set("game", card.game);
        if (card.set) {
            destination.searchParams.set("set", card.set);
        }
        if (card.id) {
            destination.searchParams.set("id", card.id);
        }
        return destination.toString();
    };

    const renderSuggestions = (cards) => {
        suggestionList.innerHTML = cards.map((card) => `
            <li class="nav-search__suggestion" role="option">
                <a class="nav-search__suggestion-link" href="${card.url}">
                    <img src="${card.image}" alt="" loading="lazy" />
                    <span>
                        <strong>${card.name}</strong>
                        <small>${card.game}${card.set ? ` • ${card.set}` : ""}</small>
                    </span>
                </a>
            </li>
        `).join("");
        suggestionList.hidden = cards.length === 0;
    };

    const fetchSuggestions = async (query, requestId) => {
        const game = gameNames[gameSelect instanceof HTMLSelectElement ? gameSelect.value : "yyh"] || "Yu Yu Hakusho";
        let cards = [];

        if (game === "Yu Yu Hakusho") {
            const response = await fetch(`/api/yyh/cards?game=${encodeURIComponent(game)}&q=${encodeURIComponent(query)}&limit=5`, { cache: "no-store" });
            const payload = await response.json();
            cards = (Array.isArray(payload.items) ? payload.items : []).slice(0, 5).map((card) => ({
                name: card.name,
                game,
                set: card.set,
                id: card.id || card.number,
                image: card.imageUrl || "assets/Shalimar-card-icon.svg"
            }));
        } else if (game === "Yu-Gi-Oh") {
            const endpoint = new URL("https://db.ygoprodeck.com/api/v7/cardinfo.php");
            endpoint.searchParams.set("fname", query);
            endpoint.searchParams.set("num", "5");
            endpoint.searchParams.set("offset", "0");
            const response = await fetch(endpoint.toString(), { cache: "no-store" });
            const payload = await response.json();
            cards = (Array.isArray(payload.data) ? payload.data : []).slice(0, 5).map((card) => {
                const set = Array.isArray(card.card_sets) ? card.card_sets[0] : null;
                return {
                    name: card.name,
                    game,
                    set: set?.set_name || "",
                    id: set?.set_code || card.id,
                    image: card.card_images?.[0]?.image_url_small || card.card_images?.[0]?.image_url || "assets/Shalimar-card-icon.svg"
                };
            });
        } else if (game === "Pokemon") {
            const endpoint = new URL("https://api.tcgdex.net/v2/en/cards");
            endpoint.searchParams.set("name", query);
            const response = await fetch(endpoint.toString(), { cache: "no-store" });
            const payload = await response.json();
            cards = (Array.isArray(payload) ? payload : []).slice(0, 5).map((card) => ({
                name: card.name,
                game,
                set: typeof card.set === "object" ? card.set?.name || card.set?.id || "" : card.set || "",
                id: card.id,
                image: card.image ? `${card.image}/low.webp` : "assets/Shalimar-card-icon.svg"
            }));
        }

        if (requestId !== suggestionRequestId) {
            return;
        }

        renderSuggestions(cards.map((card) => ({ ...card, url: makeCardUrl(card) })));
    };

    input.addEventListener("input", () => {
        const query = input.value.trim();
        suggestionRequestId += 1;
        const requestId = suggestionRequestId;
        if (suggestionTimer) {
            window.clearTimeout(suggestionTimer);
        }
        if (query.length < 3) {
            hideSuggestions();
            return;
        }
        suggestionTimer = window.setTimeout(() => {
            fetchSuggestions(query, requestId).catch(() => {
                if (requestId === suggestionRequestId) {
                    hideSuggestions();
                }
            });
        }, 160);
    });

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Node) || !form.contains(event.target)) {
            hideSuggestions();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        hideSuggestions();
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const destination = new URL(currentFile === "card-template.html" ? "card-template.html" : "inventory.html", window.location.href);
        const query = input.value.trim();
        const gameKey = gameSelect instanceof HTMLSelectElement ? gameSelect.value : "yyh";
        if (query) {
            destination.searchParams.set("q", query);
        } else {
            destination.searchParams.delete("q");
        }
        if (gameNames[gameKey]) {
            destination.searchParams.set("game", gameNames[gameKey]);
        }
        window.location.href = destination.toString();
    });
}

const FOOTER_LINKS = [
	{ label: "Contributors", href: "contributors.html" },
    { label: "Inventory", href: "inventory.html" },
    { label: "Sets", href: "sets.html" },
    { label: "Kings", href: "kings.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
];

function getCurrentPageName() {
    const pathname = window.location.pathname.toLowerCase();
    const fileName = pathname.split("/").pop() || "index.html";

    if (fileName === "" || fileName === "index.html" || pathname.endsWith("/")) {
        return "index.html";
    }

    return fileName;
}

function initFooterNav() {
    const footerNavs = document.querySelectorAll(".site-footer__nav");

    if (!footerNavs.length) {
        return;
    }

    const currentPage = getCurrentPageName();
    const footerLinks = currentPage === "index.html"
        ? FOOTER_LINKS
        : FOOTER_LINKS.filter((link) => link.href !== currentPage);
    const navMarkup = footerLinks
        .map((link) => {
            const currentAttribute = currentPage === link.href ? ' aria-current="page"' : "";
            return `<a href="${link.href}"${currentAttribute}>${link.label}</a>`;
        })
        .join("");

    footerNavs.forEach((footerNav) => {
        footerNav.innerHTML = navMarkup;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initNavSearch();
    initFooterNav();
});
