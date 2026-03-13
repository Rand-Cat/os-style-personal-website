import { getCollection, type CollectionEntry } from "astro:content";

export const BLOG_LOCALES = ["zh", "en"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

export const DEFAULT_BLOG_LOCALE: BlogLocale = "zh";

export const BLOG_LANGUAGE_LABELS: Record<BlogLocale, string> = {
  zh: "中文",
  en: "English"
};

export const BLOG_LANGUAGE_SWITCH_LABELS: Record<BlogLocale, string> = {
  zh: "中",
  en: "EN"
};

export const BLOG_COPY: Record<
  BlogLocale,
  {
    htmlLang: string;
    backToBlog: string;
    moreArticles: string;
    embeddedDescription: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    missingTranslationTitle: string;
    missingTranslationDescription: (actualLocaleLabel: string) => string;
  }
> = {
  zh: {
    htmlLang: "zh-CN",
    backToBlog: "← 返回博客",
    moreArticles: "查看更多文章",
    embeddedDescription: "左边选文章，右边直接在窗口内阅读。独立的 `/blog` 入口也继续保留。",
    emptyStateTitle: "还没有文章",
    emptyStateDescription: "这个语言下暂时没有可读内容。",
    missingTranslationTitle: "当前语言版本暂未提供",
    missingTranslationDescription: (actualLocaleLabel) => `这篇文章还没有这个语言版本，先显示${actualLocaleLabel}内容。`
  },
  en: {
    htmlLang: "en",
    backToBlog: "← Back to blog",
    moreArticles: "Browse more articles",
    embeddedDescription: "Pick an article on the left and read it inside the desktop window. The standalone `/blog` entry still stays available.",
    emptyStateTitle: "No posts yet",
    emptyStateDescription: "There is nothing to read in this locale for now.",
    missingTranslationTitle: "This translation is not available yet",
    missingTranslationDescription: (actualLocaleLabel) => `Showing the ${actualLocaleLabel} version for now.`
  }
};

export type BlogPost = CollectionEntry<"blog">;

export interface ResolvedBlogPost {
  post: BlogPost;
  actualLocale: BlogLocale;
  isFallback: boolean;
}

export async function getPublishedBlogPosts(locale?: BlogLocale) {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && (!locale || data.locale === locale)
  );

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAllPublishedBlogTranslationKeys() {
  const posts = await getPublishedBlogPosts();
  return [...new Set(posts.map((post) => post.data.translationKey))];
}

export async function resolveBlogPostForLocale(
  locale: BlogLocale,
  translationKey: string
): Promise<ResolvedBlogPost | null> {
  const posts = await getPublishedBlogPosts();
  const matchingPosts = posts.filter((post) => post.data.translationKey === translationKey);

  if (matchingPosts.length === 0) {
    return null;
  }

  const exactMatch = matchingPosts.find((post) => post.data.locale === locale);
  if (exactMatch) {
    return {
      post: exactMatch,
      actualLocale: locale,
      isFallback: false
    };
  }

  const defaultLocaleMatch = matchingPosts.find((post) => post.data.locale === DEFAULT_BLOG_LOCALE);
  const fallbackPost = defaultLocaleMatch || matchingPosts[0];
  return {
    post: fallbackPost,
    actualLocale: fallbackPost.data.locale,
    isFallback: true
  };
}

export function getBlogIndexPath(locale: BlogLocale) {
  return locale === "en" ? "/blog/en" : "/blog";
}

export function getBlogPostPath(locale: BlogLocale, translationKey: string) {
  return locale === "en" ? `/blog/en/${translationKey}` : `/blog/${translationKey}`;
}

export function getBlogEmbedPath(locale: BlogLocale, translationKey: string) {
  return locale === "en" ? `/blog/embed/en/${translationKey}` : `/blog/embed/${translationKey}`;
}

export function formatBlogDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function isBlogLocale(value: string | null | undefined): value is BlogLocale {
  return value === "zh" || value === "en";
}
