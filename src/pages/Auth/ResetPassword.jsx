import { useState } from 'react'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useResetPasswordMutation } from '../../redux/api/api'
import { toast } from 'react-toastify'

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [resetPassword, { isLoading }] = useAsyncMutation(
    useResetPasswordMutation
  )

  const { id, token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!id || !token || !newPassword || !confirmPassword) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    try {
      const response = await resetPassword('Đang đặt lại mật khẩu...', {
        id,
        token,
        password: newPassword,
        confirmPassword,
      })
      console.log(id, token)

      if (response?.data) {
        toast.success('Đặt lại mật khẩu thành công')
        navigate('/login')
      } else {
        const errorMsg =
          response?.error?.data?.message || 'Đã xảy ra lỗi khi đặt lại mật khẩu'
        toast.error(errorMsg)
      }
    } catch (error) {
      const errorMsg = error?.data?.message || 'Đặt lại mật khẩu thất bại'
      toast.error(errorMsg)
    }
  }

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đặt lại mật khẩu
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu mới"
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </>
  )
}

export default Reset
