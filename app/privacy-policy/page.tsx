import type { Metadata } from "next"
import { LegalPageShell } from "../../components/legal-page-shell"
import siteContent from "../../lib/site-content"

const { CONTACT_EMAIL } = siteContent as { CONTACT_EMAIL: string }

const title = "Privacy Policy | Gemini Watermark Remover"
const description =
  "Privacy Policy for Gemini Watermark Remover. Explains browser-only processing, no image upload, temporary local state, and privacy contact details."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy-policy/",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      lead="This page explains what the current version of Gemini Watermark Remover does with your data, what stays inside your browser, and what limited technical information may still be received when the site itself loads."
      updatedAt="April 19, 2026"
      contentLabel="Privacy policy content"
      footerLinks={[
        { href: "/", label: "Homepage" },
        { href: "/terms-of-service/", label: "Terms of Service" },
        { href: "/trademark-notice/", label: "Trademark Notice" },
        { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
      ]}
    >
      <section className="legal-section">
        <h2>1. Core privacy summary</h2>
        <p>
          The current version of this tool processes image cleanup entirely in
          your browser. Your selected image is not uploaded to a remote cleanup
          server, and you do not need to create an account to use the tool.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Image handling</h2>
        <p>
          When you choose an image, the file is read by your browser so the
          page can preview it, attempt visible-mark cleanup, and let you
          download a result. In the current v1 flow, this processing stays on
          your device.
        </p>
        <ul className="legal-list">
          <li>
            <strong>No image upload:</strong> the site does not send your
            selected image to a cleanup API in v1.
          </li>
          <li>
            <strong>No account requirement:</strong> the core tool works
            without sign-up or login.
          </li>
          <li>
            <strong>Visible-mark scope only:</strong> the tool targets visible
            Gemini-style corner marks and similar small overlays.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Temporary browser state</h2>
        <p>
          To make previews and downloads work, the current frontend may keep
          temporary in-memory state during your browser session. That can
          include object URLs for the source image, the cleaned result, and
          temporary selection state while you use the page.
        </p>
        <ul className="legal-list">
          <li>
            <strong>Current frontend behavior:</strong> the shipped frontend
            does not intentionally store selected images in localStorage,
            sessionStorage, or IndexedDB.
          </li>
          <li>
            <strong>Session lifetime:</strong> temporary state is expected to
            clear when you reset the tool, reload the page, or close the tab.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Site delivery and basic technical data</h2>
        <p>
          Even when image cleanup itself stays local, the site still has to be
          delivered to your browser. When that happens, the web server, hosting
          platform, CDN, or similar delivery layer may receive normal request
          information such as your IP address, user agent, referrer, and
          request time.
        </p>
        <p>
          This kind of technical request data is separate from your image
          content. It is typically used to deliver pages, handle security, and
          maintain service stability.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Third-party requests</h2>
        <p>
          In the current shipped frontend, the main site assets needed for the
          core tool are served from the site itself. The current v1 cleanup
          flow does not require sending your selected image to Google or to a
          third-party cleanup provider.
        </p>
        <p>
          If the delivery stack, embedded assets, analytics setup, or
          third-party integrations change later, this policy should be updated
          before those changes are enabled.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Cookies and analytics</h2>
        <p>
          The current shipped frontend does not require login cookies for the
          core cleanup flow and does not currently include Google Analytics 4
          or another analytics script in the frontend code shipped with this
          site.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Sensitive content and your choices</h2>
        <p>
          Because the tool works on files you select yourself, you should only
          use it on content you are comfortable processing in your current
          browser environment and only on material you own or are allowed to
          modify.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Contact</h2>
        <p>
          For privacy requests or questions about this policy, use:{" "}
          <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          For legal complaints or trademark-related notices, use:{" "}
          <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Policy updates</h2>
        <p>
          This policy may change if the product architecture, hosting setup,
          analytics setup, or feedback flow changes. When that happens, the
          updated version should be published on this page with a new updated
          date.
        </p>
      </section>
    </LegalPageShell>
  )
}
