import React, { useState } from 'react'
import {
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaFile,
} from 'react-icons/fa'
import FileForm from '../../components/admin/FileForm'
import { useAsyncMutation } from '../../hooks/hook.js'
import { universityMajors, docTypes } from '../../constants/category.js'
import {
  useUploadDocumentMutation,
  useGetAllDocumentQuery,
  useUpdateDocumentMutation,
  useReplaceDocumentMutation,
  useDeleteDocumentMutation,
} from '../../redux/api/api.js'

const Files = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)
  const [mode, setMode] = useState('add') // 'add' | 'edit' | 'replace'

  const [search, setSearch] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedType, setSelectedType] = useState('')

  // API hooks
  const { data: documentData, refetch } = useGetAllDocumentQuery()
  const [uploadDocument] = useAsyncMutation(useUploadDocumentMutation)
  const [updateDocument] = useAsyncMutation(useUpdateDocumentMutation)
  const [replaceDocument] = useAsyncMutation(useReplaceDocumentMutation)
  const [deleteDocument] = useAsyncMutation(useDeleteDocumentMutation)

  const documents = documentData?.documents || []

  // Actions
  const handleAddDocument = async (newDocument) => {
    const result = await uploadDocument('Đang tải tài liệu...', newDocument)
    if (result.success) {
      await refetch()
      setIsModalOpen(false)
    }
  }

  const handleEditDocument = async (updatedDocument) => {
    const { id, ...rest } = updatedDocument
    const result = await updateDocument('Đang cập nhật tài liệu...', {
      id,
      ...rest,
    })
    if (result.success) {
      await refetch()
      setIsModalOpen(false)
    }
  }

  const handleReplaceDocument = async (replaceData) => {
    const { id, file } = replaceData
    const result = await replaceDocument('Đang thay thế tài liệu...', {
      id,
      file,
    })
    if (result.success) {
      await refetch()
      setIsModalOpen(false)
    }
  }

  const handleDeleteDocument = async (docId) => {
    const result = await deleteDocument('Đang xóa tài liệu...', docId)
    if (result.success) {
      await refetch()
    }
  }

  // Filter
  const filteredDocuments = documents.filter((doc) => {
    const matchesName = doc.title?.toLowerCase().includes(search.toLowerCase())
    const matchesMajor = selectedMajor ? doc.major === selectedMajor : true
    const matchesAuthor = selectedAuthor ? doc.author === selectedAuthor : true
    const matchesYear = selectedYear
      ? selectedYear === 'after-2020'
        ? doc.publishedYear > 2020
        : selectedYear === 'before-2020'
        ? doc.publishedYear <= 2020
        : true
      : true
    const matchesType = selectedType ? doc.type === selectedType : true
    return (
      matchesName && matchesMajor && matchesAuthor && matchesYear && matchesType
    )
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">
            Danh sách tài liệu
          </h2>
          <button
            onClick={() => {
              setEditingDocument(null)
              setMode('add')
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
          >
            <FaPlus />
            Thêm tài liệu
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Chọn loại tài liệu</option>
            {docTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
          >
            <option value="">Chọn ngành</option>
            {universityMajors.map((major) => (
              <option key={major.value} value={major.value}>
                {major.label}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Chọn năm xuất bản</option>
            <option value="after-2020">Sau 2020</option>
            <option value="before-2020">Trước 2020</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Tiêu đề</th>
              <th className="border px-4 py-2">Thể loại</th>
              <th className="border px-4 py-2">Ngành</th>
              <th className="border px-4 py-2">Môn</th>
              <th className="border px-4 py-2">Tác giả</th>
              <th className="border px-4 py-2">Năm</th>
              <th className="border px-4 py-2">Tải về</th>
              <th className="border px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{doc.title}</td>
                <td className="border px-4 py-2">{doc.type}</td>
                <td className="border px-4 py-2">{doc.subject.major}</td>
                <td className="border px-4 py-2">{doc.subject.name}</td>
                <td className="border px-4 py-2">{doc.author}</td>
                <td className="border px-4 py-2">{doc.publishedYear}</td>
                <td className="border px-4 py-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Xem file
                  </a>
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingDocument(doc)
                      setMode('edit')
                      setIsModalOpen(true)
                    }}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setEditingDocument(doc)
                      setMode('replace')
                      setIsModalOpen(true)
                    }}
                    className="text-gray-600 hover:text-green-600"
                  >
                    <FaFile />
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc._id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
              ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
              }
            `}
          >
            <FaChevronLeft />
            Trước
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md transition cursor-pointer
                  ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
              ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
              }
            `}
          >
            Sau
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <FileForm
          mode={mode}
          initialData={editingDocument || {}}
          onSubmit={mode === 'edit' ? handleEditDocument : handleAddDocument}
          onReplace={mode === 'replace' ? handleReplaceDocument : null}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Files
