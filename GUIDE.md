# Portfolio Homepage — Claude Code Build Guide

## Overview

You are building a developer portfolio homepage using **Astro** with **Tailwind CSS v4**.
This document is your complete guide. Follow it exactly — do not make design decisions
not covered here. When in doubt, default to simpler and cleaner.

---

## Project Structure

The existing `src/` directory looks like this:

```
src/
├── assets/
│   └── tech-icons/        ← SVG tech skill icons (react.svg, typescript.svg, etc.)
├── components/
│   └── icons/             ← Heroicon SVG components (.astro files)
├── content/
├── data/
│   ├── projects.ts        ← Plain array of project objects
│   └── blogs.ts           ← Plain array of blog post objects
├── layouts/
├── pages/
│   ├── index.astro        ← Homepage (build this)
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
└── styles/
    └── global.css         ← Design tokens already defined here (DO NOT modify)
```

---

## Components to Create

Create each of these as a **separate `.astro` file** inside `src/components/`.
One file per section. No exceptions.

```
src/components/
├── Navbar.astro
├── Footer.astro
├── sections/
│   ├── Hero.astro
│   ├── About.astro
│   ├── Skills.astro
│   ├── Experience.astro
│   ├── Projects.astro
│   ├── Freelance.astro
│   ├── Blog.astro
│   └── Contact.astro
└── ui/
    ├── ProjectCard.astro
    ├── BlogCard.astro
    └── TechIcon.astro
```

---

## Homepage Assembly — `pages/index.astro`

Import and assemble all sections in this exact order:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/sections/Hero.astro';
import About from '../components/sections/About.astro';
import Skills from '../components/sections/Skills.astro';
import Experience from '../components/sections/Experience.astro';
import Projects from '../components/sections/Projects.astro';
import Freelance from '../components/sections/Freelance.astro';
import Blog from '../components/sections/Blog.astro';
import Contact from '../components/sections/Contact.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Freelance />
    <Blog />
    <Contact />
  </main>
  <Footer />
</BaseLayout>
```

---

## Layout — `layouts/BaseLayout.astro`

Create a `BaseLayout.astro` that:
- Imports `global.css`
- Sets `<html lang="en">` with class `light` by default
- Adds a dark mode toggle script in `<head>` that reads from `localStorage`
  and applies `.dark` class to `<html>`
- Sets basic meta tags: charset, viewport, title, description

```astro
---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = "Your Name — Full Stack Developer",
  description = "Full stack and mobile developer building clean, fast products."
} = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="stylesheet" href="/src/styles/global.css" />
    <script is:inline>
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    </script>
  </head>
  <body style="background: var(--bg); color: var(--text-2);">
    <slot />
  </body>
