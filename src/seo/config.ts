export const SITE_ORIGIN = "https://memeadda098.vercel.app";

export const SITE_NAME = "Meme Adda 098";

export const DEFAULT_TITLE = "Meme Adda 098 – Trending Viral Memes in India";

export const DEFAULT_DESCRIPTION =
  "Meme Adda 098 — India's top meme page for trending viral memes, funny reels & desi humor. Follow meme adda 098 on Instagram for daily meme adda memes.";

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/logo.png`;

export const SOCIAL = {
  instagram: "https://www.instagram.com/meme_adda_098/",
  youtube: "https://www.youtube.com/@Meme_adda_098",
  x: "https://x.com/memeadda098",
  email: "memeadda0098@gmail.com",
} as const;

export const STATIC_ROUTES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/trending-memes", changefreq: "hourly", priority: "0.9" },
  { path: "/latest-memes", changefreq: "hourly", priority: "0.9" },
  { path: "/instagram-memes", changefreq: "daily", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.2" },
  { path: "/terms", changefreq: "yearly", priority: "0.2" },
] as const;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p === "/" ? "" : p}`;
}
