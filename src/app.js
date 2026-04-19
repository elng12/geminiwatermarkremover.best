import {
  assessAlphaBandHalo,
  calculateWatermarkPosition,
  computeRegionGradientCorrelation,
  computeRegionSpatialCorrelation,
  createWatermarkEngine,
  detectWatermarkConfig,
  getEmbeddedAlphaMap,
  interpolateAlphaMap,
  removeRepeatedWatermarkLayers,
  removeWatermarkFromImage,
} from "./vendor/gemini-watermark-remover/browser.js"
import {
  startProcessingSession,
  cancelProcessingSession,
  runWithYield,
  yieldToMain,
  processTemplateRemoval,
} from "./processing-bridge.js"

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const AUTO_SUCCESS_MAX_SPATIAL_SCORE = 0.18
const AUTO_SUCCESS_MAX_GRADIENT_SCORE = 0.055
const AUTO_SUCCESS_MAX_HALO_VISIBILITY = 1.25
const MANUAL_SUCCESS_MAX_SPATIAL_SCORE = 0.16
const MANUAL_SUCCESS_MAX_GRADIENT_SCORE = 0.045
const MANUAL_SUCCESS_MAX_HALO_VISIBILITY = 1.05
const AUTO_SUCCESS_MIN_WEIGHTED_DELTA = 6
const AUTO_SUCCESS_MIN_CHANGED_ALPHA_RATIO = 0.18
const MIN_ACTIVE_ALPHA = 0.015
const SIGNIFICANT_PIXEL_DELTA = 10
const LOCAL_REPAIR_ALPHA_THRESHOLD = 0.01
const LOCAL_REPAIR_DILATION_PASSES = 2
const LOCAL_REPAIR_SAMPLE_RADIUS = 14
const LOCAL_REPAIR_MIN_SAMPLES = 6
const AUTO_LOCAL_REPAIR_ALPHA_THRESHOLD = 0.006
const AUTO_LOCAL_REPAIR_DILATION_PASSES = 3
const AUTO_LOCAL_REPAIR_SAMPLE_RADIUS = 18
const AUTO_LOCAL_REPAIR_MIN_SAMPLES = 10
const AUTO_LOCAL_REPAIR_CORE_BLEND = 0.985
const AUTO_LOCAL_REPAIR_EDGE_BLEND = 0.78
const AUTO_LOCAL_REPAIR_TRIGGER_SPATIAL = 0.085
const AUTO_LOCAL_REPAIR_TRIGGER_GRADIENT = 0.018
const AUTO_LOCAL_REPAIR_TRIGGER_HALO = 0.58
const AUTO_LOCAL_REPAIR_MIN_IMPROVEMENT = 0.06

const tabs = Array.from(document.querySelectorAll("[data-state-target]"))
const panels = Array.from(document.querySelectorAll("[data-state-panel]"))

const fileInput = document.getElementById("file-input")
const heroSection = document.getElementById("top")
const toolSection = document.getElementById("tool")
const heroUploadButton = document.getElementById("hero-upload-button")
const midCtaUploadButton = document.getElementById("mid-cta-upload-button")
const emptyDropzone = document.getElementById("empty-dropzone")
const uploadFeedback = document.getElementById("upload-feedback")
const processingImage = document.getElementById("processing-image")
const processingMeta = document.getElementById("processing-meta")
const beforeImage = document.getElementById("before-image")
const afterImage = document.getElementById("after-image")
const successMeta = document.getElementById("success-meta")
const downloadButton = document.getElementById("download-button")
const resetButton = document.getElementById("reset-button")
const successLooksGoodButton = document.getElementById("success-looks-good-button")
const successNeedsHelpButton = document.getElementById("success-needs-help-button")
const missImage = document.getElementById("miss-image")
const missMessage = document.getElementById("miss-message")
const manualModeButton = document.getElementById("manual-mode-button")
const retryButton = document.getElementById("retry-button")
const manualSurface = document.getElementById("manual-surface")
const manualImage = document.getElementById("manual-image")
const selectionBox = document.getElementById("selection-box")
const manualSelectionNote = document.getElementById("manual-selection-note")
const applyManualButton = document.getElementById("apply-manual-button")
const retryAutoButton = document.getElementById("retry-auto-button")
const compareSlider = document.getElementById("compare-slider")
const compareHandle = document.getElementById("compare-handle")
const proofCompareSlider = document.getElementById("proof-compare-slider")
const proofCompareHandle = document.getElementById("proof-compare-handle")
const demoButtons = Array.from(document.querySelectorAll("[data-demo-src]"))
const tryAdvancedButton = document.getElementById("try-advanced-button")
const missAdvancedButton = document.getElementById("miss-advanced-button")
const manualAdvancedButton = document.getElementById("manual-advanced-button")

const enginePromise = createWatermarkEngine()

const appState = {
  sourceFile: null,
  sourceImage: null,
  sourceUrl: "",
  resultBlob: null,
  resultUrl: "",
  resultFileName: "",
  meta: null,
  manualSelection: null,
  resultMode: null,
}

const manualDrag = {
  active: false,
  pointerId: null,
  start: null,
}

function updateSliderPosition(slider, handle, fraction) {
  const pct = clamp(fraction * 100, 0, 100)
  const afterLayer = slider?.querySelector(".compare-slider-after")
  if (afterLayer) {
    afterLayer.style.clipPath = `inset(0 0 0 ${pct}%)`
  }
  if (handle) {
    handle.style.left = `${pct}%`
  }
}

function sliderPointerToFraction(slider, event) {
  if (!slider) return 0.5
  const rect = slider.getBoundingClientRect()
  return clamp((event.clientX - rect.left) / rect.width, 0, 1)
}

