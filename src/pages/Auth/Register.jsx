import { useState } from 'react'
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRegisterUserMutation } from '../../redux/api/api.js'
import { useAsyncMutation } from '../../hooks/hook.js'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [register, loading] = useAsyncMutation(useRegisterUserMutation)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email không được để trống'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.username) {
      newErrors.username = 'Tên đăng nhập không được để trống'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự'
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const result = await register('Đang đăng ký...', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng ký
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3 sm:mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            value={formData.username}
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
            value={formData.password}
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
            value={formData.confirmPassword}
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
