import React from 'react'
import Header from '../components/layout/Header'
import { FaEye, FaDownload, FaBookmark, FaFlag } from 'react-icons/fa'
import documents from '../data/sampleDocuments'

const FileDetails = () => {
  const file = documents[0]
  const {
    category,
    title,
    major,
    description,
    thumbnail,
    author,
    publishedYear,
  } = file

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-5xl mx-auto py-6">
        <button className="flex items-center text-red-600 font-semibold mb-4">
          ← Quay về trang trước
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md flex gap-6">
          <div className="flex-1">
            <img
              src={thumbnail}
              alt={title}
              className="w-full rounded-lg border"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">Ngành: {major}</p>

            {category === 'theory' && (
              <>
                <p className="text-gray-600">Năm xuất bản: {publishedYear}</p>
                <p className="text-gray-600">Tác giả: {author}</p>
              </>
            )}

            <p className="text-gray-600">Mô tả: {description}</p>

            <div className="flex gap-4 mt-4">
              {[
                { icon: <FaEye size={24} />, label: 'Xem trước' },
                { icon: <FaBookmark size={24} />, label: 'Lưu' },
                { icon: <FaDownload size={24} />, label: 'Tải về' },
              ].map(({ icon, label }, index) => (
                <div key={index} className="group relative">
                  <button className="p-3 w-14 h-14 bg-red-600 text-white rounded-md flex items-center justify-center">
                    {icon}
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded w-max opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold text-red-600">Bình luận</h3>
          <div className="flex items-center gap-4 mt-4">
            <img
              src="/path/to/user-avatar.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
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
