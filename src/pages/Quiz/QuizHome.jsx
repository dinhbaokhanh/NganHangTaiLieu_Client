import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useGetAllQuizzesQuery } from '../../redux/api/api.js'
import SuggestModal from '../../components/shared/SuggestModal.jsx'

const QuizHome = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState(null)
  const token = localStorage.getItem('token')

  const { data: quizzes = [], isLoading, isError } = useGetAllQuizzesQuery()

  const handleStartQuiz = (quizId) => {
    if (!token) {
      setShowModal(true)
      setSelectedQuizId(quizId) // Store the selected quiz ID
      return
    }
    navigate(`/quiz/${quizId}`)
  }

  // Handle continuing to quiz after login
  const handleAfterLogin = () => {
    navigate('/login', {
      state: {
        redirectTo: selectedQuizId ? `/quiz/${selectedQuizId}` : '/quiz',
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Danh sách Quiz
        </h1>

        {isLoading && (
          <p className="text-center text-gray-500">Đang tải quiz...</p>
        )}

        {isError && (
          <p className="text-center text-red-600">
            Đã xảy ra lỗi khi tải quiz. Vui lòng thử lại sau.
          </p>
        )}

        {!isLoading && !isError && !quizzes?.quizzes?.length && (
          <p className="text-center text-gray-500">Không có quiz nào.</p>
        )}

        <div className="space-y-6">
          {quizzes?.quizzes?.map((quiz) => (
            <div
              key={quiz._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl shadow border border-red-100 p-5 hover:shadow-md transition"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-red-600">
                  {quiz.title}
                </h2>
                <p className="text-gray-700">{quiz.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Số câu hỏi:{' '}
                  <span className="font-medium">
                    {quiz.questions?.length ?? 0}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleStartQuiz(quiz._id)}
                className="mt-4 sm:mt-0 sm:ml-6 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Bắt đầu Quiz
              </button>
            </div>
          ))}
        </div>
      </div>

      <SuggestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Bạn cần đăng nhập"
        description="Đăng nhập để sử dụng chức năng này hoặc đăng ký nếu bạn chưa có tài khoản."
        onLogin={handleAfterLogin}
        onRegister={() => navigate('/register')}
      />
    </div>
  )
}

export default QuizHome
