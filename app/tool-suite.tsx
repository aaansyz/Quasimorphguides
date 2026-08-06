"use client";

import { useMemo, useState } from "react";

const Field = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <label className="field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>
);

export function MissionPlanner() {
  const [stage, setStage] = useState("Beginner");
  const [mission, setMission] = useState("Elimination");
  const [faction, setFaction] = useState("Unknown / mixed");
  const [danger, setDanger] = useState("Moderate");
  const [floors, setFloors] = useState("2");
  const [quasi, setQuasi] = useState("Possible");
  const [style, setStyle] = useState("Ranged");
  const [valuable, setValuable] = useState("No");
  const plan = useMemo(() => {
    const long = Number(floors) >= 3 || danger === "High" || danger === "Extreme";
    const early = stage === "Beginner" || stage === "Early Game";
    return {
      primary: faction === "Unknown / mixed" ? "Use the damage type your current reliable weapon supports; inspect enemies before committing." : `Prepare for ${faction}, but verify visible resistances in the current run.`,
      backup: style === "Melee" ? "Carry a ranged option that uses a separate supply line." : "Carry a close-range or alternate-damage option that does not share the same failure mode.",
      medicine: long ? "Bring a deeper treatment reserve than a short contract and protect a portion for the return route." : "Carry treatment for immediate stabilization and keep one use in reserve for extraction.",
      food: `${long ? "Multi-floor plan: increase food and ammunition margin." : "Short plan: still reserve food and ammunition for a delayed exit."} No fixed counts are asserted.`,
      quasi: quasi === "None expected" ? "Low declared risk—continue monitoring the live meter." : "Plan an early exit trigger and a second damage answer; the risk can change during the contract.",
      exit: valuable === "Yes" ? "Once the high-value objective is secured, optional fights and loot must justify risking the item." : early ? "Leave when medicine, ammunition, mobility, or a safe route is no longer comfortably recoverable." : "Set a hard reserve for the route back and extract when it is reached.",
      objective: mission === "Defense" ? "Identify fallback positions and protect access to the exit before the defense begins." : mission === "Espionage / Robbery" ? "Prioritize the objective path and carry capacity; avoid turning retrieval into an unnecessary clear." : "Keep the objective, floor transition, and extraction route distinct in your plan.",
    };
  }, [stage, mission, faction, danger, floors, quasi, style, valuable]);
  return <div className="tool-shell">
    <div className="tool-grid">
      <div className="control-panel" aria-label="Mission parameters">
        <Field label="Player stage" value={stage} onChange={setStage} options={["Beginner","Early Game","Midgame","Late Game"]}/>
        <Field label="Mission type" value={mission} onChange={setMission} options={["Elimination","Defense","Espionage / Robbery","Escort","Sabotage","Story mission"]}/>
        <Field label="Target faction" value={faction} onChange={setFaction} options={["Unknown / mixed","Corporate security","Civil Resistance","Tezctlan","Quasimorph presence"]}/>
        <Field label="Danger" value={danger} onChange={setDanger} options={["Low","Moderate","High","Extreme"]}/>
        <Field label="Floors" value={floors} onChange={setFloors} options={["1","2","3","4","5+"]}/>
        <Field label="Quasimorphosis" value={quasi} onChange={setQuasi} options={["None expected","Possible","Likely"]}/>
        <Field label="Combat style" value={style} onChange={setStyle} options={["Ranged","Melee","Hybrid","Stealth / avoidance"]}/>
        <Field label="High-value item" value={valuable} onChange={setValuable} options={["No","Yes"]}/>
      </div>
      <div className="brief" aria-live="polite"><div className="brief-head"><span>PRE-DEPLOYMENT BRIEF</span><b>{danger.toUpperCase()}</b></div>
        <Result label="Primary damage" text={plan.primary}/><Result label="Backup" text={plan.backup}/><Result label="Medical" text={plan.medicine}/><Result label="Food & ammo" text={plan.food}/><Result label="Quasimorphosis" text={plan.quasi}/><Result label="Objective" text={plan.objective}/><Result label="Extraction rule" text={plan.exit}/>
        <div className="checklist"><b>FINAL CHECK</b>{["Primary weapon ready","Fallback ready","Medicine reserved","Food & ammunition margin","Exit threshold chosen","Objective item space available"].map((x) => <label key={x}><input type="checkbox"/> {x}</label>)}</div>
      </div>
    </div><p className="local-note">▣ Calculated locally. No selections leave your browser.</p>
  </div>;
}

function Result({label,text}:{label:string;text:string}) { return <div className="result"><span>{label}</span><p>{text}</p></div> }

