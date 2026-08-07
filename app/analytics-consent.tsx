"use client";

import { useEffect, useState } from "react";

declare global { interface Window { dataLayer?: unknown[][]; gtag?: (...args: unknown[]) => void; trackWikiEvent?: (name: string, parameters?: Record<string, string | number | boolean>) => void } }

const key = "quasimorph-analytics-consent";
const measurementId = "G-4L3DNF1KRW";

function enableAnalytics() {
  if (document.querySelector(`script[src*="${measurementId}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
  window.trackWikiEvent = (name, parameters = {}) => window.gtag?.("event", name, parameters);
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<string | null>(null);
  // Consent is intentionally read from browser storage only after hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { const saved = localStorage.getItem(key); setChoice(saved); if (saved === "accepted") enableAnalytics(); }, []);
  if (choice) return null;
  const decide = (next: "accepted" | "declined") => { localStorage.setItem(key, next); setChoice(next); if (next === "accepted") enableAnalytics(); };
  return <aside className="consent-banner" aria-label="Analytics preference"><div><b>OPTIONAL ANALYTICS</b><p>We can measure page and tool usage after consent. Guide search, planner data and achievement progress stay in your browser.</p><a href="/privacy/">Privacy details</a></div><div><button onClick={() => decide("declined")}>DECLINE</button><button className="primary" onClick={() => decide("accepted")}>ACCEPT</button></div></aside>;
}
