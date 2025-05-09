import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetQuizByIdQuery } from '../../redux/api/api'

const QuizDetails = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetQuizByIdQuery(id)
  const quiz = data?.quiz

  // State for tracking user answers and quiz completion
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Đang tải quiz...</p>
  }

  if (isError || !quiz) {
    return (
      <p className="text-center text-red-600 mt-10">
        Không thể tải quiz. Vui lòng thử lại sau.
      </p>
    )
  }

  const handleOptionSelect = (questionIndex, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }))
  }

  const calculateScore = () => {
    let correctAnswers = 0

    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    setScore(correctAnswers)
    setShowResults(true)
  }

  const resetQuiz = () => {
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const allQuestionsAnswered =
    quiz.questions.length === Object.keys(userAnswers).length

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{quiz.title}</h1>
        <p className="text-gray-700 mb-6">{quiz.description}</p>

        {!showResults ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Danh sách câu hỏi ({quiz.questions.length})
            </h2>

            <ul className="space-y-6">
              {quiz.questions.map((q, questionIndex) => (
                <li key={questionIndex} className="border rounded p-4">
                  <p className="font-medium mb-3">
                    Câu {questionIndex + 1}: {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 border rounded-md cursor-pointer hover:bg-gray-50 transition ${
                          userAnswers[questionIndex] === option
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                        onClick={() =>
                          handleOptionSelect(questionIndex, option)
                        }
                      >
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            className="mr-2"
                            checked={userAnswers[questionIndex] === option}
                            onChange={() =>
                              handleOptionSelect(questionIndex, option)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-between">
              <button
                className={`px-6 py-2 rounded-md font-medium ${
                  allQuestionsAnswered
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={calculateScore}
                disabled={!allQuestionsAnswered}
              >
                Kiểm tra kết quả
              </button>
              <span className="text-gray-500">
                {Object.keys(userAnswers).length}/{quiz.questions.length} câu đã
                trả lời
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Kết quả</h2>
                <span className="text-lg font-bold text-blue-600">
                  {score}/{quiz.questions.length} đúng (
                  {Math.round((score / quiz.questions.length) * 100)}%)
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    score / quiz.questions.length >= 0.7
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(score / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Xem lại câu trả lời
            </h2>

            <ul className="space-y-6">
              {quiz.questions.map((q, questionIndex) => {
                const isCorrect = userAnswers[questionIndex] === q.correctAnswer

                return (
                  <li
                    key={questionIndex}
                    className={`border rounded p-4 ${
                      isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <p className="font-medium mb-3">
                      Câu {questionIndex + 1}: {q.question}
                    </p>

                    <ul className="space-y-2">
                      {q.options.map((option, optionIndex) => {
                        let optionClass = ''

                        if (option === q.correctAnswer) {
                          optionClass =
                            'bg-green-100 border-green-500 text-green-800'
                        } else if (userAnswers[questionIndex] === option) {
                          optionClass = 'bg-red-100 border-red-500 text-red-800'
                        }

                        return (
                          <li
                            key={optionIndex}
                            className={`p-2 border rounded-md ${
                              optionClass || 'border-gray-200'
                            }`}
                          >
                            {option}
                            {option === q.correctAnswer && (
                              <span className="ml-2 text-green-600 font-medium">
                                (Đúng)
                              </span>
                            )}
                            {userAnswers[questionIndex] === option &&
                              option !== q.correctAnswer && (
                                <span className="ml-2 text-red-600 font-medium">
                                  (Bạn chọn)
                                </span>
                              )}
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>

            <button
              className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              onClick={resetQuiz}
            >
              Làm lại bài
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizDetails
