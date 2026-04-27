import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested does not exist.",
  robots: { index: false, follow: false },
}

export default function NotFoundPage() {
  return (
    <main className="legal-shell" id="main-content">
      <header className="legal-header">
        <div className="legal-topbar">
          <a className="legal-backlink" href="/">
            Back to homepage
          </a>
          <span className="legal-chip">404</span>
        </div>
        <h1>Page not found</h1>
        <p className="legal-lead">
          The page you requested does not exist. Return to the homepage to use
          the browser-based Gemini watermark cleanup tool.
        </p>
      </header>
    </main>
  )
}