function bindCompareSliderElement(slider, handle) {
  if (!slider || !handle) return

  const sliderDrag = {
    active: false,
    pointerId: null,
  }

  updateSliderPosition(slider, handle, 0.5)

  slider.addEventListener("pointerdown", (event) => {
    sliderDrag.active = true
    sliderDrag.pointerId = event.pointerId
    slider.setPointerCapture(event.pointerId)
    slider.classList.add("is-dragging")
    updateSliderPosition(slider, handle, sliderPointerToFraction(slider, event))
  })

  slider.addEventListener("pointermove", (event) => {
    if (!sliderDrag.active || event.pointerId !== sliderDrag.pointerId) return
    updateSliderPosition(slider, handle, sliderPointerToFraction(slider, event))
  })

  const endSliderDrag = (event) => {
    if (!sliderDrag.active || event.pointerId !== sliderDrag.pointerId) return
    sliderDrag.active = false
    sliderDrag.pointerId = null
    slider.releasePointerCapture(event.pointerId)
    slider.classList.remove("is-dragging")
  }

  slider.addEventListener("pointerup", endSliderDrag)
  slider.addEventListener("pointercancel", endSliderDrag)
}

function bindCompareSliders() {
  bindCompareSliderElement(compareSlider, compareHandle)
  bindCompareSliderElement(proofCompareSlider, proofCompareHandle)
}

function mountToolWorkspaceInHero() {
  if (!heroSection || !toolSection || toolSection.parentElement === heroSection) return

  heroSection.appendChild(toolSection)
}

function setActiveState(nextState, options = {}) {
  const { scroll = false } = options
  const isEmpty = nextState === "empty"

  tabs.forEach((tab) => {
    const isActive = tab.dataset.stateTarget === nextState
    tab.classList.toggle("is-active", isActive)
    tab.setAttribute("aria-selected", String(isActive))
  })

  panels.forEach((panel) => {
    const isActive = panel.dataset.statePanel === nextState
    panel.classList.toggle("is-active", isActive)
  })

  toolSection?.classList.toggle("is-hidden", isEmpty)
  emptyDropzone?.classList.toggle("is-hidden", !isEmpty)

  if (scroll) {
    const target = isEmpty ? emptyDropzone : toolSection
    target?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (nextState === "manual") {
    requestAnimationFrame(() => renderManualSelection())
  }
}

function setNote(element, text, tone = "muted") {
  if (!element) return

  element.textContent = text
  element.className = "state-note"

  if (tone === "success") {
    element.classList.add("state-note-success")
  } else if (tone === "warn") {
    element.classList.add("state-note-warn")
  } else if (tone === "error") {
    element.classList.add("state-note-error")
  }
}

function setManualProcessing(isProcessing) {
  if (applyManualButton) {
    applyManualButton.disabled = isProcessing
    applyManualButton.textContent = isProcessing ? "Processing..." : "Apply cleanup"
  }

  if (retryAutoButton) {
    retryAutoButton.disabled = isProcessing
  }
}

function revokeObjectUrl(url) {
  if (url) {
    URL.revokeObjectURL(url)
  }
}

function clearWorkingAssets() {
  revokeObjectUrl(appState.sourceUrl)
  revokeObjectUrl(appState.resultUrl)
  appState.sourceFile = null
  appState.sourceImage = null
  appState.sourceUrl = ""
  appState.resultBlob = null
  appState.resultUrl = ""
  appState.resultFileName = ""
  appState.meta = null
  appState.manualSelection = null
  appState.resultMode = null
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve())
  })
}

function formatBytes(size) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function fileBaseName(fileName) {
  return fileName.replace(/\.[^/.]+$/, "") || "cleaned-image"
}

function buildDownloadName(sourceName) {
  return `${fileBaseName(sourceName)}-clean.png`
}

function getImageDimensions(image) {
  return {
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
  }
}

function validateFile(file) {
  if (!file) {
    throw new Error("Please choose an image first.")
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Use a JPG, PNG, or WebP image.")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`The file is too large. Keep it under ${formatBytes(MAX_FILE_SIZE)}.`)
  }
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("The browser could not decode this image."))
    image.src = url
  })
}

async function loadImageFromBlob(blob) {
  const objectUrl = URL.createObjectURL(blob)

  try {
    const image = await loadImageFromUrl(objectUrl)
    return { image, objectUrl }
  } catch (error) {
    URL.revokeObjectURL(objectUrl)
    throw error
  }
}

function setPreview(node, src) {
  if (!node) return
  node.src = src || ""
}

function syncSourcePreviews() {
  setPreview(processingImage, appState.sourceUrl)
  setPreview(beforeImage, appState.sourceUrl)
  setPreview(missImage, appState.sourceUrl)
  setPreview(manualImage, appState.sourceUrl)
}

async function canvasToBlob(canvas, type = "image/png", quality = 0.92) {
  if (typeof canvas.convertToBlob === "function") {
    return canvas.convertToBlob({ type, quality })
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
        return
      }

      reject(new Error("The browser could not export the cleaned image."))
    }, type, quality)
  })
}

function friendlySkipMessage(meta) {
  if (meta?.skipReason === "no-watermark-detected") {
    return "Auto-detect did not find a confident Gemini-style visible mark. Try the manual square."
  }

  return "Auto-detect needs a tighter target. Try the manual square around the visible mark."
}

function toFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function getResidualScores(meta) {
  return {
    spatial: toFiniteNumber(meta?.detection?.processedSpatialScore),
    gradient: toFiniteNumber(meta?.detection?.processedGradientScore),
  }
}

function maxFiniteNumber(...values) {
  const finiteValues = values.filter((value) => typeof value === "number" && Number.isFinite(value))
  return finiteValues.length ? Math.max(...finiteValues) : null
}

function getSelectionFromPosition(position) {
  if (!position?.width) return null

  return normalizeSquareSelection({
    x: position.x,
    y: position.y,
    size: position.width,
  })
}

function analyzeResidualMark(resultCanvas, selection) {
  if (!resultCanvas || !selection?.size) return null

  const alphaMap = getManualAlphaMap(selection.size)
  const resultContext = resultCanvas.getContext("2d", { willReadFrequently: true })

  if (!alphaMap || !resultContext) return null

  const imageData = resultContext.getImageData(0, 0, resultCanvas.width, resultCanvas.height)
  const region = {
    x: selection.x,
    y: selection.y,
    size: selection.size,
  }
  const halo = assessAlphaBandHalo({
    imageData,
    position: {
      x: selection.x,
      y: selection.y,
      width: selection.size,
      height: selection.size,
    },
    alphaMap,
  })

  return {
    spatial: Math.abs(
      computeRegionSpatialCorrelation({
        imageData,
        alphaMap,
        region,
      })
    ),
    gradient: Math.max(
      0,
      computeRegionGradientCorrelation({
        imageData,
        alphaMap,
        region,
      })
    ),
    haloVisibility: Math.abs(toFiniteNumber(halo?.visibility) ?? 0),
  }
}

