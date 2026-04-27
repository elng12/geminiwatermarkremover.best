import type { Metadata } from "next"
import siteContent from "../../lib/site-content"

const { SITE_URL, HOME_PAGE_FAQ_ITEMS } = siteContent as {
  SITE_URL: string
  HOME_PAGE_FAQ_ITEMS: Array<{ question: string; answer: string }>
}

const title = "FAQ"
const description =
  "Frequently asked questions about removing Gemini watermarks, browser-based processing, supported formats, privacy, and limitations."

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "FAQ" },
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_PAGE_FAQ_ITEMS.map((item, index) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
    "@id": `${SITE_URL}/faq/#faq-${index + 1}`,
  })),
}

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/faq/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/faq/",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="legal-shell" id="main-content">
        <header className="legal-header">
          <div className="legal-topbar">
            <a className="legal-backlink" href="/">
              Back to homepage
            </a>
            <span className="legal-chip">FAQ</span>
          </div>
          <h1>Frequently Asked Questions</h1>
          <p className="legal-lead">
            Answers to common questions about removing Gemini watermarks,
            browser-based processing, privacy, and what this tool can and cannot
            do.
          </p>
        </header>

        <section className="legal-card" aria-label="FAQ content">
          <div className="faq-list">
            {HOME_PAGE_FAQ_ITEMS.map((item, index) => (
              <details key={item.question} id={`faq-${index + 1}`}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>

          <footer className="legal-footer">
            <nav className="legal-footer-nav" aria-label="FAQ navigation">
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
