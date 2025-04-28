import React, { useState } from 'react';

const UpdateUserStatusForm = ({ user, onSubmit, onClose }) => {
  const [status, setStatus] = useState(user.status || ''); // Trạng thái hiện tại của người dùng
  const [error, setError] = useState(''); // Trạng thái lỗi nếu có

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra trạng thái hợp lệ
    if (!status) {
      setError('Vui lòng chọn trạng thái hợp lệ!');
      return;
    }

    // Gửi dữ liệu cập nhật
    onSubmit({ id: user.id, status }); // Sử dụng `id` đã được ánh xạ
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Cập nhật trạng thái</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setError(''); // Xóa lỗi khi người dùng chọn trạng thái
              }}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            >
              <option value="">Chọn trạng thái</option>
              <option value="Active">Active</option>
              <option value="Banned">Banned</option>
            </select>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>} {/* Hiển thị lỗi */}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md cursor-pointer hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition duration-200"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserStatusForm;