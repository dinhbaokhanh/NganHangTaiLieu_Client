import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng nhập
      </h3>
      <form className="mt-4">
        <div className="mb-3 sm:mb-4 relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu"
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <button
            type="button"
            className="text-black hover:text-red-600 hover:cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </button>
          <button
            type="button"
            className="text-black hover:text-red-600 hover:cursor-pointer"
            onClick={() => navigate('/forgot')}
          >
            Quên mật khẩu
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          Đăng nhập
        </button>
      </form>
    </>
  )
}

export default Login
