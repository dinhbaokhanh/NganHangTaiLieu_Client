import React, { useState, useRef, useEffect } from 'react'
import { Bell, Search, User, Key, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '../../assets/logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-white px-6 py-3 shadow-md flex justify-between items-center relative">
      <div className="flex items-center gap-3">
        <img
          src={LogoIcon}
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate('/')}
        />
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

      <div className="flex items-center gap-4 relative">
        <Bell
          className="text-gray-600 cursor-pointer hover:text-red-500 transition duration-200"
          size={24}
        />
        <span className="text-gray-400">|</span>

        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:opacity-80 transition duration-200"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/profile')
                  setIsOpen(false)
                }}
              >
                <User size={18} /> Thông tin cá nhân
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/change')
                  setIsOpen(false)
                }}
              >
                <Key size={18} /> Đổi mật khẩu
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/login')
                  setIsOpen(false)
                }}
              >
                <LogOut size={18} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