function buildCleanupEvaluation(resultCanvas, position, meta) {
  const selection = getSelectionFromPosition(position)
  const changeStats = measureWatermarkRegionChange(resultCanvas, position)
  const residualAnalysis = selection ? analyzeResidualMark(resultCanvas, selection) : null
  const metaResidual = getResidualScores(meta)

  return {
    selection,
    changeStats,
    source: meta?.source ?? null,
    spatial: maxFiniteNumber(
      metaResidual.spatial === null ? null : Math.abs(metaResidual.spatial),
      residualAnalysis?.spatial ?? null
    ),
    gradient: maxFiniteNumber(
      metaResidual.gradient === null ? null : Math.max(0, metaResidual.gradient),
      residualAnalysis?.gradient ?? null
    ),
    haloVisibility: residualAnalysis?.haloVisibility ?? null,
  }
}

function shouldEscalateCleanup(evaluation, mode = "auto") {
  if (!evaluation) return false

  const spatialLimit =
    mode === "manual" ? MANUAL_SUCCESS_MAX_SPATIAL_SCORE : AUTO_SUCCESS_MAX_SPATIAL_SCORE
  const gradientLimit =
    mode === "manual" ? MANUAL_SUCCESS_MAX_GRADIENT_SCORE : AUTO_SUCCESS_MAX_GRADIENT_SCORE
  const haloLimit =
    mode === "manual" ? MANUAL_SUCCESS_MAX_HALO_VISIBILITY : AUTO_SUCCESS_MAX_HALO_VISIBILITY

  if (isWeakCleanup(evaluation.changeStats)) {
    return true
  }

  if (evaluation.spatial !== null && evaluation.spatial > spatialLimit) {
    return true
  }

  if (evaluation.gradient !== null && evaluation.gradient > gradientLimit) {
    return true
  }

  if (evaluation.haloVisibility !== null && evaluation.haloVisibility > haloLimit) {
    return true
  }

  if (
    evaluation.gradient !== null &&
    evaluation.haloVisibility !== null &&
    evaluation.gradient > gradientLimit * 0.7 &&
    evaluation.haloVisibility > haloLimit * 0.75
  ) {
    return true
  }

  if (
    mode === "auto" &&
    typeof evaluation.source === "string" &&
    evaluation.source.includes("preview-anchor") &&
    !evaluation.source.includes("+edge-cleanup") &&
    evaluation.gradient !== null &&
    evaluation.gradient > gradientLimit * 0.6
  ) {
    return true
  }

  return false
}

function getCleanupPenalty(evaluation, mode = "auto") {
  if (!evaluation) return Number.POSITIVE_INFINITY

  const spatialLimit =
    mode === "manual" ? MANUAL_SUCCESS_MAX_SPATIAL_SCORE : AUTO_SUCCESS_MAX_SPATIAL_SCORE
  const gradientLimit =
    mode === "manual" ? MANUAL_SUCCESS_MAX_GRADIENT_SCORE : AUTO_SUCCESS_MAX_GRADIENT_SCORE
  const haloLimit =
    mode === "manual" ? MANUAL_SUCCESS_MAX_HALO_VISIBILITY : AUTO_SUCCESS_MAX_HALO_VISIBILITY

  let penalty = 0

  if (evaluation.spatial !== null) {
    penalty += evaluation.spatial / spatialLimit
  }

  if (evaluation.gradient !== null) {
    penalty += evaluation.gradient / gradientLimit
  }

  if (evaluation.haloVisibility !== null) {
    penalty += evaluation.haloVisibility / haloLimit
  }

  if (isWeakCleanup(evaluation.changeStats)) {
    penalty += 1.1
  }

  return penalty
}

function shouldApplyAutoLocalRepair(evaluation) {
  if (!evaluation?.selection?.size) return false

  if (shouldEscalateCleanup(evaluation, "auto")) {
    return true
  }

  if (evaluation.spatial !== null && evaluation.spatial >= AUTO_LOCAL_REPAIR_TRIGGER_SPATIAL) {
    return true
  }

  if (evaluation.gradient !== null && evaluation.gradient >= AUTO_LOCAL_REPAIR_TRIGGER_GRADIENT) {
    return true
  }

  if (
    evaluation.haloVisibility !== null &&
    evaluation.haloVisibility >= AUTO_LOCAL_REPAIR_TRIGGER_HALO
  ) {
    return true
  }

  return typeof evaluation.source === "string" && evaluation.source.includes("preview-anchor")
}

function shouldKeepAutoRepairResult(candidateEvaluation, baselineEvaluation) {
  if (!candidateEvaluation) return false
  if (!baselineEvaluation) return true

  const baselinePenalty = getCleanupPenalty(baselineEvaluation, "auto")
  const candidatePenalty = getCleanupPenalty(candidateEvaluation, "manual")

  if (candidatePenalty <= baselinePenalty - AUTO_LOCAL_REPAIR_MIN_IMPROVEMENT) {
    return true
  }

  const baselineHalo = baselineEvaluation.haloVisibility ?? Number.POSITIVE_INFINITY
  const baselineGradient = baselineEvaluation.gradient ?? Number.POSITIVE_INFINITY
  const baselineSpatial = baselineEvaluation.spatial ?? Number.POSITIVE_INFINITY
  const candidateHalo = candidateEvaluation.haloVisibility ?? Number.POSITIVE_INFINITY
  const candidateGradient = candidateEvaluation.gradient ?? Number.POSITIVE_INFINITY
  const candidateSpatial = candidateEvaluation.spatial ?? Number.POSITIVE_INFINITY

  if (candidateHalo < baselineHalo * 0.82 && candidateGradient <= baselineGradient * 1.08) {
    return true
  }

  if (candidateGradient < baselineGradient * 0.78 && candidateSpatial <= baselineSpatial * 1.12) {
    return true
  }

  return candidateSpatial < baselineSpatial * 0.82 && candidateHalo <= baselineHalo * 1.08
}

