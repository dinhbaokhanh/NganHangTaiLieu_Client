import React, { useEffect, useState } from 'react'
import {
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'
import FileForm from '../../components/admin/FileForm'
import { useAsyncMutation, useErrors } from '../../hooks/hook.js'
import { universityMajors, docTypes } from '../../constants/category.js'

const Files = () => {
  const [documents, setDocuments] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)

  const [search, setSearch] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const handleAddDocument = async (newDocument) => {}

  const handleEditDocument = async (updatedDocument) => {}

  const handleReplaceDocument = async (newDocument) => {}

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

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDocuments = documents.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Tiêu đề và nút thêm tài liệu */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">
            Danh sách tài liệu
          </h2>
          <button
            onClick={() => {
              setEditingDocument(null)
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
          >
            <FaPlus />
            Thêm tài liệu
          </button>
        </div>

        {/* Tìm kiếm và bộ lọc */}
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

        {/* Bảng tài liệu */}
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Tiêu đề</th>
              <th className="border px-4 py-2">Thể loại</th>
              <th className="border px-4 py-2">Ngành</th>
              <th className="border px-4 py-2">Tác giả</th>
              <th className="border px-4 py-2">Năm</th>
              <th className="border px-4 py-2">Tải về</th>
              <th className="border px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{doc.title}</td>
                <td className="border px-4 py-2">{doc.type}</td>
                <td className="border px-4 py-2">{doc.major}</td>
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
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setEditingDocument(doc)
                      setIsModalOpen(true)
                    }}
                    className="text-gray-600 hover:text-blue-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="flex justify-between items-center mt-6">
          {/* Nút Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center cursor-pointer gap-2 w-24 px-4 py-2 rounded-md transition
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

          {/* Các nút số trang */}
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

          {/* Nút Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition cursor-pointer
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

      {/* Modal thêm/cập nhật tài liệu */}
      {isModalOpen && (
        <FileForm
          mode={editingDocument ? 'edit' : 'add'}
          initialData={editingDocument || {}}
          onSubmit={
            editingDocument
              ? (formData) => handleEditDocument(formData)
              : handleAddDocument
          }
          onReplace={editingDocument ? handleReplaceDocument : null}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Files
