import siteContent from "../lib/site-content"

type DemoExample = {
  alt: string
  buttonLabel: string
  description: string
  height: number
  imageLabel: string
  imageSrc: string
  sourceName: string
  title: string
  width: number
}

type FaqItem = {
  answer: string
  question: string
}

const { CONTACT_EMAIL, HOME_PAGE_FAQ_ITEMS } = siteContent as {
  CONTACT_EMAIL: string
  HOME_PAGE_FAQ_ITEMS: FaqItem[]
}

const trustSignals = [
  {
    description: "Start without credits, pricing, or account setup.",
    label: "Free online",
  },
  {
    description: "You can begin with your own file or a verified example.",
    label: "No sign-up",
  },
  {
    description: "The cleanup flow runs inside the current browser session.",
    label: "100% in your browser",
  },
  {
    description: "The image is not sent to a remote cleanup server in v1.",
    label: "No upload required",
  },
]

const demoExamples: DemoExample[] = [
  {
    alt: "Example image with a visible Gemini sparkle watermark in the corner",
    buttonLabel: "Try this example",
    description: "A clear bottom-right Gemini-style sparkle mark on the original image.",
    height: 404,
    imageLabel: "Visible sparkle cleanup",
    imageSrc: "/demo/demo-01-sparkle-before.png",
    sourceName: "demo-01-sparkle-before.png",
    title: "Standard corner sparkle",
    width: 576,
  },
  {
    alt: "Compressed example image with the same visible Gemini-style sparkle watermark",
    buttonLabel: "Try this example",
    description:
      "A resized and compressed version of the same visible sparkle mark for a more realistic retry case.",
    height: 337,
    imageLabel: "Compressed image retry",
    imageSrc: "/demo/demo-02-compressed-sparkle-before.webp",
    sourceName: "demo-02-compressed-sparkle-before.webp",
    title: "Lightly compressed sample",
    width: 480,
  },
]

const privacyUseCards = [
  {
    description:
      "Your selected image stays in the current browser session while the cleanup runs.",
    title: "Processed in your browser",
  },
  {
    description:
      "The v1 cleanup flow does not require sending the image to a remote processing server.",
    title: "No server upload for cleanup",
  },
  {
    description:
      "This version targets the visible Gemini-style sparkle mark and similar small corner overlays.",
    title: "Visible marks only",
  },
  {
    description: "Only clean images you own or are allowed to modify.",
    title: "Use only on images you can edit",
  },
]

const footerProductItems = [
  "Gemini Watermark Remover",
  "Remove Gemini Watermark",
  "Local browser image tool",
  "No upload required",
]

const footerHelpLinks = [
  { href: "#how-title", label: "How it works" },
  { href: "#faq-title", label: "FAQ" },
  { href: "#privacy-use-title", label: "Responsible use" },
]

