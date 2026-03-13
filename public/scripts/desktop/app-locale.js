import { getPreferredBlogLocale } from "../locale-preference.js";

let hasBoundLocaleButtons = false;

const collectRoots = (scope, selector) => {
  if (!(scope instanceof Element) && scope !== document) {
    return [];
  }

  const matches =
    scope instanceof Element && scope.matches(selector)
      ? [scope]
      : [];

  return [...matches, ...Array.from(scope.querySelectorAll(selector))];
};

export function syncAppLocale(scope = document, locale = getPreferredBlogLocale()) {
  const nextLocale = locale === "en" ? "en" : "zh";
  const localeRoots = collectRoots(scope, "[data-app-locale-root]");
  const localizedNameTargets = collectRoots(scope, "[data-localized-name-attrs]");

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
}

export function initAppLocale() {
  const localeButtons = Array.from(document.querySelectorAll("[data-blog-locale-switch]"));
  if (!hasBoundLocaleButtons) {
    localeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        syncAppLocale(document, button.getAttribute("data-blog-locale-switch"));
      });
    });
    hasBoundLocaleButtons = true;
  }

  syncAppLocale();
}
