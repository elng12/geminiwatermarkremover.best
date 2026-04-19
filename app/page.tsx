import type { Metadata } from "next"
import { LegacyToolPage } from "../components/legacy-tool-page"
import { getBodyHtml, getDocumentMeta, getJsonLd } from "../lib/html-template"

const bodyHtml = getBodyHtml("index.html")
const jsonLd = getJsonLd("index.html")
const meta = getDocumentMeta("index.html")

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
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
    title: meta.title,
    description: meta.description,
    images: ["/og/og-home.png"],
  },
}

export default function HomePage() {
  return <LegacyToolPage html={bodyHtml} jsonLd={jsonLd} />
}
