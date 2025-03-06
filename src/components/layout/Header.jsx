import React from 'react'
import { Bell, Search } from 'lucide-react'
import LogoIcon from '../../assets/logo.png'

const Header = () => {
  return (
    <div className="bg-white px-6 py-3 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={LogoIcon} alt="Logo" className="h-10" />
      </div>

      <div className="relative w-72">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell
          className="text-gray-600 cursor-pointer hover:text-red-500 transition duration-200"
          size={24}
        />
        <span className="text-gray-400">|</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:opacity-80 transition duration-200" />
      </div>
    </div>
  )
}

export default Header
