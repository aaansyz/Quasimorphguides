export type PageEntry = {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  answer: string;
  sections: { title: string; body: string; bullets?: string[] }[];
  links?: { label: string; href: string; note: string }[];
  faqs?: { q: string; a: string }[];
  sources?: { label: string; url: string; type: "OFFICIAL" | "OFFICIAL WIKI" | "COMMUNITY" }[];
  status?: "Verified" | "Partial coverage" | "Verification pending";
  tool?: "mission" | "damage" | "story";
  spoiler?: boolean;
};

export const verifiedAt = "2026-08-06";
export const gameVersion = "1.0";

export const sources = {
  store: { label: "Quasimorph on Steam", url: "https://store.steampowered.com/app/2059170/Quasimorph/", type: "OFFICIAL" as const },
  news: { label: "Official Steam announcements", url: "https://steamcommunity.com/app/2059170/allnews/?l=english", type: "OFFICIAL" as const },
  wiki: { label: "Official Quasimorph Wiki", url: "https://quasimorph.wiki.gg/", type: "OFFICIAL WIKI" as const },
  achievements: { label: "Steam Global Achievements", url: "https://steamcommunity.com/stats/2059170/achievements/?l=english", type: "OFFICIAL" as const },
  workshop: { label: "Quasimorph Steam Workshop", url: "https://steamcommunity.com/app/2059170/workshop/", type: "OFFICIAL" as const },
};

const safe = [
  "Treat extraction as the objective. Extra loot is optional once the contract is secured.",
  "Carry a second way to solve fights when the primary weapon, ammunition, or position fails.",
  "Check food, medicine, ammunition, weapon condition, and an exit threshold before deployment.",
];

const guides = [
  ["/guides/getting-started/", "Quasimorph 1.0 Beginner Guide", "Start with survival, not profit", "A first-contract field manual for keeping clones alive, building a reserve, and learning what deserves a retreat.", ["Play the tutorial until movement, action points, inventory, and extraction feel routine.", "Use early contracts to create a buffer of medicine, food, ammunition, and replaceable equipment.", "Set a retreat trigger before each mission: critical injury, depleted medicine, low ammunition, or an unsafe route to extraction."]],
  ["/guides/after-tutorial/", "What to Do After the Tutorial", "Build a reserve before chasing a perfect build", "A practical first-hour route that avoids unsupported item-by-item prescriptions.", ["Review available contracts for risk, travel, floors, employer, and target.", "Equip a coherent primary weapon, compatible ammunition, medicine, food, and a fallback.", "Prefer recoverable learning over carrying irreplaceable gear into an uncertain contract."]],
  ["/guides/choosing-contracts/", "How to Choose Contracts", "Choose by exit risk, not reward alone", "A contract triage framework for comparing floors, opposition, travel, objectives, and what you can afford to lose.", ["Compare expected opposition with the damage types and protection you can actually field.", "More floors usually mean more consumption and more chances for the plan to fail.", "Story progression and reputation can matter more than the visible item reward."]],
  ["/guides/combat-stances/", "Combat Stances and Action Points", "Spend actions to preserve options", "A version-safe explanation of turn economy, positioning, and why ending a turn exposed is dangerous.", ["Before acting, identify cover, sight lines, likely approach tiles, and a retreat tile.", "Avoid spending the final action on a low-confidence attack when movement or repositioning is safer.", "Re-check the interface after status effects or wounds change available actions."]],
  ["/guides/quasimorphosis/", "Quasimorphosis Explained", "Treat the meter as a changing mission condition", "What players should monitor without inventing stage thresholds or patch-sensitive numbers.", ["Watch the in-game stage and current effects instead of relying on remembered pre-1.0 values.", "Plan a shorter route when the environment or opposition is accelerating the risk.", "Carry a fallback plan for enemies that invalidate your primary damage approach."]],
  ["/guides/wounds-medicine/", "Wounds and Medicine Guide", "Stabilize first; greed can wait", "A safe treatment workflow for wounds, bleeding, infection risk, and evacuation decisions.", ["Open the health interface and read the current wound and treatment information before using supplies.", "Prioritize effects that can end the run quickly, then reassess movement and combat capability.", "If treatment attempts consume the reserve you need to reach extraction, leave."]],
  ["/guides/secret-data/", "Who Should Receive AnCom’s Secret Data?", "This is a story-routing decision", "The item is used to begin major story routes. Pick the faction whose storyline you want to pursue, and keep a manual save if your settings allow it.", ["Official 1.0 messaging confirms five storylines: Civil Resistance, Tezctlan, Xiomara, AnCom, and RealWare.", "The official Wiki documents Secret Data as a quest item and route trigger; exact reward lists may change with hotfixes.", "This site intentionally does not rank the recipient by unverified reward value."]],
] as const;

