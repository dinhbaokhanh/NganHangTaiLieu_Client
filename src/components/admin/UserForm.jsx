import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const UserForm = ({ mode = 'add', initialData = {}, onSubmit, onClose }) => {
  const [name, setName] = useState(initialData.name || '')
  const [studentId, setStudentId] = useState(initialData.studentId || '')
  const [className, setClassName] = useState(initialData.class || '')
  const [major, setMajor] = useState(initialData.major || '')
  const [email, setEmail] = useState(initialData.email || '')
  const [avatar, setAvatar] = useState(initialData.avatar || null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = { name, studentId, class: className, major, email, avatar }
    onSubmit(formData) // Gửi dữ liệu lên parent component
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative border-2 border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-600 transition duration-200"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          {mode === 'add' ? 'Thêm người dùng' : 'Cập nhật người dùng'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên người dùng và Mã sinh viên */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Tên người dùng
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập tên người dùng"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Mã sinh viên
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập mã sinh viên"
              />
            </div>
          </div>

          {/* Lớp và Ngành */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Lớp
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập lớp"
              />
            </div>
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
          </div>

          {/* Email và Ảnh đại diện */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập email"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Ảnh đại diện
              </label>
              <div
                className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer"
                onClick={() => document.getElementById('avatarInput').click()}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar Preview"
                    className="mx-auto w-16 h-16 object-cover rounded-md border"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCloudUploadAlt className="text-gray-500 text-2xl mb-2" />
                    <p className="text-gray-500 text-sm">Tải lên</p>
                  </div>
                )}
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition duration-200"
            >
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm