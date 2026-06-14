import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const siteUrl = "https://memeadda098.vercel.app";
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: "/", changefreq: "daily", priority: "1.0", image: true },
  { path: "/trending-memes", changefreq: "hourly", priority: "0.9" },
  { path: "/latest-memes", changefreq: "hourly", priority: "0.9" },
  { path: "/instagram-memes", changefreq: "daily", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.2" },
  { path: "/terms", changefreq: "yearly", priority: "0.2" },
];

const memes = JSON.parse(readFileSync(join(root, "src/data/memes.json"), "utf8"));

function urlEntry(loc, changefreq, priority, image = false) {
  const imageBlock = image
    ? `
    <image:image>
      <image:loc>${siteUrl}/logo.png</image:loc>
      <image:title>meme adda 098 trending meme</image:title>
    </image:image>`
    : "";
  return `
  <url>
    <loc>${siteUrl}${loc === "/" ? "/" : loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageBlock}
  </url>`;
}

const memeEntries = memes.map((m) =>
  urlEntry(`/meme/${m.slug}`, "weekly", "0.7"),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes.map((r) => urlEntry(r.path, r.changefreq, r.priority, r.image)).join("")}
${memeEntries.join("")}
</urlset>
`;

const out = join(root, "public/sitemap.xml");
writeFileSync(out, xml.trim() + "\n");
console.log(`sitemap.xml → ${memes.length + staticRoutes.length} URLs (${siteUrl})`);
