import { Link } from "react-router-dom";
import type { MemeEntry } from "./data/memes";
import { SOCIAL } from "./seo/config";

export default function MemePageContent({ meme }: { meme: MemeEntry }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-base leading-relaxed text-muted sm:px-6 lg:py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
        {meme.title} – Meme Adda 098
      </h1>
      <p>
        <strong className="font-semibold text-black">Meme Adda 098</strong> brings you this funny
        meme — {meme.description.toLowerCase()} Follow{" "}
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-black underline underline-offset-4 hover:text-muted"
        >
          @meme_adda_098
        </a>{" "}
        for daily meme adda memes.
      </p>
      <p>{meme.description}</p>
      <p>
        Search meme adda 098, memeadda098, or meme adda memes for more trending viral content from
        India&apos;s favorite meme page.
      </p>
      <nav
        aria-label="Explore more"
        className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6 text-sm"
      >
        <Link
          to="/"
          className="rounded-full border border-border px-4 py-2 text-black transition-colors hover:bg-gray-50"
        >
          Meme Adda 098
        </Link>
        <Link
          to="/trending-memes"
          className="rounded-full border border-border px-4 py-2 text-black transition-colors hover:bg-gray-50"
        >
          Trending Memes
        </Link>
        <Link
          to="/latest-memes"
          className="rounded-full border border-border px-4 py-2 text-black transition-colors hover:bg-gray-50"
        >
          Latest Memes
        </Link>
      </nav>
    </article>
  );
}