const guidePages: PageEntry[] = guides.map(([path, title, answer, description, bullets]) => ({
  path, title, eyebrow: "FIELD GUIDE", description, answer,
  sections: [{ title: "Recommended procedure", body: "Use this as a decision framework and confirm patch-sensitive details in the current in-game interface.", bullets: [...bullets] }, { title: "Failure-proof rule", body: "A contract is not profitable until the useful gear reaches safety. Preserve the route out and do not let sunk cost decide the next turn." }],
  faqs: [{ q: "Does this guide use exact 1.0 item stats?", a: "Only when a first-party or official Wiki source has been checked. Patch-sensitive numbers are deliberately omitted from this launch edition." }, { q: "What should I do when the run stops matching the plan?", a: "Recalculate around extraction. Drop optional goals, conserve the remaining answer to the current threat, and leave before one problem becomes several." }],
  links: [{ label: "Mission Prep Planner", href: "/tools/mission-prep/", note: "Build a local pre-deployment checklist." }, { label: "Damage Lookup", href: "/tools/damage-resistance/", note: "Check the verified coverage table." }],
  sources: [sources.news, sources.wiki], status: "Partial coverage"
}));

export const pages: PageEntry[] = [
  {
    path: "/guides/", title: "Quasimorph 1.0 Guides", eyebrow: "GUIDES HUB", description: "Direct answers for early contracts, combat decisions, wounds, quasimorphosis, and story routing.", answer: "Start with the beginner route, then use the planner before every unfamiliar contract.",
    sections: [{ title: "A route through the learning curve", body: "These guides focus on repeatable decisions instead of brittle tier lists.", bullets: safe }],
    links: guides.map(([path, title,, description]) => ({ href: path, label: title, note: description })), sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  ...guidePages,
  {
    path: "/classes/", title: "Classes & Operators", eyebrow: "BUILD INDEX", description: "A version-aware hub for combining class perks, operator talents, equipment, and mission goals.", answer: "A build is a complete mission plan—not a single overpowered item.",
    sections: [{ title: "Build evaluation", body: "Launch coverage is intentionally qualitative while the large 1.0 balance pass is still being verified.", bullets: ["Define the job: close control, ranged consistency, scouting, sustain, or a hybrid.", "Check whether the operator talent and class perks reward the same actions.", "Add ammunition, medicine, protection, and a backup that fit the expected mission length."] }],
    links: [{ href: "/classes/builds/", label: "Build framework", note: "Assemble and audit a complete loadout." }, { href: "/items/weapons/", label: "Weapons & damage", note: "Use damage categories without invented rankings." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/classes/builds/", title: "Class, Operator & Weapon Builds", eyebrow: "BUILD LAB", description: "A 1.0-safe framework for making coherent builds without publishing unverified best-in-slot claims.", answer: "Match role, actions, range, sustain, and escape plan before optimizing damage.",
    sections: [{ title: "Five-part build card", body: "Record these five answers for every build.", bullets: ["Role: what the build is supposed to solve.", "Action loop: what it does on a normal turn.", "Primary and fallback: two answers to resistance, range, or ammunition failure.", "Sustain: food, medicine, ammunition, repair, and carry limits.", "Abort rule: the condition that ends the run."] }],
    links: [{ href: "/tools/mission-prep/", label: "Test the loadout", note: "Turn the concept into a checklist." }], sources: [sources.news], status: "Verification pending"
  },
  {
    path: "/items/", title: "Items Database", eyebrow: "EQUIPMENT INDEX", description: "Weapons, damage types, armor, resistances, and a structure ready for verified 1.0 records.", answer: "Use the lookup for verified relationships; confirm exact values in game when a record is marked pending.",
    sections: [{ title: "Current coverage", body: "The launch database prioritizes provenance over volume. It does not reproduce unverified pre-release tables." }],
    links: [{ href: "/items/weapons/", label: "Weapons & damage types", note: "How to reason about primary and backup damage." }, { href: "/items/armor-resistances/", label: "Armor & resistances", note: "Protection is threat-specific." }, { href: "/tools/damage-resistance/", label: "Damage Lookup", note: "Filter current verified records." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/items/weapons/", title: "Weapons and Damage Types", eyebrow: "EQUIPMENT GUIDE", description: "Choose a weapon package by mission fit, ammunition plan, reach, and the target’s protection.", answer: "Carry a primary you can sustain and a fallback that fails differently.",
    sections: [{ title: "Weapon package checklist", body: "Exact item rankings become unreliable after balance changes; these checks remain useful.", bullets: ["Can you supply the ammunition for the full floor count?", "Does the weapon work at the range and sight lines the mission creates?", "What is the fallback when armor, immunity, malfunction, or positioning defeats it?"] }], links: [{ href: "/tools/damage-resistance/", label: "Open Damage Lookup", note: "Filter by damage, faction, enemy, and source status." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/items/armor-resistances/", title: "Armor and Resistance Guide", eyebrow: "SURVIVABILITY", description: "A threat-first approach to armor without pretending one set is universally best.", answer: "Protection only matters against the attacks you are likely to face—and it never replaces positioning.",
    sections: [{ title: "Before deployment", body: "Use visible in-game resistance values for the current patch.", bullets: ["Identify likely enemy families and their attack categories.", "Check coverage and durability alongside resistance.", "Do not overload the clone so heavily that mobility and supply capacity collapse."] }], links: [{ href: "/tools/mission-prep/", label: "Mission Prep Planner", note: "Include opposition and danger in the checklist." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/world/", title: "World & Story", eyebrow: "SYSTEM ARCHIVE", description: "Faction, reputation, Pacts, and campaign navigation with spoiler controls and source labels.", answer: "The 1.0 campaign has five officially announced storylines and nine endings.",
    sections: [{ title: "Browse safely", body: "Faction pages stay spoiler-light. Decision and ending pages carry explicit warnings and pending-verification labels." }], links: [{ href: "/world/factions/", label: "Factions & reputation", note: "Read the political map as a mission system." }, { href: "/world/pacts/", label: "Pacts & S.K.U.L.L.", note: "Confirmed scope, cautious details." }, { href: "/walkthrough/endings/", label: "Endings", note: "Spoiler-controlled route index." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/world/factions/", title: "Factions and Reputation", eyebrow: "SYSTEM POLITICS", description: "How contracts, targets, reputation, and story allegiance fit together in 1.0.", answer: "A contract changes more than inventory: track who benefits, who is targeted, and which story route you intend to protect.",
    sections: [{ title: "Reputation audit", body: "Before accepting a job, record employer, target, current relations, story relevance, and whether the reward is worth the political cost." }], links: [{ href: "/tools/story-decisions/", label: "Story Decision Planner", note: "Compare the five confirmed routes." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/world/pacts/", title: "Pacts and the S.K.U.L.L. Project", eyebrow: "QUASIMORPHIC SYSTEMS", description: "A restrained launch reference for the expanded 1.0 Pact system.", answer: "Version 1.0 officially advertises the final department and 142 Pacts; individual effects remain under verification here.",
    sections: [{ title: "Coverage policy", body: "No effect, cost, upgrade path, or build recommendation is published until checked against the live 1.0 game or reliable official documentation." }], links: [{ href: "/updates/patch-1-0/", label: "1.0 changes", note: "See confirmed release scope." }], sources: [sources.news], status: "Verification pending"
  },
  {
    path: "/walkthrough/", title: "Quasimorph Walkthrough", eyebrow: "CAMPAIGN HUB", description: "A spoiler-aware map of campaign progression, story routes, and endings.", answer: "Use the overview to choose a route; use the planner before committing a key item or faction decision.",
    sections: [{ title: "Spoiler policy", body: "Route names and official counts are visible. Exact triggers and rewards are hidden or marked pending when independent verification is incomplete." }], links: [{ href: "/walkthrough/campaign/", label: "Campaign overview", note: "Five confirmed storylines." }, { href: "/walkthrough/endings/", label: "Endings & routes", note: "Nine confirmed endings; exact conditions pending." }], sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/walkthrough/campaign/", title: "Campaign and Storyline Overview", eyebrow: "SPOILER-LIGHT", description: "The five storylines officially announced for Quasimorph 1.0.", answer: "Civil Resistance, Tezctlan, Xiomara, AnCom, and RealWare are the five confirmed 1.0 storylines.",
    sections: [{ title: "Route list", body: "Use faction names as navigation, not as a promise of a specific reward.", bullets: ["Civil Resistance", "Tezctlan", "Xiomara", "AnCom", "RealWare"] }], links: [{ href: "/tools/story-decisions/", label: "Compare routes", note: "Switch between spoiler-light and full-spoiler views." }], sources: [sources.news], status: "Verified", spoiler: true
  },
  {
    path: "/walkthrough/endings/", title: "Endings and Decision Routes", eyebrow: "SPOILER ARCHIVE", description: "A cautious index of the nine officially confirmed 1.0 endings.", answer: "Nine endings are confirmed by the developer. Exact route conditions are still being checked and are not guessed here.",
    sections: [{ title: "What is confirmed", body: "Each of the five official storylines can bring the PMC journey to a finale, and each ending has an epilogue. The precise branch matrix is marked Verification pending until live 1.0 evidence is complete." }], links: [{ href: "/tools/story-decisions/", label: "Story Decision Planner", note: "Explore confirmed branches without invented conditions." }], sources: [sources.news, sources.wiki], status: "Verification pending", spoiler: true
  },
  {
    path: "/achievements/", title: "82 Quasimorph Steam Achievements", eyebrow: "VERIFIED DATABASE", description: "All 82 achievement names and public descriptions from Steam, verified for version 1.0.", answer: "Steam currently lists 82 achievements. Hidden descriptions remain hidden until unlocked or officially disclosed.",
    sections: [{ title: "Achievement directory", body: "The table below is sourced from Steam Global Achievements and includes current global unlock rates. Rates change over time." }], sources: [sources.achievements], status: "Verified"
  },
  {
    path: "/mods/", title: "Quasimorph 1.0 Mods Directory", eyebrow: "WORKSHOP DIRECTORY", description: "A safe launch point for 1.0 mod discovery without mirroring or redistributing files.", answer: "Use the Steam Workshop, check the mod’s supported game version, update date, dependencies, and recent comments before installing.",
    sections: [{ title: "Compatibility checklist", body: "The 1.0 release included a Map Editor and large configuration changes.", bullets: ["Confirm the author explicitly supports 1.0.", "Read dependency and load-order notes.", "Back up saves and remove incompatible mods when diagnosing problems.", "Download only from a source you trust."] }], links: [{ href: sources.workshop.url, label: "Open Steam Workshop", note: "First-party distribution page." }], sources: [sources.news, sources.workshop], status: "Partial coverage"
  },
  {
    path: "/updates/", title: "Quasimorph Updates", eyebrow: "PATCH WATCH", description: "Official release notes, hotfix tracking, and the exact pages that need re-verification after a balance change.", answer: "Version 1.0 launched July 31, 2026; post-launch hotfix support is planned through Q3 2026.",
    sections: [{ title: "Update protocol", body: "Every record on this site carries a version and verification date. Patch-sensitive tools stay conservative until the relevant change is checked." }], links: [{ href: "/updates/patch-1-0/", label: "Version 1.0", note: "Confirmed release scope." }, { href: "/updates/hotfixes/", label: "Current hotfixes", note: "Live verification queue." }], sources: [sources.news], status: "Verified"
  },
  {
    path: "/updates/patch-1-0/", title: "Quasimorph 1.0 Changes", eyebrow: "RELEASE BRIEF", description: "The official scope of the July 31, 2026 release, separated from community interpretation.", answer: "The developer announced five completed storylines, nine endings, 142 Pacts, achievements, the final department, and a Map Editor for 1.0.",
    sections: [{ title: "Confirmed release scope", body: "These items come from official Steam announcements.", bullets: ["Five storylines: Civil Resistance, Tezctlan, Xiomara, AnCom, and RealWare.", "Nine endings with epilogues.", "The last remaining department and a total of 142 Pacts.", "Map Editor, achievements, localization, balance work, fixes, and tweaks."] }], sources: [sources.news], status: "Verified"
  },
  {
    path: "/updates/hotfixes/", title: "Current Hotfixes and Important Changes", eyebrow: "LIVE VERIFICATION QUEUE", description: "A source-first hotfix tracker for Quasimorph 1.0.", answer: "No individual hotfix is summarized here until its official note is captured and its affected pages are rechecked.",
    sections: [{ title: "Pages watched after every hotfix", body: "Balance and data changes trigger re-verification.", bullets: ["Damage and resistance records", "Class and weapon build guidance", "Pact effects and upgrade paths", "Story triggers and rewards", "Mod compatibility"] }], links: [{ href: sources.news.url, label: "Check official announcements", note: "Authoritative current feed." }], sources: [sources.news], status: "Verification pending"
  },
  {
    path: "/tools/", title: "Quasimorph 1.0 Tools", eyebrow: "LOCAL TOOLKIT", description: "Three free browser-local tools for mission planning, damage research, and spoiler-aware story decisions.", answer: "Nothing is sent to a server. Your selections are calculated in this browser and reset when the page closes.",
    sections: [{ title: "Pick a tool", body: "The tools use conservative guidance when exact 1.0 data is not verified." }], links: [{ href: "/tools/mission-prep/", label: "Mission Prep Planner", note: "Generate a pre-deployment checklist." }, { href: "/tools/damage-resistance/", label: "Damage & Resistance Lookup", note: "Filter sourced records." }, { href: "/tools/story-decisions/", label: "Story Decision Planner", note: "Compare five routes and nine ending slots." }], status: "Verified"
  },
  {
    path: "/tools/mission-prep/", title: "Mission Preparation Planner", eyebrow: "BROWSER-LOCAL TOOL", description: "Build a conservative checklist from stage, mission, faction, danger, floors, quasimorphosis, combat style, and carried objectives.", answer: "Set the mission conditions below. The planner gives a safety-focused loadout and extraction brief without inventing item counts.", sections: [], tool: "mission", sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/tools/damage-resistance/", title: "Damage and Resistance Lookup", eyebrow: "BROWSER-LOCAL DATABASE", description: "Filter the verified 1.0 coverage table by damage type, enemy, faction, resistance, and recommendation.", answer: "Launch coverage is intentionally small. Records marked pending are not presented as fact.", sections: [], tool: "damage", sources: [sources.news, sources.wiki], status: "Partial coverage"
  },
  {
    path: "/tools/story-decisions/", title: "Story Decision Planner", eyebrow: "BROWSER-LOCAL TOOL", description: "Compare the AnCom Secret Data choice, five confirmed storylines, and nine ending slots with spoiler controls.", answer: "Route counts and names come from official 1.0 announcements. Exact requirements and losses stay pending when evidence is incomplete.", sections: [], tool: "story", sources: [sources.news, sources.wiki], status: "Partial coverage", spoiler: true
  },
  {
    path: "/about/", title: "About Quasimorph Wiki", eyebrow: "ABOUT", description: "Our mission, evidence labels, version policy, and independence statement.", answer: "Quasimorph Wiki is an independent, fan-made guide and tools site focused on source-visible 1.0 information.", sections: [{ title: "Evidence labels", body: "Official Fact is supported by first-party material. Official Wiki identifies maintained reference material. Community Tip is attributed and never promoted to fact without corroboration. Verification pending means we do not know yet." }, { title: "Editorial rule", body: "We would rather publish a short, useful page than fill a gap with invented numbers, consequences, or recommendations." }], sources: [sources.store, sources.news, sources.wiki], status: "Verified"
  },
  {
    path: "/privacy/", title: "Privacy Policy", eyebrow: "LEGAL", description: "Privacy information for QuasimorphWiki.com.", answer: "The launch site has no accounts, no database, and no real-time AI calls. Interactive tools calculate locally in your browser.", sections: [{ title: "Data", body: "We do not ask you to submit personal information through the launch version. Hosting providers may process standard request logs for security and delivery." }, { title: "Future advertising", body: "Advertising is not enabled at launch. If analytics or advertising cookies are added, this policy and consent controls will be updated before activation." }], status: "Verified"
  },
  {
    path: "/terms/", title: "Terms of Use", eyebrow: "LEGAL", description: "Terms for using this unofficial fan resource.", answer: "Use the site as a reference, verify patch-sensitive decisions in game, and do not treat fan guidance as a guarantee of an outcome.", sections: [{ title: "Availability", body: "Content is provided as-is and may become outdated after a patch. Links to third-party sites are provided for convenience." }, { title: "Acceptable use", body: "Do not misuse the site, attempt to disrupt it, or use it to distribute piracy, cracks, cheats, or malicious files." }], status: "Verified"
  },
  {
    path: "/disclaimer/", title: "Unofficial Fan Site Disclaimer", eyebrow: "LEGAL", description: "Trademark, affiliation, and accuracy disclaimer for QuasimorphWiki.com.", answer: "QuasimorphWiki.com is an unofficial fan-made resource and is not affiliated with or endorsed by Magnum Scriptum or HypeTrain Digital.", sections: [{ title: "Names and marks", body: "Quasimorph and related names are the property of their respective owners. This site uses no official logo to present itself as an official product." }, { title: "Sources and accuracy", body: "Facts are independently summarized and linked to their sources. Game updates can change mechanics, rewards, and conditions after our verification date." }], sources: [sources.store], status: "Verified"
  },
];

export const pageByPath = new Map(pages.map((page) => [page.path, page]));

export const nav = [
  { label: "Guides", href: "/guides/" }, { label: "Classes", href: "/classes/" }, { label: "Items", href: "/items/" },
  { label: "World", href: "/world/" }, { label: "Walkthrough", href: "/walkthrough/" }, { label: "Achievements", href: "/achievements/" },
  { label: "Mods", href: "/mods/" }, { label: "Updates", href: "/updates/" }, { label: "Tools", href: "/tools/" },
];
