import { useNavigate } from 'react-router-dom'

const Forgot = () => {
  const navigate = useNavigate()

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Lấy lại mật khẩu
      </h3>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/reset')
        }}
      >
        <div className="mb-3 sm:mb-4">
          <input
            type="email"
            placeholder="Vui lòng nhập email của bạn"
            className="w-full px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          Nhập email
        </button>
      </form>
    </>
  )
}

export default Forgot
