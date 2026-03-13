import { getPreferredBlogLocale } from "../locale-preference.js";

export function initAppLocale() {
  const localeButtons = Array.from(document.querySelectorAll("[data-blog-locale-switch]"));
  const localeRoots = Array.from(document.querySelectorAll("[data-app-locale-root]"));
  const localizedNameTargets = Array.from(document.querySelectorAll("[data-localized-name-attrs]"));

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

    localizedNameTargets.forEach((element) => {
      const localizedLabel =
        element.getAttribute(`data-localized-name-${nextLocale}`) ||
        element.getAttribute("data-localized-name-zh");
      const attrs = (element.getAttribute("data-localized-name-attrs") || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      if (!localizedLabel || attrs.length === 0) return;

      attrs.forEach((attr) => {
        element.setAttribute(attr, localizedLabel);
      });
    });
  };

  localeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLocale(button.getAttribute("data-blog-locale-switch"));
    });
  });

  applyLocale(getPreferredBlogLocale());
}
