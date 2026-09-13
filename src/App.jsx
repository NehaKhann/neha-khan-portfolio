import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, MapPin, Menu, X, Sparkles, Sun, Moon, Network, ShieldCheck, GraduationCap, Calendar, Download, Bug, Wand2 } from "lucide-react";
import { profile, getYearsOfExperience, getHeroStats, experience, projects, certifications, education, articles, skillGroups } from "./data.js";
import { TechTag, categoryMeta } from "./techIcons.jsx";
import { SiMedium } from "react-icons/si";

const projectIcons = {
  "MCP Trust Registry": Network,
  "SpringGuard": ShieldCheck,
  "AI Engineering Journey": GraduationCap,
  "AI Security — Garak": Bug,
  "AI Security — Gandalf": Wand2,
};

const themes = {
  dark: {
    "--bg": "#0A0E17", "--bg-elev": "#10161F", "--bg-elev-2": "#151C27",
    "--border": "rgba(255,255,255,0.08)", "--border-hover": "rgba(255,255,255,0.16)",
    "--text": "#E8ECF1", "--text-dim": "#8B97A8", "--text-faint": "#78818F",
    "--accent": "#8B6FFF", "--accent-soft": "rgba(139,111,255,0.12)",
    "--teal": "#34D6C4", "--teal-soft": "rgba(52,214,196,0.12)",
    "--nav-bg": "rgba(10,14,23,0.72)",
  },
  light: {
    "--bg": "#F7F5F0", "--bg-elev": "#FFFFFF", "--bg-elev-2": "#EFEBE2",
    "--border": "rgba(15,23,32,0.10)", "--border-hover": "rgba(15,23,32,0.22)",
    "--text": "#12181F", "--text-dim": "#4B5768", "--text-faint": "#687180",
    "--accent": "#6D4FE0", "--accent-soft": "rgba(109,79,224,0.10)",
    "--teal": "#0C7E71", "--teal-soft": "rgba(15,156,140,0.10)",
    "--nav-bg": "rgba(247,245,240,0.78)",
  },
};


