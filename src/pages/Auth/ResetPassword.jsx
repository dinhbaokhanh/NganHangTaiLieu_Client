import { useState } from 'react'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đặt lại mật khẩu
      </h3>
      <form className="mt-4">
        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Vui lòng nhập mật khẩu mới"
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500  hover:cursor-pointer"
          >
            {showPassword ? <FaEye/> : <FaEyeSlash />}
          </button>
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
