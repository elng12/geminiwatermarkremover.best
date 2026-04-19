import type { Metadata } from "next"
import { getBodyHtml, getDocumentMeta } from "../../lib/html-template"

const bodyHtml = getBodyHtml("privacy-policy/index.html")
const meta = getDocumentMeta("privacy-policy/index.html")

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/privacy-policy/",
  },
}

export default function PrivacyPolicyPage() {
  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
}
