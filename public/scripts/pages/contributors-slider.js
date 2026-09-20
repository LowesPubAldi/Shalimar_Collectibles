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

    const slideCount = cards.length;
    const TRANSITION_MS = 680;
    const TRANSITION_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);

    const allSlides = Array.from(track.querySelectorAll(".contributor-card"));
    let currentIndex = 1;
    let autoRotateTimer = null;
    let slideWidth = 0;

    const canAutoRotate = () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;
        return !prefersReducedMotion && !isTouchLike;
    };

    const getRealIndex = () => {
        if (currentIndex === 0) {
            return slideCount - 1;
        }
        if (currentIndex === slideCount + 1) {
            return 0;
        }
        return currentIndex - 1;
    };

    const syncDots = () => {
        const realIndex = getRealIndex();
        dotButtons.forEach((dotButton, index) => {
            dotButton.setAttribute("aria-selected", index === realIndex ? "true" : "false");
        });
    };

    const applyTransform = () => {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const syncLayout = () => {
        slideWidth = viewport.clientWidth;
        track.style.width = `${allSlides.length * slideWidth}px`;
        for (const card of allSlides) {
            card.style.width = `${slideWidth}px`;
            card.style.flex = `0 0 ${slideWidth}px`;
        }
        applyTransform();
    };

    const setTrackIndex = (nextIndex, animate = true) => {
        track.style.transition = animate ? `transform ${TRANSITION_MS}ms ${TRANSITION_EASING}` : "none";
        currentIndex = nextIndex;
        applyTransform();
        syncDots();
    };

    const normalizeWrapIfNeeded = () => {
        if (currentIndex === 0) {
            setTrackIndex(slideCount, false);
        } else if (currentIndex === slideCount + 1) {
            setTrackIndex(1, false);
        }
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
            setTrackIndex(currentIndex + 1, true);
        }, 6000);
    };

    prevButton.addEventListener("click", () => {
        setTrackIndex(currentIndex - 1, true);
        startAutoRotate();
    });

    nextButton.addEventListener("click", () => {
        setTrackIndex(currentIndex + 1, true);
        startAutoRotate();
    });

    dotButtons.forEach((dotButton) => {
        dotButton.addEventListener("click", () => {
            const nextIndex = Number(dotButton.getAttribute("data-slider-dot"));
            if (Number.isNaN(nextIndex)) {
                return;
            }
            setTrackIndex(nextIndex + 1, true);
            startAutoRotate();
        });
    });

    track.addEventListener("transitionend", normalizeWrapIfNeeded);

    slider.addEventListener("mouseenter", stopAutoRotate);
    slider.addEventListener("mouseleave", startAutoRotate);
    slider.addEventListener("focusin", stopAutoRotate);
    slider.addEventListener("focusout", startAutoRotate);
    window.addEventListener("resize", syncLayout);

    syncLayout();
    setTrackIndex(1, false);
    startAutoRotate();
}

document.addEventListener("DOMContentLoaded", initContributorsSlider);