</html>
```

---

## Design System Rules

**Read this before writing a single line of CSS or HTML.**

### Colors
Never use hardcoded hex values. Always use CSS custom properties defined in `global.css`.

| Use case | Variable |
|---|---|
| Page background | `var(--bg)` |
| Card / surface background | `var(--bg-2)` |
| Subtle background tint | `var(--bg-3)` |
| Hover background | `var(--bg-hover)` |
| Primary text (headings) | `var(--text-1)` |
| Body text | `var(--text-2)` |
| Meta text (dates, labels) | `var(--text-3)` |
| Disabled / placeholder | `var(--text-muted)` |
| Default border | `var(--border)` |
| Subtle border | `var(--border-subtle)` |
| Hover border | `var(--border-strong)` |
| Accent color (links, CTAs) | `var(--accent)` |
| Accent hover | `var(--accent-hover)` |
| Accent tint background | `var(--accent-subtle)` |
| Tag background | `var(--tag-bg)` |
| Tag text | `var(--tag-text)` |

### Typography
- `h1`, `h2`, `h3` — serif font via `font-family: var(--font-serif)`
- `h4`, `h5`, `h6`, body, nav — sans-serif via `font-family: var(--font-sans)`
- Code — `font-family: var(--font-mono)`
- Never go below `14px` font size anywhere
- Section headings use `var(--text-3xl)` or `var(--text-4xl)`
- Body copy uses `var(--text-base)` with `line-height: var(--leading-normal)`
- Eyebrow labels use `var(--text-xs)`, uppercase, wide letter-spacing

### Spacing
- Between major sections: `padding-block: var(--section-gap)` — which is `6rem`
- Between content blocks within a section: `gap: var(--content-gap)` — `2.5rem`
- Page horizontal padding: `padding-inline: 1.5rem` on mobile, `padding-inline: 2rem` on desktop
- Max width container: `max-width: var(--max-w-layout)` centered with `margin-inline: auto`

### Borders
- Hairline only: `1px solid var(--border)` or `1px solid var(--border-subtle)`
- Never use borders thicker than `1px`
- Section dividers: `border-top: 1px solid var(--border)`

### Shadows
- No shadows by default
- On card hover only: `box-shadow: var(--shadow)`

### Transitions
- All hover effects: `transition: all var(--transition)` — which is `200ms ease`
- No animation libraries. No keyframe animations. CSS transitions only.
- Hover effects are subtle — color shifts, border color change, whisper shadow lift

### Forbidden
- No gradients of any kind
- No borders thicker than 1px
- No heavy box shadows
- No animation libraries (no Framer Motion, no GSAP)
- No hardcoded color values
- No inline styles except where a CSS variable must be applied directly

---

## Section-by-Section Guide

---

### 1. `Navbar.astro`

**Layout:** Horizontal bar. Name/logo on the left. Nav links on the right.

**Behavior:**
- Sticky — `position: sticky; top: 0; z-index: 50`
- Background: `var(--bg)` with `border-bottom: 1px solid var(--border-subtle)`
- On scroll, add a subtle `backdrop-filter: blur(8px)` via a JS scroll listener
  that adds a `.scrolled` class to the nav

**Links:** Work, Blog, About, Contact
- Each is a smooth scroll anchor link: `href="#work"`, `href="#blog"`, etc.
- Style: `color: var(--text-3)` default, `color: var(--text-1)` on hover
- "Contact" link is visually distinct: `border-bottom: 1px solid var(--text-1)`

**Dark mode toggle:**
- A small button on the far right of the nav
- Uses a sun/moon SVG icon from `components/icons/`
- On click: toggles `.dark` class on `<html>` and saves to `localStorage`

**Mobile:**
- Below `768px`: hide nav links, show hamburger icon
- Hamburger opens a full-width overlay with links stacked vertically
- Overlay background: `var(--bg)`, close with X icon

---

### 2. `Hero.astro`

**Layout:** Two-column. Left: main content. Right: info panel.

**Left column (60% width):**
- Large serif headline — `var(--text-5xl)` or `var(--text-6xl)`, tight leading
- Subheading — role description, `var(--text-lg)`, `var(--text-2)`
- Short bio — 2–3 lines, `var(--text-base)`, `var(--text-2)`
- Availability badge — small pill: "Available for work" or "Open to freelance"
  Background: `var(--accent-subtle)`, text: `var(--accent)`, `var(--text-sm)`
- CTA link — "View my work →" using `.link-arrow` class from global.css

**Right column (40% width):**
- Three info rows, each with a small label above and value below
- Label: `var(--text-xs)`, uppercase, `var(--text-3)`, wide letter-spacing
- Value: `var(--text-base)`, `var(--text-1)`
- Separated by `border-top: 1px solid var(--border)`
- Content: Based in [City], Focus [your stack], Available for [type of work]

**Bottom:** `border-bottom: 1px solid var(--border)` as section divider

**Data:** Hardcode the personal info directly in this component. It does not come from a data file.

---

### 3. `About.astro`

**Layout:** Two-column, matching the mockup reference.

**Left column (45% width):**
- Eyebrow label: "ABOUT" — `.label-eyebrow` class
- Large serif statement heading — 3–4 lines, `var(--text-3xl)`, tight leading
  Example: "I care about the details most people never see."

**Right column (55% width):**
- Two short paragraphs, `var(--text-base)`, `var(--text-2)`, relaxed line-height
- "More about me →" link using `.link-arrow` class

**Section:** `id="about"`, `padding-block: var(--section-gap)`
`border-bottom: 1px solid var(--border)`

---

### 4. `Skills.astro`

**Layout:** Full width. Eyebrow + heading, then grouped skill rows below.

**Structure:**
- Eyebrow: "SKILLS" — `.label-eyebrow`
- Section heading: `var(--text-2xl)`, serif

**Skill groups:** Four groups — Frontend, Backend, Mobile, Tools & DevOps
- Each group has a small label: `var(--text-xs)`, `var(--text-3)`, uppercase
- Below the label: a horizontal flex-wrap row of skill items

**Each skill item (`TechIcon.astro`):**
- SVG icon imported from `src/assets/tech-icons/[name].svg`
- Icon size: `32px × 32px`
- Tech name below icon: `var(--text-xs)`, `var(--text-3)`
- Container: `display: flex; flex-direction: column; align-items: center; gap: 6px`
- Hover: icon opacity goes from `0.7` to `1.0`, text color shifts to `var(--text-1)`
- Transition: `var(--transition)`
- No borders, no cards, no backgrounds around individual icons

**`TechIcon.astro` props:**
```astro
---
interface Props {
  name: string;    // display name e.g. "React"
  icon: string;    // filename e.g. "react" (without .svg)
}
---
```

**Section:** `id="skills"`, `padding-block: var(--section-gap)`
`border-bottom: 1px solid var(--border)`

---

### 5. `Experience.astro`

**Layout:** Two-column. Left: timeline. Right: GitHub contribution graph.

**Left column — Timeline:**
- Eyebrow: "EXPERIENCE" — `.label-eyebrow`
- Section heading: `var(--text-2xl)`, serif

Two work entries. Each entry:
- Company name: `var(--text-xl)`, `var(--text-1)`, `font-weight: 500`
- Role + dates on the same line: role left, dates right, `var(--text-sm)`, `var(--text-3)`
- Thin `border-left: 1px solid var(--border)` as timeline line, `padding-left: 1.25rem`
- 2–3 achievement bullet points: `var(--text-sm)`, `var(--text-2)`
- Gap between the two entries: `var(--content-gap)`

**Right column — GitHub Graph:**
- Heading: "Contributions" — `var(--text-sm)`, `var(--text-3)`
- Fetch contribution data from GitHub API at build time using Astro's `fetch()`
  in the component frontmatter
- 
  (This is a free, no-auth public API that returns contribution data)
- Render as an SVG grid of small squares — 53 columns (weeks) × 7 rows (days)
- Square size: `10px`, gap: `2px`
- Color scale based on contribution count:
  - 0 contributions: `var(--bg-3)`
  - 1–3: `var(--accent-subtle)` tinted slightly stronger
  - 4–6: `var(--accent)` at `0.4` opacity
  - 7–9: `var(--accent)` at `0.7` opacity
  - 10+: `var(--accent)` full opacity
- No border, no card around the graph — just the raw grid

**Section:** `id="experience"`, `padding-block: var(--section-gap)`
`border-bottom: 1px solid var(--border)`

---

### 6. `Projects.astro`

**Import:**
```astro
---
import { projects } from '../../data/projects.ts';
import ProjectCard from '../ui/ProjectCard.astro';
const featured = projects.filter(p => p.featured);
---
```

**Layout:**
- Eyebrow: "FEATURED WORK" — `.label-eyebrow`
- Heading row: heading on left, "See all projects →" link on right (same baseline)
- Below: bento grid

**Bento Grid:**
CSS Grid layout — 2 columns on desktop, 1 column on mobile.

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
```

