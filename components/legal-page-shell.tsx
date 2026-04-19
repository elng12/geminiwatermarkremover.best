import type { ReactNode } from "react"

type LegalNavLink = {
  href: string
  label: string
}

type LegalPageShellProps = {
  children: ReactNode
  contentLabel: string
  footerLinks: LegalNavLink[]
  lead: string
  title: string
  updatedAt: string
}

export function LegalPageShell({
  children,
  contentLabel,
  footerLinks,
  lead,
  title,
  updatedAt,
}: LegalPageShellProps) {
  return (
    <main className="legal-shell">
      <header className="legal-header">
        <div className="legal-topbar">
          <a className="legal-backlink" href="/">
            Back to homepage
          </a>
          <span className="legal-chip">Legal</span>
        </div>
        <h1>{title}</h1>
        <p className="legal-lead">{lead}</p>
        <div className="legal-meta">
          <span>Last updated: {updatedAt}</span>
          <span>Applies to: GeminiWatermarkRemover.best</span>
        </div>
      </header>

      <section className="legal-card" aria-label={contentLabel}>
        {children}

        <footer className="legal-footer">
          <nav className="legal-footer-nav" aria-label="Legal navigation">
            {footerLinks.map((link) => (
              <a key={link.href} className="footer-link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <span className="legal-footer-copy">
            &copy; 2026 GeminiWatermarkRemover.best
          </span>
        </footer>
      </section>
    </main>
  )
}
