const Register = () => {
  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng ký
      </h3>
      <form className="mt-4">
        <div className="mb-3 sm:mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
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
        <div className="mb-3 sm:mb-4">
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="w-full px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          Đăng ký
        </button>
      </form>
    </>
  )
}

export default Register
