// Text content for homepage sections. Edit here to update copy site-wide.
// Icons stay in the components themselves — only the labels live here.

export const hero = {
  availability: "Available for work",
  heading: "Full stack developer building clean, fast products.",
  intro: "I'm Sandeep Singh — a full stack developer.",
  description:
    "I design and ship end-to-end web and mobile applications, from the database to the pixel. I care about fast load times, clean interfaces, and code that's easy to live with.",
  ctaLabel: "View my work",
  ctaHref: "#work",
  resumeLabel: "View resume",
  resumeUrl: "/my-resume.pdf",
  socialsLabel: "Find me",
  // "Based in" value is sourced from data/info.ts so the location stays single-sourced.
  info: {
    basedInLabel: "Based in",
    focusLabel: "Focus",
    focusValue: "Frontend, Backend & Mobile Development",
    availableForLabel: "Available for",
    availableForValue: "freelance work",
  },
};

export const about = {
  eyebrow: "About",
  heading: "I care about the code that matters and the user experience.",
  paragraphs: [
    "I've spent the last several months building products end to end — shaping the data model, wiring up the API, and obsessing over the last few pixels of the interface. I like working close to the whole stack because that's where the interesting trade-offs live.",
    "Outside of my professional work I build small tools , projects to learn new technologies , Agentic AI to develop smart applications, write about what I learn, and keep a soft spot for fast, quiet software that respects the people using it.",
  ],
  ctaLabel: "More about me",
  ctaHref: "#contact",
};

// Freelance service icons are referenced by key — the component maps the key
// to the imported icon component.
export type FreelanceServiceKey = "web" | "mobile" | "backend" | "fullstack";

export const freelance = {
  eyebrow: "Freelance",
  heading: "Available for select projects",
  intro:
    "I am starting to take on select freelance projects. A few things I help with:",
  services: [
    { key: "web" as FreelanceServiceKey, label: "Web Application Development" },
    { key: "mobile" as FreelanceServiceKey, label: "Mobile App Development (React Native)" },
    { key: "backend" as FreelanceServiceKey, label: "REST API & Backend Systems" },
    { key: "fullstack" as FreelanceServiceKey, label: "Full-Stack Product Development" },
  ],
  processHeading: "My process",
  process: [
    "Discovery — I scope the problem, the users, and what end product looks like.",
    "Plan — I map the architecture, milestones, and a realistic timeline.",
    "Build — I ship in tight iterations with regular previews you can try.",
    "Launch & support — deployment, handover, and help once you're live.",
  ],
  platformsHeading: "Find me on",
  platforms: [
    { name: "Upwork", url: "https://upwork.com" },
    { name: "Fiverr", url: "https://fiverr.com" },
  ],
  platformCtaLabel: "View profile",
};
