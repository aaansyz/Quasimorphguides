import registry from "../data/content-registry.json";

export type ContentStatus="verified"|"partial"|"pending";
export type ContentKind="home"|"hub"|"guide"|"article"|"database"|"tool"|"search"|"legal"|"draft";
export type ContentMeta={path:string;title:string;description:string;summary:string;searchTerms:string[];publishedAt:string;modifiedAt:string;author:string;status:ContentStatus;indexable:boolean;kind:ContentKind;cluster:string};

export const contentRegistry=registry as ContentMeta[];
export const contentMetaByPath=new Map(contentRegistry.map(entry=>[entry.path,entry]));
export const indexableContent=contentRegistry.filter(entry=>entry.indexable);
export const searchDocuments=indexableContent.filter(entry=>entry.kind!=="legal"&&entry.kind!=="home").map(entry=>({path:entry.path,title:entry.title,description:entry.description,summary:entry.summary,searchTerms:entry.searchTerms,kind:entry.kind,cluster:entry.cluster}));

export function getContentMeta(path:string){return contentMetaByPath.get(path)}

export function validateContentRegistry(){
  const paths=new Set<string>(); const titles=new Set<string>(); const errors:string[]=[];
  for(const entry of contentRegistry){
    if(paths.has(entry.path)) errors.push(`Duplicate path: ${entry.path}`); paths.add(entry.path);
    if(titles.has(entry.title)) errors.push(`Duplicate title: ${entry.title}`); titles.add(entry.title);
    if(!/^\/.*\/$/.test(entry.path)&&entry.path!=="/") errors.push(`Path must use trailing slash: ${entry.path}`);
    if(Number.isNaN(Date.parse(entry.modifiedAt))) errors.push(`Invalid date: ${entry.path}`);
    if(entry.indexable&&entry.status==="pending") errors.push(`Pending page cannot be indexable: ${entry.path}`);
  }
  return errors;
}
