import { Link } from "react-router-dom";

const CONTACT_EMAIL = "memeadda0098@gmail.com";
const LAST_UPDATED = "May 1, 2026";

export default function TermsContent() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-base leading-relaxed text-muted sm:px-6 lg:py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
        Terms and Conditions
      </h1>
      <p className="text-sm text-muted">
        <span className="font-medium text-black">Last updated:</span> {LAST_UPDATED}
      </p>
      <p>
        Welcome to Meme Adda 098. By accessing or using this website, you agree to comply with and be
        bound by the following terms and conditions.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">1. Use of Website</h2>
      <p>This website is intended for entertainment purposes only. By using this site, you agree to:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Use the content responsibly</li>
        <li>Not misuse, copy, or distribute content without permission</li>
        <li>Not engage in any unlawful or harmful activities</li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        2. Intellectual Property Rights
      </h2>
      <p>All content on this website, including memes, images, videos, logos, and text, is either:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Owned by Meme Adda 098, or</li>
        <li>Used under fair use or with proper credit</li>
      </ul>
      <p>You may not:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Reproduce or republish content for commercial use without permission</li>
        <li>Claim ownership of any content from this site</li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        3. User-Generated Content
      </h2>
      <p>If users are allowed to submit memes or content:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>You grant us permission to display, modify, and share your content</li>
        <li>You confirm that the content does not violate any copyright, trademark, or laws</li>
        <li>We reserve the right to remove any content without notice</li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">4. Disclaimer</h2>
      <p>All content is provided for entertainment purposes only.</p>
      <p>We do not guarantee:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Accuracy or completeness of content</li>
        <li>That content will always be available</li>
      </ul>
      <p>Some memes may be offensive to certain audiences. Viewer discretion is advised.</p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        5. Limitation of Liability
      </h2>
      <p>Meme Adda 098 will not be held responsible for:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Any direct or indirect damages arising from the use of the website</li>
        <li>Any loss caused by reliance on content</li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">6. External Links</h2>
      <p>
        This website may contain links to third-party platforms (e.g., Instagram, YouTube). We are not
        responsible for:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Content on external websites</li>
        <li>Privacy practices of those platforms</li>
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">7. Privacy</h2>
      <p>
        Your use of this site is also governed by our{" "}
        <Link to="/privacy" className="font-medium text-black underline underline-offset-4 hover:text-muted">
          Privacy Policy
        </Link>
        .
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        8. Changes to Terms
      </h2>
      <p>
        We reserve the right to update these Terms and Conditions at any time. Continued use of the site
        means you accept the updated terms.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        9. Contact Information
      </h2>
      <p>For any questions regarding these terms, please contact us at:</p>
      <p>
        Email:{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-black underline underline-offset-4 hover:text-muted"
        >
          {CONTACT_EMAIL}
        </a>
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-black sm:text-2xl">
        10. Governing Law
      </h2>
      <p>These terms shall be governed by and interpreted in accordance with the laws of India.</p>
    </article>
  );
}
