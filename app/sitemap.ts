import type { MetadataRoute } from "next"
import { siteUrl } from "../lib/site-config"

const homeLastModified = new Date("2026-04-24T00:00:00.000Z")
const privacyLastModified = new Date("2026-04-19T00:00:00.000Z")
const legalLastModified = new Date("2026-04-17T00:00:00.000Z")

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy-policy/`,
      lastModified: privacyLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service/`,
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/trademark-notice/`,
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
