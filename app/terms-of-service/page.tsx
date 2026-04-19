import type { Metadata } from "next"
import { LegalPageShell } from "../../components/legal-page-shell"
import siteContent from "../../lib/site-content"

const { CONTACT_EMAIL } = siteContent as { CONTACT_EMAIL: string }

const title = "Terms of Service | Gemini Watermark Remover"
const description =
  "Terms of Service for Gemini Watermark Remover. Covers permitted use, visible-mark-only scope, disclaimers, and legal contact details."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms-of-service/",
  },
}

export default function TermsOfServicePage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      lead="These terms describe how you may use the current version of Gemini Watermark Remover, what the tool is designed to do, and the limits and disclaimers that apply to the service."
      updatedAt="April 17, 2026"
      contentLabel="Terms of service content"
      footerLinks={[
        { href: "/", label: "Homepage" },
        { href: "/privacy-policy/", label: "Privacy Policy" },
        { href: "/trademark-notice/", label: "Trademark Notice" },
        { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
      ]}
    >
      <section className="legal-section">
        <h2>1. Acceptance</h2>
        <p>
          By using this site, you agree to these Terms of Service. If you do
          not agree, do not use the service.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Permitted use</h2>
        <p>
          You may use the service only on images you own or on content you have
          permission to edit. You remain responsible for making sure your use
          of the tool is lawful and authorized.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Prohibited use</h2>
        <ul className="legal-list">
          <li>
            <strong>No unauthorized editing:</strong> do not use the tool on
            content you do not own or do not have permission to modify.
          </li>
          <li>
            <strong>No illegal or abusive use:</strong> do not use the service
            for unlawful, fraudulent, harassing, or abusive conduct.
          </li>
          <li>
            <strong>No service misuse:</strong> do not attempt to disrupt,
            overload, scrape, or interfere with the site beyond normal browsing
            and normal tool use.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Service scope</h2>
        <p>
          The current version of the tool is designed for visible Gemini-style
          corner marks and similar small visible overlays.
        </p>
        <ul className="legal-list">
          <li>
            <strong>Included scope:</strong> small visible corner marks on
            supported JPG, PNG, and WebP images.
          </li>
          <li>
            <strong>Out of scope:</strong> SynthID, invisible watermarks,
            provenance metadata, video watermark removal, and broad non-visible
            authenticity systems.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>5. No guarantee of perfect results</h2>
        <p>
          Results may vary by image. Dense textures, heavy compression, large
          overlays, difficult backgrounds, or unusual layouts may reduce
          cleanup quality. You should review the result yourself before using
          it in production, publishing it, or sharing it.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Availability and changes</h2>
        <p>
          The service may change, pause, or become unavailable at any time.
          Features, limits, file support, and pricing status may also change
          later. The current version is free and browser-based, but that does
          not guarantee future availability or unchanged scope.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Intellectual property and trademarks</h2>
        <p>
          This site is not affiliated with, endorsed by, or sponsored by Google
          LLC. Gemini is a trademark of Google LLC. You retain responsibility
          for the content you choose to process. Site code, copy, and branding
          elements may be protected by applicable law.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Disclaimer and limitation of liability</h2>
        <p>
          The service is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. To the maximum extent allowed by law, the site
          operator disclaims warranties regarding availability, fitness for a
          particular purpose, non-infringement, and error-free results.
        </p>
        <p>
          To the maximum extent allowed by law, the site operator is not liable
          for indirect, incidental, special, consequential, or similar damages
          resulting from use of the service, including loss of data, loss of
          business, or reliance on an imperfect cleanup result.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Complaints and contact</h2>
        <p>
          For legal notices, complaints, or trademark-related contact, use:{" "}
          <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          For privacy-related requests, use:{" "}
          <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  )
}
