/* eslint-disable no-unused-vars */
import React from 'react'
import { FaEye, FaDownload, FaBookmark, FaFlag } from 'react-icons/fa'
import documents from '../data/sampleDocuments'

const FileDetails = () => {
  const file = documents[6]
  const {
    category,
    title,
    major,
    description,
    thumbnail,
    author,
    publishedYear,
  } = file

  const categoryPrefix =
    category === 'theory'
      ? 'Giáo trình: '
      : category === 'practice'
      ? 'Ngân hàng: '
      : category === 'exam'
      ? 'Đề thi: '
      : ''

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-6">
        <button className="flex items-center text-red-600 font-semibold mb-4">
          ← Quay về trang trước
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md flex gap-6">
          <div className="flex-1">
            <img
              src={thumbnail}
              alt={title}
              className="w-[400px] h-[550px] object-cover rounded-lg border mb-12"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-7">
              {categoryPrefix}
              {title}
            </h2>
            <p className="text-lg font-semibold text-gray-600">
              Ngành: {major}
            </p>

            {category === 'theory' && (
              <>
                <p className="text-lg font-semibold text-gray-600">
                  Năm xuất bản: {publishedYear}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Tác giả: {author}
                </p>
              </>
            )}

            <p className="text-lg font-semibold text-gray-600">
              Mô tả: {description}
            </p>

            <div className="flex gap-4 mt-12">
              {[
                { icon: FaEye, label: 'Xem trước' },
                { icon: FaBookmark, label: 'Lưu' },
                { icon: FaDownload, label: 'Tải về' },
              ].map(({ icon: Icon, label }, index) => (
                <div key={index} className="group relative">
                  <button className="p-3 w-12 h-12 bg-red-600 text-white rounded-md flex items-center justify-center cursor-pointer">
                    <Icon size={20} />
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded w-max opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </div>
              ))}

              <button className="flex items-center gap-2 p-3 px-4 border border-red-600 text-red-600 rounded-md cursor-pointer">
                <FaFlag size={20} />
                <span>Phản hồi</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold text-red-600">Bình luận</h3>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:opacity-80 transition duration-200" />
            <input
              type="text"
              placeholder="Bình luận..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button className="p-2 bg-red-600 text-white rounded">➤</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileDetails
