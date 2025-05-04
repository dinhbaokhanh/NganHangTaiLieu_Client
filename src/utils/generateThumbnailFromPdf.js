import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export const generateThumbnailFromPdf = async (fileUrl) => {
  try {
    const loadingTask = pdfjsLib.getDocument(fileUrl)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)

    const viewport = page.getViewport({ scale: 1 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    }
    await page.render(renderContext).promise

    const thumbnail = canvas.toDataURL('image/png')
    return thumbnail
  } catch (error) {
    console.error('Failed to generate thumbnail:', error)
    return null
  }
}
