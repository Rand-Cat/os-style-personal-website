export function initDockMagnification() {
  if (window.matchMedia("(max-width: 720px)").matches) return;

  const dockButtons = Array.from(document.querySelectorAll("[data-dock-window]"));
  const dockTray = document.querySelector("[data-dock-tray]");
  const getVisibleDockButtons = () =>
    dockButtons.filter((button) => !button.classList.contains("is-hidden"));

  const resetDockMagnification = () => {
    getVisibleDockButtons().forEach((button) => {
      button.style.setProperty("--dock-scale", "1");
      button.style.setProperty("--dock-slot", "62px");
    });
  };

  if (dockTray) {
    dockTray.addEventListener("pointermove", (event) => {
      getVisibleDockButtons().forEach((button) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(event.clientX - centerX);
        const influence = Math.exp(-Math.pow(distance / 72, 2));
        const shoulder = Math.exp(-Math.pow(distance / 132, 2)) * 0.22;
        const intensity = Math.min(1, influence + shoulder);
        const scale = 1 + intensity * 0.52;
        const slot = 62 + intensity * 18;
        button.style.setProperty("--dock-scale", scale.toFixed(3));
        button.style.setProperty("--dock-slot", `${slot.toFixed(2)}px`);
      });
    });

    dockTray.addEventListener("pointerleave", resetDockMagnification);
  }

  resetDockMagnification();
}
