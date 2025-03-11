import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 border border-gray-500 w-[450px] shadow-lg">
        <h2 className="text-[#9F0000] text-center text-xl font-sans">
          PTIT DOCUMENTS
        </h2>
        <h3 className="text-[#000000] text-center text-lg font-sans font-bold mt-2">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h3>

        {/* Form */}
        <form className="mt-4">
          {!isLogin && (
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 font-sans border border-black bg-white text-black"
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full px-3 py-2 font-sans border border-black bg-white text-black"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-3 py-2 font-sans border border-black bg-white text-black"
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full px-3 py-2 font-sans border border-black bg-white text-black"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between text-sm mb-4">
              <a
                href="#"
                className="text-black hover:text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                }}
              >
                Đăng ký
              </a>
              <a href="#" className="text-black hover:text-red-500">
                Quên mật khẩu
              </a>
            </div>
          )}

          <button className="w-full bg-red-600 text-white py-2 font-semibold">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        {!isLogin && (
          <p className="mt-3 text-center">
            <button
              className="text-black px-4 py-1 transition duration-200 hover:text-[#9F0000]"
              onClick={() => setIsLogin(true)}
            >
              Về trang đăng nhập
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
