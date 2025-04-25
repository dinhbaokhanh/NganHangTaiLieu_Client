import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useLoginUserMutation } from '../../redux/api/api.js';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [formData, setFormData] = useState({ username: '', password: '' }); // Dữ liệu form đăng nhập
  const [loginUser, { isLoading }] = useLoginUserMutation(); // Hook gọi API đăng nhập

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      const response = await loginUser(formData).unwrap(); // Gọi API đăng nhập
      toast.success('Đăng nhập thành công!'); // Hiển thị thông báo thành công
      localStorage.setItem('token', response.token); // Lưu token vào localStorage
      navigate('/'); // Chuyển hướng đến trang chính
    } catch (error) {
      toast.error(error.data?.message || 'Đăng nhập thất bại!'); // Hiển thị thông báo lỗi
    }
  };

  return (
    <>
      <h3 className="text-black text-center text-lg font-sans font-bold mt-2">
        Đăng nhập
      </h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        {/* Input tên đăng nhập */}
        <div className="mb-3 sm:mb-4 relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
          />
        </div>
        {/* Input mật khẩu */}
        <div className="mb-3 sm:mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 px-3 py-2 border border-black bg-white text-black rounded-md"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle hiển thị mật khẩu
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {/* Liên kết đến đăng ký và quên mật khẩu */}
        <div className="flex justify-between text-sm mb-4">
          <button
            type="button"
            className="text-black hover:text-red-600 hover:cursor-pointer"
            onClick={() => navigate('/register')} // Chuyển đến trang đăng ký
          >
            Đăng ký
          </button>
          <button
            type="button"
            className="text-black hover:text-red-600 hover:cursor-pointer"
            onClick={() => navigate('/forgot')} // Chuyển đến trang quên mật khẩu
          >
            Quên mật khẩu
          </button>
        </div>
        {/* Nút đăng nhập */}
        <button
          type="submit"
          disabled={isLoading} // Vô hiệu hóa nút khi đang xử lý
          className="w-full bg-red-600 text-white py-2 font-semibold rounded-md hover:cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </>
  );
};

export default Login;
