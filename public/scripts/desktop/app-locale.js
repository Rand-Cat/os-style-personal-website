export function initAppLocale() {
  const localeButtons = Array.from(document.querySelectorAll("[data-blog-locale-switch]"));
  const localeRoots = Array.from(document.querySelectorAll("[data-app-locale-root]"));

  const applyLocale = (locale) => {
    const nextLocale = locale === "en" ? "en" : "zh";

    localeRoots.forEach((root) => {
      const panes = Array.from(root.querySelectorAll("[data-app-locale]"));
      if (!panes.length) return;

      const exactPane = panes.find((pane) => pane.getAttribute("data-app-locale") === nextLocale);
      const fallbackPane = panes.find((pane) => pane.getAttribute("data-app-locale") === "zh") ?? panes[0];
      const activePane = exactPane ?? fallbackPane;

      panes.forEach((pane) => {
        if (pane === activePane) {
          pane.removeAttribute("hidden");
        } else {
          pane.setAttribute("hidden", "");
        }
      });
    });
  };

  localeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLocale(button.getAttribute("data-blog-locale-switch"));
    });
  });

  applyLocale(localStorage.getItem("blog-locale"));
}
