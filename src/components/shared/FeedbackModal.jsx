import React, { useState } from 'react'

const FeedbackModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [reportData, setReportData] = useState({
    reason: '',
    category: 'Nội dung',
  })

  const reportReasons = [
    { value: 'Nội dung', label: 'Nội dung không phù hợp' },
    { value: 'Bản quyền', label: 'Bản quyền' },
    { value: 'Bị lặp tài liệu', label: 'Bị lặp tài liệu' },
    { value: 'Khác', label: 'Khác' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reportData.reason.trim()) return

    onSubmit(reportData)
  }

  const handleChange = (field, value) => {
    setReportData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setReportData({
      reason: '',
      category: 'Nội dung',
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Báo cáo tài liệu
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-red-600 text-2xl cursor-pointer transition-colors"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại vi phạm <span className="text-red-500">*</span>
            </label>
            <select
              value={reportData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {reportReasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bình luận/Lý do báo cáo <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reportData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              placeholder="Nhập lý do báo cáo hoặc bình luận..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !reportData.reason.trim()}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi báo cáo'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600">
            Báo cáo của bạn sẽ được xem xét và xử lý trong vòng 24-48 giờ. Vui
            lòng chỉ báo cáo những vấn đề thực sự.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
