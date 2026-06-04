// Text content for homepage sections. Edit here to update copy site-wide.
// Icons stay in the components themselves — only the labels live here.

export const hero = {
  availability: "Available for freelance work",
  heading:
    "Full stack developer building clean, functional and agentic AI products.",
  intro: "I'm Sandeep Singh - a full stack developer.",
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

export const experience = {
  eyebrow: "Experience",
  heading: "Where I've worked",
  githubUsername: "thisMeSandeep",
  contributionsLabel: "Contributions",
  contributionsUnavailable: "Contribution data is unavailable right now.",
  jobs: [
    {
      company: "Aganitha",
      role: "Full Stack Developer",
      dates: "Feb 2026 — Present",
      points: [
        "Designed, developed, and deployed AI-powered applications for enterprise clients.",
        "Built and scaled backend-intensive features, including vector search systems and agentic AI orchestration workflows.",
        "Led frontend architecture decisions and developed reusable component systems across multiple products.",
      ],
    },
    {
      company: "Ageit Endorese",
      role: "Full Stack Developer",
      dates: "May 2025 — Dec 2025",
      points: [
        "Developed and delivered full-stack web applications using the MERN stack.",
        "Created and maintained an internal UI component library, improving development efficiency and ensuring design consistency across products.",
        "Built an HRMS platform for internal operations, enabling employee management, payroll processing, and performance review workflows.",
      ],
    },
    {
      company: "Freelance",
      role: "Frontend Developer",
      dates: "Dec 2024 — Mar 2025",
      points: [
        "Designed and developed responsive frontend applications using React, Tailwind CSS, and modern web technologies for client projects.",
      ],
    },
  ],
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
    {
      key: "mobile" as FreelanceServiceKey,
      label: "Mobile App Development (React Native)",
    },
    {
      key: "backend" as FreelanceServiceKey,
      label: "REST API & Backend Systems",
    },
    {
      key: "fullstack" as FreelanceServiceKey,
      label: "Full-Stack Product Development",
    },
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
