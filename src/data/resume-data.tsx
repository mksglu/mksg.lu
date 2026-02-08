import { dt, ParabolLogo, ConsultlyLogo } from "@/images/logos";
import Mert from "@/images/pp-mert.jpg";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Mert Köseoğlu",
  initials: "MK",
  location: "London Area, United Kingdom",
  locationLink: "https://www.google.com/maps/place/London/",
  about: "Software Engineering, LLMs, Agents, Generative AI",
  summary:
    "Senior SWE (IC) with 10+ YoE building AI-native products and agentic systems. Hands-on Tech Lead experience—scaled teams, improved DX, and delivered greenfield products for distributed orgs. Deep in AI/LLM: RAG pipelines, tool-use patterns, edge-native architectures. Primary stack: TypeScript, Node.js, React/RN, Next.js, Cloudflare. Exploring Rust and Go.",
  availability:
    "Now open to consulting opportunities in AI, full-stack development, and technical leadership.",
  avatarUrl: Mert,
  personalWebsiteUrl: "https://mksg.lu",
  contact: {
    email: "bm.ksglu@gmail.com",
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
  blogPosts: [
    {
      title: "Gemini File Search + Cloudflare Workers: The Production RAG Stack That Just Works",
      description: "Real-world RAG system implementation - wrong turns, 3am debugging, and decisions that actually mattered.",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7424553558924050432/",
      xUrl: "https://x.com/mksglu/status/2015747512292782123",
    },
    {
      title: "Clawdbot: Two Weeks In. What Actually Works.",
      description: "Open-source AI agent that communicates through Telegram and WhatsApp - beyond conversation, it takes action.",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7421546642874699776/",
      xUrl: "https://x.com/mksglu/status/2015422422950818205",
    },
  ],
  work: [
    {
      company: "Mert Koseoglu, Software Forge",
      link: "https://mksg.lu",
      badges: ["London Area, United Kingdom", "Remote"],
      title: "Senior Software Engineering Consultant",
      logo: dt,
      start: "Sep 2025",
      end: null,
      description: "Mert Köseoğlu, Software Forge is a software consultancy providing strategic guidance, AI-native architectures, and engineering solutions:",
      bullets: [
        "Analytics SaaS: Architecting AI plugin for analytics platform (1B+ daily events) enabling natural language data queries via multi-tenant RAG with Cloudflare Workers AI and streaming LLM responses.",
        "AI Agency: Reduced QA cycle time by 80% (from 2 days to 4 hours) by building autonomous testing infrastructure with browser-use agents, Playwright MCP, and Claude computer-use. Client: OpenAI.",
        "Agentic E-commerce: Achieved sub-100ms agent response times (down from 800ms) by implementing Cloudflare-native architecture with MCP protocol orchestration for AI shopping workflows.",
      ],
    },
    {
      company: "Doğuş Teknoloji",
      link: "https://www.linkedin.com/company/dogus-teknoloji",
      badges: ["Istanbul, Turkey", "Remote", "Contract"],
      title: "Senior Software Engineering Consultant",
      logo: dt,
      start: "Jan 2024",
      end: "Sep 2025",
      bullets: [
        "Clearing Service (EV Roaming): Enabled interoperability between 50+ CPOs/eMSPs (previously siloed) by delivering OCPI 2.2.1–compliant Clearing House with Next.js (RSC), PostgreSQL, and AWS.",
        "Architectural Standards: Reduced project setup time by 60% (from 2 weeks to 3 days) by creating reusable boilerplates adopted across 5+ teams.",
        "D-Charge: Streamlined operations for 1,000+ charging stations (previously manual Excel tracking) by leading admin panel development with React, TypeScript, and Kubernetes.",
        "VDF Web: Shipped greenfield enterprise financing platform for Turkey's leading automotive finance company by leading 8-person cross-functional team with Next.js, design system, and .NET 8.",
      ],
    },
    {
      company: "Planhat",
      link: "https://planhat.com",
      badges: ["Stockholm County, Sweden", "Remote"],
      title: "Senior Software Engineer",
      logo: ConsultlyLogo,
      start: "Aug 2023",
      end: "Jan 2024",
      bullets: [
        "Shipped 15+ product features in 5 months for customer success platform serving 500+ B2B SaaS companies.",
        "Reduced bug resolution time by 30% (from 5 days to 3.5 days) by improving Vue.js/Node.js codebase quality and test coverage.",
      ],
    },
    {
      company: "Qooper",
      link: "https://qooper.io",
      badges: ["Chicago, Illinois, United States", "Remote"],
      title: "Technical Lead",
      logo: ConsultlyLogo,
      start: "Jun 2021",
      end: "Apr 2023",
      bullets: [
        "Scaled engineering team 6x (1→6 engineers) in 18 months by establishing hiring processes and conducting 50+ technical interviews.",
        "Reduced deployment failures by 40% (from 10/month to 6/month) by implementing code review standards and CI/CD best practices.",
        "Improved team velocity by 30% by removing architectural blockers and improving DX with modern tooling.",
        "Mentored 5 engineers through regular 1:1s, resulting in 2 promotions within 12 months.",
      ],
    },
    {
      company: "Qooper",
      link: "https://qooper.io",
      badges: ["Chicago, Illinois, United States", "Remote"],
      title: "Senior Software Engineer",
      logo: ConsultlyLogo,
      start: "Feb 2021",
      end: "Jun 2021",
      bullets: [
        "Reduced API response time by 50% (from 800ms to 400ms) by migrating backend from Ruby to Node.js with modular architecture.",
        "Decreased mobile development time by 40% (2 codebases → 1) by unifying iOS/Android into single React Native codebase.",
        "Eliminated 30% of tech debt by conducting comprehensive audit and executing remediation roadmap.",
        "Accelerated feature velocity by 25% through greenfield frontend architecture during major UI revamp.",
      ],
    },
    {
      company: "Countly",
      link: "https://count.ly",
      badges: ["London, England, United Kingdom", "Remote"],
      title: "Software Engineer",
      logo: ConsultlyLogo,
      start: "Jun 2019",
      end: "Feb 2021",
      bullets: [
        "Contributed to OSS analytics platform processing 1B+ daily data points by building horizontally scalable Node.js/MongoDB solutions.",
        "Increased React Native SDK adoption by 25% (previously no official SDK) by developing and publishing mobile analytics SDK.",
        "Enabled advanced segmentation for 1,000+ enterprise customers (previously limited to basic metrics) by implementing Top Events, Event Groups, and Drill features.",
        "Reduced dashboard load time by 35% (from 3s to 2s) by optimizing Vue.js components and refining UX workflows.",
      ],
    },
    {
      company: "TDSmaker",
      link: "https://tdsmaker.com",
      badges: ["Istanbul, Turkey", "Remote"],
      title: "Software Engineer",
      logo: ConsultlyLogo,
      start: "May 2018",
      end: "Jun 2019",
      bullets: [
        "Reduced deployment time by 50% (from 30min to 15min) by integrating AWS services and optimizing Jenkins CI/CD pipelines.",
        "Increased test coverage from 40% to 90%+ by implementing TDD practices across React/Node.js codebase.",
        "Built core platform features serving 500+ enterprise users with React, Redux, TypeScript, and MongoDB.",
      ],
    },
    {
      company: "Jotform",
      link: "https://jotform.com",
      badges: ["Ankara, Turkey", "On-site"],
      title: "Software Engineer",
      logo: ConsultlyLogo,
      start: "Feb 2018",
      end: "Apr 2018",
      bullets: [
        "Contributed to form builder platform serving 4M+ users (grew to 25M by 2024) by developing React components for drag-and-drop form editor.",
      ],
    },
    {
      company: "Mert Koseoglu, Software Forge",
      link: "https://mksg.lu",
      badges: ["Turkey", "Remote"],
      title: "Software Engineering Consultant",
      logo: ConsultlyLogo,
      start: "2013",
      end: "2018",
      bullets: [
        "Delivered 20+ web applications for SMB clients as full-stack IC (PHP, JavaScript, MySQL) with end-to-end ownership.",
        "Reduced client development costs by 40% vs agency rates through direct engagement and faster iteration cycles.",
      ],
    },
  ],
  recommendations: [
    {
      name: "Cenk Yurtbilir",
      title: "Co-Founder & CTO at Qooper",
      relationship: "managed Mert Köseoğlu directly",
      date: "December 14, 2023",
      content:
        "I highly recommend Mert as a skilled and dedicated professional. He consistently delivered high-quality code and played a key role in enhancing our products' user experience. Rapidly advancing to the position of Technical Lead, he demonstrated not only technical excellence but also strong leadership and mentoring capabilities. Adaptable and forward-thinking, he embraces challenges and excels in learning new technologies. He effectively communicates with cross-functional teams and stakeholders, contributing to a positive work environment. I am confident that Mert will continue to excel and be a valuable asset to any organization.",
      linkedIn: "https://www.linkedin.com/in/cenkyurtbilir",
    },
    {
      name: "Enes Öztürk",
      title: "Senior Software Engineer at Qooper",
      relationship: "reported directly to Mert Köseoğlu",
      date: "June 28, 2022",
      content:
        "We met with Mert at Qooper and he was the team leader. I saw how he takes seriously his work, follows up his work very well, pays great attendance to code reviews, and combines his technical knowledge with leadership skills very well. On code reviews and when we take technical discussions, I've learned great approaches from him. I would definitely like to work with people like Mert in the companies I work for. Thank you, Mert!",
      linkedIn: "https://www.linkedin.com/in/enes-ozturk",
    },
    {
      name: "Emre Deger",
      title: "Lead Backend Engineer at Qooper",
      relationship: "reported directly to Mert Köseoğlu",
      date: "June 28, 2022",
      content:
        "The sides that make Mert the most valuable; always open to new ideas, not afraid to learn and share information, and have a great business ethic. His strong communication skills make him an indispensable and very good manager. He always supported the teams both technically and mentally. A manager you will always enjoy working with. It was a big pleasure working with Mert.",
      linkedIn: "https://www.linkedin.com/in/emredeger",
    },
    {
      name: "Sitki Bagdat",
      title: "Senior Software Engineer at Qooper",
      relationship: "reported directly to Mert Köseoğlu",
      date: "June 27, 2022",
      content:
        "Mert was a great professional to work with. We worked together at Qooper and he helped me a lot to get started and also to understand internal processes. His work ethic is immaculate and so easy to work together with. He always kept the team motivated and shared knowledge. I believe he is one of the best managers I ever had, as his people skills are highly developed. I'd definitely work with him again.",
      linkedIn: "https://www.linkedin.com/in/sbagdat",
    },
    {
      name: "Furkan Başaran",
      title: "Lead Software Engineer at Countly Analytics",
      relationship: "worked with Mert Köseoğlu but on different teams",
      date: "May 17, 2020",
      content:
        "Mert has a deep passion and energy for learn new things. I think this passion will keep him as valuable person/employee/teammate at his whole career.",
      linkedIn: "https://www.linkedin.com/in/frknbasaran",
    },
    {
      name: "Melih Korkmaz",
      title: "Senior Frontend Devops Engineer at Essent",
      relationship: "managed Mert directly",
      date: "May 17, 2018",
      content:
        "Mert is one of the most talented developers that I ever worked with. He is ambitious, eager to learn, and productive. He worked with me as a full stack developer at TDS maker. Since the position is remote, I had doubts about working with such a young developer. But I had never had an issue with him. He knows his responsibilities, and he tries his best to finish the tasks. I definitely recommend him to the employers who want to work with.",
      linkedIn: "https://www.linkedin.com/in/melih-korkmaz",
    },
  ],
  skills: [
    "Software Engineering",
    "Engineering Management",
    "Technical Leadership",
    "Founding Engineer",
  ],
  projects: [
    {
      title: "Vemotion AI",
      techStack: [
        "React",
        "Remotion",
        "TypeScript",
        "AI/LLM",
        "Video Generation",
        "Code Generation",
        "Next.js",
      ],
      description:
        "Reduced video development time from days to minutes by building AI tool that generates production-ready Remotion React components from natural language. Enables dynamic personalization for SaaS, data visualization, and marketing without per-render API costs.",
      logo: ParabolLogo,
      link: {
        label: "vemotionai.com",
        href: "https://vemotionai.com/",
      },
    },
    {
      title: "MCP Directory & Hub",
      techStack: [
        "Cloudflare Pages",
        "Cloudflare Workers",
        "Cloudflare Durable Objects",
        "Cloudflare Registrar",
        "Next.js (SSR)",
        "Infrastructure Operations",
        "Web Crawling",
        "Indexing",
      ],
      description:
        "Built and operate the open directory for MCP ecosystem (30K daily requests), solving fragmented server discovery problem. In collaboration with Cloudflare, architected entire platform on their edge: Pages for SSR, Workers + Durable Objects for crawling/indexing.",
      logo: ParabolLogo,
      link: {
        label: "model-context-protocol.com",
        href: "https://model-context-protocol.com/",
      },
    },
    {
      title: "xASO",
      techStack: [
        "TypeScript",
        "Node.js",
        "React",
        "Next.js",
        "Data Analysis",
        "SEO/ASO Algorithms",
        "Market Trend Analysis",
        "SaaS Development",
      ],
      description:
        "Built ASO platform that reduces keyword research time from hours to minutes by providing search volume, competition analysis, and AI-powered recommendations for App Store visibility optimization.",
      logo: ParabolLogo,
      link: {
        label: "xaso.io",
        href: "https://xaso.io/",
      },
    },
    {
      title: "xHabit",
      techStack: [
        "React Native",
        "Expo",
        "TypeScript",
        "iOS Development",
        "Mobile UX/UI",
        "AI Integration",
        "Habit Formation Algorithms",
        "Behavioral Science",
      ],
      description:
        "Shipped iOS habit tracker with AI-powered personalization that adapts reminders based on user behavior patterns. Built with Expo/React Native for native performance with single codebase efficiency.",
      logo: ParabolLogo,
      link: {
        label: "xhabit.app",
        href: "https://xhabit.app/",
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
        "Architected appointment management platform as CTO, replacing manual booking workflows with automated scheduling, employee management, and customer communication. Full-stack TypeScript with GraphQL/tRPC APIs.",
      logo: ParabolLogo,
      link: {
        label: "https://github.com/oxvo",
        href: "https://github.com/oxvo",
      },
    },
    {
      title: "VDF Web",
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
        "Led 8-person team to deliver enterprise vehicle financing platform for Turkey's leading automotive finance company (Volkswagen Doğuş Finans). Replaced legacy system with modern Next.js stack and custom design system.",
      logo: ParabolLogo,
      link: {
        label: "https://www.linkedin.com/company/vdf",
        href: "https://www.linkedin.com/company/vdf",
      },
    },
    {
      title: "D-Charge",
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
        "Replaced manual Excel tracking for 1,000+ EV charging stations with real-time admin panel. Led frontend and BFF API development, enabling distributors and operators to manage stations at scale.",
      logo: ParabolLogo,
      link: {
        label: "https://www.linkedin.com/company/d-charge",
        href: "https://www.linkedin.com/company/d-charge",
      },
    },
    {
      title: "Architectural Standards & Boilerplates",
      techStack: [
        "System Architecture",
        "Frontend Architecture",
        "Next.js",
        "React Server Components (RSC)",
        "AWS",
        "Boilerplate Development",
        "Standardization",
        "CI/CD Optimization",
      ],
      description:
        "Reduced project setup time by 60% (from 2 weeks to 3 days) by creating reusable Next.js/RSC boilerplates adopted across 5+ teams at Doğuş Technology Digital Solutions.",
      logo: dt,
      link: {
        label: "Internal Project (Doğuş Technology)",
        href: "#",
      },
    },
  ],
};

export type ResumeData = typeof RESUME_DATA;
export type Recommendation = ResumeData["recommendations"][number];
