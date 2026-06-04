import dropFormCover from "../assets/project-screenshot/dropform.png";
import devWork from "../assets/project-screenshot/devwork.png";
import fundly from "../assets/project-screenshot/fundly.png";
import forma from "../assets/project-screenshot/forma.png";

export const projects = [
  {
    slug: "drop-form-AI-form-builder",
    title: "DropForm — AI Form Builder",
    tagline:
      "A focused task and sprint management tool built for small dev teams.",
    summary:
      "TrackFlow was designed to help small product teams move from scattered planning to a single source of truth for tasks, sprints, and delivery status.",
    challenge:
      "The main challenge was balancing a dense feature set with a calm interface that still felt fast under daily use.",
    approach:
      "I chose React and TypeScript for a predictable component model, Node.js for a simple API layer, and PostgreSQL to keep team, sprint, and task data relational and easy to query.",
    outcome:
      "The result is a product that makes planning work visible without adding process overhead, while leaving room to grow into burndown charts, filters, and team reporting.",
    learnings: [
      "Clear information hierarchy matters more than packing every control onto the screen.",
      "Strong data modeling makes sprint workflows easier to evolve later.",
    ],
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
    summary:
      "FieldNote focuses on frictionless capture: write quickly offline, keep working anywhere, and let sync happen in the background when connectivity returns.",
    challenge:
      "The tricky part was designing a data flow that felt instant locally while still handling sync conflicts in a way users would never need to think about.",
    approach:
      "I used React Native and TypeScript for a shared mobile codebase, plus Firebase for lightweight auth, sync, and persistence without adding unnecessary backend complexity.",
    outcome:
      "The app delivers a mobile-first workflow that stays usable on flights, commutes, and weak networks, which is exactly the product behavior the concept needed.",
    learnings: [
      "Offline-first products need deliberate UX cues so users trust that changes are saved and synced.",
      "Conflict handling should stay invisible until there is a real edge case to resolve.",
    ],
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
    summary:
      "Quill was built as a content backend for teams that want structured publishing without the weight of a full CMS interface.",
    challenge:
      "The core problem was exposing content operations through a compact API while still protecting drafts, roles, and publish workflows.",
    approach:
      "I chose Hono for its small footprint and straightforward routing, then paired it with PostgreSQL and Docker so the service stayed easy to run locally and deploy consistently.",
    outcome:
      "The final API gives editors and developers a clean contract for content creation, review, and delivery, making it suitable for blogs, docs, or marketing sites.",
    learnings: [
      "A good API product depends as much on consistent responses and naming as it does on the endpoints themselves.",
      "Keeping the deployment story simple improves adoption for small teams.",
    ],
    category: "Backend / API",
    featured: true,
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
    summary:
      "Pulse is an analytics workspace for quickly understanding product performance without turning every page into a wall of charts.",
    challenge:
      "The main challenge was presenting live data in a way that remained readable, performant, and easy to scan during stakeholder reviews.",
    approach:
      "I used Next.js for the front end, FastAPI for the analytics layer, and PostgreSQL for durable event storage and efficient aggregation queries.",
    outcome:
      "The dashboard gives teams a dependable view of product trends, conversion changes, and usage patterns with a UI that favors clarity over noise.",
    learnings: [
      "Good analytics interfaces need strong defaults so users can understand the data before adding more filters.",
      "Data freshness and interface responsiveness both matter when a dashboard is used in decision-making.",
    ],
    category: "SaaS Platform",
    featured: true,
    cover: forma,
    tech: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    liveUrl: "https://pulse.demo.dev",
    githubUrl: "https://github.com/thisMeSandeep/pulse",
    bentoSize: "large",
  },
];
