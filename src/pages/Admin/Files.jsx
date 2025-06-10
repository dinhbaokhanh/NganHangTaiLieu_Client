import React, { useState, useMemo } from 'react'
import {
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaFile,
} from 'react-icons/fa'
import FileForm from '../../components/admin/FileForm'
import RemoveForm from '../../components/admin/RemoveForm'
import { useAsyncMutation } from '../../hooks/hook.js'
import { universityMajors, docTypes } from '../../constants/category.js'
import {
  useUploadDocumentMutation,
  useGetAllDocumentQuery,
  useUpdateDocumentMutation,
  useReplaceDocumentMutation,
  useDeleteDocumentMutation,
  useGetAllSubjectsQuery,
} from '../../redux/api/api.js'

const Files = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)
  const [mode, setMode] = useState('add') // 'add' | 'edit' | 'replace'
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const [search, setSearch] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  // API hooks
  const { data: documentData, refetch } = useGetAllDocumentQuery()
  const { data: subjectsData } = useGetAllSubjectsQuery()
  const [uploadDocument] = useAsyncMutation(useUploadDocumentMutation)
  const [updateDocument] = useAsyncMutation(useUpdateDocumentMutation)
  const [replaceDocument] = useAsyncMutation(useReplaceDocumentMutation)
  const [deleteDocument] = useAsyncMutation(useDeleteDocumentMutation)

  const documents = documentData?.documents || []
  const subjectList = subjectsData?.subjects || []

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

  // Gợi ý môn học dựa trên input
  const filteredSuggestions = useMemo(() => {
    if (!selectedSubject) return subjectList
    return subjectList.filter((subject) =>
      subject.name.toLowerCase().includes(selectedSubject.toLowerCase())
    )
  }, [subjectList, selectedSubject])

  // Filter
  const filteredDocuments = documents.filter((doc) => {
    const matchesName = doc.title?.toLowerCase().includes(search.toLowerCase())
    const matchesSubject = selectedSubject
      ? doc.subject?.name?.toLowerCase().includes(selectedSubject.toLowerCase())
      : true
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
      matchesName && matchesSubject && matchesAuthor && matchesYear && matchesType
    )
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
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

  // Xử lý clear filter
  const clearSubjectFilter = () => {
    setSelectedSubject('')
    setShowSuggestions(false)
  }

  // Xử lý xác nhận xóa
  const handleConfirmDelete = async () => {
    if (selectedDocument) {
      await handleDeleteDocument(selectedDocument._id)
      setIsRemoveModalOpen(false)
      setSelectedDocument(null)
    }
  }

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
          {/* Bộ lọc môn học kiểu autocomplete giống Home */}
          <div className="relative w-64">
            <input
              type="text"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Nhập hoặc chọn môn học..."
              className="px-4 py-2 border rounded-md w-full pr-8"
            />
            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredSuggestions.map((subject) => (
                  <button
                    key={subject._id}
                    onClick={() => {
                      setSelectedSubject(subject.name)
                      setShowSuggestions(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-700">{subject.name}</span>
                  </button>
                ))}
              </div>
            )}
            {selectedSubject && (
              <button
                type="button"
                onClick={clearSubjectFilter}
                className="absolute top-1/2 -translate-y-1/2 right-2 font-bold text-red-500 hover:text-red-700 text-xs cursor-pointer p-0"
                title="Xóa bộ lọc"
                style={{ lineHeight: 1 }}
              >
                ✕
              </button>
            )}
          </div>
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
              {/* <th className="border px-4 py-2">Ngành</th> */}
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
                {/* <td className="border px-4 py-2">{doc.subject.major}</td> */}
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
                    className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setEditingDocument(doc)
                      setMode('replace')
                      setIsModalOpen(true)
                    }}
                    className="text-gray-600 hover:text-green-600 cursor-pointer"
                  >
                    <FaFile />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDocument(doc)
                      setIsRemoveModalOpen(true)
                    }}
                    className="text-gray-600 hover:text-red-600 cursor-pointer"
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
                  : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer'
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
                  : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer'
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

      {/* Modal xác nhận xóa tài liệu */}
      {isRemoveModalOpen && selectedDocument && (
        <RemoveForm
          title="Xác nhận xóa tài liệu"
          description={`Bạn có chắc chắn muốn xóa tài liệu "${selectedDocument.title}"?`}
          warningMessage="Khi xóa tài liệu này, tất cả dữ liệu liên quan cũng sẽ bị xóa vĩnh viễn."
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsRemoveModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Files
