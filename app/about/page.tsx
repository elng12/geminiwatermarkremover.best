import type { Metadata } from "next"
import siteContent from "../../lib/site-content"

const { SITE_URL, CONTACT_EMAIL } = siteContent as {
  SITE_URL: string
  CONTACT_EMAIL: string
}

const title = "About"
const description =
  "About GeminiWatermarkRemover.best — a free, privacy-focused browser tool for removing visible Gemini sparkle watermarks from AI-generated images."

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "About" },
  ],
}

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/about/",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="legal-shell" id="main-content">
        <header className="legal-header">
          <div className="legal-topbar">
            <a className="legal-backlink" href="/">
              Back to homepage
            </a>
            <span className="legal-chip">About</span>
          </div>
          <h1>About GeminiWatermarkRemover.best</h1>
          <p className="legal-lead">
            A free, privacy-focused browser tool for removing visible Gemini
            sparkle watermarks from AI-generated images. No upload, no account,
            no install.
          </p>
        </header>

        <section className="legal-card" aria-label="About content">
          <section className="legal-section">
            <h2>What is this tool?</h2>
            <p>
              GeminiWatermarkRemover.best is a free online tool that removes the
              visible sparkle watermark that Google Gemini adds to AI-generated
              images. It works entirely in your browser — your images are never
              uploaded to a server, and no server-side AI model is used in the
              cleanup process.
            </p>
          </section>

          <section className="legal-section">
            <h2>Why was it built?</h2>
            <p>
              When you generate an image with Google Gemini, a small sparkle
              watermark appears in the bottom-right corner. While this label
              serves a purpose, there are legitimate reasons to remove it: design
              prototyping, presentation materials, internal mockups, or simply
              cleaning up images you own for personal use.
            </p>
            <p>
              Existing solutions often require uploading your image to a remote
              server or using desktop software like Photoshop. This tool provides
              a faster, privacy-friendly alternative that runs locally in any
              modern browser.
            </p>
          </section>

          <section className="legal-section">
            <h2>How does it work?</h2>
            <p>
              The tool uses mathematical cleanup methods to remove the visible
              watermark overlay from the corner area of the image. It detects the
              likely position of the Gemini sparkle mark and applies a targeted
              cleanup pass. If auto-detect misses the mark, you can switch to
              manual mode to select the exact area. An Advanced Engine option is
              also available for a deeper cleanup pass — both modes run entirely
              in your browser.
            </p>
          </section>

          <section className="legal-section">
            <h2>What it does not do</h2>
            <ul className="legal-list">
              <li>
                It does <strong>not</strong> remove SynthID or invisible
                watermarks
              </li>
              <li>
                It does <strong>not</strong> remove provenance metadata or C2PA
                data
              </li>
              <li>
                It does <strong>not</strong> process video files
              </li>
              <li>
                It does <strong>not</strong> upload your image to any server
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Not affiliated with Google</h2>
            <p>
              This site is not affiliated with, endorsed by, or sponsored by
              Google LLC. Gemini is a trademark of Google LLC. References to
              Gemini on this site are used descriptively to explain the
              tool&apos;s compatibility and scope. See the{" "}
              <a className="footer-link" href="/trademark-notice/">
                trademark notice
              </a>{" "}
              for details.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>
              For questions, feedback, or legal inquiries:{" "}
              <a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <footer className="legal-footer">
            <nav className="legal-footer-nav" aria-label="About navigation">
              <a className="footer-link" href="/">
                Try the tool
              </a>
              <a className="footer-link" href="/how-to-remove-gemini-watermark/">
                How-to guide
              </a>
              <a className="footer-link" href="/privacy-policy/">
                Privacy policy
              </a>
            </nav>
            <span className="legal-footer-copy">
              &copy; 2026 GeminiWatermarkRemover.best
            </span>
          </footer>
        </section>
      </main>
    </>
  )
}
