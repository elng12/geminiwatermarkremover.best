const DEFAULT_SITE_URL = "https://geminiwatermarkremover.best"

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return DEFAULT_SITE_URL

  const trimmed = value.trim()
  if (!trimmed) return DEFAULT_SITE_URL

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    return new URL(candidate).origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
)

export const siteMetadataBase = new URL(siteUrl)
