import React from 'react';
import { BsTextParagraph } from 'react-icons/bs'; 
import { toast } from 'react-hot-toast';

const SummaryModal = ({ isOpen, onClose, summaryData, documentTitle }) => {
  if (!isOpen || !summaryData) return null;

  const { summary, keywords, model } = summaryData;

  const copyToClipboard = () => {
    const textToCopy = `Tóm tắt: ${documentTitle || summaryData.documentTitle}\n\nNội dung: ${summary}\n\nTừ khóa: ${keywords ? keywords.join(', ') : 'Không có'}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Đã sao chép tóm tắt vào clipboard!');
      })
      .catch(err => {
        toast.error('Không thể sao chép vào clipboard.');
        console.error('Lỗi sao chép:', err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2">
            <BsTextParagraph className="text-red-600" />
            Tóm tắt: {documentTitle || summaryData.documentTitle || 'Tài liệu'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 cursor-pointer text-2xl"
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Tóm tắt nội dung:</h4>
          <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-line text-sm leading-relaxed">
            {summary || 'Không có nội dung tóm tắt.'}
          </div>
        </div>
        
        {keywords && keywords.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Từ khóa chính:</h4>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500 self-start sm:self-center">
            {model ? `Được tạo bởi: ${model.split('/').pop()}` : ''}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={copyToClipboard}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center justify-center gap-2  cursor-pointer text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Sao chép
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-white hover:text-red-600 border hover:border-red-600 transition text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;