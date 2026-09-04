(function () {
    const STORAGE_KEY = "home_game_mode";
    const MODES = {
        yyh: { name: "Yu Yu Hakusho", searchGame: "Yu Yu Hakusho", featureLabel: "Kings", featureHref: "kings.html" },
        ygo: { name: "Yu-Gi-Oh", searchGame: "Yu-Gi-Oh", featureLabel: "Win Cons", featureHref: "kings.html?game=Yu-Gi-Oh&mode=wincons" },
        pokemon: { name: "Pokemon", searchGame: "Pokemon", featureLabel: "Starters", featureHref: "kings.html?game=Pokemon&mode=starters" }
    };

    function getSavedMode() {
        try {
            const savedMode = localStorage.getItem(STORAGE_KEY) || "";
            return MODES[savedMode] ? savedMode : "";
        } catch {
            return "";
        }
    }

    function getModeFromUrl() {
        const game = String(new URLSearchParams(window.location.search).get("game") || "").trim();
        const modeEntry = Object.entries(MODES).find(([, mode]) => mode.searchGame === game);
        return modeEntry ? modeEntry[0] : "";
    }

    function saveMode(modeKey) {
        try {
            localStorage.setItem(STORAGE_KEY, modeKey);
        } catch {
            // Keep the selector usable when storage is unavailable.
        }
    }

    function updateScopedLinks(mode) {
        const game = encodeURIComponent(mode.searchGame);
        document.querySelectorAll("#primaryNavLinks a, .site-footer__nav a").forEach((link) => {
            const label = String(link.textContent || "").trim();
            const linkWrapper = link.closest("li") || link;
            if (label === "Contributors") {
                linkWrapper.hidden = modeKeyIsYuGiOh(mode);
                return;
            }
            if (label === "Inventory") {
                link.href = `inventory.html?game=${game}`;
            } else if (label === "Sets") {
                link.href = `sets.html?game=${game}`;
            } else if (label === "Kings" || label === "Win Cons" || label === "Starters") {
                link.textContent = mode.featureLabel;
                link.href = mode.featureHref;
            }
        });
    }

    function modeKeyIsYuGiOh(mode) {
        return mode.searchGame === "Yu-Gi-Oh";
    }

    function navigateFeaturePageIfNeeded(modeKey, mode) {
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        if (currentFile !== "sets.html" && currentFile !== "kings.html") {
            return;
        }

        const destination = new URL(mode.featureHref, window.location.href);
        const currentUrl = `${window.location.pathname}${window.location.search}`;
        const destinationUrl = `${destination.pathname}${destination.search}`;
        if (currentUrl !== destinationUrl) {
            window.location.replace(destination.toString());
        }
    }

    function buildModal() {
        const modal = document.createElement("div");
        modal.className = "game-mode-modal game-mode-modal--global";
        modal.id = "globalGameModeModal";
        modal.hidden = true;
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "globalGameModeModalTitle");
        modal.innerHTML = `
            <div class="game-mode-modal__panel">
                <p class="game-mode-modal__eyebrow">Choose Your Game Mode</p>
                <h2 class="game-mode-modal__title" id="globalGameModeModalTitle">Select Your TCG Focus</h2>
                <p class="game-mode-modal__description">Pick a game to keep your inventory and set links focused.</p>
                <div class="game-mode-modal__options">
                    <button class="game-mode-modal__option" type="button" data-global-game-mode="yyh">Yu Yu Hakusho</button>
                    <button class="game-mode-modal__option" type="button" data-global-game-mode="ygo">Yu-Gi-Oh</button>
                    <button class="game-mode-modal__option" type="button" data-global-game-mode="pokemon">Pokemon</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        return modal;
    }

    function initGlobalGameMode() {
        if (document.getElementById("gameModeModal")) {
            return;
        }

        const select = document.getElementById("gameModeSelect");
        if (!(select instanceof HTMLSelectElement)) {
            return;
        }

        const applyMode = (modeKey) => {
            const mode = MODES[modeKey];
            if (!mode) {
                return;
            }
            saveMode(modeKey);
            select.value = modeKey;
            updateScopedLinks(mode);

            const currentFile = window.location.pathname.split("/").pop() || "index.html";
            if (currentFile === "sets.html" && getModeFromUrl() !== modeKey) {
                const destination = new URL(window.location.href);
                destination.searchParams.set("game", mode.searchGame);
                window.location.replace(destination.toString());
                return;
            }

            if (currentFile === "kings.html") {
                navigateFeaturePageIfNeeded(modeKey, mode);
            }
        };

        select.addEventListener("change", () => applyMode(select.value));

        const activeMode = getModeFromUrl() || getSavedMode();
        if (activeMode) {
            applyMode(activeMode);
        }
    }

    document.addEventListener("DOMContentLoaded", initGlobalGameMode);
}());
