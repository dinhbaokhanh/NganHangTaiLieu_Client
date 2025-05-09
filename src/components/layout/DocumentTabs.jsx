import React, { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { universityMajors } from '../../constants/category'
import { useNavigate } from 'react-router'

const DocumentTabs = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const tabs = [
    { id: 'theory', label: 'Tài liệu', isDropdown: false },
    { id: 'exam', label: 'Ngân hàng câu hỏi', isDropdown: false },
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

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex w-full justify-between items-center bg-white py-2">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="relative flex-1 text-center">
            <button
              onClick={() => changeTab(tab.id, tab.isDropdown)}
              className={`relative w-full text-lg font-medium px-4 py-2 transition duration-200 ease-in-out cursor-pointer ${
                activeTab === tab.id
                  ? 'text-red-500 font-bold'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
            {index !== tabs.length - 1 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                |
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentTabs
