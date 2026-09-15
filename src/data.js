export const profile = {
  name: "Neha Khan",
  shortName: "neha.khan",
  role: "Software Engineer / AI Engineering",
  location: "Karachi, Pakistan — open to Gulf, Malaysia & Germany",
  relocation: "Gulf (Saudi Arabia, UAE, Qatar, Bahrain, Kuwait), Malaysia, and Germany",
  email: "n.nehakhan333@gmail.com",
  linkedin: "https://www.linkedin.com/in/neha-khann/",
  github: "https://github.com/NehaKhann",
  medium: "https://medium.com/@n.nehakhan333",
};

// Paid professional employment ran Feb 2022 (Bytecorp) through Nov 2025
// (SIBISOFT) — a fixed window, not ongoing. Years of experience is computed
// from these two fixed dates rather than today's date, so the figure stays
// "3+" rather than climbing every year post-employment.
export const careerStart = new Date(2022, 1, 1); // Feb 2022 — Bytecorp
export const careerEnd = new Date(2025, 10, 1); // Nov 2025 — end of SIBISOFT

export function getYearsOfExperience(from = careerStart, to = careerEnd) {
  let years = to.getFullYear() - from.getFullYear();
  const monthDiff = to.getMonth() - from.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && to.getDate() < from.getDate())) years--;
  return Math.max(years, 0);
}

export function getHeroStats(years) {
  return [
    [`${years}+`, "years exp"],
    [`${projects.length}`, "featured projects"],
    [`${articles.length}+`, "articles published"],
  ];
}

export const experience = [
  { company: "SIBISOFT", role: "Associate Software Engineer → Software Engineer I", period: "Oct 2024 — Nov 2025",
    tags: ["Java", "JSP/Struts/JSF", "Spring Boot", "TypeScript", "Tomcat", "SQL Database", "Windows/Linux"],
    bullets: [
      "Contributed to product-based software as part of the financial and infrastructure team, developing backend modules with Core Java and Spring Boot for business logic and database interactions",
      "Built and maintained frontend components with JSP, Struts, JSF, PrimeFaces, and jQuery, deployed on Apache Tomcat",
      "Modernized legacy components by migrating selected Java modules to TypeScript, improving maintainability",
      "Optimized MySQL queries and supported Windows-to-Linux migration efforts",
    ] },
  { company: "Bank Al Habib Limited", role: "Senior Software Engineer", period: "Oct 2022 — Sept 2024",
    tags: ["Java", "Quarkus", "Vue.js", "Microservices"],
    bullets: [
      "Designed scalable backend services using Quarkus (Java) and RESTful APIs for core banking operations",
      "Migrated monolithic systems to microservices, cutting deployment time by 50% and improving scalability",
      "Led the ATM Threads and Cash Requesting/Sending Portal projects, improving operational efficiency by 40%",
      "Reduced defect rates by 35% through clean architecture principles, collaborating with a team of 8 engineers",
    ] },
  { company: "WOIT Solutions", role: "Full Stack Web Engineer", period: "May 2022 — Oct 2022",
    tags: ["React", "Redux", "Node.js"],
    bullets: [
      "Led a team of 5 building a React + Redux frontend, improving page load by 40%",
      "Built an automated LinkedIn Sales Navigator chatbot with Puppeteer, lifting engagement 30%",
    ] },
  { company: "Bytecorp", role: "Full Stack Developer", period: "Feb 2022 — July 2022",
    tags: ["Python", "Grafana", "RabbitMQ"],
    bullets: [
      "Contributed to Autilent's deployment, improving real-time monitoring by 50%",
      "Boosted system responsiveness 45% using Jetson Nano, Grafana, and RabbitMQ",
    ] },
];

