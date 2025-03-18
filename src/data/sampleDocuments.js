const documents = [
  {
    id: 1,
    title: 'Nhập môn AI',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
    major: 'Trí tuệ nhân tạo',
    author: 'KICM',
    publishedYear: 2022,
    description:
      'Tài liệu giới thiệu căn bản về Trí tuệ nhân tạo, các khái niệm machine learning và neural network',
  },
  {
    id: 2,
    title: 'Đề cương ôn tập Java',
    category: 'exam',
    saved: true,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-mòng-két-và-hồng-bánh-donut-thức-ăn-nhật-ký-sách-bìa-Zlr77mT-27w.jpg',
    major: 'Công nghệ phần mềm',
    description:
      'Tổng hợp kiến thức lập trình Java cốt lõi, các dạng bài tập thường gặp trong kỳ thi',
  },
  {
    id: 3,
    title: 'Mạng máy tính',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
    major: 'Hệ thống thông tin',
    author: 'KICM',
    publishedYear: 2020,
    description:
      'Giáo trình mạng máy tính từ căn bản đến nâng cao, bao gồm các giao thức và kiến trúc mạng',
  },
  {
    id: 4,
    title: 'Đề thi thử Kỹ thuật lập trình',
    category: 'exam',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-đậm-xanh-dương-trái-đất-khoa-học-viện-tưởng-sách-bìa-5jYTmzVneQk.jpg',
    major: 'Công nghệ phần mềm',
    description:
      'Bộ đề thi mẫu môn Kỹ thuật lập trình có đáp án chi tiết và biểu điểm',
  },
  {
    id: 5,
    title: 'Tài liệu giải thuật',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://imgv2-2-f.scribdassets.com/img/document/80883811/original/5ec8e2684a/1?v=1',
    major: 'Công nghệ phần mềm',
    author: 'Nguyễn Mạnh Hùng',
    publishedYear: 2021,
    description:
      'Các thuật toán kinh điển và ứng dụng thực tế trong phát triển phần mềm',
  },
  {
    id: 6,
    title: 'Cấu trúc dữ liệu và Giải thuật',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://imgv2-2-f.scribdassets.com/img/document/266815184/original/89ed6dea29/1?v=1',
    major: 'Công nghệ phần mềm',
    author: 'KICM',
    publishedYear: 2023,
    description:
      'Chuyên sâu về các cấu trúc dữ liệu phổ biến và phương pháp phân tích giải thuật',
  },
  {
    id: 7,
    title: 'Hệ điều hành',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-mòng-két-và-hồng-bánh-donut-thức-ăn-nhật-ký-sách-bìa-Zlr77mT-27w.jpg',
    major: 'Hệ thống thông tin',
    author: 'KICM',
    publishedYear: 2019,
    description:
      'Nguyên lý hoạt động và quản lý tài nguyên trong các hệ điều hành thông dụng',
  },
  {
    id: 8,
    title: 'Đề thi thử Mạng máy tính',
    category: 'exam',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
    major: 'Hệ thống thông tin',
    description:
      'Đề thi mẫu kèm case study thực tế về thiết kế và khắc phục sự cố mạng',
  },
  {
    id: 9,
    title: 'Phân tích và Thiết kế Hệ thống',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-đậm-xanh-dương-trái-đất-khoa-học-viện-tưởng-sách-bìa-5jYTmzVneQk.jpg',
    major: 'Hệ thống thông tin',
    author: 'KICM',
    publishedYear: 2022,
    description:
      'Phương pháp luận trong phân tích hệ thống thông tin và thiết kế phần mềm',
  },
  {
    id: 10,
    title: 'Lập trình Web',
    category: 'practice',
    saved: true,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
    major: 'Công nghệ phần mềm',
    author: 'KICM',
    description:
      'Hướng dẫn thực hành xây dựng website từ căn bản với HTML/CSS/JavaScript',
  },
  {
    id: 11,
    title: 'Lập trình C cơ bản',
    category: 'practice',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-mòng-két-và-hồng-bánh-donut-thức-ăn-nhật-ký-sách-bìa-Zlr77mT-27w.jpg',
    major: 'Công nghệ phần mềm',
    description:
      'Thực hành lập trình C qua các bài tập từ dễ đến khó có hướng dẫn chi tiết',
  },
  {
    id: 12,
    title: 'Cấu trúc dữ liệu nâng cao',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
    major: 'Công nghệ phần mềm',
    author: 'KICM',
    publishedYear: 2023,
    description:
      'Nghiên cứu chuyên sâu về các cấu trúc dữ liệu phức tạp và ứng dụng thực tế',
  },
  {
    id: 13,
    title: 'Nhập môn Khoa học Máy tính',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-đậm-xanh-dương-trái-đất-khoa-học-viện-tưởng-sách-bìa-5jYTmzVneQk.jpg',
    major: 'Công nghệ phần mềm',
    author: 'KICM',
    publishedYear: 2021,
    description:
      'Tổng quan về các lĩnh vực cốt lõi trong khoa học máy tính cho người mới bắt đầu',
  },
  {
    id: 14,
    title: 'An toàn thông tin',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
    major: 'Hệ thống thông tin',
    author: 'KICM',
    publishedYear: 2022,
    description:
      'Chuyên đề về bảo mật hệ thống, mã hóa dữ liệu và phòng chống tấn công mạng',
  },
  {
    id: 15,
    title: 'Cơ sở dữ liệu',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-mòng-két-và-hồng-bánh-donut-thức-ăn-nhật-ký-sách-bìa-Zlr77mT-27w.jpg',
    major: 'Hệ thống thông tin',
    author: 'KICM',
    publishedYear: 2020,
    description:
      'Lý thuyết cơ sở dữ liệu quan hệ và hướng dẫn thiết kế database chuẩn hóa',
  },
  {
    id: 16,
    title: 'Phát triển phần mềm hướng đối tượng',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
    major: 'Công nghệ phần mềm',
    author: 'KICM',
    publishedYear: 2023,
    description:
      'Ứng dụng các nguyên lý OOP trong thiết kế và phát triển hệ thống phần mềm',
  },
  {
    id: 17,
    title: 'Lập trình React.js',
    category: 'practice',
    saved: true,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-đậm-xanh-dương-trái-đất-khoa-học-viện-tưởng-sách-bìa-5jYTmzVneQk.jpg',
    major: 'Công nghệ phần mềm',
    description:
      'Thực hành xây dựng ứng dụng web hiện đại với ReactJS và Redux',
  },
  {
    id: 18,
    title: 'Machine Learning cơ bản',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
    major: 'Trí tuệ nhân tạo',
    author: 'KICM',
    publishedYear: 2023,
    description:
      'Giới thiệu các thuật toán machine learning căn bản và ứng dụng thực tiễn',
  },
  {
    id: 19,
    title: 'Data Science nhập môn',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
    major: 'Trí tuệ nhân tạo',
    author: 'KICM',
    publishedYear: 2022,
    description:
      'Nền tảng về khoa học dữ liệu, xử lý dữ liệu và phân tích bằng Python',
  },
]

export default documents
