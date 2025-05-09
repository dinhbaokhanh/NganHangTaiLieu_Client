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
import QuizHome from './Quiz/QuizHome.jsx'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const tab = searchParams.get('tab') || 'theory'

  const token = useSelector((state) => state.auth?.token)
  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?.id

  const [showModal, setShowModal] = useState(false)

  const { data: documentData, refetch } = useGetAllDocumentQuery()
  const { data: savedDocData } = useGetSavedDocumentsByUserQuery(userId, {
    skip: !userId || tab !== 'saved',
  })

  const documents = documentData?.documents || []
  const savedDocuments = savedDocData?.documents || []
  const savedDocIds = savedDocuments.map((doc) => doc._id)

  const filteredDocs = documents.filter((doc) => {
    if (tab === 'saved') {
      // Check if document ID exists in savedDocIds array
      return savedDocIds.includes(doc._id)
    } else if (tab === 'theory') {
      return doc.type === 'Giáo trình'
    } else if (tab === 'exam') {
      return doc.type === 'Ngân hàng câu hỏi'
    }
    return false
  })

  const handleTabChange = (newTab) => {
    if (newTab === 'saved' && !token) {
      setShowModal(true)
    } else {
      setSearchParams({ tab: newTab })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <DocumentTabs activeTab={tab} setActiveTab={handleTabChange} />

      <div className="mt-4 p-4 rounded-lg bg-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => <DocumentCard key={doc._id} doc={doc} />)
        ) : (
          <p className="text-gray-500">Không có tài liệu nào.</p>
        )}
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
