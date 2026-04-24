import type { Metadata } from "next"
import { LegalPageShell } from "../../components/legal-page-shell"
import siteContent from "../../lib/site-content"

const { CONTACT_EMAIL } = siteContent as { CONTACT_EMAIL: string }

const title = "Trademark Notice | Gemini Watermark Remover"
const description =
  "Trademark Notice for Gemini Watermark Remover. Explains non-affiliation, descriptive product references, and contact details for trademark-related notices."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/trademark-notice/",
  },
  openGraph: {
    title,
    description,
    type: "article",
    url: "/trademark-notice/",
    images: [
      {
        alt: "Gemini Watermark Remover Online preview",
        height: 630,
        url: "/og/og-home.png",
        width: 1200,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        alt: "Gemini Watermark Remover Online preview",
        url: "/og/og-home.png",
      },
    ],
  },
}

export default function TrademarkNoticePage() {
  return (
    <LegalPageShell
      title="Trademark Notice"
      lead="This page explains how trademarked product names are referenced on this site and clarifies that Gemini Watermark Remover is an independent tool website, not an official Google property."
      updatedAt="April 17, 2026"
      contentLabel="Trademark notice content"
      footerLinks={[
        { href: "/", label: "Homepage" },
        { href: "/privacy-policy/", label: "Privacy Policy" },
        { href: "/terms-of-service/", label: "Terms of Service" },
      ]}
    >
      <section className="legal-section">
        <h2>1. Non-affiliation statement</h2>
        <p>
          Gemini Watermark Remover is not affiliated with, endorsed by, or
          sponsored by Google LLC. References to Gemini on this site are used
          only to describe compatibility, visible-mark scope, and the type of
          images the tool is designed to help with.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Trademark ownership</h2>
        <p>
          Gemini is a trademark of Google LLC. Other product names, company
          names, logos, and marks mentioned on this site remain the property of
          their respective owners.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Descriptive use only</h2>
        <p>
          This site uses the word Gemini in a descriptive, referential sense to
          explain the tool&apos;s target use case. The site does not claim to be
          an official Google tool, partner product, or replacement for any
          Google product or service.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. No logo or brand ownership claim</h2>
        <p>
          The site should not be interpreted as claiming ownership of Google
          trademarks or brand assets. If brand references appear in examples,
          documentation, or explanatory copy, they are included only to help
          users understand what kind of visible mark the current tool does or
          does not address.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Requests, corrections, and complaints</h2>
        <p>
          If you believe a trademark reference on this site is inaccurate,
          misleading, or should be corrected, contact:{" "}
          <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          Please include the page URL, the specific trademark concern, and the
          requested correction so the issue can be reviewed.
        </p>
      </section>
    </LegalPageShell>
  )
}
