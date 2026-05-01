import { Link } from "react-router-dom";

const CONTACT_EMAIL = "memeadda0098@gmail.com";
const LAST_UPDATED = "May 1, 2026";

export default function PrivacyContent() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-base leading-relaxed text-muted sm:px-6 lg:py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted">
        <span className="font-medium text-black">Last updated:</span> {LAST_UPDATED}
      </p>
      <p>
        Meme Adda 098 (“we”, “us”) respects your privacy. This policy describes how we handle information
        when you visit this website or contact us.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        Information we collect
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <span className="font-medium text-black">Contact form:</span> If you use our form, we receive
          the name, email, and message you submit (processed via our form provider).
        </li>
        <li>
          <span className="font-medium text-black">Technical data:</span> Like most sites, hosting may log
          basic technical data (e.g., IP, browser type) for security and operations.
        </li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">How we use it</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>To respond to your inquiries and collaboration requests</li>
        <li>To operate and improve the website</li>
        <li>To comply with applicable law</li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        Third-party services
      </h2>
      <p>
        We link to Instagram, YouTube, and other platforms. Their privacy policies apply when you leave
        our site. We do not control how those services collect or use data.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">Your choices</h2>
      <p>
        You may contact us to ask questions about this policy or to request correction of information you
        have submitted to us.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">Contact</h2>
      <p>
        Email:{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-black underline underline-offset-4 hover:text-muted"
        >
          {CONTACT_EMAIL}
        </a>
      </p>

      <p className="mt-8 text-sm">
        See also our{" "}
        <Link to="/terms" className="font-medium text-black underline underline-offset-4 hover:text-muted">
          Terms and Conditions
        </Link>
        .
      </p>
    </article>
  );
}
