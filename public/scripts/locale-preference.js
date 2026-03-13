const BLOG_LOCALE_STORAGE_KEY = "blog-locale";

export function isBlogLocale(value) {
  return value === "zh" || value === "en";
}

export function getStoredBlogLocale() {
  const storedLocale = localStorage.getItem(BLOG_LOCALE_STORAGE_KEY);
  return isBlogLocale(storedLocale) ? storedLocale : null;
}

export function detectBrowserBlogLocale() {
  const preferredLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const language of preferredLanguages) {
    const normalized = String(language || "").toLowerCase();
    if (normalized.startsWith("zh")) return "zh";
    if (normalized.startsWith("en")) return "en";
  }

  return "zh";
}

export function getPreferredBlogLocale() {
  return getStoredBlogLocale() ?? detectBrowserBlogLocale();
}

export function ensureBlogLocalePreference() {
  const storedLocale = getStoredBlogLocale();
  if (storedLocale) return storedLocale;

  const detectedLocale = detectBrowserBlogLocale();
  localStorage.setItem(BLOG_LOCALE_STORAGE_KEY, detectedLocale);
  return detectedLocale;
}

export function setBlogLocalePreference(locale) {
  const nextLocale = locale === "en" ? "en" : "zh";
  localStorage.setItem(BLOG_LOCALE_STORAGE_KEY, nextLocale);
  return nextLocale;
}
