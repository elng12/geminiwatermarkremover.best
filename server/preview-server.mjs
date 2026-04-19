import { createReadStream, existsSync, statSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { createServer } from "node:http"
import { extname, join, normalize, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const rootDir = resolve(normalize(join(__dirname, "..")))
const outDir = resolve(rootDir, "out")
const port = Number(process.env.PORT || 4173)
const host = process.env.HOST || "127.0.0.1"

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
}

function getMimeType(pathname) {
  return MIME_TYPES[extname(pathname).toLowerCase()] || "application/octet-stream"
}

function safeResolve(pathname) {
  const decoded = decodeURIComponent(pathname)
  const trimmed = decoded.replace(/^\/+/, "")
  const normalized = normalize(trimmed)
  return resolve(outDir, normalized)
}

function isInsideOut(filePath) {
  return filePath === outDir || filePath.startsWith(`${outDir}${sep}`)
}

function resolveExistingFile(filePath) {
  if (existsSync(filePath)) {
    return filePath
  }

  const htmlPath = `${filePath}.html`
  if (existsSync(htmlPath)) {
    return htmlPath
  }

  const indexPath = join(filePath, "index.html")
  if (existsSync(indexPath)) {
    return indexPath
  }

  return null
}

async function serveStatic(req, res, url) {
  let filePath = safeResolve(url.pathname)

  if (!isInsideOut(filePath)) {
    res.statusCode = 403
    res.end("Forbidden")
    return
  }

  if (url.pathname.endsWith("/")) {
    filePath = join(filePath, "index.html")
  } else if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html")
  } else if (!existsSync(filePath)) {
    filePath = resolveExistingFile(filePath)
  }

  if (!filePath) {
    res.statusCode = 404
    res.end("Not found")
    return
  }

  try {
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      filePath = join(filePath, "index.html")
    }

    res.statusCode = 200
    res.setHeader("Content-Type", getMimeType(filePath))

    if (extname(filePath) === ".html") {
      const html = await readFile(filePath)
      res.end(html)
      return
    }

    createReadStream(filePath).pipe(res)
  } catch {
    res.statusCode = 404
    res.end("Not found")
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || `localhost:${port}`}`)

  await serveStatic(req, res, url)
})

server.listen(port, host, () => {
  console.log(`Preview server running at http://${host}:${port}`)
})
