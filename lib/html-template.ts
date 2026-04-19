import { readFileSync } from "node:fs"
import { join } from "node:path"

const BODY_REGEX = /<body[^>]*>([\s\S]*?)<\/body>/i
const DESCRIPTION_REGEX = /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i
const JSON_LD_REGEX =
  /<script\s+type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/i
const SCRIPT_TAG_REGEX = /<script\b[^>]*>[\s\S]*?<\/script>/gi
const TITLE_REGEX = /<title>([\s\S]*?)<\/title>/i

function readHtml(relativePath: string) {
  return readFileSync(join(/* turbopackIgnore: true */ process.cwd(), relativePath), "utf8")
}

export function getBodyHtml(relativePath: string) {
  const html = readHtml(relativePath)
  const bodyMatch = html.match(BODY_REGEX)

  if (!bodyMatch) {
    throw new Error(`Could not find <body> in ${relativePath}`)
  }

  return bodyMatch[1].replace(SCRIPT_TAG_REGEX, "").trim()
}

export function getDocumentMeta(relativePath: string) {
  const html = readHtml(relativePath)
  const title = html.match(TITLE_REGEX)?.[1]?.trim()
  const description = html.match(DESCRIPTION_REGEX)?.[1]?.trim()

  if (!title || !description) {
    throw new Error(`Missing title or description in ${relativePath}`)
  }

  return { title, description }
}

export function getJsonLd(relativePath: string) {
  const html = readHtml(relativePath)
  return html.match(JSON_LD_REGEX)?.[1]?.trim() ?? null
}
