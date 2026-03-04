export function initJikeArchive() {
  const archive = document.querySelector(".jike-archive");
  const lightbox = document.querySelector("[data-jike-lightbox]");
  const lightboxImage = document.querySelector("[data-jike-lightbox-image]");
  const lightboxCounter = document.querySelector("[data-jike-lightbox-counter]");
  const previousButton = document.querySelector("[data-jike-lightbox-prev]");
  const nextButton = document.querySelector("[data-jike-lightbox-next]");

  if (
    !(archive instanceof HTMLElement) ||
    !(lightbox instanceof HTMLElement) ||
    !(lightboxImage instanceof HTMLImageElement)
  ) {
    return;
  }

  const state = {
    images: [],
    index: 0,
    label: ""
  };

  const renderLightbox = () => {
    const currentImage = state.images[state.index];
    if (!currentImage) return;

    lightboxImage.src = currentImage;
    lightboxImage.alt = state.label
      ? `${state.label} ${state.index + 1} / ${state.images.length}`
      : `第 ${state.index + 1} 张，共 ${state.images.length} 张`;

    if (lightboxCounter instanceof HTMLElement) {
      lightboxCounter.textContent = `${state.index + 1} / ${state.images.length}`;
    }

    if (previousButton instanceof HTMLButtonElement) {
      previousButton.hidden = state.images.length <= 1;
    }

    if (nextButton instanceof HTMLButtonElement) {
      nextButton.hidden = state.images.length <= 1;
    }
  };

  const clearLightbox = () => {
    state.images = [];
    state.index = 0;
    state.label = "";
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";

    if (lightboxCounter instanceof HTMLElement) {
      lightboxCounter.textContent = "";
    }
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  const openLightbox = (images, index, label) => {
    state.images = images;
    state.index = index;
    state.label = label;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const expandButton = target.closest("[data-jike-expand-button]");
    if (expandButton instanceof HTMLButtonElement) {
      const card = expandButton.closest(".jike-card");
      const expandable = card?.querySelector("[data-jike-expandable]");
      if (expandable instanceof HTMLElement) {
        expandable.classList.remove("is-collapsed");
      }
      expandButton.remove();
      return;
    }

    const trigger = target.closest("[data-jike-lightbox-trigger]");
    if (trigger instanceof HTMLElement) {
      const src = trigger.dataset.jikeLightboxSrc;
      if (!src) return;

      let images = [src];
      try {
        const parsed = JSON.parse(trigger.dataset.jikeLightboxImages || "[]");
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string") && parsed.length > 0) {
          images = parsed;
        }
      } catch {
        images = [src];
      }

      const index = Number.parseInt(trigger.dataset.jikeLightboxIndex || "0", 10);

      event.preventDefault();
      openLightbox(
        images,
        Number.isNaN(index) ? 0 : Math.max(0, Math.min(index, images.length - 1)),
        trigger.dataset.jikeLightboxAlt || ""
      );
      return;
    }

    if (target.closest("[data-jike-lightbox-prev]")) {
      if (state.images.length > 1) {
        state.index = (state.index - 1 + state.images.length) % state.images.length;
        renderLightbox();
      }
      return;
    }

    if (target.closest("[data-jike-lightbox-next]")) {
      if (state.images.length > 1) {
        state.index = (state.index + 1) % state.images.length;
        renderLightbox();
      }
      return;
    }

    if (target.closest("[data-jike-lightbox-close]")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft" && state.images.length > 1) {
      state.index = (state.index - 1 + state.images.length) % state.images.length;
      renderLightbox();
      return;
    }

    if (event.key === "ArrowRight" && state.images.length > 1) {
      state.index = (state.index + 1) % state.images.length;
      renderLightbox();
    }
  });

  const observer = new MutationObserver(() => {
    if (lightbox.hidden) {
      clearLightbox();
    }
  });

  observer.observe(lightbox, { attributes: true, attributeFilter: ["hidden"] });
}
