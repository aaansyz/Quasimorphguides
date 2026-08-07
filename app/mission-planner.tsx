"use client";
/* eslint-disable react-hooks/set-state-in-effect -- hydration intentionally restores a URL or browser-local plan */

import { useEffect, useMemo, useRef, useState } from "react";

const defaults = { stage:"Beginner", mission:"Elimination", faction:"Unknown / mixed", danger:"Moderate", floors:"2", quasi:"Possible", style:"Ranged", valuable:"No", travel:"Regional", weight:"Comfortable", supplies:"Stable", retreat1:"Severe untreated wound", retreat2:"Primary and fallback both compromised", retreat3:"Extraction reserve is consumed" };
type PlanForm = typeof defaults;

function Field({ label, value, onChange, options }: { label:string; value:string; onChange:(value:string)=>void; options:string[] }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(event)=>onChange(event.target.value)}>{options.map((option)=><option key={option}>{option}</option>)}</select></label>;
}

function Result({label,text}:{label:string;text:string}) { return <div className="result"><span>{label}</span><p>{text}</p></div>; }

export function MissionPlanner() {
  const [form, setForm] = useState<PlanForm>(defaults);
  const [notice, setNotice] = useState("NOT SAVED");
  const started=useRef(false);
  // A shared URL takes precedence over the browser-local saved plan.
  useEffect(() => {
    const encoded = new URLSearchParams(location.search).get("plan");
    if (encoded) { try { setForm({ ...defaults, ...JSON.parse(atob(encoded)) }); setNotice("SHARED PLAN LOADED"); return; } catch { setNotice("SHARED PLAN COULD NOT LOAD"); } }
    try { const local = localStorage.getItem("quasimorph-mission-plan-v2"); if (local) { setForm({ ...defaults, ...JSON.parse(local) }); setNotice("LOCAL PLAN LOADED"); } } catch { setNotice("LOCAL PLAN COULD NOT LOAD"); }
  }, []);
  const set = (key:keyof PlanForm) => (value:string) => { if(!started.current){started.current=true;window.trackWikiEvent?.("tool_started",{tool:"mission_prep"});} setForm((current)=>({...current,[key]:value})); setNotice("UNSAVED CHANGES"); };
  const plan = useMemo(() => {
    const long = Number(form.floors) >= 3 || form.floors === "5+";
    let risk = 1; const reasons:string[]=[];
    if (["High","Extreme"].includes(form.danger)) { risk += form.danger === "Extreme" ? 3 : 2; reasons.push(`${form.danger.toLowerCase()} declared danger`); }
    if (long) { risk += 2; reasons.push("multi-floor attrition"); }
    if (form.quasi !== "None expected") { risk += form.quasi === "Likely" ? 2 : 1; reasons.push(`${form.quasi.toLowerCase()} quasimorphosis`); }
    if (form.travel === "Cross-system") { risk += 1; reasons.push("long replacement cycle"); }
    if (form.weight === "Overloaded") { risk += 2; reasons.push("overloaded deployment"); }
    if (form.supplies === "Low") { risk += 2; reasons.push("thin ship reserve"); }
    return {
      signal:risk>=7?"NO-GO / REBUILD":risk>=4?"CAUTION":"GO WITH RESERVE", reasons,
      primary:form.faction==="Unknown / mixed"?"Use a reliable primary, inspect visible enemies, and do not assume one damage answer will work across the floor.":`Prepare for ${form.faction}, then verify visible armor and attacks during the live run.`,
      backup:form.style==="Melee"?"Carry a ranged fallback with a separate supply line.":"Carry a close-range or alternate-damage fallback that fails differently from the primary.",
      medicine:long||form.danger==="Extreme"?"Protect enough treatment for immediate stabilization and the complete return route.":"Carry immediate stabilization plus an untouched extraction margin.",
      food:long?"Plan for every declared floor, a delayed exit and travel overhead. Exact counts depend on current settings and the clone.":"Keep a delay margin even on a short contract.",
      objective:form.mission==="Defense"?"Establish fallback positions and keep the exit usable before starting the hold.":form.mission==="Espionage / Robbery"?"Protect carry space and the route home; retrieval does not require clearing every room.":"Keep objective path, floor transition and extraction route distinct.",
      exit:[form.retreat1,form.retreat2,form.retreat3].join(" • "),
    };
  },[form]);
  const save=()=>{localStorage.setItem("quasimorph-mission-plan-v2",JSON.stringify(form));setNotice("SAVED LOCALLY");window.trackWikiEvent?.("tool_saved",{tool:"mission_prep",risk:plan.signal});window.trackWikiEvent?.("tool_completed",{tool:"mission_prep"});};
  const share=async()=>{const {retreat1:_,retreat2:__,retreat3:___,...shareable}=form;void _;void __;void ___;const url=new URL(location.href);url.searchParams.set("plan",btoa(JSON.stringify(shareable)));await navigator.clipboard.writeText(url.toString());setNotice("SHARE LINK COPIED");window.trackWikiEvent?.("tool_copied",{tool:"mission_prep",format:"url"});};
  const copyBrief=async()=>{const text=[`QUASIMORPH MISSION BRIEF — ${plan.signal}`,`Risk: ${plan.reasons.join(", ")||"standard unknowns"}`,`Primary: ${plan.primary}`,`Fallback: ${plan.backup}`,`Medical: ${plan.medicine}`,`Food & ammo: ${plan.food}`,`Objective: ${plan.objective}`,`Retreat: ${plan.exit}`].join("\n");await navigator.clipboard.writeText(text);setNotice("BRIEF COPIED");window.trackWikiEvent?.("tool_copied",{tool:"mission_prep",format:"text"});};
  return <div className="tool-shell mission-v2"><div className="tool-grid"><div className="control-panel" aria-label="Mission parameters">
    <Field label="Player stage" value={form.stage} onChange={set("stage")} options={["Beginner","Early Game","Midgame","Late Game"]}/><Field label="Mission type" value={form.mission} onChange={set("mission")} options={["Elimination","Defense","Espionage / Robbery","Escort","Sabotage","Story mission"]}/><Field label="Target faction" value={form.faction} onChange={set("faction")} options={["Unknown / mixed","Corporate security","Civil Resistance","Tezctlan","Quasimorph presence"]}/><Field label="Declared danger" value={form.danger} onChange={set("danger")} options={["Low","Moderate","High","Extreme"]}/><Field label="Floors" value={form.floors} onChange={set("floors")} options={["1","2","3","4","5+"]}/><Field label="Travel" value={form.travel} onChange={set("travel")} options={["Local","Regional","Cross-system"]}/><Field label="Quasimorphosis" value={form.quasi} onChange={set("quasi")} options={["None expected","Possible","Likely"]}/><Field label="Combat style" value={form.style} onChange={set("style")} options={["Ranged","Melee","Hybrid","Avoidance"]}/><Field label="Carried weight" value={form.weight} onChange={set("weight")} options={["Light","Comfortable","Heavy","Overloaded"]}/><Field label="Ship supplies" value={form.supplies} onChange={set("supplies")} options={["Low","Stable","Deep reserve"]}/><Field label="High-value item" value={form.valuable} onChange={set("valuable")} options={["No","Yes"]}/>
  </div><div className="brief" aria-live="polite"><div className="brief-head"><span>PRE-DEPLOYMENT BRIEF</span><b>{plan.signal}</b></div><Result label="Risk reasons" text={plan.reasons.length?plan.reasons.join("; "):"No elevated condition selected. Unknown floor events still require a reserve."}/><Result label="Primary" text={plan.primary}/><Result label="Fallback" text={plan.backup}/><Result label="Medical" text={plan.medicine}/><Result label="Food & ammo" text={plan.food}/><Result label="Objective" text={plan.objective}/><Result label="Extraction" text={plan.exit}/><div className="checklist"><b>FINAL CHECK</b>{["Primary ready","Fallback ready","Medicine reserved","Food & ammunition margin","Exit threshold chosen","Objective item space"].map((item)=><label key={item}><input type="checkbox"/> {item}</label>)}</div><div className="retreat-fields"><b>RETREAT TRIGGERS</b>{(["retreat1","retreat2","retreat3"] as const).map((key,index)=><label key={key}><span>{index+1}</span><input value={form[key]} onChange={(event)=>set(key)(event.target.value)} maxLength={90}/></label>)}</div></div></div>
  <div className="tool-actions"><button onClick={save}>SAVE LOCALLY</button><button onClick={copyBrief}>COPY BRIEF</button><button onClick={share}>COPY SHARE LINK</button><button onClick={()=>window.print()}>PRINT BRIEF</button><button onClick={()=>{setForm(defaults);localStorage.removeItem("quasimorph-mission-plan-v2");setNotice("RESET");}}>RESET</button><span>{notice}</span></div><p className="local-note">▣ Calculated locally. Free-text retreat rules are excluded from analytics and share URLs.</p></div>;
}
