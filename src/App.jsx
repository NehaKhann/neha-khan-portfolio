import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, MapPin, Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { profile, heroStats, experience, projects, certifications, education, articles, skillGroups } from "./data.js";

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
  .nk-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .nk-sans { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif; }
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
  .nk-card {
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .nk-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
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
  .nk-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--teal);
    display: inline-block;
    box-shadow: 0 0 8px var(--teal);
  }
  @media (prefers-reduced-motion: reduce) {
    .nk-reveal { opacity: 1; transform: none; transition: none; }
    .nk-card:hover, .nk-btn-primary:hover { transform: none; }
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

function NavLink({ href, children, onClick, className = "" }) {
  return (
    <a href={href} onClick={onClick} className={`nk-sans nk-link text-sm ${className}`}>{children}</a>
  );
}

function NetworkGraphic({ className = "" }) {
  const layer1 = [80, 180, 280, 380];
  const layer2 = [50, 150, 250, 350, 440];
  const layer3 = [140, 300];
  const x1 = 40, x2 = 210, x3 = 380;
  const lines = [];
  layer1.forEach((y1, i) => layer2.forEach((y2, j) => lines.push(
    <line key={`l1-${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border-hover)" strokeWidth="1" opacity="0.5" />
  )));
  layer2.forEach((y2, i) => layer3.forEach((y3, j) => lines.push(
    <line key={`l2-${i}-${j}`} x1={x2} y1={y2} x2={x3} y2={y3} stroke="var(--border-hover)" strokeWidth="1" opacity="0.5" />
  )));

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
      {lines}
      {/* signal-flow accent lines */}
      <line x1={x1} y1={layer1[1]} x2={x2} y2={layer2[2]} stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.7">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.6s" repeatCount="indefinite" />
      </line>
      <line x1={x2} y1={layer2[3]} x2={x3} y2={layer3[1]} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.7">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="2s" repeatCount="indefinite" />
      </line>

      {layer1.map((y, i) => <circle key={`n1-${i}`} cx={x1} cy={y} r="5" fill="var(--text-faint)" />)}
      {layer2.map((y, i) => (
        <circle key={`n2-${i}`} cx={x2} cy={y} r={i === 2 ? 7 : 5}
          fill={i === 2 ? "var(--teal)" : "var(--text-faint)"}
          filter={i === 2 ? "url(#nkGlow)" : undefined} />
      ))}
      {layer3.map((y, i) => (
        <circle key={`n3-${i}`} cx={x3} cy={y} r="7" fill="var(--accent)" filter="url(#nkGlow)" />
      ))}
    </svg>
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
  useEffect(() => { document.body.style.margin = "0"; }, []);
  useEffect(() => { window.localStorage.setItem("nk-theme", theme); }, [theme]);

  const sections = [["#about", "About"], ["#experience", "Experience"], ["#projects", "Projects"], ["#skills", "Skills"], ["#contact", "Contact"]];

  return (
    <div className="nk-root nk-sans" style={{ minHeight: "100vh", ...themes[theme] }}>
      <style>{styles}</style>

      <header className="nk-nav" style={{ position: "sticky", top: 0, zIndex: 40 }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="nk-mono text-sm" style={{ color: "var(--text)" }}>neha<span style={{ color: "var(--accent)" }}>.</span>khan</span>
          <nav className="hidden md:flex items-center gap-6">
            {sections.map(([href, label]) => <NavLink key={href} href={href}>{label}</NavLink>)}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: "6px", width: "40px", height: "40px", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={`mailto:${profile.email}`} className="nk-btn-primary" style={{ padding: "10px 16px", borderRadius: "6px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", minHeight: "40px" }}>Get in touch</a>
          </nav>
          <div className="md:hidden flex items-center gap-3">
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
          <div className="md:hidden flex flex-col gap-1 px-6 pb-5">
            {sections.map(([href, label]) => (
              <NavLink key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2.5">{label}</NavLink>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="nk-btn-primary text-center mt-3"
              style={{ padding: "10px 16px", borderRadius: "6px", fontSize: "0.9rem" }}
              onClick={() => setMenuOpen(false)}
            >
              Get in touch
            </a>
          </div>
        )}
      </header>

      <main>
      {/* HERO */}
      <section className="nk-glow-violet" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-8%", right: "-6%", width: "56%", height: "120%", opacity: 0.9, pointerEvents: "none" }} className="hidden md:block">
          <NetworkGraphic />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36" style={{ position: "relative" }}>
          <div className="inline-flex items-center gap-2 nk-mono text-xs mb-7" style={{ color: "var(--teal)", border: "1px solid rgba(52,214,196,0.3)", background: "var(--teal-soft)", padding: "6px 14px", borderRadius: "20px" }}>
            <span className="nk-dot" /> Open to full-stack &amp; AI engineering roles
          </div>
          <h1 className="nk-sans" style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "16ch", color: "var(--text)" }}>
            Engineering systems.<br />Now teaching them to think.
          </h1>
          <p className="mt-7 max-w-lg" style={{ color: "var(--text-dim)", fontSize: "1.1rem", lineHeight: 1.65 }}>
            4+ years building production backend systems — now going deep on LLM fine-tuning,
            RAG, and AI security to bring both worlds into one practice.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#projects" className="nk-btn-primary" style={{ padding: "12px 24px", borderRadius: "8px", fontSize: "0.95rem" }}>See the work</a>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-faint)" }}>
              <MapPin size={14} /> {profile.location}
            </span>
          </div>

          <div className="mt-16 grid grid-cols-3 max-w-md gap-4 sm:gap-8">
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
              <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
                Built enterprise systems. Now building the AI layer on top of them.
              </h2>
              <p className="mt-5" style={{ color: "var(--text-dim)", lineHeight: 1.75, maxWidth: "56ch" }}>
                I've spent 4+ years in banking and product engineering — Core Java, Spring Boot, MERN.
                Over the past year I've gone deliberately deep into AI engineering: LLM fundamentals,
                fine-tuning with LoRA/QLoRA, retrieval-augmented generation, and AI security testing —
                documenting the process publicly and shipping real, deployed projects rather than
                stopping at tutorials.
              </p>
            </div>
            <div className="nk-glass nk-card" style={{ borderRadius: "12px", padding: "1.5rem", overflow: "hidden" }}>
              <div className="flex gap-1.5 mb-4">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              </div>
              <pre className="nk-mono" style={{ fontSize: "0.82rem", lineHeight: 1.8, color: "var(--text-dim)", margin: 0, whiteSpace: "pre-wrap" }}>
{`const engineer = {
  name: "Neha Khan",
  experience: "4+ years",
  core: ["Java", "Spring Boot", "MERN"],
  learning: [`}<span style={{ color: "var(--teal)" }}>"LLM fine-tuning"</span>{`,
             `}<span style={{ color: "var(--teal)" }}>"RAG"</span>{`,
             `}<span style={{ color: "var(--teal)" }}>"AI security"</span>{`],
  based_in: "Karachi, PK",
  open_to: ["remote", "Gulf", "Malaysia", "Germany"],
};`}
              </pre>
            </div>
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>02 — Experience</p>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "3rem" }}>
              Where I've built things
            </h2>
          </Reveal>
          <div className="grid gap-5">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 80}>
                <div className="nk-glass nk-card" style={{ borderRadius: "12px", padding: "1.75rem" }}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)" }}>{job.company}</h3>
                    <span className="nk-mono text-xs" style={{ color: "var(--teal)" }}>{job.role}</span>
                    <span className="nk-mono text-xs ml-auto" style={{ color: "var(--text-faint)" }}>{job.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.65, maxWidth: "70ch" }}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS — bento grid */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <p className="nk-mono text-xs mb-3" style={{ color: "var(--accent)" }}>03 — Projects</p>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "0.5rem" }}>
            Real, deployed work
          </h2>
          <p className="mb-10 text-sm" style={{ color: "var(--text-faint)" }}>Not tutorial clones — things that run.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className={p.size === "lg" ? "md:col-span-2" : ""}>
              <div className="nk-glass nk-card" style={{ borderRadius: "14px", padding: "2rem", height: "100%" }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 style={{ fontSize: p.size === "lg" ? "1.4rem" : "1.15rem", fontWeight: 700, color: "var(--text)" }}>{p.name}</h3>
                  <Sparkles size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 4 }} />
                </div>
                <p className="text-sm mb-5" style={{ color: "var(--text-dim)", lineHeight: 1.65, maxWidth: p.size === "lg" ? "60ch" : "none" }}>{p.tagline}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => <span key={t} className={`nk-tag ${t.includes("AI") ? "nk-tag-ai" : ""}`}>{t}</span>)}
                </div>
                <div className="flex gap-5 text-sm">
                  <a href={p.github} target="_blank" rel="noreferrer" className="nk-link flex items-center gap-1.5 font-medium" style={{ color: "var(--text)" }}>
                    <Github size={15} /> Code
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="nk-link flex items-center gap-1.5 font-medium" style={{ color: "var(--accent)" }}>
                      Live <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 60}>
                <div className="nk-glass nk-card" style={{ borderRadius: "12px", padding: "1.5rem", height: "100%" }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: g.ai ? "var(--teal)" : "var(--text)" }}>{g.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => <span key={item} className="nk-tag">{item}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
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
                <a href={a.url} target="_blank" rel="noreferrer" className="nk-glass nk-card" style={{ display: "block", borderRadius: "12px", padding: "1.4rem", textDecoration: "none" }}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{a.title}</h3>
                    <ArrowUpRight size={15} style={{ color: "var(--text-faint)", flexShrink: 0, marginTop: 2 }} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <a href={profile.medium} target="_blank" rel="noreferrer" className="nk-link inline-flex items-center gap-1.5 text-sm mt-8" style={{ color: "var(--accent)" }}>
              Read more on Medium <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>
      </main>

      {/* CONTACT */}
      <footer id="contact" className="nk-glow-violet" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <Reveal>
            <p className="nk-mono text-xs mb-4" style={{ color: "var(--accent)" }}>07 — Contact</p>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1.2rem" }}>
              Let's build something together.
            </h2>
            <a href={`mailto:${profile.email}`} className="nk-link" style={{ fontSize: "1.2rem", color: "var(--text)", fontWeight: 600, wordBreak: "break-word" }}>
              {profile.email}
            </a>
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-4 mt-10">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="nk-link flex items-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="nk-link flex items-center gap-2">
                <Github size={18} /> GitHub
              </a>
              <a href={`mailto:${profile.email}`} className="nk-link flex items-center gap-2">
                <Mail size={18} /> Email
              </a>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
