import {readFile,writeFile} from "node:fs/promises";

const registry=JSON.parse(await readFile(new URL("../data/content-registry.json",import.meta.url),"utf8"));
const base="https://quasimorphwiki.com";
const indexable=registry.filter((entry)=>entry.indexable);
const escape=(value)=>value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const urls=indexable.map((entry)=>`  <url><loc>${base}${entry.path}</loc><lastmod>${entry.modifiedAt}</lastmod></url>`).join("\n");
await writeFile(new URL("../public/sitemap.xml",import.meta.url),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
const updates=indexable.filter((entry)=>entry.cluster==="Story & Updates"&&["article","database"].includes(entry.kind)).sort((a,b)=>b.modifiedAt.localeCompare(a.modifiedAt));
const items=updates.map((entry)=>`    <item><title>${escape(entry.title)}</title><link>${base}${entry.path}</link><guid>${base}${entry.path}</guid><pubDate>${new Date(`${entry.modifiedAt}T12:00:00Z`).toUTCString()}</pubDate><description>${escape(entry.summary)}</description></item>`).join("\n");
await writeFile(new URL("../public/feed.xml",import.meta.url),`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Quasimorph Wiki Updates</title><link>${base}/updates/</link><description>Verified Quasimorph 1.0 release and content updates.</description><language>en-us</language>\n${items}\n  </channel></rss>\n`);
