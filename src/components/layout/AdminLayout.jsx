import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  FaUsers,
  FaThLarge,
  FaFolder,
  FaSignOutAlt,
  FaBook,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux' // Thêm useDispatch từ Redux
import { logout } from '../../redux/reducers/auth' // Import hành động logout

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() // Khởi tạo dispatch
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Đăng xuất thành công!')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center p-4 bg-red-600">
        <div className="w-10 h-10 bg-white text-red-600 flex items-center justify-center rounded-full font-bold">
          B
        </div>
        <h2 className="ml-3 text-lg font-semibold">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem
            icon={<FaThLarge />}
            text="Dashboard"
            link="/admin/dashboard"
          />
          <SidebarItem icon={<FaUsers />} text="Users" link="/admin/users" />
          <SidebarItem icon={<FaFolder />} text="Files" link="/admin/files" />
          <SidebarItem
            icon={<FaBook />}
            text="Subjects"
            link="/admin/subjects"
          />
        </ul>
      </nav>

      <div className="p-4 bg-gray-700">
        <button
          className="flex items-center w-full text-left text-gray-300 cursor-pointer hover:text-white"
          onClick={handleLogout} // Gọi hàm handleLogout
        >
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

const SidebarItem = ({ icon, text, link }) => (
  <li>
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg cursor-pointer transition ${
          isActive
            ? 'bg-red-600 text-white'
            : 'hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      {icon}
      <span className="ml-3">{text}</span>
    </NavLink>
  </li>
)

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() // Khởi tạo dispatch

  const handleLogout = () => {
    dispatch(logout()) // Gọi hành động logout từ Redux
    localStorage.removeItem('token') // Xóa token khỏi localStorage
    localStorage.removeItem('role') // Xóa role khỏi localStorage
    toast.success('Đăng xuất thành công!')
    navigate('/login') // Chuyển hướng về trang đăng nhập
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-end items-center">
      <div className="flex items-center space-x-4">
        <span className="text-black">Welcome, Admin</span>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
          onClick={handleLogout} // Gọi hàm handleLogout
        >
          Logout
        </button>
      </div>
    </header>
  )
}

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
