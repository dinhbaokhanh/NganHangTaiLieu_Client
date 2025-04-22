import React, { useState } from 'react'
import {
  FaEllipsisV,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'

const Users = () => {
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      studentId: 'B180001',
      class: 'K62-CNTT',
      major: 'Công nghệ thông tin',
      email: 'nguyenvana@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      studentId: 'B180002',
      class: 'K62-KT',
      major: 'Kinh tế',
      email: 'tranthib@example.com',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      studentId: 'B180003',
      class: 'K62-CNTT',
      major: 'Công nghệ thông tin',
      email: 'levanc@example.com',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      studentId: 'B180004',
      class: 'K62-QTKD',
      major: 'Quản trị kinh doanh',
      email: 'phamthid@example.com',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      studentId: 'B180005',
      class: 'K62-CNTT',
      major: 'Công nghệ thông tin',
      email: 'hoangvane@example.com',
      status: 'Active',
    },
  ]

  const [search, setSearch] = useState('')

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Nội dung bảng */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">
            Danh sách người dùng
          </h2>
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition">
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
          <select className="px-4 py-2 border rounded-md">
            <option value="">Chọn trạng thái</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select className="px-2 py-2 border rounded-md">
            <option>Chọn ngành</option>
            <option>Công nghệ thông tin</option>
            <option>Kinh tế</option>
            <option>Quản trị kinh doanh</option>
          </select>
        </div>

        {/* User Table */}
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Họ và tên
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Mã sinh viên
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Lớp
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Ngành
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Trạng thái
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.studentId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.class}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.major}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded-full">
                    {user.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-gray-600 hover:text-red-600">
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button className="flex items-center justify-center gap-2 w-24 px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition">
            <FaChevronLeft />
            Trước
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-red-600 hover:text-white transition"
              >
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center justify-center gap-2 w-24 px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition">
            Sau
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Users
