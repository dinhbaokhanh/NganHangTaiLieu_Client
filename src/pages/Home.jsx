/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import DocumentTabs from '../components/layout/DocumentTabs'
import documents from '../data/sampleDocuments'
import defaultFileImg from '../assets/doc_image_default.png'

const Home = () => {
  const [activeTab, setActiveTab] = useState('theory')
  const filteredDocs = documents.filter((doc) =>
    activeTab === 'saved' ? doc.saved : doc.category === activeTab
  )

  return (
    <div className="container mx-auto p-4">
      <DocumentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-4 p-4 rounded-lg bg-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="relative border rounded-lg p-2 shadow-md"
            >
              <img
                src={doc.thumbnail || defaultFileImg}
                alt={doc.title}
                className="w-full h-45 object-cover rounded-md"
              />
              <p className="flex items-center justify-center text-center font-medium mt-2 h-10">
                {doc.title}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có tài liệu nào.</p>
        )}
      </div>
    </div>
  )
}

export default AppLayout(Home)
