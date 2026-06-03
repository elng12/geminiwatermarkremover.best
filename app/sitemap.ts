import type { MetadataRoute } from "next"
import { siteUrl } from "../lib/site-config"

const homeLastModified = new Date("2026-06-03T00:00:00.000Z")
const guideLastModified = new Date("2026-06-03T00:00:00.000Z")
const aboutLastModified = new Date("2026-06-03T00:00:00.000Z")
const faqLastModified = new Date("2026-06-03T00:00:00.000Z")
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
      images: [
        `${siteUrl}/demo/demo-01-sparkle-before.webp`,
        `${siteUrl}/og/og-home.png`,
      ],
    },
    {
      url: `${siteUrl}/how-to-remove-gemini-watermark/`,
      lastModified: guideLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faq/`,
      lastModified: faqLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about/`,
      lastModified: aboutLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
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