function manualFallbackMessage(meta) {
  const pieces = ["The first preview still shows visible residue."]

  if (meta?.position?.width) {
    pieces.push(`Start with the suggested ${meta.position.width}px square over the remaining mark.`)
  } else {
    pieces.push("Drag a tight square around the remaining mark.")
  }

  pieces.push("Then apply another local cleanup pass.")
  return pieces.join(" ")
}

function successMessage(meta, mode) {
  if (mode === "local-repair") {
    return "Local repair preview is ready. The remaining mark was filled from nearby background pixels; review the area before downloading."
  }

  if (mode === "local-repair-warning") {
    return "Local repair preview is ready, but this image may still show slight residue. Try a tighter manual square if you want one more local pass."
  }

  if (mode === "manual-warning") {
    return "Manual repair preview is ready. This image may still show residue because the local cleanup has reached its limit."
  }

  if (mode === "advanced-repair") {
    return "Advanced mathematical template removal applied. The visible corners use pixel-perfect inverse blending. Please review!"
  }

  const pieces = [
    mode === "manual"
      ? "Second-pass preview is ready."
      : "Review this cleanup preview before downloading.",
  ]

  if (meta?.position?.width) {
    pieces.push(`Target area: ${meta.position.width}px.`)
  }

  if (meta?.passCount) {
    const passLabel = meta.passCount === 1 ? "pass" : "passes"
    pieces.push(`Used ${meta.passCount} ${passLabel}.`)
  }

  return pieces.join(" ")
}

function chooseInputFile() {
  fileInput?.click()
}

function updateDownloadUi(mode) {
  if (downloadButton) {
    downloadButton.textContent =
      mode === "local-repair-warning" || mode === "manual-warning"
        ? "Download preview result"
        : "Download clean image"
  }
}

function getPreferredOutputType() {
  return ALLOWED_TYPES.has(appState.sourceFile?.type) ? appState.sourceFile.type : "image/png"
}

function createCanvasFromSource() {
  const dimensions = getImageDimensions(appState.sourceImage)
  const canvas = document.createElement("canvas")
  canvas.width = dimensions.width
  canvas.height = dimensions.height

  const context = canvas.getContext("2d", { willReadFrequently: true })
  if (!context) {
    throw new Error("The browser could not start a 2D canvas session.")
  }

  context.drawImage(appState.sourceImage, 0, 0)
  return { canvas, context, dimensions }
}

function cloneCanvas(sourceCanvas) {
  const canvas = document.createElement("canvas")
  canvas.width = sourceCanvas.width
  canvas.height = sourceCanvas.height

  const context = canvas.getContext("2d", { willReadFrequently: true })
  if (!context) {
    throw new Error("The browser could not duplicate the cleanup preview.")
  }

  context.drawImage(sourceCanvas, 0, 0)
  return { canvas, context }
}

function measureWatermarkRegionChange(resultCanvas, position) {
  if (!appState.sourceImage || !resultCanvas || !position?.width) return null

  const selection = normalizeSquareSelection({
    x: position.x,
    y: position.y,
    size: position.width,
  })

  if (!selection) return null

  const alphaMap = getManualAlphaMap(selection.size)
  const resultContext = resultCanvas.getContext("2d", { willReadFrequently: true })

  if (!alphaMap || !resultContext) return null

  const { context: sourceContext } = createCanvasFromSource()
  const before = sourceContext.getImageData(
    selection.x,
    selection.y,
    selection.size,
    selection.size
  ).data
  const after = resultContext.getImageData(
    selection.x,
    selection.y,
    selection.size,
    selection.size
  ).data

  let alphaWeightSum = 0
  let weightedDeltaSum = 0
  let changedAlphaWeight = 0

  for (let index = 0; index < alphaMap.length; index += 1) {
    const alpha = alphaMap[index]

    if (alpha <= MIN_ACTIVE_ALPHA) continue

    const pixelIndex = index * 4
    const delta =
      (Math.abs(before[pixelIndex] - after[pixelIndex]) +
        Math.abs(before[pixelIndex + 1] - after[pixelIndex + 1]) +
        Math.abs(before[pixelIndex + 2] - after[pixelIndex + 2])) /
      3

    alphaWeightSum += alpha
    weightedDeltaSum += delta * alpha

    if (delta >= SIGNIFICANT_PIXEL_DELTA) {
      changedAlphaWeight += alpha
    }
  }

  if (alphaWeightSum <= 0) return null

  return {
    selection,
    weightedMeanDelta: weightedDeltaSum / alphaWeightSum,
    changedAlphaRatio: changedAlphaWeight / alphaWeightSum,
  }
}

function isWeakCleanup(changeStats) {
  if (!changeStats) return false

  return (
    changeStats.weightedMeanDelta < AUTO_SUCCESS_MIN_WEIGHTED_DELTA &&
    changeStats.changedAlphaRatio < AUTO_SUCCESS_MIN_CHANGED_ALPHA_RATIO
  )
}

function routeToManualRepair(meta, selection, message = null) {
  appState.meta = meta ?? null

  if (selection) {
    appState.manualSelection = selection
    renderManualSelection()
  }

  setNote(
    uploadFeedback,
    "The first preview may still show residue. A closer repair pass is recommended.",
    "muted"
  )
  setNote(manualSelectionNote, message || manualFallbackMessage(meta), "error")
  setActiveState("manual", { scroll: true })
}

