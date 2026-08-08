import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "../components";
import { pageByPath, pages } from "../site-data";
import { getContentMeta } from "../../lib/content-registry";

type Props = { params: Promise<{ slug: string[] }> };

function resolve(slug:string[]) { return pageByPath.get(`/${slug.join("/")}/`) }

export function generateStaticParams() { return pages.map((page)=>({slug:page.path.split("/").filter(Boolean)})) }

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params; const page=resolve(slug); if(!page) return {};
  const meta=getContentMeta(page.path);
  const isArticle=meta?.kind==="guide"||meta?.kind==="article";
  return {
    title: meta?.title||page.title, description: meta?.description||page.description,
    alternates:{canonical:page.path},
    robots:meta?.indexable===false
      ?{index:false,follow:true,googleBot:{index:false,follow:true}}
      :{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
    openGraph:isArticle
      ?{title:meta?.title||page.title,description:meta?.description||page.description,url:page.path,type:"article",siteName:"Quasimorph Wiki",publishedTime:meta?.publishedAt,modifiedTime:meta?.modifiedAt,authors:["https://quasimorphwiki.com/about/"]}
      :{title:meta?.title||page.title,description:meta?.description||page.description,url:page.path,type:"website",siteName:"Quasimorph Wiki"},
    twitter:{card:"summary_large_image",title:meta?.title||page.title,description:meta?.description||page.description},
  };
}

export default async function Page({params}:Props){ const {slug}=await params; const page=resolve(slug); if(!page) notFound(); return <ArticlePage page={page}/> }