const styles = `
  :root {
    --bg: #0A0E17;
    --bg-elev: #10161F;
    --bg-elev-2: #151C27;
    --border: rgba(255,255,255,0.08);
    --border-hover: rgba(255,255,255,0.16);
    --text: #E8ECF1;
    --text-dim: #8B97A8;
    --text-faint: #78818F;
    --accent: #8B6FFF;
    --accent-soft: rgba(139,111,255,0.12);
    --teal: #34D6C4;
    --teal-soft: rgba(52,214,196,0.12);
  }
  .nk-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .nk-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-feature-settings: "cv11", "ss01"; }
  h1, h2, h3 { text-wrap: balance; }
  .nk-root { background: var(--bg); color: var(--text); transition: background 0.3s ease, color 0.3s ease; }
  .nk-glass {
    background: var(--bg-elev);
    border: 1px solid var(--border);
  }
  .nk-glass:hover { border-color: var(--border-hover); }
  .nk-nav {
    background: var(--nav-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .nk-glow-violet {
    background: radial-gradient(ellipse 55% 45% at 30% 20%, rgba(139,111,255,0.22), transparent 60%),
                radial-gradient(ellipse 45% 40% at 80% 60%, rgba(52,214,196,0.14), transparent 60%);
  }
  .nk-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid var(--border);
    color: var(--text-dim);
    white-space: nowrap;
    letter-spacing: 0.01em;
  }
  .nk-tag-ai {
    border-color: rgba(52,214,196,0.35);
    color: var(--teal);
    background: var(--teal-soft);
  }
  .nk-tag {
    transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
  }
  .nk-tag:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
    color: var(--text);
    transform: translateY(-1px);
  }
  .nk-tag-ai:hover {
    border-color: var(--teal);
    background: var(--teal-soft);
    color: var(--teal);
  }
  .nk-tag-compact {
    padding: 2px 8px;
    font-size: 0.68rem;
    gap: 4px;
  }
  .nk-tab {
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  }
  .nk-tab:hover {
    border-color: var(--accent);
    color: var(--text);
  }
  .nk-skill-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }
  .nk-card:hover .nk-skill-icon {
    transform: scale(1.08);
  }
  .nk-btn-primary {
    background: var(--accent);
    color: #0A0E17;
    font-weight: 600;
    transition: transform 0.15s ease, box-shadow 0.2s ease;
    box-shadow: 0 0 0 rgba(139,111,255,0);
  }
  .nk-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(139,111,255,0.35);
  }
  .nk-btn-secondary {
    background: transparent;
    color: var(--text);
    font-weight: 600;
    border: 1px solid var(--border-hover);
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }
  .nk-btn-secondary:hover {
    transform: translateY(-1px);
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .nk-navlink {
    position: relative;
    padding-bottom: 3px;
  }
  .nk-navlink::after {
    content: "";
    position: absolute;
    left: 0; right: 100%; bottom: 0;
    height: 1.5px;
    background: var(--accent);
    transition: right 0.2s ease;
  }
  .nk-navlink:hover::after, .nk-navlink[aria-current="true"]::after {
    right: 0;
  }
  .nk-card {
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .nk-card:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
  }
  .nk-social-icon {
    transition: transform 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }
  .nk-social-icon:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    color: var(--accent);
  }
  .nk-live-link svg {
    transition: transform 0.15s ease;
  }
  .nk-live-link:hover svg {
    transform: translate(2px, -2px);
  }
  .nk-link {
    text-decoration: none;
    color: var(--text-dim);
    transition: color 0.15s ease;
  }
  .nk-link:hover { color: var(--text); }
  .nk-reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .nk-reveal.in { opacity: 1; transform: translateY(0); }
  @keyframes nkFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .nk-fade-in { animation: nkFadeUp 0.7s ease both; }
  .nk-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--teal);
    display: inline-block;
    box-shadow: 0 0 8px var(--teal);
  }
  @media (prefers-reduced-motion: reduce) {
    .nk-reveal { opacity: 1; transform: none; transition: none; }
    .nk-card:hover, .nk-btn-primary:hover { transform: none; }
    .nk-fade-in { animation: none; opacity: 1; }
  }
  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={`nk-reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function NavLink({ href, children, onClick, className = "", active = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`nk-sans nk-link nk-navlink text-sm ${className}`}
      style={active ? { color: "var(--text)" } : undefined}
      aria-current={active ? "true" : undefined}
    >
      {children}
    </a>
  );
}

function Avatar({ size = 56 }) {
  return (
    <div
      className="nk-mono"
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, var(--accent), var(--teal))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.34, fontWeight: 700, color: "#0A0E17",
      }}
    >
      NK
    </div>
  );
}

function SocialIconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="nk-link nk-social-icon"
      style={{
        width: "34px", height: "34px", borderRadius: "50%",
        border: "1px solid var(--border)", background: "var(--bg-elev)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {children}
    </a>
  );
}

