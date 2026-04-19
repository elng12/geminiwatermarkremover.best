import type { Metadata } from "next"
import { getBodyHtml, getDocumentMeta } from "../../lib/html-template"

const bodyHtml = getBodyHtml("terms-of-service/index.html")
const meta = getDocumentMeta("terms-of-service/index.html")

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/terms-of-service/",
  },
}

export default function TermsOfServicePage() {
  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
}
