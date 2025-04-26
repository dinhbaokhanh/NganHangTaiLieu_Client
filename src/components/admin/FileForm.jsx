import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const FileForm = ({ mode = 'add', initialData = {}, onSubmit, onClose }) => {
  const [name, setName] = useState(initialData.name || '')
  const [major, setMajor] = useState(initialData.major || '')
  const [author, setAuthor] = useState(initialData.author || '')
  const [year, setYear] = useState(initialData.year || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [file, setFile] = useState(initialData.file || null)
  const [type, setType] = useState(initialData.type || '')

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0]
    setFile(uploadedFile)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('major', major)
    formData.append('author', author)
    formData.append('year', year)
    formData.append('description', description)
    formData.append('type', type)
    if (file) formData.append('file', file)

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative border-2 border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          {mode === 'add' ? 'Thêm tài liệu' : 'Cập nhật tài liệu'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên tài liệu + Loại tài liệu */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Tên tài liệu
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập tên tài liệu"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Loại tài liệu
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Chọn loại tài liệu</option>
                <option value="Giáo trình">Giáo trình</option>
                <option value="Ngân hàng câu hỏi">Ngân hàng câu hỏi</option>
              </select>
            </div>
          </div>

          {/* Tác giả */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tác giả
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Nhập tên tác giả"
            />
          </div>

          {/* Ngành + Năm xuất bản */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Ngành
              </label>
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Chọn ngành</option>
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Năm xuất bản
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập năm xuất bản"
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Nhập mô tả tài liệu"
              rows="4"
            />
          </div>

          {/* Upload file */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tài liệu
            </label>
            <div
              className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              {file ? (
                <p className="text-gray-600">
                  Tệp đã chọn: <strong>{file.name}</strong>
                </p>
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-gray-500 text-4xl mb-2" />
                  <p className="text-gray-500">Click để tải lên hoặc kéo thả</p>
                  <p className="text-gray-400 text-sm">PDF, DOC, DOCX,...</p>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-white hover:text-red-600 border border-red-600 transition"
            >
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FileForm
