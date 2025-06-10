import React, { useState } from 'react'
import {
  FaTimes,
  FaUser,
  FaCalendar,
  FaTag,
  FaFileAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa'

const FeedbackModal = ({ feedback, onClose, onStatusUpdate, isUpdating }) => {
  const [selectedStatus, setSelectedStatus] = useState(feedback.status)

  const feedbackStatuses = [
    {
      value: 'Chờ xử lý',
      label: 'Chờ xử lý',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      value: 'Đã xem',
      label: 'Đã xem',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      value: 'Đã giải quyết',
      label: 'Đã giải quyết',
      color: 'bg-green-100 text-green-800',
    },
  ]

  const categoryLabels = {
    'Nội dung': 'Nội dung',
    'Bị lặp tài liệu': 'Bị lặp tài liệu',
    'Bản quyền': 'Bản quyền',
    Khác: 'Khác',
  }

  const handleStatusUpdate = async () => {
    if (selectedStatus !== feedback.status) {
      await onStatusUpdate(feedback._id, selectedStatus)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getStatusStyle = (status) => {
    return (
      feedbackStatuses.find((s) => s.value === status)?.color ||
      'bg-gray-100 text-gray-800'
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Nội dung': 'bg-red-100 text-red-800',
      'Bị lặp tài liệu': 'bg-orange-100 text-orange-800',
      'Bản quyền': 'bg-purple-100 text-purple-800',
      Khác: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Chi tiết phản hồi #{feedback._id?.slice(-6)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaUser className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Người gửi</p>
                  <p className="font-medium">
                    {feedback.username || 'Ẩn danh'}
                  </p>
                  {feedback.email && (
                    <p className="text-sm text-gray-600">
                      {feedback.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaCalendar className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Ngày tạo</p>
                  <p className="font-medium">
                    {formatDate(feedback.createdAt)}
                  </p>
                  {feedback.updatedAt &&
                    feedback.updatedAt !== feedback.createdAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Cập nhật: {formatDate(feedback.updatedAt)}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaFileAlt className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Tên file</p>
                  <p className="font-medium break-all">{feedback.fileName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Danh mục</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    feedback.category
                  )}`}
                >
                  {categoryLabels[feedback.category] || feedback.category}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Trạng thái hiện tại
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    feedback.status
                  )}`}
                >
                  {feedbackStatuses.find((s) => s.value === feedback.status)
                    ?.label || feedback.status}
                </span>
              </div>

              {feedback.fileId && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">ID File</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded border">
                      {feedback.fileId}
                    </span>
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                      title="Xem file"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Nội dung phản hồi</p>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {feedback.comment}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Hành động quản trị
            </h3>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cập nhật trạng thái
              </label>
              <div className="flex gap-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {feedbackStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleStatusUpdate}
                  disabled={selectedStatus === feedback.status || isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
                >
                  {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200 transition-colors font-medium cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
