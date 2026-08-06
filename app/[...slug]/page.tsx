import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "../components";
import { pageByPath, pages } from "../site-data";

type Props = { params: Promise<{ slug: string[] }> };

function resolve(slug:string[]) { return pageByPath.get(`/${slug.join("/")}/`) }

export function generateStaticParams() { return pages.map((page)=>({slug:page.path.split("/").filter(Boolean)})) }

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params; const page=resolve(slug); if(!page) return {};
  return {
    title: page.title, description: page.description,
    alternates:{canonical:page.path},
    openGraph:{title:page.title,description:page.description,url:page.path,type:"article",siteName:"Quasimorph Wiki"},
    twitter:{card:"summary_large_image",title:page.title,description:page.description},
  };
}

export default async function Page({params}:Props){ const {slug}=await params; const page=resolve(slug); if(!page) notFound(); return <ArticlePage page={page}/> }