async function finalizeSuccess(canvas, meta, mode) {
  const processedBlob = await canvasToBlob(canvas, getPreferredOutputType())
  const processedUrl = URL.createObjectURL(processedBlob)

  revokeObjectUrl(appState.resultUrl)
  appState.resultBlob = processedBlob
  appState.resultUrl = processedUrl
  appState.resultFileName = buildDownloadName(appState.sourceFile?.name || "cleaned-image")
  appState.meta = meta
  appState.resultMode = mode

  setPreview(afterImage, processedUrl)
  setNote(
    successMeta,
    successMessage(meta, mode),
    mode === "manual-warning" || mode === "local-repair-warning" ? "warn" : "success"
  )
  updateDownloadUi(mode)
  downloadButton.disabled = false
  setActiveState("success")
}

function getDefaultManualSelection() {
  if (!appState.sourceImage) return null

  const { width, height } = getImageDimensions(appState.sourceImage)
  const config = detectWatermarkConfig(width, height)
  const position = calculateWatermarkPosition(width, height, config)

  return {
    x: position.x,
    y: position.y,
    size: position.width,
  }
}

function getSuggestedManualSelection(meta) {
  const width = Number(meta?.position?.width)
  const x = Number(meta?.position?.x)
  const y = Number(meta?.position?.y)

  if (Number.isFinite(width) && Number.isFinite(x) && Number.isFinite(y)) {
    return normalizeSquareSelection({ x, y, size: width })
  }

  return getDefaultManualSelection()
}

function getContainedImageRect() {
  if (!manualSurface || !appState.sourceImage) return null

  const { width: imageWidth, height: imageHeight } = getImageDimensions(appState.sourceImage)
  const containerWidth = manualSurface.clientWidth
  const containerHeight = manualSurface.clientHeight
  const scale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight)
  const width = imageWidth * scale
  const height = imageHeight * scale

  return {
    left: (containerWidth - width) / 2,
    top: (containerHeight - height) / 2,
    width,
    height,
    scale,
  }
}

function renderManualSelection() {
  const rect = getContainedImageRect()
  const selection = appState.manualSelection

  if (!rect || !selection || !appState.sourceImage) {
    selectionBox?.classList.add("is-hidden")
    return
  }

  const { width: imageWidth } = getImageDimensions(appState.sourceImage)
  const scale = rect.width / imageWidth
  const boxSize = selection.size * scale
  const left = rect.left + selection.x * scale
  const top = rect.top + selection.y * scale

  selectionBox.style.left = `${left}px`
  selectionBox.style.top = `${top}px`
  selectionBox.style.width = `${boxSize}px`
  selectionBox.style.height = `${boxSize}px`
  selectionBox.classList.remove("is-hidden")
}

function normalizeSquareSelection(rawSelection) {
  if (!rawSelection || !appState.sourceImage) return null

  const { width, height } = getImageDimensions(appState.sourceImage)
  let size = Math.round(rawSelection.size)
  size = clamp(size, 24, Math.min(width, height))

  const x = clamp(Math.round(rawSelection.x), 0, width - size)
  const y = clamp(Math.round(rawSelection.y), 0, height - size)

  return { x, y, size }
}

function buildManualSelection(startPoint, endPoint) {
  if (!appState.sourceImage) return null

  const { width, height } = getImageDimensions(appState.sourceImage)
  const deltaX = endPoint.x - startPoint.x
  const deltaY = endPoint.y - startPoint.y
  const size = clamp(
    Math.round(Math.max(Math.abs(deltaX), Math.abs(deltaY), 24)),
    24,
    Math.min(width, height)
  )

  const x = deltaX >= 0 ? startPoint.x : startPoint.x - size
  const y = deltaY >= 0 ? startPoint.y : startPoint.y - size

  return normalizeSquareSelection({ x, y, size })
}

function eventToImagePoint(event) {
  const rect = manualSurface.getBoundingClientRect()
  const imageRect = getContainedImageRect()

  if (!imageRect || !appState.sourceImage) return null

  const localX = event.clientX - rect.left
  const localY = event.clientY - rect.top
  const clampedX = clamp(localX, imageRect.left, imageRect.left + imageRect.width)
  const clampedY = clamp(localY, imageRect.top, imageRect.top + imageRect.height)
  const { width: imageWidth, height: imageHeight } = getImageDimensions(appState.sourceImage)

  return {
    x: Math.round(((clampedX - imageRect.left) / imageRect.width) * imageWidth),
    y: Math.round(((clampedY - imageRect.top) / imageRect.height) * imageHeight),
  }
}

function getManualAlphaMap(size) {
  if (size === 48 || size === 96) {
    return getEmbeddedAlphaMap(size)
  }

  if (size < 72) {
    return interpolateAlphaMap(getEmbeddedAlphaMap(48), 48, size)
  }

  return interpolateAlphaMap(getEmbeddedAlphaMap(96), 96, size)
}

function dilateRepairMask(mask, size, passes = LOCAL_REPAIR_DILATION_PASSES) {
  let current = mask

  for (let pass = 0; pass < passes; pass += 1) {
    const next = new Uint8Array(current)

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = y * size + x
        if (!current[index]) continue

        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nx = x + dx
            const ny = y + dy

            if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue
            next[ny * size + nx] = 1
          }
        }
      }
    }

    current = next
  }

  return current
}

function buildRepairMasks(alphaMap, size, options = {}) {
  const alphaThreshold = options.alphaThreshold ?? LOCAL_REPAIR_ALPHA_THRESHOLD
  const dilationPasses = options.dilationPasses ?? LOCAL_REPAIR_DILATION_PASSES
  const coreMask = new Uint8Array(size * size)

  for (let index = 0; index < alphaMap.length; index += 1) {
    if (alphaMap[index] >= alphaThreshold) {
      coreMask[index] = 1
    }
  }

  const repairMask = dilateRepairMask(coreMask, size, dilationPasses)
  return { coreMask, repairMask }
}

