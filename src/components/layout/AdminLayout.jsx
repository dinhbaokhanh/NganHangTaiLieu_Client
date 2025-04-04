import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { FaUsers, FaThLarge, FaFolder } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="flex items-center p-4 bg-red-600">
        <div className="w-10 h-10 bg-white text-red-600 flex items-center justify-center rounded-full font-bold">
          B
        </div>
        <h2 className="ml-3 text-lg font-semibold">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem icon={<FaThLarge />} text="Dashboard" link="/admin" />
          <SidebarItem icon={<FaUsers />} text="Users" link="/admin/users" />
          <SidebarItem icon={<FaFolder />} text="Files" link="/admin/files" />
        </ul>
      </nav>
    </div>
  )
}

const SidebarItem = ({ icon, text, link }) => (
  <li>
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg cursor-pointer ${
          isActive ? 'bg-red-600' : 'hover:bg-gray-700'
        }`
      }
    >
      {icon}
      <span className="ml-3">{text}</span>
    </NavLink>
  </li>
)

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
