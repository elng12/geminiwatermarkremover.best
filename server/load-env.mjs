import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const rootDir = join(__dirname, "..")
const ENV_FILES = [".env.local", ".env"]

function parseEnvLine(line) {
  const trimmed = line.trim()

  if (!trimmed || trimmed.startsWith("#")) {
    return null
  }

  const separatorIndex = trimmed.indexOf("=")
  if (separatorIndex <= 0) {
    return null
  }

  const key = trimmed.slice(0, separatorIndex).trim()
  let value = trimmed.slice(separatorIndex + 1).trim()

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }

  return { key, value }
}

export function loadLocalEnv() {
  for (const fileName of ENV_FILES) {
    const filePath = join(rootDir, fileName)

    if (!existsSync(filePath)) {
      continue
    }

    const content = readFileSync(filePath, "utf8")
    const lines = content.split(/\r?\n/)

    for (const line of lines) {
      const parsed = parseEnvLine(line)

      if (!parsed || process.env[parsed.key]) {
        continue
      }

      process.env[parsed.key] = parsed.value
    }
  }
}