function sampleRepairBackground(
  data,
  imageWidth,
  imageHeight,
  repairMask,
  selection,
  localX,
  localY,
  options = {}
) {
  const sampleRadius = options.sampleRadius ?? LOCAL_REPAIR_SAMPLE_RADIUS
  const minSamples = options.minSamples ?? LOCAL_REPAIR_MIN_SAMPLES
  const centerX = selection.x + localX
  const centerY = selection.y + localY
  const selectionSize = selection.size

  for (let radius = 3; radius <= sampleRadius; radius += 2) {
    let weightSum = 0
    let redSum = 0
    let greenSum = 0
    let blueSum = 0
    let sampleCount = 0

    for (let dy = -radius; dy <= radius; dy += 1) {
      for (let dx = -radius; dx <= radius; dx += 1) {
        if (dx === 0 && dy === 0) continue
        if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue

        const pixelX = centerX + dx
        const pixelY = centerY + dy

        if (pixelX < 0 || pixelY < 0 || pixelX >= imageWidth || pixelY >= imageHeight) {
          continue
        }

        const maskX = localX + dx
        const maskY = localY + dy
        const insideSelection =
          maskX >= 0 && maskY >= 0 && maskX < selectionSize && maskY < selectionSize

        if (insideSelection && repairMask[maskY * selectionSize + maskX]) {
          continue
        }

        const distance = Math.sqrt(dx * dx + dy * dy)
        const weight = 1 / Math.max(1, distance)
        const pixelIndex = (pixelY * imageWidth + pixelX) * 4

        redSum += data[pixelIndex] * weight
        greenSum += data[pixelIndex + 1] * weight
        blueSum += data[pixelIndex + 2] * weight
        weightSum += weight
        sampleCount += 1
      }
    }

    if (sampleCount >= minSamples && weightSum > 0) {
      return {
        red: redSum / weightSum,
        green: greenSum / weightSum,
        blue: blueSum / weightSum,
      }
    }
  }

  const fallbackIndex = (centerY * imageWidth + centerX) * 4
  return {
    red: data[fallbackIndex],
    green: data[fallbackIndex + 1],
    blue: data[fallbackIndex + 2],
  }
}

function applyLocalRepairFill(imageData, selection, alphaMap, options = {}) {
  if (!imageData || !selection?.size || !alphaMap) return imageData

  const { coreMask, repairMask } = buildRepairMasks(alphaMap, selection.size, options)
  const repaired = new Uint8ClampedArray(imageData.data)
  const { width, height, data } = imageData
  const coreBlend = options.coreBlend ?? 0.96
  const edgeBlend = options.edgeBlend ?? 0.64

  for (let localY = 0; localY < selection.size; localY += 1) {
    for (let localX = 0; localX < selection.size; localX += 1) {
      const localIndex = localY * selection.size + localX

      if (!repairMask[localIndex]) continue

      const pixelX = selection.x + localX
      const pixelY = selection.y + localY

      if (pixelX < 0 || pixelY < 0 || pixelX >= width || pixelY >= height) continue

      const sample = sampleRepairBackground(
        data,
        width,
        height,
        repairMask,
        selection,
        localX,
        localY,
        options
      )
      const pixelIndex = (pixelY * width + pixelX) * 4
      const blend = coreMask[localIndex] ? coreBlend : edgeBlend

      repaired[pixelIndex] = Math.round(data[pixelIndex] * (1 - blend) + sample.red * blend)
      repaired[pixelIndex + 1] = Math.round(data[pixelIndex + 1] * (1 - blend) + sample.green * blend)
      repaired[pixelIndex + 2] = Math.round(data[pixelIndex + 2] * (1 - blend) + sample.blue * blend)
    }
  }

  imageData.data.set(repaired)
  return imageData
}

async function runAutoCleanup() {
  if (!appState.sourceImage) return

  downloadButton.disabled = true
  syncSourcePreviews()
  setNote(processingMeta, "Preparing the first-pass cleanup preview...", "muted")
  setNote(uploadFeedback, "Image loaded. Cleanup preview is starting now.", "muted")
  setActiveState("processing", { scroll: true })
  await nextFrame()

  try {
    const signal = startProcessingSession()
    const engine = await enginePromise
    await yieldToMain()
    if (signal.aborted) return
    const { canvas, meta } = await removeWatermarkFromImage(appState.sourceImage, {
      adaptiveMode: "always",
      engine,
      maxPasses: 5,
    })
    await yieldToMain()
    if (signal.aborted) return
    const suggestedSelection = getSuggestedManualSelection(meta)
    const autoEvaluation = buildCleanupEvaluation(canvas, meta?.position, meta)

    appState.manualSelection = suggestedSelection
    renderManualSelection()

    if (!meta?.applied) {
      setNote(missMessage, friendlySkipMessage(meta), "error")
      setNote(
        manualSelectionNote,
        "Drag a tight square around the visible mark, then apply cleanup.",
        "muted"
      )
      setActiveState("miss")
      return
    }

    let finalCanvas = canvas
    let finalMeta = meta
    let finalMode = "auto"
    let finalEvaluation = autoEvaluation
    const autoRepairSelection = autoEvaluation.selection || suggestedSelection

    if (autoRepairSelection && shouldApplyAutoLocalRepair(autoEvaluation)) {
      const { canvas: repairedCanvas, context: repairedContext } = cloneCanvas(canvas)
      const repairedImageData = repairedContext.getImageData(
        0,
        0,
        repairedCanvas.width,
        repairedCanvas.height
      )
      const repairedAlphaMap = getManualAlphaMap(autoRepairSelection.size)

      if (repairedAlphaMap) {
        repairedContext.putImageData(
          applyLocalRepairFill(repairedImageData, autoRepairSelection, repairedAlphaMap, {
            alphaThreshold: AUTO_LOCAL_REPAIR_ALPHA_THRESHOLD,
            dilationPasses: AUTO_LOCAL_REPAIR_DILATION_PASSES,
            sampleRadius: AUTO_LOCAL_REPAIR_SAMPLE_RADIUS,
            minSamples: AUTO_LOCAL_REPAIR_MIN_SAMPLES,
            coreBlend: AUTO_LOCAL_REPAIR_CORE_BLEND,
            edgeBlend: AUTO_LOCAL_REPAIR_EDGE_BLEND,
          }),
          0,
          0
        )

        const repairedMeta = {
          ...meta,
          source: `${meta?.source || "auto"}+local-repair`,
        }
        const repairedEvaluation = buildCleanupEvaluation(
          repairedCanvas,
          repairedMeta.position,
          repairedMeta
        )

        if (shouldKeepAutoRepairResult(repairedEvaluation, autoEvaluation)) {
          finalCanvas = repairedCanvas
          finalMeta = repairedMeta
          finalMode = shouldEscalateCleanup(repairedEvaluation, "manual")
            ? "local-repair-warning"
            : "local-repair"
          finalEvaluation = repairedEvaluation
        }
      }
    }

    if (finalMode === "auto" && shouldEscalateCleanup(finalEvaluation, "auto")) {
      routeToManualRepair(finalMeta, finalEvaluation.selection || suggestedSelection)
      return
    }

    await finalizeSuccess(finalCanvas, finalMeta, finalMode)
  } catch (error) {
    setNote(uploadFeedback, error.message, "error")
    setActiveState("empty", { scroll: true })
  }
}

