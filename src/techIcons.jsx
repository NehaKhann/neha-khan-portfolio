import {
  SiNodedotjs, SiExpress, SiSpring, SiQuarkus,
  SiHuggingface, SiPytorch, SiLangchain,
  SiReact, SiRedux, SiTypescript, SiJavascript,
  SiOpenjdk, SiMysql, SiMongodb,
  SiGit, SiDocker, SiGrafana, SiKeycloak,
  SiFastapi, SiPostgresql, SiPython, SiRabbitmq, SiVuedotjs,
} from "react-icons/si";
import { Database, Cpu, Code2, Server, BrainCircuit, Layout, Coffee, Wrench, ShieldAlert } from "lucide-react";

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
};

// Labels that belong to the AI/ML side of the purple(core)/teal(AI) system —
// styled consistently wherever a tag appears (skills, projects, experience),
// rather than each caller deciding on its own.
const aiLabels = new Set([
  "LLM Fundamentals", "LoRA / QLoRA", "Hugging Face", "PyTorch", "LangChain",
  "RAG", "Vector DBs (FAISS/Chroma)", "AI Security", "AI/ML", "LLMs",
  "LLM Security", "Prompt Injection",
]);

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
