const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const seasonalThemes = {
	0: {
		themeTitle: "New Year Ascension",
		accent: "#93c5fd",
		glow: "rgba(147, 197, 253, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Metagross", person: "Associated: Steven Stone", thumbColors: ["#64748b", "#1e293b"] },
			{ game: "Yu Yu Hakusho", card: "Yusuke (Mazoku Form)", person: "Associated: Raizen", thumbColors: ["#a78bfa", "#4c1d95"] },
			{ game: "Yu-Gi-Oh", card: "Blue-Eyes White Dragon", person: "Associated: Seto Kaiba", thumbColors: ["#dbeafe", "#2563eb"] }
		]
	},
	1: {
		themeTitle: "Cupid Clash",
		accent: "#fb7185",
		glow: "rgba(251, 113, 133, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Espeon", person: "Associated: Morty", thumbColors: ["#c084fc", "#7e22ce"] },
			{ game: "Yu Yu Hakusho", card: "Botan", person: "Associated: Kurama", thumbColors: ["#f472b6", "#a21caf"] },
			{ game: "Yu-Gi-Oh", card: "Dark Magician Girl", person: "Associated: Yugi Muto", thumbColors: ["#f9a8d4", "#7c3aed"] }
		]
	},
	2: {
		themeTitle: "Emerald Legends",
		accent: "#4ade80",
		glow: "rgba(74, 222, 128, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Sceptile", person: "Associated: Brendan", thumbColors: ["#4ade80", "#166534"] },
			{ game: "Yu Yu Hakusho", card: "Raizen", person: "Associated: Yoko Kurama", thumbColors: ["#22c55e", "#14532d"] },
			{ game: "Yu-Gi-Oh", card: "Noble Knight Artorigus", person: "Associated: Noble Knight Legacy", thumbColors: ["#86efac", "#15803d"] }
		]
	},
	3: {
		themeTitle: "Blossom Breakout",
		accent: "#f9a8d4",
		glow: "rgba(249, 168, 212, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Decidueye", person: "Associated: Hau", thumbColors: ["#84cc16", "#166534"] },
			{ game: "Yu Yu Hakusho", card: "Kurama", person: "Associated: Hiei", thumbColors: ["#fbcfe8", "#be185d"] },
			{ game: "Yu-Gi-Oh", card: "Black Rose Dragon", person: "Associated: Akiza Izinski", thumbColors: ["#f472b6", "#9d174d"] }
		]
	},
	4: {
		themeTitle: "Championship Pulse",
		accent: "#22d3ee",
		glow: "rgba(34, 211, 238, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Tinkaton", person: "Associated: Poppy", thumbColors: ["#f472b6", "#db2777"] },
			{ game: "Yu Yu Hakusho", card: "Mukuro", person: "Associated: Yusuke", thumbColors: ["#a78bfa", "#4c1d95"] },
			{ game: "Yu-Gi-Oh", card: "Stardust Dragon", person: "Associated: Yusei Fudo", thumbColors: ["#93c5fd", "#1e3a8a"] }
		]
	},
	5: {
		themeTitle: "Summer Kickoff",
		accent: "#fbbf24",
		glow: "rgba(251, 191, 36, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Infernape", person: "Associated: Flint", thumbColors: ["#f59e0b", "#b45309"] },
			{ game: "Yu Yu Hakusho", card: "Kuwabara (Jigen To)", person: "Associated: Sensui Arc", thumbColors: ["#f59e0b", "#7c2d12"] },
			{ game: "Yu-Gi-Oh", card: "Frost & Flame Dragon", person: "Associated: Bastion Misawa", thumbColors: ["#38bdf8", "#b91c1c"] }
		]
	},
	6: {
		themeTitle: "Stars and Duelists",
		accent: "#60a5fa",
		glow: "rgba(96, 165, 250, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Braviary", person: "Associated: Skyla", thumbColors: ["#ef4444", "#1d4ed8"] },
			{ game: "Yu Yu Hakusho", card: "Yusuke", person: "Associated: Genkai", thumbColors: ["#e11d48", "#1e40af"] },
			{ game: "Yu-Gi-Oh", card: "Elemental HERO Neos", person: "Associated: Jaden Yuki", thumbColors: ["#f8fafc", "#2563eb"] }
		]
	},
	7: {
		themeTitle: "Summer Rivalry Arc",
		accent: "#ff9f43",
		glow: "rgba(255, 159, 67, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Charizard", person: "Associated: Red", thumbColors: ["#ff8a3d", "#9a3412"] },
			{ game: "Yu Yu Hakusho", card: "Chu", person: "Associated: Yusuke", thumbColors: ["#7c3aed", "#1e293b"] },
			{ game: "Yu-Gi-Oh", card: "Number 39: Utopia", person: "Associated: Yuma Tsukumo", thumbColors: ["#67e8f9", "#155e75"] }
		]
	},
	8: {
		themeTitle: "Back-to-Duel Season",
		accent: "#8be9ff",
		glow: "rgba(77, 224, 255, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Cinderace", person: "Associated: Leon", thumbColors: ["#38bdf8", "#1d4ed8"] },
			{ game: "Yu Yu Hakusho", card: "Kazuma Kuwabara", person: "Associated: Yusuke", thumbColors: ["#f59e0b", "#92400e"] },
			{ game: "Yu-Gi-Oh", card: "U.A. Midfielder", person: "Associated: Tetsu Trudge", thumbColors: ["#22d3ee", "#164e63"] }
		]
	},
	9: {
		themeTitle: "Haunted Spirit Night",
		accent: "#f97316",
		glow: "rgba(249, 115, 22, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Trevenant", person: "Associated: Valerie", thumbColors: ["#22c55e", "#3f6212"] },
			{ game: "Yu Yu Hakusho", card: "Hiei", person: "Associated: Kurama", thumbColors: ["#a855f7", "#3b0764"] },
			{ game: "Yu-Gi-Oh", card: "Pumpking the King of Ghosts", person: "Associated: Bones", thumbColors: ["#fb923c", "#7c2d12"] }
		]
	},
	10: {
		themeTitle: "Harvest Heavy Hitters",
		accent: "#f59e0b",
		glow: "rgba(245, 158, 11, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Appletun", person: "Associated: Milo", thumbColors: ["#84cc16", "#b45309"] },
			{ game: "Yu Yu Hakusho", card: "Gourmet", person: "Associated: Sensui Arc", thumbColors: ["#f97316", "#7c2d12"] },
			{ game: "Yu-Gi-Oh", card: "Odd-Eyes Pendulum Dragon", person: "Associated: Yuya Sakaki", thumbColors: ["#f472b6", "#6d28d9"] }
		]
	},
	11: {
		themeTitle: "Winter Legacy",
		accent: "#a5b4fc",
		glow: "rgba(165, 180, 252, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Articuno", person: "Associated: Noland (Frontier Brain)", thumbColors: ["#bfdbfe", "#3730a3"] },
			{ game: "Yu Yu Hakusho", card: "Yukina", person: "Associated: Botan", thumbColors: ["#93c5fd", "#1d4ed8"] },
			{ game: "Yu-Gi-Oh", card: "Santa Claws", person: "Associated: Winter Promo", thumbColors: ["#ef4444", "#166534"] }
		]
	}
};

