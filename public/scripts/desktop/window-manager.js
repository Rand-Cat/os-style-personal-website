export function initWindowManager() {
  const stage = document.querySelector("[data-desktop-stage]");
  const windows = Array.from(document.querySelectorAll("[data-window]"));
  const launcherButtons = Array.from(document.querySelectorAll("[data-open-window]"));
  const dock = document.querySelector("[data-dock]");
  const dockButtons = Array.from(document.querySelectorAll("[data-dock-window]"));
  const closers = Array.from(document.querySelectorAll("[data-close-window]"));
  const minimizers = Array.from(document.querySelectorAll("[data-minimize-window]"));
  const maximizers = Array.from(document.querySelectorAll("[data-toggle-maximize-window]"));
  const resizeHandles = Array.from(document.querySelectorAll("[data-resize-handle]"));
  const resetButtons = Array.from(document.querySelectorAll("[data-reset-windows]"));

  let topZ = 20;

  const isDesktopViewport = () => window.matchMedia("(min-width: 981px)").matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const isWindowOpen = (windowEl) => windowEl.classList.contains("is-open");
  const isWindowVisible = (windowEl) =>
    isWindowOpen(windowEl) && !windowEl.classList.contains("is-minimized");

  const getStageMetrics = () => ({
    width: stage?.clientWidth || window.innerWidth,
    height: stage?.clientHeight || window.innerHeight
  });

  const getViewportScale = () => {
    const metrics = getStageMetrics();
    return Math.min(metrics.width / 1360, metrics.height / 900, 1.18);
  };

  const setWindowPosition = (windowEl, x, y) => {
    windowEl.dataset.x = String(x);
    windowEl.dataset.y = String(y);
    windowEl.style.setProperty("--x", `${x}px`);
    windowEl.style.setProperty("--y", `${y}px`);
  };

  const syncAppState = () => {
    launcherButtons.forEach((button) => {
      const appId = button.getAttribute("data-open-window");
      const target = document.querySelector(`[data-window="${appId}"]`);
      button.classList.toggle("is-active", !!target && isWindowOpen(target));
    });

    dockButtons.forEach((button) => {
      const appId = button.getAttribute("data-dock-window");
      const target = document.querySelector(`[data-window="${appId}"]`);
      const isOpen = !!target && isWindowOpen(target);
      const isMinimized = !!target && target.classList.contains("is-minimized");
      const isActive = !!target && target.classList.contains("is-active-window");
      button.classList.toggle("is-open", isOpen);
      button.classList.toggle("is-minimized", isOpen && isMinimized);
      button.classList.toggle("is-active", isActive);
    });

    if (dock) {
      dock.classList.toggle("is-visible", windows.some((windowEl) => isWindowOpen(windowEl)));
    }
  };

  const getTopOpenWindow = () =>
    windows
      .filter((windowEl) => isWindowVisible(windowEl))
      .sort((left, right) => {
        const leftZ = Number.parseInt(left.style.zIndex || "0", 10);
        const rightZ = Number.parseInt(right.style.zIndex || "0", 10);
        return leftZ - rightZ;
      })
      .at(-1) || null;

  const setActiveWindow = (target) => {
    windows.forEach((windowEl) => {
      const isVisible = isWindowVisible(windowEl);
      const isActive = isVisible && windowEl === target;
      windowEl.classList.toggle("is-active-window", isActive);
      windowEl.classList.toggle("is-inactive-window", isVisible && !isActive);
    });
    syncAppState();
  };

  const applyDefaultWindowGeometry = (windowEl, resetPosition = false) => {
    if (!isDesktopViewport()) return;

    const scale = getViewportScale();
    const metrics = getStageMetrics();
    const defaultWidth = Number.parseFloat(windowEl.dataset.defaultWidth || "640");
    const defaultHeight = Number.parseFloat(windowEl.dataset.defaultHeight || "480");
    const defaultX = Number.parseFloat(windowEl.dataset.defaultX || windowEl.dataset.x || "0");
    const defaultY = Number.parseFloat(windowEl.dataset.defaultY || windowEl.dataset.y || "0");
    const minWidth = Number.parseFloat(windowEl.dataset.minWidth || "320");
    const minHeight = Number.parseFloat(windowEl.dataset.minHeight || "240");
    const maxWidth = Math.max(minWidth, metrics.width - 24);
    const maxHeight = Math.max(minHeight, metrics.height - 24);
    const nextWidth = clamp(Math.round(defaultWidth * scale), minWidth, maxWidth);
    const nextHeight = clamp(Math.round(defaultHeight * scale), minHeight, maxHeight);

    windowEl.style.width = `${nextWidth}px`;
    windowEl.style.height = `${nextHeight}px`;

    if (resetPosition) {
      const maxX = Math.max(12, metrics.width - nextWidth - 12);
      const maxY = Math.max(12, metrics.height - nextHeight - 12);
      setWindowPosition(
        windowEl,
        clamp(Math.round(defaultX * scale), 12, maxX),
        clamp(Math.round(defaultY * scale), 12, maxY)
      );
    }
  };

  const restoreWindow = (windowEl) => {
    windowEl.classList.remove("is-minimized");
  };

  const maximizeWindow = (windowEl) => {
    if (!stage || !isDesktopViewport()) return;

    if (windowEl.classList.contains("is-maximized")) {
      windowEl.classList.remove("is-maximized");
      if (windowEl.dataset.restoreWidth) windowEl.style.width = `${windowEl.dataset.restoreWidth}px`;
      if (windowEl.dataset.restoreHeight) windowEl.style.height = `${windowEl.dataset.restoreHeight}px`;
      if (windowEl.dataset.restoreX && windowEl.dataset.restoreY) {
        setWindowPosition(
          windowEl,
          Number.parseFloat(windowEl.dataset.restoreX),
          Number.parseFloat(windowEl.dataset.restoreY)
        );
      }
      return;
    }

    windowEl.dataset.restoreWidth = String(windowEl.offsetWidth);
    windowEl.dataset.restoreHeight = String(windowEl.offsetHeight);
    windowEl.dataset.restoreX = windowEl.dataset.x || "0";
    windowEl.dataset.restoreY = windowEl.dataset.y || "0";

    const nextWidth = Math.max(
      Number.parseFloat(windowEl.dataset.minWidth || "320"),
      stage.clientWidth - 24
    );
    const nextHeight = Math.max(
      Number.parseFloat(windowEl.dataset.minHeight || "240"),
      stage.clientHeight - 24
    );

    windowEl.classList.add("is-maximized");
    windowEl.style.width = `${nextWidth}px`;
    windowEl.style.height = `${nextHeight}px`;
    setWindowPosition(windowEl, 12, 12);
  };

  const bringToFront = (target) => {
    topZ += 1;
    target.style.zIndex = String(topZ);
    setActiveWindow(target);
  };

  const openWindow = (appId) => {
    const target = document.querySelector(`[data-window="${appId}"]`);
    if (!target) return;
    target.classList.add("is-open");
    restoreWindow(target);
    if (!target.dataset.hasOpened) {
      applyDefaultWindowGeometry(target, true);
      target.dataset.hasOpened = "true";
    }
    bringToFront(target);
    syncAppState();
  };

  const closeWindow = (appId) => {
    const target = document.querySelector(`[data-window="${appId}"]`);
    if (!target) return;
    target.classList.remove("is-open", "is-minimized", "is-maximized");
    target.classList.remove("is-active-window", "is-inactive-window");
    setActiveWindow(getTopOpenWindow());
    syncAppState();
  };

  const minimizeWindow = (appId) => {
    const target = document.querySelector(`[data-window="${appId}"]`);
    if (!target || !isWindowOpen(target)) return;
    target.classList.add("is-minimized");
    target.classList.remove("is-active-window", "is-inactive-window");
    setActiveWindow(getTopOpenWindow());
    syncAppState();
  };

  const closeAllWindows = () => {
    windows.forEach((windowEl) => {
      windowEl.classList.remove(
        "is-open",
        "is-active-window",
        "is-inactive-window",
        "is-minimized",
        "is-maximized"
      );
    });
    syncAppState();
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
      if (appId) minimizeWindow(appId);
    });
  });

  dockButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-dock-window");
      const target = appId ? document.querySelector(`[data-window="${appId}"]`) : null;
      if (!appId || !target) return;
      if (!isWindowOpen(target)) {
        openWindow(appId);
        return;
      }
      if (target.classList.contains("is-minimized")) {
        restoreWindow(target);
        bringToFront(target);
        return;
      }
      if (target.classList.contains("is-active-window")) {
        minimizeWindow(appId);
        return;
      }
      bringToFront(target);
    });
  });

  resetButtons.forEach((button) => {
    button.addEventListener("click", closeAllWindows);
  });

  maximizers.forEach((button) => {
    button.addEventListener("click", () => {
      const appId = button.getAttribute("data-toggle-maximize-window");
      const target = appId ? document.querySelector(`[data-window="${appId}"]`) : null;
      if (!target) return;
      restoreWindow(target);
      maximizeWindow(target);
      bringToFront(target);
    });
  });

  windows.forEach((windowEl) => {
    windowEl.addEventListener("pointerdown", () => bringToFront(windowEl));
  });

  windows.forEach((windowEl) => {
    const handle = windowEl.querySelector("[data-drag-handle]");
    if (!handle) return;

    handle.addEventListener("pointerdown", (event) => {
      if (
        !isDesktopViewport() ||
        event.target.closest("button") ||
        windowEl.classList.contains("is-maximized")
      ) {
        return;
      }

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
      if (!isDesktopViewport() || windowEl.classList.contains("is-maximized")) return;

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

  windows.forEach((windowEl) => {
    if (isWindowOpen(windowEl)) {
      applyDefaultWindowGeometry(windowEl, true);
      windowEl.dataset.hasOpened = "true";
    }
  });

  syncAppState();
  setActiveWindow(getTopOpenWindow());
}
