import { useEffect } from "react";
import { absoluteUrl, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE } from "./config";
import { buildArticleSchema, buildJsonLdGraph, buildOrganizationSchema, buildWebsiteSchema } from "./schema";

type PageSeoProps = {
  title?: string;
  description?: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  schemaType?: "home" | "article";
};

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function PageSeo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  schemaType = "home",
}: PageSeoProps) {
  const url = absoluteUrl(path);
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  useEffect(() => {
    document.title = title;
    upsertMetaByName("description", description);
    upsertMetaByName("robots", robots);
    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:site_name", "Meme Adda 098");
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", url);
    upsertMetaByProperty("og:image", ogImage);
    upsertMetaByProperty("og:image:alt", "meme adda 098 trending meme");
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:site", "@memeadda098");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", ogImage);
    setCanonical(url);

    const graph =
      schemaType === "article"
        ? buildJsonLdGraph(buildWebsiteSchema(), buildOrganizationSchema(), buildArticleSchema(title, description, path))
        : buildJsonLdGraph(buildWebsiteSchema(), buildOrganizationSchema());

    setJsonLd("page-jsonld", graph);
  }, [title, description, path, url, ogImage, robots, schemaType]);

  return null;
}