Card sizing via `bentoSize` prop on each project object:
- `"large"` → `grid-column: span 2` — full width card, landscape image
- `"medium"` → `grid-column: span 1` — standard card
- `"small"` → `grid-column: span 1` — same as medium for a 2-col grid

Suggested layout for 4 projects:
```
[ large card — spans full width        ]
[ medium card      ] [ medium card     ]
[ small card — spans full width        ]
```
Adjust based on your actual `bentoSize` values in the data.
URL: `https://github-contributions-api.jogruber.de/v4/thisMeSandeep?y=last`
**`ProjectCard.astro` props:**
```astro
---
interface Props {
  title: string;
  tagline: string;
  category: string;
  cover: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  slug: string;
  bentoSize: 'large' | 'medium' | 'small';
}
---
```

**Card anatomy (top to bottom):**
1. Cover image — `width: 100%`, `aspect-ratio: 16/9` for large, `4/3` for medium
   `object-fit: cover`, `border-radius: var(--border-radius-md)`
   `border-bottom: 1px solid var(--border-subtle)`
2. Card body with `padding: 1.25rem`
3. Category label — `.label-eyebrow`, `var(--text-3)`
4. Project title — `var(--text-xl)`, `var(--text-1)`, serif, `font-weight: 500`
5. Tagline — `var(--text-sm)`, `var(--text-2)`
6. Tech tags row — uses `.tag` class from global.css, flex-wrap
7. Bottom row — "View case study →" link using `.link-arrow` class

