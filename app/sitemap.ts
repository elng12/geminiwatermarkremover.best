import type { MetadataRoute } from "next"

const siteUrl = "https://geminiwatermarkremover.best"
const lastModified = new Date("2026-04-18T00:00:00.000Z")

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy-policy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
