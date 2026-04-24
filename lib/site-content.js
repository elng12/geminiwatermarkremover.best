const CONTACT_EMAIL = "2296744453m@gmail.com"
const SITE_NAME = "GeminiWatermarkRemover.best"
const SITE_URL = "https://geminiwatermarkremover.best"

const HOME_PAGE_TITLE =
  "Gemini Watermark Remover | Remove Gemini Watermark Online"
const HOME_PAGE_DESCRIPTION =
  "Remove Gemini watermark overlays from Google AI images in your browser. Free local preview, no upload, no sign-up, and clear limits for SynthID."

const HOME_PAGE_FAQ_ITEMS = [
  {
    question: "Can I remove Gemini watermark for free?",
    answer:
      "Yes. The current basic version is free to use, with no sign-up, credits, or account setup. You can upload an image, review the result, and decide whether to download it.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account is required. The upload and cleanup flow starts directly on the page, so there is no login step before you can test an image.",
  },
  {
    question: "Will my image be uploaded?",
    answer:
      "No. In this version, the selected image is decoded and processed in your browser session instead of being sent to a remote cleanup server.",
  },
  {
    question: "What kind of Gemini watermark can it remove?",
    answer:
      "The tool is built for visible Google Gemini-style sparkle marks and similar small corner overlays. It works best when the mark sits on a simple background and is easy to inspect after cleanup.",
  },
  {
    question: "Does it remove SynthID or invisible watermarks?",
    answer:
      "No. It only targets visible corner marks. It does not remove SynthID, invisible watermarks, provenance metadata, C2PA data, or other authenticity systems.",
  },
  {
    question: "What file types are supported?",
    answer:
      "JPG, PNG, and WebP images are supported in the current version. Files should be under 10MB so the browser can process them reliably.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. You can upload, review, and download from a phone browser. Very large images or older mobile devices may take longer because the processing happens locally.",
  },
  {
    question: "How do I remove Gemini watermark manually?",
    answer:
      "Use manual mode to draw a tight square around the visible mark and run cleanup again. Manual mode is usually better for cropped, compressed, or textured images.",
  },
  {
    question: "Why can a mark still remain after cleanup?",
    answer:
      "Some images have dense texture, heavy compression, or a changed watermark shape. In those cases, the browser pass may leave residue, so you should inspect the result before using or sharing it.",
  },
  {
    question: "Is this the same as AI inpainting?",
    answer:
      "No. The current version uses local browser cleanup methods for small visible overlays. It does not send your image to a server-side AI repair or inpainting model.",
  },
  {
    question: "Can it remove video watermarks?",
    answer:
      "No. This site is for still images only. Video watermark removal, frame extraction, and batch video processing are outside the scope of this version.",
  },
  {
    question: "Can I use it on any image?",
    answer:
      "Only use it on images you own or have permission to modify. The tool is designed for legitimate editing workflows where you are allowed to process the file.",
  },
  {
    question: "Do I need to install an app or Chrome extension?",
    answer:
      "No. The cleanup flow runs directly on this web page in a modern browser, so you do not need to install desktop software or a browser extension.",
  },
  {
    question: "Does it support batch removal?",
    answer:
      "Not yet. The current version processes one image at a time so each result can be reviewed before download.",
  },
  {
    question: "Will the cleaned image keep the same quality?",
    answer:
      "The tool edits the target area and exports a cleaned copy. JPG and WebP exports may change compression or metadata, so keep your original file if you need a perfect source copy.",
  },
]

const HOME_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      email: CONTACT_EMAIL,
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@id": `${SITE_URL}/#website`,
      "@type": "WebSite",
      inLanguage: "en",
      name: SITE_NAME,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      url: `${SITE_URL}/`,
    },
    {
      "@id": `${SITE_URL}/#webapp`,
      "@type": "WebApplication",
      applicationCategory: "MultimediaApplication",
      browserRequirements: "Requires a modern browser with Canvas and File API support.",
      description: HOME_PAGE_DESCRIPTION,
      featureList: [
        "Visible Google Gemini watermark cleanup",
        "Local browser image processing",
        "Manual selection fallback",
        "JPG, PNG, and WebP support",
      ],
      inLanguage: "en",
      isAccessibleForFree: true,
      name: "Gemini Watermark Remover",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      operatingSystem: "Any modern browser",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      url: `${SITE_URL}/`,
    },
    {
      "@id": `${SITE_URL}/#faq`,
      "@type": "FAQPage",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      mainEntity: HOME_PAGE_FAQ_ITEMS.map((item, index) => ({
        "@id": `${SITE_URL}/#faq-${index + 1}`,
        "@type": "Question",
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
        name: item.question,
      })),
      mainEntityOfPage: {
        "@id": `${SITE_URL}/#webapp`,
      },
      url: `${SITE_URL}/#faq`,
    },
  ],
}

module.exports = {
  CONTACT_EMAIL,
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_FAQ_ITEMS,
  HOME_PAGE_JSONLD,
  HOME_PAGE_TITLE,
  SITE_URL,
  SITE_NAME,
}