**Card hover:**
```css
.project-card {
  background: var(--bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.project-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
}
```

**Section:** `id="work"`, `padding-block: var(--section-gap)`
`border-bottom: 1px solid var(--border)`

---

### 7. `Freelance.astro`

**Layout:** Two-column.

**Left column:**
- Eyebrow: "FREELANCE" — `.label-eyebrow`
- Heading: `var(--text-2xl)`, serif
- Short paragraph: what you offer and who you work with

Four service lines — each is just an icon + text row:
- Web Application Development
- Mobile App Development (React Native)
- REST API & Backend Systems
- Full-Stack Product Development

Each row:
- Small Heroicon on the left (`16px`)
- Service name: `var(--text-base)`, `var(--text-1)`
- `padding-block: 0.75rem`
- `border-bottom: 1px solid var(--border-subtle)` between rows

**Right column:**
- Small heading: "My process" — `var(--text-sm)`, `var(--text-3)`, uppercase
- 3–4 process steps, numbered, `var(--text-sm)`, `var(--text-2)`

Below the process:
- Small heading: "Find me on" — `var(--text-sm)`, `var(--text-3)`, uppercase
- Freelance platform links — each on its own row:
  - Platform icon (use inline SVG or img) + platform name + "View profile →"
  - Hover: `color: var(--accent)`
  - Examples: Upwork, Fiverr, or whichever platforms you use

**Section:** `id="freelance"`, `padding-block: var(--section-gap)`
`border-bottom: 1px solid var(--border)`

---

### 8. `Blog.astro`

**Import:**
```astro
---
import { blogs } from '../../data/blogs.ts';
import BlogCard from '../ui/BlogCard.astro';
const latest = blogs.slice(0, 3);
---
```

**Layout:**
- Eyebrow: "LATEST WRITING" — `.label-eyebrow`
- Heading row: heading on left, "Read all articles →" link on right
- Three-column grid below: `grid-template-columns: repeat(3, 1fr)`, `gap: 2rem`
- On mobile: single column

**`BlogCard.astro` anatomy (top to bottom):**
1. Date — `var(--text-xs)`, `var(--text-3)`
2. Title — `var(--text-xl)`, `var(--text-1)`, serif, `line-height: var(--leading-snug)`
3. Excerpt — `var(--text-sm)`, `var(--text-2)`, 2–3 lines max
4. "Read article →" using `.link-arrow` class
- No card border, no background — cards sit directly on page background
- Subtle `border-top: 1px solid var(--border-subtle)` at the top of each card
- Hover on title: `color: var(--accent)`

**Section:** `id="blog"`, `padding-block: var(--section-gap)`
`border-bottom: 1px solid var(--border)`

---

### 9. `Contact.astro`

**Layout:** Single column, centered or left-aligned. Clean and minimal.

**Content:**
- Eyebrow: "CONTACT" — `.label-eyebrow`
- Heading: `var(--text-3xl)`, serif — something warm like "Let's work together."
- Short one-liner below: `var(--text-base)`, `var(--text-2)`

Three contact rows. Each row:
- Heroicon on the left (`20px`, `var(--text-3)`)
- Label: `var(--text-sm)`, `var(--text-3)` — e.g. "Phone", "Email", "Project enquiry"
- Value/link: `var(--text-base)`, `var(--text-1)`
- Hover on the row: value color shifts to `var(--accent)`
- `padding-block: 1rem`
- `border-bottom: 1px solid var(--border-subtle)` between rows

