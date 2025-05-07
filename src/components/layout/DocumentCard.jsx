import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url'
import defaultFileImg from '../../assets/doc_image_default.png'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const DocumentCard = ({ doc }) => {
  const [thumbnail, setThumbnail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadThumbnail = async () => {
      if (!doc.fileUrl || !doc.fileUrl.endsWith('.pdf')) return

      setIsLoading(true)
      try {
        const loadingTask = pdfjsLib.getDocument(doc.fileUrl)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)

        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({ canvasContext: context, viewport }).promise

        const imgData = canvas.toDataURL()
        setThumbnail(imgData)
      } catch (error) {
        console.error('Error loading PDF thumbnail:', error.message || error)
      } finally {
        setIsLoading(false)
      }
    }

    loadThumbnail()
  }, [doc.fileUrl])

  const imageSrc =
    thumbnail ||
    (!doc.fileUrl?.endsWith('.pdf') && doc.fileUrl) ||
    defaultFileImg

  const handleClick = () => {
    if (doc._id) {
      navigate(`/file/${doc._id}`)
    }
  }

  return (
    <div
      className="relative border rounded-lg p-2 shadow-md hover:shadow-lg cursor-pointer transition duration-200"
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="w-full h-40 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={doc.title}
          className="w-full h-40 object-cover rounded-md"
        />
      )}
      <p className="flex items-center justify-center text-center font-medium mt-2 h-10">
        {doc.title}
      </p>
    </div>
  )
}

export default DocumentCard
