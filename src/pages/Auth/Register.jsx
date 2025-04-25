import { useState } from 'react'
import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaImage,
} from 'react-icons/fa'
import { useErrors } from '../../hooks/hook.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { server } from '../../constants/config.js'
import {
  isValidUsername,
  useFileHandler,
  useInputValidation,
  useStrongPassword,
} from '6pp'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const usernameValidator = (username) => {
    if (!isValidUsername(username))
      return { isValid: false, errorMessage: 'Username is invalid' }
  }

  const username = useInputValidation('', usernameValidator)
  const password = useStrongPassword()
  const email = useInputValidation('')
  const confirmPassword = useInputValidation('')

  const avatar = useFileHandler('single')

  const apiErrors = [
    {
      isError: errors.api,
      error: { data: { message: errors.apiMessage } },
      fallback: () => {
        console.log('API error occurred:', errors.apiMessage)
      },
    },
  ]

  useErrors(apiErrors)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') email.changeHandler(e)
    else if (name === 'username') username.changeHandler(e)
    else if (name === 'password') password.changeHandler(e)
    else if (name === 'confirmPassword') confirmPassword.changeHandler(e)

    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const toastId = toast.loading('Đang đăng ký...')
    setLoading(true)
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    if (password.value !== confirmPassword.value) {
      setErrors({ confirmPassword: 'Mật khẩu không khớp' })
      toast.dismiss(toastId)
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('avatar', avatar.file)
    formData.append('username', username.value)
    formData.append('email', email.value)
    formData.append('password', password.value)

    try {
      const { data } = await axios.post(
        `${server}/api/user/register`,
        formData,
        config
      )

      if (data && data.success) {
        toast.success('Đăng ký thành công!')
        navigate('/login')
      } else {
        toast.error(data?.message || 'Đăng ký thất bại')
      }
      toast.dismiss(toastId)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Đã có lỗi xảy ra')
      toast.dismiss(toastId)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng ký
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6 relative w-32 h-32 mx-auto">
          <img
            src={
              avatar.preview || 'https://www.w3schools.com/howto/img_avatar.png'
            }
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border border-gray-300 shadow-md"
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer border-2 border-white hover:bg-red-700 transition"
            title="Chọn ảnh đại diện"
          >
            <FaImage />
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={avatar.changeHandler}
            className="hidden"
          />
        </div>

        <div className="mb-3 sm:mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email.value}
            onChange={handleChange}
            className={`w-full pl-10 px-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-black'
            } bg-white text-black rounded-md`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-3 sm:mb-4 relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={username.value}
            onChange={handleChange}
            className={`w-full pl-10 px-3 py-2 border ${
              errors.username ? 'border-red-500' : 'border-black'
            } bg-white text-black rounded-md`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Mật khẩu"
            value={password.value}
            onChange={handleChange}
            className={`w-full pl-10 px-3 py-2 border ${
              errors.password ? 'border-red-500' : 'border-black'
            } bg-white text-black rounded-md`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword.value}
            onChange={handleChange}
            className={`w-full pl-10 px-3 py-2 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-black'
            } bg-white text-black rounded-md`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
    </>
  )
}

export default Register