// Add overrides here when you want hand-picked changes before future voting/polls.
// Example:
// const seasonalOverrides = {
// 	9: {
// 		spotlight: [
// 			{ game: "Pokemon", card: "Gengar", person: "Associated: Acerola", thumbColors: ["#9333ea", "#4c1d95"] }
// 		]
// 	}
// };
const seasonalOverrides = {};

const YYH_SPOTLIGHT_THUMBNAILS = {
	"yusuke mazoku form": "assets/seasonal/yyh-source/betrayal/013.jpg",
	"botan": "assets/seasonal/yyh-source/dark-tournament/001.jpg",
	"raizen": "assets/seasonal/yyh-source/alliance/001.jpg",
	"kurama": "assets/seasonal/yyh-source/ghost-files/013.jpg",
	"mukuro": "assets/seasonal/yyh-source/exile/018.jpg",
	"kuwabara jigen to": "assets/seasonal/yyh-source/gateway/100.jpg",
	"yusuke": "assets/seasonal/yyh-source/dark-tournament/020.jpg",
	"chu": "assets/seasonal/yyh-source/dark-tournament/012.jpg",
	"kazuma kuwabara": "assets/seasonal/yyh-source/gateway/100.jpg",
	"hiei": "assets/seasonal/yyh-source/dark-tournament/005.jpg",
	"gourmet": "assets/seasonal/yyh-source/exile/014.jpg",
	"yukina": "assets/seasonal/yyh-source/dark-tournament/006.jpg"
};

let spotlightViewerElements = null;

