import React from 'react';
import { X } from 'lucide-react'; // Import icon dấu "X" để đóng modal

const SuggestModal = ({ isOpen, onClose, title, description, onLogin, onRegister }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30"
      onClick={onClose} // Đóng modal khi bấm ra ngoài
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Ngăn sự kiện đóng modal khi bấm vào bên trong modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Title */}
        {title && (
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-center mb-6">
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onLogin}
            className="w-full bg-red-500 text-white py-3 rounded-md cursor-pointer hover:bg-red-600 transition text-lg font-medium"
          >
            Đăng nhập
          </button>
          <button
            onClick={onRegister}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-md cursor-pointer hover:bg-gray-300 transition text-lg font-medium"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestModal;