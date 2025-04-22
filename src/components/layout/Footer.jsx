import React from 'react'
import { FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-red-900 text-gray-300 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Bản quyền */}
        <p className="text-sm font-semibold text-center md:text-left mb-4 md:mb-0">
          © 2025 PTIT Documents. All rights reserved.
        </p>

        {/* Mạng xã hội */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-200"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="mailto:example@gmail.com"
            className="hover:text-white transition duration-200"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer