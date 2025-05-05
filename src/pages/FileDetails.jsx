/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // Import useNavigate để điều hướng
import { FaEye, FaDownload, FaBookmark, FaFlag } from 'react-icons/fa'
import SuggestModal from '../components/shared/SuggestModal' // Import SuggestModal
import { useGetDocumentByIdQuery } from '../redux/api/api.js'
import Comments from '../components/shared/Comments'
import { useErrors } from '../hooks/hook.js'

import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url'
import defaultFileImg from '../assets/doc_image_default.png'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const FileDetails = () => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { data, isError, error } = useGetDocumentByIdQuery(id)
  useErrors([{ isError, error }])

  const [showModal, setShowModal] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)
  const [isLoadingThumb, setIsLoadingThumb] = useState(false)

  const document = data?.document

  useEffect(() => {
    const generateThumbnail = async () => {
      if (!document?.fileUrl?.endsWith('.pdf')) return

      setIsLoadingThumb(true)
      try {
        const loadingTask = pdfjsLib.getDocument(document.fileUrl)
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
      } catch (err) {
        console.error('Error generating thumbnail:', err.message || err)
      } finally {
        setIsLoadingThumb(false)
      }
    }

    if (document?.fileUrl) generateThumbnail()
  }, [document])

  const handleAction = (actionType) => {
    if (!token) {
      setShowModal(true)
      return
    }

    switch (actionType) {
      case 'view':
        window.open(document?.fileUrl, '_blank')
        break
      case 'save':
        console.log('Đã lưu tài liệu')
        break
      case 'download':
        window.open(document?.fileUrl, '_blank')
        break
      case 'report':
        console.log('Report/Phản hồi tài liệu')
        break
      default:
        break
    }
  }

  if (!document) return null

  const { title, description, publishedYear, author, type, fileUrl, subject } =
    document

  const categoryPrefix =
    type === 'Giáo trình'
      ? 'Giáo trình: '
      : type === 'Ngân hàng'
      ? 'Ngân hàng: '
      : type === 'Đề thi'
      ? 'Đề thi: '
      : ''

  const imageSrc =
    thumbnail || (!fileUrl?.endsWith('.pdf') && fileUrl) || defaultFileImg

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-6">
        <button
          className="flex items-center text-red-600 font-semibold mb-4 hover:cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Quay về trang trước
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md flex gap-6">
          <div className="flex-1">
            {isLoadingThumb ? (
              <div className="w-[400px] h-[550px] flex items-center justify-center bg-gray-200 rounded-lg">
                Đang tải ảnh...
              </div>
            ) : (
              <img
                src={imageSrc}
                alt={title}
                className="w-[400px] h-[550px] object-cover rounded-lg border mb-12"
              />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-7">
              {categoryPrefix}
              {title}
            </h2>
            <p className="text-lg font-semibold text-gray-600">
              Ngành: {subject?.major}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Môn học: {subject?.name}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Năm xuất bản: {publishedYear}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Tác giả: {author}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Mô tả: {description}
            </p>

            <div className="flex gap-4 mt-12">
              {[
                { icon: FaEye, label: 'Xem trước', action: 'view' },
                { icon: FaBookmark, label: 'Lưu', action: 'save' },
                { icon: FaDownload, label: 'Tải về', action: 'download' },
              ].map(({ icon: Icon, label, action }, index) => (
                <div key={index} className="group relative">
                  <button
                    onClick={() => handleAction(action)}
                    className="p-3 w-12 h-12 bg-red-600 text-white rounded-md flex items-center justify-center hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
                  >
                    <Icon size={20} />
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded w-max opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </div>
              ))}

              <button
                onClick={() => handleAction('report')}
                className="flex items-center gap-2 p-3 px-4 border border-red-600 text-red-600 rounded-md cursor-pointer hover:bg-gray-100 transition duration-200"
              >
                <FaFlag size={20} />
                <span>Phản hồi</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <Comments />
        </div>
      </div>

      <SuggestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Bạn cần đăng nhập"
        description="Đăng nhập để sử dụng chức năng này hoặc đăng ký nếu bạn chưa có tài khoản."
        onLogin={() => navigate('/login')}
        onRegister={() => navigate('/register')}
      />
    </div>
  )
}

export default FileDetails
