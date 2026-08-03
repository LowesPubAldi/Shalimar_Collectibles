function initContributorsSlider() {
    const slider = document.querySelector("[data-contributors-slider]");
    if (!slider) {
        return;
    }

    const track = slider.querySelector("[data-slider-track]");
    const viewport = slider.querySelector(".contributors-slider__viewport");
    const prevButton = slider.querySelector("[data-slider-prev]");
    const nextButton = slider.querySelector("[data-slider-next]");
    const dotButtons = Array.from(document.querySelectorAll("[data-slider-dot]"));
    const cards = Array.from(track ? track.querySelectorAll(".contributor-card") : []);

    if (!track || !viewport || !prevButton || !nextButton || dotButtons.length === 0 || cards.length === 0) {
        return;
    }

    const slideCount = dotButtons.length;
    let currentIndex = 0;
    let autoRotateTimer = null;
    let slideWidth = 0;

    const canAutoRotate = () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;
        return !prefersReducedMotion && !isTouchLike;
    };

    const applyTransform = () => {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const syncLayout = () => {
        slideWidth = viewport.clientWidth;
        track.style.width = `${slideCount * slideWidth}px`;
        for (const card of cards) {
            card.style.width = `${slideWidth}px`;
            card.style.flex = `0 0 ${slideWidth}px`;
        }
        applyTransform();
    };

    const setIndex = (nextIndex) => {
        currentIndex = (nextIndex + slideCount) % slideCount;
        applyTransform();

        dotButtons.forEach((dotButton, index) => {
            const isActive = index === currentIndex;
            dotButton.setAttribute("aria-selected", isActive ? "true" : "false");
        });
    };

    const stopAutoRotate = () => {
        if (autoRotateTimer) {
            window.clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    };

    const startAutoRotate = () => {
        stopAutoRotate();
        if (!canAutoRotate()) {
            return;
        }
        autoRotateTimer = window.setInterval(() => {
            setIndex(currentIndex + 1);
        }, 6000);
    };

    prevButton.addEventListener("click", () => {
        setIndex(currentIndex - 1);
        startAutoRotate();
    });

    nextButton.addEventListener("click", () => {
        setIndex(currentIndex + 1);
        startAutoRotate();
    });

    dotButtons.forEach((dotButton) => {
        dotButton.addEventListener("click", () => {
            const nextIndex = Number(dotButton.getAttribute("data-slider-dot"));
            if (Number.isNaN(nextIndex)) {
                return;
            }
            setIndex(nextIndex);
            startAutoRotate();
        });
    });

    slider.addEventListener("mouseenter", stopAutoRotate);
    slider.addEventListener("mouseleave", startAutoRotate);
    slider.addEventListener("focusin", stopAutoRotate);
    slider.addEventListener("focusout", startAutoRotate);
    window.addEventListener("resize", syncLayout);

    syncLayout();
    setIndex(0);
    startAutoRotate();
}

document.addEventListener("DOMContentLoaded", initContributorsSlider);
