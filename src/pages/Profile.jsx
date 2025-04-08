import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("KICM");
  const [email, setEmail] = useState("KICM@gmail.com");

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4">
      <div className="bg-gray-100 p-8 sm:p-10 border border-gray-300 w-full max-w-[500px] shadow-lg mx-4 rounded-md min-h-[550px]">
        <h2 className="text-center text-xl font-sans font-bold mb-4">Thông tin cá nhân</h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <p className="mt-5 mb-3 text-left font-sans w-full">Ảnh đại diện</p>
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Form */}
        <form 
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Lưu:", name, email);
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-base font-sans font-medium w-1/3">Tên người dùng:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-2/3 px-3 py-2 border border-gray-400 rounded-md "
            />
          </div>

          <div className="mb-3 flex items-center justify-between">
            <label className="block text-base font-sans font-medium w-1/3">Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-2/3 px-3 py-2 border border-gray-400 rounded-md "
            />
          </div>

          <div className="mb-4 flex items-center gap-2">
            <label className="text-base font-sans font-medium whitespace-nowrap">Đổi mật khẩu:</label>
            <button
              type="button"
              onClick={() => navigate('/change')}
              className="text-red-600 font-sans hover:underline"
            >
              Bấm vào đây để đổi mật khẩu
            </button>
          </div>

          {/* Button */}
          <button 
            type="submit" 
            className="w-20 h-10 bg-red-600 text-white py-2 rounded-md  ml-auto  hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
