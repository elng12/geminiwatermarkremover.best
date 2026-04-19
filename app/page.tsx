import type { Metadata } from "next"
import { HomePageContent } from "../components/home-page-content"
import siteContent from "../lib/site-content"

const { HOME_PAGE_DESCRIPTION, HOME_PAGE_JSONLD, HOME_PAGE_TITLE } =
  siteContent as {
    HOME_PAGE_DESCRIPTION: string
    HOME_PAGE_JSONLD: Record<string, unknown>
    HOME_PAGE_TITLE: string
  }

export const metadata: Metadata = {
  title: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    type: "website",
    url: "/",
    images: [
      {
        url: "/og/og-home.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    images: ["/og/og-home.png"],
  },
}

export default function HomePage() {
  return (
    <>
      <HomePageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_PAGE_JSONLD) }}
      />
      <script type="module" src="/legacy/app.js" />
    </>
  )
}
