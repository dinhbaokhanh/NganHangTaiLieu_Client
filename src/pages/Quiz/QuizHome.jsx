import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  useGetAllSubjectsQuery,
  useGetAllQuizzesQuery,
} from '../../redux/api/api.js'

const QuizHome = () => {
  const navigate = useNavigate()
  const {
    data: subjectsData = {},
    isLoading: isLoadingSubjects,
    isError: isSubjectError,
  } = useGetAllSubjectsQuery()

  const {
    data: quizzesData = {},
    isLoading: isLoadingQuizzes,
    isError: isQuizError,
  } = useGetAllQuizzesQuery()

  const subjects = subjectsData?.subjects || []
  const quizzes = quizzesData?.quizzes || []

  const subjectIdsWithQuiz = new Set(quizzes.map((q) => q.subject._id))

  const filteredSubjects = subjects.filter((subject) =>
    subjectIdsWithQuiz.has(subject._id)
  )

  const handleSubjectSelect = (subjectId) => {
    navigate(`/quiz/${subjectId}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Danh sách môn học thi trắc nghiệm
        </h1>

        {(isLoadingSubjects || isLoadingQuizzes) && (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        )}

        {(isSubjectError || isQuizError) && (
          <p className="text-center text-red-600">
            Lỗi khi tải môn học hoặc quiz. Vui lòng thử lại sau.
          </p>
        )}

        {!isLoadingSubjects &&
          !isLoadingQuizzes &&
          !filteredSubjects.length && (
            <p className="text-center text-gray-500">
              Không có môn học nào có quiz.
            </p>
          )}

        <div className="space-y-6">
          {filteredSubjects.map((subject) => (
            <div
              key={subject._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl shadow border border-red-100 p-5 hover:shadow-md transition"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-red-600">
                  {subject.name}
                </h2>
              </div>
              <button
                onClick={() => handleSubjectSelect(subject._id)}
                className="mt-4 sm:mt-0 sm:ml-6 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Xem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizHome
