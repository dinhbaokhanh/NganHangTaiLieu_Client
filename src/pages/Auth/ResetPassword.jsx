const Reset = () => {
  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đặt lại mật khẩu
      </h3>
      <form className="mt-4">
        <div className="mb-3 sm:mb-4">
          <input
            type="password"
            placeholder="Vui lòng nhập mật khẩu mới"
            className="w-full px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </>
  )
}

export default Reset
