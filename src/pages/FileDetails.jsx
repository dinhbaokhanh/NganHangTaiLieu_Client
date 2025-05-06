/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FaEye,
  FaDownload,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
} from 'react-icons/fa'
import SuggestModal from '../components/shared/SuggestModal'
import {
  useGetDocumentByIdQuery,
  useSaveDocumentMutation,
  useUnsaveDocumentMutation,
  useIsDocumentSavedQuery,
} from '../redux/api/api.js'
import Comments from '../components/shared/Comments'
import { useErrors, useAsyncMutation } from '../hooks/hook.js'

import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url'
import defaultFileImg from '../assets/doc_image_default.png'
import { useSelector } from 'react-redux'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const FileDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const { data, isError, error } = useGetDocumentByIdQuery(id)
  const document = data?.document

  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?.id

  const [saveDoc] = useAsyncMutation(useSaveDocumentMutation)
  const [unsaveDoc] = useAsyncMutation(useUnsaveDocumentMutation)

  const {
    data: savedStatus,
    refetch: refetchIsSaved,
    isLoading: isCheckingSaved,
  } = useIsDocumentSavedQuery({ userId, documentId: id }, { skip: !userId })

  const [showModal, setShowModal] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)
  const [isLoadingThumb, setIsLoadingThumb] = useState(false)

  useErrors([{ isError, error }])

  useEffect(() => {
    const generateThumbnail = async () => {
      if (!document?.fileUrl?.endsWith('.pdf')) return
      setIsLoadingThumb(true)
      try {
        if (typeof window === 'undefined') return
        const loadingTask = pdfjsLib.getDocument(document.fileUrl)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = window.document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        await page.render({ canvasContext: context, viewport }).promise
        setThumbnail(canvas.toDataURL())
      } catch (err) {
        console.error('Error generating thumbnail:', err.message || err)
      } finally {
        setIsLoadingThumb(false)
      }
    }

    if (document?.fileUrl) generateThumbnail()
  }, [document])

  const handleAction = async (type) => {
    if (!token) return setShowModal(true)

    switch (type) {
      case 'view':
      case 'download':
        window.open(document?.fileUrl, '_blank')
        break
      case 'save':
        if (isCheckingSaved) return
        const mutation = savedStatus?.isSaved ? unsaveDoc : saveDoc
        const msg = savedStatus?.isSaved
          ? 'Đang bỏ lưu...'
          : 'Đang lưu tài liệu...'
        const result = await mutation(msg, { userId, documentId: id })
        if (result.success) refetchIsSaved()
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

  const InfoSection = () => (
    <>
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
      <p className="text-lg font-semibold text-gray-600">Tác giả: {author}</p>
      <p className="text-lg font-semibold text-gray-600">
        Mô tả: {description}
      </p>
    </>
  )

  const ActionButtons = () => (
    <div className="flex gap-4 mt-12">
      {[
        { icon: FaEye, label: 'Xem', action: 'view' },
        {
          icon: savedStatus?.isSaved ? FaBookmark : FaRegBookmark,
          label: savedStatus?.isSaved ? 'Bỏ lưu' : 'Lưu',
          action: 'save',
        },
      ].map(({ icon: Icon, label, action }, i) => (
        <div key={i} className="group  relative">
          <button
            onClick={() => handleAction(action)}
            className="p-3 cursor-pointer w-12 h-12 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-white hover:text-red-600 border hover:border-red-600 transition"
          >
            <Icon size={20} />
          </button>
          <span className="absolute  bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded w-max opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
          </span>
        </div>
      ))}

      <button
        onClick={() => handleAction('report')}
        className="flex items-center cursor-pointer gap-2 p-3 px-4 border border-red-600 text-red-600 rounded-md hover:bg-gray-100 transition"
      >
        <FaFlag size={20} />
        <span>Phản hồi</span>
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-6">
        <button
          className="flex items-center text-red-600 font-semibold mb-4 hover:underline"
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
            <InfoSection />
            {userId ? (
              <ActionButtons />
            ) : (
              <div className="mt-8">
                <p className="text-center text-gray-700 mt-4">
                  Vui lòng đăng nhập để thực hiện xem tài liệu này.
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <Comments documentId={id} />
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
