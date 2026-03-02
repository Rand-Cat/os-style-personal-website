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

export const collections = {
  blog
};