export const projects = [
  { name: "MCP Trust Registry", size: "lg", category: "AI Security", featured: true,
    tagline: "A live registry that scans and scores MCP tools for trustworthiness. Built solo, deployed for $0/month — and it once caught a real incident.",
    tags: ["AI Security", "Docker Sandbox", "FastAPI", "LLM Security", "MCP", "Model Context Protocol", "Next.js", "Portfolio Project", "PostgreSQL", "Tool Poisoning", "TypeScript"],
    languages: [
      { name: "TypeScript", pct: 52.2 }, { name: "Python", pct: 43.3 }, { name: "CSS", pct: 2.2 },
      { name: "Dockerfile", pct: 1.8 }, { name: "JavaScript", pct: 0.5 },
    ],
    github: "https://github.com/NehaKhann/mcp-trust-registry", live: "https://mcp-trust-registry.vercel.app",
    screenshot: "/project-mcp-trust-registry.jpg" },
  { name: "SpringGuard", size: "sm", category: "AI Security",
    tagline: "Spring Boot code auditor — 21 security rules plus an AI review pass, grading Java code A–F with AI-proposed fixes.",
    tags: ["AI", "Java", "React", "Security", "Spring Boot", "Static Analysis", "TypeScript", "Vulnerability Scanner"],
    languages: [
      { name: "Java", pct: 45.9 }, { name: "TypeScript", pct: 33.2 }, { name: "CSS", pct: 18.9 },
      { name: "HTML", pct: 1.8 }, { name: "Dockerfile", pct: 0.2 },
    ],
    github: "https://github.com/NehaKhann/springguard-backend", live: "https://springguard-frontend.vercel.app",
    screenshot: "/project-springguard.jpg" },
  { name: "AI Engineering Journey", size: "md", category: "AI/ML",
    tagline: "A self-directed curriculum — LLM foundations, fine-tuning, LoRA/QLoRA/DoRA, quantization — heading toward RAG and RLHF. Documented weekly with published write-ups.",
    tags: ["AI", "AI Engineering", "Deep Learning", "Fine-tuning", "Generative AI", "Hugging Face", "LLM", "LoRA", "Machine Learning", "Prompt Engineering", "Python", "PyTorch", "QLoRA", "Quantization", "RLHF", "Transformers"],
    languages: [
      { name: "Jupyter Notebook", pct: 88.5 }, { name: "Python", pct: 11.5 },
    ],
    github: "https://github.com/NehaKhann/ai-engineering-journey", live: null, screenshot: null },
  { name: "SME Cash-Flow Explainer", size: "sm", category: "Full-Stack",
    tagline: "Turns raw bank CSVs into audit-ready risk memos — every underwriting metric computed deterministically, with an LLM layer that explains but never invents the numbers.",
    tags: ["Cashflow Underwriting", "Docker Compose", "FastAPI", "Financial Analysis", "Fintech", "LLM", "PostgreSQL", "Python", "QLoRA", "React", "Risk Analysis", "Small Business Lending", "TypeScript"],
    languages: [
      { name: "Python", pct: 43.6 }, { name: "TypeScript", pct: 35.2 }, { name: "CSS", pct: 20.6 }, { name: "Other", pct: 0.6 },
    ],
    github: "https://github.com/NehaKhann/sme-cashflow-explainer", live: "https://cashflow-pi-liard.vercel.app",
    screenshot: "/project-sme-cashflow.jpg" },
  { name: "AI Security — Garak", size: "sm", category: "AI Security",
    tagline: "A hands-on guide to NVIDIA Garak for LLM security scanning — vulnerability assessment against models served through Hugging Face, Spring Boot, and Ollama.",
    tags: ["AI", "AI Security Training", "LLM Evaluation", "LLM Security", "Security Scanner", "Vulnerability Assessment"],
    languages: [
      { name: "HTML", pct: 99.9 }, { name: "Other", pct: 0.1 },
    ],
    github: "https://github.com/NehaKhann/ai-security-garak", live: null, screenshot: null },
  { name: "AI Security — Gandalf", size: "sm", category: "AI Security",
    tagline: "Prompt injection, hands-on: breaking Lakera's Gandalf game, then building a Spring Boot chatbot with escalating defenses — system prompts, input filters, output filters.",
    tags: ["AI Security", "Chatbot", "GenAI Security", "Java", "LLM Security", "Ollama", "Prompt Injection", "Red Teaming", "Spring Boot"],
    languages: [
      { name: "HTML", pct: 66.8 }, { name: "Java", pct: 33.2 },
    ],
    github: "https://github.com/NehaKhann/ai-security-gandalf", live: null, screenshot: null },
];