Contact items:
1. Phone — your number
2. Email — your email address (mailto: link)
3. DropForm — "Start a project →" link to your DropForm URL

**Section:** `id="contact"`, `padding-block: var(--section-gap)`

---

### 10. `Footer.astro`

**Layout:** Four columns matching the mockup. Hairline top border.

```
[ Name + tagline + social icons ] [ Navigation ] [ Resources ] [ Contact ]
```

**Column 1:**
- Your name: `var(--text-base)`, `var(--font-serif)`, `var(--text-1)`
- Short one-liner: `var(--text-sm)`, `var(--text-3)`
- Social icons row below: GitHub, LinkedIn, X
  - Each is an SVG icon from `components/icons/`
  - Icon size: `18px`
  - Color: `var(--text-3)`, hover: `var(--text-1)`
  - `gap: 1rem` between icons
  - Transition: `var(--transition)`

**Column 2 — Navigation:**
- Column heading: "NAVIGATION" — `.label-eyebrow`, `margin-bottom: 1rem`
- Links: Work, Blog, About, Contact
  - `var(--text-sm)`, `var(--text-3)`, hover: `var(--text-1)`
  - `gap: 0.5rem` between links, flex column

**Column 3 — Resources:**
- Column heading: "RESOURCES" — `.label-eyebrow`
- Links: GitHub, Articles, DropForm, Resume
  - Same style as navigation links

**Column 4 — Contact:**
- Column heading: "CONTACT" — `.label-eyebrow`
- Your email address
- Your location
- Copyright line at very bottom of footer:
  `© 2025 Your Name. All rights reserved.`
  `var(--text-xs)`, `var(--text-muted)`

**Footer:** `border-top: 1px solid var(--border)`, `padding-block: 3rem`

---

## Responsive Breakpoints

Use these Tailwind breakpoints consistently:

| Breakpoint | Width | Behavior |
|---|---|---|
| default | < 640px | Single column, stacked layout |
| `sm` | 640px+ | Minor spacing adjustments |
| `md` | 768px+ | Two-column layouts activate |
| `lg` | 1024px+ | Full desktop layout |
| `xl` | 1280px+ | Max width container centered |

---

## Anchor IDs

Every section must have the correct `id` for smooth scroll navigation:

| Section | ID |
|---|---|
| Projects | `id="work"` |
| About | `id="about"` |
| Skills | `id="skills"` |
| Experience | `id="experience"` |
| Freelance | `id="freelance"` |
| Blog | `id="blog"` |
| Contact | `id="contact"` |

---

## Dark Mode

Dark mode is class-based. The `.dark` class is applied to `<html>`.

- All color variables in `global.css` switch automatically when `.dark` is present
- The toggle button in `Navbar.astro` handles this
- Persist preference in `localStorage` with key `"theme"`
- On page load (in `BaseLayout.astro`), read `localStorage` and apply class before
  first paint to prevent flash

Do not use `prefers-color-scheme` media query — use the class toggle only.

---

## What NOT to Do

- Do not install Framer Motion, GSAP, or any animation library
- Do not use hardcoded hex or RGB color values — only CSS variables
- Do not use Tailwind's `shadow-lg`, `shadow-xl` — only `var(--shadow)` on hover
- Do not add gradients anywhere
- Do not add borders thicker than `1px`
- Do not use `font-bold` (700 weight) — use `font-medium` (500) at most for UI,
  serif headings handle their own weight
- Do not add placeholder content — use the actual data from `data/projects.ts`
  and `data/blogs.ts`
- Do not create new CSS files — all styles go inline via Tailwind utilities
  or in the `<style>` block of each `.astro` component using CSS variables

---

## Final Checklist Before Handing Back

- [ ] All 8 sections render with real data from data files
- [ ] Dark mode toggle works and persists
- [ ] All hover effects use `var(--transition)` — `200ms ease`
- [ ] No hardcoded colors anywhere
- [ ] All section IDs match the nav anchor links
- [ ] Mobile layout works at 375px viewport width
- [ ] No console errors
- [ ] GitHub contribution graph fetches and renders at build time
- [ ] Footer social icons link to correct profiles