import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsConsent } from "./analytics-consent";
import "./globals.css";

const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});

export const metadata:Metadata={
  metadataBase:new URL("https://quasimorphwiki.com"),
  title:{default:"Quasimorph Wiki — 1.0 Guides, Tools & Verified Data",template:"%s | Quasimorph Wiki"},
  description:"Unofficial Quasimorph 1.0 player guides, local tools, achievements, updates, and source-visible data.",
  authors:[{name:"QuasimorphWiki.com maintainer",url:"/about/"}],
  creator:"QuasimorphWiki.com maintainer",
  publisher:"Quasimorph Wiki",
  alternates:{types:{"application/rss+xml":"/feed.xml"}},
  icons:{icon:"/favicon-cyan.png",shortcut:"/favicon-cyan.png"},
  robots:{
    index:true,
    follow:true,
    googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1},
  },
  openGraph:{type:"website",siteName:"Quasimorph Wiki",locale:"en_US",images:[{url:"/og-cyan.png",width:1200,height:630,alt:"Quasimorph Wiki — 1.0 guides, tools, achievements, and verified updates"}]},
  twitter:{card:"summary_large_image",images:["/og-cyan.png"]},
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}<AnalyticsConsent/></body></html>}
