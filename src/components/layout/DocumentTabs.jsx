/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { universityMajors } from '../../constants/category'
import { useNavigate } from 'react-router'

const DocumentTabs = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const tabs = [
    { id: 'theory', label: 'Tài liệu', isDropdown: true },
    { id: 'exam', label: 'Ngân hàng câu hỏi', isDropdown: true },
    { id: 'saved', label: 'Tài liệu đã lưu', isDropdown: false },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const timeoutRef = useRef(null)

  const changeTab = (tabId, isDropdown) => {
    setActiveTab(tabId)
    if (isDropdown) {
      setDropdownOpen(null)
    }
  }

  // const openDropdown = (tabId) => {
  //   if (timeoutRef.current) clearTimeout(timeoutRef.current)
  //   setDropdownOpen(tabId)
  // }

  // const closeDropdown = () => {
  //   timeoutRef.current = setTimeout(() => {
  //     setDropdownOpen(null)
  //   }, 200)
  // }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex w-full justify-between items-center bg-white py-2">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className="relative flex-1 text-center"
            // onMouseEnter={() => openDropdown(tab.id)}
            // onMouseLeave={closeDropdown}
          >
            <button
              onClick={() => changeTab(tab.id, tab.isDropdown)}
              className={`relative w-full text-lg font-medium px-4 py-2 transition duration-200 ease-in-out cursor-pointer 
                ${
                  activeTab === tab.id
                    ? 'text-red-500 font-bold'
                    : 'text-gray-600'
                }`}
            >
              {tab.label}{' '}
              {/* {tab.isDropdown && (
                <ChevronDown
                  size={16}
                  className={`inline ml-1 transition-transform ${
                    dropdownOpen === tab.id ? 'rotate-180' : ''
                  }`}
                />
              )} */}
            </button>
            {index !== tabs.length - 1 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                |
              </span>
            )}
            {/* {dropdownOpen === tab.id && tab.isDropdown && (
              <div
                className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-md z-10"
                onMouseEnter={() => openDropdown(tab.id)}
                onMouseLeave={closeDropdown}
              >
                {universityMajors.map((category) => (
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
            )} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentTabs
