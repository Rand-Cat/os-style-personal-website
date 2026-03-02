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
    listTitle: string;
    listEyebrow: string;
    listDescription: string;
    readArticle: string;
    backToBlog: string;
    moreArticles: string;
    embeddedDescription: string;
  }
> = {
  zh: {
    htmlLang: "zh-CN",
    listTitle: "一些关于产品、空间感和个人网站表达方式的示例文章。",
    listEyebrow: "Minimal Notes",
    listDescription: "这一页故意做得很安静。没有窗口、没有游戏机制，只保留标题、时间、摘要和阅读入口，让文章自己承担注意力。",
    readArticle: "阅读文章 →",
    backToBlog: "← 返回博客",
    moreArticles: "查看更多文章",
    embeddedDescription: "左边选文章，右边直接在窗口内阅读。独立的 `/blog` 入口也继续保留。"
  },
  en: {
    htmlLang: "en",
    listTitle: "Sample essays on products, spatial interfaces, and how a personal site can feel inhabited.",
    listEyebrow: "Minimal Notes",
    listDescription: "This version stays intentionally quiet. Just titles, dates, summaries, and the writing itself.",
    readArticle: "Read article →",
    backToBlog: "← Back to blog",
    moreArticles: "Browse more articles",
    embeddedDescription: "Pick an article on the left and read it inside the desktop window. The standalone `/blog` entry still stays available."
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
