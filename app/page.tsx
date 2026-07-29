"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  index: string;
  type: "Puzzle" | "Strategy" | "Simulation";
  year: string;
  title: string;
  subtitle: string;
  statement: string;
  role: string;
  focus: string[];
  outcome: string;
  visual: "arena" | "world" | "lab";
  artwork: string;
  publisher: string;
  downloads: string;
  appStore: string;
  googlePlay: string;
};

const projects: Project[] = [
  {
    id: "drop-away",
    index: "01",
    type: "Puzzle",
    year: "ROLLIC GAMES",
    title: "DROP AWAY",
    subtitle: "Color Puzzle",
    statement:
      "A vibrant color-matching puzzle built around spatial reasoning, clean interactions, and progressively layered challenges.",
    role: "Game Designer",
    focus: ["Puzzle systems", "Level progression", "Difficulty pacing"],
    outcome: "1M+ downloads on Google Play.",
    visual: "arena",
    artwork: "/drop-away.jpg",
    publisher: "Rollic Games",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/drop-away-color-puzzle/id6648791704",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.dropaway",
  },
  {
    id: "battle-bag",
    index: "02",
    type: "Strategy",
    year: "VOODOO",
    title: "BATTLE BAG",
    subtitle: "War Zone",
    statement:
      "A tactical backpack strategy game where loadout placement, unit connections, and smart upgrades shape every auto-battle.",
    role: "Game Designer",
    focus: ["Inventory strategy", "Unit synergy", "Combat balance"],
    outcome: "1M+ downloads on Google Play.",
    visual: "world",
    artwork: "/battle-bag.jpg",
    publisher: "Voodoo",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/battle-bag-war-zone/id6746075769",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.battlebagwarzone",
  },
  {
    id: "miner-tycoon",
    index: "03",
    type: "Simulation",
    year: "BREW GAMES",
    title: "MINER TYCOON",
    subtitle: "Big Dynamite",
    statement:
      "An explosive mining tycoon experience combining discovery, production chains, collection, and long-term progression.",
    role: "Game Designer",
    focus: ["Tycoon progression", "Economy design", "Content systems"],
    outcome: "1M+ downloads on Google Play.",
    visual: "lab",
    artwork: "/miner-tycoon.jpg",
    publisher: "Brew Games",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/miner-tycoon-big-dynamite/id1624886117",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.minertycoonbigdynamite",
  },
];

const filters = ["All", "Puzzle", "Strategy", "Simulation"] as const;

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.visual}`}>
      <div className="visual-hud">
        <span>{project.publisher}</span>
        <span>● RELEASED</span>
      </div>
      <div className="visual-stage">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <span className="player-marker"><i /></span>
        <span className="scanline" />
        <img className="game-artwork" src={project.artwork} alt={`${project.title} app icon`} />
      </div>
      <div className="visual-footer">
        <span>AVAILABLE NOW</span>
        <span>{project.downloads} DOWNLOADS</span>
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
        <ProjectVisual project={project} />
        <div className="project-copy">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
          <span className="round-arrow" aria-hidden="true">↗</span>
        </div>
      </button>
      <div className="project-store-row">
        <span className="download-stat"><b>{project.downloads}</b> Google Play downloads</span>
        <div>
          <a href={project.appStore} target="_blank" rel="noreferrer" aria-label={`${project.title} on the App Store`}>App Store ↗</a>
          <a href={project.googlePlay} target="_blank" rel="noreferrer" aria-label={`${project.title} on Google Play`}>Google Play ↗</a>
        </div>
      </div>
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
          <p>Three published mobile titles—built around tactile systems, clear player decisions, and production-ready design.</p>
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
            <ProjectVisual project={activeProject} />
            <div className="case-details">
              <div><span>MY ROLE</span><p>{activeProject.role}</p></div>
              <div><span>DESIGN FOCUS</span><p>{activeProject.focus.join(" · ")}</p></div>
            </div>
            <p className="case-statement">{activeProject.statement}</p>
            <div className="case-outcome"><span>OUTCOME</span><p>{activeProject.outcome}</p></div>
            <div className="case-store-links">
              <a href={activeProject.appStore} target="_blank" rel="noreferrer">View on the App Store ↗</a>
              <a href={activeProject.googlePlay} target="_blank" rel="noreferrer">View on Google Play ↗</a>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
