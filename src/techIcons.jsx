import {
  SiNodedotjs, SiExpress, SiSpring, SiQuarkus,
  SiHuggingface, SiPytorch, SiLangchain,
  SiReact, SiRedux, SiTypescript, SiJavascript,
  SiOpenjdk, SiMysql, SiMongodb,
  SiGit, SiDocker, SiGrafana, SiKeycloak,
  SiFastapi, SiPostgresql, SiPython, SiRabbitmq, SiVuedotjs,
  SiNextdotjs, SiOllama,
} from "react-icons/si";
import { Database, Cpu, Code2, Server, BrainCircuit, Layout, Coffee, Wrench, ShieldAlert, Waypoints, TrendingUp, MessageSquare, Sparkles, FileSearch } from "lucide-react";

// Maps a skill/tag label to a brand icon. Labels without a matching
// brand mark (JSP, Struts, conceptual items like "RAG") fall back to
// a neutral generic icon rather than going unlabeled.
const iconMap = {
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "Spring Boot": SiSpring,
  "Quarkus": SiQuarkus,
  "Hugging Face": SiHuggingface,
  "PyTorch": SiPytorch,
  "LangChain": SiLangchain,
  "React.js": SiReact,
  "React": SiReact,
  "Redux": SiRedux,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Core Java": SiOpenjdk,
  "Java": SiOpenjdk,
  "MySQL": SiMysql,
  "MongoDB": SiMongodb,
  "Git": SiGit,
  "Docker": SiDocker,
  "Grafana": SiGrafana,
  "Keycloak SSO": SiKeycloak,
  "FastAPI": SiFastapi,
  "PostgreSQL": SiPostgresql,
  "Python": SiPython,
  "RabbitMQ": SiRabbitmq,
  "Vue.js": SiVuedotjs,
  "MS SQL Server": Database,
  "LLM Fundamentals": Cpu,
  "LoRA / QLoRA": Cpu,
  "RAG": Cpu,
  "Vector DBs (FAISS/Chroma)": Database,
  "Microservices": Code2,
  "JSP": Code2,
  "Struts": Code2,
  "JSF": Code2,
  "AI Security": ShieldAlert,
  "LLM Security": ShieldAlert,
  "Prompt Injection": ShieldAlert,
  "Tool Poisoning": ShieldAlert,
  "Vulnerability Assessment": ShieldAlert,
  "Red Teaming": ShieldAlert,
  "Fine-tuning": Cpu,
  "MCP": Waypoints,
  "Model Context Protocol": Waypoints,
  "Risk Analysis": TrendingUp,
  "Financial Analysis": TrendingUp,
  "Fintech": TrendingUp,
  "Small Business Lending": TrendingUp,
  "Cashflow Underwriting": TrendingUp,
  "AI": BrainCircuit,
  "AI Engineering": BrainCircuit,
  "Deep Learning": BrainCircuit,
  "Machine Learning": BrainCircuit,
  "Generative AI": Sparkles,
  "LLM": Cpu,
  "LoRA": Cpu,
  "QLoRA": Cpu,
  "Quantization": Cpu,
  "RLHF": Cpu,
  "Transformers": Cpu,
  "Prompt Engineering": Cpu,
  "AI Security Training": ShieldAlert,
  "LLM Evaluation": ShieldAlert,
  "Security Scanner": ShieldAlert,
  "GenAI Security": ShieldAlert,
  "Vulnerability Scanner": ShieldAlert,
  "Security": ShieldAlert,
  "Static Analysis": FileSearch,
  "Chatbot": MessageSquare,
  "Ollama": SiOllama,
  "Next.js": SiNextdotjs,
  "Docker Sandbox": SiDocker,
  "Docker Compose": SiDocker,
  "Portfolio Project": Code2,
};

// Labels that belong to the AI/ML side of the purple(core)/teal(AI) system —
// styled consistently wherever a tag appears (skills, projects, experience),
// rather than each caller deciding on its own.
const aiLabels = new Set([
  "LLM Fundamentals", "LoRA / QLoRA", "Hugging Face", "PyTorch", "LangChain",
  "RAG", "Vector DBs (FAISS/Chroma)", "AI Security", "AI/ML", "LLMs",
  "LLM Security", "Prompt Injection", "Tool Poisoning", "Vulnerability Assessment",
  "Red Teaming", "Fine-tuning", "MCP", "Model Context Protocol",
  "AI", "AI Engineering", "Deep Learning", "Machine Learning", "Generative AI",
  "LLM", "LoRA", "QLoRA", "Quantization", "RLHF", "Transformers", "Prompt Engineering",
  "AI Security Training", "LLM Evaluation", "Security Scanner", "GenAI Security",
  "Vulnerability Scanner", "Security", "Chatbot",
]);

// Standard GitHub linguist colors, applied consistently across every
// project's language bar so a given language is always the same hue.
export const languageColors = {
  "Java": "#b07219",
  "TypeScript": "#3178c6",
  "CSS": "#563d7c",
  "HTML": "#e34c26",
  "Dockerfile": "#384d54",
  "Python": "#3572A5",
  "JavaScript": "#f1e05a",
  "Jupyter Notebook": "#DA5B0B",
  "Shell": "#89e051",
  "Other": "var(--text-faint)",
};

// Per-category presentation for the Skills section — an icon + one-line
// caption so every card carries comparable visual weight regardless of how
// many tags it holds, plus a consistent purple(core)/teal(AI) icon chip.
export const categoryMeta = {
  "Modern Backend": { icon: Server, caption: "APIs, services & runtime" },
  "AI / ML": { icon: BrainCircuit, caption: "Fine-tuning, RAG & LLM tooling" },
  "Frontend": { icon: Layout, caption: "Client-side interfaces" },
  "Enterprise Java": { icon: Coffee, caption: "Legacy enterprise stack" },
  "Databases": { icon: Database, caption: "Storage & persistence" },
  "Tools": { icon: Wrench, caption: "Infra, auth & observability" },
};

export function TechTag({ label, className = "" }) {
  const Icon = iconMap[label];
  const isAi = aiLabels.has(label);
  return (
    <span className={`nk-tag ${isAi ? "nk-tag-ai" : ""} ${className}`}>
      {Icon && <Icon size={12} style={{ flexShrink: 0 }} aria-hidden="true" />}
      {label}
    </span>
  );
}
