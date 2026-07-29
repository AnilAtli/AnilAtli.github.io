"use client";

import { useEffect, useState } from "react";

type Game = {
  number: string;
  slug: string;
  name: string;
  subtitle: string;
  genre: string;
  publisher: string;
  artwork: string;
  screenshot: string;
  description: string;
  focus: string;
  downloads: string;
  appStore: string;
  googlePlay: string;
};

const games: Game[] = [
  {
    number: "01",
    slug: "drop-away",
    name: "Drop Away",
    subtitle: "Color Puzzle",
    genre: "Puzzle",
    publisher: "Rollic Games",
    artwork: "/drop-away.jpg",
    screenshot: "/drop-away-hero.jpg",
    description: "A vibrant color-matching puzzle built around spatial reasoning, clear interactions, and progressively layered challenges.",
    focus: "Puzzle systems · Level progression · Difficulty pacing",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/drop-away-color-puzzle/id6648791704",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.dropaway",
  },
  {
    number: "02",
    slug: "battle-bag",
    name: "Battle Bag",
    subtitle: "War Zone",
    genre: "Strategy",
    publisher: "Voodoo",
    artwork: "/battle-bag.jpg",
    screenshot: "/battle-bag-hero.jpg",
    description: "A tactical backpack strategy game where loadout placement, unit connections, and smart upgrades shape every auto-battle.",
    focus: "Inventory strategy · Unit synergy · Combat balance",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/battle-bag-war-zone/id6746075769",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.battlebagwarzone",
  },
  {
    number: "03",
    slug: "miner-tycoon",
    name: "Miner Tycoon",
    subtitle: "Big Dynamite",
    genre: "Simulation",
    publisher: "Brew Games",
    artwork: "/miner-tycoon.jpg",
    screenshot: "/miner-tycoon-hero.jpg",
    description: "An explosive mining tycoon experience combining discovery, production chains, collection, and long-term progression.",
    focus: "Tycoon progression · Economy design · Content systems",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/miner-tycoon-big-dynamite/id1624886117",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.minertycoonbigdynamite",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeGame = games[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % games.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + games.length) % games.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % games.length);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Home">
          <span>YN</span>
          <strong>YOUR NAME</strong>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#games" onClick={() => setMenuOpen(false)}>Games</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <section className={`hero hero-${activeGame.slug}`} id="top" aria-roledescription="carousel" aria-label="Featured games">
        <div className="hero-backdrop" aria-hidden="true">
          <img key={`backdrop-${activeGame.slug}`} src={activeGame.screenshot} alt="" />
        </div>
        <div className="hero-slide" key={activeGame.slug}>
          <div className="hero-slide-copy">
            <div className="hero-meta">
              <span>0{activeSlide + 1} / 03</span>
              <span>{activeGame.genre}</span>
              <span>{activeGame.publisher}</span>
            </div>
            <p className="hero-role">GAME DESIGNER · PUBLISHED TITLE</p>
            <div className="hero-name-row">
              <img src={activeGame.artwork} alt="" aria-hidden="true" />
              <div><h1>{activeGame.name}</h1><h2>{activeGame.subtitle}</h2></div>
            </div>
            <p className="hero-description">{activeGame.description}</p>
            <div className="hero-actions">
              <a href={`#${activeGame.slug}`}>View project <b>↓</b></a>
              <a href={activeGame.googlePlay} target="_blank" rel="noreferrer">Play Store <b>↗</b></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-shot">
              <img src={activeGame.screenshot} alt={`${activeGame.name} gameplay screenshot`} />
            </div>
            <div className="hero-downloads"><strong>{activeGame.downloads}</strong><span>GOOGLE PLAY<br />DOWNLOADS</span></div>
          </div>
        </div>
        <div className="slider-controls">
          <div className="slider-dots" role="tablist" aria-label="Choose featured game">
            {games.map((game, index) => (
              <button key={game.slug} className={index === activeSlide ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show ${game.name}`} aria-selected={index === activeSlide}><span /></button>
            ))}
          </div>
          <div className="slider-arrows">
            <button onClick={showPrevious} aria-label="Previous game">←</button>
            <button onClick={showNext} aria-label="Next game">→</button>
          </div>
        </div>
      </section>

      <section className="games" id="games">
        <div className="section-intro">
          <span>SELECTED WORK / 2022—2026</span>
          <h2>I MAKE<br />GAMES<span>.</span></h2>
          <p>Published titles shaped around clear player decisions, satisfying feedback, and systems that hold up in production.</p>
        </div>

        <div className="game-list">
          {games.map((game) => (
            <article className={`game-panel ${game.slug}`} key={game.slug} id={game.slug}>
              <div className="game-info">
                <div className="game-kicker"><span>{game.number}</span><span>{game.genre}</span><span>{game.publisher}</span></div>
                <div className="game-name-row"><img src={game.artwork} alt="" aria-hidden="true" /><h3>{game.name}</h3></div>
                <h4>{game.subtitle}</h4>
                <p>{game.description}</p>
                <div className="game-focus">
                  <span>DESIGN FOCUS</span>
                  <strong>{game.focus}</strong>
                </div>
                <div className="store-links">
                  <a href={game.appStore} target="_blank" rel="noreferrer">App Store <b>↗</b></a>
                  <a href={game.googlePlay} target="_blank" rel="noreferrer">Google Play <b>↗</b></a>
                </div>
              </div>
              <div className="game-stage">
                <div className="install-badge"><strong>{game.downloads}</strong><span>GOOGLE PLAY<br />DOWNLOADS</span></div>
                <img src={game.artwork} alt={`${game.name}: ${game.subtitle} app icon`} />
                <span className="stage-ring ring-one" />
                <span className="stage-ring ring-two" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-title">
          <span>ABOUT ME</span>
          <h2>DESIGNER<br /><em>WHO BUILDS.</em></h2>
        </div>
        <div className="about-copy">
          <p className="lead">I design the player experience—and get close enough to the build to prove it works.</p>
          <p>For 2+ years, I’ve worked across systems design, rapid prototyping, level flow, balancing, and implementation. I’m most useful where a team needs clear design thinking, fast iteration, and honest collaboration.</p>
          <div className="about-stats">
            <div><strong>3</strong><span>Published titles</span></div>
            <div><strong>3M+</strong><span>Combined Google Play downloads</span></div>
            <div><strong>2+</strong><span>Years designing games</span></div>
          </div>
        </div>
      </section>

      <section className="expertise" id="expertise">
        <div className="expertise-head">
          <span>WHAT I BRING</span>
          <h2>FROM QUESTION<br />TO PLAYABLE.</h2>
        </div>
        <div className="discipline-list">
          <article><span>01</span><h3>Systems Design</h3><p>Core loops, economies, progression, rules, and the decisions that keep players engaged.</p></article>
          <article><span>02</span><h3>Rapid Prototyping</h3><p>Small, focused builds that answer the riskiest design question before production gets expensive.</p></article>
          <article><span>03</span><h3>Level & Content Design</h3><p>Pacing, difficulty, onboarding, and reusable structures that make systems readable in play.</p></article>
          <article><span>04</span><h3>Production Design</h3><p>Clear documentation, cross-team communication, implementation support, and practical iteration.</p></article>
        </div>
      </section>

      <footer id="contact">
        <div className="contact-top"><span>CONTACT</span><span>OPEN TO SELECTED OPPORTUNITIES</span></div>
        <h2>LET’S MAKE<br /><em>SOMETHING PLAYABLE.</em></h2>
        <a className="email" href="mailto:hello@yourname.com"><span>hello@yourname.com</span><b>↗</b></a>
        <div className="footer-row">
          <span>© 2026 YOUR NAME</span>
          <div><a href="#">LINKEDIN</a><a href="#">ITCH.IO</a><a href="#">STEAM</a></div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
