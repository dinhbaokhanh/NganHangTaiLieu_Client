import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { universityMajors } from '../../constants/category'

const SubjectForm = ({ mode = 'add', initialData = {}, onSubmit, onClose }) => {
  const [name, setName] = useState(initialData?.name || '')
  const [code, setCode] = useState(initialData?.code || '')
  const [major, setMajor] = useState(initialData?.major || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = { name, code, major }
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative border-2 border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-600 transition"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          {mode === 'add' ? 'Thêm môn học' : 'Cập nhật môn học'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên môn học */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tên môn học
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Nhập tên môn học"
              required
            />
          </div>

          {/* Mã môn học */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mã môn học
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Nhập mã môn học"
              required
            />
          </div>

          {/* Ngành học */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Ngành học
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="">Chọn ngành học</option>
              {universityMajors.map((majorItem) => (
                <option key={majorItem.value} value={majorItem.value}>
                  {majorItem.label}
                </option>
              ))}
            </select>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
            >
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubjectForm
