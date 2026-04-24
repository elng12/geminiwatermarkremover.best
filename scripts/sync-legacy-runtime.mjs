import { cpSync, mkdirSync, rmSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const legacyRoot = join(root, "public", "legacy")

const copyTargets = [
  ["src/bootstrap.js", "bootstrap.js"],
  ["src/app.js", "app.js"],
  ["src/processing-bridge.js", "processing-bridge.js"],
  ["src/watermark-templates.js", "watermark-templates.js"],
  ["src/vendor/gemini-watermark-remover", "vendor/gemini-watermark-remover"],
]

rmSync(legacyRoot, { recursive: true, force: true })
mkdirSync(legacyRoot, { recursive: true })

for (const [source, destination] of copyTargets) {
  cpSync(join(root, source), join(legacyRoot, destination), {
    recursive: true,
    force: true,
  })
}
