import React, { useState, useRef, useEffect } from 'react'
import bg from '../../assets/login_background.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchDocumentsQuery } from '../../redux/api/api'

const Main = () => {
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Gọi API tìm kiếm
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchDocumentsQuery(keyword, {
    skip: !isSearching || !keyword,
  })

  // Đóng popup tìm kiếm nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim() !== '') {
      setIsSearching(true)
    }
  }

  const handleDocumentClick = (docId) => {
    setIsSearching(false)
    navigate(`/documents/${docId}`)
  }

  return (
    <>
      {/* PHẦN INTRO */}
      <main
        className="text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div
          className="flex flex-col items-center px-4 z-1 w-full"
          ref={searchRef}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tài liệu học tập PTIT
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Tổng hợp tài liệu từ sinh viên PTIT – giúp bạn học tập hiệu quả hơn!
          </p>

          <form
            className="w-full max-w-xl flex items-center bg-white rounded-full px-4 py-2 shadow-md relative"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm môn học, tài liệu hoặc sách..."
              className="flex-1 text-gray-800 bg-transparent focus:outline-none"
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
                />
              </svg>
            </button>

            {/* Hiển thị kết quả tìm kiếm */}
            {isSearching && keyword && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-70 overflow-y-auto text-left text-gray-700">
                {searchLoading && (
                  <div className="p-4 text-center text-gray-500">
                    Đang tải kết quả...
                  </div>
                )}
                {searchError && (
                  <div className="p-4 text-center text-red-500">
                    Lỗi khi tải kết quả.
                  </div>
                )}
                {!searchLoading && !searchError && (
                  <>
                    {searchData?.documents?.length === 0 ? (
                      <div className="p-4 text-center text-sm">
                        Không tìm thấy tài liệu nào.
                      </div>
                    ) : (
                      <ul className="p-2 space-y-2">
                        {searchData.documents.map((doc) => (
                          <li
                            key={doc._id}
                            className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                            onClick={() => handleDocumentClick(doc._id)}
                          >
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-gray-500">
                              {doc.author}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {doc.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Các section giới thiệu */}
      <section className="bg-white text-gray-800 py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Nền tảng tài liệu học tập dành riêng cho sinh viên PTIT
          </h2>
          <p className="text-gray-600 mb-10">
            Được xây dựng từ cộng đồng, cho cộng đồng – tối ưu cho chương trình
            đào tạo và nhu cầu học tập thực tế tại Học viện.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-red-600 text-lg mb-2">
                Tài liệu theo môn học
              </h3>
              <p className="text-gray-600 text-sm">
                Tìm kiếm nhanh chóng tài liệu học phần đúng ngành, đúng chương
                trình.
              </p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-red-600 text-lg mb-2">
                Tải xuống dễ dàng
              </h3>
              <p className="text-gray-600 text-sm">
                Tải file PDF, slide, đề cương… chỉ với vài thao tác.
              </p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-red-600 text-lg mb-2">
                Lưu & đánh dấu
              </h3>
              <p className="text-gray-600 text-sm">
                Lưu tài liệu để xem sau và đánh giá giúp cộng đồng tìm nguồn
                chất lượng.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-50 py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Khám Phá Hàng Ngàn Tài Liệu Hữu Ích
          </h2>
          <p className="text-gray-600 mb-10">
            Dễ dàng tìm kiếm và truy cập vào kho tài liệu phong phú từ nhiều
            ngành học và môn học khác nhau.
          </p>

          <Link
            to="/main"
            className="inline-block bg-red-800 text-white py-3 px-8 rounded-lg text-xl hover:bg-red-900 transition"
          >
            Khám Phá Ngay
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 text-gray-800 py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Ôn tập bằng Quiz
          </h2>
          <p className="text-gray-600 mb-10">
            Củng cố kiến thức qua các bài quiz nhanh, chính xác và dễ nhớ. Học
            tập hiệu quả hơn với cách ôn luyện chủ động.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/quiz"
              className="inline-block bg-red-800 text-white py-3 px-8 rounded-lg text-xl hover:bg-red-900 transition"
            >
              Bắt Đầu Làm Quiz
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