function normalizeForSearch(value) {
	return String(value || "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

function mergeSpotlight(baseSpotlight, overrideSpotlight) {
	if (!Array.isArray(overrideSpotlight) || overrideSpotlight.length === 0) {
		return baseSpotlight;
	}

	const merged = [...baseSpotlight];
	for (const overrideEntry of overrideSpotlight) {
		const index = merged.findIndex((entry) => entry.game === overrideEntry.game);
		if (index >= 0) {
			merged[index] = { ...merged[index], ...overrideEntry };
		} else {
			merged.push(overrideEntry);
		}
	}

	return merged;
}

function resolveTheme(monthIndex) {
	const fallbackTheme = seasonalThemes[7];
	const baseTheme = seasonalThemes[monthIndex] || fallbackTheme;
	const override = seasonalOverrides[monthIndex] || {};
	const baseSpotlight = Array.isArray(baseTheme.spotlight) ? baseTheme.spotlight : [];
	const spotlight = mergeSpotlight(baseSpotlight, override.spotlight);

	return {
		...baseTheme,
		...override,
		spotlight
	};
}

const STATIC_THUMB_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Card placeholder">
  <rect x="2" y="2" width="60" height="60" rx="10" fill="#1f2937" stroke="#475569" stroke-width="2"/>
  <rect x="14" y="16" width="36" height="24" rx="4" fill="#334155"/>
  <rect x="14" y="44" width="24" height="4" rx="2" fill="#64748b"/>
  <rect x="14" y="51" width="30" height="4" rx="2" fill="#64748b"/>
</svg>`)}`;

function makeThumbDataUri() {
	return STATIC_THUMB_PLACEHOLDER;
}

function resolveSpotlightThumb(entry) {
	if (!entry) {
		return STATIC_THUMB_PLACEHOLDER;
	}

	const normalizedGame = normalizeForSearch(entry.game);
	if (normalizedGame !== "yu yu hakusho") {
		return STATIC_THUMB_PLACEHOLDER;
	}

	const normalizedCard = normalizeForSearch(entry.card).replace(/\s+/g, " ");
	return YYH_SPOTLIGHT_THUMBNAILS[normalizedCard] || STATIC_THUMB_PLACEHOLDER;
}

function buildSpotlightCardUrl(entry) {
	const destination = new URL("card-template.html", window.location.href);
	const cardQuery = String(entry?.card || "").trim();
	const gameQuery = String(entry?.game || "").trim();

	if (cardQuery) {
		destination.searchParams.set("q", cardQuery);
	}

	if (gameQuery) {
		destination.searchParams.set("game", gameQuery);
	}

	return destination.toString();
}

function ensureSpotlightViewer() {
	if (spotlightViewerElements) {
		return spotlightViewerElements;
	}

	const overlay = document.createElement("div");
	overlay.className = "spotlight-viewer";
	overlay.hidden = true;
	overlay.setAttribute("aria-hidden", "true");
	overlay.innerHTML = `
		<div class="spotlight-viewer__backdrop" data-role="viewer-close"></div>
		<div class="spotlight-viewer__dialog" role="dialog" aria-modal="true" aria-label="Spotlight card preview">
			<button class="spotlight-viewer__close" type="button" aria-label="Close preview" data-role="viewer-close">Close</button>
			<img class="spotlight-viewer__image" alt="Spotlight card image" />
			<div class="spotlight-viewer__meta">
				<p class="spotlight-viewer__game"></p>
				<h3 class="spotlight-viewer__title"></h3>
				<a class="btn btn--primary spotlight-viewer__link" href="inventory.html">Go to Card Page</a>
			</div>
		</div>
	`;

	document.body.appendChild(overlay);

	const image = overlay.querySelector(".spotlight-viewer__image");
	const game = overlay.querySelector(".spotlight-viewer__game");
	const title = overlay.querySelector(".spotlight-viewer__title");
	const link = overlay.querySelector(".spotlight-viewer__link");

	const close = () => {
		overlay.hidden = true;
		overlay.setAttribute("aria-hidden", "true");
		document.body.classList.remove("spotlight-viewer-open");
	};

	overlay.addEventListener("click", (event) => {
		if (event.target instanceof HTMLElement && event.target.dataset.role === "viewer-close") {
			close();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !overlay.hidden) {
			close();
		}
	});

	spotlightViewerElements = {
		overlay,
		image,
		game,
		title,
		link,
		close
	};

	return spotlightViewerElements;
}

function openSpotlightViewer(entry, imageSrc) {
	const viewer = ensureSpotlightViewer();
	if (!viewer || !viewer.image || !viewer.game || !viewer.title || !viewer.link) {
		return;
	}

	viewer.image.src = imageSrc;
	viewer.image.alt = `${entry.card} card preview`;
	viewer.image.onerror = () => {
		viewer.image.src = STATIC_THUMB_PLACEHOLDER;
	};
	viewer.game.textContent = String(entry.game || "");
	viewer.title.textContent = String(entry.card || "");
	viewer.link.href = buildSpotlightCardUrl(entry);

	viewer.overlay.hidden = false;
	viewer.overlay.setAttribute("aria-hidden", "false");
	document.body.classList.add("spotlight-viewer-open");
}

function getPreviewMonth() {
	const params = new URLSearchParams(window.location.search);
	const previewMonth = params.get("previewMonth");
	if (!previewMonth) {
		return null;
	}

	const asNumber = Number(previewMonth);
	if (!Number.isNaN(asNumber) && asNumber >= 1 && asNumber <= 12) {
		return asNumber - 1;
	}

	const normalized = previewMonth.trim().toLowerCase();
	const monthIndex = monthNames.findIndex((monthName) => monthName.toLowerCase() === normalized);
	return monthIndex >= 0 ? monthIndex : null;
}

function normalizeMonthIndex(monthIndex) {
	if (monthIndex < 0) {
		return 11;
	}
	if (monthIndex > 11) {
		return 0;
	}
	return monthIndex;
}

function renderMonthDots(container) {
	container.innerHTML = "";
	for (let i = 0; i < 12; i += 1) {
		const dot = document.createElement("span");
		dot.className = "hero__season-dot";
		dot.setAttribute("aria-hidden", "true");
		dot.dataset.monthIndex = String(i);
		dot.title = monthNames[i];
		container.appendChild(dot);
	}
}

function setActiveMonthDot(container, monthIndex) {
	const dots = container.querySelectorAll(".hero__season-dot");
	dots.forEach((dot, index) => {
		dot.classList.toggle("is-active", index === monthIndex);
	});
}

function renderSpotlightItems(listElement, spotlight) {
	listElement.innerHTML = "";

	for (const entry of spotlight) {
		const item = document.createElement("li");
		item.className = "hero__season-item";

		const textWrap = document.createElement("div");
		textWrap.className = "hero__season-text";

		const game = document.createElement("span");
		game.textContent = entry.game;

		const card = document.createElement("strong");
		card.textContent = entry.card;

		const person = document.createElement("em");
		person.textContent = entry.person;

		textWrap.append(game, card, person);

		const thumb = document.createElement("img");
		thumb.className = "hero__season-thumb";
		thumb.src = resolveSpotlightThumb(entry);
		thumb.alt = `${entry.card} thumbnail`;
		thumb.addEventListener("error", () => {
			thumb.src = STATIC_THUMB_PLACEHOLDER;
		}, { once: true });

		const thumbButton = document.createElement("button");
		thumbButton.className = "hero__season-thumb-btn";
		thumbButton.type = "button";
		thumbButton.setAttribute("aria-label", `Preview ${entry.card}`);
		thumbButton.appendChild(thumb);
		thumbButton.addEventListener("click", () => {
			openSpotlightViewer(entry, thumb.currentSrc || thumb.src || STATIC_THUMB_PLACEHOLDER);
		});

		item.append(textWrap, thumbButton);
		listElement.appendChild(item);
	}
}

function applySeasonTheme() {
	const seasonSpotlight = document.getElementById("seasonSpotlight");
	const spotlightList = document.getElementById("seasonSpotlightList");
	const prevPeek = document.getElementById("seasonPrevPeek");
	const nextPeek = document.getElementById("seasonNextPeek");
	const prevMonth = document.getElementById("seasonPrevMonthLabel");
	const nextMonth = document.getElementById("seasonNextMonthLabel");
	const prevTitle = document.getElementById("seasonPrevTitle");
	const nextTitle = document.getElementById("seasonNextTitle");
	const prevList = document.getElementById("seasonPrevList");
	const nextList = document.getElementById("seasonNextList");
	const prevBtn = document.getElementById("seasonPrevBtn");
	const nextBtn = document.getElementById("seasonNextBtn");
	const monthDots = document.getElementById("seasonMonthDots");
	if (!seasonSpotlight) {
		return;
	}
	if (!spotlightList || !prevPeek || !nextPeek || !prevMonth || !nextMonth || !prevTitle || !nextTitle || !prevList || !nextList || !prevBtn || !nextBtn || !monthDots) {
		return;
	}

	renderMonthDots(monthDots);

	const previewMonth = getPreviewMonth();
	const currentMonth = new Date().getMonth();
	let activeMonth = previewMonth ?? currentMonth;

	const monthLabel = document.getElementById("seasonMonthLabel");
	const themeTitle = document.getElementById("seasonThemeTitle");

	function renderMonth(monthIndex) {
		activeMonth = normalizeMonthIndex(monthIndex);
		const activeTheme = resolveTheme(activeMonth);
		const previousMonthIndex = normalizeMonthIndex(activeMonth - 1);
		const nextMonthIndex = normalizeMonthIndex(activeMonth + 1);
		const previousTheme = resolveTheme(previousMonthIndex);
		const nextTheme = resolveTheme(nextMonthIndex);

		monthLabel.textContent = `${monthNames[activeMonth]} Seasonal Spotlight`;
		themeTitle.textContent = activeTheme.themeTitle;
		setActiveMonthDot(monthDots, activeMonth);
		renderSpotlightItems(spotlightList, activeTheme.spotlight || []);

		prevMonth.textContent = `${monthNames[previousMonthIndex]} Spotlight`;
		nextMonth.textContent = `${monthNames[nextMonthIndex]} Spotlight`;
		prevTitle.textContent = previousTheme.themeTitle;
		nextTitle.textContent = nextTheme.themeTitle;
		renderSpotlightItems(prevList, previousTheme.spotlight || []);
		renderSpotlightItems(nextList, nextTheme.spotlight || []);
		prevPeek.dataset.targetMonth = String(previousMonthIndex);
		nextPeek.dataset.targetMonth = String(nextMonthIndex);
		prevBtn.dataset.targetMonth = String(previousMonthIndex);
		nextBtn.dataset.targetMonth = String(nextMonthIndex);
		prevBtn.setAttribute("aria-label", `View last month: ${monthNames[previousMonthIndex]}`);
		nextBtn.setAttribute("aria-label", `View next month: ${monthNames[nextMonthIndex]}`);

		seasonSpotlight.style.setProperty("--season-accent", activeTheme.accent);
		seasonSpotlight.style.setProperty("--season-glow", activeTheme.glow);
		seasonSpotlight.style.setProperty("--season-prev-glow", previousTheme.glow);
		seasonSpotlight.style.setProperty("--season-next-glow", nextTheme.glow);
	}

	prevBtn.addEventListener("click", () => {
		const target = Number(prevBtn.dataset.targetMonth);
		renderMonth(target);
	});

	nextBtn.addEventListener("click", () => {
		const target = Number(nextBtn.dataset.targetMonth);
		renderMonth(target);
	});

	renderMonth(activeMonth);
}

function initGameLanesReveal() {
	const hero = document.querySelector(".hero");
	const gameLanes = document.querySelector(".game-lanes");
	if (!hero || !gameLanes) {
		return;
	}

	const laneItems = gameLanes.querySelectorAll(".game-lane");
	laneItems.forEach((lane, index) => {
		lane.style.setProperty("--lane-index", String(index));
	});

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) {
		gameLanes.classList.add("is-visible");
		return;
	}

	let revealed = false;
	const revealWhenHalfwayDownHero = () => {
		if (revealed) {
			return;
		}

		const heroTop = hero.offsetTop;
		const heroMidpoint = heroTop + (hero.offsetHeight / 2);
		const heroRect = hero.getBoundingClientRect();
		const heroMidpointInViewport = heroRect.top + (heroRect.height / 2);
		const reachedByScroll = window.scrollY >= heroMidpoint;
		const reachedInViewport = window.innerHeight >= heroMidpointInViewport;
		const shouldReveal = reachedByScroll || reachedInViewport;

		if (shouldReveal) {
			revealed = true;
			gameLanes.classList.add("is-visible");
			window.removeEventListener("scroll", revealWhenHalfwayDownHero);
			window.removeEventListener("resize", revealWhenHalfwayDownHero);
		}
	};

	window.addEventListener("scroll", revealWhenHalfwayDownHero, { passive: true });
	window.addEventListener("resize", revealWhenHalfwayDownHero);
	revealWhenHalfwayDownHero();
}

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

	const mobileNavQuery = window.matchMedia("(max-width: 560px)");
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

function initHomeSearch() {
	const searchForm = document.querySelector(".hero__search");
	const searchInput = document.querySelector(".hero__search-input");
	if (!searchForm || !searchInput) {
		return;
	}

	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const query = String(searchInput.value || "").trim();
		const destination = new URL("inventory.html", window.location.href);

		if (query) {
			destination.searchParams.set("q", query);
			destination.searchParams.set("game", "Yu Yu Hakusho");
		}

		window.location.href = destination.toString();
	});
}

applySeasonTheme();
initGameLanesReveal();
initMobileNav();
initHomeSearch();
