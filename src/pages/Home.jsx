import React, { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DocumentTabs from '../components/layout/DocumentTabs'
import SuggestModal from '../components/shared/SuggestModal'
import DocumentCard from '../components/layout/DocumentCard'

import {
  useGetAllDocumentQuery,
  useGetSavedDocumentsByUserQuery,
  useGetAllSubjectsQuery,
} from '../redux/api/api.js'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const tab = searchParams.get('tab') || 'theory'

  const { userInfo, token } = useSelector((state) => state.auth)
  const userId = userInfo?.id

  const [showModal, setShowModal] = useState(false)
  const [selectedMajor, setSelectedMajor] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const { data: documentData, isLoading: isDocumentsLoading } =
    useGetAllDocumentQuery()
  const documents = documentData?.documents || []

  const { data: savedDocData } = useGetSavedDocumentsByUserQuery(userId, {
    skip: !userId || tab !== 'saved',
  })
  const savedDocuments = savedDocData?.documents || []
  const savedDocIds = savedDocuments.map((doc) => doc._id)

  const { data: subjectsData, isLoading: isSubjectsLoading } =
    useGetAllSubjectsQuery()
  const subjectList = subjectsData?.subjects || []

  // Filter suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!selectedMajor) return subjectList
    return subjectList.filter((subject) =>
      subject.name.toLowerCase().includes(selectedMajor.toLowerCase())
    )
  }, [subjectList, selectedMajor])

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      let matchTab = false
      if (tab === 'saved') {
        matchTab = savedDocIds.includes(doc._id)
      } else if (tab === 'theory') {
        matchTab = doc.type === 'Giáo trình'
      } else if (tab === 'exam') {
        matchTab = doc.type === 'Ngân hàng câu hỏi'
      }

      let matchSubject = true
      if (selectedMajor && selectedMajor !== '') {
        const docMajor = doc.subject?.name || ''
        matchSubject = docMajor
          .toLowerCase()
          .includes(selectedMajor.toLowerCase())
      }

      return matchTab && matchSubject
    })
  }, [documents, tab, savedDocIds, selectedMajor])

  const handleTabChange = (newTab) => {
    if (newTab === 'saved' && !token) {
      setShowModal(true)
    } else {
      setSearchParams({ tab: newTab })
    }
  }

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (subjectName) => {
    setSelectedMajor(subjectName)
    setShowSuggestions(false)
  }

  const clearFilter = () => {
    setSelectedMajor('')
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200)
  }

  if (isDocumentsLoading || isSubjectsLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="ml-3 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <DocumentTabs activeTab={tab} setActiveTab={handleTabChange} />

      <div className="mt-6 flex gap-6">
        <div className="w-72 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Bộ lọc
              </h2>
              {selectedMajor && (
                <button
                  onClick={clearFilter}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Môn học
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedMajor}
                  onChange={handleMajorChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Nhập hoặc chọn môn học..."
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((subject) => (
                      <button
                        key={subject._id}
                        onClick={() => handleSuggestionClick(subject.name)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-gray-700">{subject.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedMajor && (
                <div className="flex items-center p-2 bg-red-50 rounded-lg">
                  <svg
                    className="w-4 h-4 text-red-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-red-700 font-medium">
                    Tìm kiếm: {selectedMajor}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-indigo-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng tài liệu</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredDocs.length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {filteredDocs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredDocs.map((doc) => (
                <DocumentCard key={doc._id} doc={doc} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có tài liệu nào
              </h3>
              <p className="text-gray-500">
                {selectedMajor
                  ? `Không tìm thấy tài liệu cho: ${selectedMajor}`
                  : 'Không có tài liệu nào trong danh mục này'}
              </p>
              {selectedMajor && (
                <button
                  onClick={clearFilter}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xem tất cả tài liệu
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <SuggestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Bạn cần đăng nhập"
        description="Đăng nhập để xem tài liệu đã lưu hoặc đăng ký nếu bạn chưa có tài khoản."
        onLogin={() => navigate('/login')}
        onRegister={() => navigate('/register')}
      />
    </div>
  )
}

export default Home
