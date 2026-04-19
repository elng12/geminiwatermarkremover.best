import { spawn } from "node:child_process"
import { mkdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { createServer } from "node:net"
import { deflateSync } from "node:zlib"
import process from "node:process"
import { chromium } from "playwright"

const rootDir = process.cwd()
const outputDir = join(rootDir, "output", "playwright")
const downloadDir = join(outputDir, "downloads")
const autoUploadCandidates = [
  {
    expectedExtension: ".png",
    filePath: join(rootDir, "public", "demo", "demo-01-sparkle-before.png"),
    label: "standard demo image",
  },
  {
    expectedExtension: ".webp",
    filePath: join(rootDir, "public", "demo", "demo-02-compressed-sparkle-before.webp"),
    label: "compressed demo image",
  },
]

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const CRC_TABLE = buildCrcTable()

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildCrcTable() {
  const table = new Uint32Array(256)

  for (let i = 0; i < 256; i += 1) {
    let value = i

    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
    }

    table[i] = value >>> 0
  }

  return table
}

function crc32(buffer) {
  let value = 0xffffffff

  for (const byte of buffer) {
    value = CRC_TABLE[(value ^ byte) & 0xff] ^ (value >>> 8)
  }

  return (value ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii")
  const lengthBuffer = Buffer.alloc(4)
  lengthBuffer.writeUInt32BE(data.length, 0)

  const crcBuffer = Buffer.alloc(4)
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0)

  return Buffer.concat([lengthBuffer, typeBuffer, data, crcBuffer])
}

function createSolidPngBuffer(width, height, rgba = [255, 255, 255, 255]) {
  const [red, green, blue, alpha] = rgba
  const rowLength = width * 4 + 1
  const raw = Buffer.alloc(rowLength * height)

  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * rowLength
    raw[rowOffset] = 0

    for (let x = 0; x < width; x += 1) {
      const pixelOffset = rowOffset + 1 + x * 4
      raw[pixelOffset] = red
      raw[pixelOffset + 1] = green
      raw[pixelOffset + 2] = blue
      raw[pixelOffset + 3] = alpha
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ])
}

async function findAvailablePort(startPort = 4173, attempts = 20) {
  for (let index = 0; index < attempts; index += 1) {
    const port = startPort + index
    const isAvailable = await new Promise((resolve) => {
      const tester = createServer()
      tester.once("error", () => resolve(false))
      tester.once("listening", () => {
        tester.close(() => resolve(true))
      })
      tester.listen(port, "127.0.0.1")
    })

    if (isAvailable) {
      return port
    }
  }

  throw new Error(`Could not find an open preview port after ${attempts} attempts.`)
}

async function waitForServer(baseUrl, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) {
        return
      }
    } catch {}

    await delay(200)
  }

  throw new Error(`Preview server did not start in time at ${baseUrl}.`)
}

function startPreviewServer(port) {
  const env = {
    ...process.env,
    HOST: "127.0.0.1",
    PORT: String(port),
  }
  const child = spawn(process.execPath, ["server/preview-server.mjs"], {
    cwd: rootDir,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  })

  let logs = ""
  child.stdout.on("data", (chunk) => {
    logs += chunk.toString()
  })
  child.stderr.on("data", (chunk) => {
    logs += chunk.toString()
  })

  return {
    child,
    getLogs: () => logs.trim(),
  }
}

async function stopPreviewServer(child) {
  if (!child || child.killed) return

  child.kill("SIGTERM")

  const exited = await Promise.race([
    new Promise((resolve) => child.once("exit", () => resolve(true))),
    delay(1500).then(() => false),
  ])

  if (!exited) {
    child.kill("SIGKILL")
    await new Promise((resolve) => child.once("exit", resolve))
  }
}

async function launchBrowser() {
  const attempts = [
    () => chromium.launch({ channel: "chrome", headless: true }),
    () => chromium.launch({ headless: true }),
  ]

  let lastError = null

  for (const attempt of attempts) {
    try {
      return await attempt()
    } catch (error) {
      lastError = error
    }
  }

  throw new Error(
    `Could not launch a Playwright browser. If Chrome is unavailable locally, run "npx playwright install chromium" once.\n${lastError?.message || ""}`
  )
}

async function waitForState(page, states, timeout = 30000) {
  const handle = await page.waitForFunction(
    (expectedStates) => {
      for (const state of expectedStates) {
        const panel = document.querySelector(`[data-state-panel="${state}"]`)
        if (panel?.classList.contains("is-active")) {
          return state
        }
      }
      return null
    },
    states,
    { timeout }
  )

  return handle.jsonValue()
}

async function waitForDownloadReady(page, timeout = 30000) {
  await page.waitForFunction(
    () => {
      const button = document.getElementById("download-button")
      return Boolean(button) && !button.disabled
    },
    undefined,
    { timeout }
  )
}

async function ensureReset(page) {
  await page.click("#reset-button")
  await page.waitForFunction(() => {
    const dropzone = document.getElementById("empty-dropzone")
    return Boolean(dropzone) && !dropzone.classList.contains("is-hidden")
  })
}

async function saveDownload(download, targetName) {
  const filePath = join(downloadDir, targetName)
  await download.saveAs(filePath)
  return filePath
}

async function captureFailure(page, fileName) {
  try {
    await page.screenshot({
      path: join(outputDir, fileName),
      fullPage: true,
    })
  } catch {}
}

