import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 bg-gray-50">
      <div className="bg-white p-8 sm:p-10 border border-gray-300 w-full max-w-[500px] shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Đổi mật khẩu
        </h2>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Old Password */}
          <div className="relative">
            <label className="block font-semibold text-gray-700 mb-1">
              Mật khẩu cũ
            </label>
            <div className="flex items-center relative">
              <FaLock className="absolute left-3 text-gray-400 top-1/2 -translate-y-1/2" />
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập mật khẩu cũ"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              >
                {showOldPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block font-semibold text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <div className="flex items-center relative">
              <FaLock className="absolute left-3 text-gray-400 top-1/2 -translate-y-1/2" />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block font-semibold text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <div className="flex items-center relative">
              <FaLock className="absolute left-3 text-gray-400 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                placeholder="Xác nhận mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
