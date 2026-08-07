/* eslint-disable @next/next/no-img-element -- screenshots are pre-optimized local WebP assets */
import { AchievementTracker } from "./achievement-tracker";
import { MissionPlanner } from "./mission-planner";
import { DamageLookup, StoryPlanner } from "./tool-suite";
import { getContentMeta, searchDocuments } from "../lib/content-registry";
import { SearchLauncher, SearchResults } from "./site-search";
import { gameVersion, PageEntry, verifiedAt } from "./site-data";

const navGroups: { label:string; links: readonly (readonly [string,string])[] }[] = [
  { label:"Start Here", links:[["1.0 Beginner Guide","/guides/"],["Difficulty Settings","/guides/difficulty-settings/"],["Controls","/controls/"],["After the Tutorial","/guides/after-tutorial/"]] },
  { label:"Guides", links:[["All Guides","/guides/"],["Choose Contracts","/guides/choosing-contracts/"],["Extraction","/guides/extraction/"],["Wounds & Medicine","/guides/wounds-medicine/"],["Room Clearing","/guides/room-clearing/"]] },
  { label:"Database", links:[["Achievements (82)","/achievements/"],["Augmentations","/items/augmentations/"],["Loot Priority","/guides/loot-priority/"]] },
  { label:"Story", links:[["Magnum & World Systems","/world/magnum-ship/"],["Barter & Inventory","/guides/bartering-magnum/"],["Version 1.0 Roadmap","/updates/roadmap/"]] },
  { label:"Tools", links:[["Mission Prep Planner","/tools/mission-prep/"],["Site Search","/search/"]] },
  { label:"Updates", links:[["Update Hub","/updates/"],["Version 1.0","/updates/patch-1-0/"],["Roadmap","/updates/roadmap/"]] },
];

export function Header() {
  return <header className="site-header"><a href="/" className="brand" aria-label="Quasimorph Wiki home"><span className="brand-mark">Q</span><span><b>QUASIMORPH</b><small>WIKI // 1.0 FIELD ARCHIVE</small></span></a><nav className="mega-nav" aria-label="Main navigation">{navGroups.map((group)=><details key={group.label}><summary>{group.label}</summary><div>{group.links.map(([label,href])=><a key={href} href={href}><b>{label}</b><span>OPEN RECORD →</span></a>)}</div></details>)}</nav><SearchLauncher documents={searchDocuments}/><details className="mobile-nav"><summary aria-label="Open navigation">MENU</summary><div>{navGroups.map((group)=><details key={group.label}><summary>{group.label}</summary>{group.links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</details>)}</div></details></header>;
}

export function Footer() {
  return <footer><div className="footer-grid"><div><div className="brand footer-brand"><span className="brand-mark">Q</span><span><b>QUASIMORPH WIKI</b><small>INDEPENDENT FIELD ARCHIVE</small></span></div><p>Task-focused version 1.0 guides, local planning tools and source-visible update coverage.</p></div><div><b>REFERENCE</b><a href="/guides/">Guides</a><a href="/achievements/">Achievements</a><a href="/tools/">Tools</a><a href="/updates/">Updates</a></div><div><b>PROJECT</b><a href="/about/">About & sources</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a></div></div><div className="footer-bottom"><span>VERSION TRACKED // {gameVersion}</span><span>LAST SITE REVIEW // {verifiedAt}</span><span>STATIC CONTENT + BROWSER-LOCAL TOOLS</span></div></footer>;
}

export function Shell({children}:{children:React.ReactNode}) { return <><Header/><main>{children}</main><Footer/></> }

export function MetaBar({status="Partial coverage"}:{status?:PageEntry["status"]}) { return <div className="meta-bar"><span><i className="dot"></i> GAME VERSION <b>{gameVersion}</b></span><span>LAST VERIFIED <b>{verifiedAt}</b></span><span>DATA STATUS <b>{status}</b></span></div> }

