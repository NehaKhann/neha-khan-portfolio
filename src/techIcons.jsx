import {
  SiNodedotjs, SiExpress, SiSpring, SiQuarkus,
  SiHuggingface, SiPytorch, SiLangchain,
  SiReact, SiRedux, SiTypescript, SiJavascript,
  SiOpenjdk, SiMysql, SiMongodb,
  SiGit, SiDocker, SiGrafana, SiKeycloak,
  SiFastapi, SiPostgresql, SiPython, SiRabbitmq, SiVuedotjs,
} from "react-icons/si";
import { Database, Cpu, Code2 } from "lucide-react";

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
};

export function TechTag({ label, className = "" }) {
  const Icon = iconMap[label];
  return (
    <span className={`nk-tag ${className}`}>
      {Icon && <Icon size={12} style={{ flexShrink: 0 }} aria-hidden="true" />}
      {label}
    </span>
  );
}
