import type { PageEntry } from "../app/site-data";

const patchNotes = {
  label: "Quasimorph 1.0 patch notes",
  url: "https://store.steampowered.com/news/app/2059170/view/667246521005114967",
  type: "OFFICIAL" as const,
};

const roadmap = {
  label: "Official post-release roadmap",
  url: "https://steamcommunity.com/app/2059170/announcements/",
  type: "OFFICIAL" as const,
};

const shipWiki = {
  label: "Official Wiki — Ship Upgrades",
  url: "https://quasimorph.wiki.gg/wiki/Ship_Upgrades",
  type: "OFFICIAL WIKI" as const,
};

const augmentWiki = {
  label: "Official Wiki — Augmentations and implants",
  url: "https://quasimorph.wiki.gg/wiki/Augmentations_and_implants",
  type: "OFFICIAL WIKI" as const,
};

const communityBeginner = {
  label: "Version 1.0 community beginner discussion",
  url: "https://www.reddit.com/r/Quasimorph/comments/1vgflq8/",
  type: "COMMUNITY" as const,
};

const communityStuck = {
  label: "Recent 1.0 new-player troubleshooting thread",
  url: "https://www.reddit.com/r/Quasimorph/comments/1vhcr8v/",
  type: "COMMUNITY" as const,
};

const communityLoot = {
  label: "Community loot-priority discussion",
  url: "https://www.reddit.com/r/Quasimorph/comments/1ttwtto/",
  type: "COMMUNITY" as const,
};

