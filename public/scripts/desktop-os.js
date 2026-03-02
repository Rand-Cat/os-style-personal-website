(() => {
  const stage = document.querySelector("[data-desktop-stage]");
  const windows = Array.from(document.querySelectorAll("[data-window]"));
  const launcherButtons = Array.from(document.querySelectorAll("[data-open-window]"));
  const closers = Array.from(document.querySelectorAll("[data-close-window]"));
  const minimizers = Array.from(document.querySelectorAll("[data-minimize-window]"));
  const focusers = Array.from(document.querySelectorAll("[data-focus-window]"));
  const resizeHandles = Array.from(document.querySelectorAll("[data-resize-handle]"));
  const resetButtons = Array.from(document.querySelectorAll("[data-reset-windows]"));
  const clock = document.querySelector("#clock");

  let topZ = 20;

  const isDesktopViewport = () => window.matchMedia("(min-width: 981px)").matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const setWindowPosition = (windowEl, x, y) => {
    windowEl.dataset.x = String(x);
    windowEl.dataset.y = String(y);
    windowEl.style.setProperty("--x", `${x}px`);
    windowEl.style.setProperty("--y", `${y}px`);
  };

  const syncLaunchers = () => {
    launcherButtons.forEach((button) => {
      const appId = button.getAttribute("data-open-window");
      const target = document.querySelector(`[data-window="${appId}"]`);
      button.classList.toggle("is-active", target?.classList.contains("is-open"));
    });
  };

  const bringToFront = (target) => {
    topZ += 1;
    target.style.zIndex = String(topZ);
  };

  const openWindow = (appId) => {
    const target = document.querySelector(`[data-window="${appId}"]`);
    if (!target) return;
    target.classList.add("is-open");
    bringToFront(target);
    syncLaunchers();
  };

  const closeWindow = (appId) => {
    const target = document.querySelector(`[data-window="${appId}"]`);
    if (!target) return;
    target.classList.remove("is-open");
    syncLaunchers();
  };

  const closeAllWindows = () => {
    windows.forEach((windowEl) => windowEl.classList.remove("is-open"));
    syncLaunchers();
  };

  launcherButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-open-window");
      if (appId) openWindow(appId);
    });
  });

  closers.forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-close-window");
      if (appId) closeWindow(appId);
    });
  });

  minimizers.forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-minimize-window");
      if (appId) closeWindow(appId);
    });
  });

  resetButtons.forEach((button) => {
    button.addEventListener("click", closeAllWindows);
  });

  focusers.forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-focus-window");
      const target = appId ? document.querySelector(`[data-window="${appId}"]`) : null;
      if (target) bringToFront(target);
    });
  });

  windows.forEach((windowEl) => {
    windowEl.addEventListener("pointerdown", () => bringToFront(windowEl));
  });

  windows.forEach((windowEl) => {
    const handle = windowEl.querySelector("[data-drag-handle]");
    if (!handle) return;

    handle.addEventListener("pointerdown", (event) => {
      if (!isDesktopViewport() || event.target.closest("button")) return;

      const startX = event.clientX;
      const startY = event.clientY;
      const originX = Number.parseFloat(windowEl.dataset.x || "0");
      const originY = Number.parseFloat(windowEl.dataset.y || "0");
      let nextX = originX;
      let nextY = originY;
      let frameId = 0;

      bringToFront(windowEl);
      windowEl.classList.add("is-dragging");
      handle.setPointerCapture(event.pointerId);

      const paint = () => {
        frameId = 0;
        setWindowPosition(windowEl, nextX, nextY);
      };

      const schedulePaint = () => {
        if (frameId) return;
        frameId = window.requestAnimationFrame(paint);
      };

      const onMove = (moveEvent) => {
        if (!stage) return;
        const rawX = originX + moveEvent.clientX - startX;
        const rawY = originY + moveEvent.clientY - startY;
        const maxX = Math.max(12, stage.clientWidth - windowEl.offsetWidth - 12);
        const maxY = Math.max(12, stage.clientHeight - windowEl.offsetHeight - 12);

        nextX = clamp(rawX, 12, maxX);
        nextY = clamp(rawY, 12, maxY);
        schedulePaint();
      };

      const cleanup = () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", cleanup);
        handle.removeEventListener("lostpointercapture", cleanup);
        windowEl.classList.remove("is-dragging");
        setWindowPosition(windowEl, nextX, nextY);
      };

      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", cleanup);
      handle.addEventListener("lostpointercapture", cleanup);
    });
  });

  resizeHandles.forEach((handle) => {
    const windowEl = handle.closest("[data-window]");
    if (!windowEl) return;

    handle.addEventListener("pointerdown", (event) => {
      if (!isDesktopViewport()) return;

      const stageRect = stage?.getBoundingClientRect();
      const startWidth = windowEl.offsetWidth;
      const startHeight = windowEl.offsetHeight;
      const startX = event.clientX;
      const startY = event.clientY;
      const baseX = Number.parseFloat(windowEl.dataset.x || "0");
      const baseY = Number.parseFloat(windowEl.dataset.y || "0");
      const minWidth = Number.parseFloat(windowEl.dataset.minWidth || "320");
      const minHeight = Number.parseFloat(windowEl.dataset.minHeight || "240");
      let nextWidth = startWidth;
      let nextHeight = startHeight;
      let frameId = 0;

      bringToFront(windowEl);
      windowEl.classList.add("is-resizing");
      handle.setPointerCapture(event.pointerId);

      const paint = () => {
        frameId = 0;
        windowEl.style.width = `${nextWidth}px`;
        windowEl.style.height = `${nextHeight}px`;
      };

      const schedulePaint = () => {
        if (frameId) return;
        frameId = window.requestAnimationFrame(paint);
      };

      const onMove = (moveEvent) => {
        const maxWidth = stageRect ? stageRect.width - baseX - 12 : startWidth + 1200;
        const maxHeight = stageRect ? stageRect.height - baseY - 12 : startHeight + 1200;
        nextWidth = clamp(startWidth + moveEvent.clientX - startX, minWidth, maxWidth);
        nextHeight = clamp(startHeight + moveEvent.clientY - startY, minHeight, maxHeight);
        schedulePaint();
      };

      const cleanup = () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", cleanup);
        handle.removeEventListener("lostpointercapture", cleanup);
        windowEl.classList.remove("is-resizing");
        windowEl.style.width = `${nextWidth}px`;
        windowEl.style.height = `${nextHeight}px`;
      };

      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", cleanup);
      handle.addEventListener("lostpointercapture", cleanup);
    });
  });

  const blogButtons = Array.from(document.querySelectorAll("[data-blog-target]"));
  const blogFrame = document.querySelector("[data-blog-frame]");
  const blogLists = Array.from(document.querySelectorAll("[data-blog-list]"));
  const blogLocaleButtons = Array.from(document.querySelectorAll("[data-blog-locale-switch]"));
  const blogCopy = {
    zh: { fallback: "/blog" },
    en: { fallback: "/blog/en" }
  };
  let blogLocale = "zh";

  const setBlogTarget = (href) => {
    if (!href || !blogFrame) return;
    blogFrame.setAttribute("src", href);
    blogButtons.forEach((button) => {
      const matchesLocale = button.getAttribute("data-blog-locale") === blogLocale;
      button.classList.toggle(
        "is-active",
        matchesLocale && button.getAttribute("data-blog-target") === href
      );
    });
  };

  const setBlogLocale = (locale) => {
    if (locale !== "zh" && locale !== "en") return;
    blogLocale = locale;
    localStorage.setItem("blog-locale", locale);

    blogLists.forEach((list) => {
      const matches = list.getAttribute("data-blog-list") === locale;
      if (matches) {
        list.removeAttribute("hidden");
      } else {
        list.setAttribute("hidden", "");
      }
    });

    blogLocaleButtons.forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-blog-locale-switch") === locale);
    });

    const currentHref = blogFrame?.getAttribute("src") || "";
    const localeItems = blogButtons.filter(
      (button) => button.getAttribute("data-blog-locale") === locale
    );
    const hasCurrentMatch = localeItems.some(
      (button) => button.getAttribute("data-blog-target") === currentHref
    );
    const nextHref = hasCurrentMatch
      ? currentHref
      : localeItems[0]?.getAttribute("data-blog-target") || blogCopy[locale].fallback;

    setBlogTarget(nextHref);
  };

  blogButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.getAttribute("data-blog-target");
      if (href) setBlogTarget(href);
    });
  });

  blogLocaleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const locale = button.getAttribute("data-blog-locale-switch");
      if (locale) setBlogLocale(locale);
    });
  });

  const updateClock = () => {
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  updateClock();
  syncLaunchers();
  setBlogLocale(localStorage.getItem("blog-locale") === "en" ? "en" : "zh");
  setInterval(updateClock, 1000 * 30);
})();