function NetworkGraphic({ className = "" }) {
  // A small, deliberately sparse node graph — a few labeled connections
  // rather than a dense mesh, so it reads as a diagram, not noise.
  const x1 = 30, x2 = 230, x3 = 430;
  const layer1 = [60, 400];
  const layer2 = [40, 230, 420];
  const layer3 = [80, 400];
  const links = [
    [x1, layer1[0], x2, layer2[0]],
    [x1, layer1[0], x2, layer2[1]],
    [x1, layer1[1], x2, layer2[1]],
    [x1, layer1[1], x2, layer2[2]],
    [x2, layer2[0], x3, layer3[0]],
    [x2, layer2[1], x3, layer3[0]],
    [x2, layer2[1], x3, layer3[1]],
    [x2, layer2[2], x3, layer3[1]],
  ];

  return (
    <svg viewBox="0 0 460 460" className={className} style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <filter id="nkGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {links.map(([lx1, ly1, lx2, ly2], i) => (
        <line key={i} x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="var(--border-hover)" strokeWidth="1" opacity="0.5" />
      ))}
      {/* signal-flow accent lines */}
      <line x1={x1} y1={layer1[0]} x2={x2} y2={layer2[1]} stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.8">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.6s" repeatCount="indefinite" />
      </line>
      <line x1={x2} y1={layer2[1]} x2={x3} y2={layer3[1]} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.8">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="2s" repeatCount="indefinite" />
      </line>

      {layer1.map((y, i) => <circle key={`n1-${i}`} cx={x1} cy={y} r="6" fill="var(--text-faint)" />)}
      {layer2.map((y, i) => (
        <circle key={`n2-${i}`} cx={x2} cy={y} r={i === 1 ? 8 : 6}
          fill={i === 1 ? "var(--teal)" : "var(--text-faint)"}
          filter={i === 1 ? "url(#nkGlow)" : undefined} />
      ))}
      {layer3.map((y, i) => (
        <circle key={`n3-${i}`} cx={x3} cy={y} r="8" fill="var(--accent)" filter="url(#nkGlow)" />
      ))}
    </svg>
  );
}

