import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import { useGetUserProfileQuery } from '../redux/api/api'
import { useSelector } from 'react-redux'

const Profile = () => {
  const navigate = useNavigate()

  // Lấy ID người dùng từ Redux store
  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?.id

  // Gọi API lấy thông tin người dùng
  const { data, isLoading, isError, error } = useGetUserProfileQuery(userId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <p className="text-center text-lg text-gray-600">
          Đang tải thông tin...
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <p className="text-center text-lg text-red-600">
          Đã xảy ra lỗi khi tải thông tin:{' '}
          {error?.data?.message || 'Không xác định'}
        </p>
      </div>
    )
  }

  const user = data?.user

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 bg-gray-50">
      <div className="bg-white p-8 sm:p-10 border border-gray-300 w-full max-w-[500px] shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Thông tin cá nhân
        </h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-left font-semibold text-gray-700 w-full mb-2">
            Ảnh đại diện
          </p>
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 border-2 border-gray-200">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400 h-14 w-14" />
            )}
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <div className="space-y-4">
          {/* Tên người dùng */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Tên người dùng
            </label>
            <div className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
              <FaUser className="text-gray-400 h-5 w-5 mr-3" />
              <p className="text-gray-800 font-medium">{user?.username}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Email</label>
            <div className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
              <FaEnvelope className="text-gray-400 h-5 w-5 mr-3" />
              <p className="text-gray-800 font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Đổi mật khẩu */}
          <div className="flex items-center">
            <label className="font-semibold text-gray-700 mr-2">
              Đổi mật khẩu:
            </label>
            <button
              type="button"
              onClick={() => navigate('/change')}
              className="text-red-600 font-medium hover:cursor-pointer hover:underline"
            >
              Bấm vào đây để đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
