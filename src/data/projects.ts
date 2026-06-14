import dropFormCover from "../assets/project-screenshot/dropform.webp";
import devWork from "../assets/project-screenshot/devwork.webp";
import fundly from "../assets/project-screenshot/fundly.webp";
import forma from "../assets/project-screenshot/forma.webp";
import eventBid from "../assets/project-screenshot/eventbid.webp";
import sqliqs from "../assets/project-screenshot/sqliqs.webp";

// Structured project metadata. The long-form write-up for each project lives in
// src/content/project-story/<slug>.md and is rendered on the detail page — keep
// the `slug` here in sync with that file name.
export const projects = [
  {
    slug: "Sqliqs-query-your-database-in-plain-English",
    title: "Sqliqs — Query your database in plain English",
    tagline:
      "A local-first AI-agent which helps you to query your database in plain English , generate reports and visualizations.",
    category: "SaaS Platform",
    featured: true,
    cover: sqliqs,
    tech: ["React", "TypeScript", "Next.js", "AI-SDK", "PostgreSQL" ,"Tailwind CSS"],
    liveUrl: "https://www.sqliqs.com",
    githubUrl: "https://github.com/thisMeSandeep/Sqliqs-",
    bentoSize: "large",
  },
  {
    slug: "EventBid-let-venues-bid-for-your-event",
    title: "EventBid — let venues bid for your event",
    tagline:
      "A platform that connects event host with venues, allowing them to receive competitive bids for hosting their events.",
    category: "Web App",
    featured: true,
    cover: eventBid,
    tech: [
      "React",
      "Hono",
      "AI-SDK",
      "TypeScript",
      "Better-auth",
      "Tanstack Start",
      "PostgreSQL",
      "Bull-MQ",
      "Redis",
      "Tailwind CSS",
    ],
    liveUrl: "https://eventbid.sandeepnayal.com",
    githubUrl: "https://github.com/thisMeSandeep/EventBid",
    bentoSize: "medium",
  },
  {
    slug: "drop-form-AI-form-builder",
    title: "DropForm — Build , style and publish AI-powered forms in minutes",
    tagline:
      "A modern form builder that leverages AI to help users create, style, and publish forms quickly and easily.",
    category: "SaaS Platform",
    featured: true,
    cover: dropFormCover,
    tech: [
      "Next.js",
      "TypeScript",
      "Better-auth",
      "AI-SDK",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    liveUrl: "https://drop-form.vercel.app",
    githubUrl: "https://github.com/thisMeSandeep/DropForm",
    bentoSize: "medium",
  },
  {
    slug: "devwork-freelance-marketplace",
    title: "DevWork — Freelance Marketplace",
    tagline:
      "A platform for connecting freelancers with clients seeking skilled developers.",
    category: "Web App",
    featured: false,
    cover: devWork,
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "AI-SDK",
      "Auth.js",
      "Tailwind CSS",
    ],
    liveUrl: "https://devwork-two.vercel.app",
    githubUrl: "https://github.com/thisMeSandeep/Dev-work--next.js-app",
    bentoSize: "large",
  },
  {
    slug: "Forma-svg-based-design-tool",
    title: "Forma — Create and edit SVG graphics with ease",
    tagline:
      "A modern design tool for creating and editing SVG graphics with a focus on simplicity and performance.",
    category: "Web App",
    featured: false,
    cover: forma,
    tech: ["React", "Tailwind CS", ""],
    liveUrl: "https://forma-logo-and-vector-art-maker.vercel.app/",
    githubUrl:
      "https://github.com/thisMeSandeep/Forma-Logo-and-Vector-Art-Maker",
    bentoSize: "large",
  },
  {
    slug: "Fundly-a personal finance managementapp",
    title: "Fundly — Personal Finance Management App",
    tagline:
      "A personal finance management app that helps users track their expenses, set budgets, and achieve their financial goals.",
    category: "Web App",
    featured: false,
    cover: fundly,
    tech: ["Node.js", "Express", "MongoDB", "React"],
    liveUrl: "https://eudaimo-personal-finance-managment-app.vercel.app",
    githubUrl:
      "https://github.com/thisMeSandeep/Eudaimo-personal-finance-managment-app",
    bentoSize: "large",
  },
];
