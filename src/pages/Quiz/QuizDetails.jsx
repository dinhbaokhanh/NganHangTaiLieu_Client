import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetQuizByIdQuery } from '../../redux/api/api'

const QuizDetails = () => {
  const { subjectId, quizId } = useParams()
  const { data, isLoading, isError } = useGetQuizByIdQuery(quizId)
  const quiz = data?.quiz

  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Đang tải quiz...</p>
  }

  if (isError || !quiz) {
    return <p className="text-center text-red-600 mt-10">Không thể tải quiz.</p>
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

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Danh sách câu hỏi ({quiz.questions.length})
          </h2>

          <ul className="space-y-6">
            {quiz.questions.map((q, questionIndex) => {
              const userAnswer = userAnswers[questionIndex]
              const isCorrect = userAnswer === q.correctAnswer

              return (
                <li
                  key={questionIndex}
                  className={`border rounded p-4 ${
                    showResults
                      ? isCorrect
                        ? 'bg-green-50 border-green-400'
                        : 'bg-red-50 border-red-400'
                      : ''
                  }`}
                >
                  <p className="font-medium mb-3">
                    Câu {questionIndex + 1}: {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => {
                      const isSelected = userAnswer === option
                      const isCorrectAnswer = option === q.correctAnswer

                      const optionClass = showResults
                        ? isCorrectAnswer
                          ? 'border-green-500 bg-green-100'
                          : isSelected
                          ? 'border-red-500 bg-red-100'
                          : 'border-gray-200'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'

                      return (
                        <div
                          key={optionIndex}
                          className={`p-2 border rounded-md transition ${optionClass}`}
                          onClick={() =>
                            !showResults &&
                            handleOptionSelect(questionIndex, option)
                          }
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${questionIndex}`}
                              className="mr-2"
                              checked={isSelected}
                              onChange={() =>
                                !showResults &&
                                handleOptionSelect(questionIndex, option)
                              }
                              disabled={showResults}
                            />
                            <span>{option}</span>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex justify-between items-center">
            {!showResults ? (
              <>
                <button
                  className={`px-6 py-2 rounded-md font-medium ${
                    allQuestionsAnswered
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={calculateScore}
                  disabled={!allQuestionsAnswered}
                >
                  Nộp bài
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-2 rounded-md font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  Làm lại
                </button>
              </>
            ) : (
              <div className="w-full text-center">
                <p className="text-xl font-semibold">
                  Điểm của bạn: {score} / {quiz.questions.length}
                </p>
                <button
                  onClick={resetQuiz}
                  className="mt-6 px-6 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Làm lại
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizDetails
