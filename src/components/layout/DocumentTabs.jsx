/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const DocumentTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'theory', label: 'Tài liệu', isDropdown: true },
    { id: 'exam', label: 'Ngân hàng câu hỏi', isDropdown: true },
    { id: 'saved', label: 'Tài liệu đã lưu', isDropdown: false },
  ]

  const categories = [
    { value: 'it', label: 'Công nghệ thông tin' },
    { value: 'electronics', label: 'Kỹ thuật điện tử viễn thông' },
    { value: 'cs', label: 'Khoa học máy tính' },
    { value: 'security', label: 'An toàn thông tin' },
    { value: 'media', label: 'Truyền thông đa phương tiện' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Quản trị kinh doanh' },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const dropdownRef = useRef(null)

  const toggleDropdown = (tabId, isDropdown) => {
    if (isDropdown) {
      setDropdownOpen(dropdownOpen === tabId ? null : tabId)
      setActiveTab(tabId)
    } else {
      setDropdownOpen(null)
      setActiveTab(tabId)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex w-full justify-between items-center bg-white py-2">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className="relative flex-1 text-center"
            ref={dropdownRef}
          >
            <button
              onClick={() => toggleDropdown(tab.id, tab.isDropdown)}
              className={`relative w-full text-lg font-medium px-4 py-2 transition duration-200 ease-in-out cursor-pointer 
                ${
                  activeTab === tab.id
                    ? 'text-red-500 font-bold'
                    : 'text-gray-600'
                }`}
            >
              {tab.label}{' '}
              {tab.isDropdown && (
                <ChevronDown
                  size={16}
                  className={`inline ml-1 transition-transform ${
                    dropdownOpen === tab.id ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>
            {index !== tabs.length - 1 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                |
              </span>
            )}
            {dropdownOpen === tab.id && tab.isDropdown && (
              <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-md z-10">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value)
                      setDropdownOpen(null)
                    }}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentTabs
