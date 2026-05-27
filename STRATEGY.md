# Blog Migration Strategy — Markdown Content Collection

## Goal

Move blog posts from hardcoded data (`src/data/blogs.ts`) to real Markdown files
authored by us, using Astro's **Content Collections** (Content Layer API, Astro 6).
Projects stay as-is in `src/data/projects.ts` — they are fine.

## Why content collections (not just loose `.md` files)

- **Typed frontmatter** — a Zod schema validates every post at build time, so a
  missing `title` or a malformed date fails the build instead of shipping broken.
- **One query API** — `getCollection("blog")` replaces the `import { blogs }` array;
  the section/list/detail components keep working with minimal changes.
- **Automatic rendering** — Astro compiles Markdown → HTML and gives us a
  `<Content />` component plus reading metadata, so we don't parse anything by hand.

## Current state (what exists today)

| File | Status | Action |
| --- | --- | --- |
| `src/data/blogs.ts` | dummy array, imported by `Blog.astro` | **Remove** after migration |
| `src/content/blog/my-post-title.md` | placeholder ("Hello, dummy text"), no frontmatter | **Delete** / replace |
| `src/pages/blog/index.astro` | empty stub | **Build** the list page |
| `src/pages/blog/[slug].astro` | empty stub | **Build** the detail page |
| `src/components/sections/Blog.astro` | imports `blogs.ts`, shows latest 3 | **Repoint** to collection |
| `src/components/ui/BlogCard.astro` | props-based, fine | **Keep** (maybe extend props) |
| content config | does not exist | **Create** `src/content.config.ts` |

## Plan

### 1. Define the collection schema — `src/content.config.ts`

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedDate: z.coerce.date(),
    readTime: z.number(),          // minutes — or compute it (see §6, optional)
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().url(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Schema fields mirror the existing `blogs.ts` shape so nothing downstream is
surprised. `slug` is **no longer a field** — it comes from the filename (the
glob loader uses the file's path as the entry `id`).

### 2. Author posts as Markdown — `src/content/blog/<slug>.md`

One file per post; the filename is the URL slug. Frontmatter on top, body below:

```md
---
title: "Building Optimistic UI in React Without a Library"
excerpt: "How I made task updates feel instant in TrackFlow..."
publishedDate: 2024-08-14
readTime: 6
category: "Frontend"
tags: ["React", "TypeScript", "UX Patterns"]
cover: "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80"
featured: true
---

## The problem

Real Markdown content goes here...
```

Migrate the 3 existing dummy entries into 3 `.md` files as starter/sample posts,
then delete `my-post-title.md`.

### 3. Homepage section — `src/components/sections/Blog.astro`

Swap the data source; keep the layout/markup identical.

```ts
import { getCollection } from "astro:content";
const posts = (await getCollection("blog", ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf())
  .slice(0, 3);
```

Then map `post.data.*` into `<BlogCard />`, and pass `slug={post.id}`.

### 4. Blog list page — `src/pages/blog/index.astro`

Full archive: `getCollection("blog")`, filter out drafts, sort by date desc,
render with `BlogCard`. Wrap in `Layout.astro`. (Optional: group/filter by
`category` or `tags` later.)

### 5. Blog detail page — `src/pages/blog/[slug].astro`

Static route generated from the collection:

```ts
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
```

Render `post.data` (title, date, cover, tags) into a header, then `<Content />`
for the body. Style the prose with Tailwind utilities (matching existing
`var(--text-*)` / `var(--accent)` tokens) — consistent with our utility-first
approach; avoid introducing a separate dark-mode mechanism.

### 6. Cleanups & nice-to-haves

- Delete `src/data/blogs.ts` and its import once §3 is done.
- Delete the placeholder `src/content/blog/my-post-title.md`.
- **Optional:** drop `readTime` from frontmatter and compute it from word count
  (`remark-reading-time` or a small remark plugin) so we never hand-maintain it.
- **Optional:** add `<meta>`/OpenGraph tags on the detail page using `data.excerpt`
  and `data.cover`.

## Authoring workflow (after migration)

1. Create `src/content/blog/my-new-post.md`.
2. Fill in the frontmatter (validated against the schema on save/build).
3. Write the body in Markdown.
4. `npm run dev` → visit `/blog/my-new-post`. Set `draft: true` to hide WIP posts.

## Migration order (so the site never breaks)

1. Add `src/content.config.ts`.
2. Create the 3 sample `.md` posts.
3. Repoint `Blog.astro` to the collection.
4. Build `blog/index.astro` and `blog/[slug].astro`.
5. Delete `blogs.ts` + placeholder `.md`.
6. `npm run build` to confirm schema validation and routes pass.
```