async function runManualCleanup() {
  if (!appState.sourceImage) {
    setNote(manualSelectionNote, "Load an image first.", "error")
    return
  }

  const selection = normalizeSquareSelection(
    appState.manualSelection || getDefaultManualSelection()
  )

  if (!selection) {
    setNote(manualSelectionNote, "Draw a square around the visible mark first.", "error")
    return
  }

  appState.manualSelection = selection
  renderManualSelection()
  setManualProcessing(true)
  setNote(manualSelectionNote, "Processing the selected square locally...", "muted")
  setNote(processingMeta, "Applying the manual square and preparing a new preview...", "muted")
  setActiveState("processing", { scroll: true })
  await nextFrame()

  try {
    const signal = startProcessingSession()
    const { canvas, context } = createCanvasFromSource()
    await yieldToMain()
    if (signal.aborted) return
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const result = removeRepeatedWatermarkLayers({
      imageData,
      alphaMap: getManualAlphaMap(selection.size),
      position: {
        x: selection.x,
        y: selection.y,
        width: selection.size,
        height: selection.size,
      },
      maxPasses: 4,
    })

    const manualAlphaMap = getManualAlphaMap(selection.size)
    context.putImageData(result.imageData, 0, 0)
    const manualMeta = {
      applied: true,
      passCount: result.passCount,
      position: {
        x: selection.x,
        y: selection.y,
        width: selection.size,
        height: selection.size,
      },
      source: "manual-selection",
    }
    const manualEvaluation = buildCleanupEvaluation(canvas, manualMeta.position, manualMeta)

    if (shouldEscalateCleanup(manualEvaluation, "manual")) {
      const repairedImageData = applyLocalRepairFill(result.imageData, selection, manualAlphaMap)
      context.putImageData(repairedImageData, 0, 0)

      const repairedMeta = {
        ...manualMeta,
        source: "manual-selection+local-repair",
      }
      const repairedEvaluation = buildCleanupEvaluation(canvas, repairedMeta.position, repairedMeta)
      const repairMode = shouldEscalateCleanup(repairedEvaluation, "manual")
        ? "local-repair-warning"
        : "local-repair"

      await finalizeSuccess(canvas, repairedMeta, repairMode)
      return
    }

    await finalizeSuccess(
      canvas,
      manualMeta,
      "manual"
    )
  } catch (error) {
    setActiveState("manual")
    setNote(manualSelectionNote, error.message, "error")
  } finally {
    setManualProcessing(false)
  }
}

async function runAdvancedCleanup() {
  if (!appState.sourceImage) {
    setNote(manualSelectionNote, "Load an image first.", "error")
    return
  }

  setNote(processingMeta, "Applying the advanced mathematical engine...", "muted")
  setActiveState("processing", { scroll: true })
  await nextFrame()

  try {
    const signal = startProcessingSession()
    await yieldToMain()
    if (signal.aborted) return

    // Disable the blur fallback in the mathematical processor
    window.__SKIP_GEMINI_BLUR_FALLBACK = true;
    
    // Process pure math reversal (vendor engine natively uses the inverse formula)
    const engine = await enginePromise
    const result = await engine.removeWatermarkFromImage(appState.sourceImage)

    window.__SKIP_GEMINI_BLUR_FALLBACK = false;

    if (signal.aborted) return
    
    const meta = result.meta
    if (meta) {
      meta.source = "advanced-engine"
    }
    
    await finalizeSuccess(
      result.canvas,
      meta || { applied: true, source: "advanced-engine" },
      "advanced-repair"
    )
  } catch (error) {
    window.__SKIP_GEMINI_BLUR_FALLBACK = false;
    setNote(uploadFeedback, error.message, "error")
    setActiveState("empty", { scroll: true })
  }
}

async function adoptSourceFile(file, options = {}) {
  const { sourceLabel = file.name } = options

  validateFile(file)

  const { image, objectUrl } = await loadImageFromBlob(file)

  revokeObjectUrl(appState.sourceUrl)
  revokeObjectUrl(appState.resultUrl)

  appState.sourceFile = file
  appState.sourceImage = image
  appState.sourceUrl = objectUrl
  appState.resultBlob = null
  appState.resultUrl = ""
  appState.resultFileName = buildDownloadName(sourceLabel)
  appState.meta = null
  appState.manualSelection = getDefaultManualSelection()

  syncSourcePreviews()
  setPreview(afterImage, "")
  renderManualSelection()
}

async function processSelectedFile(file, options = {}) {
  try {
    await adoptSourceFile(file, options)
    await runAutoCleanup()
  } catch (error) {
    setNote(uploadFeedback, error.message, "error")
    setActiveState("empty", { scroll: true })
  }
}

async function loadDemoImage(
  demoSrc = "/demo/demo-01-sparkle-before.png",
  sourceName = "demo-01-sparkle-before.png"
) {
  try {
    setNote(uploadFeedback, "Loading example image...", "muted")
    const response = await fetch(demoSrc)
    if (!response.ok) {
      throw new Error("Could not load the example image. Please try uploading your own.")
    }
    const blob = await response.blob()
    const file = new File([blob], sourceName, { type: blob.type || "image/png" })
    await processSelectedFile(file, { sourceLabel: sourceName })
  } catch (error) {
    setNote(uploadFeedback, error.message, "error")
  }
}

