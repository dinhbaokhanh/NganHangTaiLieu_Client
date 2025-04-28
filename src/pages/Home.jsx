import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import DocumentTabs from '../components/layout/DocumentTabs'
import SuggestModal from '../components/shared/SuggestModal'
import documents from '../data/sampleDocuments'
import defaultFileImg from '../assets/doc_image_default.png'
import { useSelector } from 'react-redux'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams() // Quản lý query string
  const navigate = useNavigate()
  const tab = searchParams.get('tab') || 'theory' // Lấy giá trị tab từ URL, mặc định là 'theory'
  const token = useSelector((state) => state.auth?.token) // Kiểm tra trạng thái đăng nhập
  const [showModal, setShowModal] = useState(false) // Trạng thái hiển thị modal

  // Lọc tài liệu dựa trên tab hiện tại
  const filteredDocs = documents.filter((doc) =>
    tab === 'saved' ? doc.saved : doc.category === tab
  )

  // Thay đổi tab
  const handleTabChange = (newTab) => {
    if (newTab === 'saved' && !token) {
      setShowModal(true) // Hiển thị modal nếu chưa đăng nhập và chọn tab "Tài liệu đã lưu"
    } else {
      setSearchParams({ tab: newTab })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <DocumentTabs activeTab={tab} setActiveTab={handleTabChange} />

      <div className="mt-4 p-4 rounded-lg bg-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="relative border rounded-lg p-2 shadow-md"
            >
              <img
                src={doc.thumbnail || defaultFileImg}
                alt={doc.title}
                className="w-full h-45 object-cover rounded-md"
              />
              <p className="flex items-center justify-center text-center font-medium mt-2 h-10">
                {doc.title}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có tài liệu nào.</p>
        )}
      </div>

      {/* Modal */}
      <SuggestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Bạn cần đăng nhập"
        description="Đăng nhập để xem tài liệu đã lưu hoặc đăng ký nếu bạn chưa có tài khoản."
        onLogin={() => navigate('/login')}
        onRegister={() => navigate('/register')}
      />
    </div>
  )
}

export default Home
