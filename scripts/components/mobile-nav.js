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

document.addEventListener("DOMContentLoaded", initMobileNav);
