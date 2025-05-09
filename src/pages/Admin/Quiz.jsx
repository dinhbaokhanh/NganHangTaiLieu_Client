import React, { useState } from 'react'
import {
  useGetAllQuizzesQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGetAllSubjectsQuery,
} from '../../redux/api/api.js'
import { FaEdit, FaPlus, FaTrash, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Quiz = () => {
  const { data, isLoading, isError, refetch } = useGetAllQuizzesQuery()
  const { data: subjectData } = useGetAllSubjectsQuery()

  const [createQuiz] = useCreateQuizMutation()
  const [updateQuiz] = useUpdateQuizMutation()
  const [deleteQuiz] = useDeleteQuizMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    questions: [],
  })

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', ''],
    correctAnswerIndex: 0,
  })

  const [questionView, setQuestionView] = useState({
    open: false,
    questions: [],
  })

  const quizzes = Array.isArray(data?.quizzes) ? data.quizzes : []
  const subjects = Array.isArray(subjectData?.subjects)
    ? subjectData.subjects
    : []

  const openModal = (quiz = null) => {
    setFormData({
      title: quiz?.title || '',
      description: quiz?.description || '',
      subject: quiz?.subject || '',
      questions: quiz?.questions || [],
    })
    setEditingId(quiz?._id || null)
    setNewQuestion({
      question: '',
      options: ['', ''],
      correctAnswerIndex: 0,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData({ title: '', description: '', subject: '', questions: [] })
    setNewQuestion({
      question: '',
      options: ['', ''],
      correctAnswerIndex: 0,
    })
  }

  const handleAddQuestion = () => {
    if (
      newQuestion.question.trim() &&
      newQuestion.options.every((opt) => opt.trim()) &&
      newQuestion.options.length >= 2
    ) {
      const correctAnswer =
        newQuestion.options[newQuestion.correctAnswerIndex] || ''
      const questionToAdd = {
        question: newQuestion.question,
        options: [...newQuestion.options],
        correctAnswer,
      }

      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, questionToAdd],
      }))

      setNewQuestion({
        question: '',
        options: ['', ''],
        correctAnswerIndex: 0,
      })
    } else {
      toast.error('Vui lòng nhập đầy đủ câu hỏi và tối thiểu 2 lựa chọn!')
    }
  }

  const handleRemoveQuestion = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        questions: formData.questions,
      }

      if (editingId) {
        await updateQuiz({ id: editingId, ...payload }).unwrap()
      } else {
        await createQuiz(payload).unwrap()
      }

      closeModal()
      refetch()
    } catch (err) {
      console.error('Lỗi khi xử lý quiz:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa quiz này?')) {
      try {
        await deleteQuiz(id).unwrap()
        refetch()
      } catch (err) {
        console.error('Lỗi khi xóa quiz:', err)
      }
    }
  }

  const addOption = () => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }))
  }

  const removeOption = (index) => {
    if (newQuestion.options.length <= 2) return
    const newOptions = newQuestion.options.filter((_, i) => i !== index)
    setNewQuestion((prev) => ({
      ...prev,
      options: newOptions,
      correctAnswerIndex:
        index === prev.correctAnswerIndex
          ? 0
          : index < prev.correctAnswerIndex
          ? prev.correctAnswerIndex - 1
          : prev.correctAnswerIndex,
    }))
  }
  console.log(quizzes)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Quản lý Quiz</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center cursor-pointer gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <FaPlus /> Thêm Quiz
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Đang tải dữ liệu...</div>
        ) : isError ? (
          <div className="text-red-600 text-center">Không thể tải dữ liệu.</div>
        ) : (
          <table className="w-full border border-gray-300 rounded overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Tiêu đề</th>
                <th className="border px-4 py-2">Mô tả</th>
                <th className="border px-4 py-2">Môn học</th>
                <th className="border px-4 py-2">Câu hỏi</th>
                <th className="border px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td className="border px-4 py-2">{quiz.title}</td>
                  <td className="border px-4 py-2">
                    {quiz.description || 'Không có mô tả'}
                  </td>
                  <td className="border px-4 py-2">
                    {quiz?.subject?.name || 'Không rõ'}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {quiz.questions?.length || 0}
                    <button
                      onClick={() =>
                        setQuestionView({
                          open: true,
                          questions: quiz.questions || [],
                        })
                      }
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      <FaEye className="inline mr-1" /> Xem
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => openModal(quiz)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(quiz._id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Quiz */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 overflow-auto">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg max-h-[80vh] overflow-auto">
            <h3 className="text-xl font-semibold mb-4 text-red-600">
              {editingId ? 'Chỉnh sửa Quiz' : 'Thêm Quiz'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                required
              />
              <textarea
                placeholder="Mô tả"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                rows={3}
              />

              <select
                className="w-full border px-4 py-2 rounded"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              >
                <option value="">-- Chọn môn học --</option>
                {subjects.map((subj) => (
                  <option key={subj._id} value={subj._id}>
                    {subj.name}
                  </option>
                ))}
              </select>

              {formData.questions.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 ">
                    Danh sách câu hỏi đã thêm
                  </h2>

                  <ul className="space-y-3">
                    {formData.questions.map((q, index) => (
                      <li
                        key={index}
                        className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-medium text-gray-900  mb-2">
                              {index + 1}. {q.question}
                            </p>
                            <ul className="list-decimal ml-5 space-y-1 text-sm text-gray-700 ">
                              {q.options.map((opt, idx) => (
                                <li
                                  key={idx}
                                  className={`${
                                    opt === q.correctAnswer
                                      ? 'font-semibold text-green-600 dark:text-green-400'
                                      : ''
                                  }`}
                                >
                                  {opt}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button
                            onClick={() => handleRemoveQuestion(index)}
                            className="ml-4 px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-all"
                          >
                            Xoá
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Câu hỏi mới
                </h4>
                <input
                  type="text"
                  placeholder="Câu hỏi"
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded mb-2"
                />
                {newQuestion.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newQuestion.correctAnswerIndex === idx}
                      onChange={() =>
                        setNewQuestion({
                          ...newQuestion,
                          correctAnswerIndex: idx,
                          correctAnswer: newQuestion.options[idx],
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder={`Lựa chọn ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const updatedOptions = [...newQuestion.options]
                        updatedOptions[idx] = e.target.value
                        const updatedNewQuestion = {
                          ...newQuestion,
                          options: updatedOptions,
                        }

                        if (newQuestion.correctAnswerIndex === idx) {
                          updatedNewQuestion.correctAnswer = e.target.value
                        }

                        setNewQuestion(updatedNewQuestion)
                      }}
                      className="flex-1 border px-3 py-2 rounded"
                    />
                    {newQuestion.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(idx)}
                        className="text-sm text-red-600"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOption}
                  className="text-blue-600 text-sm mt-2"
                >
                  + Thêm lựa chọn
                </button>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
                  >
                    Lưu câu hỏi
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={formData.title.trim() === ''}
                >
                  {editingId ? 'Cập nhật Quiz' : 'Tạo Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xem câu hỏi */}
      {questionView.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">
                Danh sách câu hỏi
              </h3>
              <button
                onClick={() => setQuestionView({ open: false, questions: [] })}
                className="text-gray-500 hover:text-red-600 cursor-pointer"
              >
                Đóng
              </button>
            </div>
            {questionView.questions.length === 0 ? (
              <p className="text-gray-500 text-center">Không có câu hỏi nào.</p>
            ) : (
              <ul className="space-y-4">
                {questionView.questions.map((q, index) => (
                  <li key={index}>
                    <p className="font-semibold mb-1">
                      Câu {index + 1}: {q.question}
                    </p>
                    <ul className="list-disc ml-6 text-gray-700">
                      {q.options.map((opt, i) => (
                        <li
                          key={i}
                          className={
                            (q.correctAnswerIndex !== undefined &&
                              i === q.correctAnswerIndex) ||
                            (q.correctAnswer && opt === q.correctAnswer)
                              ? 'text-green-600 font-bold'
                              : ''
                          }
                        >
                          {opt}{' '}
                          {(q.correctAnswerIndex !== undefined &&
                            i === q.correctAnswerIndex) ||
                          (q.correctAnswer && opt === q.correctAnswer)
                            ? '(Correct)'
                            : ''}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
