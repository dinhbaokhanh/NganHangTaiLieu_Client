import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { useAsyncMutation } from '../../hooks/hook.js'
import { useForgotPasswordMutation } from '../../redux/api/api.js'

const Forgot = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const [forgotPassword, isLoading] = useAsyncMutation(
    useForgotPasswordMutation
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Email không được để trống')
      return
    }

    try {
      const res = await forgotPassword('Đang gửi yêu cầu...', { email })

      if (res.success) {
        toast.success('Đã gửi email khôi phục mật khẩu!')
        toast.success('Vui lòng kiểm tra email')
      } else {
        setError(res?.error?.data?.message || 'Gửi yêu cầu thất bại')
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  }

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Lấy lại mật khẩu
      </h3>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3 sm:mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Vui lòng nhập email của bạn"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Đang gửi...' : 'Nhập email'}
        </button>
      </form>
    </>
  )
}

export default Forgot
