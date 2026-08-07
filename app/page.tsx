import type { Metadata } from "next";
import { HomePage } from "./components";

export const metadata: Metadata = {
  title: { absolute: "Quasimorph Wiki — 1.0 Guides & Planning Tools" },
  description: "Task-focused Quasimorph 1.0 guides, a local mission planner, all 82 achievements and verified update coverage.",
  alternates: { canonical: "/" },
};

export default function Home() { return <HomePage/> }
