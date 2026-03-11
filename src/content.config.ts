import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    excerpt: z.string(),
    locale: z.enum(["zh", "en"]),
    translationKey: z.string(),
    draft: z.boolean().default(false)
  })
});

const apps = defineCollection({
  schema: z.object({
    title: z.string(),
    year: z.string().optional(),
    platform: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    websiteUrl: z.string().optional(),
    websiteLabel: z.string().optional(),
    heroImage: z.string(),
    heroAlt: z.string(),
    webImage: z.string(),
    webAlt: z.string(),
    extensionImage: z.string(),
    extensionAlt: z.string()
  })
});

export const collections = {
  blog,
  apps
};
