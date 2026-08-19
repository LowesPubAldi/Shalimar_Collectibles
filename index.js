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
			{ game: "Pokemon", card: "Steel Beam", person: "Technique: Metal Surge", thumbColors: ["#9ca3af", "#374151"] },
			{ game: "Yu Yu Hakusho", card: "Yusuke (Mazoku Form)", person: "Associated: Raizen", thumbColors: ["#a78bfa", "#4c1d95"] },
			{ game: "Yu Yu Hakusho", card: "Spirit Wave", person: "Technique: Power Release", thumbColors: ["#c4b5fd", "#7c3aed"] },
			{ game: "Yu-Gi-Oh", card: "Blue-Eyes White Dragon", person: "Associated: Seto Kaiba", thumbColors: ["#dbeafe", "#2563eb"] },
			{ game: "Yu-Gi-Oh", card: "Blue-Eyes Shining Dragon", person: "Technique: Evolution", thumbColors: ["#bfdbfe", "#1e40af"] }
		]
	},
	1: {
		themeTitle: "Cupid Clash",
		accent: "#fb7185",
		glow: "rgba(251, 113, 133, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Espeon", person: "Associated: Morty", thumbColors: ["#c084fc", "#7e22ce"] },
			{ game: "Pokemon", card: "Psychic", person: "Technique: Mind Power", thumbColors: ["#d8b4fe", "#a855f7"] },
			{ game: "Yu Yu Hakusho", card: "Botan", person: "Associated: Kurama", thumbColors: ["#f472b6", "#a21caf"] },
			{ game: "Yu Yu Hakusho", card: "Rose Whip", person: "Item: Demon Weapon", thumbColors: ["#fbcfe8", "#be185d"] },
			{ game: "Yu-Gi-Oh", card: "Dark Magician Girl", person: "Associated: Yugi Muto", thumbColors: ["#f9a8d4", "#7c3aed"] },
			{ game: "Yu-Gi-Oh", card: "Dark Burning Attack", person: "Technique: Spell Combo", thumbColors: ["#f472b6", "#9d174d"] }
		]
	},
	2: {
		themeTitle: "Emerald Legends",
		accent: "#4ade80",
		glow: "rgba(74, 222, 128, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Sceptile", person: "Associated: Brendan", thumbColors: ["#4ade80", "#166534"] },
			{ game: "Pokemon", card: "Leaf Blade", person: "Technique: Grass Strike", thumbColors: ["#86efac", "#22c55e"] },
			{ game: "Yu Yu Hakusho", card: "Raizen", person: "Associated: Yoko Kurama", thumbColors: ["#22c55e", "#14532d"] },
			{ game: "Yu Yu Hakusho", card: "Team Raizen's Support", person: "Team Bonus: Leader Ascension", thumbColors: ["#4ade80", "#166534"] },
			{ game: "Yu-Gi-Oh", card: "Noble Knight Artorigus", person: "Associated: Noble Knight Legacy", thumbColors: ["#86efac", "#15803d"] },
			{ game: "Yu-Gi-Oh", card: "Merlin", person: "Item: Noble Knight Support", thumbColors: ["#bbf7d0", "#047857"] }
		]
	},
	3: {
		themeTitle: "Blossom Breakout",
		accent: "#f9a8d4",
		glow: "rgba(249, 168, 212, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Decidueye", person: "Associated: Hau", thumbColors: ["#84cc16", "#166534"] },
			{ game: "Pokemon", card: "Spirit Shackle", person: "Technique: Ghost Lock", thumbColors: ["#a78bfa", "#6b21a8"] },
			{ game: "Yu Yu Hakusho", card: "Kurama", person: "Associated: Shuichi", thumbColors: ["#fbcfe8", "#be185d"] },
			{ game: "Yu Yu Hakusho", card: "Rose Whip", person: "Item: Demon Weapon", thumbColors: ["#f472b6", "#ec4899"] },
			{ game: "Yu-Gi-Oh", card: "Black Rose Dragon", person: "Associated: Akiza Izinski", thumbColors: ["#f472b6", "#9d174d"] },
			{ game: "Yu-Gi-Oh", card: "Black Rose Witch", person: "Technique: Rose Combination", thumbColors: ["#f9a8d4", "#be185d"] }
		]
	},
	4: {
		themeTitle: "Championship Pulse",
		accent: "#22d3ee",
		glow: "rgba(34, 211, 238, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Tinkaton", person: "Associated: Poppy", thumbColors: ["#f472b6", "#db2777"] },
			{ game: "Pokemon", card: "Hammer Arm", person: "Technique: Steel Smash", thumbColors: ["#e879f9", "#d946ef"] },
			{ game: "Yu Yu Hakusho", card: "Mukuro", person: "Associated: Yusuke", thumbColors: ["#a78bfa", "#4c1d95"] },
			{ game: "Yu Yu Hakusho", card: "Demon Beast Aura", person: "Technique: Dark Power", thumbColors: ["#c4b5fd", "#6b21a8"] },
			{ game: "Yu-Gi-Oh", card: "Stardust Dragon", person: "Associated: Yusei Fudo", thumbColors: ["#93c5fd", "#1e3a8a"] },
			{ game: "Yu-Gi-Oh", card: "Synchro Boost", person: "Technique: Accel Synchro", thumbColors: ["#bfdbfe", "#1e40af"] }
		]
	},
	5: {
		themeTitle: "Summer Kickoff",
		accent: "#fbbf24",
		glow: "rgba(251, 191, 36, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Infernape", person: "Associated: Flint", thumbColors: ["#f59e0b", "#b45309"] },
			{ game: "Pokemon", card: "Close Combat", person: "Technique: Fire Fury", thumbColors: ["#fbbf24", "#d97706"] },
			{ game: "Yu Yu Hakusho", card: "Kuwabara (Jigen To)", person: "Associated: Sensui Arc", thumbColors: ["#f59e0b", "#7c2d12"] },
			{ game: "Yu Yu Hakusho", card: "Sword Mastery", person: "Technique: Blade Training", thumbColors: ["#fcd34d", "#b45309"] },
			{ game: "Yu-Gi-Oh", card: "Frost & Flame Dragon", person: "Associated: Bastion Misawa", thumbColors: ["#38bdf8", "#b91c1c"] },
			{ game: "Yu-Gi-Oh", card: "Elemental Fusion", person: "Technique: Dual Power", thumbColors: ["#7dd3fc", "#7c2d12"] }
		]
	},
	6: {
		themeTitle: "Stars and Duelists",
		accent: "#60a5fa",
		glow: "rgba(96, 165, 250, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Braviary", person: "Associated: Skyla", thumbColors: ["#ef4444", "#1d4ed8"] },
			{ game: "Pokemon", card: "Aerial Ace", person: "Technique: Speed Dive", thumbColors: ["#3b82f6", "#0c4a6e"] },
			{ game: "Yu Yu Hakusho", card: "Yusuke", person: "Associated: Genkai", thumbColors: ["#e11d48", "#1e40af"] },
			{ game: "Yu Yu Hakusho", card: "Spirit Gun Focus", person: "Technique: Signature Attack", thumbColors: ["#dc2626", "#7f1d1d"] },
			{ game: "Yu-Gi-Oh", card: "Elemental HERO Neos", person: "Associated: Jaden Yuki", thumbColors: ["#f8fafc", "#2563eb"] },
			{ game: "Yu-Gi-Oh", card: "Polymerization", person: "Technique: Fusion Summon", thumbColors: ["#8b5cf6", "#4c1d95"] }
		]
	},
	7: {
		themeTitle: "Summer Rivalry Arc",
		accent: "#ff9f43",
		glow: "rgba(255, 159, 67, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Charizard", person: "Associated: Red", thumbColors: ["#ff8a3d", "#9a3412"] },
			{ game: "Pokemon", card: "Fire Spin", person: "Technique: Inferno Attack", thumbColors: ["#f59e0b", "#dc2626"] },
			{ game: "Yu Yu Hakusho", card: "Chu Drunken Master", person: "Associated: Yusuke", thumbColors: ["#7c3aed", "#1e293b"] },
			{ game: "Yu Yu Hakusho", card: "Ogre Killer", person: "Item: Combat Weapon", thumbColors: ["#a78bfa", "#7c3aed"] },
			{ game: "Yu-Gi-Oh", card: "Number 39: Utopia", person: "Associated: Yuma Tsukumo", thumbColors: ["#67e8f9", "#155e75"] },
			{ game: "Yu-Gi-Oh", card: "Utopia Rising", person: "Technique: Rank-Up Magic", thumbColors: ["#06b6d4", "#0369a1"] }
		]
	},
	8: {
		themeTitle: "Back-to-Duel Season",
		accent: "#8be9ff",
		glow: "rgba(77, 224, 255, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Cinderace", person: "Associated: Leon", thumbColors: ["#38bdf8", "#1d4ed8"] },
			{ game: "Pokemon", card: "Pyro Ball", person: "Technique: Flame Kick", thumbColors: ["#7dd3fc", "#b91c1c"] },
			{ game: "Yu Yu Hakusho", card: "Kazuma Kuwabara", person: "Associated: Yusuke", thumbColors: ["#f59e0b", "#92400e"] },
			{ game: "Yu Yu Hakusho", card: "Dimensional Sword", person: "Item: Spirit Weapon", thumbColors: ["#fbbf24", "#b45309"] },
			{ game: "Yu-Gi-Oh", card: "U.A. Midfielder", person: "Associated: Tetsu Trudge", thumbColors: ["#22d3ee", "#164e63"] },
			{ game: "Yu-Gi-Oh", card: "U.A. Encore", person: "Technique: Sports Play", thumbColors: ["#06b6d4", "#0f766e"] }
		]
	},
	9: {
		themeTitle: "Haunted Spirit Night",
		accent: "#f97316",
		glow: "rgba(249, 115, 22, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Trevenant", person: "Associated: Valerie", thumbColors: ["#22c55e", "#3f6212"] },
			{ game: "Pokemon", card: "Wood Hammer", person: "Technique: Forest Fury", thumbColors: ["#86efac", "#14532d"] },
			{ game: "Yu Yu Hakusho", card: "Hiei", person: "Associated: Kurama", thumbColors: ["#a855f7", "#3b0764"] },
			{ game: "Yu Yu Hakusho", card: "Demon Flame", person: "Technique: Fire Mastery", thumbColors: ["#d8b4fe", "#6b21a8"] },
			{ game: "Yu-Gi-Oh", card: "Pumpking the King of Ghosts", person: "Associated: Bones", thumbColors: ["#fb923c", "#7c2d12"] },
			{ game: "Yu-Gi-Oh", card: "Ghostrick Mansion", person: "Item: Haunted Field", thumbColors: ["#fed7aa", "#92400e"] }
		]
	},
	10: {
		themeTitle: "Harvest Heavy Hitters",
		accent: "#f59e0b",
		glow: "rgba(245, 158, 11, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Appletun", person: "Associated: Milo", thumbColors: ["#84cc16", "#b45309"] },
			{ game: "Pokemon", card: "Sunny Day", person: "Technique: Harvest Season", thumbColors: ["#bfef45", "#854d0e"] },
			{ game: "Yu Yu Hakusho", card: "Elder Toguro, The Indestructible", person: "Associated: Tournament Champion", thumbColors: ["#f97316", "#7c2d12"] },
			{ game: "Yu Yu Hakusho", card: "Team Toguro's Surprise", person: "Team Bonus: Power Surge", thumbColors: ["#f59e0b", "#b45309"] },
			{ game: "Yu-Gi-Oh", card: "Odd-Eyes Pendulum Dragon", person: "Associated: Yuya Sakaki", thumbColors: ["#f472b6", "#6d28d9"] },
			{ game: "Yu-Gi-Oh", card: "Pendulum Call", person: "Technique: Pendulum Setup", thumbColors: ["#f0abfc", "#7e22ce"] }
		]
	},
	11: {
		themeTitle: "Winter Legacy",
		accent: "#a5b4fc",
		glow: "rgba(165, 180, 252, 0.35)",
		spotlight: [
			{ game: "Pokemon", card: "Articuno", person: "Associated: Noland (Frontier Brain)", thumbColors: ["#bfdbfe", "#3730a3"] },
			{ game: "Pokemon", card: "Ice Beam", person: "Technique: Frozen Strike", thumbColors: ["#dbeafe", "#1e40af"] },
			{ game: "Yu Yu Hakusho", card: "Yukina", person: "Associated: Botan", thumbColors: ["#93c5fd", "#1d4ed8"] },
			{ game: "Yu Yu Hakusho", card: "Ice Crystal", person: "Item: Healing Source", thumbColors: ["#bfdbfe", "#0c4a6e"] },
			{ game: "Yu-Gi-Oh", card: "Santa Claws", person: "Associated: Winter Promo", thumbColors: ["#ef4444", "#166534"] },
			{ game: "Yu-Gi-Oh", card: "Yuletide Blessing", person: "Technique: Holiday Magic", thumbColors: ["#22c55e", "#7c2d12"] }
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
	"botan": "assets/seasonal/yyh-source/dark-tournament/023.jpg",
	"raizen": "assets/seasonal/yyh-source/alliance/001.jpg",
	"kurama": "assets/seasonal/yyh-source/ghost-files/041.jpg",
	"mukuro": "assets/seasonal/yyh-source/exile/018.jpg",
	"kuwabara jigen to": "assets/seasonal/yyh-source/exile/099.jpg",
	"yusuke": "assets/seasonal/yyh-source/dark-tournament/020.jpg",
	"chu": "assets/seasonal/yyh-source/dark-tournament/012.jpg",
	"chu drunken master": "assets/seasonal/yyh-source/dark-tournament/012.jpg",
	"kazuma kuwabara": "assets/seasonal/yyh-source/gateway/098C.jpg",
	"consumer": "assets/seasonal/yyh-source/gateway/100.jpg",
	"hiei": "assets/seasonal/yyh-source/dark-tournament/005.jpg",
	"gourmet": "assets/seasonal/yyh-source/gateway/117.jpg",
	"elder toguro the indestructible": "assets/seasonal/yyh-source/gateway/112.jpg",
	"yukina": "assets/seasonal/yyh-source/dark-tournament/006.jpg",
	"ogre killer": "assets/seasonal/yyh-source/ghost-files/141.jpg",
	"rose whip": "assets/seasonal/yyh-source/ghost-files/134.jpg",
	"spirit gun focus": "assets/seasonal/yyh-source/ghost-files/155.jpg",
	"spirit wave": "assets/seasonal/yyh-source/ghost-files/163.jpg",
	"sword mastery": "assets/seasonal/yyh-source/gateway/121.jpg",
	"dimensional sword": "assets/seasonal/yyh-source/dark-tournament/115.jpg",
	"demon flame": "assets/seasonal/yyh-source/exile/089.jpg",
	"muscle evolution": "assets/seasonal/yyh-source/gateway/120.jpg",
	"ice crystal": "assets/seasonal/yyh-source/exile/017.jpg",
	"spirit energy surge": "assets/seasonal/yyh-source/exile/152.jpg",
	"youko transformation": "assets/seasonal/yyh-source/betrayal/056.jpg",
	"demon beast aura": "assets/seasonal/yyh-source/exile/145.jpg",
	"steel beam": "assets/seasonal/yyh-source/alliance/178.jpg",
	"team raizen support": "assets/seasonal/yyh-source/exile/057.jpg",
	"team raizen s support": "assets/seasonal/yyh-source/exile/057.jpg",
	"team raizens support": "assets/seasonal/yyh-source/exile/057.jpg",
	"team toguro surprise": "assets/seasonal/yyh-source/exile/060.jpg",
	"team toguro s surprise": "assets/seasonal/yyh-source/exile/060.jpg",
	"team toguros surprise": "assets/seasonal/yyh-source/exile/060.jpg"
};

const SPOTLIGHT_DISPLAY_NAME_OVERRIDES = {
	"yu yu hakusho::chu": "Chu Drunken Master"
};

const YGO_SPOTLIGHT_NAME_ALIASES = {
	"frost flame dragon": ["Frost and Flame Dragon"]
};

const YGO_SPOTLIGHT_RIVAL_MATCHUPS = {
	"yu gi oh::blue eyes white dragon": {
		card: "Dark Magician",
		person: "Associated: Yugi Muto"
	},
	"yu gi oh::dark magician girl": {
		card: "Gellenduo",
		person: "Associated: Fairy Counterplay"
	},
	"yu gi oh::noble knight artorigus": {
		card: "Naturia Beast",
		person: "Associated: Anti-Spell Pressure"
	},
	"yu gi oh::black rose dragon": {
		card: "Ash Blossom & Joyous Spring",
		person: "Associated: Hand Trap Presence"
	},
	"yu gi oh::stardust dragon": {
		card: "Red Dragon Archfiend",
		person: "Associated: Jack Atlas"
	},
	"yu gi oh::frost flame dragon": {
		card: "Cyber Dragon",
		person: "Associated: Zane Truesdale"
	},
	"yu gi oh::elemental hero neos": {
		card: "Elemental HERO Stratos",
		person: "Associated: Jaden Yuki"
	},
	"yu gi oh::number 39 utopia": {
		card: "Galaxy-Eyes Photon Dragon",
		person: "Associated: Kite Tenjo"
	},
	"yu gi oh::u a midfielder": {
		card: "U.A. Perfect Ace",
		person: "Associated: Tetsu Trudge"
	},
	"yu gi oh::pumpking the king of ghosts": {
		card: "Evilswarm Ophion",
		person: "Associated: Lockdown Pressure"
	},
	"yu gi oh::odd eyes pendulum dragon": {
		card: "Token Thanksgiving",
		person: "Associated: Side Deck Chaos"
	},
	"yu gi oh::santa claws": {
		card: "Ghost Reaper & Winter Cherries",
		person: "Associated: Winter Endgame"
	}
};

const YGO_ACTIVE_PANEL_THIRD_SPOTLIGHTS = {
	0: {
		card: "Red-Eyes Black Dragon",
		person: "Associated: Joey Wheeler"
	},
	5: {
		card: "Red-Eyes Darkness Dragon",
		person: "Associated: Atticus Rhodes"
	},
	6: {
		card: "Destiny HERO - Plasma",
		person: "Associated: Aster Phoenix"
	},
	9: {
		card: "Ghostrick Lantern",
		person: "Associated: Halloween Spirit"
	}
};

let spotlightViewerElements = null;
const ygoSpotlightThumbCache = new Map();
const HOME_SEARCH_FALLBACK_DATA_URLS = [
	"data/yyh-cards-full.json",
	"data/yyh-cards.json",
	"data/yyh-cards-slice.json"
];
let homeSearchFallbackDataPromise = null;
const HOME_GAME_MODE_STORAGE_KEY = "home_game_mode";
const HOME_GAME_MODES = {
	yyh: {
		key: "yyh",
		name: "Yu Yu Hakusho",
		searchGame: "Yu Yu Hakusho",
		featureLabel: "Kings",
		featureHref: "kings.html",
		heroDescription: "Search Yu Yu Hakusho cards from one growing card platform.",
		spotlightGame: "Yu Yu Hakusho"
	},
	ygo: {
		key: "ygo",
		name: "Yu-Gi-Oh",
		searchGame: "Yu-Gi-Oh",
		featureLabel: "Win Cons",
		featureHref: "kings.html?game=Yu-Gi-Oh&mode=wincons",
		heroDescription: "Search Yu-Gi-Oh cards from one growing card platform.",
		spotlightGame: "Yu-Gi-Oh"
	},
	pokemon: {
		key: "pokemon",
		name: "Pokemon",
		searchGame: "Pokemon",
		featureLabel: "Starters",
		featureHref: "kings.html?game=Pokemon&mode=starters",
		heroDescription: "Search Pokemon cards from one growing card platform.",
		spotlightGame: "Pokemon"
	}
};
let activeHomeGameMode = null;
let rerenderSeasonTheme = null;
let laneSwapAnimationTimer = null;

function normalizeForSearch(value) {
	return String(value || "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

function getHomeGameModeConfig(modeKey) {
	return HOME_GAME_MODES[modeKey] || null;
}

function getSavedHomeGameMode() {
	try {
		const raw = localStorage.getItem(HOME_GAME_MODE_STORAGE_KEY) || "";
		return getHomeGameModeConfig(raw) ? raw : "";
	} catch {
		return "";
	}
}

function setSavedHomeGameMode(modeKey) {
	try {
		localStorage.setItem(HOME_GAME_MODE_STORAGE_KEY, modeKey);
	} catch {
		// Ignore storage errors to keep home usable in restricted contexts.
	}
}

function buildGameScopedUrl(path, gameName) {
	const destination = new URL(path, window.location.href);
	if (gameName) {
		destination.searchParams.set("game", gameName);
	}

	return `${destination.pathname}${destination.search}${destination.hash}`;
}

function updateNavLinkSet(container, modeConfig) {
	if (!(container instanceof HTMLElement) || !modeConfig) {
		return;
	}

	const links = Array.from(container.querySelectorAll("a"));
	if (links.length < 4) {
		return;
	}

	const inventoryLink = links[1] || null;
	const setsLink = links[2] || null;
	const featureLink = links[3] || null;

	if (inventoryLink) {
		inventoryLink.href = buildGameScopedUrl("inventory.html", modeConfig.searchGame);
	}

	if (setsLink) {
		setsLink.href = buildGameScopedUrl("sets.html", modeConfig.searchGame);
	}

	if (featureLink) {
		featureLink.textContent = modeConfig.featureLabel;
		featureLink.href = modeConfig.featureHref;
	}
}

function syncGameModeSwitchVisibility() {
	const modeSelect = document.getElementById("homeGameModeSelect");
	if (!(modeSelect instanceof HTMLSelectElement)) {
		return;
	}

	const hasSelectedMode = Boolean(getHomeGameModeConfig(activeHomeGameMode || ""));
	modeSelect.hidden = !hasSelectedMode;
	modeSelect.value = hasSelectedMode ? activeHomeGameMode : "yyh";
}

function updateHomeGameModeBadge(modeConfig) {
	const modeSelect = document.getElementById("homeGameModeSelect");
	if (!(modeSelect instanceof HTMLSelectElement)) {
		return;
	}

	modeSelect.value = modeConfig ? modeConfig.key : "yyh";
}

function animateActiveGameLane(modeKey) {
	const lane = document.querySelector(`.game-lane[data-game-mode="${modeKey}"]`);
	if (!(lane instanceof HTMLElement)) {
		return;
	}

	if (laneSwapAnimationTimer) {
		clearTimeout(laneSwapAnimationTimer);
		laneSwapAnimationTimer = null;
	}

	lane.classList.remove("is-mode-active");
	void lane.offsetWidth;
	lane.classList.add("is-mode-active");
	laneSwapAnimationTimer = setTimeout(() => {
		lane.classList.remove("is-mode-active");
		laneSwapAnimationTimer = null;
	}, 420);
}

function applyHomeGameModeUi(modeKey, options = {}) {
	const modeConfig = getHomeGameModeConfig(modeKey);
	if (!modeConfig) {
		return;
	}

	activeHomeGameMode = modeConfig.key;
	if (options.persist !== false) {
		setSavedHomeGameMode(modeConfig.key);
	}

	const heroDescription = document.querySelector(".hero__content > p");
	if (heroDescription instanceof HTMLElement) {
		heroDescription.textContent = modeConfig.heroDescription;
	}

	const heroInventoryButton = document.querySelector('.hero__actions a[href*="inventory.html"]');
	if (heroInventoryButton instanceof HTMLAnchorElement) {
		heroInventoryButton.href = buildGameScopedUrl("inventory.html", modeConfig.searchGame);
	}

	const heroSetsButton = document.querySelector('.hero__actions a[href*="sets.html"]');
	if (heroSetsButton instanceof HTMLAnchorElement) {
		heroSetsButton.href = buildGameScopedUrl("sets.html", modeConfig.searchGame);
	}

	updateNavLinkSet(document.getElementById("primaryNavLinks"), modeConfig);
	updateNavLinkSet(document.querySelector(".site-footer__nav"), modeConfig);

	const gameLanes = document.querySelector(".game-lanes");
	const laneCards = document.querySelectorAll(".game-lane[data-game-mode]");
	laneCards.forEach((laneCard) => {
		const laneMode = laneCard.getAttribute("data-game-mode") || "";
		laneCard.classList.toggle("is-game-mode-hidden", laneMode !== modeConfig.key);
	});

	if (gameLanes) {
		gameLanes.classList.add("game-lanes--single");
	}

	if (typeof rerenderSeasonTheme === "function") {
		rerenderSeasonTheme();
	}

	updateHomeGameModeBadge(modeConfig);
	syncGameModeSwitchVisibility();
	animateActiveGameLane(modeConfig.key);
}

function getActiveSearchGameName() {
	const modeConfig = getHomeGameModeConfig(activeHomeGameMode || "");
	return modeConfig ? modeConfig.searchGame : "";
}

function filterSpotlightByActiveMode(spotlightEntries) {
	if (!Array.isArray(spotlightEntries) || spotlightEntries.length === 0) {
		return [];
	}

	const modeConfig = getHomeGameModeConfig(activeHomeGameMode || "");
	if (!modeConfig) {
		return spotlightEntries;
	}

	const targetGame = normalizeForSearch(modeConfig.spotlightGame);
	return spotlightEntries.filter((entry) => normalizeForSearch(entry?.game) === targetGame);
}

function expandSpotlightWithRival(spotlightEntries) {
	if (!Array.isArray(spotlightEntries) || spotlightEntries.length === 0) {
		return [];
	}

	const [primaryEntry] = spotlightEntries;
	if (!primaryEntry) {
		return [];
	}

	// For non-Yu-Gi-Oh games, return all entries as-is (includes companion cards)
	if (normalizeForSearch(primaryEntry.game) !== "yu gi oh") {
		return spotlightEntries;
	}

	const normalizedKey = makeSpotlightCardKey(primaryEntry).replace(/::/g, "::").replace(/\s+/g, " ");
	const rivalConfig = YGO_SPOTLIGHT_RIVAL_MATCHUPS[normalizedKey] || null;
	if (!rivalConfig) {
		return spotlightEntries;
	}

	const rivalEntry = {
		...primaryEntry,
		card: rivalConfig.card,
		person: rivalConfig.person
	};

	const seen = new Set();
	const result = [];
	for (const entry of [primaryEntry, rivalEntry]) {
		const entryKey = makeSpotlightCardKey(entry);
		if (seen.has(entryKey)) {
			continue;
		}
		seen.add(entryKey);
		result.push(entry);
	}

	return result;
}

function expandActivePanelSpotlightEntries(spotlightEntries, monthIndex, isActivePanel = false) {
	const baseEntries = expandSpotlightWithRival(spotlightEntries);
	if (!isActivePanel) {
		return baseEntries;
	}

	const thirdSpotlightConfig = YGO_ACTIVE_PANEL_THIRD_SPOTLIGHTS[monthIndex];
	if (!thirdSpotlightConfig || baseEntries.length === 0) {
		return baseEntries;
	}

	const firstEntry = baseEntries[0];
	if (!firstEntry || normalizeForSearch(firstEntry.game) !== "yu gi oh") {
		return baseEntries;
	}

	const thirdEntry = {
		...firstEntry,
		card: thirdSpotlightConfig.card,
		person: thirdSpotlightConfig.person
	};
	const thirdKey = makeSpotlightCardKey(thirdEntry);
	if (baseEntries.some((entry) => makeSpotlightCardKey(entry) === thirdKey)) {
		return baseEntries;
	}

	return [...baseEntries, thirdEntry];
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

function normalizeHomeSearchCard(rawCard) {
	return {
		name: resolveFirstNonEmpty(rawCard?.name, rawCard?.cardName, rawCard?.title),
		set: resolveFirstNonEmpty(rawCard?.set, rawCard?.setName),
		game: resolveFirstNonEmpty(rawCard?.game, rawCard?.gameName) || "Yu Yu Hakusho",
		cardNumber: resolveFirstNonEmpty(
			rawCard?.cardNumber,
			rawCard?.number,
			rawCard?.card_number,
			rawCard?.id,
			rawCard?.cardId,
			rawCard?.code
		)
	};
}

async function loadHomeSearchFallbackData() {
	if (!homeSearchFallbackDataPromise) {
		homeSearchFallbackDataPromise = (async () => {
			for (const sourceUrl of HOME_SEARCH_FALLBACK_DATA_URLS) {
				try {
					const response = await fetch(sourceUrl, { cache: "no-store" });
					if (!response.ok) {
						continue;
					}

					const payload = await response.json();
					if (!Array.isArray(payload)) {
						continue;
					}

					return payload.map(normalizeHomeSearchCard);
				} catch {
					// Keep trying fallback files until one succeeds.
				}
			}

			throw new Error("No fallback data file found for home search.");
		})();
	}

	try {
		return await homeSearchFallbackDataPromise;
	} catch (error) {
		homeSearchFallbackDataPromise = null;
		throw error;
	}
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

function makeSpotlightCardKey(entry) {
	return `${normalizeForSearch(entry?.game)}::${normalizeForSearch(entry?.card)}`;
}

async function fetchYugiohSpotlightThumb(entry) {
	const normalizedGame = normalizeForSearch(entry?.game);
	if (normalizedGame !== "yu gi oh") {
		return null;
	}

	const cardName = String(entry?.card || "").trim();
	if (!cardName) {
		return null;
	}

	const cacheKey = makeSpotlightCardKey(entry);
	if (ygoSpotlightThumbCache.has(cacheKey)) {
		return ygoSpotlightThumbCache.get(cacheKey);
	}

	const tryFetchThumbByParams = async (queryKey, queryValue) => {
		const endpoint = new URL("https://db.ygoprodeck.com/api/v7/cardinfo.php");
		endpoint.searchParams.set(queryKey, queryValue);
		endpoint.searchParams.set("num", "1");
		endpoint.searchParams.set("offset", "0");

		const response = await fetch(endpoint.toString(), { cache: "no-store" });
		if (!response.ok) {
			return null;
		}

		const payload = await response.json();
		const firstCard = Array.isArray(payload?.data) ? payload.data[0] : null;
		const firstImage = Array.isArray(firstCard?.card_images) ? firstCard.card_images[0] : null;
		return resolveFirstNonEmpty(firstImage?.image_url_small, firstImage?.image_url, firstImage?.image_url_cropped) || null;
	};

	try {
		const normalizedCardName = normalizeForSearch(cardName);
		const aliasNames = YGO_SPOTLIGHT_NAME_ALIASES[normalizedCardName] || [];
		const candidateNames = [cardName, ...aliasNames];

		let thumbUrl = null;
		for (const candidateName of candidateNames) {
			thumbUrl = await tryFetchThumbByParams("name", candidateName);
			if (thumbUrl) {
				break;
			}
		}

		if (!thumbUrl) {
			thumbUrl = await tryFetchThumbByParams("fname", cardName);
		}

		ygoSpotlightThumbCache.set(cacheKey, thumbUrl || null);
		return thumbUrl || null;
	} catch {
		ygoSpotlightThumbCache.set(cacheKey, null);
		return null;
	}
}

async function hydrateSpotlightThumbs(listElement, entries) {
	if (!(listElement instanceof HTMLElement) || !Array.isArray(entries) || entries.length === 0) {
		return;
	}

	const ygoEntries = entries.filter((entry) => normalizeForSearch(entry?.game) === "yu gi oh");
	if (ygoEntries.length === 0) {
		return;
	}

	await Promise.all(ygoEntries.map(async (entry) => {
		const thumbUrl = await fetchYugiohSpotlightThumb(entry);
		if (!thumbUrl) {
			return;
		}

		const cardKey = normalizeForSearch(entry?.card);
		const img = listElement.querySelector(`.hero__season-thumb[data-game="ygo"][data-card="${cardKey}"]`);
		if (img instanceof HTMLImageElement) {
			img.src = thumbUrl;
		}
	}));
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

function resolveSpotlightDisplayName(entry) {
	const game = normalizeForSearch(entry?.game).replace(/\s+/g, " ");
	const card = normalizeForSearch(entry?.card).replace(/\s+/g, " ");
	const key = `${game}::${card}`;
	return SPOTLIGHT_DISPLAY_NAME_OVERRIDES[key] || String(entry?.card || "").trim();
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

	const backdrop = overlay.querySelector(".spotlight-viewer__backdrop");
	const dialog = overlay.querySelector(".spotlight-viewer__dialog");
	const closeButton = overlay.querySelector(".spotlight-viewer__close");
	const image = overlay.querySelector(".spotlight-viewer__image");
	const game = overlay.querySelector(".spotlight-viewer__game");
	const title = overlay.querySelector(".spotlight-viewer__title");
	const link = overlay.querySelector(".spotlight-viewer__link");

	const close = () => {
		overlay.hidden = true;
		overlay.setAttribute("aria-hidden", "true");
		document.body.classList.remove("spotlight-viewer-open");
	};

	if (closeButton instanceof HTMLElement) {
		closeButton.addEventListener("click", close);
	}

	if (backdrop instanceof HTMLElement) {
		backdrop.addEventListener("click", close);
	}

	overlay.addEventListener("click", (event) => {
		if (event.target === overlay) {
			close();
		}
	});

	if (dialog instanceof HTMLElement) {
		dialog.addEventListener("click", (event) => {
			event.stopPropagation();
		});
	}

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
	const cardTitle = resolveSpotlightDisplayName(entry);
	viewer.title.textContent = cardTitle;
	viewer.link.href = buildSpotlightCardUrl(entry);
	viewer.link.textContent = "Go to Card Page";

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

function renderSpotlightItems(listElement, spotlight, options = {}) {
	listElement.innerHTML = "";
	const isTripleSpotlight = Array.isArray(spotlight) && spotlight.length >= 3;
	listElement.classList.toggle("hero__season-list--triple", isTripleSpotlight);

	for (const [index, entry] of spotlight.entries()) {
		const item = document.createElement("li");
		item.className = "hero__season-item";
		item.classList.toggle("hero__season-item--primary", index === 0);
		item.classList.toggle("hero__season-item--chaser", index === 1);
		item.classList.toggle("hero__season-item--third", index === 2);

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
		thumb.classList.toggle("hero__season-thumb--primary", index === 0);
		thumb.classList.toggle("hero__season-thumb--chaser", index === 1);
		thumb.classList.toggle("hero__season-thumb--third", index === 2);
		thumb.dataset.game = normalizeForSearch(entry.game) === "yu gi oh" ? "ygo" : "other";
		thumb.dataset.card = normalizeForSearch(entry.card);
		thumb.src = resolveSpotlightThumb(entry);
		thumb.alt = `${entry.card} thumbnail`;
		thumb.addEventListener("error", () => {
			thumb.src = STATIC_THUMB_PLACEHOLDER;
		}, { once: true });

		const thumbButton = document.createElement("button");
		thumbButton.className = "hero__season-thumb-btn";
		thumbButton.classList.toggle("hero__season-thumb-btn--primary", index === 0);
		thumbButton.classList.toggle("hero__season-thumb-btn--chaser", index === 1);
		thumbButton.classList.toggle("hero__season-thumb-btn--third", index === 2);
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
	monthDots.onclick = (event) => {
		const dot = event.target instanceof HTMLElement ? event.target.closest(".hero__season-dot") : null;
		if (!(dot instanceof HTMLElement)) {
			return;
		}

		const targetMonth = Number(dot.dataset.monthIndex);
		if (!Number.isNaN(targetMonth)) {
			renderMonth(targetMonth);
		}
	};

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
		const previousSpotlight = expandSpotlightWithRival(filterSpotlightByActiveMode(previousTheme.spotlight || []));
		const nextSpotlight = expandSpotlightWithRival(filterSpotlightByActiveMode(nextTheme.spotlight || []));
		const activePanelSpotlight = expandActivePanelSpotlightEntries(filterSpotlightByActiveMode(activeTheme.spotlight || []), activeMonth, true);

		monthLabel.textContent = `${monthNames[activeMonth]} Seasonal Spotlight`;
		themeTitle.textContent = activeTheme.themeTitle;
		setActiveMonthDot(monthDots, activeMonth);
		renderSpotlightItems(spotlightList, activePanelSpotlight, { monthIndex: activeMonth, isActivePanel: true });

		prevMonth.textContent = `${monthNames[previousMonthIndex]} Spotlight`;
		nextMonth.textContent = `${monthNames[nextMonthIndex]} Spotlight`;
		prevTitle.textContent = previousTheme.themeTitle;
		nextTitle.textContent = nextTheme.themeTitle;
		renderSpotlightItems(prevList, previousSpotlight);
		renderSpotlightItems(nextList, nextSpotlight);
		hydrateSpotlightThumbs(spotlightList, activePanelSpotlight);
		hydrateSpotlightThumbs(prevList, previousSpotlight);
		hydrateSpotlightThumbs(nextList, nextSpotlight);
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

	rerenderSeasonTheme = () => renderMonth(activeMonth);
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

	if (toggle.dataset.mobileNavInitialized === "true") {
		return;
	}
	toggle.dataset.mobileNavInitialized = "true";

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

function initHomeGameModeSelector() {
	const modeSelect = document.getElementById("homeGameModeSelect");
	if (!(modeSelect instanceof HTMLSelectElement)) {
		return;
	}

	const savedModeKey = getSavedHomeGameMode();
	if (savedModeKey) {
		applyHomeGameModeUi(savedModeKey, { persist: false });
	} else {
		applyHomeGameModeUi("yyh");
	}

	if (modeSelect.dataset.modeSelectInitialized !== "true") {
		modeSelect.dataset.modeSelectInitialized = "true";
		modeSelect.addEventListener("change", () => {
			const modeKey = String(modeSelect.value || "").trim();
			if (getHomeGameModeConfig(modeKey)) {
				applyHomeGameModeUi(modeKey);
			}
		});
	}
}

function initHomeSearch() {
	const searchForm = document.querySelector(".hero__search");
	const searchInput = document.querySelector(".hero__search-input");
	if (!searchForm || !searchInput) {
		return;
	}

	const SUGGESTION_MIN_CHARS = 3;
	const SUGGESTION_LIMIT = 8;
	const DEBOUNCE_MS = 280;
	const YYH_SUGGESTION_LIMIT = 24;
	const YGO_SUGGESTION_LIMIT = 24;
	const POKEMON_SUGGESTION_LIMIT = 24;
	const suggestionList = document.createElement("ul");
	suggestionList.className = "hero__search-suggestions";
	suggestionList.id = "heroSearchSuggestions";
	suggestionList.hidden = true;
	suggestionList.setAttribute("role", "listbox");
	searchForm.appendChild(suggestionList);

	searchInput.setAttribute("autocomplete", "off");
	searchInput.setAttribute("aria-autocomplete", "list");
	searchInput.setAttribute("aria-controls", suggestionList.id);

	let debounceTimer = null;
	let activeIndex = -1;
	let currentSuggestions = [];
	let pendingRequestController = null;

	const closeSuggestions = () => {
		suggestionList.hidden = true;
		suggestionList.innerHTML = "";
		activeIndex = -1;
		currentSuggestions = [];
		searchInput.setAttribute("aria-expanded", "false");
	};

	const openSuggestions = () => {
		suggestionList.hidden = false;
		searchInput.setAttribute("aria-expanded", "true");
	};

	const mapSuggestionsFromItems = (items, query) => {
		const searchTokens = normalizeForSearch(query).split(" ").filter(Boolean);
		const deduped = [];
		const seen = new Set();

		for (const item of items) {
			const name = String(item?.name || "").trim();
			const setName = String(item?.set || "Unknown Set").trim() || "Unknown Set";
			const game = String(item?.game || "Unknown Game").trim() || "Unknown Game";
			const cardNumber = String(
				item?.cardNumber ||
				item?.number ||
				item?.cardId ||
				item?.id ||
				""
			).trim();

			if (!name) {
				continue;
			}

			if (searchTokens.length > 0) {
				const haystack = normalizeForSearch(`${name} ${setName} ${cardNumber} ${game}`);
				if (!searchTokens.every((token) => haystack.includes(token))) {
					continue;
				}
			}

			const key = `${normalizeForSearch(game)}||${normalizeForSearch(name)}||${normalizeForSearch(setName)}||${normalizeForSearch(cardNumber)}`;
			if (seen.has(key)) {
				continue;
			}

			seen.add(key);
			deduped.push({
				name,
				set: setName,
				game,
				cardNumber
			});

			if (deduped.length >= SUGGESTION_LIMIT) {
				break;
			}
		}

		return deduped;
	};

	const navigateToInventory = (query, game = "") => {
		const destination = new URL("inventory.html", window.location.href);
		if (query) {
			destination.searchParams.set("q", query);
		}

		const selectedGame = String(game || getActiveSearchGameName() || "").trim();
		const normalizedGame = normalizeForSearch(selectedGame);
		if (normalizedGame === "yu yu hakusho" || normalizedGame === "yu gi oh" || normalizedGame === "pokemon") {
			destination.searchParams.set("game", selectedGame);
		}

		window.location.href = destination.toString();
	};

	const renderSuggestions = (suggestions, query) => {
		suggestionList.innerHTML = "";
		currentSuggestions = suggestions;
		activeIndex = -1;

		if (!query || query.length < SUGGESTION_MIN_CHARS) {
			closeSuggestions();
			return;
		}

		if (suggestions.length === 0) {
			const emptyItem = document.createElement("li");
			emptyItem.className = "hero__search-suggestion hero__search-suggestion--empty";
			emptyItem.textContent = "No matching cards found";
			suggestionList.appendChild(emptyItem);
			openSuggestions();
			return;
		}

		suggestions.forEach((item, index) => {
			const row = document.createElement("li");
			row.className = "hero__search-suggestion";
			row.setAttribute("role", "option");
			row.id = `heroSearchSuggestion-${index}`;

			const button = document.createElement("button");
			button.type = "button";
			button.className = "hero__search-suggestion-btn";
			const metaParts = [item.game, item.set];
			if (item.cardNumber) {
				metaParts.push(item.cardNumber);
			}
			button.innerHTML = `
				<span class="hero__search-suggestion-name">${item.name}</span>
				<span class="hero__search-suggestion-meta">${metaParts.join(" • ")}</span>
			`;

			button.addEventListener("click", () => {
				searchInput.value = item.name;
				closeSuggestions();
				navigateToInventory(item.name, item.game);
			});

			row.appendChild(button);
			suggestionList.appendChild(row);
		});

		openSuggestions();
	};

	const mapYyhApiItems = (items) => {
		if (!Array.isArray(items)) {
			return [];
		}

		return items.map((item) => ({
			name: String(item?.name || "").trim(),
			set: String(item?.set || "Unknown Set").trim() || "Unknown Set",
			game: "Yu Yu Hakusho",
			cardNumber: String(item?.cardNumber || item?.number || item?.id || "").trim()
		}));
	};

	const mapYugiohApiItems = (items) => {
		if (!Array.isArray(items)) {
			return [];
		}

		return items.map((item) => {
			const firstSet = Array.isArray(item?.card_sets) && item.card_sets.length > 0
				? item.card_sets[0]
				: null;

			return {
				name: String(item?.name || "").trim(),
				set: String(firstSet?.set_name || "Various Sets").trim() || "Various Sets",
				game: "Yu-Gi-Oh",
				cardNumber: String(item?.id || "").trim()
			};
		});
	};

	const mapPokemonApiItems = (items) => {
		if (!Array.isArray(items)) {
			return [];
		}

		return items.map((item) => {
			const cardId = String(item?.id || "").trim();
			const derivedSetFromId = cardId.includes("-") ? cardId.split("-")[0] : "";
			const setName = typeof item?.set === "object"
				? resolveFirstNonEmpty(item.set?.name, item.set?.id)
				: resolveFirstNonEmpty(item?.set);

			return {
				name: String(item?.name || "").trim(),
				set: setName || (derivedSetFromId ? `Set ${derivedSetFromId.toUpperCase()}` : "Unknown Set"),
				game: "Pokemon",
				cardNumber: String(item?.localId || cardId || "").trim()
			};
		});
	};

	const fetchYyhSuggestions = async (query, signal) => {
		const endpoint = new URL("api/yyh/cards", window.location.href);
		endpoint.searchParams.set("q", query);
		endpoint.searchParams.set("game", "Yu Yu Hakusho");
		endpoint.searchParams.set("limit", String(YYH_SUGGESTION_LIMIT));
		endpoint.searchParams.set("offset", "0");

		const response = await fetch(endpoint.toString(), {
			cache: "no-store",
			signal
		});

		if (!response.ok) {
			return [];
		}

		const payload = await response.json();
		const items = Array.isArray(payload?.items) ? payload.items : [];
		return mapYyhApiItems(items);
	};

	const fetchYugiohSuggestions = async (query, signal) => {
		const endpoint = new URL("https://db.ygoprodeck.com/api/v7/cardinfo.php");
		endpoint.searchParams.set("fname", query);
		endpoint.searchParams.set("num", String(YGO_SUGGESTION_LIMIT));
		endpoint.searchParams.set("offset", "0");

		const response = await fetch(endpoint.toString(), {
			cache: "no-store",
			signal
		});

		if (!response.ok) {
			return [];
		}

		const payload = await response.json();
		return mapYugiohApiItems(Array.isArray(payload?.data) ? payload.data : []);
	};

	const fetchPokemonSuggestions = async (query, signal) => {
		const endpoint = new URL("https://api.tcgdex.net/v2/en/cards");
		endpoint.searchParams.set("name", query);
		endpoint.searchParams.set("pagination:itemsPerPage", String(POKEMON_SUGGESTION_LIMIT));

		const response = await fetch(endpoint.toString(), {
			cache: "no-store",
			signal
		});

		if (!response.ok) {
			return [];
		}

		const payload = await response.json();
		return mapPokemonApiItems(payload);
	};

	const fetchSuggestions = async (query) => {
		if (pendingRequestController) {
			pendingRequestController.abort();
		}

		pendingRequestController = new AbortController();

		try {
			const signal = pendingRequestController.signal;
			const activeGame = getActiveSearchGameName();
			const normalizedGame = normalizeForSearch(activeGame);

			// Try API first for Yu Yu Hakusho
			if (normalizedGame === "yu yu hakusho") {
				const yyhItems = await fetchYyhSuggestions(query, signal);
				if (yyhItems.length > 0) {
					return mapSuggestionsFromItems(yyhItems, query);
				}
				// Fall back to local data
				const fallbackData = await loadHomeSearchFallbackData();
				const filtered = fallbackData.filter(
					(item) => normalizeForSearch(item?.game) === "yu yu hakusho"
				);
				return mapSuggestionsFromItems(filtered, query);
			}

			// Yu-Gi-Oh from external API
			if (normalizedGame === "yu gi oh") {
				const ygoItems = await fetchYugiohSuggestions(query, signal);
				if (ygoItems.length > 0) {
					return mapSuggestionsFromItems(ygoItems, query);
				}
			}

			// Pokemon from external API
			if (normalizedGame === "pokemon") {
				const pokemonItems = await fetchPokemonSuggestions(query, signal);
				if (pokemonItems.length > 0) {
					return mapSuggestionsFromItems(pokemonItems, query);
				}
			}
		} catch (error) {
			if (error && error.name === "AbortError") {
				throw error;
			}
		}

		return [];
	};

	const runDebouncedSearch = () => {
		const query = String(searchInput.value || "").trim();
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		if (query.length < SUGGESTION_MIN_CHARS) {
			if (pendingRequestController) {
				pendingRequestController.abort();
			}
			closeSuggestions();
			return;
		}

		debounceTimer = setTimeout(async () => {
			const liveQuery = String(searchInput.value || "").trim();
			if (liveQuery.length < SUGGESTION_MIN_CHARS) {
				closeSuggestions();
				return;
			}

			try {
				const suggestions = await fetchSuggestions(liveQuery);
				if (String(searchInput.value || "").trim() !== liveQuery) {
					return;
				}
				renderSuggestions(suggestions, liveQuery);
			} catch (error) {
				if (error && error.name === "AbortError") {
					return;
				}
				closeSuggestions();
			}
		}, DEBOUNCE_MS);
	};

	searchInput.addEventListener("input", runDebouncedSearch);

	searchInput.addEventListener("keydown", (event) => {
		if (suggestionList.hidden || currentSuggestions.length === 0) {
			return;
		}

		const options = Array.from(suggestionList.querySelectorAll(".hero__search-suggestion"));
		if (event.key === "ArrowDown") {
			event.preventDefault();
			activeIndex = (activeIndex + 1) % options.length;
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			activeIndex = (activeIndex - 1 + options.length) % options.length;
		} else if (event.key === "Escape") {
			closeSuggestions();
			return;
		} else if (event.key === "Enter" && activeIndex >= 0 && currentSuggestions[activeIndex]) {
			event.preventDefault();
			navigateToInventory(currentSuggestions[activeIndex].name, currentSuggestions[activeIndex].game);
			return;
		} else {
			return;
		}

		options.forEach((option, index) => {
			option.classList.toggle("is-active", index === activeIndex);
		});
	});

	searchInput.addEventListener("focus", () => {
		const query = String(searchInput.value || "").trim();
		if (query.length >= SUGGESTION_MIN_CHARS && currentSuggestions.length > 0) {
			openSuggestions();
		}
	});

	document.addEventListener("click", (event) => {
		if (!searchForm.contains(event.target)) {
			closeSuggestions();
		}
	});

	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const query = String(searchInput.value || "").trim();
		closeSuggestions();
		navigateToInventory(query);
	});
}

function initHomeSetSelects() {
	const YGO_CARD_SETS_API_URL = "https://db.ygoprodeck.com/api/v7/cardsets.php";
	const YGO_HOME_SET_LIMIT = 9;
	const HOME_SET_SELECT_PLACEHOLDER_TEXT = "Select a Set";
	const HOME_SET_SEARCH_FALLBACK_TEXT = "Use search bar to find specific cards";

	const setSelectConfigs = [
		{ elementId: "pokemon-set-select", game: "Pokemon" },
		{ elementId: "yugioh-set-select", game: "Yu-Gi-Oh" },
		{ elementId: "yyh-set-select", game: "Yu Yu Hakusho" }
	];

	const yyhSetNameByNormalizedValue = {
		"ghost files": "Ghost Files",
		"dark tournament": "Dark Tournament",
		exile: "Exile",
		betrayal: "Betrayal",
		alliance: "Alliance",
		gateway: "Gateway",
		"pre release cards": "Pre-Release Cards",
		products: "Products",
		"extra cards": "Extra Cards"
	};

	const isPlaceholderOption = (value) => {
		const normalized = normalizeForSearch(value);
		return !normalized
			|| normalized.includes("placeholder")
			|| normalized.includes("use search bar");
	};

	const resolveCanonicalSetName = (game, rawSetName) => {
		if (game !== "Yu Yu Hakusho") {
			return rawSetName;
		}

		const normalizedSetName = normalizeForSearch(rawSetName);
		return yyhSetNameByNormalizedValue[normalizedSetName] || rawSetName;
	};

	const navigateToSetInventory = (game, setName) => {
		const destination = new URL("inventory.html", window.location.href);
		destination.searchParams.set("game", game);
		destination.searchParams.set("set", setName);
		window.location.href = destination.toString();
	};

	const parseSetDateValue = (value) => {
		if (typeof value !== "string") {
			return Number.NaN;
		}

		const parsed = new Date(value).getTime();
		return Number.isFinite(parsed) ? parsed : Number.NaN;
	};

	const replaceSelectOptions = (select, options) => {
		select.innerHTML = "";

		for (const optionData of options) {
			const option = document.createElement("option");
			option.value = optionData.value;
			option.textContent = optionData.label;
			if (optionData.disabled) {
				option.disabled = true;
			}
			if (optionData.selected) {
				option.selected = true;
			}
			select.appendChild(option);
		}
	};

	const populateYugiohSetSelect = async (select) => {
		if (!(select instanceof HTMLSelectElement)) {
			return;
		}

		if (select.dataset.ygoSetOptionsInitialized === "true") {
			return;
		}

		try {
			const response = await fetch(YGO_CARD_SETS_API_URL, { cache: "no-store" });
			if (!response.ok) {
				throw new Error(`YGO set request failed with status ${response.status}`);
			}

			const payload = await response.json();
			if (!Array.isArray(payload)) {
				throw new Error("YGO set payload was not an array");
			}

			const setRows = payload
				.map((item) => ({
					setName: String(item?.set_name || "").trim(),
					dateValue: parseSetDateValue(item?.tcg_date)
				}))
				.filter((item) => item.setName && Number.isFinite(item.dateValue));

			if (setRows.length === 0) {
				throw new Error("No dated YGO sets found in payload");
			}

			const newestSlice = [...setRows]
				.sort((a, b) => b.dateValue - a.dateValue || a.setName.localeCompare(b.setName))
				.slice(0, YGO_HOME_SET_LIMIT)
				.sort((a, b) => a.dateValue - b.dateValue || a.setName.localeCompare(b.setName));

			replaceSelectOptions(select, [
				{ value: "", label: HOME_SET_SELECT_PLACEHOLDER_TEXT, disabled: true, selected: true },
				...newestSlice.map((row) => ({ value: row.setName, label: row.setName })),
				{ value: "", label: HOME_SET_SEARCH_FALLBACK_TEXT }
			]);

			select.dataset.ygoSetOptionsInitialized = "true";
		} catch (error) {
			console.error("Failed to populate Yu-Gi-Oh set options", error);
		}
	};

	for (const { elementId, game } of setSelectConfigs) {
		const select = document.getElementById(elementId);
		if (!(select instanceof HTMLSelectElement)) {
			continue;
		}

		if (game === "Yu-Gi-Oh") {
			populateYugiohSetSelect(select);
		}

		if (select.dataset.homeSetNavInitialized === "true") {
			continue;
		}
		select.dataset.homeSetNavInitialized = "true";

		select.addEventListener("change", () => {
			const selectedOption = select.options[select.selectedIndex] || null;
			const selectedValue = String(selectedOption?.value || "").trim();
			const selectedLabel = String(selectedOption?.textContent || selectedValue).trim();
			const selectedSetName = selectedValue || selectedLabel;

			if (isPlaceholderOption(selectedSetName)) {
				return;
			}

			navigateToSetInventory(game, resolveCanonicalSetName(game, selectedSetName));
		});
	}
}

function runHomeInitializer(label, initializer) {
	try {
		initializer();
	} catch (error) {
		console.error(`Home initializer failed: ${label}`, error);
	}
}

runHomeInitializer("applySeasonTheme", applySeasonTheme);
runHomeInitializer("initGameLanesReveal", initGameLanesReveal);
runHomeInitializer("initMobileNav", initMobileNav);
runHomeInitializer("initHomeSearch", initHomeSearch);
runHomeInitializer("initHomeSetSelects", initHomeSetSelects);
runHomeInitializer("initHomeGameModeSelector", initHomeGameModeSelector);

document.addEventListener("DOMContentLoaded", () => {
	runHomeInitializer("initMobileNav", initMobileNav);
	runHomeInitializer("initHomeSetSelects", initHomeSetSelects);
	runHomeInitializer("initHomeGameModeSelector", initHomeGameModeSelector);
});
