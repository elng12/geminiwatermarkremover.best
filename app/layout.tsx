import type { Metadata } from "next"
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

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
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
      <body>{children}</body>
    </html>
  )
}
