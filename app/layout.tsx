import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});

export const metadata:Metadata={
  metadataBase:new URL("https://quasimorphwiki.com"),
  title:{default:"Quasimorph Wiki — 1.0 Guides, Tools & Verified Data",template:"%s | Quasimorph Wiki"},
  description:"Unofficial Quasimorph 1.0 player guides, local tools, achievements, updates, and source-visible data.",
  icons:{icon:"/favicon-cyan.png",shortcut:"/favicon-cyan.png"},
  openGraph:{type:"website",siteName:"Quasimorph Wiki",locale:"en_US",images:[{url:"/og-cyan.png",width:1200,height:630,alt:"Quasimorph Wiki — 1.0 guides, builds, tools, and verified data"}]},
  twitter:{card:"summary_large_image",images:["/og-cyan.png"]},
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><script async src="https://www.googletagmanager.com/gtag/js?id=G-4L3DNF1KRW"/><script dangerouslySetInnerHTML={{__html:`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4L3DNF1KRW');`}}/></head><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}
