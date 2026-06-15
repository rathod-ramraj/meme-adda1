import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SEO_ROUTES, SITE } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");
const templatePath = join(distDir, "index.html");

function patchHtml(html, route) {
  const url = route.path === "/" ? `${SITE}/` : `${SITE}${route.path}`;
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  );

  out = out.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${route.body}</div>`);

  return out;
}

const template = readFileSync(templatePath, "utf8");

for (const route of SEO_ROUTES) {
  const html = patchHtml(template, route);
  if (route.path === "/") {
    writeFileSync(templatePath, html);
    continue;
  }
  const outDir = join(distDir, route.path.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

console.log(`prerendered ${SEO_ROUTES.length} static HTML pages`);
