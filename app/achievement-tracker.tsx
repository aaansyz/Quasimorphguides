"use client";
/* eslint-disable react-hooks/set-state-in-effect -- hydration intentionally restores browser-local progress */

import { useEffect, useMemo, useState } from "react";
import { achievements } from "./achievement-data";

const storageKey = "quasimorph-achievements-v2";

export function AchievementTracker() {
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [view, setView] = useState("all");
  // Browser storage is an external system; hydration reads it once on mount.
  useEffect(() => {
    try { setComplete(new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"))); } catch { setComplete(new Set()); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(storageKey, JSON.stringify([...complete])); }, [complete, ready]);
  const visible = useMemo(() => achievements.filter(([name, description]) => {
    const done = complete.has(name);
    const hidden = description === "Hidden on Steam";
    const story = /Complete the mission|In ‘|in ‘|See an ending|storyline/i.test(description);
    const missable = /keep every|without a single death|after starting|at the same time|during the final/i.test(description);
    const matchesView = view === "all" || (view === "complete" && done) || (view === "open" && !done) || (view === "hidden" && hidden) || (view === "story" && story) || (view === "missable" && missable);
    return matchesView && `${name} ${description}`.toLowerCase().includes(query.toLowerCase());
  }), [complete, query, view]);
  const toggle = (name: string) => setComplete((current) => { const next = new Set(current); const completed=!next.has(name); if (!completed) next.delete(name); else next.add(name); window.trackWikiEvent?.("achievement_toggled",{completed}); return next; });
  const percent = Math.round((complete.size / achievements.length) * 100);
  return <section className="achievement-tracker">
    <div className="tracker-summary"><div><span>LOCAL PROGRESS</span><b>{complete.size}<i> / {achievements.length}</i></b></div><div className="progress-line"><i style={{ width: `${percent}%` }}/></div><strong>{percent}% COMPLETE</strong></div>
    <div className="tracker-controls"><label><span>SEARCH</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Achievement name or description…"/></label><label><span>FILTER</span><select value={view} onChange={(event) => setView(event.target.value)}><option value="all">All achievements</option><option value="open">Not completed</option><option value="complete">Completed</option><option value="hidden">Hidden on Steam</option><option value="story">Named mission / story</option><option value="missable">Condition-sensitive</option></select></label><button type="button" onClick={() => { if (confirm("Clear locally saved achievement progress?")) setComplete(new Set()); }}>RESET LOCAL PROGRESS</button></div>
    <div className="achievement-list">{visible.map(([name, description, rate], index) => <label key={name} className={complete.has(name) ? "done" : ""}><input type="checkbox" checked={complete.has(name)} onChange={() => toggle(name)}/><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><p>{description}</p></div><em>{rate}</em></label>)}</div>
    <p className="local-note">▣ Steam global rates snapshot: 2026-08-07. Progress is stored only in this browser; Steam account data is never requested.</p>
  </section>;
}
