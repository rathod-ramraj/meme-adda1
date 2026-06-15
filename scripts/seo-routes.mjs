import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://memeadda098.vercel.app";
const IG = "https://www.instagram.com/meme_adda_098/";

const memes = JSON.parse(readFileSync(join(__dirname, "../src/data/memes.json"), "utf8"));

const NAV = `
<nav aria-label="Site navigation">
  <ul>
    <li><a href="/">Meme Adda 098</a></li>
    <li><a href="/trending-memes">Trending Memes</a></li>
    <li><a href="/latest-memes">Latest Memes</a></li>
    <li><a href="/instagram-memes">Instagram Memes</a></li>
    <li><a href="/privacy">Privacy Policy</a></li>
    <li><a href="/terms">Terms &amp; Conditions</a></li>
  </ul>
</nav>`;

function staticBody({ h1, intro, sections = "" }) {
  return `<main id="static-seo">
  <header>
    <h1>${h1}</h1>
    <p>${intro}</p>
    <p>Follow <a href="${IG}">@meme_adda_098 on Instagram</a> for daily meme adda memes.</p>
  </header>
  ${sections}
  ${NAV}
  <footer>
    <p>&copy; Meme Adda 098 &mdash; meme adda 098, memeadda098, meme adda memes</p>
  </footer>
</main>`;
}

export const SEO_ROUTES = [
  {
    path: "/",
    title: "Meme Adda 098 – Trending Viral Memes in India",
    description:
      "Meme Adda 098 — India's top meme page for trending viral memes, funny reels & desi humor. Follow meme adda 098 on Instagram for daily meme adda memes.",
    body: staticBody({
      h1: "Meme Adda 098 – Trending Viral Memes in India",
      intro:
        "Meme Adda 098 brings you trending viral memes, funny reels, and relatable Indian humor every day. From Bollywood and cricket to school life and desi family chaos — meme adda 098 is your daily dose of meme adda memes.",
      sections: `<section>
    <h2>About Meme Adda 098</h2>
    <p>Meme Adda 098 is a fast-growing Indian meme hub run by @meme_adda_098 on Instagram. We post viral memes, funny reels, and brand promotions that actually engage.</p>
  </section>
  <section>
    <h2>Brand Promotions</h2>
    <p>Promote your brand with Meme Adda 098 — story shoutouts from ₹99, posts, reels, and collaborations for creators and businesses.</p>
  </section>
  <section>
    <h2>Explore Memes</h2>
    <ul>
      ${memes.map((m) => `<li><a href="/meme/${m.slug}">${m.title}</a></li>`).join("\n      ")}
    </ul>
  </section>`,
    }),
  },
  {
    path: "/trending-memes",
    title: "Trending Memes 2026 – Meme Adda 098",
    description:
      "Discover trending memes on Meme Adda 098. Daily viral memes, relatable Indian humor, and fresh meme adda 098 content.",
    body: staticBody({
      h1: "Trending Memes 2026 – Daily Viral Humor from Meme Adda 098",
      intro:
        "The hottest trending memes in India — Bollywood dialogues, exam stress, cricket moments, and savage replies. Meme Adda 098 tracks what's viral and posts it daily.",
    }),
  },
  {
    path: "/latest-memes",
    title: "Latest Memes 2026 – Meme Adda 098",
    description:
      "Get the latest memes on Meme Adda 098. Fresh funny memes, new viral reels, and today's hottest meme adda memes from India.",
    body: staticBody({
      h1: "Latest Memes 2026 – Fresh Funny Memes Every Day",
      intro:
        "New meme formats, current events humor, and fresh audio trends — Meme Adda 098 posts the latest funny memes India loves every single day.",
    }),
  },
  {
    path: "/instagram-memes",
    title: "Instagram Memes India – Meme Adda 098",
    description:
      "Follow Meme Adda 098 on Instagram for the best Indian memes. Funny reels, viral posts, and trending meme adda 098 content.",
    body: staticBody({
      h1: "Instagram Memes India – Follow @meme_adda_098",
      intro:
        "Meme Adda 098 is one of India's best Instagram meme pages — funny reels, feed posts, stories, and collabs that feel native, not forced.",
    }),
  },
  {
    path: "/privacy",
    title: "Privacy Policy – Meme Adda 098",
    description:
      "Privacy policy for Meme Adda 098. Learn how we handle your information when you visit or contact us.",
    body: staticBody({
      h1: "Privacy Policy – Meme Adda 098",
      intro:
        "Meme Adda 098 respects your privacy. This page explains how we handle contact form data and basic technical logs when you use memeadda098.vercel.app.",
    }),
  },
  {
    path: "/terms",
    title: "Terms and Conditions – Meme Adda 098",
    description:
      "Read the terms and conditions for using Meme Adda 098. Content usage, intellectual property, and legal information.",
    body: staticBody({
      h1: "Terms and Conditions – Meme Adda 098",
      intro:
        "Terms of use for Meme Adda 098 website and content. By using this site you agree to these terms.",
    }),
  },
  ...memes.map((m) => ({
    path: `/meme/${m.slug}`,
    title: "Funny Meme – Meme Adda 098",
    description: m.description,
    body: staticBody({
      h1: `${m.title} – Meme Adda 098`,
      intro: m.description,
    }),
  })),
];

export { SITE };
