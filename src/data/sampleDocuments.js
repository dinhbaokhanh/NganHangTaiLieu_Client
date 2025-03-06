const documents = [
  {
    id: 1,
    title: 'Nhập môn AI',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
  },
  {
    id: 2,
    title: 'Đề cương ôn tập Java',
    category: 'exam',
    saved: true,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-m%C3%B2ng-k%C3%A9t-v%C3%A0-h%E1%BB%93ng-b%C3%A1nh-donut-th%E1%BB%A9c-%C4%83n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-Zlr77mT-27w.jpg',
  },
  {
    id: 3,
    title: 'Mạng máy tính',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
  },
  {
    id: 4,
    title: 'Đề thi thử Kỹ thuật lập trình',
    category: 'exam',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-%C4%91%E1%BA%ADm-xanh-d%C6%B0%C6%A1ng-tr%C3%A1i-%C4%91%E1%BA%A5t-khoa-h%E1%BB%8Dc-vi%E1%BB%85n-t%C6%B0%E1%BB%9Fng-s%C3%A1ch-b%C3%ACa-5jYTmzVneQk.jpg',
  },
  {
    id: 5,
    title: 'Tài liệu giải thuật',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://imgv2-2-f.scribdassets.com/img/document/80883811/original/5ec8e2684a/1?v=1',
  },
  {
    id: 6,
    title: 'Cấu trúc dữ liệu và Giải thuật',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://imgv2-2-f.scribdassets.com/img/document/266815184/original/89ed6dea29/1?v=1',
  },
  {
    id: 7,
    title: 'Hệ điều hành',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-m%C3%B2ng-k%C3%A9t-v%C3%A0-h%E1%BB%93ng-b%C3%A1nh-donut-th%E1%BB%A9c-%C4%83n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-Zlr77mT-27w.jpg',
  },
  {
    id: 8,
    title: 'Đề thi thử Mạng máy tính',
    category: 'exam',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
  },
  {
    id: 9,
    title: 'Phân tích và Thiết kế Hệ thống',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-%C4%91%E1%BA%ADm-xanh-d%C6%B0%C6%A1ng-tr%C3%A1i-%C4%91%E1%BA%A5t-khoa-h%E1%BB%8Dc-vi%E1%BB%85n-t%C6%B0%E1%BB%9Fng-s%C3%A1ch-b%C3%ACa-5jYTmzVneQk.jpg',
  },
  {
    id: 10,
    title: 'Lập trình Web',
    category: 'practice',
    saved: true,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
  },
  {
    id: 11,
    title: 'Lập trình C cơ bản',
    category: 'practice',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-m%C3%B2ng-k%C3%A9t-v%C3%A0-h%E1%BB%93ng-b%C3%A1nh-donut-th%E1%BB%A9c-%C4%83n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-Zlr77mT-27w.jpg',
  },
  {
    id: 12,
    title: 'Cấu trúc dữ liệu nâng cao',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
  },
  {
    id: 13,
    title: 'Nhập môn Khoa học Máy tính',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-%C4%91%E1%BA%ADm-xanh-d%C6%B0%C6%A1ng-tr%C3%A1i-%C4%91%E1%BA%A5t-khoa-h%E1%BB%8Dc-vi%E1%BB%85n-t%C6%B0%E1%BB%9Fng-s%C3%A1ch-b%C3%ACa-5jYTmzVneQk.jpg',
  },
  {
    id: 14,
    title: 'An toàn thông tin',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
  },
  {
    id: 15,
    title: 'Cơ sở dữ liệu',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-m%C3%B2ng-k%C3%A9t-v%C3%A0-h%E1%BB%93ng-b%C3%A1nh-donut-th%E1%BB%A9c-%C4%83n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-Zlr77mT-27w.jpg',
  },
  {
    id: 16,
    title: 'Phát triển phần mềm hướng đối tượng',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
  },
  {
    id: 17,
    title: 'Lập trình React.js',
    category: 'practice',
    saved: true,
    thumbnail:
      'https://marketplace.canva.com/EAD5DP20nfc/1/0/1003w/canva-%C4%91%E1%BA%ADm-xanh-d%C6%B0%C6%A1ng-tr%C3%A1i-%C4%91%E1%BA%A5t-khoa-h%E1%BB%8Dc-vi%E1%BB%85n-t%C6%B0%E1%BB%9Fng-s%C3%A1ch-b%C3%ACa-5jYTmzVneQk.jpg',
  },
  {
    id: 18,
    title: 'Machine Learning cơ bản',
    category: 'theory',
    saved: false,
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_PTIT_University.png',
  },
  {
    id: 19,
    title: 'Data Science nhập môn',
    category: 'theory',
    saved: true,
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor9hLqMCFfrbvTMbwlXECWaNeaNKoe6OasQ&s',
  },
]

export default documents