const footerLegalLinks = [
  { href: "/privacy-policy/", label: "Privacy policy" },
  { href: "/terms-of-service/", label: "Terms of service" },
  { href: "/trademark-notice/", label: "Trademark notice" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
]

export function HomePageContent() {
  return (
    <div className="page-shell">
      <header className="masthead">
        <section className="hero" id="top">
          <input
            id="file-input"
            className="sr-only"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-label="Upload image file"
            tabIndex={-1}
          />
          <p className="eyebrow">Free browser tool to remove Gemini watermark</p>
          <h1>Gemini Watermark Remover</h1>
          <p className="hero-description">
            Remove Gemini watermark overlays and similar small corner marks from
            your image in seconds.
          </p>
          <p className="hero-support">
            Everything runs in your browser.{" "}
            <a className="inline-link" href="/privacy-policy/">
              No upload
            </a>
            , no sign-up, and no remote AI model required.
          </p>

          <div
            id="empty-dropzone"
            className="hero-console dropzone hero-dropzone"
            aria-labelledby="hero-console-title"
          >
            <div className="hero-illustration" aria-hidden="true">
              <div className="hero-card hero-card-before">
                <div className="hero-card-top">
                  <span className="mini-tag">IMG</span>
                  <span className="mini-line"></span>
                </div>
                <span className="hero-sparkle"></span>
              </div>
              <div className="hero-arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h14m-5-5 5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="hero-card hero-card-after">
                <div className="hero-card-top">
                  <span className="mini-tag">IMG</span>
                  <span className="mini-line"></span>
                </div>
              </div>
            </div>

            <div className="hero-proof">
              <span className="proof-chip proof-chip-muted">
                Before: Gemini watermark
              </span>
              <span className="proof-chip proof-chip-success">
                After: cleaner corner
              </span>
            </div>

            <div className="hero-actions">
              <label
                htmlFor="file-input"
                id="hero-upload-button"
                className="button button-primary button-dark"
                role="button"
                tabIndex={0}
              >
                <span id="hero-console-title">Upload an image</span>
              </label>
              <p className="drag-hint">Or drag and drop files here</p>
              <div className="hero-meta">
                <span>JPG, PNG, or WebP up to 10MB</span>
                <span>Your image never leaves your browser.</span>
                <span>
                  Best when you need to remove Gemini watermark overlays and
                  similar small corner marks.
                </span>
              </div>
              <span
                id="upload-feedback"
                className="state-note"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                Choose an image to remove Gemini watermark overlays locally.
              </span>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="section trust-section" aria-labelledby="trust-title">
          <div className="section-heading section-heading-centered">
            <p className="section-eyebrow">Trust signals</p>
            <h2 id="trust-title">Free, private, and ready in your browser</h2>
            <p>
              The core promise stays simple: upload an image, clean the visible
              mark locally, and review the result before you download.
            </p>
          </div>

          <div className="trust-signal-grid" aria-label="Core product signals">
            {trustSignals.map((signal) => (
              <article key={signal.label} className="trust-signal-card">
                <span className="tag tag-blue">{signal.label}</span>
                <p>{signal.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section example-gallery-section"
          aria-labelledby="examples-title"
        >
          <div className="section-heading section-heading-centered">
            <p className="section-eyebrow">Try an example</p>
            <h2 id="examples-title">
              Start with a verified demo before you upload
            </h2>
            <p>
              These two real examples show how the browser-only cleanup handles
              a standard visible sparkle and a lightly compressed variant of the
              same mark.
            </p>
          </div>

          <div className="example-gallery-grid">
            {demoExamples.map((example) => (
              <article key={example.sourceName} className="example-demo-card">
                <div className="example-demo-media">
                  <img
                    className="result-static-card"
                    src={example.imageSrc}
                    alt={example.alt}
                    width={example.width}
                    height={example.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="example-demo-label">{example.imageLabel}</span>
                </div>
                <div className="example-demo-body">
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                  <button
                    className="button button-secondary example-demo-button"
                    data-demo-src={example.imageSrc}
                    data-demo-name={example.sourceName}
                    type="button"
                  >
                    {example.buttonLabel}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section state-lab tool-workspace is-hidden"
          id="tool"
          aria-labelledby="tool-title"
        >
          <h2 id="tool-title" className="sr-only">
            Gemini watermark cleanup workspace
          </h2>
          <div className="state-panels">
            <article className="state-panel" data-state-panel="processing">
              <div className="state-head">
                <div>
                  <span className="state-brand">
                    Gemini Watermark Remover
                  </span>
                  <h3>Preparing your Gemini watermark preview</h3>
                  <p>
                    The tool is checking the image and preparing a first removal
                    pass for the Gemini watermark. Keep this tab open while the
                    preview is generated.
                  </p>
                </div>
                <span className="tag tag-warm">Removal in progress</span>
              </div>

              <div className="state-card state-card-split">
                <div className="media-surface media-workspace">
                  <img
                    id="processing-image"
                    className="preview-image"
                    alt="Uploaded image being processed locally"
                  />
                </div>

                <div className="status-panel">
                  <h4>Checking the Gemini watermark area</h4>
                  <div className="progress-track" aria-hidden="true">
                    <span className="progress-fill"></span>
                  </div>
                  <p>
                    If the Gemini watermark is missed, you can switch to manual
                    mode after this step.
                  </p>
                  <p className="status-note">
                    Large images may take longer. If the first pass is not clean
                    enough, use manual mode for a tighter target.
                  </p>
                  <p
                    id="processing-meta"
                    className="state-note"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    First Gemini watermark pass is running.
                  </p>
                </div>
              </div>
            </article>

            <article className="state-panel" data-state-panel="success">
              <div className="state-head">
                <div>
                  <span className="state-brand">
                    Gemini Watermark Remover
                  </span>
                  <h3>Your Gemini watermark cleanup is ready</h3>
                  <p>
                    Auto mode checks the usual lower-right Gemini watermark area
                    and prepares a clean preview before download.
                  </p>
                </div>
                <span className="tag tag-success">Auto cleanup ready</span>
              </div>

              <div className="state-card state-card-stack">
                <div
                  className="compare-slider"
                  id="compare-slider"
                  tabIndex={0}
                  role="slider"
                  aria-label="Compare before and after cleanup"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={50}
                  aria-orientation="horizontal"
                >
                  <div className="compare-slider-layer compare-slider-before">
                    <span className="compare-label">Before</span>
                    <img
                      id="before-image"
                      className="preview-image"
                      alt="Before cleanup preview"
                    />
                  </div>
                  <div className="compare-slider-layer compare-slider-after">
                    <span className="compare-label compare-label-after">
                      After
                    </span>
                    <img
                      id="after-image"
                      className="preview-image"
                      alt="After cleanup preview"
                    />
                  </div>
                  <div className="compare-slider-handle" id="compare-handle">
                    <span className="compare-slider-grip"></span>
                  </div>
                  <p className="compare-slider-hint">
                    Drag or use arrow keys to compare
                  </p>
                </div>

                <div className="state-actions">
                  <div className="action-row">
                    <button
                      id="download-button"
                      className="button button-primary"
                      type="button"
                    >
                      Download clean image
                    </button>
                    <button
                      id="reset-button"
                      className="button button-secondary"
                      type="button"
                    >
                      Try another image
                    </button>
                  </div>

                  <p
                    id="success-meta"
                    className="state-note state-note-success"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    Automatic cleanup is ready. Check the lower-right corner,
                    then download if it looks clean.
                  </p>
                </div>
              </div>
            </article>

            <article className="state-panel" data-state-panel="miss">
              <div className="state-head">
                <div>
                  <span className="state-brand">
                    Gemini Watermark Remover
                  </span>
                  <h3>We could not confidently find the Gemini watermark</h3>
                  <p>
                    Try manual mode for more precise removal, or rerun
                    auto-detect if the Gemini watermark is near the image
                    corner.
                  </p>
                </div>
                <span className="tag tag-error">Auto-detect needs help</span>
              </div>

              <div className="state-card state-card-split">
                <div className="media-surface media-texture">
                  <img
                    id="miss-image"
                    className="preview-image"
                    alt="Preview when automatic detection misses the mark"
                  />
                </div>

                <div className="status-panel">
                  <h4>Try the guided fallback</h4>
                  <p>
                    Use the manual box to tag the Gemini watermark area and run
                    removal again locally.
                  </p>
                  <div className="action-column">
                    <button
                      id="manual-mode-button"
                      className="button button-brand"
                      type="button"
                    >
                      Select Gemini watermark manually
                    </button>
                    <button
                      id="retry-button"
                      className="button button-secondary"
                      type="button"
                    >
                      Retry auto-detect
                    </button>
                    <button
                      id="miss-advanced-button"
                      className="button button-secondary"
                      type="button"
                    >
                      Try Advanced Engine
                    </button>
                  </div>
                  <p
                    id="miss-message"
                    className="status-note status-note-warm"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    If the image is heavily cropped or textured, manual mode
                    usually works better.
                  </p>
                </div>
              </div>
            </article>

            <article className="state-panel" data-state-panel="manual">
              <div className="state-head">
                <div>
                  <span className="state-brand">
                    Gemini Watermark Remover
                  </span>
                  <h3>Select the Gemini watermark area</h3>
                  <p>
                    Drag a small box around the Gemini watermark, then run
                    removal again locally.
                  </p>
                </div>
                <span className="tag tag-blue">Manual selection mode</span>
              </div>

              <div className="state-card state-card-stack">
                <div
                  id="manual-surface"
                  className="selection-surface media-workspace"
                  tabIndex={0}
                  aria-label="Manual selection area. Drag to place the cleanup box, or use arrow keys to move it and Shift plus arrow keys to resize it."
                >
                  <img
                    id="manual-image"
                    className="preview-image"
                    alt="Manual selection preview"
                  />
                  <div className="selection-hint">
                    Drag the box around the Gemini watermark. Use arrow keys
                    after focus for fine adjustment.
                  </div>
                  <div id="selection-box" className="selection-box is-hidden">
                    <span className="selection-handle"></span>
                  </div>
                </div>

                <div className="state-actions">
                  <div className="action-row">
                    <button
                      id="apply-manual-button"
                      className="button button-primary"
                      type="button"
                    >
                      Apply cleanup
                    </button>
                    <button
                      id="retry-auto-button"
                      className="button button-secondary"
                      type="button"
                    >
                      Retry auto-detect
                    </button>
                    <button
                      id="manual-advanced-button"
                      className="button button-secondary"
                      type="button"
                    >
                      Advanced Engine
                    </button>
                  </div>
                  <span className="state-meta state-meta-brand">
                    Gemini Watermark Remover runs locally
                  </span>
                  <span
                    id="manual-selection-note"
                    className="state-note"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    Start with a tight square around the Gemini watermark.
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="how-title">
          <div className="section-heading section-heading-centered">
            <p className="section-eyebrow">How it works</p>
            <h2 id="how-title">How Gemini Watermark Remover works</h2>
            <p>
              Upload an image, remove Gemini watermark overlays locally, then
              review the cleaned result before downloading.
            </p>
          </div>

          <div className="how-grid">
            <article className="step-card step-card-illustrated">
              <div className="step-visual step-visual-upload" aria-hidden="true">
                <div className="step-upload-drop">
                  <span className="step-upload-label">Add image</span>
                </div>
                <div className="step-upload-preview"></div>
              </div>
              <span className="step-number">1</span>
              <h3>Upload your image or try a sample</h3>
              <p>
                Start with your own JPG, PNG, or WebP file, or load an example
                first to see Gemini Watermark Remover on a corner watermark.
              </p>
            </article>

            <article className="step-card step-card-illustrated">
              <div className="step-visual step-visual-detect" aria-hidden="true">
                <div className="step-detect-panel">Detecting Gemini watermark</div>
                <span className="step-detect-sparkle"></span>
              </div>
              <span className="step-number">2</span>
              <h3>Detect and remove the visible mark in your browser</h3>
              <p>
                The tool checks the likely corner area first. If the visible
                mark is still there, use manual mode for a closer pass.
              </p>
            </article>

            <article className="step-card step-card-illustrated">
              <div className="step-visual step-visual-download" aria-hidden="true">
                <div className="step-download-preview"></div>
                <div className="step-download-badge"></div>
              </div>
              <span className="step-number">3</span>
              <h3>Preview and download the cleaned image</h3>
              <p>
                Check the result, rerun with manual mode if needed, then save
                the cleaned image.
              </p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="limits-title">
          <div className="section-heading">
            <p className="section-eyebrow">Works best for</p>
            <h2 id="limits-title">
              Visible Gemini-style marks on simple corner areas
            </h2>
            <p>
              Gemini Watermark Remover is built for visible marks only. Use it
              when you need to remove Gemini watermark overlays that stay small
              and easy to review before download.
            </p>
          </div>

          <div className="limits-grid">
            <article className="info-card info-card-positive">
              <h3>Works best for</h3>
              <ul>
                <li>Visible Gemini sparkle watermarks</li>
                <li>Small corner logos and icons</li>
                <li>Simple visible marks on clean backgrounds</li>
                <li>Fast cleanup before download or sharing</li>
              </ul>
            </article>

            <article className="info-card info-card-warm">
              <h3>Know the limits</h3>
              <p>
                Large overlays, marks over faces or dense texture, heavily
                cropped or severely recompressed images, SynthID, invisible
                watermarks, provenance metadata, and video are outside the
                reliable range of this version.
              </p>
            </article>
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="section-eyebrow">FAQ</p>
            <h2 id="faq-title">FAQ for Gemini Watermark Remover</h2>
            <p>
              Focused answers about how to remove Gemini watermark overlays,
              local processing, manual mode, and hard limits.
            </p>
          </div>

          <div className="faq-list">
            {HOME_PAGE_FAQ_ITEMS.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="section privacy-use-section"
          id="privacy-use"
          aria-labelledby="privacy-use-title"
        >
          <div className="section-heading">
            <p className="section-eyebrow">Privacy and responsible use</p>
            <h2 id="privacy-use-title">
              Private cleanup with clear boundaries
            </h2>
            <p>
              The tool keeps the cleanup flow inside your browser and stays
              focused on visible Gemini-style marks only.
            </p>
          </div>

          <div className="privacy-use-grid">
            {privacyUseCards.map((card) => (
              <article key={card.title} className="privacy-use-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <p className="privacy-use-disclaimer">
            Not affiliated with, endorsed by, or sponsored by Google LLC.
            Gemini is a trademark of Google LLC. See the{" "}
            <a className="inline-link" href="/trademark-notice/">
              trademark notice
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-grid">
          <section
            className="footer-brand-panel"
            aria-labelledby="footer-brand-title"
          >
            <span className="footer-badge">Free basic tool</span>

            <div className="footer-brand-row">
              <span className="footer-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M12 3.6l1.45 4.35L18 9.4l-4.55 1.45L12 15.2l-1.45-4.35L6 9.4l4.55-1.45L12 3.6z"
                    fill="currentColor"
                  />
                  <path
                    d="M18.25 14.65l.72 2.15 2.13.72-2.13.72-.72 2.15-.72-2.15-2.13-.72 2.13-.72.72-2.15z"
                    fill="currentColor"
                    opacity="0.78"
                  />
                </svg>
              </span>
              <div className="footer-brand-copy">
                <h2 id="footer-brand-title">Gemini Watermark Remover</h2>
                <p>
                  A browser-only tool to remove Gemini watermark overlays and
                  similar small corner marks. Upload, review, and download only
                  when the result looks right.
                </p>
              </div>
            </div>

            <div className="footer-pills" aria-label="Product facts">
              <span className="footer-pill">No upload</span>
              <span className="footer-pill">100% in your browser</span>
              <span className="footer-pill">JPG, PNG, WebP</span>
            </div>

            <p className="footer-note">
              Not affiliated with, endorsed by, or sponsored by Google LLC.
              Gemini is a trademark of Google LLC.
            </p>
          </section>

          <div className="footer-nav" aria-label="Footer">
            <section
              className="footer-column"
              aria-labelledby="footer-product-title"
            >
              <p className="footer-column-title" id="footer-product-title">
                Product
              </p>
              <ul className="footer-list">
                {footerProductItems.map((item) => (
                  <li key={item} className="footer-item">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <nav className="footer-column" aria-labelledby="footer-help-title">
              <p className="footer-column-title" id="footer-help-title">
                Help
              </p>
              <ul className="footer-list">
                {footerHelpLinks.map((link) => (
                  <li key={link.href}>
                    <a className="footer-item footer-link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <section
              className="footer-column"
              aria-labelledby="footer-legal-title"
            >
              <p className="footer-column-title" id="footer-legal-title">
                Legal
              </p>
              <ul className="footer-list">
                {footerLegalLinks.map((link) => (
                  <li key={link.href}>
                    <a className="footer-item footer-link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 GeminiWatermarkRemover.best. All rights reserved.</p>
          <p className="footer-language">
            <span className="footer-language-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M3.8 12h16.4M12 3.8c2.3 2.2 3.6 5.1 3.6 8.2S14.3 18 12 20.2M12 3.8C9.7 6 8.4 8.9 8.4 12s1.3 6 3.6 8.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>English</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
