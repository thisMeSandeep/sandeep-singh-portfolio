export const projects = [
   {
  // --- Identity ---
  slug: "trackflow-project-management-app",
  title: "TrackFlow — Project Management App",
  tagline:
    "A focused task and sprint management tool built for small dev teams.",
  category: "SaaS Platform",
  featured: true,

  // --- Media ---
  cover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  ],

  // --- Tech stack ---
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API",
  ],

  // --- Links ---
  liveUrl: "https://trackflow.demo.dev",
  githubUrl: "https://github.com/yourname/trackflow",

  // --- Dates ---
  startDate: "2024-03",
  endDate: "2024-07",

  // --- Bento card config ---
  // Controls the card size in the bento grid
  // "large" = spans 2 cols, "medium" = 1 col normal, "small" = 1 col compact
  bentoSize: "large",

  // Accent color for this card's subtle tint — pulled from your token palette
  // Used for the category label background on the bento card
  accentColor: "sage", // maps to --color-accent-subtle in your tokens

  // --- Overview ---
  problem:
    "Small dev teams were drowning in bloated tools like Jira. They needed something fast, opinionated, and distraction-free — a tool that gets out of the way.",
  solution:
    "A focused sprint board with drag-and-drop task management, team assignments, and a dead-simple progress view. No plugins, no setup overhead, no noise.",
  role: "Solo project — full-stack design and development.",

  // --- Technical detail ---
  architecture:
    "React SPA on the frontend, Node.js + Express REST API on the backend, PostgreSQL for persistence. Deployed on Railway with a Vercel frontend.",
  keyDecisions: [
    {
      decision: "Chose PostgreSQL over MongoDB",
      reason:
        "Relational data (users → teams → sprints → tasks) made a document model awkward. PostgreSQL with proper foreign keys was cleaner and easier to query.",
    },
    {
      decision: "Built a custom drag-and-drop instead of using a library",
      reason:
        "Tried react-beautiful-dnd first but it added 30kb and had accessibility issues. A lightweight pointer-events implementation covered everything needed.",
    },
  ],
  interestingProblems: [
    "Optimistic UI updates — tasks needed to feel instant while the API confirmed changes in the background. Solved with a local state cache and a queue of pending mutations.",
    "Real-time collaboration for two users editing the same board required a simple WebSocket pub/sub pattern without the overhead of Socket.io.",
  ],

  // --- Outcome ---
  results:
    "Used by 3 small teams during beta. Average session length increased 40% compared to their previous tool (self-reported). Zero critical bugs in production over 3 months.",
  whatIdDoDifferently:
    "I'd separate the WebSocket server from the REST API earlier. Keeping them in the same process worked fine at small scale but would become a bottleneck under real load.",
  learned: [
    "Optimistic UI patterns with rollback",
    "WebSocket state management without a framework",
    "PostgreSQL query optimization for nested relational data",
  ],

  // --- Blog connection ---
  relatedPost: "building-trackflow-what-i-learned-about-optimistic-ui",
},
{
  // --- Identity ---
  slug: "trackflow-project-management-app",
  title: "TrackFlow — Project Management App",
  tagline:
    "A focused task and sprint management tool built for small dev teams.",
  category: "SaaS Platform",
  featured: true,

  // --- Media ---
  cover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  ],

  // --- Tech stack ---
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API",
  ],

  // --- Links ---
  liveUrl: "https://trackflow.demo.dev",
  githubUrl: "https://github.com/yourname/trackflow",

  // --- Dates ---
  startDate: "2024-03",
  endDate: "2024-07",

  // --- Bento card config ---
  // Controls the card size in the bento grid
  // "large" = spans 2 cols, "medium" = 1 col normal, "small" = 1 col compact
  bentoSize: "large",

  // Accent color for this card's subtle tint — pulled from your token palette
  // Used for the category label background on the bento card
  accentColor: "sage", // maps to --color-accent-subtle in your tokens

  // --- Overview ---
  problem:
    "Small dev teams were drowning in bloated tools like Jira. They needed something fast, opinionated, and distraction-free — a tool that gets out of the way.",
  solution:
    "A focused sprint board with drag-and-drop task management, team assignments, and a dead-simple progress view. No plugins, no setup overhead, no noise.",
  role: "Solo project — full-stack design and development.",

  // --- Technical detail ---
  architecture:
    "React SPA on the frontend, Node.js + Express REST API on the backend, PostgreSQL for persistence. Deployed on Railway with a Vercel frontend.",
  keyDecisions: [
    {
      decision: "Chose PostgreSQL over MongoDB",
      reason:
        "Relational data (users → teams → sprints → tasks) made a document model awkward. PostgreSQL with proper foreign keys was cleaner and easier to query.",
    },
    {
      decision: "Built a custom drag-and-drop instead of using a library",
      reason:
        "Tried react-beautiful-dnd first but it added 30kb and had accessibility issues. A lightweight pointer-events implementation covered everything needed.",
    },
  ],
  interestingProblems: [
    "Optimistic UI updates — tasks needed to feel instant while the API confirmed changes in the background. Solved with a local state cache and a queue of pending mutations.",
    "Real-time collaboration for two users editing the same board required a simple WebSocket pub/sub pattern without the overhead of Socket.io.",
  ],

  // --- Outcome ---
  results:
    "Used by 3 small teams during beta. Average session length increased 40% compared to their previous tool (self-reported). Zero critical bugs in production over 3 months.",
  whatIdDoDifferently:
    "I'd separate the WebSocket server from the REST API earlier. Keeping them in the same process worked fine at small scale but would become a bottleneck under real load.",
  learned: [
    "Optimistic UI patterns with rollback",
    "WebSocket state management without a framework",
    "PostgreSQL query optimization for nested relational data",
  ],

  // --- Blog connection ---
  relatedPost: "building-trackflow-what-i-learned-about-optimistic-ui",
},
{
  // --- Identity ---
  slug: "trackflow-project-management-app",
  title: "TrackFlow — Project Management App",
  tagline:
    "A focused task and sprint management tool built for small dev teams.",
  category: "SaaS Platform",
  featured: true,

  // --- Media ---
  cover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  ],

  // --- Tech stack ---
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API",
  ],

  // --- Links ---
  liveUrl: "https://trackflow.demo.dev",
  githubUrl: "https://github.com/yourname/trackflow",

  // --- Dates ---
  startDate: "2024-03",
  endDate: "2024-07",

  // --- Bento card config ---
  // Controls the card size in the bento grid
  // "large" = spans 2 cols, "medium" = 1 col normal, "small" = 1 col compact
  bentoSize: "large",

  // Accent color for this card's subtle tint — pulled from your token palette
  // Used for the category label background on the bento card
  accentColor: "sage", // maps to --color-accent-subtle in your tokens

  // --- Overview ---
  problem:
    "Small dev teams were drowning in bloated tools like Jira. They needed something fast, opinionated, and distraction-free — a tool that gets out of the way.",
  solution:
    "A focused sprint board with drag-and-drop task management, team assignments, and a dead-simple progress view. No plugins, no setup overhead, no noise.",
  role: "Solo project — full-stack design and development.",

  // --- Technical detail ---
  architecture:
    "React SPA on the frontend, Node.js + Express REST API on the backend, PostgreSQL for persistence. Deployed on Railway with a Vercel frontend.",
  keyDecisions: [
    {
      decision: "Chose PostgreSQL over MongoDB",
      reason:
        "Relational data (users → teams → sprints → tasks) made a document model awkward. PostgreSQL with proper foreign keys was cleaner and easier to query.",
    },
    {
      decision: "Built a custom drag-and-drop instead of using a library",
      reason:
        "Tried react-beautiful-dnd first but it added 30kb and had accessibility issues. A lightweight pointer-events implementation covered everything needed.",
    },
  ],
  interestingProblems: [
    "Optimistic UI updates — tasks needed to feel instant while the API confirmed changes in the background. Solved with a local state cache and a queue of pending mutations.",
    "Real-time collaboration for two users editing the same board required a simple WebSocket pub/sub pattern without the overhead of Socket.io.",
  ],

  // --- Outcome ---
  results:
    "Used by 3 small teams during beta. Average session length increased 40% compared to their previous tool (self-reported). Zero critical bugs in production over 3 months.",
  whatIdDoDifferently:
    "I'd separate the WebSocket server from the REST API earlier. Keeping them in the same process worked fine at small scale but would become a bottleneck under real load.",
  learned: [
    "Optimistic UI patterns with rollback",
    "WebSocket state management without a framework",
    "PostgreSQL query optimization for nested relational data",
  ],

  // --- Blog connection ---
  relatedPost: "building-trackflow-what-i-learned-about-optimistic-ui",
},
{
  // --- Identity ---
  slug: "trackflow-project-management-app",
  title: "TrackFlow — Project Management App",
  tagline:
    "A focused task and sprint management tool built for small dev teams.",
  category: "SaaS Platform",
  featured: true,

  // --- Media ---
  cover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  ],

  // --- Tech stack ---
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API",
  ],

  // --- Links ---
  liveUrl: "https://trackflow.demo.dev",
  githubUrl: "https://github.com/yourname/trackflow",

  // --- Dates ---
  startDate: "2024-03",
  endDate: "2024-07",

  // --- Bento card config ---
  // Controls the card size in the bento grid
  // "large" = spans 2 cols, "medium" = 1 col normal, "small" = 1 col compact
  bentoSize: "large",

  // Accent color for this card's subtle tint — pulled from your token palette
  // Used for the category label background on the bento card
  accentColor: "sage", // maps to --color-accent-subtle in your tokens

  // --- Overview ---
  problem:
    "Small dev teams were drowning in bloated tools like Jira. They needed something fast, opinionated, and distraction-free — a tool that gets out of the way.",
  solution:
    "A focused sprint board with drag-and-drop task management, team assignments, and a dead-simple progress view. No plugins, no setup overhead, no noise.",
  role: "Solo project — full-stack design and development.",

  // --- Technical detail ---
  architecture:
    "React SPA on the frontend, Node.js + Express REST API on the backend, PostgreSQL for persistence. Deployed on Railway with a Vercel frontend.",
  keyDecisions: [
    {
      decision: "Chose PostgreSQL over MongoDB",
      reason:
        "Relational data (users → teams → sprints → tasks) made a document model awkward. PostgreSQL with proper foreign keys was cleaner and easier to query.",
    },
    {
      decision: "Built a custom drag-and-drop instead of using a library",
      reason:
        "Tried react-beautiful-dnd first but it added 30kb and had accessibility issues. A lightweight pointer-events implementation covered everything needed.",
    },
  ],
  interestingProblems: [
    "Optimistic UI updates — tasks needed to feel instant while the API confirmed changes in the background. Solved with a local state cache and a queue of pending mutations.",
    "Real-time collaboration for two users editing the same board required a simple WebSocket pub/sub pattern without the overhead of Socket.io.",
  ],

  // --- Outcome ---
  results:
    "Used by 3 small teams during beta. Average session length increased 40% compared to their previous tool (self-reported). Zero critical bugs in production over 3 months.",
  whatIdDoDifferently:
    "I'd separate the WebSocket server from the REST API earlier. Keeping them in the same process worked fine at small scale but would become a bottleneck under real load.",
  learned: [
    "Optimistic UI patterns with rollback",
    "WebSocket state management without a framework",
    "PostgreSQL query optimization for nested relational data",
  ],

  // --- Blog connection ---
  relatedPost: "building-trackflow-what-i-learned-about-optimistic-ui",
},
]