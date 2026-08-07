/* eslint-disable @next/next/no-img-element -- screenshots are pre-optimized local WebP assets */
import { achievements } from "./achievement-data";
import { DamageLookup, MissionPlanner, StoryPlanner } from "./tool-suite";
import { gameVersion, nav, PageEntry, verifiedAt } from "./site-data";

export function Header() {
  return <><div className="unofficial"><span>UNOFFICIAL COMMUNITY WIKI</span></div><header className="site-header"><a href="/" className="brand" aria-label="Quasimorph Wiki home"><span className="brand-mark">Q</span><span><b>QUASIMORPH</b><small>WIKI // FIELD ARCHIVE</small></span></a><nav aria-label="Main navigation">{nav.map((item)=><a key={item.href} href={item.href}>{item.label}</a>)}</nav><details className="mobile-nav"><summary aria-label="Open navigation">MENU</summary><div>{nav.map((item)=><a key={item.href} href={item.href}>{item.label}</a>)}</div></details></header></>;
}

export function Footer() {
  return <footer><div className="footer-grid"><div><div className="brand footer-brand"><span className="brand-mark">Q</span><span><b>QUASIMORPH WIKI</b><small>INDEPENDENT FIELD ARCHIVE</small></span></div><p>QuasimorphWiki.com is an unofficial fan-made resource and is not affiliated with or endorsed by Magnum Scriptum or HypeTrain Digital.</p></div><div><b>REFERENCE</b><a href="/guides/">Guides</a><a href="/tools/">Tools</a><a href="/updates/">Updates</a><a href="https://store.steampowered.com/app/2059170/Quasimorph/">Steam Store ↗</a></div><div><b>PROJECT</b><a href="/about/">About</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a></div></div><div className="footer-bottom"><span>VERSION TRACKED // {gameVersion}</span><span>LAST SITE REVIEW // {verifiedAt}</span><span>NO REAL-TIME AI // STATIC + LOCAL TOOLS</span></div></footer>;
}

export function Shell({children}:{children:React.ReactNode}) { return <><Header/><main>{children}</main><Footer/></> }

export function MetaBar({status="Partial coverage"}:{status?:PageEntry["status"]}) { return <div className="meta-bar"><span><i className="dot"></i> GAME VERSION <b>{gameVersion}</b></span><span>LAST VERIFIED <b>{verifiedAt}</b></span><span>DATA STATUS <b>{status}</b></span></div> }

function Breadcrumbs({path,title}:{path:string;title:string}) {
  const parts=path.split("/").filter(Boolean);
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">HOME</a>{parts.map((part,i)=>{const href=`/${parts.slice(0,i+1).join("/")}/`; const last=i===parts.length-1; return <span key={href}>/ {last?<b>{title.toUpperCase()}</b>:<a href={href}>{part.toUpperCase()}</a>}</span>})}</nav>;
}

function StructuredData({page}:{page:PageEntry}) {
  const crumbs=page.path.split("/").filter(Boolean).map((p,i,a)=>({"@type":"ListItem",position:i+2,name:i===a.length-1?page.title:p.replaceAll("-"," "),item:`https://quasimorphwiki.com/${a.slice(0,i+1).join("/")}/`}));
  const graph:Record<string,unknown>[]=[{"@type":"WebPage","@id":`https://quasimorphwiki.com${page.path}`,name:page.title,description:page.description,dateModified:verifiedAt,isPartOf:{"@id":"https://quasimorphwiki.com/#website"}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://quasimorphwiki.com/"},...crumbs]}];
  if(page.faqs?.length) graph.push({"@type":"FAQPage",mainEntity:page.faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))});
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@graph":graph})}}/>;
}

