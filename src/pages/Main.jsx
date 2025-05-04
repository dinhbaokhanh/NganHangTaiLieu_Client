import React from 'react'
import bg from '../assets/login_background.jpg'
import { Link } from 'react-router'

const Main = () => {
  return (
    <>
      {/* PHẦN INTRO */}
      <main
        className="text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="text-center px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tài liệu học tập PTIT
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Tổng hợp tài liệu từ sinh viên PTIT – giúp bạn học tập hiệu quả hơn!
          </p>

          <form className="flex items-center w-full max-w-xl bg-white rounded-full px-4 py-2 shadow-md">
            <input
              type="text"
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
          </form>
        </div>
      </main>
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
            to="/"
            className="inline-block bg-red-800 text-white py-3 px-8 rounded-lg text-xl hover:bg-red-900 transition"
            style={{
              backgroundColor: 'rgb(146, 0, 0)',
              hover: { backgroundColor: 'rgb(120, 0, 0)' },
            }}
          >
            Khám Phá Ngay
          </Link>
        </div>
      </section>
      <section className="bg-gray-50 text-gray-800 py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Cộng Đồng & Đóng Góp
          </h2>
          <p className="text-gray-600 mb-10">
            Cộng đồng PTIT luôn đồng hành, đóng góp những tài liệu chất lượng.
            Bạn cũng có thể đóng góp để giúp đỡ những bạn sinh viên khác.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/community"
              className="inline-block bg-red-800 text-white py-3 px-8 rounded-lg text-xl hover:bg-red-900 transition"
              style={{
                backgroundColor: 'rgb(146, 0, 0)',
                hover: { backgroundColor: 'rgb(120, 0, 0)' },
              }}
            >
              Tham Gia Cộng Đồng
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
