import React, { useState, useRef, useEffect } from 'react'
import { FileQuestion, Search, User, Key, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/reducers/auth'
import LogoIcon from '../../assets/logo.png'
import { toast } from 'react-toastify'
import {
  useGetUserProfileQuery,
  useSearchDocumentsQuery,
} from '../../redux/api/api.js'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?.id
  const token = useSelector((state) => state.auth?.token)

  const { data, isLoading, isError, error } = useGetUserProfileQuery(userId)
  const user = data?.user

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchDocumentsQuery(keyword, {
    skip: !isSearching || !keyword,
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Đăng xuất thành công!')
    navigate('/login', { replace: true })
    setTimeout(() => window.location.reload(), 100)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      setIsSearching(true)
    }
  }

  const handleSearchButtonClick = () => {
    if (keyword.trim() !== '') {
      setIsSearching(true)
    }
  }

  const handleDocumentClick = (docId) => {
    setIsSearching(false)
    navigate(`/file/${docId}`)
  }

  const isQuizPage = location.pathname === '/quiz'
  const isMainPage = location.pathname.startsWith('/main')

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white px-6 py-3 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={LogoIcon}
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Menu chính
      <div className="flex items-center gap-6">
        <span
          onClick={() => navigate('/main?tab=theory')}
          className={`cursor-pointer font-medium transition ${
            isMainPage
              ? 'text-red-500 font-semibold'
              : 'text-gray-700 hover:text-red-500'
          }`}
        >
          Tài liệu
        </span>
        <span
          onClick={() => navigate('/quiz')}
          className={`cursor-pointer font-medium transition ${
            isQuizPage
              ? 'text-red-500 font-semibold'
              : 'text-gray-700 hover:text-red-500'
          }`}
        >
          Đề thi trắc nghiệm
        </span>
      </div> */}

      {/* Tìm kiếm */}
      <div className="relative w-72" ref={searchRef}>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={handleSearchButtonClick}
            size={18}
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Tìm kiếm tài liệu..."
            className="w-full pl-10 pr-12 py-2 border rounded-full"
          />
        </div>

        {isSearching && keyword && (
          <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {searchLoading && (
              <div className="p-4 text-center text-gray-500">
                Đang tải kết quả...
              </div>
            )}
            {searchError && (
              <div className="p-4 text-center text-red-500">
                Lỗi khi tải kết quả.
              </div>
            )}
            {!searchLoading && !searchError && (
              <div className="p-3">
                <h3 className="text-sm font-semibold mb-2 text-gray-700">
                  Kết quả tìm kiếm cho "{keyword}"
                </h3>
                {!searchData?.documents ||
                searchData?.documents?.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-2">
                    Không tìm thấy tài liệu nào.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {searchData?.documents?.map((doc) => (
                      <li
                        key={doc._id}
                        className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={() => handleDocumentClick(doc._id)}
                      >
                        <h4 className="font-medium text-sm">{doc.title}</h4>
                        <p className="text-xs text-gray-600">{doc.author}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {doc.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu người dùng */}
      <div className="flex items-center gap-4 relative">
        {token ? (
          <>
            <div className="relative group flex items-center">
              <FileQuestion
                className="text-gray-600 cursor-pointer hover:text-red-500 transition duration-200"
                size={24}
                onClick={() => navigate('/quiz')}
                title="Làm đề trắc nghiệm"
              />
              {/* label */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition">
                Làm đề trắc nghiệm
              </span>
            </div>
            <span className="text-gray-400">|</span>
            <div className="relative" ref={dropdownRef}>
              <div onClick={() => setIsOpen(!isOpen)}>
                <img
                  src={user?.avatar?.url}
                  alt="Avatar"
                  className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:opacity-80 transition duration-200"
                />
              </div>
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
                    onClick={handleLogout}
                  >
                    <LogOut size={18} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-white bg-red-500 font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition duration-200"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
