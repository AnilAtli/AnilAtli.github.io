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
    screenshot: "/battle-bag-gdd/appstore-defeat.webp",
    description: "A tactical backpack strategy game where loadout placement, unit connections, and smart upgrades shape every auto-battle.",
    focus: "Inventory strategy · Unit synergy · Combat balance",
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
    appStore: "https://apps.apple.com/us/app/miner-tycoon-big-dynamite/id1624886117",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brewgames.minertycoonbigdynamite",
  },
];

type Prototype = {
  id: string;
  name: string;
  artwork: string;
  appStore: string;
  role?: string;
  linkLabel?: string;
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
  { id: "castle-duel", name: "Castle Duel: PvP Card War", artwork: "/prototypes/castle-duel.jpg", appStore: "https://www.bluestacks.com/apps/strategy/castle-duel-pvp-card-war-on-pc.html", role: "GAME DESIGNER", linkLabel: "BlueStacks" },
  { id: "bullet-bounce-td", name: "Bullet Bounce TD", artwork: "/prototypes/bullet-bounce-td.png", appStore: "https://www.taptap.io/app/33817635", role: "GAME DESIGNER", linkLabel: "TapTap" },
  { id: "1496924171", name: "Draw Hit", artwork: "/prototypes/1496924171.jpg", appStore: "https://apps.apple.com/tr/app/draw-hit/id1496924171?l=tr", role: "GAME DEVELOPER" },
  { id: "6480042544", name: "Doodlemoji", artwork: "/prototypes/6480042544.jpg", appStore: "https://apps.apple.com/tr/app/doodlemoji/id6480042544?l=tr", role: "GAME DEVELOPER" },
  { id: "6737980296", name: "Pipe And Pop", artwork: "/prototypes/6737980296.jpg", appStore: "https://apps.apple.com/tr/app/pipe-and-pop/id6737980296?l=tr", role: "GAME DEVELOPER" },
];

