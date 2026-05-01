import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import InstagramMemesContent from "./InstagramMemesContent";
import LatestMemesContent from "./LatestMemesContent";
import PrivacyContent from "./PrivacyContent";
import TermsContent from "./TermsContent";
import TrendingMemesContent from "./TrendingMemesContent";
import memeAddaProfile from "./assets/memeaddaprofile.jpg";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];

const viewportReveal = { once: true, amount: 0.15 as const, margin: "0px 0px -72px 0px" as const };

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const hoverLift =
  "transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]";

const hoverGlow =
  "transition-all duration-300 ease-in-out hover:shadow-glow-hover hover:-translate-y-1";

const SITE_URL = "https://memeadda098.com";

const SOCIAL = {
  youtube: "https://www.youtube.com/@Meme_adda_098",
  x: "https://x.com/memeadda098",
  instagram: "https://www.instagram.com/meme_adda_098/",
  /** Opens a direct message thread with the page (works in app / supported browsers). */
  instagramDm: "https://ig.me/m/meme_adda_098",
  email: "mailto:memeadda0098@gmail.com",
  phone: "tel:+916303134464",
};

const DM_INTRO =
  "Hi Meme Adda 098! 👋 I found your website and want to book a promotion.\n\n";

function dmTextForPackage(label: string) {
  return `${DM_INTRO}I'm interested in: ${label}.\n\nPlease confirm availability and how to pay. Thank you!`;
}

const DM_ALL_PACKAGES = `${DM_INTRO}Please help me book one of these:\n• Story — ₹99\n• Post — ₹129\n• Reel — ₹149\n• Collaboration — ₹179\n• Other / custom — (depends on scope)\n\nThanks!`;

function PageSeo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    document.title = title;
    const setMeta = (sel: string, attr: string, val: string) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", `${SITE_URL}${path}`);
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${path}`;
  }, [title, description, path]);
  return null;
}

/** Reliable in-page scroll for SPA + sticky header (uses scroll-margin on targets). */
function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", `#${sectionId}`);
  } catch {
    /* ignore */
  }
}

function NavLink({
  sectionId,
  children,
  className,
}: {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      if (sectionId === "home") {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        try {
          window.history.replaceState(null, "", "/");
        } catch {
          /* ignore */
        }
        return;
      }
      navigate(`/#${sectionId}`);
      window.setTimeout(() => scrollToSection(sectionId), 120);
      return;
    }
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        window.history.replaceState(null, "", "/");
      } catch {
        /* ignore */
      }
      return;
    }
    scrollToSection(sectionId);
  };

  const href = sectionId === "home" ? "/" : `/#${sectionId}`;

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="8" className="fill-black" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="700"
        fontFamily="Poppins, system-ui, sans-serif"
      >
        MA
      </text>
    </svg>
  );
}

function IconSparkle({ className = "h-8 w-8" }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 24 24" fill={`url(#${gid})`} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F8EF7" />
          <stop offset="50%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M12 2l1.2 4.2L17 7l-3.8 1.8L12 13l-1.2-4.2L7 7l3.8-1.8L12 2zM19 13l.8 2.8L22 17l-2.2 1.2L19 21l-.8-2.8L16 17l2.2-1.2L19 13zM5 13l.8 2.8L8 17l-2.2 1.2L5 21l-.8-2.8L2 17l2.2-1.2L5 13z" />
    </svg>
  );
}

