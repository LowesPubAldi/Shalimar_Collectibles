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

const FOOTER_LINKS = [
    { label: "Inventory", href: "inventory.html" },
    { label: "Sets", href: "sets.html" },
    { label: "Kings", href: "kings.html" },
    { label: "Contributors", href: "contributors.html" },
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
    initFooterNav();
});
