type LegacyToolPageProps = {
  html: string
  jsonLd?: string | null
}

export function LegacyToolPage({ html, jsonLd }: LegacyToolPageProps) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      ) : null}
      <script type="module" src="/legacy/app.js" />
    </>
  )
}
