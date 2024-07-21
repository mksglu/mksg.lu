import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Mert Köseoğlu",
  initials: "MK",
  location: "Ankara, Türkiye",
  locationLink: "https://www.google.com/maps/place/Ankara/",
  about:
    "Founding Engineer, Technical Lead, Architect, Detail-oriented Developer, Engineering Leader.",
  summary:
    "My name is Mert Köseoğlu, and I am a Senior Software Engineer with over ten years of experience in software development. I have worked in roles such as Founding Engineer, Architect, Technical Lead, and Engineering Leader in fully remote teams worldwide and contributed to business value by developing high-quality products. I am particularly interested in front-end heavy full-stack JavaScript engineer roles. I specialize in JavaScript and TypeScript and have a strong interest in Software Architecture, Design Patterns, Node.js, Test-driven development, React, Next.js/Remix and React Native.",
  avatarUrl:
    "https://pbs.twimg.com/profile_images/1814799198388191233/iD50bdu3_400x400.jpg",
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
      badges: ["Remote"],
      title: "Founder",
      logo: ConsultlyLogo,
      start: "2024",
      end: null,
      description:
        "As a technology consultancy, Mert Koseoglu, Software Forge delivers expert services and high-quality products to a variety of projects and clients. Tech-stack: Node.js, React, Next.js, TypeScript, Tanstack, Zustand, Vite, Radix UI, Tailwind, React Native, Zod, Hono.js, AWS",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React/Next.js/Remix",
    "Node.js",
    "Engineering Management",
    "Technical Leadership",
    "Founding Engineer",
    "CTO",
  ],
  projects: [
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
      ],
      description:
        "Easy appointment management platform for businesses. Update your business information, manage your services, keep track of your employees, and monitor your customers. See statistics, and communicate with them.",
      logo: ParabolLogo,
      link: {
        label: "https://github.com/oxvo",
        href: "https://github.com/oxvo",
      },
    },
  ],
} as const;
