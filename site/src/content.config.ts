import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Markdown copied from the repository root by scripts/sync-content.mjs.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.string(),
    sourceUrl: z.string().url(),
  }),
});

export const collections = { pages };
