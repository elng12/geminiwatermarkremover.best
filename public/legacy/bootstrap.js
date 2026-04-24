let runtimePromise = null

function getRuntimeApi() {
  return window.__geminiRemover || null
}

async function loadRuntime() {
  const readyApi = getRuntimeApi()
  if (readyApi) return readyApi

  if (!runtimePromise) {
    runtimePromise = import("./app.js").then(() => {
      const api = getRuntimeApi()
      if (!api) {
        throw new Error("The cleanup engine could not start. Please reload and try again.")
      }
      return api
    })
  }

  return runtimePromise
}

function setStatus(text, tone = "muted") {
  const status = document.getElementById("upload-feedback")
  if (!status) return

  status.textContent = text
  status.className = "state-note"

  if (tone === "error") {
    status.classList.add("state-note-error")
  }
}

function bindUploadLabel(fileInput) {
  const uploadLabel = document.getElementById("hero-upload-button")
  if (!uploadLabel || !fileInput) return

  uploadLabel.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return

    event.preventDefault()
    fileInput.click()
  })
}

function bindFileInput(fileInput) {
  if (!fileInput) return

  fileInput.addEventListener("change", async (event) => {
    if (getRuntimeApi()) return

    const [file] = Array.from(event.target.files || [])
    if (!file) return

    try {
      setStatus("Loading the local cleanup engine...")
      const api = await loadRuntime()
      await api.processSelectedFile(file)
    } catch (error) {
      setStatus(error.message || "The cleanup engine could not start.", "error")
    }
  })
}

function bindDemoButtons() {
  const demoButtons = Array.from(document.querySelectorAll("[data-demo-src]"))

  demoButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (getRuntimeApi()) return

      const demoSrc = button.dataset.demoSrc
      const sourceName =
        button.dataset.demoName || demoSrc?.split("/").pop() || "demo-01-sparkle-before.png"

      if (!demoSrc) return

      try {
        setStatus("Loading the local cleanup engine...")
        const api = await loadRuntime()
        await api.loadDemoImage(demoSrc, sourceName)
      } catch (error) {
        setStatus(error.message || "The example image could not be loaded.", "error")
      }
    })
  })
}

function bindDropzone() {
  const dropzone = document.getElementById("empty-dropzone")
  if (!dropzone) return

  const enterEvents = ["dragenter", "dragover"]
  const leaveEvents = ["dragleave", "dragend", "drop"]

  enterEvents.forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault()
      dropzone.classList.add("is-dragover")
    })
  })

  leaveEvents.forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault()
      dropzone.classList.remove("is-dragover")
    })
  })

  dropzone.addEventListener("drop", async (event) => {
    if (getRuntimeApi()) return

    const [file] = Array.from(event.dataTransfer?.files || [])
    if (!file) return

    try {
      setStatus("Loading the local cleanup engine...")
      const api = await loadRuntime()
      await api.processSelectedFile(file)
    } catch (error) {
      setStatus(error.message || "The dropped image could not be processed.", "error")
    }
  })
}

function initBootstrap() {
  const fileInput = document.getElementById("file-input")

  bindUploadLabel(fileInput)
  bindFileInput(fileInput)
  bindDemoButtons()
  bindDropzone()
}

initBootstrap()