function downloadResult() {
  if (!appState.resultBlob) return

  const anchor = document.createElement("a")
  anchor.href = appState.resultUrl
  anchor.download = appState.resultFileName || buildDownloadName("cleaned-image")
  anchor.click()
}

function resetTool() {
  clearWorkingAssets()
  fileInput.value = ""
  setPreview(processingImage, "")
  setPreview(beforeImage, "")
  setPreview(afterImage, "")
  setPreview(missImage, "")
  setPreview(manualImage, "")
  selectionBox?.classList.add("is-hidden")
  setNote(uploadFeedback, "Choose an image to start the browser-only cleanup.", "muted")
  setNote(successMeta, "Review the preview before downloading.", "success")
  setNote(missMessage, "Manual selection usually works better on cropped or textured images.", "muted")
  setNote(manualSelectionNote, "Start with a tight square around the visible mark.", "muted")
  updateDownloadUi(null)
  downloadButton.disabled = true
  setActiveState("empty", { scroll: true })
}

function attachDropzone() {
  if (!emptyDropzone) return

  const enterEvents = ["dragenter", "dragover"]
  const leaveEvents = ["dragleave", "dragend", "drop"]

  enterEvents.forEach((eventName) => {
    emptyDropzone.addEventListener(eventName, (event) => {
      event.preventDefault()
      emptyDropzone.classList.add("is-dragover")
    })
  })

  leaveEvents.forEach((eventName) => {
    emptyDropzone.addEventListener(eventName, (event) => {
      event.preventDefault()
      emptyDropzone.classList.remove("is-dragover")
    })
  })

  emptyDropzone.addEventListener("drop", async (event) => {
    const [file] = Array.from(event.dataTransfer?.files || [])
    if (file) {
      await processSelectedFile(file)
    }
  })
}

function bindManualSelection() {
  if (!manualSurface) return

  manualSurface.addEventListener("pointerdown", (event) => {
    if (!appState.sourceImage) return

    const startPoint = eventToImagePoint(event)
    if (!startPoint) return

    manualDrag.active = true
    manualDrag.pointerId = event.pointerId
    manualDrag.start = startPoint
    appState.manualSelection = buildManualSelection(startPoint, startPoint)
    renderManualSelection()
    setNote(manualSelectionNote, "Release to confirm the square, then apply cleanup.", "muted")

    manualSurface.setPointerCapture(event.pointerId)
  })

  manualSurface.addEventListener("pointermove", (event) => {
    if (!manualDrag.active || event.pointerId !== manualDrag.pointerId) return

    const currentPoint = eventToImagePoint(event)
    if (!currentPoint) return

    appState.manualSelection = buildManualSelection(manualDrag.start, currentPoint)
    renderManualSelection()
  })

  const endDrag = (event) => {
    if (!manualDrag.active || event.pointerId !== manualDrag.pointerId) return

    manualDrag.active = false
    manualDrag.pointerId = null
    manualDrag.start = null
    manualSurface.releasePointerCapture(event.pointerId)

    if (appState.manualSelection) {
      setNote(
        manualSelectionNote,
        `Selected ${appState.manualSelection.size}px square. Apply cleanup when ready.`,
        "muted"
      )
    }
  }

  manualSurface.addEventListener("pointerup", endDrag)
  manualSurface.addEventListener("pointercancel", endDrag)
}

function bindEvents() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveState(tab.dataset.stateTarget))
  })

  heroUploadButton?.addEventListener("click", chooseInputFile)
  midCtaUploadButton?.addEventListener("click", chooseInputFile)
  demoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const demoSrc = button.dataset.demoSrc
      const sourceName =
        button.dataset.demoName || demoSrc?.split("/").pop() || "demo-01-sparkle-before.png"

      if (!demoSrc) return

      void loadDemoImage(demoSrc, sourceName)
    })
  })

  fileInput?.addEventListener("change", async (event) => {
    const [file] = Array.from(event.target.files || [])
    if (file) {
      await processSelectedFile(file)
    }
  })

  downloadButton?.addEventListener("click", downloadResult)
  resetButton?.addEventListener("click", resetTool)
  retryButton?.addEventListener("click", runAutoCleanup)
  retryAutoButton?.addEventListener("click", runAutoCleanup)
  manualModeButton?.addEventListener("click", () => {
    appState.manualSelection =
      normalizeSquareSelection(appState.manualSelection) || getDefaultManualSelection()
    renderManualSelection()
    setActiveState("manual")
  })
  applyManualButton?.addEventListener("click", runManualCleanup)
  successLooksGoodButton?.addEventListener("click", () => {
    setNote(successMeta, "Looks ready. Download when you are comfortable with the preview.", "success")
  })
  successNeedsHelpButton?.addEventListener("click", () => {
    const selection =
      normalizeSquareSelection(appState.manualSelection) ||
      getSuggestedManualSelection(appState.meta) ||
      getDefaultManualSelection()
    routeToManualRepair(
      appState.meta,
      selection,
      "Draw a tight square around the remaining visible mark, then apply a closer repair pass."
    )
  })

  tryAdvancedButton?.addEventListener("click", runAdvancedCleanup)
  missAdvancedButton?.addEventListener("click", runAdvancedCleanup)
  manualAdvancedButton?.addEventListener("click", runAdvancedCleanup)

  window.addEventListener("resize", renderManualSelection)
  window.addEventListener("beforeunload", () => {
    clearWorkingAssets()
  })
}

async function init() {
  downloadButton.disabled = true
  mountToolWorkspaceInHero()
  bindEvents()
  bindManualSelection()
  bindCompareSliders()
  attachDropzone()
  setActiveState("empty")

  if (typeof window !== "undefined") {
    window.__geminiRemoverDebug = {
      getMeta: () => appState.meta,
      getResultMode: () => appState.resultMode,
      getManualSelection: () => appState.manualSelection,
    }
  }
}

export function bootLegacyToolPage() {
  if (typeof window === "undefined" || window.__geminiRemoverAppInitialized) {
    return
  }

  window.__geminiRemoverAppInitialized = true
  init()
}

if (typeof window !== "undefined") {
  bootLegacyToolPage()
}
