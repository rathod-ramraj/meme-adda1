import { SITE_NAME, SITE_ORIGIN, SOCIAL } from "./config";

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description:
      "Meme Adda 098 — trending viral memes in India. Daily funny memes from meme adda 098.",
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_ORIGIN}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/icon.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_ORIGIN}/logo.png`,
    sameAs: [SOCIAL.instagram, SOCIAL.youtube, SOCIAL.x],
  };
}

export function buildArticleSchema(title: string, description: string, path: string) {
  return {
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_ORIGIN}${path}`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/icon.png` },
    },
  };
}

export function buildJsonLdGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
