import { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4">
      <div className="bg-gray-100 p-8 sm:p-10 border border-gray-300 w-full max-w-[500px] shadow-lg mx-4 rounded-md min-h-[500px]">
        <h2 className="text-center text-xl font-sans font-bold mb-10 mt-6">
          Đổi mật khẩu
        </h2>

        {/* Form */}
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              "Đổi mật khẩu:",
              oldPassword,
              newPassword,
              confirmPassword
            );
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-base font-sans font-medium w-2/5">
              Mật khẩu cũ:
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-3/5 px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          <div className="mb-3 flex items-center justify-between">
            <label className="block text-base font-sans font-medium w-2/5">
              Mật khẩu mới:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-3/5 px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="block text-base font-sans font-medium w-2/5">
              Xác nhận mật khẩu:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-3/5 px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-30 h-11 bg-red-600 text-white py-2 rounded-md mx-auto mt-10 mb-6 hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
