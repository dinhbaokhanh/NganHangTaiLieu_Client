import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("KICM");
  const [email, setEmail] = useState("KICM@gmail.com");

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 bg-gray-50">
      <div className="bg-white p-8 sm:p-10 border border-gray-300 w-full max-w-[500px] shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Thông tin cá nhân
        </h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-left font-semibold text-gray-700 w-full mb-2">
            Ảnh đại diện
          </p>
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Lưu:", name, email);
          }}
        >
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center">
            <label className="font-semibold text-gray-700 mr-2">
              Đổi mật khẩu:
            </label>
            <button
              type="button"
              onClick={() => navigate("/change")}
              className="text-red-600 font-medium hover:cursor-pointer hover:underline"
            >
              Bấm vào đây để đổi mật khẩu
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
