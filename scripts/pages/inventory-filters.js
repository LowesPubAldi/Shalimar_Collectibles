const FILTER_OPTIONS_BY_GAME = {
    "All Games": {
        sets: [
            "All Sets",
            "Set Placeholder 01",
            "Set Placeholder 02",
            "Set Placeholder 03",
            "Set Placeholder 04",
            "Set Placeholder 05",
            "Set Placeholder 06"
        ],
        types: ["All Types", "Character", "Technique", "Spirit", "Trainer", "Monster", "Spell", "Trap"],
        rarities: ["All Rarities", "Common", "Uncommon", "Rare", "Super Rare", "Ultra Rare"]
    },
    "Yu Yu Hakusho": {
        sets: [
            "All Sets",
            "YYH Set Placeholder 01",
            "YYH Set Placeholder 02",
            "YYH Set Placeholder 03",
            "YYH Set Placeholder 04",
            "YYH Set Placeholder 05",
            "YYH Set Placeholder 06"
        ],
        types: ["All Types", "Character", "Technique", "Spirit", "Item", "Event"],
        rarities: [
            "All Rarities",
            "G - Ghost Rare",
            "U - Uber Rare",
            "S - Spirit Rare",
            "R - Rare (standard)",
            "C - Common",
            "F - Storm of Torment misprint marker",
            "ST - Starter Deck",
            "L - League card",
            "TG - Tournament Ghost Rare",
            "TU - Tournament Uber Rare",
            "TS - Tournament Spirit Rare",
            "TR - Tournament Rare",
            "TC - Tournament Common",
            "P - Promo",
            "TP - Tournament Promo",
            "R - Redemption (redemption card)",
            "V - Video",
            "X - Team Challenge/Box Topper",
            "SK - Skannerz",
            "TX - Texas Team Challenge",
            "No Code - Kurama, Entrapped Demon (Gateway)"
        ]
    },
    "Yu-Gi-Oh": {
        sets: [
            "All Sets",
            "YGO Set Placeholder 01",
            "YGO Set Placeholder 02",
            "YGO Set Placeholder 03",
            "YGO Set Placeholder 04",
            "YGO Set Placeholder 05",
            "YGO Set Placeholder 06"
        ],
        types: ["All Types", "Monster", "Spell", "Trap", "Fusion", "Synchro", "Xyz", "Link"],
        rarities: [
            "All Rarities",
            "Common",
            "Rare",
            "Super Rare",
            "Ultra Rare",
            "Ultimate Rare",
            "Secret Rare",
            "Ultra Secret Rare",
            "Prismatic Secret Rare",
            "Ghost Rare",
            "Gold Rare",
            "Ghost/Gold Rare",
            "Parallel Rare",
            "Starfoil Rare",
            "Mosaic Rare",
            "Shatterfoil Rare",
            "Duel Terminal Rare",
            "Duel Terminal Parallel Rare",
            "Collector's Rare",
            "Starlight Rare",
            "Quarter Century Secret Rare",
            "Millennium Rare",
            "Platinum Secret Rare",
            "Promo",
            "Tournament Pack"
        ]
    },
    "Pokemon": {
        sets: [
            "All Sets",
            "Pokemon Set Placeholder 01",
            "Pokemon Set Placeholder 02",
            "Pokemon Set Placeholder 03",
            "Pokemon Set Placeholder 04",
            "Pokemon Set Placeholder 05",
            "Pokemon Set Placeholder 06"
        ],
        types: ["All Types", "Pokemon", "Trainer", "Item", "Supporter", "Stadium", "Energy"],
        rarities: [
            "All Rarities",
            "Common",
            "Uncommon",
            "Rare",
            "Double Rare",
            "Triple Rare",
            "Illustration Rare",
            "Ultra Rare",
            "Special Illustration Rare",
            "Hyper Rare",
            "Mega Hyper Rare"
        ]
    }
};

function replaceSelectOptions(selectElement, options) {
    selectElement.innerHTML = "";
    for (const optionLabel of options) {
        const option = document.createElement("option");
        option.value = optionLabel;
        option.textContent = optionLabel;
        selectElement.appendChild(option);
    }
}

function initInventoryFilters() {
    const gameFilter = document.getElementById("inventory-game-filter");
    const setFilter = document.getElementById("inventory-set-filter");
    const typeFilter = document.getElementById("inventory-type-filter");
    const rarityFilter = document.getElementById("inventory-rarity-filter");

    if (!gameFilter || !setFilter || !typeFilter || !rarityFilter) {
        return;
    }

    const syncConditionalFilters = () => {
        const selectedGame = gameFilter.value;
        const gameOptions = FILTER_OPTIONS_BY_GAME[selectedGame] || FILTER_OPTIONS_BY_GAME["All Games"];

        replaceSelectOptions(setFilter, gameOptions.sets);
        replaceSelectOptions(typeFilter, gameOptions.types);
        replaceSelectOptions(rarityFilter, gameOptions.rarities);
    };

    gameFilter.addEventListener("change", syncConditionalFilters);
    syncConditionalFilters();
}

document.addEventListener("DOMContentLoaded", initInventoryFilters);
