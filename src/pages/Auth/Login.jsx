import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng nhập
      </h3>
      <form className="mt-4">
        <div className="mb-3 sm:mb-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        <div className="mb-3 sm:mb-4">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        <div className="flex justify-between text-sm mb-4">
          <button
            type="button"
            className="text-black hover:text-red-600"
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </button>
          <button
            type="button"
            className="text-black hover:text-red-600"
            onClick={() => navigate('/forgot')}
          >
            Quên mật khẩu
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          Đăng nhập
        </button>
      </form>
    </>
  )
}

export default Login
