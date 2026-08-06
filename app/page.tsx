import type { Metadata } from "next";
import { HomePage } from "./components";

export const metadata: Metadata = {
  title: { absolute: "Quasimorph Wiki — 1.0 Guides, Tools & Verified Data" },
  description: "Unofficial Quasimorph 1.0 guides, builds, local planning tools, achievements, updates, and source-visible player data.",
  alternates: { canonical: "/" },
};

export default function Home() { return <HomePage/> }
