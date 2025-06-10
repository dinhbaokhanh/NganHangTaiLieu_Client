import React, { useState, useEffect } from 'react'
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaClock,
} from 'react-icons/fa'
import FeedbackModal from '../../components/admin/FeedbackModal'

import {
  useGetFeedbacksQuery,
  useUpdateFeedbackStatusMutation,
  useDeleteFeedbackMutation,
  useGetUserProfileQuery,
} from '../../redux/api/api.js'
import { useAsyncMutation, useErrors } from '../../hooks/hook.js'
import { toast } from 'react-toastify'

const Feedback = () => {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewingFeedback, setViewingFeedback] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const {
    data: feedbackData,
    isLoading,
    error,
    refetch,
  } = useGetFeedbacksQuery()

  const [updateFeedbackStatus, isUpdating] = useAsyncMutation(
    useUpdateFeedbackStatusMutation
  )
  const [deleteFeedback, isDeleting] = useAsyncMutation(
    useDeleteFeedbackMutation
  )

  useErrors([{ isError: !!error, error }])

  const feedbacks = feedbackData?.feedbacks || []

  const feedbackStatuses = [
    {
      value: 'Chờ xử lý',
      label: 'Chờ xử lý',
      color: 'text-yellow-600',
      icon: FaClock,
    },
    { value: 'Đã xem', label: 'Đã xem', color: 'text-blue-600', icon: FaEye },
    {
      value: 'Đã giải quyết',
      label: 'Đã giải quyết',
      color: 'text-green-600',
      icon: FaCheck,
    },
  ]

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.comment?.toLowerCase().includes(search.toLowerCase()) ||
      feedback.fileName?.toLowerCase().includes(search.toLowerCase()) ||
      feedback.userId?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = selectedStatus
      ? feedback.status === selectedStatus
      : true
    const matchesType = selectedType ? feedback.category === selectedType : true
    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewFeedback = (feedback) => {
    setViewingFeedback(feedback)
    setIsModalOpen(true)
  }

  const handleUpdateStatus = async (feedbackId, newStatus) => {
    await updateFeedbackStatus('Đang cập nhật trạng thái...', {
      id: feedbackId,
      status: newStatus,
    })
    await refetch()
    toast.success('Cập nhật trạng thái thành công!')
  }

  const handleDeleteFeedback = async (feedbackToDelete) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')

    if (confirm) {
      await deleteFeedback('Đang xóa phản hồi...', feedbackToDelete._id)
      await refetch()
      toast.success('Phản hồi đã được xóa!')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setViewingFeedback(null)
  }

  const getStatusInfo = (status) => {
    return (
      feedbackStatuses.find((s) => s.value === status) || feedbackStatuses[0]
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFeedbacks = filteredFeedbacks.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedStatus, selectedType])

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Quản lý phản hồi</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Tổng: {filteredFeedbacks.length} phản hồi
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo bình luận, tên file hoặc người dùng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            {feedbackStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            <option value="Nội dung">Nội dung</option>
            <option value="Bị lặp tài liệu">Bị lặp tài liệu</option>
            <option value="Bản quyền">Bản quyền</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-8">Đang tải dữ liệu...</div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có phản hồi nào
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Người gửi
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Tên file
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Bình luận
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Trạng thái
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Ngày tạo
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedFeedbacks.map((feedback) => {
                  const statusInfo = getStatusInfo(feedback.status)
                  const StatusIcon = statusInfo.icon

                  return (
                    <tr key={feedback._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        <div>
                          <div className="font-medium">
                            {feedback.username || 'Ẩn danh'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {feedback.email || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div
                          className="max-w-xs truncate"
                          title={feedback.fileName}
                        >
                          {feedback.fileName}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div
                          className="max-w-xs truncate"
                          title={feedback.comment}
                        >
                          {feedback.comment}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <StatusIcon
                            className={`text-sm ${statusInfo.color}`}
                          />
                          <span className={`text-sm ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {formatDate(feedback.createdAt)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleViewFeedback(feedback)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Xem chi tiết"
                          >
                            <FaEye />
                          </button>

                          {/* Status update dropdown */}
                          <select
                            value={feedback.status}
                            onChange={(e) =>
                              handleUpdateStatus(feedback._id, e.target.value)
                            }
                            className="text-xs px-2 py-1 border rounded"
                            disabled={isUpdating}
                          >
                            {feedbackStatuses.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => handleDeleteFeedback(feedback)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Xóa"
                            disabled={isDeleting}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex cursor-pointer items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
                      ${
                        currentPage === 1
                          ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                      }
                    `}
            >
              <FaChevronLeft />
              Trước
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 cursor-pointer py-2 rounded-md transition
                          ${
                            currentPage === page
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                          }
                        `}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex cursor-pointer items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
                      ${
                        currentPage === totalPages
                          ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                      }
                    `}
            >
              Sau
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {isModalOpen && viewingFeedback && (
        <FeedbackModal
          feedback={viewingFeedback}
          onClose={handleModalClose}
          onStatusUpdate={handleUpdateStatus}
          isUpdating={isUpdating}
        />
      )}
    </div>
  )
}

export default Feedback
