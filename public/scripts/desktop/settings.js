export function initDesktopSettings() {
  const desktopPage = document.querySelector("[data-desktop-wallpaper]");
  const wallpaperButtons = Array.from(document.querySelectorAll("[data-wallpaper-option]"));
  const wallpaperUpload = document.querySelector("[data-wallpaper-upload]");
  const resetWallpaperButton = document.querySelector("[data-reset-wallpaper]");
  const wallpaperStatus = document.querySelector("[data-wallpaper-status]");
  const storageKey = "desktop-wallpaper";
  const validWallpapers = new Set(["paper", "dawn", "ink"]);
  let customWallpaperUrl = "";

  if (!desktopPage || wallpaperButtons.length === 0) return;

  const setStatus = (message) => {
    if (wallpaperStatus) wallpaperStatus.textContent = message;
  };

  const applyWallpaper = (wallpaper) => {
    const hasCustomWallpaper = customWallpaperUrl.length > 0;
    const nextWallpaper =
      wallpaper === "custom" && hasCustomWallpaper
        ? "custom"
        : validWallpapers.has(wallpaper)
          ? wallpaper
          : "paper";

    desktopPage.setAttribute("data-desktop-wallpaper", nextWallpaper);

    if (nextWallpaper === "custom" && hasCustomWallpaper) {
      desktopPage.style.setProperty(
        "--desktop-custom-wallpaper",
        `url("${customWallpaperUrl}")`
      );
      setStatus("Custom image active.");
    } else {
      desktopPage.style.removeProperty("--desktop-custom-wallpaper");
      setStatus(
        hasCustomWallpaper
          ? "Custom image ready for this session. Choose image to replace it."
          : "No custom image selected."
      );
    }

    wallpaperButtons.forEach((button) => {
      const isActive = button.getAttribute("data-wallpaper-option") === nextWallpaper;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  wallpaperButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const wallpaper = button.getAttribute("data-wallpaper-option") || "paper";
      localStorage.setItem(storageKey, wallpaper);
      applyWallpaper(wallpaper);
    });
  });

  wallpaperUpload?.addEventListener("change", () => {
    const file = wallpaperUpload.files?.[0];
    if (!file) return;

    if (customWallpaperUrl) {
      URL.revokeObjectURL(customWallpaperUrl);
    }

    customWallpaperUrl = URL.createObjectURL(file);
    applyWallpaper("custom");
  });

  resetWallpaperButton?.addEventListener("click", () => {
    if (customWallpaperUrl) {
      URL.revokeObjectURL(customWallpaperUrl);
    }
    customWallpaperUrl = "";
    if (wallpaperUpload) wallpaperUpload.value = "";
    applyWallpaper("paper");
  });

  applyWallpaper(localStorage.getItem(storageKey) || desktopPage.getAttribute("data-desktop-wallpaper") || "paper");
}
