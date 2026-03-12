import { getCollection, type CollectionEntry } from "astro:content";

export const APP_LOCALES = ["zh", "en"] as const;
export type AppLocale = (typeof APP_LOCALES)[number];
export const DEFAULT_APP_LOCALE: AppLocale = "zh";

export type AppEntry = CollectionEntry<"apps">;

function getAppStem(entry: AppEntry) {
  return entry.id.replace(/\.(md|mdx)$/, "");
}

function getAppTranslationKey(entry: AppEntry) {
  return entry.data.translationKey ?? getAppStem(entry);
}

export async function getLocalizedAppEntries(id: string) {
  const entries = await getCollection("apps");
  const seedEntry =
    entries.find((entry) => getAppStem(entry) === id) ??
    entries.find((entry) => getAppTranslationKey(entry) === id);

  if (!seedEntry) {
    throw new Error(`App content "${id}" not found`);
  }

  const translationKey = getAppTranslationKey(seedEntry);
  const relatedEntries = entries.filter((entry) => getAppTranslationKey(entry) === translationKey);

  const entriesByLocale = Object.fromEntries(
    APP_LOCALES.map((locale) => {
      const exactMatch = relatedEntries.find((entry) => entry.data.locale === locale);
      return [locale, exactMatch ?? null];
    })
  ) as Record<AppLocale, AppEntry | null>;

  const fallbackEntry = entriesByLocale[DEFAULT_APP_LOCALE] ?? seedEntry;

  return {
    translationKey,
    entriesByLocale,
    fallbackEntry
  };
}
