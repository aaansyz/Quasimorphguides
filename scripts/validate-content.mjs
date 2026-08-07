import {readFile} from "node:fs/promises";

const registry=JSON.parse(await readFile(new URL("../data/content-registry.json",import.meta.url),"utf8"));
const paths=new Set(); const titles=new Set(); const errors=[];
for(const entry of registry){
  if(paths.has(entry.path)) errors.push(`duplicate path: ${entry.path}`); paths.add(entry.path);
  if(titles.has(entry.title)) errors.push(`duplicate title: ${entry.title}`); titles.add(entry.title);
  if(entry.path!=="/"&&!/^\/.+\/$/.test(entry.path)) errors.push(`invalid trailing slash: ${entry.path}`);
  if(!entry.title||entry.title.length<8) errors.push(`thin title: ${entry.path}`);
  if(!entry.description||entry.description.length<45||entry.description.length>190) errors.push(`description length: ${entry.path}`);
  if(Number.isNaN(Date.parse(entry.modifiedAt))) errors.push(`invalid date: ${entry.path}`);
  if(entry.indexable&&entry.status==="pending") errors.push(`pending page is indexable: ${entry.path}`);
}
if(!registry.some((entry)=>entry.path==="/search/"&&!entry.indexable)) errors.push("search page must be noindex");
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`Content registry valid: ${registry.length} routes, ${registry.filter((entry)=>entry.indexable).length} indexable.`);
