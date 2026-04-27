const CONTACT_EMAIL = "2296744453m@gmail.com"
const SITE_NAME = "GeminiWatermarkRemover.best"
const SITE_URL = "https://geminiwatermarkremover.best"

const HOME_PAGE_TITLE =
  "Gemini Watermark Remover - Free & Private Browser Tool"
const HOME_PAGE_DESCRIPTION =
  "Remove Gemini watermark overlays from your AI images free in your browser. No upload, no sign-up, no install. Try it now on JPG, PNG, or WebP."

const HOME_PAGE_FAQ_ITEMS = [
  {
    question: "How do I remove the Gemini watermark from my image for free?",
    answer:
      "Upload a JPG, PNG, or WebP file directly on this page. The tool processes the image locally in your browser at no cost, with no sign-up, credits, or account setup. Review the result and download it if it looks clean.",
  },
  {
    question: "Is my image safe when using an online watermark remover?",
    answer:
      "Yes. Your image is decoded and processed entirely in your browser session. It is never uploaded to a remote cleanup server, and no server-side AI model is involved. The file stays on your device.",
  },
  {
    question: "What is the Gemini watermark on Google AI images?",
    answer:
      "Google Gemini adds a small visible sparkle mark in the bottom-right corner of AI-generated images to indicate the image was created by its AI. This is separate from SynthID, Google's invisible watermark system embedded in pixel data.",
  },
  {
    question: "Can you remove the Gemini sparkle watermark without Photoshop?",
    answer:
      "Yes. This browser-based tool removes the visible sparkle watermark without requiring Photoshop, desktop software, or browser extensions. Upload your image, and the cleanup runs locally in your browser.",
  },
  {
    question: "Does removing the Gemini watermark affect image quality?",
    answer:
      "The tool edits only the watermark area and exports a cleaned copy. JPG and WebP exports may change compression or metadata, so keep your original file if you need a perfect source copy. Review the before-and-after comparison before downloading.",
  },
  {
    question: "What is the difference between SynthID and the visible Gemini watermark?",
    answer:
      "The visible Gemini watermark is a small sparkle icon in the corner that you can see. SynthID is an invisible digital signal embedded in the pixel data. This tool only targets the visible sparkle mark — it does not remove SynthID, invisible watermarks, provenance metadata, or C2PA data.",
  },
  {
    question: "What file types does the Gemini watermark remover support?",
    answer:
      "JPG, PNG, and WebP images are supported. Files should be under 10MB so the browser can process them reliably.",
  },
  {
    question: "Does the Gemini watermark remover work on mobile?",
    answer:
      "Yes. You can upload, review, and download from a phone browser. Very large images or older mobile devices may take longer because the processing happens locally in your browser.",
  },
  {
    question: "How do I manually select the Gemini watermark area?",
    answer:
      "Use manual mode to draw a tight box around the visible mark and run cleanup again. Manual mode is usually better for cropped, compressed, or textured images where auto-detect may miss the mark.",
  },
  {
    question: "Why can a Gemini watermark still remain after cleanup?",
    answer:
      "Some images have dense texture, heavy compression, or a changed watermark shape. In those cases, the browser pass may leave residue. Try manual mode for a tighter selection, or use the Advanced Engine for a deeper cleanup pass — both still run locally.",
  },
  {
    question: "Is this the same as AI inpainting?",
    answer:
      "No. The current version uses local browser cleanup methods for small visible overlays. It does not send your image to a server-side AI repair or inpainting model. All processing happens on your device.",
  },
  {
    question: "Can it remove watermarks from video?",
    answer:
      "No. This site is for still images only. Video watermark removal, frame extraction, and batch video processing are outside the scope of this version.",
  },
  {
    question: "Can I use this tool on any image?",
    answer:
      "Only use it on images you own or have permission to modify. The tool is designed for legitimate editing workflows where you are allowed to process the file.",
  },
  {
    question: "Do I need to install an app or Chrome extension?",
    answer:
      "No. The cleanup flow runs directly on this web page in a modern browser, so you do not need to install desktop software, a Chrome extension, or any browser add-on.",
  },
  {
    question: "Does the Gemini watermark remover support batch removal?",
    answer:
      "Not yet. The current version processes one image at a time so each result can be reviewed before download.",
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
      "@id": `${SITE_URL}/#howto`,
      "@type": "HowTo",
      name: "How to Remove Gemini Watermarks",
      description: "Step-by-step guide to removing visible Gemini watermark overlays in your browser.",
      isPartOf: { "@id": `${SITE_URL}/#webapp` },
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload your image",
          text: "Start with your own JPG, PNG, or WebP file, or load an example first to see the tool on a corner watermark.",
          url: `${SITE_URL}/#how-title`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Detect and remove the visible mark",
          text: "The tool checks the likely corner area first. If the visible mark is still there, use manual mode for a closer pass.",
          url: `${SITE_URL}/#how-title`,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Preview and download the cleaned image",
          text: "Check the result, rerun with manual mode if needed, then save the cleaned image.",
          url: `${SITE_URL}/#how-title`,
        },
      ],
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