const experience = [
  {
    company: "Brew Games",
    role: "Game Designer",
    period: "JAN 2025 - PRESENT",
    location: "ISTANBUL / TÜRKİYE",
    summary: "Designing mobile games from early concepts through global launch, with ownership across core systems, meta progression, live data, and monetization.",
    games: [
      { name: "Drop Away: Color Puzzle", artwork: "/drop-away.jpg", url: games[0].appStore },
      { name: "Battle Bag: War Zone", artwork: "/battle-bag.jpg", url: games[1].appStore },
      { name: "Miner Tycoon: Big Dynamite", artwork: "/miner-tycoon.png", url: games[2].appStore },
      ...prototypes
        .filter((prototype) => prototype.role !== "GAME DEVELOPER")
        .map(({ name, artwork, appStore }) => ({ name, artwork, url: appStore })),
    ],
  },
  {
    company: "Voodoo Academy",
    role: "Game Designer",
    period: "JAN 2025 - APR 2025",
    location: "ISTANBUL / TÜRKİYE",
    summary: "Built stronger product-thinking foundations through mentorship and training led by senior Product Managers and Game Designers at Voodoo.",
    games: [],
  },
  {
    company: "LootCoper Games",
    role: "Game Developer",
    period: "AUG 2024 - NOV 2024",
    location: "ISTANBUL / TÜRKİYE",
    summary: "Worked close to the build, turning early gameplay ideas into focused prototypes that could be tested and improved quickly.",
    games: prototypes
      .filter((prototype) => prototype.role === "GAME DEVELOPER")
      .map(({ name, artwork, appStore }) => ({ name, artwork, url: appStore })),
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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (window.location.hostname.endsWith("github.io")) return;

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
        <nav id="primary-navigation" className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#games" onClick={() => setMenuOpen(false)}>Games</a>
          <a href="#prototypes" onClick={() => setMenuOpen(false)}>Prototypes</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="primary-navigation" aria-expanded={menuOpen}>
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
              <span className="publisher-name">{activeGame.publisher}</span>
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
            <div className={`phone-shot phone-shot-${activeGame.slug}`}>
              <img src={activeGame.screenshot} alt={`${activeGame.name} gameplay screenshot`} />
            </div>
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
                <div className="game-kicker"><span>{game.number}</span><span>{game.genre}</span><span className="publisher-name">{game.publisher}</span></div>
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
                  {game.slug === "battle-bag" && <a href="#battle-bag-gdd">View GDD <b>↓</b></a>}
                </div>
              </div>
              <div className="game-stage">
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
            <a className="prototype-card" href={prototype.appStore} target="_blank" rel="noreferrer" key={prototype.id} aria-label={`Open ${prototype.name} on ${prototype.linkLabel ?? "the App Store"}`}>
              <img src={prototype.artwork} alt={`${prototype.name} app icon`} />
              <div className="prototype-card-copy">
                <div className="prototype-meta">
                  <span>PROTOTYPE {String(index + 1).padStart(2, "0")}</span>
                  <strong>{prototype.role === "GAME DEVELOPER" ? "LOOTCOPTER GAMES" : "BREW GAMES"}</strong>
                </div>
                <h3>{prototype.name}</h3>
                <small className={prototype.role === "GAME DEVELOPER" ? "game-developer" : undefined}>ROLE · {prototype.role ?? "GAME DESIGNER"}</small>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="battle-gdd" id="battle-bag-gdd">
        <header className="gdd-cover">
          <div className="gdd-cover-backdrop" aria-hidden="true"><img src="/battle-bag-gdd/appstore-defeat.webp" alt="" /></div>
          <div className="gdd-cover-copy">
            <span className="gdd-eyebrow">GAME DESIGN / 2025</span>
            <div className="gdd-title-row">
              <img src="/battle-bag.jpg" alt="Battle Bag app icon" />
              <div><h2>BATTLE<br />BAG<span>.</span></h2><p>WAR ZONE</p></div>
            </div>
            <p className="gdd-cover-lead">A tactical inventory auto-battler where the player wins before the first shot: fit the right pieces, connect units to weapons, and build a squad that can survive the next wave.</p>
            <div className="gdd-cover-actions">
              <a href="#gdd-overview">Explore the GDD <b>↓</b></a>
              <a href="https://apps.apple.com/us/app/battle-bag-war-zone/id6746075769" target="_blank" rel="noreferrer">App Store <b>↗</b></a>
            </div>
          </div>
          <dl className="gdd-facts">
            <div><dt>ROLE</dt><dd>Game Designer</dd></div>
            <div><dt>GENRE</dt><dd>Inventory Strategy / Auto-battler</dd></div>
            <div><dt>DESIGN FOCUS</dt><dd>Systems, economy, progression, balance</dd></div>
            <div><dt>STATUS</dt><dd>Global release</dd></div>
          </dl>
        </header>

        <nav className="gdd-chapters" aria-label="Battle Bag design chapters">
          <a href="#gdd-overview"><span>01</span>Overview</a>
          <a href="#gdd-mind-map"><span>02</span>Mind Map</a>
          <a href="#gdd-economy"><span>03</span>Economy</a>
          <a href="#gdd-balance"><span>04</span>Balance</a>
          <a href="#gdd-levels"><span>05</span>Levels</a>
          <a href="#gdd-documentation"><span>06</span>Evidence</a>
        </nav>

        <div className="gdd-body">
          <article className="gdd-panel gdd-overview" id="gdd-overview">
            <div className="gdd-section-heading">
              <span>01 / PRODUCT FOUNDATION</span>
              <h3>THE DESIGN<br /><em>QUESTION.</em></h3>
            </div>
            <div className="gdd-overview-grid">
              <div className="gdd-statement">
                <span>CORE CHALLENGE</span>
                <p>How can a mobile strategy game create meaningful decisions with one-thumb input, then turn those decisions into an instantly readable battle?</p>
              </div>
              <div className="gdd-pillars">
                <article><span>01</span><h4>Pack Smart</h4><p>Limited bag space makes every shape and placement a trade-off.</p></article>
                <article><span>02</span><h4>Connect Power</h4><p>Weapons only create value when their relationship to a unit is clear.</p></article>
                <article><span>03</span><h4>Watch It Resolve</h4><p>Auto-battle makes the quality of the player&apos;s plan visible in seconds.</p></article>
                <article><span>04</span><h4>Adapt the Build</h4><p>Rewards, merges, and expansions create a new decision before each wave.</p></article>
              </div>
            </div>
            <div className="gdd-shot-row" aria-label="Battle Bag gameplay frames from the App Store preview">
              <figure><img src="/battle-bag-gdd/gameplay-frame-04.webp" alt="Battle Bag equipment merge screen" /><figcaption>MERGE / INVENTORY</figcaption></figure>
              <figure><img src="/battle-bag-gdd/gameplay-frame-01.webp" alt="Enemy squad entering the battle" /><figcaption>ENEMY READ</figcaption></figure>
              <figure><img src="/battle-bag-gdd/gameplay-frame-02.webp" alt="Player squad fighting melee enemies" /><figcaption>COMBAT RESOLUTION</figcaption></figure>
              <figure><img src="/battle-bag-gdd/gameplay-frame-03.webp" alt="Player squad attacking a tank boss" /><figcaption>BOSS PRESSURE</figcaption></figure>
            </div>
          </article>

          <article className="gdd-panel gdd-map-panel" id="gdd-mind-map">
            <div className="gdd-section-heading compact">
              <span>02 / MIND MAPPING</span>
              <h3>FROM ONE CHOICE<br />TO THE <em>NEXT.</em></h3>
              <p>The experience is built as a chain of short, legible decisions. Every result feeds one new planning question.</p>
            </div>
            <div className="core-loop" aria-label="Battle Bag core game loop">
              <div className="loop-node blue"><small>SESSION</small><strong>Enter mission</strong><p>See wave goal and enemy read.</p></div>
              <span className="loop-arrow" aria-hidden="true">→</span>
              <div className="loop-node lime"><small>PLAN</small><strong>Summon gear</strong><p>Spend coins and reveal new options.</p></div>
              <span className="loop-arrow" aria-hidden="true">→</span>
              <div className="loop-node orange"><small>BUILD</small><strong>Fit + connect</strong><p>Arrange units, weapons, and support.</p></div>
              <span className="loop-arrow" aria-hidden="true">→</span>
              <div className="loop-node pink"><small>RESOLVE</small><strong>Auto-battle</strong><p>Watch the plan meet the wave.</p></div>
              <span className="loop-arrow" aria-hidden="true">→</span>
              <div className="loop-node violet"><small>GROW</small><strong>Reward + adapt</strong><p>Merge, upgrade, expand, repeat.</p></div>
            </div>
            <div className="mind-map-grid">
              <div className="mind-map-column">
                <h4>PLAYER DECISIONS</h4>
                <span>Which item earns scarce bag space?</span>
                <span>Do I improve power or add coverage?</span>
                <span>Can I expose a unit to gain one more connection?</span>
              </div>
              <div className="mind-map-hub"><span>BATTLE BAG</span><strong>TACTICAL<br />LOADOUT</strong><small>Space + connection + timing</small></div>
              <div className="mind-map-column">
                <h4>SYSTEM RESPONSE</h4>
                <span>Readable squad deployment</span>
                <span>Wave difficulty and counter pressure</span>
                <span>Currency, gear, and progression rewards</span>
              </div>
            </div>
          </article>

          <article className="gdd-panel gdd-economy-panel" id="gdd-economy">
            <div className="gdd-section-heading compact">
              <span>03 / GAME ECONOMY</span>
              <h3>VALUE IN.<br /><em>CHOICES OUT.</em></h3>
              <p>A three-currency structure separates run cadence, everyday growth, and high-intent premium decisions.</p>
            </div>
            <div className="economy-cards">
              <article className="economy-card energy"><div><span>⚡</span><small>ENERGY</small></div><h4>Session Gate</h4><p><b>Sources</b> Timed recharge, milestones, rewarded moments.</p><p><b>Sinks</b> Mission start and special encounters.</p></article>
              <article className="economy-card coins"><div><span>●</span><small>COINS</small></div><h4>Growth Currency</h4><p><b>Sources</b> Waves, missions, stage rewards, repeat play.</p><p><b>Sinks</b> Summons, upgrades, merge support, bag expansion.</p></article>
              <article className="economy-card gems"><div><span>◆</span><small>GEMS</small></div><h4>Choice Accelerator</h4><p><b>Sources</b> Milestones, offers, events, rewarded moments.</p><p><b>Sinks</b> Premium summons, rerolls, revive, targeted value.</p></article>
            </div>
            <div className="economy-flow">
              <div><small>PLAY</small><strong>Waves + missions</strong></div><span>→</span>
              <div><small>EARN</small><strong>Coins + gear</strong></div><span>→</span>
              <div><small>SPEND</small><strong>Summon + upgrade</strong></div><span>→</span>
              <div><small>POWER</small><strong>Better loadout</strong></div><span>→</span>
              <div><small>ACCESS</small><strong>Harder content</strong></div>
            </div>
            <div className="economy-table-wrap">
              <table className="economy-table">
                <caption>Portfolio economy model — illustrative targets, not live production data.</caption>
                <thead><tr><th>Moment</th><th>Player receives</th><th>Primary sink</th><th>Design purpose</th></tr></thead>
                <tbody>
                  <tr><td>First clear</td><td>High coin burst + gear</td><td>Immediate summon</td><td>Close the loop fast</td></tr>
                  <tr><td>Repeat clear</td><td>Stable coin income</td><td>Upgrade / merge</td><td>Support mastery without inflation</td></tr>
                  <tr><td>Boss clear</td><td>Premium chest + milestone</td><td>Build specialization</td><td>Create a memorable progression beat</td></tr>
                  <tr><td>Daily return</td><td>Energy + controlled bonus</td><td>New mission entry</td><td>Restart the decision loop</td></tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="gdd-panel gdd-balance-panel" id="gdd-balance">
            <div className="gdd-section-heading compact">
              <span>04 / GAME BALANCE</span>
              <h3>POWER NEEDS<br /><em>A PRICE.</em></h3>
              <p>Every strong choice consumes at least one constrained resource: space, connection access, currency, or time.</p>
            </div>
            <div className="balance-workbook">
              <div className="workbook-titlebar">
                <span className="workbook-mark">X</span>
                <strong>BATTLE_BAG_BALANCE_v1.0.xlsx</strong>
                <small>AUTOSAVED</small>
              </div>
              <div className="workbook-ribbon" aria-hidden="true">
                <span className="is-active">Home</span><span>Insert</span><span>Formulas</span><span>Data</span><span>Review</span>
                <i />
                <b>B</b><b className="italic">I</b><b>123</b><b>%</b>
              </div>
              <div className="workbook-formula">
                <span>F6</span><b>fx</b><code>= (Unit_Power * Weapon_Tier * Connection_Efficiency) + Support_Value</code>
              </div>
              <div className="workbook-scroll">
                <table className="balance-sheet-table" aria-label="Battle Bag game balance spreadsheet">
                  <thead>
                    <tr className="sheet-columns"><th aria-label="Row numbers" /><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr>
                    <tr><th scope="row">1</th><th>Balance parameter</th><th>Variable</th><th>Base</th><th>Target</th><th>Weight</th><th>Design note</th><th>State</th></tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row">2</th><td>Unit power</td><td className="sheet-variable">U</td><td>100</td><td>120</td><td>1.00</td><td>Base power + attack pattern</td><td>Input</td></tr>
                    <tr><th scope="row">3</th><td>Weapon tier</td><td className="sheet-variable">W</td><td>1.00</td><td>1.35</td><td>1.20</td><td>Tier value × role compatibility</td><td>Input</td></tr>
                    <tr><th scope="row">4</th><td>Connection efficiency</td><td className="sheet-variable">C</td><td>0.75</td><td>0.92</td><td>1.15</td><td>Active links + combat uptime</td><td>Input</td></tr>
                    <tr><th scope="row">5</th><td>Support value</td><td className="sheet-variable">S</td><td>20</td><td>45</td><td>0.80</td><td>Formation + situational utility</td><td>Input</td></tr>
                    <tr className="sheet-formula-row"><th scope="row">6</th><td>LOADOUT POWER</td><td colSpan={4}>P = (U × W × C) + S</td><td className="sheet-result">169.2</td><td>Balanced</td></tr>
                    <tr className="sheet-section-row"><th scope="row">7</th><td colSpan={7}>DESIRED PLAYER PRESSURE</td></tr>
                    <tr><th scope="row">8</th><td>Board space</td><td>Constraint</td><td>88%</td><td><span className="sheet-data-bar"><i style={{ width: "88%" }} /><b>88%</b></span></td><td>High</td><td>Primary composition limiter</td><td>Watch</td></tr>
                    <tr><th scope="row">9</th><td>Damage coverage</td><td>Coverage</td><td>72%</td><td><span className="sheet-data-bar"><i style={{ width: "72%" }} /><b>72%</b></span></td><td>Medium</td><td>Encourages mixed ranges</td><td>Target</td></tr>
                    <tr><th scope="row">10</th><td>Upgrade cost</td><td>Economy</td><td>61%</td><td><span className="sheet-data-bar"><i style={{ width: "61%" }} /><b>61%</b></span></td><td>Medium</td><td>Delays automatic power growth</td><td>Target</td></tr>
                    <tr><th scope="row">11</th><td>Wave counter</td><td>Encounter</td><td>80%</td><td><span className="sheet-data-bar"><i style={{ width: "80%" }} /><b>80%</b></span></td><td>High</td><td>Breaks the default loadout</td><td>Watch</td></tr>
                    <tr className="sheet-note-row"><th scope="row">12</th><td>Target state</td><td colSpan={6}>Two viable answers are visible; the player cannot afford or fit both.</td></tr>
                    <tr className="sheet-section-row"><th scope="row">13</th><td colSpan={7}>WEAPON BASE STATS / LEVEL 1</td></tr>
                    <tr className="sheet-subheader-row"><th scope="row">14</th><td>Weapon</td><td>Rarity</td><td>DMG / shot</td><td>Attack interval</td><td>Base DPS</td><td>Range</td><td>Footprint</td></tr>
                    <tr><th scope="row">15</th><td>Pistol</td><td>Common</td><td className="sheet-number">32</td><td className="sheet-number">6.0s</td><td className="sheet-number">5.3</td><td className="sheet-number">4</td><td>1 × 1</td></tr>
                    <tr><th scope="row">16</th><td>SMG</td><td>Common</td><td className="sheet-number">54</td><td className="sheet-number">2.4s</td><td className="sheet-number">22.5</td><td className="sheet-number">4</td><td>1 × 2</td></tr>
                    <tr><th scope="row">17</th><td>P90</td><td>Rare</td><td className="sheet-number">86</td><td className="sheet-number">1.8s</td><td className="sheet-number">47.8</td><td className="sheet-number">5</td><td>2 × 1</td></tr>
                    <tr><th scope="row">18</th><td>Rifle</td><td>Rare</td><td className="sheet-number">118</td><td className="sheet-number">3.2s</td><td className="sheet-number">36.9</td><td className="sheet-number">6</td><td>2 × 1</td></tr>
                    <tr className="sheet-section-row"><th scope="row">19</th><td colSpan={7}>MERGE LEVEL PROGRESSION / DAMAGE GROWTH</td></tr>
                    <tr className="sheet-subheader-row"><th scope="row">20</th><td>Merge level</td><td>Total copies</td><td>Power multiplier</td><td>Pistol DMG</td><td>SMG DMG</td><td>P90 DMG</td><td>Rifle DMG</td></tr>
                    <tr><th scope="row">21</th><td>Lv. 1</td><td className="sheet-number">1</td><td className="sheet-number">1.00×</td><td className="sheet-number">32</td><td className="sheet-number">54</td><td className="sheet-number">86</td><td className="sheet-number">118</td></tr>
                    <tr><th scope="row">22</th><td>Lv. 2</td><td className="sheet-number">2</td><td className="sheet-number">1.35×</td><td className="sheet-number">43</td><td className="sheet-number">73</td><td className="sheet-number">116</td><td className="sheet-number">159</td></tr>
                    <tr><th scope="row">23</th><td>Lv. 3</td><td className="sheet-number">4</td><td className="sheet-number">1.82×</td><td className="sheet-number">58</td><td className="sheet-number">98</td><td className="sheet-number">157</td><td className="sheet-number">215</td></tr>
                    <tr><th scope="row">24</th><td>Lv. 4</td><td className="sheet-number">8</td><td className="sheet-number">2.46×</td><td className="sheet-number">79</td><td className="sheet-number">133</td><td className="sheet-number">212</td><td className="sheet-number">290</td></tr>
                    <tr className="sheet-note-row"><th scope="row">25</th><td>Merge formula</td><td colSpan={6}>Next damage = Base damage × Merge multiplier. Values are rounded to the nearest whole number.</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="workbook-tabs"><span className="is-active">Balance_Master</span><span>Weapon_Stats</span><span>Merge_Curve</span><span>Pressure_Budget</span><b>+</b></div>
            </div>
          </article>

          <article className="gdd-panel gdd-level-panel" id="gdd-levels">
            <div className="gdd-section-heading compact">
              <span>05 / LEVEL SEQUENCING & PACING</span>
              <h3>TEACH. TEST.<br /><em>TWIST.</em></h3>
              <p>Difficulty grows by adding one new planning pressure at a time, then asking the player to combine what they learned.</p>
            </div>
            <div className="level-track">
              <article><span>01</span><h4>Teach the link</h4><p>One unit, one weapon, one visible outcome.</p><small>WAVES 1–3</small></article>
              <article><span>02</span><h4>Pressure space</h4><p>Add shapes that cannot all fit cleanly.</p><small>WAVES 4–6</small></article>
              <article><span>03</span><h4>Ask for coverage</h4><p>Mix enemy ranges, speed, and density.</p><small>WAVES 7–9</small></article>
              <article><span>04</span><h4>Break the habit</h4><p>Boss or modifier punishes the default build.</p><small>WAVE 10</small></article>
              <article><span>05</span><h4>Open mastery</h4><p>New world recombines systems at higher pressure.</p><small>NEXT WORLD</small></article>
            </div>
            <div className="pacing-chart" aria-label="Illustrative level difficulty pacing chart">
              <div className="pacing-axis"><span>PRESSURE</span><span>TIME</span></div>
              <div className="pacing-line"><i /><i /><i /><i /><i /><i /></div>
              <div className="pacing-labels"><span>LEARN</span><span>BUILD</span><span>TEST</span><span>RELIEF</span><span>BOSS</span><span>REWARD</span></div>
            </div>
          </article>

          <article className="gdd-panel gdd-documentation-panel" id="gdd-documentation">
            <div className="gdd-section-heading compact">
              <span>06 / PLAYABLE EVIDENCE</span>
              <h3>THE SYSTEM<br /><em>IN MOTION.</em></h3>
              <p>Official App Store screens communicate the product promise: build a compact squad, counter distinct threats, and carry progress into harder worlds.</p>
            </div>
            <div className="appstore-evidence-grid">
              <figure><img src="/battle-bag-gdd/appstore-defeat.webp" alt="Official Battle Bag App Store screenshot showing the squad fighting an enemy formation" /><figcaption><span>01</span><strong>Defeat enemies</strong><small>The bag and battlefield stay visible in one readable frame.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/appstore-boss.webp" alt="Official Battle Bag App Store screenshot showing tank, zombie, and UFO bosses" /><figcaption><span>02</span><strong>Defeat bosses</strong><small>Distinct silhouettes communicate new tactical threats.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/appstore-loadout.webp" alt="Official Battle Bag App Store screenshot showing World 13 rewards and hard-world progression" /><figcaption><span>03</span><strong>Explore worlds</strong><small>World rewards and hard mode extend the progression loop.</small></figcaption></figure>
            </div>
            <div className="system-depth-heading">
              <span>OFFICIAL STORE SCREENS / SYSTEM DEPTH</span>
              <h4>FOUR LAYERS.<br /><em>ONE META LOOP.</em></h4>
              <p>These screens expose the systems behind each run: collect, improve, compose, and invest in permanent power.</p>
            </div>
            <div className="system-depth-grid" aria-label="Official App Store screens showing Battle Bag progression systems">
              <figure><img src="/battle-bag-gdd/appstore-upgrade-weapons.webp" alt="Official Battle Bag App Store screenshot showing the weapon collection and upgrade levels" /><figcaption><span>01 / COLLECTION</span><strong>Upgrade weapons</strong><small>Duplicates and level thresholds turn drops into lasting power.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/appstore-customize-base.webp" alt="Official Battle Bag App Store screenshot showing base equipment and merge inventory" /><figcaption><span>02 / PREPARATION</span><strong>Customize the base</strong><small>Equipment slots and merging create a second planning layer.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/appstore-manage-bag.webp" alt="Official Battle Bag App Store screenshot showing a complete late-game bag composition" /><figcaption><span>03 / COMPOSITION</span><strong>Manage the bag</strong><small>Limited space converts every placement into an opportunity cost.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/appstore-level-skills.webp" alt="Official Battle Bag App Store screenshot showing the branching permanent skill tree" /><figcaption><span>04 / META</span><strong>Level up skills</strong><small>Branching upgrades connect run rewards to long-term goals.</small></figcaption></figure>
            </div>
            <div className="mission40-heading" id="gdd-mission40">
              <span>MISSION 40 / HARD</span>
              <h4>ONE RUN.<br /><em>FOUR DESIGN STATES.</em></h4>
              <p>The same mission makes progression visible: an open bag becomes a specialized formation, then proves itself against the final wave.</p>
            </div>
            <div className="mission40-grid" aria-label="Mission 40 Hard gameplay frames">
              <figure><img src="/battle-bag-gdd/mission40-loadout.png" alt="Mission 40 Wave 3 early Battle Bag loadout" /><figcaption><span>WAVE 03</span><strong>Open space</strong><small>The player is still choosing a direction.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/mission40-build.png" alt="Mission 40 Wave 8 connected Battle Bag formation" /><figcaption><span>WAVE 08</span><strong>Build identity</strong><small>Units and connections begin to specialize.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/mission40-full-bag.png" alt="Mission 40 Wave 12 full Battle Bag formation" /><figcaption><span>WAVE 12</span><strong>Maximum pressure</strong><small>Every remaining cell carries opportunity cost.</small></figcaption></figure>
              <figure><img src="/battle-bag-gdd/mission40-boss.png" alt="Mission 40 Wave 13 boss battle" /><figcaption><span>WAVE 13</span><strong>Final proof</strong><small>The finished loadout resolves against the boss.</small></figcaption></figure>
            </div>
          </article>

        </div>
      </section>

      <section className="about" id="about">
        <div className="about-title">
          <span>ABOUT ME</span>
          <h2>DESIGNER<br /><em>WHO BUILDS.</em></h2>
        </div>
        <div className="about-copy">
          <p className="lead">I design the player experience and get close enough to the build to prove it works.</p>
          <p>For 2+ years, I’ve worked across systems design, rapid prototyping, level flow, balancing, and implementation. I’m most useful where a team needs clear design thinking, fast iteration, and honest collaboration.</p>
          <div className="about-stats">
            <div><strong>3</strong><span>Published titles</span></div>
            <div><strong>3M+</strong><span>Combined Google Play downloads</span></div>
            <div><strong>2+</strong><span>Years designing games</span></div>
          </div>
        </div>
      </section>

      <section className="backstory" id="experience">
        <div className="backstory-heading">
          <span>MY EXPERIENCE</span>
          <h2>MY <em>BACKSTORY.</em></h2>
          <p>A short timeline of the teams, launches, and design problems that shaped how I build games today.</p>
        </div>
        <div className="experience-timeline">
          {experience.map((item) => (
            <article className="experience-item" key={item.company}>
              <div className="experience-marker" aria-hidden="true" />
              <div className="experience-content">
                <div className="experience-meta">
                  <div>
                    <h3>{item.company}</h3>
                    <strong>{item.role}</strong>
                  </div>
                  <div>
                    <time>{item.period}</time>
                    <span>{item.location}</span>
                  </div>
                </div>
                <p>{item.summary}</p>
                {item.games.length > 0 ? (
                  <div className="experience-games" aria-label={`Games created at ${item.company}`}>
                    {item.games.map((game) => (
                      <a href={game.url} target="_blank" rel="noreferrer" aria-label={`Open ${game.name}`} title={game.name} key={game.name}>
                        <img src={game.artwork} alt={`${game.name} app icon`} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
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
