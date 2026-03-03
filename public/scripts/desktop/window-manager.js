export function initWindowManager() {
  const desktopPage = document.querySelector(".desktop-page");
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
  const isGroupWindow = (windowEl) => windowEl.classList.contains("os-window--group");

  const getStageMetrics = () => ({
    width: stage?.clientWidth || window.innerWidth,
    height: stage?.clientHeight || window.innerHeight
  });

  const getViewportScale = () => {
    const metrics = getStageMetrics();
    return Math.min(metrics.width / 1360, metrics.height / 900, 1.18);
  };

  const releasePointerCapture = (target, pointerId) => {
    if (
      !target ||
      typeof target.releasePointerCapture !== "function" ||
      typeof target.hasPointerCapture !== "function" ||
      !target.hasPointerCapture(pointerId)
    ) {
      return;
    }

    target.releasePointerCapture(pointerId);
  };

  const setWindowPosition = (windowEl, x, y) => {
    windowEl.dataset.x = String(x);
    windowEl.dataset.y = String(y);
    windowEl.style.setProperty("--x", `${x}px`);
    windowEl.style.setProperty("--y", `${y}px`);
  };

  const getLauncherButton = (appId) =>
    launcherButtons.find((button) => button.getAttribute("data-open-window") === appId) || null;

  const getGroupAnimationParts = (windowEl, appId) => {
    const launcher = getLauncherButton(appId);
    const source = launcher?.querySelector(".desktop-icon__plate") || launcher;
    const overlay = windowEl.querySelector("[data-group-overlay]");
    const panel = windowEl.querySelector("[data-group-panel]");
    const stack = windowEl.querySelector("[data-group-stack]");
    if (!source || !overlay || !panel || !stack) return null;
    return { source, overlay, panel, stack };
  };

  const animateGroupOpen = (windowEl, appId) => {
    const parts = getGroupAnimationParts(windowEl, appId);
    if (!parts) return;

    const { source, overlay, panel, stack } = parts;
    const sourceRect = source.getBoundingClientRect();
    const panelRect = stack.getBoundingClientRect();
    const sourceCenterX = sourceRect.left + sourceRect.width / 2;
    const sourceCenterY = sourceRect.top + sourceRect.height / 2;
    const panelCenterX = panelRect.left + panelRect.width / 2;
    const panelCenterY = panelRect.top + panelRect.height / 2;
    const offsetX = sourceCenterX - panelCenterX;
    const offsetY = sourceCenterY - panelCenterY;
    const scale = Math.max(0.08, Math.min(0.3, sourceRect.width / panelRect.width));

    overlay.getAnimations().forEach((animation) => animation.cancel());
    stack.getAnimations().forEach((animation) => animation.cancel());

    overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 220,
      easing: "ease-out",
      fill: "forwards"
    });

    stack.animate(
      [
        {
          opacity: 0.18,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
        },
        {
          opacity: 1,
          transform: "translate(0, 0) scale(1)"
        }
      ],
      {
        duration: 320,
        easing: "cubic-bezier(0.2, 0.9, 0.24, 1)",
        fill: "forwards"
      }
    );
  };

  const animateGroupClose = (windowEl, appId, onFinish) => {
    const parts = getGroupAnimationParts(windowEl, appId);
    if (!parts) {
      onFinish();
      return;
    }

    const { source, overlay, panel, stack } = parts;
    const sourceRect = source.getBoundingClientRect();
    const panelRect = stack.getBoundingClientRect();
    const sourceCenterX = sourceRect.left + sourceRect.width / 2;
    const sourceCenterY = sourceRect.top + sourceRect.height / 2;
    const panelCenterX = panelRect.left + panelRect.width / 2;
    const panelCenterY = panelRect.top + panelRect.height / 2;
    const offsetX = sourceCenterX - panelCenterX;
    const offsetY = sourceCenterY - panelCenterY;
    const scale = Math.max(0.08, Math.min(0.3, sourceRect.width / panelRect.width));

    overlay.getAnimations().forEach((animation) => animation.cancel());
    stack.getAnimations().forEach((animation) => animation.cancel());

    const overlayAnimation = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 180,
      easing: "ease-in",
      fill: "forwards"
    });

    const panelAnimation = stack.animate(
      [
        {
          opacity: 1,
          transform: "translate(0, 0) scale(1)"
        },
        {
          opacity: 0.1,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
        }
      ],
      {
        duration: 220,
        easing: "cubic-bezier(0.55, 0, 0.8, 0.2)",
        fill: "forwards"
      }
    );

    Promise.allSettled([overlayAnimation.finished, panelAnimation.finished]).finally(onFinish);
  };

  const syncImmersiveState = (activeWindow = null) => {
    const isImmersive = !!activeWindow?.classList.contains("is-maximized");
    const hasOpenGroup = windows.some(
      (windowEl) => isWindowVisible(windowEl) && windowEl.classList.contains("os-window--group")
    );
    desktopPage?.classList.toggle("is-immersive", isImmersive);
    desktopPage?.classList.toggle("is-group-open", hasOpenGroup);
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
      const isPinned = button.getAttribute("data-dock-pinned") === "true";
      button.classList.toggle("is-open", isOpen);
      button.classList.toggle("is-minimized", isOpen && isMinimized);
      button.classList.toggle("is-active", isActive);
      button.classList.toggle("is-hidden", !isPinned && !isOpen);
    });

    if (dock) {
      dock.classList.toggle(
        "is-visible",
        dockButtons.some((button) => !button.classList.contains("is-hidden"))
      );
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
    syncImmersiveState(target);
    syncAppState();
  };

  const applyDefaultWindowGeometry = (windowEl, resetPosition = false) => {
    if (!isDesktopViewport()) return;

    const scale = getViewportScale();
    const metrics = getStageMetrics();
    const defaultWidth = Number.parseFloat(windowEl.dataset.defaultWidth || "640");
    const defaultHeight = Number.parseFloat(windowEl.dataset.defaultHeight || "480");
    const minWidth = Number.parseFloat(windowEl.dataset.minWidth || "320");
    const minHeight = Number.parseFloat(windowEl.dataset.minHeight || "240");
    const maxWidth = Math.max(minWidth, metrics.width - 24);
    const maxHeight = Math.max(minHeight, metrics.height - 24);
    const nextWidth = clamp(Math.round(defaultWidth * scale), minWidth, maxWidth);
    const nextHeight = clamp(Math.round(defaultHeight * scale), minHeight, maxHeight);

    windowEl.style.width = `${nextWidth}px`;
    windowEl.style.height = `${nextHeight}px`;

    if (resetPosition) {
      const centerX = Math.round((metrics.width - nextWidth) / 2);
      const centerY = Math.round((metrics.height - nextHeight) / 2);
      const visibleCount = windows.filter(
        (item) => item !== windowEl && isWindowVisible(item) && !item.classList.contains("is-maximized")
      ).length;
      const offsets = [
        { x: 0, y: 0 },
        { x: 28, y: 24 },
        { x: -28, y: 24 },
        { x: 54, y: 48 },
        { x: -54, y: 48 },
        { x: 0, y: 72 }
      ];
      const offset = offsets[visibleCount % offsets.length];
      const maxX = Math.max(12, metrics.width - nextWidth - 12);
      const maxY = Math.max(12, metrics.height - nextHeight - 12);
      setWindowPosition(
        windowEl,
        clamp(centerX + offset.x, 12, maxX),
        clamp(centerY + offset.y, 12, maxY)
      );
    }
  };

  const restoreWindow = (windowEl) => {
    windowEl.classList.remove("is-minimized");
  };

  const maximizeWindow = (windowEl) => {
    if (!isDesktopViewport()) return;

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
      window.innerWidth
    );
    const nextHeight = Math.max(
      Number.parseFloat(windowEl.dataset.minHeight || "240"),
      window.innerHeight
    );

    windowEl.classList.add("is-maximized");
    windowEl.style.width = `${nextWidth}px`;
    windowEl.style.height = `${nextHeight}px`;
    setWindowPosition(windowEl, 0, 0);
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
    if (isGroupWindow(target)) {
      bringToFront(target);
      requestAnimationFrame(() => animateGroupOpen(target, appId));
      syncAppState();
      return;
    }
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
    if (isGroupWindow(target) && isWindowOpen(target)) {
      animateGroupClose(target, appId, () => {
        target.classList.remove("is-open", "is-minimized", "is-maximized");
        target.classList.remove("is-active-window", "is-inactive-window");
        setActiveWindow(getTopOpenWindow());
        syncAppState();
      });
      return;
    }
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
    syncImmersiveState(null);
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
    if (!windowEl.classList.contains("os-window--group")) return;

    windowEl.addEventListener("click", (event) => {
      if (event.target.closest("[data-group-panel]")) return;
      const appId = windowEl.getAttribute("data-window");
      if (appId) closeWindow(appId);
    });
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
      const pointerId = event.pointerId;
      const originX = Number.parseFloat(windowEl.dataset.x || "0");
      const originY = Number.parseFloat(windowEl.dataset.y || "0");
      let nextX = originX;
      let nextY = originY;
      let frameId = 0;
      let isCleaningUp = false;

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
        if (moveEvent.pointerId !== pointerId || !stage) return;
        const rawX = originX + moveEvent.clientX - startX;
        const rawY = originY + moveEvent.clientY - startY;
        const maxX = Math.max(12, stage.clientWidth - windowEl.offsetWidth - 12);
        const maxY = Math.max(12, stage.clientHeight - windowEl.offsetHeight - 12);

        nextX = clamp(rawX, 12, maxX);
        nextY = clamp(rawY, 12, maxY);
        schedulePaint();
      };

      const cleanup = () => {
        if (isCleaningUp) return;
        isCleaningUp = true;
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", cleanup);
        window.removeEventListener("pointercancel", cleanup);
        window.removeEventListener("blur", cleanup);
        handle.removeEventListener("lostpointercapture", cleanup);
        releasePointerCapture(handle, pointerId);
        windowEl.classList.remove("is-dragging");
        setWindowPosition(windowEl, nextX, nextY);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", cleanup);
      window.addEventListener("pointercancel", cleanup);
      window.addEventListener("blur", cleanup);
      handle.addEventListener("lostpointercapture", cleanup);
    });
  });

  resizeHandles.forEach((handle) => {
    const windowEl = handle.closest("[data-window]");
    if (!windowEl) return;

    handle.addEventListener("pointerdown", (event) => {
      if (!isDesktopViewport() || windowEl.classList.contains("is-maximized")) return;

      const direction = handle.getAttribute("data-resize-direction") || "se";
      const stageRect = stage?.getBoundingClientRect();
      const startWidth = windowEl.offsetWidth;
      const startHeight = windowEl.offsetHeight;
      const startX = event.clientX;
      const startY = event.clientY;
      const pointerId = event.pointerId;
      const baseX = Number.parseFloat(windowEl.dataset.x || "0");
      const baseY = Number.parseFloat(windowEl.dataset.y || "0");
      const minWidth = Number.parseFloat(windowEl.dataset.minWidth || "320");
      const minHeight = Number.parseFloat(windowEl.dataset.minHeight || "240");
      const minX = 12;
      const minY = 12;
      const maxRight = stageRect ? stageRect.width - 12 : window.innerWidth - 12;
      const maxBottom = stageRect ? stageRect.height - 12 : window.innerHeight - 12;
      const fixedRight = baseX + startWidth;
      const fixedBottom = baseY + startHeight;
      let nextX = baseX;
      let nextY = baseY;
      let nextWidth = startWidth;
      let nextHeight = startHeight;
      let frameId = 0;
      let isCleaningUp = false;

      bringToFront(windowEl);
      windowEl.classList.add("is-resizing");
      handle.setPointerCapture(event.pointerId);

      const paint = () => {
        frameId = 0;
        setWindowPosition(windowEl, nextX, nextY);
        windowEl.style.width = `${nextWidth}px`;
        windowEl.style.height = `${nextHeight}px`;
      };

      const schedulePaint = () => {
        if (frameId) return;
        frameId = window.requestAnimationFrame(paint);
      };

      const onMove = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        nextX = baseX;
        nextY = baseY;
        nextWidth = startWidth;
        nextHeight = startHeight;

        if (direction.includes("e")) {
          const maxWidth = Math.max(minWidth, maxRight - baseX);
          nextWidth = clamp(startWidth + deltaX, minWidth, maxWidth);
        }

        if (direction.includes("s")) {
          const maxHeight = Math.max(minHeight, maxBottom - baseY);
          nextHeight = clamp(startHeight + deltaY, minHeight, maxHeight);
        }

        if (direction.includes("w")) {
          nextX = clamp(baseX + deltaX, minX, fixedRight - minWidth);
          nextWidth = fixedRight - nextX;
        }

        if (direction.includes("n")) {
          nextY = clamp(baseY + deltaY, minY, fixedBottom - minHeight);
          nextHeight = fixedBottom - nextY;
        }

        schedulePaint();
      };

      const cleanup = () => {
        if (isCleaningUp) return;
        isCleaningUp = true;
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", cleanup);
        window.removeEventListener("pointercancel", cleanup);
        window.removeEventListener("blur", cleanup);
        handle.removeEventListener("lostpointercapture", cleanup);
        releasePointerCapture(handle, pointerId);
        windowEl.classList.remove("is-resizing");
        setWindowPosition(windowEl, nextX, nextY);
        windowEl.style.width = `${nextWidth}px`;
        windowEl.style.height = `${nextHeight}px`;
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", cleanup);
      window.addEventListener("pointercancel", cleanup);
      window.addEventListener("blur", cleanup);
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
