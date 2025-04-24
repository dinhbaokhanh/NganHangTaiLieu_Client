import React, { useState } from 'react'
import { FaEllipsisV, FaPlus, FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa'
import FileForm from '../../components/admin/FileForm'

const Files = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Giáo trình Lập trình', major: 'Công nghệ thông tin', author: 'Nguyễn Văn A', year: 2023, type: 'Giáo trình' },
    { id: 2, name: 'Kinh tế học cơ bản', major: 'Kinh tế', author: 'Trần Thị B', year: 2022, type: 'Giáo trình' },
    { id: 3, name: 'Quản trị doanh nghiệp', major: 'Quản trị kinh doanh', author: 'Lê Văn C', year: 2021, type: 'Ngân hàng câu hỏi' },
    { id: 4, name: 'Giải thuật nâng cao', major: 'Công nghệ thông tin', author: 'Phạm Thị D', year: 2020, type: 'Giáo trình' },
    { id: 5, name: 'Phân tích tài chính', major: 'Kinh tế', author: 'Hoàng Văn E', year: 2019, type: 'Ngân hàng câu hỏi' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)

  const [search, setSearch] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const handleAddDocument = (newDocument) => {
    setDocuments([...documents, { id: Date.now(), ...newDocument }])
    setIsModalOpen(false)
  }

  const handleEditDocument = (updatedDocument) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === editingDocument.id ? { ...doc, ...updatedDocument } : doc
      )
    )
    setEditingDocument(null)
    setIsModalOpen(false)
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesName = doc.name.toLowerCase().includes(search.toLowerCase())
    const matchesMajor = selectedMajor ? doc.major === selectedMajor : true
    const matchesAuthor = selectedAuthor ? doc.author === selectedAuthor : true
    const matchesYear = selectedYear ? doc.year === parseInt(selectedYear) : true
    const matchesType = selectedType ? doc.type === selectedType : true
    return matchesName && matchesMajor && matchesAuthor && matchesYear && matchesType
  })

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Tiêu đề và nút thêm tài liệu */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Danh sách tài liệu</h2>
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
            <option value="Giáo trình">Giáo trình</option>
            <option value="Ngân hàng câu hỏi">Ngân hàng câu hỏi</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
          >
            <option value="">Chọn ngành</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Chọn tác giả</option>
            <option value="Nguyễn Văn A">Nguyễn Văn A</option>
            <option value="Trần Thị B">Trần Thị B</option>
            <option value="Lê Văn C">Lê Văn C</option>
            <option value="Phạm Thị D">Phạm Thị D</option>
            <option value="Hoàng Văn E">Hoàng Văn E</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Chọn năm xuất bản</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        {/* Bảng tài liệu */}
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Tên tài liệu</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Loại tài liệu</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Ngành</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tác giả</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Năm xuất bản</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{doc.name}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.type}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.major}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.author}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.year}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {/* Icon chỉnh sửa */}
                  <button
                    onClick={() => {
                      setEditingDocument(doc)
                      setIsModalOpen(true)
                    }}
                    className="text-gray-600 cursor-pointer hover:text-blue-600 mr-4"
                  >
                    <FaEdit />
                  </button>

                  {/* Icon xóa */}
                  <button
                    className="text-gray-600 cursor-pointer hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="flex items-center justify-center gap-2 w-24 px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition"
          >
            <FaChevronLeft />
            Trước
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-red-600 hover:text-white transition"
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="flex items-center justify-center gap-2 w-24 px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition"
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
          onSubmit={editingDocument ? handleEditDocument : handleAddDocument}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Files