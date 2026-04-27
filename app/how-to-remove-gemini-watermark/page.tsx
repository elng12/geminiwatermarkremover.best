import type { Metadata } from "next"
import siteContent from "../../lib/site-content"

const { SITE_URL } = siteContent as { SITE_URL: string }

const title = "How to Remove the Gemini Watermark from Your Images"
const description =
  "Step-by-step guide to removing the visible Gemini sparkle watermark from AI-generated images. Free browser-based tool, no upload, no Photoshop required."

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "How to Remove Gemini Watermark" },
  ],
}

const howtoJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove the Gemini Watermark from Your Images",
  description:
    "Remove visible Gemini watermark overlays from AI-generated images using a free browser-based tool. No upload, no Photoshop required.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool and upload your image",
      text: "Go to GeminiWatermarkRemover.best and upload a JPG, PNG, or WebP file that contains a visible Gemini sparkle watermark, or try one of the built-in example images first.",
      url: `${SITE_URL}/#top`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Let the tool detect and remove the watermark automatically",
      text: "The tool checks the usual bottom-right corner for the Gemini watermark and applies a local cleanup pass. Everything runs in your browser — your image is not uploaded to any server.",
      url: `${SITE_URL}/#how-title`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the before-and-after comparison",
      text: "Use the comparison slider to check the result. If the auto-detect missed the mark or left residue, switch to manual mode to draw a tighter box around the watermark area.",
      url: `${SITE_URL}/#how-title`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download the cleaned image",
      text: "Once the result looks clean, click Download to save the image. JPG and WebP exports may change compression, so keep your original file if you need a lossless source copy.",
      url: `${SITE_URL}/#how-title`,
    },
  ],
}

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/how-to-remove-gemini-watermark/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/how-to-remove-gemini-watermark/",
    images: [
      {
        alt: "How to remove the Gemini watermark guide",
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
        alt: "How to remove the Gemini watermark guide",
        url: "/og/og-home.png",
      },
    ],
  },
}

export default function HowToRemovePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoJsonLd) }}
      />
      <main className="legal-shell" id="main-content">
        <header className="legal-header">
          <div className="legal-topbar">
            <a className="legal-backlink" href="/">
              Back to homepage
            </a>
            <span className="legal-chip">Guide</span>
          </div>
          <h1>How to Remove the Gemini Watermark from Your Images</h1>
          <p className="legal-lead">
            A step-by-step guide to removing the visible Gemini sparkle
            watermark from AI-generated images using a free browser-based tool.
            No Photoshop, no upload, no account required.
          </p>
        </header>

        <section className="legal-card" aria-label="Guide content">
          <section className="legal-section">
            <h2>What is the Gemini watermark?</h2>
            <p>
              When you generate an image with Google Gemini, the AI typically
              adds a small visible sparkle mark in the bottom-right corner of the
              output. This watermark indicates that the image was created by
              Google&apos;s AI model. It is a visible overlay — separate from
              SynthID, which is an invisible digital signal embedded in the pixel
              data.
            </p>
            <p>
              The visible sparkle watermark can be a problem when you need a
              clean image for design mockups, presentations, prototyping, or
              any context where the AI label in the corner is unwanted. That is
              where a Gemini watermark remover comes in.
            </p>
          </section>

          <section className="legal-section">
            <h2>Step 1: Open the tool and upload your image</h2>
            <p>
              Go to{" "}
              <a className="footer-link" href="/">
                GeminiWatermarkRemover.best
              </a>{" "}
              and upload a JPG, PNG, or WebP file that contains a visible Gemini
              sparkle watermark. You can also try one of the built-in example
              images to see how the tool works before uploading your own file.
            </p>
            <p>
              The tool works entirely in your browser. Your image is not
              uploaded to any server — the file stays on your device throughout
              the process.
            </p>
          </section>

          <section className="legal-section">
            <h2>Step 2: Let the tool detect and remove the watermark</h2>
            <p>
              After uploading, the tool automatically checks the usual
              bottom-right corner for the Gemini watermark and applies a local
              cleanup pass. The detection and removal happen entirely in your
              browser using mathematical cleanup methods — no server-side AI
              model or inpainting is involved.
            </p>
            <p>
              If auto-detect cannot confidently find the watermark (for example,
              if the image is heavily cropped or the mark is in an unusual
              position), the tool will prompt you to switch to manual mode.
            </p>
          </section>

          <section className="legal-section">
            <h2>Step 3: Review the before-and-after comparison</h2>
            <p>
              Once the cleanup is complete, you can use the comparison slider to
              check the result. Drag the slider left and right to compare the
              original image with the cleaned version. Look closely at the
              corner area where the watermark was.
            </p>
            <p>
              If the auto-detect left residue or missed the mark entirely,
              switch to manual mode: draw a tight box around the watermark area
              and run the cleanup again. You can also try the Advanced Engine
              for a deeper cleanup pass — it still runs locally in your browser.
            </p>
          </section>

          <section className="legal-section">
            <h2>Step 4: Download the cleaned image</h2>
            <p>
              When the result looks clean, click the Download button to save the
              image to your device. The tool exports a cleaned copy of the file.
              JPG and WebP exports may have different compression than your
              original, so keep the source file if you need a lossless copy.
            </p>
            <p>
              Only use the tool on images you own or have permission to modify.
              See the{" "}
              <a className="footer-link" href="/terms-of-service/">
                Terms of Service
              </a>{" "}
              for details on permitted use.
            </p>
          </section>

          <section className="legal-section">
            <h2>When does the tool work best?</h2>
            <ul className="legal-list">
              <li>
                <strong>Visible Gemini sparkle watermarks</strong> — the small
                sparkle icon in the corner of AI-generated images
              </li>
              <li>
                <strong>Simple backgrounds</strong> — the cleanup works best
                when the watermark sits on a clean or lightly textured area
              </li>
              <li>
                <strong>Standard image formats</strong> — JPG, PNG, and WebP
                files under 10MB
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Known limitations</h2>
            <ul className="legal-list">
              <li>
                <strong>Dense textures or complex backgrounds</strong> — the
                cleanup may leave visible residue near the watermark area
              </li>
              <li>
                <strong>Heavily compressed or cropped images</strong> — manual
                mode is usually better for these cases
              </li>
              <li>
                <strong>SynthID and invisible watermarks</strong> — this tool
                only targets the visible sparkle mark; it does not remove
                SynthID, invisible watermarks, or provenance metadata
              </li>
              <li>
                <strong>Video watermarks</strong> — only still images are
                supported in this version
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Try it now</h2>
            <p>
              Ready to remove the Gemini watermark from your image?{" "}
              <a className="footer-link" href="/">
                Open the tool
              </a>{" "}
              and upload your file. It takes less than a minute, and everything
              runs locally in your browser.
            </p>
          </section>

          <footer className="legal-footer">
            <nav className="legal-footer-nav" aria-label="Guide navigation">
              <a className="footer-link" href="/">
                Try the tool
              </a>
              <a className="footer-link" href="/faq/">
                FAQ
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