function Navbar() {
  return (
    <motion.header
      className="sticky top-0 z-50 h-[72px] border-b border-border/60 bg-page/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
    >
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
        <NavLink
          sectionId="home"
          className="min-w-0 shrink text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2"
        >
          <span className="block truncate font-heading text-base font-semibold tracking-tight sm:text-lg">
            Meme Adda 098
          </span>
        </NavLink>
        <div className="flex max-w-[calc(100%-11rem)] flex-1 items-center justify-end gap-x-2 gap-y-1 overflow-x-auto sm:max-w-none sm:flex-none sm:gap-4 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <NavLink
            sectionId="home"
            className="whitespace-nowrap text-sm font-medium text-black hover:text-muted md:text-base"
          >
            Home
          </NavLink>
          <NavLink
            sectionId="about"
            className="whitespace-nowrap text-sm font-medium text-black hover:text-muted md:text-base"
          >
            About
          </NavLink>
          <NavLink
            sectionId="promotion"
            className="whitespace-nowrap text-sm font-medium text-black hover:text-muted md:text-base"
          >
            Promotions
          </NavLink>
          <NavLink
            sectionId="pricing"
            className="whitespace-nowrap text-sm font-medium text-black hover:text-muted md:text-base"
          >
            Pricing
          </NavLink>
          <NavLink
            sectionId="contact"
            className="whitespace-nowrap text-sm font-medium text-black hover:text-muted md:text-base"
          >
            Contact
          </NavLink>
          <NavLink
            sectionId="contact"
            className="shrink-0 whitespace-nowrap rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lift sm:px-6 sm:py-3"
          >
            Work with us
          </NavLink>
        </div>
      </nav>
    </motion.header>
  );
}

function HeroAvatar() {
  const [broken, setBroken] = useState(false);
  const avatarFrame =
    "mx-auto rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.12)] ring-2 ring-black/[0.06] sm:rounded-2xl";
  if (broken) {
    return (
      <div
        className={`flex h-28 w-28 items-center justify-center bg-gradient-to-br from-accent-blue via-accent-green to-accent-purple text-2xl font-extrabold text-white sm:h-32 sm:w-32 ${avatarFrame}`}
        aria-hidden
      >
        098
      </div>
    );
  }
  return (
    <img
      src={memeAddaProfile}
      alt="Meme Adda 098 – Indian viral meme page profile"
      width={128}
      height={128}
      fetchPriority="high"
      className={`h-28 w-28 object-cover sm:h-32 sm:w-32 ${avatarFrame}`}
      onError={() => setBroken(true)}
    />
  );
}

