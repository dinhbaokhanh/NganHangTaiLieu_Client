import { useState } from "react";
import LoginBg from "../assets/login_background.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{ backgroundImage: `url(${LoginBg})` }}
      className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center bg-no-repeat"
    >
      <div className="bg-white p-6 sm:p-8 border border-gray-500 w-full max-w-[380px] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[450px] shadow-lg mx-4 rounded-md">
        <h2 className="text-red-600 text-center text-base sm:text-lg font-sans">
          PTIT DOCUMENTS
        </h2>
        <h3 className="text-[#000000] text-center text-base sm:text-lg font-sans font-bold mt-2">
          {isLogin ? "Đăng nhập" : "Đăng ký"}

        </h3>

        {/* Form */}
        <form className="mt-4">
          {!isLogin && (
            <div className="mb-3 sm:mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 font-sans border border-black bg-white text-black rounded-md"
              />
            </div>
          )}
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full px-3 py-2 font-sans border border-black bg-white text-black rounded-md"
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-3 py-2 font-sans border border-black bg-white text-black rounded-md"
            />
          </div>

          {!isLogin && (

            <div className="mb-3 sm:mb-4">
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full px-3 py-2 font-sans border border-black bg-white text-black rounded-md"

              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between text-sm mb-4">
              <a
                href="#"
                className="text-black hover:text-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);

                }}
              >
                Đăng ký
              </a>
              <a href="#" className="text-black hover:text-red-600">
                Quên mật khẩu
              </a>
            </div>
          )}

          <button className="w-full bg-red-600 text-white py-2 font-semibold rounded-md border border-transparent hover:bg-white hover:text-red-600 hover:border hover:border-red-600 
                   transition duration-200 cursor-pointer">
            {isLogin ? "Đăng nhập" : "Đăng ký"}

          </button>
        </form>

        {!isLogin && (
          <p className="mt-3 text-center">
            <button
              className="text-black transition duration-200 hover:text-red-600 cursor-pointer"

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

export default Login;