export const certifications = [
  "Quarkus with MicroProfile & Kubernetes — 3-day training (Dec 2023)",
  "Data Modeling using AI and Power BI — 2-day training (Nov 2023)",
  "Kanz AI Training Hackathon — Certificate of Participation",
  "The Complete 2024 Web Development Bootcamp",
];

export const education = {
  school: "NED University of Engineering & Technology",
  degree: "B.E. Software Engineering — Aug 2018 to March 2022",
  honor: "3.876 CGPA — Ranked 7th of 101",
};

export const articles = [
  { title: "I Compared LoRA vs DoRA — DoRA Was Slower and Less Accurate. Here's Why.", url: "https://medium.com/codetodeploy/i-compared-lora-vs-dora-dora-was-slower-and-less-accurate-heres-why-e0dd7d19627d" },
  { title: "LoRA Explained With Spreadsheets — How to Train a Model Without Touching Its Weights", url: "https://medium.com/towards-artificial-intelligence/lora-explained-with-spreadsheets-how-to-train-a-model-without-touching-its-weights-3d60b707c084" },
  { title: "How I Fit a Model That Shouldn't Fit on a 6GB Laptop GPU", url: "https://medium.com/towards-artificial-intelligence/how-i-fit-a-model-that-shouldnt-fit-on-a-6gb-laptop-gpu-e8376e3af1d5" },
  { title: "From Gandalf to Garak — Automating the AI Attacks I Used to Type by Hand", url: "https://medium.com/towards-artificial-intelligence/from-gandalf-to-garak-automating-the-ai-attacks-i-used-to-type-by-hand-9e588fff54ad" },
  { title: "I Tried to Break an AI's Security — Here's Everything I Learned as a Complete Beginner", url: "https://medium.com/towards-artificial-intelligence/i-tried-to-break-an-ais-security-here-s-everything-i-learned-as-a-complete-beginner-56ac3d6e9fd9" },
  { title: "Understanding Large Language Models — From Neural Networks to Production Inference", url: "https://medium.com/towards-artificial-intelligence/understanding-large-language-models-from-neural-networks-to-production-inference-02303c86eda9" },
  { title: "From Prompt Engineering to Fine-Tuning — Building Domain-Specific LLMs Step by Step", url: "https://medium.com/towards-artificial-intelligence/from-prompt-engineering-to-fine-tuning-building-domain-specific-llms-step-by-step-94e44a929014" },
  { title: "Day 3: Three Sites, All Blocked — Here's What I Actually Learned About Cloudflare", url: "https://medium.com/codetodeploy/day-3-three-sites-all-blocked-heres-what-i-actually-learned-about-cloudflare-babe5e03e18c" },
  { title: "How to Build a Book Price Tracker With Scrapy (And What Breaks Along the Way)", url: "https://medium.com/python-in-plain-english/how-to-build-a-book-price-tracker-with-scrapy-and-what-breaks-along-the-way-20a04324394d" },
  { title: "How I Scraped LinkedIn Job Postings With Python Without Selenium", url: "https://medium.com/codetodeploy/how-i-scraped-linkedin-job-postings-with-python-without-selenium-bc4207efe001" },
  { title: "Claude Cowork Has Five Moving Parts — Most People Only Use One", url: "https://medium.com/towards-artificial-intelligence/claude-cowork-has-five-moving-parts-most-people-only-use-one-3743aad7e91b" },
];

export const skillGroups = [
  { label: "Modern Backend", items: ["Node.js", "Express.js", "Spring Boot", "Quarkus"] },
  { label: "AI / ML", items: ["LLM Fundamentals", "LoRA / QLoRA", "Hugging Face", "PyTorch", "LangChain", "RAG", "Vector DBs (FAISS/Chroma)"], ai: true },
  { label: "Frontend", items: ["React.js", "Redux", "TypeScript", "JavaScript"] },
  { label: "Enterprise Java", items: ["Core Java", "JSP", "Struts", "JSF"] },
  { label: "Databases", items: ["MS SQL Server", "MySQL", "MongoDB"] },
  { label: "Tools", items: ["Git", "Docker", "Grafana", "Keycloak SSO"] },
];
