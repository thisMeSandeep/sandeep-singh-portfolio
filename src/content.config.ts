import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedDate: z.coerce.date(),
    readTime: z.number(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.url(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Long-form case study for each project. The markdown file name (its `id`)
// must match a `slug` in src/data/projects.ts — that's how the project detail
// page pairs structured metadata with its written story.
const projectStory = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/project-story" }),
  schema: z.object({
    // Optional one-line hook rendered above the story. All other metadata
    // (title, tagline, tech, links) lives in projects.ts.
    intro: z.string().optional(),
  }),
});

export const collections = { blog, projectStory };
