import React, { useState } from 'react'
import Title from '../shared/Title'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ChatbotModal from '../shared/ChatbotModal'
import { MessageCircle } from 'lucide-react'
import { useSelector } from 'react-redux'
import SuggestModal from '../shared/SuggestModal'

const ChatButton = ({ onClick }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [showSuggestModal, setShowSuggestModal] = useState(false)

  const handleClick = () => {
    if (isAuthenticated) {
      onClick()
    } else {
      setShowSuggestModal(true)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 group cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat với trợ lý ảo
        </div>
      </button>

      <SuggestModal
        isOpen={showSuggestModal}
        onClose={() => setShowSuggestModal(false)}
        title="Bạn cần đăng nhập"
        description="Đăng nhập để sử dụng trợ lý ảo. Vui lòng đăng nhập hoặc tạo tài khoản mới."
        onLogin={() => {
          setShowSuggestModal(false)
          window.location.href = '/login'
        }}
        onRegister={() => {
          setShowSuggestModal(false)
          window.location.href = '/register'
        }}
      />
    </>
  )
}

const AppLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Title />
      <div className="fixed top-0 left-0 right-0 w-full z-10">
        <Header />
      </div>
      <div className="flex-1 pt-16">
        <Outlet />
      </div>
      <Footer />

      <ChatButton onClick={() => setIsChatOpen(true)} />
      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default AppLayout
