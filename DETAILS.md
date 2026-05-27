src/
├── pages/
│   ├── index.astro                   → /
│   ├── projects/
│   │   ├── index.astro               → /projects
│   │   └── [slug].astro              → /projects/my-app
│   └── blog/
│       ├── index.astro               → /blog
│       └── [slug].astro              → /blog/my-post-title
│
├── content/
│   ├── projects/
│   │   └── my-app.md                 → generates /projects/my-app
│   └── blog/
│       └── my-post-title.md          → generates /blog/my-post-title
│
└── components/
    ├── ProjectCard.astro
    └── BlogCard.astro