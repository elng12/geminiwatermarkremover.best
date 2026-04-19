import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"

const rootDir = process.cwd()
const outDir = join(rootDir, "out")
const require = createRequire(import.meta.url)
const { HOME_PAGE_JSONLD } = require("../lib/site-content")

const BODY_REGEX = /<body[^>]*>([\s\S]*?)<\/body>/i
const HEAD_REGEX = /<head[^>]*>([\s\S]*?)<\/head>/i
const HTML_TAG_REGEX = /<html\b([^>]*)>/i
const SCRIPT_TAG_REGEX = /<script\b[^>]*>[\s\S]*?<\/script>/gi

const exportTargets = [
  {
    outputPath: "index.html",
    useBuiltBody: true,
    includeLegacyScript: true,
    jsonLd: JSON.stringify(HOME_PAGE_JSONLD),
    cleanupDir: ".",
  },
  {
    outputPath: "privacy-policy/index.html",
    useBuiltBody: true,
    cleanupDir: "privacy-policy",
  },
  {
    outputPath: "terms-of-service/index.html",
    useBuiltBody: true,
    cleanupDir: "terms-of-service",
  },
  {
    outputPath: "trademark-notice/index.html",
    useBuiltBody: true,
    cleanupDir: "trademark-notice",
  },
]

function readOutput(relativePath) {
  return readFileSync(join(outDir, relativePath), "utf8")
}

function getBuiltBodyHtml(html) {
  const match = html.match(BODY_REGEX)

  if (!match) {
    throw new Error(`Could not find <body> in built HTML`)
  }

  return match[1]
    .replace(/<script\b[^>]*src="\/_next\/static\/[^"]*"[^>]*><\/script>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?__next_f[\s\S]*?<\/script>/gi, "")
    .replace(/<!-- -->/g, "")
    .replace(/<!--\$-->|<!--\/\$-->/g, "")
    .replace(/^\s*<div hidden=""><\/div>/i, "")
    .trim()
}

function getHeadHtml(html) {
  const match = html.match(HEAD_REGEX)

  if (!match) {
    throw new Error(`Could not find <head> in built HTML`)
  }

  return match[1]
    .replace(SCRIPT_TAG_REGEX, "")
    .replace(/<link\b[^>]*rel="preload"[^>]*as="script"[^>]*>/gi, "")
    .replace(/<meta\b[^>]*name="next-size-adjust"[^>]*>/gi, "")
    .trim()
}

function getHtmlAttrs(html) {
  return html.match(HTML_TAG_REGEX)?.[1]?.trim() ?? 'lang="en"'
}

function buildStaticShell({
  bodyHtml,
  builtHtml,
  includeLegacyScript,
  jsonLd,
}) {
  const htmlAttrs = getHtmlAttrs(builtHtml)
  const headHtml = getHeadHtml(builtHtml)

  const trailingScripts = []

  if (jsonLd) {
    trailingScripts.push(
      `<script type="application/ld+json">\n${jsonLd}\n</script>`
    )
  }

  if (includeLegacyScript) {
    trailingScripts.push(`<script type="module" src="/legacy/app.js"></script>`)
  }

  const finalBody = [bodyHtml, ...trailingScripts].filter(Boolean).join("\n")

  return `<!doctype html>\n<html ${htmlAttrs}>\n<head>\n${headHtml}\n</head>\n<body>\n${finalBody}\n</body>\n</html>\n`
}

function cleanupFlightArtifacts(relativeDir) {
  const directory = join(outDir, relativeDir)

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile()) continue
    if (entry.name === "index.html") continue
    if (entry.name === "robots.txt") continue
    if (entry.name === "sitemap.xml") continue
    if (entry.name === "icon.svg") continue
    if (entry.name.endsWith(".png") || entry.name.endsWith(".webp")) continue
    if (entry.name.startsWith("__next") || entry.name.endsWith(".txt")) {
      rmSync(join(directory, entry.name), { force: true })
    }
  }
}

for (const target of exportTargets) {
  const builtHtml = readOutput(target.outputPath)
  const bodyHtml = getBuiltBodyHtml(builtHtml)
  const finalHtml = buildStaticShell({
    bodyHtml,
    builtHtml,
    includeLegacyScript: target.includeLegacyScript,
    jsonLd: target.jsonLd,
  })

  writeFileSync(join(outDir, target.outputPath), finalHtml)
  cleanupFlightArtifacts(target.cleanupDir)
}
