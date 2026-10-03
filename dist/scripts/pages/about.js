document.addEventListener("DOMContentLoaded", () => {
    const preview = document.getElementById("aboutCardPreview");
    const previewImage = document.getElementById("aboutCardPreviewImage");
    const previewTitle = document.getElementById("aboutCardPreviewTitle");
    const links = Array.from(document.querySelectorAll("[data-card-preview]"));

    if (!(preview instanceof HTMLElement) || !(previewImage instanceof HTMLImageElement) || !(previewTitle instanceof HTMLElement) || links.length === 0) {
        return;
    }

    let activeLink = null;

    function getPreviewSource(link) {
        const image = link.querySelector("img");
        if (!(image instanceof HTMLImageElement)) {
            return "";
        }
        return image.currentSrc || image.src || "";
    }

    function getPreviewTitle(link) {
        const label = link.getAttribute("data-preview-title");
        if (label && label.trim()) {
            return label.trim();
        }

        const image = link.querySelector("img");
        if (image instanceof HTMLImageElement && image.alt.trim()) {
            return image.alt.trim();
        }

        return "Card preview";
    }

    function setPreviewPosition(clientX, clientY) {
        const offset = 18;
        const previewWidth = preview.offsetWidth || 240;
        const previewHeight = preview.offsetHeight || 360;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = clientX + offset;
        let top = clientY + offset;

        if (left + previewWidth > viewportWidth - 10) {
            left = clientX - previewWidth - offset;
        }

        if (top + previewHeight > viewportHeight - 10) {
            top = viewportHeight - previewHeight - 10;
        }

        if (left < 10) {
            left = 10;
        }

        if (top < 10) {
            top = 10;
        }

        preview.style.left = `${left}px`;
        preview.style.top = `${top}px`;
    }

    function showPreview(link, clientX, clientY) {
        const src = getPreviewSource(link);
        if (!src) {
            return;
        }

        previewImage.src = src;
        previewImage.alt = getPreviewTitle(link);
        previewTitle.textContent = getPreviewTitle(link);
        preview.setAttribute("aria-hidden", "false");
        preview.classList.add("is-visible");
        setPreviewPosition(clientX, clientY);
    }

    function hidePreview() {
        preview.classList.remove("is-visible");
        preview.setAttribute("aria-hidden", "true");
    }

    links.forEach((link) => {
        if (!(link instanceof HTMLAnchorElement)) {
            return;
        }

        link.addEventListener("mouseenter", (event) => {
            activeLink = link;
            showPreview(link, event.clientX, event.clientY);
        });

        link.addEventListener("mousemove", (event) => {
            if (activeLink !== link) {
                return;
            }
            setPreviewPosition(event.clientX, event.clientY);
        });

        link.addEventListener("mouseleave", () => {
            activeLink = null;
            hidePreview();
        });

        link.addEventListener("focus", () => {
            activeLink = link;
            const rect = link.getBoundingClientRect();
            showPreview(link, rect.right, rect.top + 18);
        });

        link.addEventListener("blur", () => {
            activeLink = null;
            hidePreview();
        });
    });

    window.addEventListener("scroll", () => {
        if (!activeLink) {
            return;
        }

        const rect = activeLink.getBoundingClientRect();
        setPreviewPosition(rect.right, rect.top + 18);
    }, { passive: true });
});