function Hero() {
  return (
    <motion.section
      className="scroll-mt-[72px] px-4 pb-16 pt-10 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28"
      id="home"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.div variants={fadeUpItem}>
          <HeroAvatar />
        </motion.div>
        <motion.h1
          className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] text-black sm:text-6xl md:text-7xl lg:text-[76px]"
          variants={fadeUpItem}
        >
          MEME{" "}
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
            ADDA
          </span>{" "}
          098
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg font-medium italic leading-relaxed text-muted sm:text-xl"
          variants={fadeUpItem}
        >
          &ldquo;The admin stays hidden… but the memes always hit.&rdquo;
        </motion.p>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          variants={fadeUpItem}
        >
          Trending memes, funny videos &amp; viral posts — run by{" "}
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black underline decoration-border underline-offset-4 hover:text-accent-blue"
          >
            @meme_adda_098
          </a>{" "}
          on Instagram.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          variants={fadeUpItem}
        >
          <motion.a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lift"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Follow on Instagram
          </motion.a>
          <motion.a
            href="#promotion"
            className="rounded-full border border-border bg-white px-8 py-4 text-base font-medium text-black transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lift"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("promotion");
            }}
          >
            Brand promotions
          </motion.a>
        </motion.div>
        <motion.div className="mt-10 flex flex-wrap justify-center gap-3" variants={fadeUpItem}>
          {[
            { href: SOCIAL.youtube, label: "YouTube", short: "YT" },
            { href: SOCIAL.x, label: "X", short: "X" },
            { href: SOCIAL.instagram, label: "Instagram", short: "IG" },
            { href: SOCIAL.email, label: "Email", short: "@" },
            { href: SOCIAL.phone, label: "Call", short: "☎" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-black ${hoverLift}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: easeSmooth }}
            >
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.short}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function FeatureCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[24px] bg-card p-8 text-white shadow-card shadow-glow ${hoverGlow} min-h-[180px]`}
    >
      {children}
    </div>
  );
}

function AboutSection() {
  return (
    <section
      className="scroll-mt-[72px] space-y-16 px-4 py-16 sm:px-8 sm:py-24 lg:space-y-24 lg:px-12"
      id="about"
    >
      <motion.div
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={staggerGrid}
      >
        <motion.div variants={fadeUpItem}>
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[40px] lg:leading-tight">
            About Meme Adda 098
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Hi there! This site is run by{" "}
            <strong className="font-semibold text-black">@meme_adda_098</strong> on Instagram.
            Meme Adda 098 is a fast-growing Indian meme hub for the funniest, most relatable, and
            trend-setting content every day — humor, creativity, and internet culture in one place.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            We curate and create memes across relatable moments, daily life humor, Bollywood, South
            Indian trends, savage replies, school vibes, and what&apos;s viral right now.
          </p>
        </motion.div>
        <motion.div variants={fadeUpItem}>
          <FeatureCard>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">Mission</p>
            <p className="mt-3 text-lg font-medium text-white">
              Make your day better with pure entertainment, fresh ideas, and nonstop laughter.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>• Where internet humor meets nonstop entertainment</li>
              <li>• Open to brands, creators &amp; influencer collabs</li>
              <li>• Strong engagement &amp; a loyal audience</li>
            </ul>
          </FeatureCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

const promotionPackages = [
  {
    title: "Single post",
    body: "Your content posted once on our page for maximum reach.",
  },
  {
    title: "Story promotion",
    body: "24-hour story shoutout featuring your brand or product.",
  },
  {
    title: "Reel / video",
    body: "Custom reel promoting your brand in a funny, relatable way.",
  },
  {
    title: "Page shoutout",
    body: "Dedicated mention, tag, and highlight for your page.",
  },
  {
    title: "Combo package",
    body: "Multiple posts + stories + reel promotion — best value.",
  },
];

function PromotionsSection() {
  return (
    <section className="scroll-mt-[72px] px-4 py-16 sm:px-8 lg:px-12" id="promotion">
      <motion.div
        className="mx-auto max-w-[1200px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-center text-3xl font-bold text-black sm:text-4xl lg:text-[40px]"
          variants={fadeUpItem}
        >
          Promotion &amp; collaborations
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-base text-muted sm:text-lg"
          variants={fadeUpItem}
        >
          Promote your brand, product, page, or service with Meme Adda 098 and reach an active,
          highly engaged audience every day.
        </motion.p>
        <motion.div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerGrid}>
          {promotionPackages.map((p) => (
            <motion.div
              key={p.title}
              className="rounded-[24px] bg-card p-8 text-white shadow-promo transition-shadow duration-300 ease-out hover:shadow-promo-hover"
              variants={fadeUpItem}
              whileHover={{ y: -6, transition: { duration: 0.28, ease: easeSmooth } }}
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="mx-auto mt-10 max-w-2xl text-center text-base text-muted"
          variants={fadeUpItem}
        >
          Contact us for custom packages, collaborations, and long-term partnerships. Let&apos;s
          create viral content that drives results.
        </motion.p>
      </motion.div>
    </section>
  );
}

function FeaturedPlayer() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={staggerGrid}
      >
        <motion.div variants={fadeUpItem}>
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[40px]">
            Featured vibe
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Catch the latest reels and trending formats — built for shares, saves, and laughs.
          </p>
        </motion.div>
        <motion.div
          className={`mt-8 rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-4 backdrop-blur-[20px] lg:mt-0 ${hoverLift}`}
          variants={fadeUpItem}
          whileHover={{ scale: 1.01, transition: { duration: 0.3, ease: easeSmooth } }}
        >
          <div className="flex items-center gap-4">
            <motion.a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-105"
              aria-label="Open Instagram"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </motion.a>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-black">New drop — check @meme_adda_098</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent-blue via-accent-green to-accent-purple"
                  initial={{ scaleX: 0.35, opacity: 0.7 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: easeSmooth }}
                  style={{ transformOrigin: "0% 50%" }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted">
                <span>Today</span>
                <span>Always on</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const contentPillars = [
  {
    title: "Relatable & daily life",
    body: "Moments that hit too close to home — school, work, and desi chaos.",
  },
  {
    title: "Bollywood & trends",
    body: "Film dialogues, South Indian flavor, and whatever the timeline is obsessing over.",
  },
  {
    title: "Promos that slap",
    body: "Shoutouts and collabs that feel native to the feed, not forced ads.",
  },
];

function ContentPillars() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto max-w-[1200px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-center text-3xl font-bold text-black sm:text-4xl lg:text-[40px]"
          variants={fadeUpItem}
        >
          What you&apos;ll find here
        </motion.h2>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-10"
          variants={staggerGrid}
        >
          {contentPillars.map((item) => (
            <motion.div
              key={item.title}
              className={`rounded-2xl bg-transparent p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 ${hoverLift}`}
              variants={fadeUpItem}
              whileHover={{ y: -5, transition: { duration: 0.28, ease: easeSmooth } }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-green/20 p-3">
                <IconSparkle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

const vibeCards = [
  { quote: "Finally a page that gets Indian meme culture.", name: "Follower", role: "Instagram" },
  { quote: "Collab was smooth — our reel actually popped off.", name: "Creator", role: "Brand partner" },
  { quote: "The promos feel like normal posts. That’s rare.", name: "Marketer", role: "Local business" },
  { quote: "Saving every second post. Too relatable.", name: "Student", role: "DM" },
];

function CommunityMarqueeCard({ t }: { t: (typeof vibeCards)[number] }) {
  return (
    <article
      className={`w-[300px] shrink-0 rounded-[20px] bg-testimonial p-8 shadow-sm sm:w-[320px] ${hoverLift}`}
    >
      <p className="text-base leading-relaxed text-black">&ldquo;{t.quote}&rdquo;</p>
      <p className="mt-6 text-sm font-semibold text-black">{t.name}</p>
      <p className="text-sm text-muted">{t.role}</p>
    </article>
  );
}

function VibeScroll() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = rowRef.current;
    const measure = () => {
      if (el) setLoopWidth(el.scrollWidth / 2);
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (el && ro) ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  const duration = loopWidth > 0 ? Math.max(22, loopWidth / 38) : 28;
  const duplicated = [...vibeCards, ...vibeCards];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-12">
        <motion.h2
          className="text-3xl font-bold text-black sm:text-4xl lg:text-[40px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={{ duration: 0.5, ease: easeSmooth }}
        >
          From the community
        </motion.h2>
      </div>
      <div
        className={`relative mt-8 w-full pb-4 ${reduceMotion ? "overflow-x-auto [-webkit-overflow-scrolling:touch]" : "overflow-hidden"}`}
      >
        <motion.div
          ref={rowRef}
          className="flex w-max gap-6 px-4 sm:gap-8 sm:px-8 lg:px-12"
          animate={
            reduceMotion || loopWidth <= 0 ? { x: 0 } : { x: [0, -loopWidth] }
          }
          transition={{
            x: reduceMotion
              ? { duration: 0 }
              : {
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
          }}
        >
          {duplicated.map((t, i) => (
            <CommunityMarqueeCard key={`${t.quote}-${i}`} t={t} />
          ))}
        </motion.div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-page to-transparent sm:w-16"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-page to-transparent sm:w-16"
          aria-hidden
        />
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-12">
      <motion.div
        className="relative mx-auto max-w-[800px] text-center"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportReveal}
        transition={{ duration: 0.6, ease: easeSmooth }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-4 rounded-full bg-[radial-gradient(circle,rgba(100,255,200,0.2),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <motion.div
          className="relative mx-auto mb-8 flex justify-center"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easeSmooth, delay: 0.08 }}
        >
          <div className="rounded-full bg-gradient-to-br from-accent-blue/30 to-accent-green/30 p-6">
            <svg className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </motion.div>
        <h2 className="relative text-3xl font-bold text-black sm:text-4xl lg:text-[40px]">
          Straight-up, no fluff
        </h2>
        <p className="relative mt-4 text-base leading-relaxed text-muted sm:text-lg">
          We keep promos clear, timelines honest, and content aligned with what the audience already
          loves. DM for details — we&apos;ll walk you through options.
        </p>
      </motion.div>
    </section>
  );
}

const faqs = [
  {
    q: "How do I book a promotion?",
    a: "Use the contact form below or DM @meme_adda_098 on Instagram. Share your goal, budget, and timeline.",
  },
  {
    q: "Do you do custom packages?",
    a: "Yes — combos of posts, stories, and reels can be tailored for launches, sales, or long-term visibility.",
  },
  {
    q: "Where are prices listed?",
    a: "Right on this page — Story ₹99, Post ₹129, Reel ₹149, Collaboration ₹179. Custom work is quoted case by case. DM on Instagram to confirm and book.",
  },
  {
    q: "What niches do you cover?",
    a: "Relatable humor, Bollywood and regional trends, savage replies, school/college jokes, and viral formats.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto max-w-[800px]"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportReveal}
        transition={{ duration: 0.55, ease: easeSmooth }}
      >
        <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-[40px]">FAQ</h2>
        <ul className="mt-8 divide-y divide-border border-t border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-border">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors hover:text-muted"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-black sm:text-lg">{item.q}</span>
                  <span className="text-xl text-muted tabular-nums">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32, ease: easeSmooth }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-base leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}

const promotionPrices = [
  {
    name: "Story",
    price: "₹99",
    desc: "24-hour story shoutout on our page.",
    dmLabel: "Story promotion (₹99)",
  },
  {
    name: "Post",
    price: "₹129",
    desc: "Single feed post featuring your content or brand.",
    dmLabel: "Post promotion (₹129)",
  },
  {
    name: "Reel",
    price: "₹149",
    desc: "Dedicated reel — funny, relatable, share-ready.",
    dmLabel: "Reel promotion (₹149)",
  },
  {
    name: "Collaboration",
    price: "₹179",
    desc: "Collaboration slot — mentions, tags & highlight style promo.",
    dmLabel: "Collaboration (₹179)",
  },
  {
    name: "Other",
    price: "Custom",
    desc: "Depends on scope — combo deals, long-term, or special asks. We’ll quote after you DM.",
    dmLabel: "a custom / other package (please quote)",
  },
] as const;

function Pricing() {
  const [copied, setCopied] = useState<"all" | null>(null);

  const copyAndOpenDm = (text: string) => {
    void navigator.clipboard.writeText(text);
    window.open(SOCIAL.instagramDm, "_blank", "noopener,noreferrer");
  };

  const handlePlanDm = (dmLabel: string) => {
    copyAndOpenDm(dmTextForPackage(dmLabel));
  };

  return (
    <section className="scroll-mt-[72px] px-4 py-16 sm:px-8 lg:px-12" id="pricing">
      <motion.div
        className="mx-auto max-w-[1200px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-center text-3xl font-bold text-black sm:text-4xl lg:text-[40px]"
          variants={fadeUpItem}
        >
          Promotion prices
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-base text-muted sm:text-lg"
          variants={fadeUpItem}
        >
          Tap a plan to copy a ready-made DM and open Instagram — paste the message in chat if it
          doesn&apos;t fill automatically.
        </motion.p>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5"
          variants={staggerGrid}
        >
          {promotionPrices.map((p) => (
            <motion.div
              key={p.name}
              className={`flex flex-col rounded-xl border border-border bg-white p-6 transition-all duration-300 ease-in-out ${hoverLift}`}
              variants={fadeUpItem}
              whileHover={{ y: -5, transition: { duration: 0.28, ease: easeSmooth } }}
            >
              <h3 className="text-lg font-semibold text-black">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold text-black">{p.price}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
              <motion.button
                type="button"
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-black py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lift"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanDm(p.dmLabel)}
              >
                DM on Instagram
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-white p-6 sm:p-8"
          variants={fadeUpItem}
        >
          <p className="text-sm font-semibold text-black">Suggested DM (all packages)</p>
          <p className="mt-3 whitespace-pre-line rounded-xl bg-page p-4 text-sm leading-relaxed text-muted">
            {DM_ALL_PACKAGES}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <motion.button
              type="button"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                void navigator.clipboard.writeText(DM_ALL_PACKAGES);
                setCopied("all");
                window.setTimeout(() => setCopied(null), 2000);
              }}
            >
              {copied === "all" ? "Copied!" : "Copy message"}
            </motion.button>
            <motion.a
              href={SOCIAL.instagramDm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-medium text-black"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Instagram DM
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CollabCta() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto max-w-[900px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportReveal}
        transition={{ duration: 0.6, ease: easeSmooth }}
      >
        <motion.div
          className="rounded-[20px] bg-gradient-to-r from-accent-blue to-accent-green p-[2px] shadow-glow transition-all duration-300 ease-in-out hover:shadow-glow-hover"
          whileHover={{ scale: 1.01, transition: { duration: 0.35, ease: easeSmooth } }}
        >
          <div className="rounded-[18px] bg-white px-8 py-10 text-center sm:px-12">
            <h2 className="text-2xl font-bold text-black sm:text-3xl lg:text-[36px]">
              Brands, creators &amp; collabs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
              Want meme-native reach with an audience that actually engages? Let&apos;s plan something
              that fits your brand voice.
            </p>
            <motion.a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lift"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Start a conversation
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ThankYouModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.3, ease: easeSmooth }}
        className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20">
          <svg className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-black">Thank you for contacting us!</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We&apos;ve received your message and will get back to you as soon as we can.
        </p>
        <motion.button
          type="button"
          className="mt-6 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lift"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
        >
          Back to home
        </motion.button>
      </motion.div>
    </div>
  );
}

function Contact() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      await fetch("https://formspree.io/f/xrbrpkle", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
    } catch {
      /* show success regardless */
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="scroll-mt-[72px] px-4 py-16 sm:px-8 lg:px-12" id="contact">
      <AnimatePresence>{submitted && <ThankYouModal onClose={handleClose} />}</AnimatePresence>
      <motion.div
        className="mx-auto max-w-[640px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-center text-3xl font-bold text-black sm:text-4xl lg:text-[40px]"
          variants={fadeUpItem}
        >
          Contact
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 text-center text-base text-muted sm:text-lg"
          variants={fadeUpItem}
        >
          Send a message — we&apos;ll get back as soon as we can.
        </motion.p>
        <motion.form
          onSubmit={(e) => void handleSubmit(e)}
          className="mt-10 space-y-4 rounded-2xl border border-border bg-white p-6 sm:p-8"
          variants={fadeUpItem}
        >
          <input type="hidden" name="_subject" value="Meme Adda 098 — site inquiry" />
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-border px-4 py-3 text-base outline-none ring-black/5 transition-all focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-xl border border-border px-4 py-3 text-base outline-none ring-black/5 transition-all focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Your message"
              className="w-full resize-y rounded-xl border border-border px-4 py-3 text-base outline-none ring-black/5 transition-all focus:ring-2"
            />
          </div>
          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-black py-4 text-base font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lift disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
          >
            {submitting ? "Sending…" : "Send message"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer
      className="relative mt-16 w-full overflow-hidden border-t border-black/[0.06] bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: easeSmooth }}
    >
      {/* SaaS-style soft gradient: bluish-purple → grey → mint → white (blurred, full width) */}
      <div className="pointer-events-none absolute inset-0 w-full" aria-hidden>
        <div className="absolute -bottom-[20%] -left-[18%] h-[min(320px,55vh)] w-[min(520px,92vw)] rounded-[100%] bg-[#e8ebff] opacity-[0.38] blur-[72px] sm:h-[360px] sm:w-[560px] sm:blur-[88px]" />
        <div className="absolute -bottom-[25%] left-[18%] h-[min(240px,42vh)] w-[min(480px,70vw)] rounded-[100%] bg-[#eef1f6] opacity-[0.45] blur-[80px] sm:blur-[96px]" />
        <div className="absolute -bottom-[18%] -right-[14%] h-[min(300px,52vh)] w-[min(500px,90vw)] rounded-[100%] bg-[#e3f7ec] opacity-[0.36] blur-[76px] sm:blur-[92px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(241,243,255,0.55)_0%,rgba(248,249,252,0.35)_45%,rgba(236,253,245,0.5)_85%,#ffffff_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#ffffff_0%,rgba(255,255,255,0.92)_35%,rgba(255,255,255,0.55)_65%,transparent_100%)]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-4 py-12 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 text-sm text-muted">
          <LogoMark className="h-6 w-6" />
          <span>© {new Date().getFullYear()} Meme Adda 098</span>
        </div>
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            <Link to="/trending-memes" className="hover:text-black">
              Trending Memes
            </Link>
            <Link to="/latest-memes" className="hover:text-black">
              Latest Memes
            </Link>
            <Link to="/instagram-memes" className="hover:text-black">
              Instagram Memes
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            <Link to="/privacy" className="hover:text-black">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-black">
              Terms
            </Link>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Instagram
            </a>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-black">
              YouTube
            </a>
            <a href={SOCIAL.email} className="hover:text-black">
              Email
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page font-sans text-black antialiased">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function MemeAddaLanding() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    const raw = hash.replace(/^#/, "");
    if (!raw) return;
    const t = window.setTimeout(() => scrollToSection(raw), 80);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return (
    <AppLayout>
      <PageSeo
        title="Meme Adda 098 – Viral Memes, Funny Reels & Trending Content"
        description="Explore Meme Adda 098 for the latest viral memes, funny reels, and trending internet content. Updated daily with relatable humor."
        path="/"
      />
      <main>
        <Hero />
        <AboutSection />
        <PromotionsSection />
        <FeaturedPlayer />
        <ContentPillars />
        <VibeScroll />
        <TrustSection />
        <FAQ />
        <Pricing />
        <CollabCta />
        <Contact />
      </main>
    </AppLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MemeAddaLanding />} />
      <Route
        path="/terms"
        element={
          <AppLayout>
            <PageSeo
              title="Terms and Conditions – Meme Adda 098"
              description="Read the terms and conditions for using Meme Adda 098. Content usage, intellectual property, and legal information."
              path="/terms"
            />
            <main className="min-h-[70vh] bg-page">
              <TermsContent />
            </main>
          </AppLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <AppLayout>
            <PageSeo
              title="Privacy Policy – Meme Adda 098"
              description="Privacy policy for Meme Adda 098. Learn how we handle your information when you visit or contact us."
              path="/privacy"
            />
            <main className="min-h-[70vh] bg-page">
              <PrivacyContent />
            </main>
          </AppLayout>
        }
      />
      <Route
        path="/trending-memes"
        element={
          <AppLayout>
            <PageSeo
              title="Trending Memes 2026 – Daily Viral Humor | Meme Adda 098"
              description="Discover the hottest trending memes of 2026 on Meme Adda 098. Daily viral memes, relatable Indian humor, and fresh content updated every day."
              path="/trending-memes"
            />
            <main className="min-h-[70vh] bg-page">
              <TrendingMemesContent />
            </main>
          </AppLayout>
        }
      />
      <Route
        path="/latest-memes"
        element={
          <AppLayout>
            <PageSeo
              title="Latest Memes 2026 – New Funny Memes Daily | Meme Adda 098"
              description="Get the latest memes of 2026 on Meme Adda 098. Fresh funny memes, new viral reels, and today's hottest internet humor from India."
              path="/latest-memes"
            />
            <main className="min-h-[70vh] bg-page">
              <LatestMemesContent />
            </main>
          </AppLayout>
        }
      />
      <Route
        path="/instagram-memes"
        element={
          <AppLayout>
            <PageSeo
              title="Instagram Memes India – Follow @meme_adda_098 | Meme Adda 098"
              description="Follow Meme Adda 098 on Instagram for the best Indian memes. Funny reels, viral posts, and trending content from @meme_adda_098."
              path="/instagram-memes"
            />
            <main className="min-h-[70vh] bg-page">
              <InstagramMemesContent />
            </main>
          </AppLayout>
        }
      />
    </Routes>
  );
}
