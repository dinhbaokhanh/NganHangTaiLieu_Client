import React from 'react'

const RemoveForm = ({
  title = 'Xác nhận xóa',
  description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  warningMessage = 'Hành động này không thể hoàn tác.',
  onConfirm,
  onCancel,
  confirmText = 'Đồng ý xóa',
  cancelText = 'Hủy bỏ',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-gray-600">{description}</p>
          {warningMessage && (
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
              <p className="text-sm font-medium">Cảnh báo</p>
              <p className="text-sm">{warningMessage}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveForm
