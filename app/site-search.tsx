"use client";
/* eslint-disable react-hooks/set-state-in-effect -- the full search page restores its URL query after hydration */

import { useEffect, useMemo, useRef, useState } from "react";

export type SearchDocument = {
  path: string;
  title: string;
  description: string;
  summary: string;
  searchTerms: string[];
  kind: string;
  cluster: string;
};

function rank(document: SearchDocument, query: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 1;
  const title = document.title.toLowerCase();
  const terms = document.searchTerms.join(" ").toLowerCase();
  const body = `${document.summary} ${document.description} ${document.cluster}`.toLowerCase();
  return words.reduce((score, word) => score + (title.includes(word) ? 8 : 0) + (terms.includes(word) ? 5 : 0) + (body.includes(word) ? 2 : 0), 0);
}

export function SearchResults({ documents, embedded = false, showInitial = true, maxResults }: { documents: SearchDocument[]; embedded?: boolean; showInitial?: boolean; maxResults?: number }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => (!showInitial&&!query.trim()?[]:documents)
    .filter((document) => kind === "all" || document.kind === kind)
    .map((document) => ({ document, score: rank(document, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, maxResults ?? (embedded ? 8 : 40)), [documents, embedded, kind, maxResults, query, showInitial]);

  useEffect(() => { if (!embedded) { const initial=new URLSearchParams(location.search).get("q")||""; if(initial)setQuery(initial); input.current?.focus(); } }, [embedded]);

  return <div className={`site-search ${embedded ? "embedded" : "full"}`}>
    <div className="search-controls">
      <label><span>SEARCH QUERY</span><input ref={input} type="search" value={query} onChange={(event) => { const next=event.target.value; if(!query&&next) window.trackWikiEvent?.("site_search"); setQuery(next); if(!embedded){const url=new URL(location.href);if(next)url.searchParams.set("q",next);else url.searchParams.delete("q");history.replaceState(null,"",url);}}} placeholder="Try “extraction”, “Magnum”, or “wounds”…"/></label>
      {!embedded && <label><span>CONTENT TYPE</span><select value={kind} onChange={(event) => setKind(event.target.value)}><option value="all">All completed pages</option><option value="guide">Guides</option><option value="article">Updates</option><option value="tool">Tools</option><option value="database">Database</option><option value="hub">Hubs</option></select></label>}
    </div>
    <div className="search-results" aria-live="polite">
      {results.map(({ document }) => <a href={document.path} key={document.path} onClick={()=>window.trackWikiEvent?.("search_result_click",{destination:document.path})}><span>{`${document.cluster} // ${document.kind}`}</span><b>{document.title}</b><p>{document.summary}</p></a>)}
      {!results.length && (query.trim()||showInitial) && <p className="search-empty">No completed page matches that query. Try “extraction”, “Magnum”, “wounds” or browse the guide stages below.</p>}
    </div>
  </div>;
}

export function SearchLauncher({ documents }: { documents: SearchDocument[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable=true]");
      if ((event.key === "/" && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault(); setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <>
    <button className="search-launch" type="button" onClick={() => setOpen(true)} aria-label="Search site">SEARCH <kbd>/</kbd></button>
    {open && <dialog open className="search-overlay" aria-label="Search Quasimorph Wiki"><div className="search-dialog"><div className="search-dialog-head"><span>FIELD ARCHIVE // SEARCH</span><button onClick={() => setOpen(false)} aria-label="Close search">ESC</button></div><SearchResults documents={documents} maxResults={8}/></div></dialog>}
  </>;
}