export function ArticlePage({page}:{page:PageEntry}) {
  if(page.path==="/guides/") return <GuidesHubPage page={page}/>;
  return <Shell><StructuredData page={page}/><div className="page-wrap"><Breadcrumbs path={page.path} title={page.title}/><section className="article-hero"><div><span className="kicker">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.description}</p></div><div className="scope-card"><span>ARCHIVE RECORD</span><b>{page.status}</b><small>Scope: Quasimorph {gameVersion}<br/>Reviewed: {verifiedAt}</small></div></section><MetaBar status={page.status}/>
    {page.spoiler&&<div className="callout warning"><b>SPOILER CONTROL</b><p>This page discusses story routes. Exact outcomes are limited or masked where noted.</p></div>}
    <div className="answer"><span>DIRECT ANSWER</span><p>{page.answer}</p></div>
    {page.sourceNote&&<aside className="transcript-note"><span>EDITORIAL NOTE // COMMUNITY TRANSCRIPTS</span><p>{page.sourceNote}</p></aside>}
    {page.path==="/guides/getting-started/"&&<BeginnerRoute/>}
    {page.tool&&<div className="tool-mount">{page.tool==="mission"?<MissionPlanner/>:page.tool==="damage"?<DamageLookup/>:<StoryPlanner/>}</div>}
    {page.sections.map((section,i)=><section className="content-section" key={section.title}><div className="section-index">{String(i+1).padStart(2,"0")}</div><div><h2>{section.title}</h2><p>{section.body}</p>{section.bullets&&<ul>{section.bullets.map(x=><li key={x}>{x}</li>)}</ul>}</div></section>)}
    {page.path==="/achievements/"&&<AchievementTable/>}
    {page.links&&page.links.length>0&&<section className="related"><span className="kicker">RELATED ROUTES</span><div className="card-grid">{page.links.map(link=><a href={link.href} key={link.href} className="link-card"><span>OPEN RECORD ↗</span><h3>{link.label}</h3><p>{link.note}</p></a>)}</div></section>}
    {page.faqs&&<section className="faq"><span className="kicker">FIELD QUESTIONS</span><h2>Frequently asked questions</h2>{page.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>}
    <AdSlot/>
    <section className="sources"><div><span className="kicker">PROVENANCE</span><h2>Sources & verification</h2><p>Important claims are separated from editorial safety guidance. Patch-sensitive details are omitted when current evidence is incomplete.</p></div><div>{page.sources?.map(s=><a href={s.url} key={s.url}><span>{s.type}</span><b>{s.label}</b><small>Accessed {verifiedAt} ↗</small></a>)||<p className="pending">No external factual claims on this page.</p>}</div></section>
  </div></Shell>;
}

const hubPhases=[
  ["00–02H","LEARN","Finish the tutorial. Practice action points, wounds, reloading, and the route back to extraction."],
  ["02–08H","STABILIZE","Run readable Mars contracts and bank enough food, medicine, ammunition, and gear for three kits."],
  ["08–20H","EXPAND","Improve navigation and supply, collect chips, trade around Earth, and protect campaign variety."],
  ["20H+","SPECIALIZE","Choose story routes, harder objectives, item projects, augmentations, and implants on your terms."],
];

const hubTopics=[
  ["01","START HERE","Complete beginner field manual","Settings, first contracts, loadouts, Mars, factions, trade, loot, and the transition to mid-game.","/guides/getting-started/"],
  ["02","FIRST HOUR","After the tutorial","Turn the tutorial kit into a repeatable reserve instead of gambling on a perfect first run.","/guides/after-tutorial/"],
  ["03","PLANNING","Choosing contracts","Judge sides, technology, power per floor, layouts, rewards, and political consequences.","/guides/choosing-contracts/"],
  ["04","COMBAT","Stances & action points","Preserve options, control sight lines, and stop ending turns in positions that cannot be recovered.","/guides/combat-stances/"],
  ["05","SURVIVAL","Wounds & medicine","Stabilize lethal problems first and know when treatment has consumed the reserve needed to leave.","/guides/wounds-medicine/"],
  ["06","ANOMALY","Quasimorphosis explained","Treat the meter as a changing mission condition and prepare a fallback for unfamiliar enemies.","/guides/quasimorphosis/"],
  ["07","STORY","AnCom’s Secret Data","Understand the route decision before giving away a campaign-defining quest item.","/guides/secret-data/"],
];

function GuidesHubPage({page}:{page:PageEntry}){
  return <Shell><StructuredData page={page}/><div className="page-wrap guides-hub"><Breadcrumbs path={page.path} title={page.title}/>
    <section className="guides-hub-hero"><div><span className="kicker">OPERATIONS MANUAL // VERSION {gameVersion}</span><h1>Learn the loop.<br/><em>Survive the system.</em></h1><p>A practical route from your first disposable clone to a stable campaign—plus focused guides for every decision that usually ends a new run.</p><div className="hero-actions"><a className="button primary" href="/guides/getting-started/">START THE FULL GUIDE <span>↗</span></a><a className="button" href="/tools/mission-prep/">PREP A MISSION <span>→</span></a></div></div>
      <aside className="hub-brief"><span>FIELD ARCHIVE // ONLINE</span><b>11</b><strong>BEGINNER CHAPTERS</strong><div><small>ROUTE</small><p>Tutorial → Mars → Earth → Mid-game</p></div><div><small>CORE LOOP</small><p>Contract → Extract → Restock → Upgrade</p></div><a href="/guides/getting-started/">OPEN 0–20H MANUAL ↗</a></aside>
    </section><MetaBar status={page.status}/>

    <section className="hub-route"><div className="hub-section-head"><span className="kicker">0–20 HOUR ROUTE</span><h2>One campaign, four operating phases.</h2><p>The hour marks are orientation, not gates. Move on when the current phase can reliably fund the next.</p></div><div className="hub-phase-grid">{hubPhases.map((phase,i)=><article key={phase[0]}><span>{phase[0]}</span><b>{String(i+1).padStart(2,"0")} / {phase[1]}</b><p>{phase[2]}</p></article>)}</div></section>

    <section className="hub-core"><a className="hub-manual-card" href="/guides/getting-started/"><span>THE COMPLETE BEGINNER FIELD MANUAL</span><h2>Everything the first campaign fails to explain.</h2><p>Eleven detailed chapters distilled from the supplied 1.0 video transcripts, rewritten as a sequence you can actually follow.</p><div className="hub-tags"><i>SETTINGS</i><i>LOADOUT</i><i>MARS</i><i>FACTIONS</i><i>SHIP</i><i>LOOT</i><i>TRADE</i></div><b>READ THE FULL GUIDE ↗</b></a>
      <div className="hub-contract-card"><span>CONTRACT // GO–NO-GO</span><h3>Do not trust skulls alone.</h3><ol><li><b>SIDES</b><small>Beneficiary, victim, and long-term faction cost</small></li><li><b>THREAT</b><small>Technology, units, damage types, power per floor</small></li><li><b>ATTRITION</b><small>Floors, layout, quasimorphosis, food, durability</small></li><li><b>VALUE</b><small>Objective, facility loot, reward, credit, travel time</small></li></ol><a href="/guides/choosing-contracts/">OPEN CONTRACT GUIDE →</a></div>
    </section>

    <section className="hub-priorities"><div className="hub-section-head"><span className="kicker">EARLY PRIORITIES</span><h2>Build game flow before prestige.</h2></div><div className="priority-grid"><article><span>SHIP UPGRADES</span><ol><li><b>01</b><p><strong>Navigation & monitoring</strong>More contracts, better scanning, clearer choices.</p></li><li><b>02</b><p><strong>Supply & scavengers</strong>Food, medicine, ammunition, and replacement gear.</p></li><li><b>03</b><p><strong>Capsule & hangar</strong>Protect valuable loot and reduce the cost of failure.</p></li></ol></article><article><span>LOOT ORDER</span><ol><li><b>01</b><p><strong>Chips, data, upgrade materials</strong>Anything that unlocks permanent capability.</p></li><li><b>02</b><p><strong>Crates, medical packs, rare parts</strong>Open or bank them according to the current bottleneck.</p></li><li><b>03</b><p><strong>Turrets, drones, spare kits</strong>Take them when a real mission plan needs them.</p></li></ol></article></div></section>

    <section className="hub-library"><div className="hub-section-head"><span className="kicker">FIELD GUIDE LIBRARY</span><h2>Go directly to the decision in front of you.</h2><p>Start with the manual, then use focused records when one system becomes the current bottleneck.</p></div><div className="hub-topic-grid">{hubTopics.map(topic=><a href={topic[4]} key={topic[0]}><span>{topic[0]} / {topic[1]}</span><h3>{topic[2]}</h3><p>{topic[3]}</p><b>OPEN RECORD ↗</b></a>)}</div></section>

    <section className="hub-preflight"><div><span className="kicker">PRE-DEPLOYMENT RULE</span><h2>A contract is not profitable until the loot reaches safety.</h2></div><ul><li>Primary weapon plus a fallback that fails differently</li><li>Compatible ammunition and enough food for every floor</li><li>Medicine for the likely wounds and status effects</li><li>Protection matched to the opponent, not a generic tier list</li><li>A retreat trigger decided before the first door opens</li></ul><a className="button primary" href="/tools/mission-prep/">BUILD A CHECKLIST <span>→</span></a></section>
    <AdSlot/>
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

function AchievementTable(){return <section className="achievement-section"><div className="table-summary"><div><span>VERIFIED COUNT</span><b>{achievements.length}</b></div><p>Names, public descriptions, and snapshot unlock rates from Steam. Hidden descriptions remain labeled, not guessed.</p></div><div className="table-wrap"><table><thead><tr><th>#</th><th>Achievement</th><th>Steam description</th><th>Global unlock</th></tr></thead><tbody>{achievements.map((a,i)=><tr key={a[0]}><td>{String(i+1).padStart(2,"0")}</td><td><b>{a[0]}</b></td><td>{a[1]}</td><td><em className="signal conditional">{a[2]}</em></td></tr>)}</tbody></table></div></section>}

export function AdSlot(){return <aside className="ad-slot" aria-label="Reserved advertisement area"><span>ADVERTISEMENT // RESERVED</span><p>No ad is loaded in this launch build.</p></aside>}

const officialMedia = [
  { src: "/images/official/augmentation.webp", alt: "Quasimorph augmentation and implant interface", label: "AUGMENTATION // LOADOUT" },
  { src: "/images/official/mars-contract.webp", alt: "A Quasimorph operative beginning a contract in a hostile industrial zone", label: "CONTRACT // HOSTILE ZONE" },
  { src: "/images/official/combat.webp", alt: "Turn-based combat around a heavy vehicle in Quasimorph", label: "TACTICAL COMBAT // LIVE" },
];

export function HomePage(){
  return <Shell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite","@id":"https://quasimorphwiki.com/#website",name:"Quasimorph Wiki",url:"https://quasimorphwiki.com/",description:"Unofficial Quasimorph 1.0 guides, tools, builds, and verified data."})}}/>
    <section className="home-hero">
      <div className="hero-copy">
        <div className="hero-status"><span>QUASIMORPH // VERSION 1.0</span><i>DATA CHANNEL ONLINE</i></div>
        <h1>Survive the contract.<br/><em>Keep the data.</em></h1>
        <p>Quasimorph 1.0 guides, builds, browser-local tools, and verified data for mercenaries who prefer evidence over guesswork.</p>
        <div className="hero-actions"><a className="button primary" href="/guides/getting-started/">BEGINNER GUIDE <span>↗</span></a><a className="button" href="/tools/mission-prep/">MISSION PREP <span>→</span></a></div>
        <div className="trust-row"><span><b>01</b>OFFICIAL SOURCES FIRST</span><span><b>02</b>VERSION-STAMPED DATA</span><span><b>03</b>NO LIVE AI</span></div>
      </div>
      <figure className="official-hero">
        <img src="/images/official/tactical-contract.webp" alt="An official Quasimorph gameplay screenshot showing a tactical contract in progress" width="1280" height="720" fetchPriority="high"/>
        <figcaption><span>OFFICIAL GAME MEDIA</span><b>TACTICAL CONTRACT // LIVE</b><small>Source: Quasimorph Steam Store</small></figcaption>
      </figure>
    </section>
    <div className="home-wrap">
      <MetaBar status="Partial coverage"/>
      <section className="quick-grid">
        <a href="/guides/getting-started/" className="feature-card lead"><span>01 // START HERE</span><h2>Beginner<br/>field manual</h2><p>A survival-first route from the tutorial to a stable contract loop.</p><b>OPEN GUIDE ↗</b></a>
        <a href="/tools/mission-prep/" className="feature-card"><span>02 // LOCAL TOOL</span><div className="mini-terminal"><i></i><i></i><i></i><strong>MISSION BRIEF</strong><p>THREAT ██████░░</p><p>SUPPLY ███████░</p></div><h3>Mission Prep Planner</h3><p>Turn eight mission inputs into a conservative deployment checklist.</p><b>BUILD A PLAN →</b></a>
        <a href="/tools/damage-resistance/" className="feature-card"><span>03 // VERIFIED DATA</span><div className="bars"><i style={{width:"84%"}}></i><i style={{width:"61%"}}></i><i style={{width:"42%"}}></i><i style={{width:"73%"}}></i></div><h3>Damage Lookup</h3><p>Filter what is verified. See exactly where coverage stops.</p><b>QUERY DATA →</b></a>
        <a href="/updates/patch-1-0/" className="feature-card update-card"><span>04 // RELEASE INTEL</span><strong>1.0</strong><h3>Five storylines.<br/>Nine endings.</h3><p>Official release scope, separated from community interpretation.</p><b>READ UPDATE →</b></a>
      </section>
      <section className="official-media">
        <div className="section-head"><span className="kicker">OFFICIAL GAME MEDIA</span><h2>Inside the corporate meat grinder.</h2><a href="https://store.steampowered.com/app/2059170/Quasimorph/">VIEW ON STEAM ↗</a></div>
        <div className="media-grid">{officialMedia.map((item)=><figure key={item.src}><img src={item.src} alt={item.alt} width="1280" height="720" loading="lazy"/><figcaption><span>{item.label}</span><small>Official screenshot © Magnum Scriptum / HypeTrain Digital</small></figcaption></figure>)}</div>
      </section>
      <section className="principles"><div><span className="kicker">EDITORIAL PROTOCOL</span><h2>Every claim has a status.</h2></div><div className="protocol-list"><div><i className="green"></i><span><b>OFFICIAL FACT</b><small>Steam, developer notes, or official reference</small></span></div><div><i className="amber"></i><span><b>COMMUNITY TIP</b><small>Attributed, useful, never promoted to fact</small></span></div><div><i className="red"></i><span><b>VERIFICATION PENDING</b><small>Unknown means unknown—no invented details</small></span></div></div></section>
      <section className="home-guides"><div className="section-head"><span className="kicker">LATEST FIELD GUIDES</span><h2>Answers built for the next decision.</h2><a href="/guides/">VIEW ALL GUIDES →</a></div><div className="guide-list">{[["What to do after the tutorial","/guides/after-tutorial/","BEGINNER"],["Choosing contracts without losing the run","/guides/choosing-contracts/","PLANNING"],["Quasimorphosis, explained safely","/guides/quasimorphosis/","MECHANICS"],["Who gets AnCom’s Secret Data?","/guides/secret-data/","STORY"]].map((g,i)=><a key={g[1]} href={g[1]}><span>{String(i+1).padStart(2,"0")}</span><b>{g[0]}</b><em>{g[2]}</em><i>↗</i></a>)}</div></section>
      <AdSlot/>
    </div>
  </Shell>
}
