import { ConsultlyLogo, ParabolLogo } from "@/images/logos";
import Mert from "@/images/pp-mert.jpg";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Mert Köseoğlu",
  initials: "MK",
  location: "Ankara, Türkiye",
  locationLink: "https://www.google.com/maps/place/Ankara/",
  about: "Software Engineering, LLMs, Agents, Generative AI",
  summary:
    "My name is Mert Köseoğlu, I am a Senior Software Engineer with over 10 years of experience in front-end–heavy full-stack JavaScript development and technical leadership within fully remote, global teams. Adept at architecting scalable solutions, building and mentoring engineering teams, and delivering high-impact software products. Expertise in test-driven development (TDD), TypeScript, Node.js, Bun, React, and React Native, AI, LLMs, Agents",
  avatarUrl: Mert,
  personalWebsiteUrl: "https://mksg.lu",
  contact: {
    email: "bm.ksglu@gmail.com",
    tel: "+90",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/mksglu",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mksglu",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/mksglu",
        icon: XIcon,
      },
    ],
  },
  work: [
    {
      company: "Mert Koseoglu, Software Forge",
      link: "https://mksg.lu",
      badges: ["TR", "NL", "DE", "Remote"],
      title: "Founder",
      logo: ConsultlyLogo,
      start: "2024",
      end: null,
      description:
        "Mert Koseoğlu, Software Forge, is a software consultancy brand that provides strategic guidance to projects spanning from early-stage ventures to enterprise-grade initiatives. It assembles bespoke engineering teams aligned with specific project needs and leverages AI alongside cloud-native architectures to deliver highly scalable solutions.",
    },
  ],
  skills: [
    "Senior Software Engineer",
    "Engineering Management",
    "Technical Leadership",
    "Founding Engineer",
    "CTO",
  ],
  projects: [
    {
      title: "LLMs Agency",
      techStack: [
        "LLMs",
        "Agents",
        "Generative AI",
        "Prompt Engineering",
        "Langchain",
        "RAG",
        "Vector Databases",
      ],
      description:
        "Empowering Businesses through AI and Large Language Models.",
      logo: ParabolLogo,
      link: {
        label: "https://llms.agency/",
        href: "https://llms.agency/",
      },
    },
    {
      title: "OXVO",
      techStack: [
        "CTO",
        "TypeScript",
        "React",
        "Node.js",
        "GraphQL",
        "Next.js",
        "tRPC",
        "React Native",
      ],
      description:
        "Easy appointment management platform for businesses. Update your business information, manage your services, keep track of your employees, and monitor your customers. See statistics, and communicate with them.",
      logo: ParabolLogo,
      link: {
        label: "https://github.com/oxvo",
        href: "https://github.com/oxvo",
      },
    },
    {
      title: "VDF - Website (It's not live yet.)",
      techStack: [
        "TypeScript",
        "Zod",
        "TanStack",
        "Zustand",
        "Next.js",
        "Tailwind",
        "Storybook",
        "E2E Testing",
        ".NET 8",
        "Strapi CMS",
        "Docker",
        "Kubernetes",
        "Nginx",
      ],
      description:
        "Built and led an eight-person engineering team to deliver a large-scale web application leveraging Next.js (SSR/SSG), a custom design system, and a modern stack. Combined strategic guidance with hands-on coding, ensuring a seamless journey from architecture to deployment.",
      logo: ParabolLogo,
      link: {
        label: "https://www.linkedin.com/company/vdf",
        href: "https://www.linkedin.com/company/vdf",
      },
    },
    {
      title: "D-Charge - Admin Panel",
      techStack: [
        "TypeScript/Zod",
        "Shadcn UI",
        "TanStack",
        "Zustand",
        "React.js",
        "Tailwind",
        "Node.js",
        "Docker",
        "Kubernetes",
        "Nginx",
      ],
      description:
        "Leading the front-end and BFF REST API development of an admin panel—utilized by distributors, administrators, and various stakeholders—while overseeing two interns.",
      logo: ParabolLogo,
      link: {
        label: "https://www.linkedin.com/company/d-charge",
        href: "https://www.linkedin.com/company/d-charge",
      },
    },
  ],
} as const;
