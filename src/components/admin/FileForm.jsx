import React, { useState, useEffect } from 'react'
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import { docTypes } from '../../constants/category.js'
import { useGetAllSubjectsQuery } from '../../redux/api/api.js'

const FileForm = ({
  mode = 'add',
  initialData = {},
  onSubmit,
  onReplace,
  onClose,
}) => {
  // Fetch subjects
  const { data: subjectData, isLoading: subjectLoading } =
    useGetAllSubjectsQuery()
  const subjects = subjectData?.subjects || []

  // Form state
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [author, setAuthor] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // Initialize
  useEffect(() => {
    if ((mode === 'edit' || mode === 'replace') && initialData) {
      setTitle(initialData.title || '')
      setType(initialData.type || '')
      setAuthor(initialData.author || '')
      setSubjectId(initialData.subject?._id || '')
      setPublishedYear(initialData.publishedYear || '')
      setDescription(initialData.description || '')
      setFile(null)
    } else if (mode === 'add') {
      setTitle('')
      setType('')
      setAuthor('')
      setSubjectId('')
      setPublishedYear('')
      setDescription('')
      setFile(null)
    }
  }, [mode, initialData])

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null)
  }

  const handleMetadataSubmit = (e) => {
    e.preventDefault()
    if (!subjectId) return alert('Vui lòng chọn môn học')
    if (mode === 'add') {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('type', type)
      formData.append('author', author)
      formData.append('subject', subjectId)
      formData.append('publishedYear', publishedYear)
      formData.append('description', description)
      if (file) formData.append('file', file)
      onSubmit(formData)
    } else {
      onSubmit({
        id: initialData._id,
        title,
        type,
        author,
        subject: subjectId,
        publishedYear,
        description,
      })
    }
  }

  const handleReplaceSubmit = (e) => {
    e.preventDefault()
    if (!file) return alert('Vui lòng chọn file mới')
    onReplace({ id: initialData._id, file })
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
      <div className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          {mode === 'add' && 'Thêm tài liệu'}
          {mode === 'edit' && 'Cập nhật tài liệu'}
          {mode === 'replace' && 'Thay thế file'}
        </h2>

        {mode === 'replace' ? (
          <form onSubmit={handleReplaceSubmit} className="space-y-4">
            <label className="block text-gray-700 font-semibold">
              Chọn file mới
            </label>
            <div
              className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              {file ? (
                <p>
                  Tệp: <strong>{file.name}</strong>
                </p>
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
                  <p>Click hoặc kéo thả</p>
                  <p className="text-sm text-gray-400">PDF, DOC, DOCX</p>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              >
                Thay thế
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleMetadataSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Tên tài liệu"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Loại
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                >
                  <option value="">Chọn loại</option>
                  {docTypes.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Tác giả
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Tên tác giả"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Môn học
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                >
                  <option value="">Chọn môn học</option>
                  {!subjectLoading &&
                    subjects.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Năm xuất bản
                </label>
                <input
                  type="number"
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="2025"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Mô tả
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                  rows="4"
                  required
                />
              </div>
              {mode === 'add' && (
                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Upload file
                  </label>
                  <div
                    className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer"
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    {file ? (
                      <p>
                        Chọn: <strong>{file.name}</strong>
                      </p>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
                        <p>Click hoặc kéo thả</p>
                        <p className="text-sm text-gray-400">PDF, DOC, DOCX</p>
                      </div>
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                {mode === 'add' ? 'Thêm' : 'Cập nhật'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default FileForm
