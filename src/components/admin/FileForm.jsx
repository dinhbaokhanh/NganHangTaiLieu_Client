import React, { useState } from 'react'
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import { docTypes, universityMajors } from '../../constants/category.js'

const FileForm = ({
  mode = 'add',
  initialData = {},
  onSubmit,
  onClose,
  onReplace,
}) => {
  const [title, setTitle] = useState(initialData.title || '')
  const [major, setMajor] = useState(initialData.major || '')
  const [author, setAuthor] = useState(initialData.author || '')
  const [publishedYear, setPublishedYear] = useState(
    initialData.publishedYear || ''
  )
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
    formData.append('title', title)
    formData.append('major', major)
    formData.append('author', author)
    formData.append('publishedYear', publishedYear)
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
          className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-600"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          {mode === 'add' ? 'Thêm tài liệu' : 'Cập nhật tài liệu'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Tên tài liệu
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                <option value="">Chọn thể loại</option>
                {docTypes.map((docType) => (
                  <option key={docType.value} value={docType.value}>
                    {docType.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                {universityMajors.map((major) => (
                  <option key={major.value} value={major.value}>
                    {major.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Năm xuất bản
              </label>
              <input
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập năm xuất bản"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tải lên tài liệu
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
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-gray-300 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
            >
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={() => onReplace(file)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md cursor-pointer hover:bg-yellow-400 transition"
              >
                Thay thế tài liệu
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default FileForm
