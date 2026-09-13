export const profile = {
  name: "Neha Khan",
  shortName: "neha.khan",
  role: "Software Engineer / AI Engineering",
  location: "Karachi — open to Gulf, Malaysia & Germany",
  email: "n.nehakhan333@gmail.com",
  linkedin: "https://www.linkedin.com/in/neha-khann/",
  github: "https://github.com/NehaKhann",
  medium: "https://medium.com/@n.nehakhan333",
};

export const heroStats = [
  ["4+", "years exp"],
  ["50%", "faster deploys shipped"],
  ["4", "AI/full-stack projects"],
];

export const experience = [
  { company: "SIBISOFT", role: "Software Engineer I", period: "Oct 2024 — Nov 2025",
    bullets: ["Developed enterprise backend modules using Core Java and Spring Boot for business logic and database interactions", "Modernized legacy components by migrating selected Java modules to TypeScript", "Optimized MySQL queries, improving data retrieval performance"] },
  { company: "Bank Al Habib Limited", role: "Software Engineer", period: "Oct 2022 — Sept 2024",
    bullets: ["Migrated monolithic systems to microservices, cutting deployment time by 50%", "Built responsive Vue.js frontend modules with REST API integration, improving processing efficiency by 40%", "Reduced defect rates by 35% through clean architecture principles"] },
  { company: "WOIT Solutions", role: "Full Stack Web Engineer", period: "May 2022 — Oct 2022",
    bullets: ["Led a team of 5 building a React + Redux frontend, improving page load by 40%", "Built an automated LinkedIn Sales Navigator chatbot with Puppeteer, lifting engagement 30%"] },
  { company: "Bytecorp", role: "Full Stack Developer", period: "Feb 2022 — July 2022",
    bullets: ["Contributed to Autilent's deployment, improving real-time monitoring by 50%", "Boosted system responsiveness 45% using Jetson Nano, Grafana, and RabbitMQ"] },
];

export const projects = [
  { name: "MCP Trust Registry", size: "lg",
    tagline: "A live registry that scans and scores MCP tools for trustworthiness. Built solo, deployed for $0/month — and it once caught a real incident.",
    tags: ["Full-Stack", "AI Security"], github: "https://github.com/NehaKhann/mcp-trust-registry", live: "https://mcp-trust-registry.vercel.app" },
  { name: "SpringGuard", size: "sm",
    tagline: "Spring Boot code auditor — 21 security rules plus an AI review pass, grading Java code A–F with AI-proposed fixes.",
    tags: ["Spring Boot", "AI/ML"], github: "https://github.com/NehaKhann/springguard-backend", live: "https://springguard-frontend.vercel.app" },
  { name: "SME Cash-Flow Explainer", size: "sm",
    tagline: "Raw bank CSV to auditable risk memo. Metrics computed deterministically — the LLM only explains, never invents.",
    tags: ["FastAPI", "AI/ML"], github: "https://github.com/NehaKhann/sme-cashflow-explainer", live: null },
  { name: "AI Engineering Journey", size: "md",
    tagline: "A self-directed curriculum — LLM foundations, fine-tuning, LoRA/QLoRA, RAG — documented weekly with published write-ups.",
    tags: ["LLMs", "RAG"], github: "https://github.com/NehaKhann/ai-engineering-journey", live: null },
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
  { title: "Understanding Large Language Models — From Neural Networks to Production Inference", url: "https://medium.com/towards-artificial-intelligence/understanding-large-language-models-from-neural-networks-to-production-inference-02303c86eda9" },
  { title: "I Tried to Break an AI's Security — Here's Everything I Learned as a Complete Beginner", url: "https://medium.com/towards-artificial-intelligence/i-tried-to-break-an-ais-security-here-s-everything-i-learned-as-a-complete-beginner-56ac3d6e9fd9" },
];

export const skillGroups = [
  { label: "Modern Backend", items: ["Node.js", "Express.js", "Spring Boot", "Quarkus"] },
  { label: "AI / ML", items: ["LLM Fundamentals", "LoRA / QLoRA", "Hugging Face", "PyTorch", "LangChain", "RAG"], ai: true },
  { label: "Frontend", items: ["React.js", "Redux", "TypeScript", "JavaScript"] },
  { label: "Enterprise Java", items: ["Core Java", "JSP", "Struts", "JSF"] },
  { label: "Databases", items: ["MS SQL Server", "MySQL", "MongoDB"] },
  { label: "Tools", items: ["Git", "Docker", "Grafana", "Keycloak SSO"] },
];
