type PersonalProject = {
  slug: string;
  name: string;
  icon: string;
  debutWork?: boolean;
  academySelection?: boolean;
  screenshotWidth: number;
  screenshotHeight: number;
  screenshots: { src: string; caption: string; width?: number; height?: number }[];
};

const personalProjects: PersonalProject[] = [
  {
    slug: "buss-flow",
    name: "Buss Flow!",
    icon: "/self-development/buss-flow/icon.jpg",
    screenshotWidth: 739,
    screenshotHeight: 1600,
    screenshots: [
      { src: "/self-development/buss-flow/level-13.jpg", caption: "Level 13" },
      { src: "/self-development/buss-flow/level-10.jpg", caption: "Level 10" },
      { src: "/self-development/buss-flow/level-16.jpg", caption: "Level 16" },
    ],
  },
  {
    slug: "cable-tangle",
    name: "Cable Tangle",
    icon: "/self-development/cable-tangle/icon.webp",
    screenshotWidth: 739,
    screenshotHeight: 1599,
    screenshots: [
      { src: "/self-development/cable-tangle/level-16.webp", caption: "Level 16" },
      { src: "/self-development/cable-tangle/level-17.webp", caption: "Level 17" },
      { src: "/self-development/cable-tangle/level-21.webp", caption: "Level 21" },
    ],
  },
  {
    slug: "zombie-run",
    name: "Zombie Run",
    debutWork: true,
    academySelection: true,
    icon: "/self-development/zombie-run/icon.webp",
    screenshotWidth: 466,
    screenshotHeight: 1037,
    screenshots: [
      { src: "/self-development/zombie-run/character.webp", caption: "Character" },
      { src: "/self-development/zombie-run/gameplay-01.webp", caption: "Gameplay 1", width: 467, height: 1036 },
      { src: "/self-development/zombie-run/gameplay-02.webp", caption: "Gameplay 2", width: 464, height: 1036 },
    ],
  },
  {
    slug: "car-chaos",
    name: "Car Chaos",
    debutWork: true,
    icon: "/self-development/car-chaos/icon.webp",
    screenshotWidth: 347,
    screenshotHeight: 755,
    screenshots: [
      { src: "/self-development/car-chaos/gameplay-01.webp", caption: "Gameplay 1" },
      { src: "/self-development/car-chaos/gameplay-02.webp", caption: "Gameplay 2", width: 348, height: 757 },
      { src: "/self-development/car-chaos/gameplay-03.webp", caption: "Gameplay 3", width: 366, height: 799 },
    ],
  },
  {
    slug: "cross-walk",
    name: "Cross Walk",
    debutWork: true,
    icon: "/self-development/cross-walk/icon.webp",
    screenshotWidth: 481,
    screenshotHeight: 1037,
    screenshots: [
      { src: "/self-development/cross-walk/gameplay-01.webp", caption: "Gameplay 1" },
      { src: "/self-development/cross-walk/gameplay-02.webp", caption: "Gameplay 2", width: 482, height: 1038 },
      { src: "/self-development/cross-walk/gameplay-03.webp", caption: "Gameplay 3", width: 478, height: 1037 },
    ],
  },
  {
    slug: "frush",
    name: "Frush: Runner Game",
    debutWork: true,
    icon: "/self-development/frush/icon.webp",
    screenshotWidth: 584,
    screenshotHeight: 1038,
    screenshots: [
      { src: "/self-development/frush/menu.webp", caption: "Main Menu" },
      { src: "/self-development/frush/gameplay-01.webp", caption: "Gameplay 1", width: 584, height: 1037 },
      { src: "/self-development/frush/gameplay-02.webp", caption: "Gameplay 2", width: 596, height: 1037 },
    ],
  },
  {
    slug: "hold-tline",
    name: "Hold TLine",
    debutWork: true,
    icon: "/self-development/hold-tline/icon.webp",
    screenshotWidth: 482,
    screenshotHeight: 1038,
    screenshots: [
      { src: "/self-development/hold-tline/menu.webp", caption: "Main Menu" },
      { src: "/self-development/hold-tline/gameplay-01.webp", caption: "Gameplay 1", width: 482, height: 1038 },
      { src: "/self-development/hold-tline/character.webp", caption: "Character", width: 481, height: 1039 },
    ],
  },
];

export function SelfDevelopment() {
  return (
    <section className="self-development" id="self-development" aria-labelledby="self-development-title">
      <div className="self-development-heading">
        <span className="self-development-eyebrow">INDEPENDENT PROJECTS</span>
        <h2 id="self-development-title">Self<br />Development<span>.</span></h2>
        <p className="self-development-credit">Designed &amp; Developed by Me</p>
      </div>

      <div className="self-development-projects">
        {personalProjects.map((project, index) => (
          <article className="personal-project" key={project.slug} aria-labelledby={`${project.slug}-title`}>
            <header className="personal-project-heading">
              <img className="personal-project-icon" src={project.icon} alt={`${project.name} app icon`} width={512} height={512} loading="lazy" decoding="async" />
              <div className="personal-project-copy">
                <span className="self-development-eyebrow">PERSONAL PROJECT / {String(index + 1).padStart(2, "0")}</span>
                <h3 id={`${project.slug}-title`}>{project.name}</h3>
                {(project.debutWork || project.academySelection) && (
                  <div className="personal-project-badges">
                    {project.debutWork && <span className="personal-project-debut">DEBUT WORK</span>}
                    {project.academySelection && <span className="personal-project-academy">VOODOO ACADEMY SELECTION</span>}
                  </div>
                )}
                {project.academySelection && <p className="personal-project-academy-note">This project earned me a place in Voodoo Academy.</p>}
              </div>
            </header>
            <div className="personal-project-gallery-heading">
              <span>GAMEPLAY GALLERY</span>
              <span className="personal-project-swipe-hint">Swipe to explore <span aria-hidden="true">→</span></span>
            </div>
            <div className="personal-project-gallery" role="region" aria-label={`${project.name} gameplay screenshots`} tabIndex={0}>
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <img src={screenshot.src} alt={`${project.name} — ${screenshot.caption}`} width={screenshot.width ?? project.screenshotWidth} height={screenshot.height ?? project.screenshotHeight} loading="lazy" decoding="async" />
                  <figcaption>{screenshot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
