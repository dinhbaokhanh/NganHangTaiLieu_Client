import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import DocumentTabs from '../components/layout/DocumentTabs'
import SuggestModal from '../components/shared/SuggestModal'
import { useSelector } from 'react-redux'
import {
  useGetAllDocumentQuery,
  useGetSavedDocumentsByUserQuery,
} from '../redux/api/api.js'
import DocumentCard from '../components/layout/DocumentCard.jsx'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const tab = searchParams.get('tab') || 'theory'

  const [selectedMajor, setSelectedMajor] = useState('')

  const {
    data: subjectsData,
    isLoading,
    error,
    refetch,
  } = useGetAllSubjectsQuery()

  const subjectList = subjectsData?.subjects || []

  const token = useSelector((state) => state.auth?.token)
  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?.id

  const [showModal, setShowModal] = useState(false)

  const { data: documentData } = useGetAllDocumentQuery()
  const { data: savedDocData } = useGetSavedDocumentsByUserQuery(userId, {
    skip: !userId || tab !== 'saved',
  })

  const documents = documentData?.documents || []
  const savedDocuments = savedDocData?.documents || []
  const savedDocIds = savedDocuments.map((doc) => doc._id)

  const filteredDocs = documents.filter((doc) => {
    const matchesTab =
      (tab === 'saved' && savedDocIds.includes(doc._id)) ||
      (tab === 'theory' && doc.type === 'Giáo trình') ||
      (tab === 'exam' && doc.type === 'Ngân hàng câu hỏi')

    const matchesMajor = !selectedMajor || doc.major === selectedMajor

    return matchesTab && matchesMajor
  })

  const handleTabChange = (newTab) => {
    if (newTab === 'saved' && !token) {
      setShowModal(true)
    } else {
      setSearchParams({ tab: newTab })
    }
  }

  if (isLoading) return <p>Đang tải danh sách môn học...</p>
  if (error) return <p>Lỗi khi tải danh sách môn học.</p>

  return (
    <div className="container mx-auto p-4">
      <DocumentTabs activeTab={tab} setActiveTab={handleTabChange} />

      <div className="mt-4 flex gap-4">
        {/* Bộ lọc bên trái */}
        <div className="w-64 p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold mb-2">Bộ lọc</h2>
          <label className="block text-sm font-medium mb-1">Môn học</label>
          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Tất cả</option>
            {subjectList.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Danh sách tài liệu bên phải */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => <DocumentCard key={doc._id} doc={doc} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              Không có tài liệu nào.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
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
