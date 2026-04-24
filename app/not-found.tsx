export default function NotFoundPage() {
  return (
    <main className="legal-shell">
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
