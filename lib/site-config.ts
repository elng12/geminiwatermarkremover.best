import siteContent from "./site-content"

const { SITE_URL } = siteContent as { SITE_URL: string }

export const siteUrl = SITE_URL
export const siteMetadataBase = new URL(siteUrl)
