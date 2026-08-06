import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});

export const metadata:Metadata={
  metadataBase:new URL("https://quasimorphwiki.com"),
  title:{default:"Quasimorph Wiki — 1.0 Guides, Tools & Verified Data",template:"%s | Quasimorph Wiki"},
  description:"Unofficial Quasimorph 1.0 player guides, local tools, achievements, updates, and source-visible data.",
  icons:{icon:"/favicon.png",shortcut:"/favicon.png"},
  openGraph:{type:"website",siteName:"Quasimorph Wiki",locale:"en_US",images:[{url:"/og.png",width:1200,height:630,alt:"Quasimorph Wiki — 1.0 guides, builds, tools, and verified data"}]},
  twitter:{card:"summary_large_image",images:["/og.png"]},
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}
