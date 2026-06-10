import dropFormCover from "../assets/project-screenshot/dropform.webp";
import devWork from "../assets/project-screenshot/devwork.webp";
import fundly from "../assets/project-screenshot/fundly.webp";
import forma from "../assets/project-screenshot/forma.webp";
import eventBid from "../assets/project-screenshot/eventbid.webp";

// Structured project metadata. The long-form write-up for each project lives in
// src/content/project-story/<slug>.md and is rendered on the detail page — keep
// the `slug` here in sync with that file name.
export const projects = [
  {
    slug: "EventBid",
    title: "EventBid — let venues bid for your event",
    tagline:
      "A platform that connects event host with venues, allowing them to receive competitive bids for hosting their events.",
    category: "SaaS Platform",
    featured: true,
    cover: eventBid,
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://trackflow.demo.dev",
    githubUrl: "https://github.com/thisMeSandeep/trackflow",
    bentoSize: "large",
  },
  {
    slug: "drop-form-AI-form-builder",
    title: "DropForm — AI Form Builder",
    tagline:
      "A focused task and sprint management tool built for small dev teams.",
    category: "SaaS Platform",
    featured: true,
    cover: dropFormCover,
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://trackflow.demo.dev",
    githubUrl: "https://github.com/thisMeSandeep/trackflow",
    bentoSize: "large",
  },
  {
    slug: "devwork-freelance-marketplace",
    title: "DevWork — Freelance Marketplace",
    tagline:
      "A platform for connecting freelancers with clients seeking skilled developers.",
    category: "Mobile App",
    featured: true,
    cover: devWork,
    tech: ["React Native", "TypeScript", "Firebase"],
    liveUrl: "https://fieldnote.demo.dev",
    githubUrl: "https://github.com/thisMeSandeep/fieldnote",
    bentoSize: "medium",
  },
  {
    slug: "Fundly-a-personal-finance-management-app",
    title: "Fundly — Personal Finance Management App",
    tagline:
      "A lightweight content API with role-based access and a clean REST surface.",
    category: "Backend / API",
    featured: false,
    cover: fundly,
    tech: ["Node.js", "Hono", "PostgreSQL", "Docker"],
    liveUrl: "https://quill.demo.dev",
    githubUrl: "https://github.com/thisMeSandeep/quill",
    bentoSize: "medium",
  },
  {
    slug: "Forma-svg-based-design-tool",
    title: "Forma — SVG-Based Design Tool",
    tagline:
      "A modern design tool for creating and editing SVG graphics with a focus on simplicity and performance.",
    category: "SaaS Platform",
    featured: true,
    cover: forma,
    tech: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    liveUrl: "https://pulse.demo.dev",
    githubUrl: "https://github.com/thisMeSandeep/pulse",
    bentoSize: "large",
  },
];
