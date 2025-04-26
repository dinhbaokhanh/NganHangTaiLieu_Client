import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const UserForm = ({ mode = 'add', initialData = {}, onSubmit, onClose }) => {
  const [name, setName] = useState(initialData.name || '')
  const [email, setEmail] = useState(initialData.email || '')
  const [password, setPassword] = useState('') // Thêm state cho mật khẩu
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
    const formData = { name, email, password, avatar } // Gửi thêm mật khẩu
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
          {/* Tên người dùng và Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
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
            <div>
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
          </div>

          {/* Mật khẩu và Ảnh đại diện */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div>
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