async function runAutoCleanupFlow(page, baseUrl) {
  let selectedCandidate = null

  for (const candidate of autoUploadCandidates) {
    await page.goto(baseUrl, { waitUntil: "networkidle" })
    await page.locator("#file-input").setInputFiles(candidate.filePath)

    const state = await waitForState(page, ["success", "manual", "miss"])
    if (state === "success") {
      selectedCandidate = candidate
      break
    }
  }

  assert(
    selectedCandidate,
    "Expected at least one built-in demo upload to finish in success state, but none did."
  )

  await waitForDownloadReady(page)

  const slider = page.locator("#compare-slider")
  await slider.focus()
  const previousValue = Number((await slider.getAttribute("aria-valuenow")) || "0")
  await page.keyboard.press("ArrowRight")
  await page.waitForFunction(
    (value) => {
      const sliderNode = document.getElementById("compare-slider")
      return Number(sliderNode?.getAttribute("aria-valuenow") || "0") > value
    },
    previousValue,
    { timeout: 5000 }
  )

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("#download-button"),
  ])

  const suggestedName = download.suggestedFilename()
  assert(
    suggestedName.endsWith(selectedCandidate.expectedExtension),
    `Expected ${selectedCandidate.expectedExtension} download after uploading the ${selectedCandidate.label}, but got "${suggestedName}".`
  )

  await saveDownload(download, `auto-${suggestedName}`)

  const resultMode = await page.evaluate(() => window.__geminiRemoverDebug?.getResultMode?.())
  assert(
    ["auto", "local-repair", "local-repair-warning", "advanced-repair"].includes(resultMode),
    `Unexpected auto cleanup result mode: "${resultMode}".`
  )

  await ensureReset(page)
}

async function runManualCleanupFlow(page) {
  const manualPayload = {
    name: "manual-solid-white.png",
    mimeType: "image/png",
    buffer: createSolidPngBuffer(256, 256),
  }

  await page.locator("#file-input").setInputFiles(manualPayload)

  const state = await waitForState(page, ["miss", "manual", "success"])
  assert(
    state === "miss" || state === "manual",
    `Expected the plain generated image to require manual cleanup, but got "${state}".`
  )

  if (state === "miss") {
    await page.click("#manual-mode-button")
  }

  await waitForState(page, ["manual"])
  await page.locator("#manual-surface").waitFor({ state: "visible" })

  const manualSurfaceBox = await page.locator("#manual-surface").boundingBox()
  assert(manualSurfaceBox, "Manual selection surface is not available for dragging.")

  const startX = manualSurfaceBox.x + manualSurfaceBox.width * 0.62
  const startY = manualSurfaceBox.y + manualSurfaceBox.height * 0.62
  const endX = startX + Math.min(48, manualSurfaceBox.width * 0.18)
  const endY = startY + Math.min(48, manualSurfaceBox.height * 0.18)

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(endX, endY, { steps: 8 })
  await page.mouse.up()

  await page.waitForFunction(() => {
    const box = document.getElementById("selection-box")
    const note = document.getElementById("manual-selection-note")
    return Boolean(box) && !box.classList.contains("is-hidden") && /Selected/.test(note?.textContent || "")
  })

  await page.click("#apply-manual-button")

  const completionState = await waitForState(page, ["success", "manual"], 30000)
  assert(
    completionState === "success",
    `Expected manual cleanup to reach success state, but got "${completionState}".`
  )

  await waitForDownloadReady(page)

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("#download-button"),
  ])

  const suggestedName = download.suggestedFilename()
  assert(
    suggestedName.endsWith(".png"),
    `Expected PNG download after manual PNG upload, but got "${suggestedName}".`
  )

  await saveDownload(download, `manual-${suggestedName}`)

  const resultMode = await page.evaluate(() => window.__geminiRemoverDebug?.getResultMode?.())
  assert(
    ["manual", "local-repair", "local-repair-warning"].includes(resultMode),
    `Unexpected manual cleanup result mode: "${resultMode}".`
  )
}

async function main() {
  rmSync(outputDir, { recursive: true, force: true })
  mkdirSync(downloadDir, { recursive: true })

  const port = await findAvailablePort()
  const baseUrl = `http://127.0.0.1:${port}`
  const preview = startPreviewServer(port)
  let browser = null
  let context = null
  let page = null
  const pageErrors = []

  try {
    await waitForServer(baseUrl)
    browser = await launchBrowser()
    context = await browser.newContext({
      acceptDownloads: true,
      viewport: { width: 1440, height: 1200 },
    })
    page = await context.newPage()

    page.on("pageerror", (error) => {
      pageErrors.push(error.message)
    })

    await page.goto(baseUrl, { waitUntil: "networkidle" })
    await runAutoCleanupFlow(page, baseUrl)
    await runManualCleanupFlow(page)

    assert(
      pageErrors.length === 0,
      `Browser page errors were emitted during E2E run:\n${pageErrors.join("\n")}`
    )

    console.log("E2E browser flow passed.")
  } catch (error) {
    if (page) {
      await captureFailure(page, "e2e-failure.png")
    }

    const logs = preview.getLogs()
    const details = logs ? `${error.message}\n${logs}` : error.message
    throw new Error(details)
  } finally {
    if (context) {
      await context.close()
    }

    if (browser) {
      await browser.close()
    }

    await stopPreviewServer(preview.child)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
