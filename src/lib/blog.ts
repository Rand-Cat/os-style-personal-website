import { getCollection, type CollectionEntry } from "astro:content";

export const BLOG_LOCALES = ["zh", "en"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

export const DEFAULT_BLOG_LOCALE: BlogLocale = "zh";

export const BLOG_LANGUAGE_LABELS: Record<BlogLocale, string> = {
  zh: "中文",
  en: "English"
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
  }
> = {
  zh: {
    htmlLang: "zh-CN",
    backToBlog: "← 返回博客",
    moreArticles: "查看更多文章",
    embeddedDescription: "左边选文章，右边直接在窗口内阅读。独立的 `/blog` 入口也继续保留。",
    emptyStateTitle: "还没有文章",
    emptyStateDescription: "这个语言下暂时没有可读内容。"
  },
  en: {
    htmlLang: "en",
    backToBlog: "← Back to blog",
    moreArticles: "Browse more articles",
    embeddedDescription: "Pick an article on the left and read it inside the desktop window. The standalone `/blog` entry still stays available.",
    emptyStateTitle: "No posts yet",
    emptyStateDescription: "There is nothing to read in this locale for now."
  }
};

export type BlogPost = CollectionEntry<"blog">;

export async function getPublishedBlogPosts(locale?: BlogLocale) {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && (!locale || data.locale === locale)
  );

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
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
