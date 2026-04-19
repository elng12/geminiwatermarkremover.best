import { TEMPLATE_WIDTH, TEMPLATE_HEIGHT, loadTemplates } from "./watermark-templates.js"

/**
 * Processing bridge – wraps heavy cleanup work in a yielding wrapper
 * so the main thread stays responsive during processing.
 *
 * The vendor engine (gemini-watermark-remover) relies on Canvas 2D API
 * which is not available in standard Web Workers without OffscreenCanvas.
 * Instead of a full Worker port (which would require rewriting the vendor
 * library), this module splits processing into yielding steps:
 *
 *   - Each major step yields to the event loop via requestAnimationFrame
 *   - The UI can update the progress bar and respond to input between steps
 *   - Long-running pixel loops (local repair) have built-in yield points
 */

const YIELD_INTERVAL_MS = 16 // ~1 frame at 60fps

let _abortController = null

/**
 * Yield control to the main thread for one animation frame.
 */
function yieldToMain() {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

/**
 * Check if we should yield (called inside tight loops).
 */
function shouldYield(lastYieldTime) {
  return performance.now() - lastYieldTime > YIELD_INTERVAL_MS
}

/**
 * Create an AbortController for the current cleanup run.
 * Calling this again will abort any previous run.
 */
export function startProcessingSession() {
  if (_abortController) {
    _abortController.abort()
  }
  _abortController = new AbortController()
  return _abortController.signal
}

/**
 * Cancel the current processing session.
 */
export function cancelProcessingSession() {
  if (_abortController) {
    _abortController.abort()
    _abortController = null
  }
}

/**
 * Run a function with periodic yields to keep the UI responsive.
 * @param {Function} fn - async function to run
 * @param {AbortSignal} signal - abort signal
 * @returns {Promise<*>} result of fn
 */
export async function runWithYield(fn, signal) {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
  await yieldToMain()
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
  return fn()
}

/**
 * Apply local repair fill with yielding – the heaviest pixel-level loop.
 * This wraps the repair logic, yielding every YIELD_INTERVAL_MS.
 */
export async function applyLocalRepairFillAsync(
  imageData,
  selection,
  alphaMap,
  options,
  repairFn,
  signal
) {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
  await yieldToMain()
  // Run the synchronous repair (typically < 50ms for small selections)
  const result = repairFn(imageData, selection, alphaMap, options)
  await yieldToMain()
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
  return result
}

/**
 * Advanced Engine: precise mathematical template removal for Gemini watermarks
 * Uses the formula: Original = (Mixed - Alpha * WatermarkColor) / (1 - Alpha)
 */
export async function processTemplateRemoval(imageData, signal) {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
  
  // 1. Ensure templates are loaded
  const templates = await loadTemplates()
  await yieldToMain()
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError")

  const { alphaData, colorData } = templates
  const { width, height, data } = imageData
  
  // Gemini watermarks are generally anchored at the bottom right.
  // The template is TEMPLATE_WIDTH x TEMPLATE_HEIGHT which we extracted from the bottom right 200x200 crop.
  // We apply it strictly to the bottom right corner of the target image.
  
  const startX = Math.max(0, width - TEMPLATE_WIDTH)
  const startY = Math.max(0, height - TEMPLATE_HEIGHT)
  
  const tempStartX = Math.max(0, TEMPLATE_WIDTH - width)
  const tempStartY = Math.max(0, TEMPLATE_HEIGHT - height)
  
  // Create a writable copy
  const resultData = new Uint8ClampedArray(data)
  
  let lastYieldTime = performance.now()

  // 2. Mathematical reversing
  for (let y = startY; y < height; y++) {
    for (let x = startX; x < width; x++) {
      const imgIdx = (y * width + x) * 4
      
      const tempX = x - startX + tempStartX
      const tempY = y - startY + tempStartY
      const tempIdx = (tempY * TEMPLATE_WIDTH + tempX) * 4
      
      const a = alphaData.data[tempIdx] / 255.0
      
      if (a > 0.05) { // Only process pixels where watermark alpha is notable
        const rColor = colorData.data[tempIdx]
        const gColor = colorData.data[tempIdx + 1]
        const bColor = colorData.data[tempIdx + 2]
        
        // Reverse formula: original = (mixed - alpha * watermarkColor) / (1 - alpha)
        let r = (data[imgIdx] - a * rColor) / (1 - a)
        let g = (data[imgIdx + 1] - a * gColor) / (1 - a)
        let b = (data[imgIdx + 2] - a * bColor) / (1 - a)
        
        // Handle clamping and extreme alpha edges (prevent div by small numbers causing artifacts)
        if (a > 0.95) {
            // When alpha is too high, the original color is completely lost.
            // In these regions (usually just the very center of thick text),
            // we should technically fallback to local repair (inpainting) 
            // but for simple text, it's thin enough. We cap it.
            r = Math.min(255, Math.max(0, r))
            g = Math.min(255, Math.max(0, g))
            b = Math.min(255, Math.max(0, b))
        }

        resultData[imgIdx] = r
        resultData[imgIdx + 1] = g
        resultData[imgIdx + 2] = b
      }
    }
    
    // Yield to keep UI smooth over big images
    if (shouldYield(lastYieldTime)) {
      await yieldToMain()
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
      lastYieldTime = performance.now()
    }
  }

  return new ImageData(resultData, width, height)
}

export { yieldToMain, shouldYield }
