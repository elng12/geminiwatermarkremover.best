import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const rootDir = process.cwd()
const outDir = join(rootDir, "out")

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function readOutput(relativePath) {
  const filePath = join(outDir, relativePath)
  assert(existsSync(filePath), `Missing output file: ${relativePath}`)
  return readFileSync(filePath, "utf8")
}

function expectIncludes(text, snippet, message) {
  assert(text.includes(snippet), message)
}

function expectExcludes(text, snippet, message) {
  assert(!text.includes(snippet), message)
}

const homeHtml = readOutput("index.html")
const privacyHtml = readOutput("privacy-policy/index.html")
const termsHtml = readOutput("terms-of-service/index.html")
const trademarkHtml = readOutput("trademark-notice/index.html")
const notFoundHtml = readOutput("404.html")
const sitemapXml = readOutput("sitemap.xml")
const legacyBootstrap = readOutput("legacy/bootstrap.js")

expectIncludes(
  homeHtml,
  'id="compare-slider"',
  "Homepage is missing the before/after compare slider."
)
expectIncludes(
  homeHtml,
  'id="manual-surface"',
  "Homepage is missing the manual selection surface."
)
expectIncludes(
  homeHtml,
  'href="/trademark-notice/"',
  "Homepage footer is missing the trademark notice link."
)
expectIncludes(
  homeHtml,
  'role="status"',
  "Homepage is missing live status regions for accessibility."
)
expectIncludes(
  homeHtml,
  '<script type="module" src="/legacy/bootstrap.js"></script>',
  "Homepage is missing the legacy bootstrap script."
)
expectExcludes(
  homeHtml,
  '<script type="module" src="/legacy/app.js"></script>',
  "Homepage should not eagerly load the legacy runtime script."
)
expectExcludes(
  homeHtml,
  "self.__next_f.push",
  "Homepage still contains Next flight payload data."
)
expectExcludes(
  homeHtml,
  'as="script"',
  "Homepage still contains leftover Next script preload tags."
)
expectExcludes(
  privacyHtml,
  "self.__next_f.push",
  "Privacy policy page still contains Next flight payload data."
)
expectExcludes(
  termsHtml,
  "self.__next_f.push",
  "Terms page still contains Next flight payload data."
)
expectExcludes(
  trademarkHtml,
  "self.__next_f.push",
  "Trademark notice page still contains Next flight payload data."
)
expectExcludes(
  notFoundHtml,
  "self.__next_f.push",
  "404 page still contains Next flight payload data."
)
assert(
  !existsSync(join(outDir, "_not-found")),
  "Static export should not expose the internal _not-found route."
)
expectIncludes(
  sitemapXml,
  "/trademark-notice/",
  "Sitemap is missing the trademark notice route."
)
expectIncludes(
  legacyBootstrap,
  "import(\"./app.js\")",
  "Legacy bootstrap was not synced with the runtime loader."
)

console.log("Smoke test passed.")
