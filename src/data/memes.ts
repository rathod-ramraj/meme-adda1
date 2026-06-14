import memesJson from "./memes.json";

export type MemeEntry = {
  slug: string;
  title: string;
  description: string;
};

export const MEMES: MemeEntry[] = memesJson;

export function getMemeBySlug(slug: string): MemeEntry | undefined {
  return MEMES.find((m) => m.slug === slug);
}

export function memePageTitle(): string {
  return "Funny Meme – Meme Adda 098";
}
