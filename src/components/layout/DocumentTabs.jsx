import React from 'react'

const DocumentTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'theory', label: 'Tài liệu' },
    { id: 'exam', label: 'Ngân hàng câu hỏi' },
    { id: 'saved', label: 'Tài liệu đã lưu' },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex w-full justify-between items-center bg-white py-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 text-lg font-medium text-center px-4 py-2 transition duration-200 ease-in-out 
              ${
                activeTab === tab.id
                  ? 'text-red-500 font-bold'
                  : 'text-gray-600'
              } 
              cursor-pointer`}
          >
            {tab.label}
            {index !== tabs.length - 1 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                |
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DocumentTabs
