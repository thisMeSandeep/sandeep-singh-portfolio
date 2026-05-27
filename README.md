# Sandeep Singh — Portfolio

Personal portfolio and blog for Sandeep Singh, built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). Statically generated, deployed to `https://sandeepnayal.com`.

## Tech stack

- **Astro 6** — static site generation
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- **TypeScript**
- **@astrojs/sitemap** — sitemap generated at build
- Markdown content collections for the blog

## Getting started

```sh
pnpm install
pnpm dev          # local dev server at localhost:4321
```

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm install` | Install dependencies                         |
| `pnpm dev`     | Start the dev server at `localhost:4321`     |
| `pnpm build`   | Build the production site to `./dist/`       |
| `pnpm preview` | Preview the production build locally         |

## Project structure

```text
src/
├── assets/            # images + tech-stack SVG icons
├── components/
│   ├── icons/         # SVG icon components
│   ├── sections/      # homepage sections (Hero, About, Projects, ...)
│   ├── ui/            # reusable cards (BlogCard, ProjectCard, TechIcon)
│   ├── Navbar.astro
│   └── Footer.astro
├── content/blog/      # blog posts as Markdown
├── data/
│   ├── info.ts        # contact + social links
│   └── projects.ts    # project list (drives /projects)
├── layouts/
│   └── Layout.astro   # base layout + all SEO meta tags
├── pages/
│   ├── index.astro    # homepage
│   ├── blogs/         # blog index + [slug] post pages
│   └── projects/      # project index + [slug] detail pages
└── styles/global.css  # theme tokens, light/dark aliases
content.config.ts      # blog collection schema
astro.config.mjs       # site URL + integrations
```

## Adding content

The site is fully static, so new content goes live by committing and pushing — the host (Vercel/Netlify) rebuilds and redeploys automatically.

**New blog post** — add a Markdown file to `src/content/blog/`. Frontmatter must match the schema in `content.config.ts`:

```yaml
---
title: "Post Title"
excerpt: "One-sentence summary used in cards and meta description."
publishedDate: 2026-01-15
readTime: 8
category: "Backend"
tags: ["Node.js", "API Design"]
cover: "https://.../image.jpg"
featured: false
draft: false   # drafts are excluded from the build
---
```

**New project** — add an entry to the `projects` array in `src/data/projects.ts`.

## SEO

SEO lives in `src/layouts/Layout.astro` and applies to every page:

- Canonical URLs, meta description, and author
- Open Graph + Twitter Card tags (per-page title, description, and image)
- `theme-color` for light/dark
- JSON-LD structured data — `Person` on the homepage, `BlogPosting` on posts
- `noindex` prop for pages that should stay out of search

The Layout accepts `title`, `description`, `image`, `type`, `publishedDate`, and `noindex` props, plus a `head` slot for per-page structured data.

Also generated/served:

- `sitemap-index.xml` — via `@astrojs/sitemap` at build
- `public/robots.txt` — allows all crawlers (incl. AI/answer-engine bots) and links the sitemap
- `public/llms.txt` — curated site map for LLMs / answer engines

> **Note:** the canonical base URL is set via `site` in `astro.config.mjs`. The hardcoded `https://sandeepnayal.com` in `robots.txt` and `llms.txt` must be updated if the domain changes.

## Deployment

Static output — deploy the `dist/` folder anywhere. Connecting the GitHub repo to Vercel or Netlify gives automatic rebuilds on every push to `main`. After the first deploy, submit `https://sandeepnayal.com/sitemap-index.xml` to Google Search Console.
