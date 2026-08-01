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
    artwork: "/miner-tycoon.png",
    screenshot: "/miner-tycoon-hero.jpg",
    description: "An explosive mining tycoon experience combining discovery, production chains, collection, and long-term progression.",
    focus: "Tycoon progression · Economy design · Content systems",
    downloads: "1M+",
    appStore: "https://apps.apple.com/us/app/miner-tycoon-big-dynamite/id1624886117",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.minertycoonbigdynamite",
  },
];

type Prototype = {
  id: string;
  name: string;
  artwork: string;
  appStore: string;
};

const prototypes: Prototype[] = [
  { id: "6759793094", name: "Warship Master Arena!", artwork: "/prototypes/6759793094.jpg", appStore: "https://apps.apple.com/tr/app/warship-master-arena/id6759793094?l=tr" },
  { id: "6756562405", name: "Fall of the Ages", artwork: "/prototypes/6756562405.jpg", appStore: "https://apps.apple.com/tr/app/fall-of-the-ages/id6756562405?l=tr" },
  { id: "6756109998", name: "Space: Hole Squad", artwork: "/prototypes/6756109998.jpg", appStore: "https://apps.apple.com/tr/app/space-hole-squad/id6756109998?l=tr" },
  { id: "6753949871", name: "Fill Defense: Bouncy Balls", artwork: "/prototypes/6753949871.jpg", appStore: "https://apps.apple.com/tr/app/fill-defense-bouncy-balls/id6753949871?l=tr" },
  { id: "6753219302", name: "Swipe Heroes: City Battle", artwork: "/prototypes/6753219302.jpg", appStore: "https://apps.apple.com/tr/app/swipe-heroes-city-battle/id6753219302?l=tr" },
  { id: "6752393093", name: "Trap Defense: Stop Them!", artwork: "/prototypes/6752393093.jpg", appStore: "https://apps.apple.com/tr/app/trap-defense-stop-them/id6752393093?l=tr" },
  { id: "6751239129", name: "Boat Defense: Bag Blast", artwork: "/prototypes/6751239129.jpg", appStore: "https://apps.apple.com/tr/app/boat-defense-bag-blast/id6751239129?l=tr" },
  { id: "6749848532", name: "Helix Fight", artwork: "/prototypes/6749848532.jpg", appStore: "https://apps.apple.com/tr/app/helix-fight/id6749848532?l=tr" },
  { id: "6748298946", name: "Hexile TD", artwork: "/prototypes/6748298946.jpg", appStore: "https://apps.apple.com/tr/app/hexile-td/id6748298946?l=tr" },
  { id: "6747806273", name: "Bouncy Dice: Loop Defense", artwork: "/prototypes/6747806273.jpg", appStore: "https://apps.apple.com/tr/app/bouncy-dice-loop-defense/id6747806273?l=tr" },
  { id: "6747190560", name: "Dice Cannon: Battle Roll", artwork: "/prototypes/6747190560.jpg", appStore: "https://apps.apple.com/tr/app/dice-cannon-battle-roll/id6747190560?l=tr" },
  { id: "6742712617", name: "Go Go Hero!", artwork: "/prototypes/6742712617.jpg", appStore: "https://apps.apple.com/tr/app/go-go-hero/id6742712617?l=tr" },
  { id: "6741387527", name: "Super TD Bros", artwork: "/prototypes/6741387527.jpg", appStore: "https://apps.apple.com/tr/app/super-td-bros/id6741387527?l=tr" },
  { id: "6740339420", name: "Bullet Merge Master", artwork: "/prototypes/6740339420.jpg", appStore: "https://apps.apple.com/tr/app/bullet-merge-master/id6740339420?l=tr" },
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

  useEffect(() => {
    const sessionKey = "portfolio-location-visit-recorded";
    if (window.sessionStorage.getItem(sessionKey)) return;

    window.sessionStorage.setItem(sessionKey, "true");
    void fetch("/api/analytics/visit", {
      method: "POST",
      keepalive: true,
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) window.sessionStorage.removeItem(sessionKey);
      })
      .catch(() => {
        window.sessionStorage.removeItem(sessionKey);
      });
  }, []);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + games.length) % games.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % games.length);

  return (
    <main>
      <aside className="profile-strip" aria-label="Profile and contact information">
        <a className="profile-strip-person" href="https://www.linkedin.com/in/anilatli/" target="_blank" rel="noreferrer">
          <img src="/anil-atli-profile.jpg" alt="Anıl Atlı" />
          <span><strong>ANIL ATLI</strong><small>GAME DESIGNER</small></span>
        </a>
        <div className="profile-strip-contact">
          <a href="mailto:mr.atli.anil@gmail.com"><small>EMAIL</small><strong>mr.atli.anil@gmail.com</strong></a>
          <a href="tel:+905319578411"><small>PHONE</small><strong>0531 957 84 11</strong></a>
          <span className="profile-location"><small>LOCATION</small><strong>ISTANBUL</strong></span>
        </div>
      </aside>
      <header className="topbar">
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#games" onClick={() => setMenuOpen(false)}>Games</a>
          <a href="#prototypes" onClick={() => setMenuOpen(false)}>Prototypes</a>
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
        <div className="section-intro global-launch-intro">
          <span>GLOBAL RELEASES / 3 TITLES</span>
          <h2>GLOBAL LAUNCH GAMES<span>.</span></h2>
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
                  <span>ROLE</span>
                  <strong>Game Designer</strong>
                  <span className="focus-label">DESIGN FOCUS</span>
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

      <section className="prototypes" id="prototypes">
        <div className="prototype-intro">
          <h2>MY<br />PROTOTYPES<span>.</span></h2>
        </div>

        <div className="prototype-grid">
          {prototypes.map((prototype, index) => (
            <a className="prototype-card" href={prototype.appStore} target="_blank" rel="noreferrer" key={prototype.id} aria-label={`Open ${prototype.name} on the App Store`}>
              <img src={prototype.artwork} alt={`${prototype.name} app icon`} />
              <div className="prototype-card-copy">
                <span>PROTOTYPE {String(index + 1).padStart(2, "0")}</span>
                <h3>{prototype.name}</h3>
                <small>ROLE · GAME DESIGNER</small>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
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
        <a className="email" href="mailto:mr.atli.anil@gmail.com"><span>mr.atli.anil@gmail.com</span><b>↗</b></a>
        <div className="footer-row">
          <span>© 2026 ANIL ATLI</span>
          <div><a href="https://www.linkedin.com/in/anilatli/" target="_blank" rel="noreferrer">LINKEDIN</a><a href="#">ITCH.IO</a><a href="#">STEAM</a></div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
