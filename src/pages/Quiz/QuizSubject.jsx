import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetQuizBySubjectQuery,
  useGetSubjectByIdQuery,
} from '../../redux/api/api.js'

const QuizSubject = () => {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const {
    data: subjectData,
    isLoading,
    isError,
  } = useGetSubjectByIdQuery(subjectId)
  console.log(subjectData)

  const { data: quizzes = [] } = useGetQuizBySubjectQuery(
    subjectData?.subject?.name
  )

  console.log(quizzes)

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${subjectId}/${quizId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-8 text-center">
          Các đề trắc nghiệm môn:
          <br />
          <h2 className="text-3xl">{subjectData?.subject?.name}</h2>
        </h1>

        {isLoading && (
          <p className="text-center text-gray-500">Đang tải quiz...</p>
        )}

        {isError && (
          <p className="text-center text-red-600">
            Đã xảy ra lỗi khi tải quiz.
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
              </div>
              <button
                onClick={() => handleStartQuiz(quiz._id)}
                className="mt-4 sm:mt-0 sm:ml-6 px-5 py-2 bg-red-600 text-white rounded hover:bg-white hover:text-red-600 border border-transparent cursor-pointer hover:border-red-600 transition duration-200"
              >
                Bắt đầu làm bài
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizSubject
