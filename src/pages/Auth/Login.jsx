import { useNavigate, useLocation } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useLoginUserMutation } from '../../redux/api/api.js'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = new URLSearchParams(location.search).get('redirect') || '/' // Lấy giá trị redirect từ query hoặc mặc định là "/"
  const [showPassword, setShowPassword] = useState(false) // Trạng thái hiển thị mật khẩu
  const [formData, setFormData] = useState({ username: '', password: '' }) // Dữ liệu form đăng nhập
  const [errors, setErrors] = useState({}) // Lưu lỗi của các trường
  const [loginUser, { isLoading }] = useLoginUserMutation() // Hook gọi API đăng nhập

  // Kiểm tra dữ liệu form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = 'Tên đăng nhập không được để trống'
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Trả về true nếu không có lỗi
  }

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' }) // Xóa lỗi khi người dùng nhập lại
    }
  }

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const response = await loginUser(formData).unwrap()

      const accessToken = response.accessToken
      if (!accessToken) {
        throw new Error('No access token received!')
      }

      localStorage.setItem('token', accessToken)

      const decoded = jwtDecode(accessToken)
      const isAdmin = decoded?.role === 'admin'

      toast.success('Đăng nhập thành công!')

      if (isAdmin) {
        navigate('/admin/dashboard')
      } else {
        navigate(redirect || '/')
      }
    } catch (err) {
      console.error(err) // Log lỗi ra devtool cho dễ debug
      toast.error(err?.data?.message || err?.message || 'Đăng nhập thất bại!')
    }
  }

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng nhập
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        {/* Input tên đăng nhập */}
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
        {/* Input mật khẩu */}
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
            onClick={() => setShowPassword(!showPassword)} // Toggle hiển thị mật khẩu
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        {/* Liên kết đến đăng ký và quên mật khẩu */}
        <div className="flex justify-between text-sm mb-4">
          <button
            type="button"
            className="text-black hover:text-red-600 hover:cursor-pointer"
            onClick={() => navigate('/register')} // Chuyển đến trang đăng ký
          >
            Đăng ký
          </button>
          <button
            type="button"
            className="text-black hover:text-red-600 hover:cursor-pointer"
            onClick={() => navigate('/forgot')} // Chuyển đến trang quên mật khẩu
          >
            Quên mật khẩu
          </button>
        </div>
        {/* Nút đăng nhập */}
        <button
          type="submit"
          disabled={isLoading} // Vô hiệu hóa nút khi đang xử lý
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </>
  )
}

export default Login
