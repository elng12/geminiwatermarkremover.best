const CONTACT_EMAIL = "2296744453m@gmail.com"
const SITE_NAME = "GeminiWatermarkRemover.best"

const HOME_PAGE_TITLE =
  "Gemini Watermark Remover Online | Free Local Image Tool"
const HOME_PAGE_DESCRIPTION =
  "Gemini Watermark Remover Online removes a Gemini watermark from AI images for free. Local preview, no upload, no sign-up, and quick cleanup on device."

const HOME_PAGE_FAQ_ITEMS = [
  {
    question: "Is Gemini Watermark Remover Online free?",
    answer:
      "Yes. Gemini Watermark Remover Online is free to use in the current basic version, with no sign-up and no credit system.",
  },
  {
    question: "Do I need an account for Gemini Watermark Remover Online?",
    answer:
      "No. You can start Gemini Watermark Remover Online without creating an account.",
  },
  {
    question: "Does Gemini Watermark Remover Online work on mobile?",
    answer:
      "Yes. Gemini Watermark Remover Online lets you upload, review, and download from your phone.",
  },
  {
    question: "What file types does Gemini Watermark Remover Online support?",
    answer: "JPG, PNG, and WebP are supported in this version.",
  },
  {
    question: "Will Gemini Watermark Remover Online upload my image?",
    answer:
      "No. Gemini Watermark Remover Online runs locally and does not upload the image to a cleanup server.",
  },
  {
    question: "What if Gemini Watermark Remover Online misses the Gemini watermark?",
    answer: "Use manual mode to box the Gemini watermark area and try again.",
  },
  {
    question: "Why can a Gemini watermark still remain after removal?",
    answer:
      "This version uses a focused removal pass for small corner overlays. If the background is complex, the Gemini watermark shape changed, or the corner target is not where expected, the result may need a tighter manual box.",
  },
  {
    question: "Is Gemini Watermark Remover Online the same as AI inpainting?",
    answer:
      "No. Gemini Watermark Remover Online uses local removal methods for small corner overlays. It does not send your image to a server-side AI repair tool.",
  },
  {
    question:
      "Does Gemini Watermark Remover Online remove SynthID or invisible watermarks?",
    answer:
      "No. Gemini Watermark Remover Online is for visible Google Gemini corner overlays only. It does not remove SynthID, invisible watermarks, or provenance metadata.",
  },
  {
    question: "Does Gemini Watermark Remover Online remove video watermarks?",
    answer: "No. Gemini Watermark Remover Online is for images only.",
  },
  {
    question:
      "Does Gemini Watermark Remover Online remove Gemini logos and icons too?",
    answer:
      "It is designed for the Gemini watermark sparkle overlay and similar small corner graphics. Results may vary on other overlays.",
  },
  {
    question: "Does Gemini Watermark Remover Online work for Nano Banana images?",
    answer:
      "It can help when the image contains the same Gemini watermark sparkle. It does not remove SynthID, invisible watermarks, or provenance metadata.",
  },
  {
    question: "Is there a Chrome extension for Gemini Watermark Remover Online?",
    answer:
      "You do not need to install any extension. The tool works directly on this page.",
  },
  {
    question:
      "Does Gemini Watermark Remover Online support bulk or batch removal?",
    answer:
      "Currently, this tool processes images one by one. Bulk or batch removal might be added in the future.",
  },
  {
    question:
      "Do I need to download an app for Gemini Watermark Remover Online on Mac or Windows?",
    answer:
      "No software download is required. Gemini Watermark Remover Online runs directly on this page.",
  },
  {
    question: "Will Gemini Watermark Remover Online keep image quality?",
    answer:
      "The tool edits only the selected area locally and re-exports a cleaned copy for download. On JPG or WebP images, file quality or metadata may change slightly after export.",
  },
]

const HOME_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_PAGE_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
    name: item.question,
  })),
}

module.exports = {
  CONTACT_EMAIL,
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_FAQ_ITEMS,
  HOME_PAGE_JSONLD,
  HOME_PAGE_TITLE,
  SITE_NAME,
}
