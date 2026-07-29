"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  index: string;
  type: "Independent" | "Publisher" | "Prototype";
  year: string;
  title: string;
  subtitle: string;
  statement: string;
  role: string;
  focus: string[];
  outcome: string;
  visual: "arena" | "world" | "lab";
};

const projects: Project[] = [
  {
    id: "nightshift",
    index: "01",
    type: "Independent",
    year: "DESIGN + DEVELOPMENT",
    title: "NIGHTSHIFT",
    subtitle: "A systems-first action game",
    statement:
      "Designed the core loop, tuned moment-to-moment combat, and built the playable experience end to end.",
    role: "Solo Game Designer & Developer",
    focus: ["Core loop", "Combat systems", "Level pacing"],
    outcome: "From blank page to a testable vertical slice.",
    visual: "arena",
  },
  {
    id: "worlds",
    index: "02",
    type: "Publisher",
    year: "PRODUCTION WORK",
    title: "PUBLISHED WORLDS",
    subtitle: "Design work for major publishers",
    statement:
      "Translated product goals into clear player-facing systems, collaborating across design, art, and engineering.",
    role: "Game Designer",
    focus: ["Feature design", "Documentation", "Cross-team delivery"],
    outcome: "Production-ready design within real constraints.",
    visual: "world",
  },
  {
    id: "sixty",
    index: "03",
    type: "Prototype",
    year: "RAPID R&D",
    title: "60-SECOND ARENA",
    subtitle: "A compact combat prototype",
    statement:
      "Built to answer one question fast: can a single mechanic create escalating tactical decisions in one minute?",
    role: "Game Designer & Prototyper",
    focus: ["Rapid iteration", "Balance", "Playtesting"],
    outcome: "A focused prototype that made the next decision obvious.",
    visual: "lab",
  },
];

const filters = ["All", "Independent", "Publisher", "Prototype"] as const;

function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  return (
    <div className={`project-visual visual-${variant}`} aria-hidden="true">
      <div className="visual-hud">
        <span>PLAYABLE BUILD</span>
        <span>● LIVE</span>
      </div>
      <div className="visual-stage">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <span className="player-marker"><i /></span>
        <span className="scanline" />
      </div>
      <div className="visual-footer">
        <span>DESIGN VIEW</span>
        <span>01 — 04</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="project-card">
      <button className="project-open" onClick={onOpen} aria-label={`View ${project.title} case study`}>
        <div className="project-topline">
          <span>{project.index}</span>
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
        <ProjectVisual variant={project.visual} />
        <div className="project-copy">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
          <span className="round-arrow" aria-hidden="true">↗</span>
        </div>
      </button>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const shownProjects = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Home">
          <span>YN</span><b>YOUR NAME</b>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-meta reveal-one">
          <span>GAME DESIGNER</span>
          <span>02+ YEARS IN PLAY</span>
          <span>OPEN TO OPPORTUNITIES</span>
        </div>
        <div className="hero-title">
          <p className="reveal-two">I design the</p>
          <h1 className="reveal-three">RULES<span>.</span></h1>
          <div className="title-row reveal-four">
            <span className="title-note">SYSTEMS / LEVELS / PROTOTYPES</span>
            <h2>Then build<br />the proof.</h2>
          </div>
        </div>
        <div className="hero-bottom reveal-four">
          <p>
            I turn player problems into clear systems,<br />
            testable prototypes, and memorable moments.
          </p>
          <a href="#work" className="scroll-link"><span>↓</span> Selected work</a>
        </div>
        <div className="hero-sigil" aria-hidden="true"><span /><i /></div>
      </section>

      <section className="work section-wrap" id="work">
        <div className="section-heading">
          <div>
            <span className="kicker">01 / SELECTED WORK</span>
            <h2>Games with<br />a point of view.</h2>
          </div>
          <p>A mix of self-directed games, publisher work, and fast prototypes—each shaped around a clear player experience.</p>
        </div>

        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""} aria-pressed={filter === item}>
              {item}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {shownProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setActiveProject(project)} />
          ))}
        </div>
      </section>

      <section className="approach section-wrap" id="approach">
        <div className="section-heading inverted">
          <div>
            <span className="kicker">02 / HOW I WORK</span>
            <h2>Find the fun.<br />Prove it early.</h2>
          </div>
          <p>Good design is a conversation between intent, player behavior, and the realities of production.</p>
        </div>
        <div className="process-grid">
          <article>
            <span>01</span>
            <h3>FRAME</h3>
            <p>Define the player promise, the design question, and the constraints worth protecting.</p>
          </article>
          <article>
            <span>02</span>
            <h3>BUILD</h3>
            <p>Create the smallest playable expression of the idea—using code, tools, or greybox.</p>
          </article>
          <article>
            <span>03</span>
            <h3>READ</h3>
            <p>Observe behavior, separate signal from noise, and turn feedback into a sharper next test.</p>
          </article>
          <article>
            <span>04</span>
            <h3>SHIP</h3>
            <p>Communicate clearly, collaborate closely, and carry the experience through production.</p>
          </article>
        </div>
      </section>

      <section className="about section-wrap" id="about">
        <span className="kicker">03 / ABOUT</span>
        <div className="about-grid">
          <h2>DESIGNER<br /><em>WHO BUILDS.</em></h2>
          <div className="about-copy">
            <p className="lead">For 2+ years, I’ve been turning design intent into things people can actually play.</p>
            <p>My work moves between systems design, rapid prototyping, level flow, balancing, and implementation. I’m most useful where a team needs someone who can think in player behavior and speak the language of production.</p>
            <div className="skills">
              <span>Systems Design</span><span>Rapid Prototyping</span><span>Level Design</span>
              <span>Economy & Balance</span><span>Unity / Unreal</span><span>Design Documentation</span>
            </div>
          </div>
        </div>
        <div className="ticker" aria-label="Core disciplines">
          <div>SYSTEMS <i>✦</i> PROTOTYPES <i>✦</i> PLAYER EXPERIENCE <i>✦</i> LEVELS <i>✦</i> SYSTEMS <i>✦</i> PROTOTYPES <i>✦</i></div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <span className="kicker">04 / LET’S TALK</span>
          <span>AVAILABLE FOR SELECTED OPPORTUNITIES</span>
        </div>
        <h2>LET’S MAKE<br /><em>SOMETHING PLAYABLE.</em></h2>
        <a className="contact-link" href="mailto:hello@yourname.com">
          <span>hello@yourname.com</span><b>↗</b>
        </a>
        <div className="footer-bottom">
          <span>© 2026 YOUR NAME</span>
          <div><a href="#">LINKEDIN</a><a href="#">ITCH.IO</a><a href="#">STEAM</a></div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>

      {activeProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveProject(null);
        }}>
          <article className="case-panel">
            <button className="case-close" onClick={() => setActiveProject(null)} aria-label="Close case study">×</button>
            <span className="kicker">{activeProject.index} / {activeProject.type}</span>
            <h2 id="case-title">{activeProject.title}</h2>
            <ProjectVisual variant={activeProject.visual} />
            <div className="case-details">
              <div><span>MY ROLE</span><p>{activeProject.role}</p></div>
              <div><span>DESIGN FOCUS</span><p>{activeProject.focus.join(" · ")}</p></div>
            </div>
            <p className="case-statement">{activeProject.statement}</p>
            <div className="case-outcome"><span>OUTCOME</span><p>{activeProject.outcome}</p></div>
          </article>
        </div>
      )}
    </main>
  );
}
