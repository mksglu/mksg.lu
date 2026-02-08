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
    "Senior Software Engineer and Technical Leader with over 10 years of experience delivering high-impact software products for global, remote teams. Proven ability to architect scalable solutions and lead high-performing engineering teams. Expertise in modern web technologies including TypeScript, Node.js, Bun, React, and React Native, alongside advanced AI/LLM applications, agent development including MCP and A2A protocols, and robust testing methodologies.",
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
        "Analytics SaaS: Architecting AI plugin for open-source analytics platform (billions of daily events). Multi-tenant RAG with Cloudflare Workers AI, vector embeddings, Mastra AI orchestration, and streaming LLM responses for real-time data insights.",
        "AI Agency: Built autonomous QA infrastructure with browser-use agents, Playwright MCP servers, and Claude computer-use for visual regression and E2E testing pipelines. Client: OpenAI.",
        "Agentic E-commerce: Led Cloudflare-native architecture (Workers, Durable Objects, R2, Queues) for AI shopping agents with tool-calling, multi-step reasoning, and cart/checkout orchestration via MCP protocol.",
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
        "Clearing Service (EV Roaming): Led end-to-end design of OCPI 2.2.1–compliant EV Roaming Clearing House using Next.js (RSC), PostgreSQL, Drizzle ORM, and AWS.",
        "Architectural Standards: Designed and implemented architectural standards and reusable boilerplates with Next.js RSC and AWS infrastructure.",
        "D-Charge: Led front-end and BFF development of admin panel using React, TypeScript, Zod, TanStack, Zustand, Shadcn, and Kubernetes.",
        "VDF Web: Built and led 8-person team to deliver large-scale web app with Next.js (SSR/SSG), custom design system, .NET 8, and Strapi CMS.",
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
        "Contributed to feature development and maintenance for customer platform serving modern technology companies.",
        "Worked primarily with Vue.js and Node.js in a full-stack capacity.",
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
        "Guided high-level architectural discussions and proactively removed blockers for consistent development progress.",
        "Collaborated with CTO to refine recruitment, growing team from 1 to 6 engineers across mobile, web, and backend.",
        "Provided career guidance, conducted 1:1 sessions, and performed code reviews to reduce technical debt.",
        "Sought new best practices and emerging technologies to elevate team performance.",
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
        "Migrated backend services from Ruby to Node.js with modular architecture patterns.",
        "Partnered with product/design teams during major UI revamp, restructuring front-end codebases.",
        "Transitioned native iOS/Android codebases into unified React Native application.",
        "Conducted technical debt audit and formulated remediation roadmap.",
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
        "Built scalable solutions using Node.js, MongoDB, Backbone.js, jQuery, TDD, and Vue.js.",
        "Developed plugins, integrated React Native SDK, and optimized components for performance.",
        "Implemented Top Events, Event Groups, Data Points, and Filtering Rules CLI features.",
        "Improved Drill Plugin and refined Dashboard UX for better user workflows.",
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
        "Built core functionalities using React, Redux, TypeScript, Node.js, MongoDB, and AWS.",
        "Integrated AWS services and optimized CI workflows with Jenkins.",
        "Adhered to TDD principles, delivering robust and maintainable code.",
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
        "Contributed to Jotform's form builder platform development.",
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
        "Provided strategic guidance and engineering solutions for various clients.",
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
        "Developer tool that transforms natural language prompts into production-ready Remotion React video components. Generate once, render thousands - enabling dynamic personalization for SaaS features, data visualization, and marketing materials without per-render costs.",
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
        "Operating the infrastructure for model-context-protocol.com, the open directory for discovering and connecting to MCP servers and clients, handling 30K daily requests. In collaboration with Cloudflare, built the entire platform on their ecosystem including Pages for Next.js SSR, Workers and Durable Objects for crawling and indexing, and Cloudflare Registrar for domain management.URL: model-context-protocol.com",
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
        "Comprehensive App Store Optimization platform that helps developers improve their app's visibility and performance through keyword analysis, competition tracking, and market trend insights. The platform provides in-depth metrics including search volume, market position, competition analysis, and AI-powered recommendations. URL: xaso.io",
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
        "Designed and developed xHabit, an innovative iOS habit tracker application that leverages artificial intelligence to help users build and maintain positive habits. The app provides personalized recommendations, adaptive reminders, and progress insights based on individual behavior patterns and goals. Built with Expo and React Native for a seamless, native-like user experience.",
      logo: ParabolLogo,
      link: {
        label: "xhabit.app",
        href: "https://xhabit.app/",
      },
    },
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
        "Empowering Businesses through AI and Large Language Models. URL: llms.agency",
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
        "Easy appointment management platform for businesses. Update your business information, manage your services, keep track of your employees, and monitor your customers. See statistics, and communicate with them. URL: github.com/oxvo",
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
        "Built and led an eight-person engineering team to deliver a large-scale web application leveraging Next.js (SSR/SSG), a custom design system, and a modern stack. Combined strategic guidance with hands-on coding, ensuring a seamless journey from architecture to deployment. URL: vdf.com.tr",
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
        "Leading the front-end and BFF REST API development of an admin panel—utilized by distributors, administrators, and various stakeholders—while overseeing two interns. URL: dcharge.com.tr",
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
        "Led the design and implementation of architectural standards and reusable boilerplates for Doğuş Technology in Digital Solutions projects, utilizing Next.js with RSC and AWS infrastructure. Focused on enhancing developer experience, code quality, and deployment efficiency across multiple teams.",
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