const damageRows = [
  { damage: "Any single type", enemy: "Unknown target", faction: "Any", resistance: "Not inspected", rec: "CAUTION", version: "1.0", source: "Official Wiki + in-game UI", date: "2026-08-06", note: "Do not deploy with only one answer to an unknown resistance profile." },
  { damage: "Burn", enemy: "Burn-immune target", faction: "Any", resistance: "Burn immunity", rec: "AVOID", version: "1.0", source: "Official 1.0 notes", date: "2026-08-06", note: "A current official fix note explicitly recognizes burn immunity." },
  { damage: "Alternate type", enemy: "Quasimorph armor", faction: "Quasimorph", resistance: "One-type immunity may occur", rec: "RECOMMENDED", version: "1.0", source: "Official 1.0 notes", date: "2026-08-06", note: "Official notes say updated Quasimorph armor can have full immunity to one damage type." },
  { damage: "Explosion", enemy: "Clustered hostiles", faction: "Any", resistance: "Context dependent", rec: "CONDITIONAL", version: "1.0", source: "Official 1.0 notes", date: "2026-08-06", note: "Check friendly position, cover, blast area, and the current hit preview." },
  { damage: "Primary + fallback", enemy: "Mixed floor", faction: "Mixed", resistance: "Mixed / unknown", rec: "RECOMMENDED", version: "1.0", source: "Editorial safety rule", date: "2026-08-06", note: "General mission-safety guidance; not a claim about a specific enemy statistic." },
];

export function DamageLookup() {
  const [query,setQuery]=useState(""); const [rec,setRec]=useState("ALL");
  const filtered=damageRows.filter((r)=>(rec==="ALL"||r.rec===rec)&&Object.values(r).join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div className="tool-shell"><div className="filterbar"><label>Search records<input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="damage, enemy, faction…"/></label><label>Recommendation<select value={rec} onChange={(e)=>setRec(e.target.value)}>{["ALL","RECOMMENDED","CONDITIONAL","CAUTION","AVOID"].map(x=><option key={x}>{x}</option>)}</select></label><span>{filtered.length} / {damageRows.length} records</span></div>
    <div className="table-wrap"><table><thead><tr><th>Damage / approach</th><th>Enemy</th><th>Faction</th><th>Resistance</th><th>Signal</th><th>Version</th><th>Source</th><th>Verified</th></tr></thead><tbody>{filtered.map((r)=><tr key={r.damage+r.enemy}><td><b>{r.damage}</b><small>{r.note}</small></td><td>{r.enemy}</td><td>{r.faction}</td><td>{r.resistance}</td><td><em className={`signal ${r.rec.toLowerCase()}`}>{r.rec}</em></td><td>{r.version}</td><td>{r.source}</td><td>{r.date}</td></tr>)}</tbody></table></div>
    <div className="callout warning"><b>Coverage boundary</b><p>This is not a weapon-stat dump. Exact values and named enemy matchups will be added only after live 1.0 verification.</p></div></div>;
}

const routes = [
  ["Civil Resistance","Confirmed 1.0 storyline","Ending branches: verification pending"],
  ["Tezctlan","Confirmed 1.0 storyline","Ending branches: verification pending"],
  ["Xiomara","Confirmed 1.0 storyline","Ending branches: verification pending"],
  ["AnCom","Confirmed 1.0 storyline","Secret Data can route into this storyline; exact 1.0 consequences pending"],
  ["RealWare","Confirmed 1.0 storyline","Secret Data can route into this storyline; exact 1.0 consequences pending"],
];

export function StoryPlanner() {
  const [spoilers,setSpoilers]=useState(false); const [selected,setSelected]=useState("AnCom");
  return <div className="tool-shell"><div className="story-controls"><div><span className="kicker">DISPLAY MODE</span><h2>{spoilers?"Full spoilers":"Spoiler-light"}</h2></div><button className="toggle" aria-pressed={spoilers} onClick={()=>setSpoilers(!spoilers)}><span></span>{spoilers?"Hide details":"Reveal details"}</button></div>
    <div className="decision-grid"><div className="route-list" role="list">{routes.map((r)=><button key={r[0]} className={selected===r[0]?"active":""} onClick={()=>setSelected(r[0])}><span>ROUTE</span><b>{r[0]}</b><small>{r[1]}</small></button>)}</div><div className="route-detail"><span className="kicker">SELECTED ROUTE</span><h2>{selected}</h2><p>{routes.find(r=>r[0]===selected)?.[2]}</p><div className="callout fact"><b>AnCom’s Secret Data</b><p>The official Wiki identifies the item as a major quest trigger. Choose the faction whose route you intend to explore; this launch tool does not fabricate a reward ranking.</p></div>{spoilers?<div className="spoiler-box"><b>FULL-SPOILER DATA STATUS</b><p>Exact mission triggers, locked rewards, faction losses, and the nine ending conditions are still being verified against the live 1.0 release.</p></div>:<div className="spoiler-box masked"><b>SPOILERS MASKED</b><p>Turn on Full spoilers to see the current verification status.</p></div>}</div></div>
    <h2 className="ending-title">Nine officially confirmed endings</h2><div className="ending-grid">{Array.from({length:9},(_,i)=><div key={i}><span>ENDING {String(i+1).padStart(2,"0")}</span><b>{spoilers?"Verification pending":"Classified"}</b><small>{spoilers?"Exact condition not guessed":"Enable spoilers for status"}</small></div>)}</div><p className="local-note">▣ All toggles are local. Nothing is saved or transmitted.</p></div>;
}
