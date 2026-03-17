import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    locale: z.enum(["zh", "en"]),
    translationKey: z.string(),
    draft: z.boolean().default(false)
  })
});

const apps = defineCollection({
  loader: glob({
    base: "./src/content/apps",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, "")
  }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(["zh", "en"]).default("zh"),
    translationKey: z.string().optional(),
    year: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    titleTag: z.string().optional(),
    websiteUrl: z.string().optional(),
    websiteLabel: z.string().optional(),
    heroImage: z.string(),
    heroAlt: z.string(),
    webImage: z.string().optional(),
    webAlt: z.string().optional(),
    extensionImage: z.string().optional(),
    extensionAlt: z.string().optional()
  })
});

export const collections = {
  blog,
  apps
};