export const p0Pages: PageEntry[] = [
  {
    path: "/guides/after-tutorial/", title: "What to Do After the Tutorial", eyebrow: "0–10 HOURS // FIRST THREE DEPLOYMENTS",
    description: "A three-contract Quasimorph 1.0 plan for banking the tutorial gear, building spare kits, recovering from death and deciding when to leave Mars.",
    answer: "Bank anything the tutorial gave you, build a cheap complete kit, and use the first three deployments to create a reserve—not to prove the strongest build.",
    sections: [
      { title: "Before deployment one", body: "Move valuable tutorial rewards into the Magnum instead of carrying every good object into the first uncertain job.", bullets: ["Keep the objective simple: learn a real briefing and return alive.", "Build primary, fallback, compatible ammunition, food, medicine and repair around equipment you can replace.", "Choose the retreat trigger before launch and leave empty inventory space for the real reward."] },
      { title: "Deployment one — readable work", body: "Prefer a short contract whose opponent, floor count and objective you can explain. Mars-area work is a practical community opening because it reduces early friction, but it is a route—not a rule.", bullets: ["Read beneficiary and victim before reward.", "Avoid turning retrieval or elimination into a full-map clear.", "Extract as soon as the objective and enough replacement supply are secure."] },
      { title: "Deployment two — fill the shortage", body: "Audit the ship after the first return. The second contract should target the missing category: treatment, food, ammunition, armor, a fallback weapon or an identified ship-project input." },
      { title: "Deployment three — prove repeatability", body: "Launch another coherent kit without borrowing a rare object from the first. The milestone is roughly three replaceable deployment sets and enough consumables to use them." },
      { title: "Recover from a failed run", body: "Do not send the next-best equipment after the body. Diagnose one primary cause—contract choice, sight line, treatment, ammunition, weight or greed—then choose the cheapest contract that tests the correction." },
      { title: "When to leave Mars", body: "Leave when nearby work no longer solves the bottleneck, an intended faction or story route requires travel, or Earth-side trading makes the trip worthwhile. Do not wait for an arbitrary hour mark." },
    ],
    links: [{ label: "Choose contracts", href: "/guides/choosing-contracts/", note: "Use the full Go/No-Go briefing order." }, { label: "Mission Prep", href: "/tools/mission-prep/", note: "Write the supply and retreat plan." }, { label: "Extraction", href: "/guides/extraction/", note: "Stop the first success from becoming a loss." }], sources: [patchNotes, communityBeginner, communityStuck], status: "Partial coverage",
  },
  {
    path: "/guides/combat-stances/", title: "Combat Stances and Action Points", eyebrow: "COMBAT // TURN ECONOMY",
    description: "Use Quasimorph movement stances, action points, doors and sight lines as one turn-economy system instead of treating speed as a free upgrade.",
    answer: "Choose a stance for the information and distance needed this turn. Preserve enough action economy to react after a door, target or wound changes the situation.",
    sections: [
      { title: "Sneak, walk and sprint", body: "The exact current action and accuracy effects belong to the live interface. The stable decision is functional: Sneak favors controlled low-exposure movement, Walk is the default information pace, and Sprint trades control for distance when the route is already understood." },
      { title: "Door case", body: "Do not arrive with no action economy left. Approach from a recoverable tile, open or reveal the doorway, read every new sight line, then choose attack, reposition or retreat." },
      { title: "Final-AP case", body: "A low-confidence final attack can leave the clone exposed through the entire enemy response. Spend that action on cover, a closed angle or a retreat tile whenever the miss creates a worse state than the movement." },
      { title: "Changed-body case", body: "Pain, wounds, weight and status effects can change what the next turn allows. Re-read the current interface after treatment or injury instead of repeating the action sequence that worked one turn earlier." },
      { title: "Common failures", body: "Sprinting into unexplored vision, reloading in a newly opened lane, blocking the retreat with bodies or fire, and assuming the visible enemy is the only enemy all remove future options." },
    ],
    links: [{ label: "Room clearing cases", href: "/guides/room-clearing/", note: "Apply the stance rule to four layouts." }, { label: "Wounds and medicine", href: "/guides/wounds-medicine/", note: "Recalculate after the body changes." }], sources: [patchNotes, communityBeginner, communityStuck], status: "Partial coverage",
  },
  {
    path: "/guides/quasimorphosis/", title: "Quasimorphosis Guide for Version 1.0", eyebrow: "ANOMALY // ESCALATION",
    description: "Read the live quasimorphosis state, location and mission pressure, then choose control, faster objectives or extraction without importing old thresholds.",
    answer: "Treat quasimorphosis as a changing contract condition. Watch the live meter and current effects, shorten the route as pressure grows, and never assume a remembered pre-1.0 threshold still applies.",
    sections: [
      { title: "What the meter tells you", body: "The current interface is the source of truth for stage and effects. This guide does not publish remembered numeric thresholds because version and location differences make them brittle." },
      { title: "Location and opponent", body: "Quasimorphic pressure does not exist in isolation. Ask whether the destination can escalate, what the ordinary faction already demands from the kit, and whether the primary damage plan has another answer for unfamiliar armor or immunity." },
      { title: "Continue", body: "Continue while the objective has a specific value, the route remains short and known, treatment and ammunition reserves are intact, and the live escalation state is still inside the pre-deployment plan." },
      { title: "Control or accelerate", body: "Use only control methods confirmed by the current item or interface. If control is uncertain, reduce time on floor: skip optional rooms, protect the objective path and avoid fights that add no campaign value." },
      { title: "Extract", body: "Leave when an unfamiliar stage invalidates the primary plan, the second damage answer is consumed, a Baron-level threat appears without preparation, or escalation combines with wounds and low supplies." },
      { title: "Old-version boundary", body: "Community explanations remain useful for vocabulary and failure cases, but exact stage numbers, triggers and item effects are withheld until checked against current 1.0 evidence." },
    ],
    links: [{ label: "Mission Prep", href: "/tools/mission-prep/", note: "Add quasimorphosis to the risk explanation." }, { label: "Extraction decision", href: "/guides/extraction/", note: "Turn escalation into a stop rule." }], sources: [patchNotes, communityBeginner, communityStuck], status: "Partial coverage",
  },
  {
    path: "/guides/wounds-medicine/", title: "Wounds and Medicine Guide", eyebrow: "SURVIVAL // TRIAGE",
    description: "A symptom-to-action Quasimorph 1.0 triage method for bleeding, infection risk, pain, impaired movement and the extraction threshold.",
    answer: "Stop, read the health interface, stabilize the fastest lethal process, reassess combat and movement, then leave if treatment consumed the reserve required for extraction.",
    sections: [
      { title: "1 — Read before using", body: "Open the current wound and treatment information. Identify the affected body part, immediate danger, treatment category and any stated failure risk before consuming a scarce item." },
      { title: "2 — Stabilize", body: "Address uncontrolled bleeding or another rapidly lethal state first. Do not spend turns optimizing pain or long-term recovery while the next tick can end the run." },
      { title: "3 — Treat the wound", body: "Use the category supported by the current interface. Modified or robotic body parts can follow different healing logic; verify the installed body system instead of assuming ordinary medicine applies." },
      { title: "4 — Reassess", body: "After every treatment, recheck bleeding, infection risk, pain, available actions, movement and the condition of the corresponding augmentation or implant." },
      { title: "5 — Decide", body: "Continue only if the body, remaining treatment and route can survive another unexpected fight. Extract when mobility is impaired, infection cannot be managed, treatment failures consume the return reserve or the primary combat loop no longer works." },
      { title: "Failure-proof packing", body: "Bring treatment for the likely opponent and preserve at least one stabilization option for the return. Exact item names and counts depend on the visible 1.0 item descriptions, clone and settings." },
    ],
    links: [{ label: "Extraction guide", href: "/guides/extraction/", note: "Use the post-treatment continue-or-leave check." }, { label: "Augmentations", href: "/items/augmentations/", note: "Understand body-part disable and healing differences." }], sources: [patchNotes, augmentWiki, communityBeginner, communityStuck], status: "Partial coverage",
  },
  {
    path: "/guides/difficulty-settings/",
    title: "Best Difficulty Settings for New Players",
    eyebrow: "START HERE // SETTINGS",
    description: "Three practical Quasimorph 1.0 setup profiles for learning, recovering from failure, or keeping the intended pressure.",
    answer: "Start from Normal, expose more combat information, and change only the rules that prevent you from learning. Difficulty is modular in 1.0, so there is no single required preset.",
    sections: [
      { title: "Profile A — learn the systems", body: "Use this when the interface, contract economy, and political simulation are all new at once.", bullets: ["Begin from Normal instead of copying an extreme challenge preset.", "Enable visible hit chance, enemy health, warnings, and faster routine transfers where the current settings menu offers them.", "Preserve factions during the learning campaign if losing shops and contract variety would make the run less useful to you.", "Keep wounds, ammunition, hunger, extraction, and clone loss meaningful; those systems teach the decisions every later run uses."] },
      { title: "Profile B — shorter recovery", body: "Use this when you understand a mistake but do not want rebuilding to consume the next evening.", bullets: ["Reduce the specific recovery cost that makes you stop playing; do not soften unrelated systems by habit.", "Keep combat information visible so a loss can be explained rather than dismissed as random.", "After two or three successful deployments, restore one softened rule and see whether the supply loop remains stable."] },
      { title: "Profile C — intended pressure", body: "Choose the standard rules once you can explain why a deployment is safe, where it may fail, and when you will leave.", bullets: ["Carry replaceable equipment until the campaign has a real reserve.", "Do not increase difficulty merely because the first floor went well; campaign attrition appears across many missions.", "Treat difficulty achievements as separate projects with their own verified conditions."] },
      { title: "What changed in 1.0", body: "The official release notes describe a reworked configuration system with modular difficulty options. Old preset advice can therefore be incomplete even when the underlying survival principle remains sound." },
    ],
    faqs: [{ q: "Is changing settings cheating?", a: "No. The 1.0 configuration system is deliberately modular. Use it to create a campaign you can read, then document your own rules if a challenge condition matters to you." }, { q: "Should I enable No Faction Destruction?", a: "It is a useful learning choice when you want to preserve contract and shop variety. It also changes the campaign simulation, so leave it off when faction collapse is part of the experience you want." }],
    links: [{ label: "1.0 beginner route", href: "/guides/getting-started/", note: "Turn the settings into a stable first campaign." }, { label: "Mission Prep Planner", href: "/tools/mission-prep/", note: "Set the retreat threshold before deployment." }],
    sources: [patchNotes, communityBeginner], status: "Partial coverage",
  },
  {
    path: "/guides/extraction/", title: "Extraction Guide: When to Leave", eyebrow: "SURVIVAL // DECISION TREE",
    description: "A floor-by-floor stop rule for protecting the objective, capsule items, health, ammunition and the route home.",
    answer: "Leave when the mission value you have secured is greater than the value of one more room, or when the remaining reserve cannot solve both the next fight and the return route.",
    sections: [
      { title: "The four-question check", body: "Run this check at every floor transition and after every severe wound.", bullets: ["Objective: is the contract already complete, or is the required item safely controlled?", "Body: can the clone survive another unexpected hit and still move to extraction?", "Supply: is there enough medicine, food, ammunition and durability for a fight plus the way back?", "Route: do you still know a recoverable path to an exit, or are you relying on finding one later?"] },
      { title: "Continue", body: "Continue only when the objective still requires it, the next floor has a specific campaign value, and your reserve remains above the retreat threshold chosen before landing." },
      { title: "Extract", body: "Extract immediately after a hard trigger: uncontrolled bleeding or infection risk, impaired movement with an unsafe route, a failed primary weapon with no credible fallback, exhausted treatment, or a secured irreplaceable progression item." },
      { title: "Emergency evacuation", body: "Emergency evacuation can intentionally sacrifice the contract to preserve the clone or carried value. It is a failure-management tool, not an embarrassment. Decide whether survival and recovered progress outweigh the mission outcome before using it." },
      { title: "After a death", body: "Do not respond by risking the next best kit. Rebuild a cheap coherent loadout, choose a readable contract, and restore the reserve before returning to the failed objective." },
    ],
    links: [{ label: "Loot priority", href: "/guides/loot-priority/", note: "Decide what the final inventory slot is worth." }, { label: "Wounds and medicine", href: "/guides/wounds-medicine/", note: "Triage the body before deciding to continue." }], sources: [communityBeginner], status: "Partial coverage",
  },
  {
    path: "/guides/loot-priority/", title: "Loot Priority Guide", eyebrow: "BUILD & GEAR // INVENTORY",
    description: "A campaign-stage matrix for deciding which chip, ship material, crate, consumable, weapon or trade good deserves the final slot.",
    answer: "Early loot should create permanent capability or shorten recovery. A rare-looking object is lower priority than the chip or ship material that fixes your current bottleneck.",
    sections: [
      { title: "Early campaign", body: "Prioritize the next three launches.", bullets: ["Progression chips, data and rare project inputs that unlock capability.", "Food, medicine, ammunition and repair supplies missing from your reserve.", "A weapon or armor piece that completes a replaceable kit.", "Bulky trade goods only when you already know the buyer or project that needs them."] },
      { title: "Mid campaign", body: "Prioritize the system currently limiting expansion.", bullets: ["Navigation, monitoring, supply, capsule and hangar project materials.", "Recipes, class/operator progression and equipment projects you will actually use.", "Turrets, drones or specialist gear for a named upcoming contract—not for a hypothetical future.", "Duplicate ordinary equipment only when its recycling or replacement value beats everything else in the slot."] },
      { title: "Late campaign", body: "Value becomes build- and route-specific.", bullets: ["Rare augmentation or pact inputs only when the installation and recovery plan exists.", "Story items outrank speculative profit when they protect the route you chose.", "Production bottlenecks outrank another trophy weapon that shares an existing role."] },
      { title: "The final-slot test", body: "Ask: does this unlock something, replace a known loss, supply the next mission, finish a project, or advance the intended story? If none apply, it is probably optional." },
    ],
    links: [{ label: "Magnum upgrades", href: "/world/magnum-ship/", note: "Map recovered materials to a real department goal." }, { label: "Bartering and inventory", href: "/guides/bartering-magnum/", note: "Store and spend recovered value deliberately." }], sources: [communityBeginner, communityLoot, shipWiki], status: "Partial coverage",
  },
  {
    path: "/guides/room-clearing/", title: "Room Clearing and Door Tactics", eyebrow: "COMBAT // POSITIONING",
    description: "Four repeatable entry patterns using action points, sight lines, retreat tiles, range and noise without depending on a tier-list build.",
    answer: "Do not spend the final action entering unknown vision. Open information from a tile that still lets you break line of sight or return to a controlled corridor.",
    sections: [
      { title: "Case 1 — single doorway", body: "Approach from an offset tile, preserve an action after opening, identify the nearest cover and retreat square, then engage from the distance your weapon supports." },
      { title: "Case 2 — long corridor", body: "Treat every side door as a new firing angle. Clear the nearest branch first, avoid advancing beyond your fallback tile, and do not reload in the open merely because the visible target died." },
      { title: "Case 3 — large open room", body: "Do not reveal the entire space in one move. Use the edge of vision, pull enemies toward a prepared lane, and keep the escape direction free of bodies, fire and friendly obstruction." },
      { title: "Case 4 — enemies behind you", body: "Stop pushing forward. Break contact toward known ground, remove the shortest threat first, and re-establish one front before resuming the objective." },
      { title: "End-turn audit", body: "Before ending the turn, check every visible enemy, ammunition state, current wounds, door state and the tile you will use if the next attack misses." },
    ],
    links: [{ label: "Combat stances and AP", href: "/guides/combat-stances/", note: "Preserve options across every turn." }, { label: "Extraction decision", href: "/guides/extraction/", note: "Recognize when the position is no longer recoverable." }], sources: [patchNotes], status: "Partial coverage",
  },
  {
    path: "/guides/bartering-magnum/", title: "Bartering and Magnum Inventory", eyebrow: "WORLD SYSTEMS // LOGISTICS",
    description: "A practical loop for faction credit, reputation, purchasing, stash tabs and rebuilding a clone without searching the entire ship.",
    answer: "Organize the Magnum by deployment job, spend faction credit where it was earned, and make every standard kit rebuildable from the same small sequence.",
    sections: [
      { title: "Understand payment", body: "Contract value is not a universal wallet. Track the employer, displayed items, remaining faction credit and the reputation that affects access and prices." },
      { title: "Buy the bottleneck", body: "Early purchases should complete a ship project or restore the next deployments. A recipe, class chip or unusual weapon is only valuable when the campaign can support it." },
      { title: "Seven-tab workflow", body: "Use a consistent arrangement: consumables/ammunition; armor; crafting parts; valuables; weapons; chips/data; augmentations. Cryogenic storage belongs to perishable material that actually requires it." },
      { title: "The 30-second loadout", body: "Pick armor, primary, fallback, ammunition, food, medicine and repair in the same order. If one category is empty, the next contract should solve that shortage rather than introduce a new project." },
      { title: "Do not hoard blindly", body: "Duplicates have storage cost. Keep replaceable kits and project inputs; recycle, trade or abandon objects that do not serve a deployment, project or route." },
    ],
    links: [{ label: "Loot priority", href: "/guides/loot-priority/", note: "Extract for the next bottleneck." }, { label: "Magnum departments", href: "/world/magnum-ship/", note: "Choose the upgrade path before collecting materials." }], sources: [communityBeginner, shipWiki], status: "Partial coverage",
  },
  {
    path: "/controls/", title: "Controls Hub", eyebrow: "START HERE // INPUT",
    description: "Version-aware keyboard and controller guidance focused on movement, inventory, alternative actions and safe rebinding.",
    answer: "Open the current in-game bindings before memorizing a key list. Version 1.0 changed controls and added alternative actions, inventory tabs and quality-of-life input options.",
    sections: [
      { title: "Learn by scenario", body: "Practice one safe sequence in the tutorial: move, change stance, inspect a target, open alternative actions, transfer an item, reload, treat a wound and locate extraction." },
      { title: "Why no guessed key table", body: "Bindings can be changed and older guides may describe pre-1.0 behavior. This site publishes only the interaction model unless a current default is directly verified." },
      { title: "Controller and Steam Deck boundary", body: "The official Steam store currently exposes controller-related features but does not provide this project enough evidence for a complete Deck workflow. The Deck draft therefore remains noindex instead of presenting assumptions as compatibility advice." },
    ],
    links: [{ label: "Keyboard workflow", href: "/controls/keyboard/", note: "Use the current binding screen as the source of truth." }, { label: "Room clearing", href: "/guides/room-clearing/", note: "Convert controls into a safe entry routine." }], sources: [patchNotes], status: "Partial coverage",
  },
  {
    path: "/controls/keyboard/", title: "Keyboard Controls and Shortcuts", eyebrow: "INPUT // KEYBOARD",
    description: "A scenario-based 1.0 keyboard workflow covering alternative actions, inventory transfer, tabs and rebinding without guessing undocumented defaults.",
    answer: "Verify each binding in Settings → Controls, then practice the interaction as a sequence. The name and behavior of the action matter more than a key that may have been rebound.",
    sections: [
      { title: "Combat sequence", body: "Verify movement, stance change, attack/confirm, reload, end turn and alternative-action bindings. Practice opening a door while retaining enough action economy to step back." },
      { title: "Inventory sequence", body: "Verify transfer, split or alternative item action, equipment slots and inventory-tab navigation. Version 1.0 added inventory tabs and changed several interaction shortcuts." },
      { title: "Ship sequence", body: "Verify fast transfer/trade options and the controls used by Magnum departments. Turn on the convenience settings you want before building muscle memory around a slower workflow." },
      { title: "Safe rebinding", body: "Change one cluster at a time, avoid duplicate critical actions, test it in the tutorial or a disposable deployment, and capture a screenshot of the finished layout." },
    ],
    links: [{ label: "Beginner guide", href: "/guides/getting-started/", note: "Practice the controls inside the first stable loop." }], sources: [patchNotes], status: "Partial coverage",
  },
  {
    path: "/world/magnum-ship/", title: "Magnum Ship Upgrade Guide", eyebrow: "WORLD SYSTEMS // HIS MAGNUM",
    description: "Three department routes that solve safety, information or production problems without pretending there is one mandatory build order.",
    answer: "Upgrade the department that removes your current campaign bottleneck. New players usually benefit first from better mission information, dependable supplies and a cheaper failure state.",
    sections: [
      { title: "Route A — safer recovery", body: "Prioritize the extraction capsule, shuttle/hangar capacity and cloning support when deaths regularly erase the items or time needed for the next mission." },
      { title: "Route B — better decisions", body: "Prioritize navigation and monitoring when the contract board is poor, travel is inefficient or briefings do not give you enough confidence to choose a job." },
      { title: "Route C — stable production", body: "Prioritize supply, research and engineering only when you can name the missing consumable, recipe or equipment project. Production is not progress if the inputs starve every other department." },
      { title: "First upgrade audit", body: "Write down the last three failed or delayed deployments. If the cause repeats—no food, no medical reserve, poor contract choice, unrecovered loot—that repeated cause chooses the department." },
      { title: "Coverage boundary", body: "The official Wiki page is still a partial reference and upgrade values can change. This guide therefore compares functions and routes rather than publishing a brittle level-by-level cost table." },
    ],
    links: [{ label: "Loot priority", href: "/guides/loot-priority/", note: "Collect materials for the selected route." }, { label: "Mission Prep Planner", href: "/tools/mission-prep/", note: "Find the bottleneck before the shuttle launches." }], sources: [shipWiki, patchNotes], status: "Partial coverage",
  },
  {
    path: "/items/augmentations/", title: "Augmentations and Implants", eyebrow: "BUILD & GEAR // BODY SYSTEMS",
    description: "A risk-first guide to body slots, installation, wound disable behavior, loss on death and when the Magnum can support experimentation.",
    answer: "Do not install a rare body modification just because a slot is empty. Choose it for a coherent build, understand its healing rules, and assume the carried modification is lost with the clone.",
    sections: [
      { title: "Nine body areas", body: "The official Wiki documents nine installable body areas. A complete plan must therefore consider slot competition and the consequences of damage to the same area." },
      { title: "Wounds can disable the benefit", body: "A wound to the corresponding body part can disable an installed augmentation or implant. Treat the modification as part of the wound plan, not as permanent passive armor." },
      { title: "Death and recovery", body: "Augmentations and implants installed on a clone are lost on death. Do not commit a unique piece until the mission, kit and extraction plan justify that risk." },
      { title: "Healing differences", body: "Robotic and organic modifications do not necessarily use the same treatment logic. Read the current interface and official reference before selecting medicine for a modified body." },
      { title: "When to begin", body: "Experiment after ordinary kits, food, medicine and replacement equipment are stable. Install one deliberate change, test it on a readable contract, and record what new failure mode it creates." },
    ],
    links: [{ label: "Wounds and medicine", href: "/guides/wounds-medicine/", note: "Plan treatment around body-part failure." }, { label: "Extraction guide", href: "/guides/extraction/", note: "Protect the value you put into the clone." }], sources: [augmentWiki], status: "Partial coverage",
  },
  {
    path: "/updates/patch-1-0/", title: "Quasimorph 1.0 Patch Notes Summary", eyebrow: "UPDATES // JULY 31, 2026",
    description: "An official-source summary of Quasimorph 1.0: save compatibility, story scope, achievements, Pacts, configuration, Map Editor and Mod Manager.",
    answer: "Version 1.0 released July 31, 2026. The developer says default-branch pre-1.0 saves are incompatible, while unstable beta saves are compatible; back up saves and read the official note before changing branches.",
    sections: [
      { title: "Release and save compatibility", body: "The Steam release notes date 1.0 to July 31, 2026. They explicitly separate incompatible default-branch saves from compatible unstable-beta saves. This site does not generalize that statement to modded or manually altered saves." },
      { title: "Campaign scope", body: "Official announcements describe five completed storylines—Civil Resistance, Tezctlan, Xiomara, AnCom and RealWare—and nine endings with epilogues. Exact branch conditions remain outside indexed coverage until verified." },
      { title: "Pacts and progression", body: "The release messaging advertises the final Magnum Pact department and a total of 142 Pacts. This site does not publish 142 empty records or infer effects not present in current documentation." },
      { title: "Configuration and controls", body: "Version 1.0 includes a configuration overhaul with modular difficulty options, plus control and quality-of-life changes such as alternative actions and inventory tabs. Older settings and shortcut guides require rechecking." },
      { title: "Creation and modding", body: "The release includes a Map Editor and Mod Manager. Mod compatibility, dependencies and troubleshooting remain noindex until the site can deliver more than a Workshop link." },
      { title: "Achievements", body: "Steam exposes 82 achievements for the release. The tracker preserves Steam’s hidden descriptions instead of guessing them and stores personal completion only in the browser." },
      { title: "Affected pages", body: "Difficulty, controls, achievements, Pacts, story routes, classes, weapons, mods and hotfix-sensitive data were placed into either current coverage or a pending/noindex queue according to available evidence." },
    ],
    links: [{ label: "Roadmap", href: "/updates/roadmap/", note: "Separate post-release support from planned work." }, { label: "Achievements", href: "/achievements/", note: "Track the current 82-record Steam list." }, { label: "Difficulty settings", href: "/guides/difficulty-settings/", note: "Use the modular configuration system deliberately." }], sources: [patchNotes, roadmap], status: "Verified",
  },
  {
    path: "/updates/roadmap/", title: "Roadmap After Version 1.0", eyebrow: "UPDATES // OFFICIAL TIMELINE",
    description: "Confirmed post-release support separated from planned features and unknown dates.",
    answer: "The official roadmap places post-release hotfix support in Q3 2026, a Bestiary and quality-of-life update in Q4, and a larger update plus DLC direction in 2027. Plans can change; this page does not convert them into release promises.",
    sections: [
      { title: "Released", body: "Quasimorph 1.0 launched on July 31, 2026. The release included Steam achievements, the Map Editor, Mod Manager, campaign conclusions and a major configuration overhaul." },
      { title: "Q3 2026 — support", body: "The developer roadmap identifies hotfix support after launch. Individual build notes are not merged into guides until their affected facts are rechecked." },
      { title: "Q4 2026 — planned", body: "The public roadmap names a Bestiary and quality-of-life work. This is planned scope, not evidence that the feature has shipped." },
      { title: "2027 — direction", body: "The developer has stated an intention for a major update and DLC work. No unannounced feature list, price or exact release date is inferred here." },
      { title: "How this site reacts", body: "A patch can move a page from Verified to Partial coverage. Update summaries keep official facts, planned work and community observations in separate labels." },
    ],
    links: [{ label: "Version 1.0 summary", href: "/updates/patch-1-0/", note: "See what has already shipped." }, { label: "Updates hub", href: "/updates/", note: "Review current verification state." }], sources: [roadmap, patchNotes], status: "Verified",
  },
  {
    path: "/tools/", title: "Planning Tools", eyebrow: "TOOLS // COMPLETED WORKFLOWS",
    description: "Browser-local Quasimorph tools that complete a real task without sending loadouts, progress or free text to a server.",
    answer: "Mission Prep Planner 2.0 and site search are ready. Damage and story databases stay out of navigation until their records meet the published coverage threshold.",
    sections: [
      { title: "Mission Prep Planner 2.0", body: "Explain contract risk, build a supply brief, write three retreat triggers, save locally, copy a shareable URL and print the result." },
      { title: "Site search", body: "Search completed guides, achievements, systems and verified updates by task, topic or content type. Draft research is intentionally excluded." },
      { title: "Withheld tools", body: "The Damage & Resistance database needs at least 30 source-traceable records. The Story Decision Planner needs verified branch consequences. Neither is presented as a finished product yet." },
    ],
    links: [{ label: "Mission Prep Planner", href: "/tools/mission-prep/", note: "Build, save, share and print a deployment brief." }, { label: "Search", href: "/search/", note: "Find a completed page by the problem it solves." }], status: "Verified",
  },
  {
    path: "/updates/", title: "Quasimorph Updates", eyebrow: "UPDATES // VERIFICATION QUEUE",
    description: "Official Quasimorph 1.0 release coverage, the post-launch roadmap and the site pages that must be rechecked when systems change.",
    answer: "Version 1.0 shipped July 31, 2026. This hub separates released facts from planned work; a hotfix page remains noindex until its dated build timeline is complete.",
    sections: [
      { title: "Released — version 1.0", body: "The complete source-based summary covers save compatibility, campaign scope, Pacts, achievements, configuration, controls, Map Editor and Mod Manager." },
      { title: "Planned — roadmap", body: "Q3 hotfix support, a Q4 Bestiary/QoL update and 2027 update/DLC direction are presented as plans rather than release promises." },
      { title: "Pending re-verification", body: "Controls, difficulty, damage/resistance data, Pacts, story consequences, mods and build advice return to pending review when an official change affects their claims." },
    ],
    links: [{ label: "Version 1.0 summary", href: "/updates/patch-1-0/", note: "Released July 31, 2026 · reviewed August 7, 2026." }, { label: "Post-release roadmap", href: "/updates/roadmap/", note: "Confirmed timeline labels: released, planned and unknown." }], sources: [patchNotes, roadmap], status: "Verified",
  },
  {
    path: "/about/", title: "About Quasimorph Wiki", eyebrow: "PROJECT // EDITORIAL METHOD",
    description: "Who maintains this independent field archive, how public sources become claims, how version-sensitive pages are reviewed and how corrections are handled.",
    answer: "QuasimorphWiki.com is maintained as an independent fan field archive. It publishes original task guidance from traceable public sources and withholds conclusions when current evidence is insufficient.",
    sections: [
      { title: "Maintainer", body: "The public author label is “QuasimorphWiki.com maintainer.” The site does not invent an editorial team, professional review history or first-hand play credentials." },
      { title: "Source order", body: "Current in-game evidence and official release notes take priority, followed by current official Wiki references, multiple recent community sources, a single community source and finally old-version discovery material." },
      { title: "From source to page", body: "Research is recorded in the source catalog, reusable facts in the claim ledger, and candidate topics in the scored inventory. Page briefs define required questions, unknowns and version conflicts before publication." },
      { title: "Status and updates", body: "Verified covers the claims supported by current official material. Partial coverage mixes supported facts with labeled editorial guidance. Pending pages are noindex and excluded from sitemap and search." },
      { title: "Corrections", body: "A correction should identify the page, claim, current game version and a specific official or directly verifiable source. Until a public contact workflow is configured, source-linked corrections can be submitted through the project owner’s existing site channel." },
      { title: "Independence", body: "The relationship and trademark statement is kept in the footer and dedicated disclaimer instead of being emphasized above every page." },
    ],
    links: [{ label: "Privacy", href: "/privacy/", note: "Analytics consent and browser-local data." }, { label: "Disclaimer", href: "/disclaimer/", note: "Independence and trademark boundaries." }], sources: [patchNotes, shipWiki, augmentWiki], status: "Verified",
  },
  {
    path: "/privacy/", title: "Privacy Policy", eyebrow: "PROJECT // PRIVACY",
    description: "How optional analytics consent, local achievement progress, saved plans, share links and hosting logs work on QuasimorphWiki.com.",
    answer: "Analytics loads only after explicit consent. Planner settings and achievement completion are stored locally in your browser; this site has no account system and does not request Steam credentials.",
    sections: [
      { title: "Optional analytics", body: "Google Analytics is not requested until you select Accept. If you decline, the preference is stored locally and the analytics script is not loaded. You can clear site storage to ask again." },
      { title: "Local browser storage", body: "The achievement tracker saves achievement names you mark complete. Mission Prep saves selected options and free-text retreat rules. Analytics events never include search text, retreat text or a shared plan payload." },
      { title: "Share links", body: "A shared planner URL contains the plan in the URL itself. Anyone who receives the link can read it; the site does not need to store the plan on a server." },
      { title: "Infrastructure", body: "The hosting and delivery providers may process ordinary request logs for security and reliability. No advertising network is enabled in this release." },
      { title: "Your controls", body: "Clear this site’s local storage to remove achievement progress, saved plans and consent preference. Do not put personal information into planner retreat fields or shared URLs." },
    ], status: "Verified",
  },
  {
    path: "/search/", title: "Search Quasimorph Guides and Data", eyebrow: "SITE INDEX // SEARCH",
    description: "Search completed Quasimorph 1.0 guides, systems, achievements, updates and tools.",
    answer: "Search only returns pages that meet the public coverage threshold. Research drafts and unverified placeholder databases are intentionally excluded.",
    sections: [], status: "Verified",
  },
];
