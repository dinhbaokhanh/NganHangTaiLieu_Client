import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import UserForm from '../../components/admin/UserForm';
import UpdateUserStatusForm from '../../components/admin/UpdateUserStatusForm'; // Import component mới
import { useAsyncMutation, useErrors } from '../../hooks/hook.js';
import {
  useAddUserMutation,
  useGetAllUsersQuery,
} from '../../redux/api/api'; // Loại bỏ `useUpdateUserStatusMutation`

const Users = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [search, setSearch] = useState(''); // Tìm kiếm
  const [selectedStatus, setSelectedStatus] = useState(''); // Bộ lọc trạng thái
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal thêm người dùng
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // Trạng thái mở modal cập nhật trạng thái
  const [editingUser, setEditingUser] = useState(null); // Người dùng đang chỉnh sửa trạng thái

  // Gọi API lấy danh sách người dùng
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  // Xử lý lỗi từ API
  useErrors([{ isError, error }]);

  // Gọi API thêm người dùng (sử dụng useAsyncMutation)
  const [addUser, isAdding] = useAsyncMutation(useAddUserMutation);

  // Cập nhật danh sách người dùng khi có dữ liệu từ API
  useEffect(() => {
    if (data?.users) {
      const formattedUsers = data.users.map((user) => ({
        ...user,
        id: user._id, // Ánh xạ _id thành id
      }));
      setUsers(formattedUsers);
    }
  }, [data]);

  // Lọc người dùng theo tìm kiếm và trạng thái
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Xử lý thêm người dùng
  const handleAddUser = async (newUser) => {
    const res = await addUser('Đang thêm người dùng...', newUser);
    if (res.success) {
      setUsers((prevUsers) => [...prevUsers, res.data]);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-center text-lg text-gray-600">Đang tải danh sách người dùng...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Danh sách người dùng</h2>
          <button
            onClick={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
          >
            <FaPlus />
            Thêm người dùng
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* User Table */}
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Trạng thái</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded-full">
                    {user.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      console.log('Selected User:', user); // Kiểm tra giá trị user
                      setEditingUser(user); // Gán đúng giá trị user vào editingUser
                      setIsStatusModalOpen(true);
                    }}
                    className="text-gray-600 cursor-pointer hover:text-blue-600 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button className="text-gray-600 cursor-pointer hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
            ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-600 cursor-pointer hover:bg-red-600 hover:text-white'
            }
          `}
          >
            <FaChevronLeft />
            Trước
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md transition
                ${
                  currentPage === page
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600 cursor-pointer hover:bg-red-600 hover:text-white'
                }
              `}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
            ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-600 cursor-pointer hover:bg-red-600 hover:text-white'
            }
          `}
          >
            Sau
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* User Form Modal */}
      {isModalOpen && (
        <UserForm
          mode={editingUser ? 'edit' : 'add'}
          initialData={editingUser || {}}
          onSubmit={editingUser ? null : handleAddUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Update User Status Modal */}
      {isStatusModalOpen && editingUser && (
        <UpdateUserStatusForm
          user={editingUser}
          onClose={() => setIsStatusModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Users;