function Breadcrumbs({path,title}:{path:string;title:string}) {
  const parts=path.split("/").filter(Boolean);
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">HOME</a>{parts.map((part,i)=>{const href=`/${parts.slice(0,i+1).join("/")}/`; const last=i===parts.length-1; return <span key={href}>/ {last?<b>{title.toUpperCase()}</b>:<a href={href}>{part.toUpperCase()}</a>}</span>})}</nav>;
}

function StructuredData({page}:{page:PageEntry}) {
  const meta=getContentMeta(page.path);
  const crumbs=page.path.split("/").filter(Boolean).map((p,i,a)=>({"@type":"ListItem",position:i+2,name:i===a.length-1?page.title:p.replaceAll("-"," "),item:`https://quasimorphwiki.com/${a.slice(0,i+1).join("/")}/`}));
  const graph:Record<string,unknown>[]=[{"@type":"WebPage","@id":`https://quasimorphwiki.com${page.path}`,name:meta?.title||page.title,description:meta?.description||page.description,datePublished:meta?.publishedAt,dateModified:meta?.modifiedAt||verifiedAt,isPartOf:{"@id":"https://quasimorphwiki.com/#website"}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://quasimorphwiki.com/"},...crumbs]}];
  if(meta&&["guide","article"].includes(meta.kind)) graph.push({"@type":"Article",headline:meta.title,description:meta.description,datePublished:meta.publishedAt,dateModified:meta.modifiedAt,author:{"@type":"Person",name:meta.author},mainEntityOfPage:`https://quasimorphwiki.com${page.path}`});
  if(meta?.kind==="hub"&&page.links?.length) graph.push({"@type":"ItemList",itemListElement:page.links.map((link,index)=>({"@type":"ListItem",position:index+1,name:link.label,url:`https://quasimorphwiki.com${link.href}`}))});
  if(page.faqs?.length) graph.push({"@type":"FAQPage",mainEntity:page.faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))});
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@graph":graph})}}/>;
}

export function ArticlePage({page}:{page:PageEntry}) {
  if(page.path==="/guides/") return <GuidesHubPageV2 page={page}/>;
  return <Shell><StructuredData page={page}/><div className="page-wrap"><Breadcrumbs path={page.path} title={page.title}/><section className="article-hero"><div><span className="kicker">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.description}</p></div></section><MetaBar status={page.status}/>
    {page.spoiler&&<div className="callout warning"><b>SPOILER CONTROL</b><p>This page discusses story routes. Exact outcomes are limited or masked where noted.</p></div>}
    <div className="answer"><span>DIRECT ANSWER</span><p>{page.answer}</p></div>
    {page.sections.length>2&&<details className="article-toc" open><summary>IN THIS GUIDE</summary><ol>{page.sections.map((section,index)=><li key={section.title}><a href={`#section-${index+1}`}>{String(index+1).padStart(2,"0")} {section.title}</a></li>)}</ol></details>}
    {page.sourceNote&&<aside className="transcript-note"><span>EDITORIAL NOTE // COMMUNITY TRANSCRIPTS</span><p>{page.sourceNote}</p></aside>}
    {page.path==="/guides/getting-started/"&&<BeginnerRoute/>}
    {page.path==="/search/"&&<div className="tool-mount"><SearchResults documents={searchDocuments}/></div>}
    {page.tool&&<div className="tool-mount">{page.tool==="mission"?<MissionPlanner/>:page.tool==="damage"?<DamageLookup/>:<StoryPlanner/>}</div>}
    {page.sections.map((section,i)=><section className="content-section" id={`section-${i+1}`} key={section.title}><div className="section-index">{String(i+1).padStart(2,"0")}</div><div><h2>{section.title}</h2><p>{section.body}</p>{section.bullets&&<ul>{section.bullets.map(x=><li key={x}>{x}</li>)}</ul>}</div></section>)}
    {page.path==="/achievements/"&&<AchievementTracker/>}
    {page.links&&page.links.length>0&&<section className="related"><span className="kicker">RELATED ROUTES</span><div className="card-grid">{page.links.map(link=><a href={link.href} key={link.href} className="link-card"><span>OPEN RECORD ↗</span><h3>{link.label}</h3><p>{link.note}</p></a>)}</div></section>}
    {page.faqs&&<section className="faq"><span className="kicker">FIELD QUESTIONS</span><h2>Frequently asked questions</h2>{page.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>}
    <section className="sources"><div><span className="kicker">PROVENANCE</span><h2>Sources & verification</h2><p>Important claims are separated from editorial safety guidance. Patch-sensitive details are omitted when current evidence is incomplete.</p></div><div>{page.sources?.map(s=><a href={s.url} key={s.url}><span>{s.type}</span><b>{s.label}</b><small>Accessed {verifiedAt} ↗</small></a>)||<p className="pending">No external factual claims on this page.</p>}</div></section>
  </div></Shell>;
}

function GuidesHubPageV2({page}:{page:PageEntry}){
  const groups=[
    {title:"0–10 HOURS // START HERE",copy:"Build a recoverable contract loop before optimizing equipment.",links:[["1.0 Beginner Guide","/guides/getting-started/","The complete 0–20 hour field manual."],["What to do after the tutorial","/guides/after-tutorial/","A three-deployment plan and failure recovery loop."],["Difficulty settings","/guides/difficulty-settings/","Three modular profiles for learning and pressure."],["Keyboard controls","/controls/keyboard/","Current interaction workflow and safe rebinding."]]},
    {title:"SURVIVE THE FLOOR",copy:"Solve the turn, the wound and the exit before chasing more loot.",links:[["Combat stances & AP","/guides/combat-stances/","Preserve the final action and a retreat tile."],["Room clearing","/guides/room-clearing/","Four door, corridor and open-room cases."],["Wounds & medicine","/guides/wounds-medicine/","Triage, reassess, then decide whether to leave."],["Extraction","/guides/extraction/","A continue-or-extract decision tree."]]},
    {title:"PLAN THE CAMPAIGN",copy:"Choose work, permanent progress and supply around a specific bottleneck.",links:[["Choosing contracts","/guides/choosing-contracts/","Score sides, floors, threat, facility and travel."],["Loot priority","/guides/loot-priority/","Early, mid and late campaign inventory matrix."],["Magnum upgrades","/world/magnum-ship/","Recovery, information and production routes."],["Bartering & inventory","/guides/bartering-magnum/","Faction credit and a 30-second restock loop."]]},
    {title:"ADVANCED SYSTEMS",copy:"Open these once the ordinary supply loop can absorb a failure.",links:[["Quasimorphosis","/guides/quasimorphosis/","Read escalation as a changing mission condition."],["Augmentations & implants","/items/augmentations/","Slots, wound disable behavior and death risk."],["Achievements tracker","/achievements/","Search 82 Steam records and save local progress."],["Version 1.0 roadmap","/updates/roadmap/","Shipped, planned and unknown work."]]},
  ];
  const structuredPage={...page,links:groups.flatMap((group)=>group.links.map(([label,href,note])=>({label,href,note})))};
  return <Shell><StructuredData page={structuredPage}/><div className="page-wrap guide-index"><Breadcrumbs path={page.path} title={page.title}/><section className="guide-index-hero"><div><span className="kicker">START HERE // VERSION {gameVersion}</span><h1>Guides for the next decision.</h1><p>Begin with the 1.0 route, then jump directly to the contract, survival or ship problem blocking the campaign. This page is an index—not a second copy of the full manual.</p><a className="button primary" href="/guides/getting-started/">START THE 1.0 BEGINNER ROUTE <span>→</span></a></div><aside><span>FAST ROUTE</span><b>01</b><p>Tutorial → three spare kits → readable Mars work → Magnum upgrades → specialization</p></aside></section><MetaBar status={page.status}/><section className="guide-index-search"><SearchResults documents={searchDocuments.filter((document)=>document.kind==="guide")} embedded showInitial={false}/></section><nav className="guide-stage-tabs" aria-label="Guide stages"><a className="active" href="#stage-1">1.0 BEGINNER</a><a href="#stage-2">SURVIVAL</a><a href="#stage-3">CAMPAIGN</a><a href="#stage-4">ADVANCED</a></nav>{groups.map((group,index)=><section className="guide-group" id={`stage-${index+1}`} key={group.title}><header><span>{String(index+1).padStart(2,"0")}</span><div><h2>{group.title}</h2><p>{group.copy}</p></div></header><div>{group.links.map(([title,href,note],linkIndex)=><a href={href} key={href} className={index===0&&linkIndex===0?"primary-guide":""}><span>{index===0&&linkIndex===0?"START HERE // 1.0":"OPEN GUIDE"}</span><h3>{title}</h3><p>{note}</p><b>READ →</b></a>)}</div></section>)}<section className="guide-tool-cta"><div><span className="kicker">BEFORE THE SHUTTLE</span><h2>Turn the guide into a deployment brief.</h2><p>The planner explains selected risks, creates three retreat triggers and saves the result locally.</p></div><a className="button primary" href="/tools/mission-prep/">OPEN MISSION PREP <span>→</span></a></section><section className="sources"><div><span className="kicker">PROVENANCE</span><h2>Sources & verification</h2><p>Completed guides combine current official material with clearly labeled community strategy. Research drafts are excluded from this index.</p></div><div>{page.sources?.map(source=><a href={source.url} key={source.url}><span>{source.type}</span><b>{source.label}</b><small>Accessed {verifiedAt} ↗</small></a>)}</div></section></div></Shell>;
}

const hubPhases=[
  ["00–02H","LEARN","Finish the tutorial. Practice action points, wounds, reloading, and the route back to extraction."],
  ["02–08H","STABILIZE","Run readable Mars contracts and bank enough food, medicine, ammunition, and gear for three kits."],
  ["08–20H","EXPAND","Improve navigation and supply, collect chips, trade around Earth, and protect campaign variety."],
  ["20H+","SPECIALIZE","Choose story routes, harder objectives, item projects, augmentations, and implants on your terms."],
];

const hubTopics=[
  ["01","FIRST HOUR","After the tutorial","Turn the tutorial kit into a repeatable reserve instead of gambling on a perfect first run.","/guides/after-tutorial/"],
  ["02","PLANNING","Choosing contracts","Judge sides, technology, power per floor, layouts, rewards, and political consequences.","/guides/choosing-contracts/"],
  ["03","COMBAT","Stances & action points","Preserve options, control sight lines, and stop ending turns in positions that cannot be recovered.","/guides/combat-stances/"],
  ["04","SURVIVAL","Wounds & medicine","Stabilize lethal problems first and know when treatment has consumed the reserve needed to leave.","/guides/wounds-medicine/"],
  ["05","ANOMALY","Quasimorphosis explained","Treat the meter as a changing mission condition and prepare a fallback for unfamiliar enemies.","/guides/quasimorphosis/"],
  ["06","EXTRACTION","When to leave","Protect the objective and the route home before optional loot turns into a lost run.","/guides/extraction/"],
  ["07","INVENTORY","Loot priority","Choose the chip, ship material or replacement kit that fixes the next bottleneck.","/guides/loot-priority/"],
  ["08","SHIP","Magnum upgrades","Build for recovery, information or production according to the campaign problem.","/world/magnum-ship/"],
];

const firstHourSteps=[
  ["01","Set campaign speed to 4× and enable fast shuttle arrival, quick transfer, hit chance, enemy HP, and warnings."],
  ["02","Finish the tutorial until action points, stance, inventory, wounds, and extraction no longer require guessing."],
  ["03","Build one cheap kit: two weapons with different ranges and ammunition, food, medicine, and repair supplies."],
  ["04","Choose a short readable contract around Mars; prefer fewer floors and avoid defense or control while learning."],
  ["05","Extract when the objective is secure or the abort rule triggers. Optional loot never outranks the route home."],
  ["06","Bank everything, restock, and repeat until the Magnum holds roughly three replaceable deployment kits."],
];

export function GuidesHubPage({page}:{page:PageEntry}){
  return <Shell><StructuredData page={page}/><div className="page-wrap guides-hub"><Breadcrumbs path={page.path} title={page.title}/>
    <section className="guides-hub-hero"><div><span className="kicker">GUIDES // VERSION {gameVersion}</span><h1>Quasimorph<br/><em>field guides.</em></h1><p>The 1.0 beginner route is the starting point. Continue down this page for the first-hour checklist, campaign phases, contracts, upgrades, loot, and focused system guides.</p></div>
      <aside className="hub-brief"><span>BEGINNER ROUTE // CURRENT</span><b>1.0</b><strong>NEW PLAYER GUIDE</strong><div><small>PROGRESSION</small><p>Tutorial → Mars → Earth → Mid-game</p></div><div><small>CORE LOOP</small><p>Contract → Extract → Restock → Upgrade</p></div><div><small>READ TIME</small><p>8–12 minutes for the essentials</p></div></aside>
    </section><MetaBar status={page.status}/>

    <nav className="guide-tabs" aria-label="Guide sections"><a className="active" href="#beginner-1-0"><span>01</span><b>1.0 Beginner Guide</b><small>Start here</small></a><a href="#contracts"><span>02</span><b>Contracts</b><small>Choose safely</small></a><a href="#combat"><span>03</span><b>Combat</b><small>AP & positioning</small></a><a href="#survival"><span>04</span><b>Survival</b><small>Wounds & anomaly</small></a><a href="#systems"><span>05</span><b>Systems & Story</b><small>Build the campaign</small></a></nav>

    <section className="hub-glance" id="beginner-1-0"><div className="hub-section-head"><span className="kicker">VERSION 1.0 // AT A GLANCE</span><h2>Your first campaign is a logistics problem.</h2><p>Do not chase a perfect clone or rare gun. Build a loop that can absorb a death and still launch the next contract.</p></div><div className="glance-grid"><article><span>LOOP</span><b>Accept → deploy → extract → bank → upgrade</b><p>Progress only becomes permanent after the useful loot reaches the Magnum.</p></article><article><span>RISK</span><b>Clone death removes the carried solution</b><p>Use equipment you can replace and decide the retreat trigger before landing.</p></article><article><span>ROUTE</span><b>Mars for work, Earth for trade</b><p>Use this as a low-friction opening route, then follow your preferred factions and story.</p></article><article><span>OUTCOME</span><b>Three kits and a stable supply chain</b><p>That buffer—not a specific build—is the real milestone for leaving the opening phase.</p></article></div></section>

    <section className="hub-route"><div className="hub-section-head"><span className="kicker">0–20 HOUR ROUTE</span><h2>One campaign, four operating phases.</h2><p>The hour marks are orientation, not gates. Move on when the current phase can reliably fund the next.</p></div><div className="hub-phase-grid">{hubPhases.map((phase,i)=><article key={phase[0]}><span>{phase[0]}</span><b>{String(i+1).padStart(2,"0")} / {phase[1]}</b><p>{phase[2]}</p></article>)}</div></section>

    <section className="hub-first-hour"><div className="hub-section-head"><span className="kicker">YOUR FIRST HOUR</span><h2>Six actions before optimization matters.</h2><p>Follow this once. Afterward, the Magnum loop should be familiar enough to improvise.</p></div><ol>{firstHourSteps.map(step=><li key={step[0]}><b>{step[0]}</b><p>{step[1]}</p></li>)}</ol><div className="inline-rule"><span>COMMUNITY STARTING BUILD</span><p>Percy with Hades Scouts is a forgiving transcript recommendation, not a requirement. The transferable rule is defense or dodge + matching weapon damage + one economy or sustain benefit.</p></div></section>

    <section className="hub-contract-inline" id="contracts"><div className="hub-section-head"><span className="kicker">CONTRACT // GO–NO-GO</span><h2>Do not trust skulls alone.</h2><p>Read the briefing in this order. If one answer is unknown, take replaceable gear or choose another job.</p></div><div className="contract-factors"><article><span>01</span><b>SIDES</b><p>Beneficiary, victim, reputation, credit, and the faction that gains territory.</p></article><article><span>02</span><b>THREAT</b><p>Opponent technology, likely units, damage types, and power per floor.</p></article><article><span>03</span><b>ATTRITION</b><p>Floor count, layout, quasimorphosis, food, medicine, and durability.</p></article><article><span>04</span><b>VALUE</b><p>Objective, facility-specific loot, reward items, faction credit, and travel time.</p></article></div><p className="section-followup">Begin with espionage, theft, elimination, or manageable infiltration. Save defense, control, conquest, and story contracts for a purpose-built kit. <a href="/guides/choosing-contracts/">Read the detailed contract reference →</a></p></section>

    <section className="hub-priorities" id="systems"><div className="hub-section-head"><span className="kicker">EARLY PRIORITIES</span><h2>Build game flow before prestige.</h2></div><div className="priority-grid"><article><span>SHIP UPGRADES</span><ol><li><b>01</b><p><strong>Navigation & monitoring</strong>More contracts, better scanning, clearer choices.</p></li><li><b>02</b><p><strong>Supply & scavengers</strong>Food, medicine, ammunition, and replacement gear.</p></li><li><b>03</b><p><strong>Capsule & hangar</strong>Protect valuable loot and reduce the cost of failure.</p></li></ol></article><article><span>LOOT ORDER</span><ol><li><b>01</b><p><strong>Chips, data, upgrade materials</strong>Anything that unlocks permanent capability.</p></li><li><b>02</b><p><strong>Crates, medical packs, rare parts</strong>Open or bank them according to the current bottleneck.</p></li><li><b>03</b><p><strong>Turrets, drones, spare kits</strong>Take them when a real mission plan needs them.</p></li></ol></article></div></section>

    <section className="hub-library" id="combat"><div className="hub-section-head"><span className="kicker">FOCUSED REFERENCES</span><h2>Continue when a system becomes the bottleneck.</h2><p>The beginner guide is already on this page. These links go deeper into one decision instead of restarting the same introduction.</p></div><div className="hub-topic-grid" id="survival">{hubTopics.map(topic=><a href={topic[4]} key={topic[0]}><span>{topic[0]} / {topic[1]}</span><h3>{topic[2]}</h3><p>{topic[3]}</p><b>OPEN RECORD ↗</b></a>)}</div></section>

    <section className="hub-preflight"><div><span className="kicker">PRE-DEPLOYMENT RULE</span><h2>A contract is not profitable until the loot reaches safety.</h2></div><ul><li>Primary weapon plus a fallback that fails differently</li><li>Compatible ammunition and enough food for every floor</li><li>Medicine for the likely wounds and status effects</li><li>Protection matched to the opponent, not a generic tier list</li><li>A retreat trigger decided before the first door opens</li></ul><a className="button primary" href="/tools/mission-prep/">BUILD A CHECKLIST <span>→</span></a></section>
    <section className="sources"><div><span className="kicker">PROVENANCE</span><h2>Sources & verification</h2><p>The new-player route synthesizes community transcripts supplied by the site owner. Named builds remain recommendations; patch-sensitive claims are checked against current official references where possible.</p></div><div>{page.sources?.map(s=><a href={s.url} key={s.url}><span>{s.type}</span><b>{s.label}</b><small>Accessed {verifiedAt} ↗</small></a>)}</div></section>
  </div></Shell>
}

function BeginnerRoute(){
  const phases=[
    ["00–02H","LEARN","Tutorial, controls, extraction"],
    ["02–08H","STABILIZE","Mars contracts, three spare kits"],
    ["08–20H","EXPAND","Ship upgrades, chips, reputation"],
    ["20H+","SPECIALIZE","Story, implants, hard objectives"],
  ];
  return <section className="beginner-route" aria-labelledby="route-title"><div className="route-heading"><span className="kicker">CAMPAIGN ROUTE</span><h2 id="route-title">From disposable clone to stable operation.</h2><p>Move forward when the current phase funds the next one—not when the clock says so.</p></div><div className="phase-grid">{phases.map((phase,i)=><div key={phase[0]}><span>{phase[0]}</span><b>{String(i+1).padStart(2,"0")} / {phase[1]}</b><p>{phase[2]}</p></div>)}</div><div className="loop-strip"><b>CONTRACT</b><i>→</i><b>EXTRACT</b><i>→</i><b>RESTOCK</b><i>→</i><b>UPGRADE</b><i>↺</i></div></section>
}

const officialMedia = [
  { src: "/images/official/augmentation.webp", alt: "Quasimorph augmentation and implant interface", label: "AUGMENTATION // LOADOUT" },
  { src: "/images/official/mars-contract.webp", alt: "A Quasimorph operative beginning a contract in a hostile industrial zone", label: "CONTRACT // HOSTILE ZONE" },
  { src: "/images/official/combat.webp", alt: "Turn-based combat around a heavy vehicle in Quasimorph", label: "TACTICAL COMBAT // LIVE" },
];

export function HomePage(){
  return <Shell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite","@id":"https://quasimorphwiki.com/#website",name:"Quasimorph Wiki",url:"https://quasimorphwiki.com/",description:"Task-focused Quasimorph 1.0 guides, local planning tools and source-visible update coverage.",potentialAction:{"@type":"SearchAction",target:"https://quasimorphwiki.com/search/?q={search_term_string}","query-input":"required name=search_term_string"}})}}/>
    <section className="home-hero">
      <div className="hero-copy">
        <div className="hero-status"><span>QUASIMORPH // VERSION 1.0</span><i>DATA CHANNEL ONLINE</i></div>
        <h1>Version 1.0.<br/><em>Start here.</em></h1>
        <p>A task-first field archive for learning the first campaign, choosing safer contracts, protecting extracted value and checking verified release information.</p>
        <div className="hero-actions"><a className="button primary" href="/guides/">1.0 NEW PLAYER GUIDE <span>↗</span></a><a className="button" href="/tools/mission-prep/">PLAN A CONTRACT <span>→</span></a></div>
        <div className="trust-row"><span><b>01</b>OFFICIAL SOURCES FIRST</span><span><b>02</b>VERSION-STAMPED DATA</span><span><b>03</b>NO LIVE AI</span></div>
      </div>
      <figure className="official-hero">
        <img src="/images/official/tactical-contract.webp" alt="An official Quasimorph gameplay screenshot showing a tactical contract in progress" width="1280" height="720" fetchPriority="high"/>
        <figcaption><span>OFFICIAL GAME MEDIA</span><b>TACTICAL CONTRACT // LIVE</b><small>Source: Quasimorph Steam Store</small></figcaption>
      </figure>
    </section>
    <div className="home-wrap">
      <MetaBar status="Partial coverage"/>
      <section className="home-search"><div><span className="kicker">FIND THE NEXT ANSWER</span><h2>Search the field archive.</h2><p>Completed guides and tools only. Research drafts are excluded.</p></div><SearchResults documents={searchDocuments} embedded/></section>
      <section className="help-now"><div className="section-head"><span className="kicker">I NEED HELP WITH…</span><h2>Start from the problem.</h2></div><div className="help-grid">{[["01","MY FIRST CAMPAIGN","/guides/","Settings, tutorial, first contracts and a stable three-kit reserve."],["02","A DANGEROUS CONTRACT","/tools/mission-prep/","Explain the risk, supplies and retreat triggers before launch."],["03","SURVIVING THE FLOOR","/guides/room-clearing/","Action points, doors, wounds and the extraction decision."],["04","SHIP PROGRESSION","/world/magnum-ship/","Choose upgrades and loot by the bottleneck they remove."]].map(([n,title,href,copy])=><a href={href} key={n}><span>{n}</span><b>{title}</b><p>{copy}</p><em>OPEN ROUTE →</em></a>)}</div></section>
      <section className="quick-grid">
        <a href="/guides/getting-started/" className="feature-card lead"><span>01 // START HERE</span><h2>Beginner<br/>field manual</h2><p>A survival-first route from the tutorial to a stable contract loop.</p><b>OPEN GUIDE ↗</b></a>
        <a href="/tools/mission-prep/" className="feature-card"><span>02 // LOCAL TOOL</span><div className="mini-terminal"><i></i><i></i><i></i><strong>MISSION BRIEF</strong><p>THREAT ██████░░</p><p>SUPPLY ███████░</p></div><h3>Mission Prep Planner</h3><p>Turn eight mission inputs into a conservative deployment checklist.</p><b>BUILD A PLAN →</b></a>
        <a href="/achievements/" className="feature-card"><span>03 // LOCAL TRACKER</span><div className="bars"><i style={{width:"84%"}}></i><i style={{width:"61%"}}></i><i style={{width:"42%"}}></i><i style={{width:"73%"}}></i></div><h3>82 Achievements</h3><p>Search the verified Steam list and save personal progress in this browser.</p><b>OPEN TRACKER →</b></a>
        <a href="/updates/roadmap/" className="feature-card update-card"><span>04 // RELEASE INTEL</span><strong>1.0</strong><h3>Released.<br/>What comes next.</h3><p>Official roadmap scope separated into shipped, planned and unknown.</p><b>READ ROADMAP →</b></a>
      </section>
      <section className="version-snapshot"><div><span>VERSION SNAPSHOT</span><b>1.0</b><p>Released July 31, 2026</p></div><div><span>OFFICIAL SCOPE</span><b>82</b><p>Steam achievements tracked locally</p></div><div><span>SITE BOUNDARY</span><b>0</b><p>Empty databases exposed in navigation</p></div><a href="/updates/patch-1-0/">READ THE VERIFIED RELEASE BRIEF →</a></section>
      <section className="official-media">
        <div className="section-head"><span className="kicker">OFFICIAL GAME MEDIA</span><h2>Inside the corporate meat grinder.</h2><a href="https://store.steampowered.com/app/2059170/Quasimorph/">VIEW ON STEAM ↗</a></div>
        <div className="media-grid">{officialMedia.map((item)=><figure key={item.src}><img src={item.src} alt={item.alt} width="1280" height="720" loading="lazy"/><figcaption><span>{item.label}</span><small>Official screenshot © Magnum Scriptum / HypeTrain Digital</small></figcaption></figure>)}</div>
      </section>
      <details className="principles editorial-details"><summary><span className="kicker">EDITORIAL PROTOCOL</span><b>How claims, versions and corrections are handled</b><em>OPEN +</em></summary><div className="protocol-list"><div><i className="green"></i><span><b>OFFICIAL FACT</b><small>Steam, developer notes, or official reference</small></span></div><div><i className="amber"></i><span><b>COMMUNITY TIP</b><small>Attributed, useful, never promoted to fact</small></span></div><div><i className="red"></i><span><b>VERIFICATION PENDING</b><small>Unknown means unknown—draft pages remain out of search and sitemap</small></span></div></div></details>
      <section className="home-guides"><div className="section-head"><span className="kicker">POPULAR LOOKUPS</span><h2>Answers built for the next decision.</h2><a href="/guides/">VIEW ALL GUIDES →</a></div><div className="guide-list">{[["What to do after the tutorial","/guides/after-tutorial/","BEGINNER"],["When to stop looting and extract","/guides/extraction/","SURVIVAL"],["Choose the next Magnum upgrade","/world/magnum-ship/","SHIP"],["Keyboard controls and 1.0 changes","/controls/keyboard/","CONTROLS"]].map((g,i)=><a key={g[1]} href={g[1]}><span>{String(i+1).padStart(2,"0")}</span><b>{g[0]}</b><em>{g[2]}</em><i>↗</i></a>)}</div></section>
    </div>
  </Shell>
}
