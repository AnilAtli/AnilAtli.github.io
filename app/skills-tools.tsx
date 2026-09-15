const tools = [
  { name: "Miro", icon: "miro.png" },
  { name: "Figma", icon: "figma.png" },
  { name: "Machinations", icon: "machinations.ico" },
  { name: "Tableau", icon: "tableau.svg" },
  { name: "GameAnalytics", icon: "gameanalytics.png" },
  { name: "AppMagic", icon: "appmagic.png" },
  { name: "Sensor Tower", icon: "sensortower.svg" },
  { name: "MyStoreSpy", icon: "mystorespy.png" },
  { name: "Lumos AI", icon: "lumos.png" },
  { name: "Unity", icon: "unity.svg" },
  { name: "C#", icon: "csharp.svg" },
  { name: "Java", icon: "java.svg" },
  { name: "Custom Level Design Tools", icon: "level-design.svg", custom: true },
];

export function SkillsTools() {
  return (
    <section className="skills-tools" id="skills" aria-labelledby="skills-title">
      <div className="skills-heading">
        <span>MY TOOLKIT</span>
        <h2 id="skills-title">SKILLS <em>&amp; TOOLS.</em></h2>
      </div>
      <ul className="skills-grid">
        {tools.map((tool) => (
          <li className={`skill-tool${tool.custom ? " skill-tool-custom" : ""}`} key={tool.name}>
            <span className="skill-icon" aria-hidden="true">
              <img src={`/tools/${tool.icon}`} alt="" width="36" height="36" />
            </span>
            <div className="skill-copy">
              <h3>{tool.name === "GameAnalytics" ? <>Game<wbr />Analytics</> : tool.name}</h3>
              {tool.custom && <span className="skill-built-badge">Built by me</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