// Bolds measurable figures (e.g. "50%") inline so results stand out
// through weight alone, without adding colored boxes around them.
function highlightMetrics(text) {
  return text.split(/(\d+%|\$\d[\d,.]*[kKmM]?)/g).map((part, i) =>
    /^(\d+%|\$\d)/.test(part)
      ? <strong key={i} style={{ fontWeight: 700, color: "var(--text)" }}>{part}</strong>
      : part
  );
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("nk-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState("about");
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => { document.body.style.margin = "0"; }, []);
  useEffect(() => { window.localStorage.setItem("nk-theme", theme); }, [theme]);

  const sections = [["#about", "About"], ["#projects", "Projects"], ["#experience", "Experience"], ["#skills", "Skills"], ["#contact", "Contact"]];

  useEffect(() => {
    const ids = sections.map(([href]) => href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const yearsExp = getYearsOfExperience();
  const heroStats = getHeroStats(yearsExp);
  const resumeUrl = "/neha-khan-resume.pdf";
  const projectCategories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="nk-root nk-sans" style={{ minHeight: "100vh", ...themes[theme] }}>
      <style>{styles}</style>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only"
        style={{ position: "fixed", top: "8px", left: "8px", zIndex: 100, background: "var(--accent)", color: "#0A0E17", padding: "10px 16px", borderRadius: "6px", fontWeight: 600, fontSize: "0.85rem" }}
      >
        Skip to content
      </a>

      <header className="nk-nav" style={{ position: "sticky", top: 0, zIndex: 40 }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="nk-mono text-sm" style={{ color: "var(--text)" }}>neha<span style={{ color: "var(--accent)" }}>.</span>khan</span>
          <nav className="hidden lg:flex items-center gap-5">
            {sections.map(([href, label]) => (
              <NavLink key={href} href={href} active={activeSection === href.slice(1)}>{label}</NavLink>
            ))}
            <a href={resumeUrl} download="Neha-Khan-Resume.pdf" className="nk-sans nk-link nk-navlink text-sm flex items-center gap-1.5">
              <Download size={14} aria-hidden="true" /> Resume
            </a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: "6px", width: "40px", height: "40px", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={`mailto:${profile.email}`} className="nk-btn-primary" style={{ padding: "10px 16px", borderRadius: "6px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", minHeight: "40px" }}>Get in touch</a>
          </nav>
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: "6px", width: "40px", height: "40px", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button style={{ color: "var(--text)", background: "none", border: "none", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden flex flex-col gap-1 px-6 pb-5">
            {sections.map(([href, label]) => (
              <NavLink key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2.5" active={activeSection === href.slice(1)}>{label}</NavLink>
            ))}
            <a
              href={resumeUrl}
              download="Neha-Khan-Resume.pdf"
              className="nk-btn-secondary text-center mt-3 flex items-center justify-center gap-2"
              style={{ padding: "10px 16px", borderRadius: "6px", fontSize: "0.9rem" }}
              onClick={() => setMenuOpen(false)}
            >
              <Download size={15} aria-hidden="true" /> Download Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="nk-btn-primary text-center mt-2"
              style={{ padding: "10px 16px", borderRadius: "6px", fontSize: "0.9rem" }}
              onClick={() => setMenuOpen(false)}
            >
              Get in touch
            </a>
          </div>
        )}
      </header>

      <main id="main-content">
      {/* HERO */}
      <section className="nk-glow-violet" style={{ position: "relative", overflow: "hidden" }}>
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "-6%", right: "-2%", opacity: 0.9, pointerEvents: "none" }} className="hidden lg:block w-[38%] h-[95%] xl:w-[48%] xl:h-[106%] 2xl:w-[54%] 2xl:h-[112%]">
            <NetworkGraphic />
          </div>
          <div className="nk-fade-in flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Avatar />
              <span style={{ color: "var(--text-dim)", fontSize: "1.05rem" }}>Hi, I'm Neha 👋</span>
            </div>
            <div className="flex items-center gap-2.5">
              <SocialIconLink href={profile.linkedin} label="LinkedIn">
                <Linkedin size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={profile.github} label="GitHub">
                <Github size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={profile.medium} label="Medium">
                <SiMedium size={13} aria-hidden="true" />
              </SocialIconLink>
            </div>
          </div>
          <div className="nk-fade-in inline-flex items-center gap-2 nk-mono text-xs mb-7" style={{ animationDelay: "80ms", color: "var(--teal)", border: "1px solid rgba(52,214,196,0.3)", background: "var(--teal-soft)", padding: "6px 14px", borderRadius: "20px" }}>
            <span className="nk-dot" /> Open to full-stack &amp; AI engineering roles
          </div>
          <h1 className="nk-fade-in nk-sans" style={{ animationDelay: "150ms", fontSize: "clamp(2.4rem, 5.2vw, 4.1rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: "min(18ch, 640px)", color: "var(--text)" }}>
            Software Engineer.<br />Now expanding into AI Engineering.
          </h1>
          <p className="nk-fade-in mt-7 max-w-lg" style={{ animationDelay: "230ms", color: "var(--text-dim)", fontSize: "1.1rem", lineHeight: 1.65 }}>
            {yearsExp}+ years building production backend systems — now going deep on LLM fine-tuning,
            RAG, and AI security to bring both worlds into one practice.
          </p>
          <div className="nk-fade-in mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "300ms" }}>
            <a href={`mailto:${profile.email}`} className="nk-btn-primary" style={{ padding: "12px 24px", borderRadius: "8px", fontSize: "0.95rem" }}>Get in touch</a>
            <a href="#projects" className="nk-btn-secondary" style={{ padding: "12px 24px", borderRadius: "8px", fontSize: "0.95rem", textDecoration: "none" }}>See the work</a>
          </div>
          <span className="nk-fade-in mt-6 flex items-center gap-1.5 text-sm" style={{ animationDelay: "300ms", color: "var(--text-faint)" }}>
            <MapPin size={14} /> Karachi, Pakistan
          </span>

          <div className="nk-fade-in mt-16 grid grid-cols-3 max-w-md gap-4 sm:gap-8" style={{ animationDelay: "370ms" }}>
            {heroStats.map(([num, label]) => (
              <div key={label}>
                <div className="nk-mono" style={{ fontSize: "1.7rem", color: "var(--text)", fontWeight: 600 }}>{num}</div>
                <div className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>01 — About</p>
              <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "2rem" }}>
                Built enterprise systems. Now building the AI layer on top of them.
              </h2>

              <div className="mb-6">
                <p className="nk-mono text-xs mb-2" style={{ color: "var(--text-faint)" }}>Background</p>
                <p style={{ color: "var(--text-dim)", lineHeight: 1.75, maxWidth: "56ch" }}>
                  {yearsExp}+ years building enterprise systems in banking and product engineering — Core Java, Spring Boot, Quarkus, and the MERN stack.
                </p>
              </div>
              <div className="mb-6">
                <p className="nk-mono text-xs mb-2" style={{ color: "var(--teal)" }}>Now</p>
                <p style={{ color: "var(--text-dim)", lineHeight: 1.75, maxWidth: "56ch" }}>
                  Going deep on AI engineering: LLM fundamentals, fine-tuning with LoRA/QLoRA, retrieval-augmented generation, and AI security testing.
                </p>
              </div>
              <div className="mb-6">
                <p className="nk-mono text-xs mb-2" style={{ color: "var(--text-faint)" }}>Approach</p>
                <p style={{ color: "var(--text-dim)", lineHeight: 1.75, maxWidth: "56ch" }}>
                  Documenting the process publicly and shipping real, deployed projects — not stopping at tutorials.
                </p>
              </div>
              <div>
                <p className="nk-mono text-xs mb-2" style={{ color: "var(--text-faint)" }}>Based in</p>
                <p style={{ color: "var(--text-dim)", lineHeight: 1.75, maxWidth: "56ch" }}>
                  Karachi, Pakistan — open to relocating for {profile.relocation}.
                </p>
              </div>
            </div>

            <div className="nk-glass nk-card" style={{ borderRadius: "16px", padding: "2rem" }}>
              <p className="nk-mono text-xs mb-7" style={{ color: "var(--text-faint)" }}>Career trajectory</p>
              <div style={{ position: "relative", paddingLeft: "30px" }}>
                <div style={{ position: "absolute", left: "5px", top: "8px", bottom: "8px", width: "2px", background: "linear-gradient(var(--accent), var(--teal))" }} />
                <div style={{ position: "relative", marginBottom: "2.25rem" }}>
                  <div style={{ position: "absolute", left: "-30px", top: "5px", width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>Full-Stack / Backend Engineer</h3>
                  <p className="nk-mono text-xs mt-0.5 mb-2" style={{ color: "var(--text-faint)" }}>2022 — 2025</p>
                  <p className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>
                    Java, Spring Boot, Quarkus, Vue.js &amp; React — banking and enterprise systems.
                  </p>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "-30px", top: "5px", width: "12px", height: "12px", borderRadius: "50%", background: "var(--teal)", boxShadow: "0 0 0 4px var(--teal-soft)" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>AI Engineer <span className="nk-mono" style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--teal)" }}>(self-directed)</span></h3>
                  <p className="nk-mono text-xs mt-0.5 mb-2" style={{ color: "var(--text-faint)" }}>2025 — Present</p>
                  <p className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>
                    Still deep in it — LLM fine-tuning, RAG, AI security — {articles.length}+ articles published, {projects.length} projects shipped.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROJECTS — the centerpiece */}
      <section id="projects" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-elev)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>02 — Projects</p>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "0.5rem" }}>
              Real, deployed work
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--text-faint)" }}>Not tutorial clones — things that run, in production, right now.</p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {projectCategories.map((cat) => {
                const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    className="nk-mono nk-tab text-xs"
                    style={{
                      padding: "8px 16px", borderRadius: "20px",
                      border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                      background: active ? "var(--accent-soft)" : "var(--bg-elev)",
                      color: active ? "var(--accent)" : "var(--text-dim)",
                    }}
                  >
                    {cat} <span style={{ opacity: 0.7 }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((p, i) => {
              const Icon = projectIcons[p.name] || Sparkles;
              const nonFeaturedCount = filteredProjects.filter((x) => x.size !== "lg").length;
              const isTrailingOdd = i === filteredProjects.length - 1 && nonFeaturedCount % 2 === 1;
              const spanFull = p.size === "lg" || isTrailingOdd;
              return (
                <Reveal key={p.name} delay={i * 90} className={spanFull ? "md:col-span-2" : ""}>
                  <div className="nk-glass nk-card" style={{ borderRadius: "16px", overflow: "hidden", height: "100%", position: "relative" }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        height: p.size === "lg" ? "220px" : "170px", position: "relative", overflow: "hidden",
                        background: p.screenshot ? "var(--bg-elev-2)" : "linear-gradient(135deg, var(--accent-soft), var(--teal-soft))",
                        backgroundImage: p.screenshot ? undefined : "linear-gradient(135deg, var(--accent-soft), var(--teal-soft)), radial-gradient(var(--border-hover) 1px, transparent 1px)",
                        backgroundSize: p.screenshot ? undefined : "100% 100%, 16px 16px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {p.screenshot && (
                        <img
                          src={p.screenshot}
                          alt={`Screenshot of the ${p.name} homepage`}
                          loading="lazy"
                          decoding="async"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                        />
                      )}
                      {p.featured && (
                        <span className="nk-mono" style={{ position: "absolute", top: "14px", left: "16px", fontSize: "0.68rem", color: "var(--accent)", background: "var(--bg-elev)", border: "1px solid var(--border-hover)", padding: "3px 10px", borderRadius: "20px", zIndex: 1 }}>
                          ★ Featured
                        </span>
                      )}
                      {!p.screenshot && (
                        <Icon size={p.size === "lg" ? 40 : 30} style={{ color: "var(--teal)" }} aria-hidden="true" />
                      )}
                    </div>
                    <div style={{ padding: p.size === "lg" ? "2rem" : "1.75rem" }}>
                      <h3 style={{ fontSize: p.size === "lg" ? "1.5rem" : "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.65rem" }}>{p.name}</h3>
                      <p className="text-sm mb-5" style={{ color: "var(--text-dim)", lineHeight: 1.65, maxWidth: p.size === "lg" ? "60ch" : "none" }}>{p.tagline}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.tags.map((t) => <TechTag key={t} label={t} />)}
                      </div>
                      <div className="flex gap-5 text-sm">
                        <a href={p.github} target="_blank" rel="noreferrer" className="nk-link flex items-center gap-1.5 font-medium" style={{ color: "var(--text)" }}>
                          <Github size={15} /> Code
                        </a>
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noreferrer" className="nk-link nk-live-link flex items-center gap-1.5 font-medium" style={{ color: "var(--accent)" }}>
                            Live <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>03 — Experience</p>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "3rem" }}>
              Where I've built things
            </h2>
          </Reveal>
          <div className="grid gap-4">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 80}>
                <div className="nk-glass nk-card" style={{ borderRadius: "12px", padding: "1.25rem 1.5rem" }}>
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mb-2.5">
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>{job.company}</h3>
                    <span className="nk-mono text-xs" style={{ color: "var(--teal)" }}>{job.role}</span>
                    <span
                      className="nk-mono ml-auto inline-flex items-center gap-1"
                      style={{ color: "var(--text-faint)", fontSize: "0.7rem", padding: "2px 4px" }}
                    >
                      <Calendar size={11} aria-hidden="true" style={{ flexShrink: 0 }} /> {job.period}
                    </span>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm flex gap-2" style={{ color: "var(--text-dim)", lineHeight: 1.55, maxWidth: "70ch" }}>
                        <span aria-hidden="true" style={{ color: "var(--text-faint)", flexShrink: 0 }}>&ndash;</span>
                        <span>{highlightMetrics(b)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((t) => <TechTag key={t} label={t} className="nk-tag-compact" />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>04 — Skills</p>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "3rem" }}>
              What I work with
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skillGroups.map((g, i) => {
              const meta = categoryMeta[g.label] || {};
              const Icon = meta.icon;
              const accent = g.ai ? "var(--teal)" : "var(--accent)";
              const accentSoft = g.ai ? "var(--teal-soft)" : "var(--accent-soft)";
              return (
                <Reveal key={g.label} delay={i * 60}>
                  <div
                    className="nk-glass nk-card"
                    style={{ borderRadius: "14px", padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {Icon && (
                        <div
                          className="nk-skill-icon"
                          style={{ background: accentSoft, color: accent }}
                        >
                          <Icon size={16} aria-hidden="true" />
                        </div>
                      )}
                      <h3 className="text-sm font-semibold" style={{ color: g.ai ? "var(--teal)" : "var(--text)" }}>{g.label}</h3>
                    </div>
                    {meta.caption && (
                      <p className="text-xs mb-4" style={{ color: "var(--text-faint)" }}>{meta.caption}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {g.items.map((item) => <TechTag key={item} label={item} />)}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EDUCATION + CERTIFICATIONS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>05 — Education</p>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "2.5rem" }}>
            Foundations &amp; ongoing training
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="nk-glass nk-card" style={{ borderRadius: "14px", padding: "2rem", height: "100%" }}>
              <p className="nk-mono text-xs mb-2" style={{ color: "var(--text-faint)" }}>Education</p>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>{education.school}</h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-dim)" }}>{education.degree}</p>
              <p className="nk-mono text-sm mt-3" style={{ color: "var(--teal)" }}>{education.honor}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="nk-glass nk-card" style={{ borderRadius: "14px", padding: "2rem", height: "100%" }}>
              <p className="nk-mono text-xs mb-3" style={{ color: "var(--text-faint)" }}>Certifications &amp; training</p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c} className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WRITING */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>06 — Writing</p>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "0.5rem" }}>
              Notes from the AI engineering journey
            </h2>
            <p className="mb-10 text-sm" style={{ color: "var(--text-faint)" }}>Published technical write-ups on Medium.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((a, i) => (
              <Reveal key={a.url} delay={i * 60}>
                <a href={a.url} target="_blank" rel="noreferrer" className="nk-glass nk-card nk-live-link" style={{ display: "block", borderRadius: "12px", padding: "1.4rem", textDecoration: "none" }}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{a.title}</h3>
                    <ArrowUpRight size={15} style={{ color: "var(--text-faint)", flexShrink: 0, marginTop: 2 }} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <a href={profile.medium} target="_blank" rel="noreferrer" className="nk-link nk-live-link inline-flex items-center gap-1.5 text-sm mt-8" style={{ color: "var(--accent)" }}>
              Read more on Medium <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>
      </main>

      {/* CONTACT */}
      <footer id="contact" className="nk-glow-violet" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-12 text-center">
          <Reveal>
            <p className="nk-mono text-xs mb-4" style={{ color: "var(--accent)" }}>07 — Contact</p>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1.2rem" }}>
              Let's build something together.
            </h2>
            <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
              Open to full-stack and AI engineering roles — happy to talk about a role, a project, or just trade notes on LLMs.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a href={`mailto:${profile.email}`} className="nk-btn-primary" style={{ padding: "12px 26px", borderRadius: "8px", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Mail size={16} aria-hidden="true" /> {profile.email}
              </a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
              <SocialIconLink href={profile.linkedin} label="LinkedIn">
                <Linkedin size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={profile.github} label="GitHub">
                <Github size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={profile.medium} label="Medium">
                <SiMedium size={13} aria-hidden="true" />
              </SocialIconLink>
            </div>
            <a
              href={resumeUrl}
              download="Neha-Khan-Resume.pdf"
              className="nk-link inline-flex items-center gap-1.5 text-xs mt-7"
              style={{ color: "var(--text-dim)" }}
            >
              <Download size={13} aria-hidden="true" /> Download résumé (PDF)
            </a>
          </Reveal>
        </div>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap justify-center items-center gap-2 text-xs" style={{ color: "var(--text-faint)" }}>
            <span>&copy; {new Date().getFullYear()} {profile.name}</span>
            <span aria-hidden="true">&middot;</span>
            <span>Karachi, Pakistan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
