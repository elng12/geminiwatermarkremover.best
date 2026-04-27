import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { siteMetadataBase } from "../lib/site-config"
import "./globals.css"

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

const plusJakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
  variable: "--font-plus-jakarta",
  display: "swap",
})

const sora = localFont({
  src: "./fonts/sora-latin.woff2",
  weight: "100 800",
  variable: "--font-sora",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#2563eb",
}

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: {
    default: "Gemini Watermark Remover - Free & Private Browser Tool",
    template: "%s | Gemini Watermark Remover",
  },
  description:
    "Remove Gemini watermark overlays from Google AI images in your browser. Free local preview, no upload, no sign-up.",
  openGraph: {
    siteName: "GeminiWatermarkRemover.best",
    locale: "en_US",
    type: "website",
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${sora.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <nav className="topbar" aria-label="Site navigation">
          <a className="topbar-brand" href="/">Gemini Watermark Remover</a>
          <div className="topbar-links">
            <a className="topbar-link" href="/#how-title">How it works</a>
            <a className="topbar-link" href="/faq/">FAQ</a>
            <a className="topbar-link" href="/about/">About</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
