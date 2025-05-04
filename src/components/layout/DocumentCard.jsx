import { useEffect, useState } from 'react'
import defaultFileImg from '../../assets/doc_image_default.png'

const DocumentCard = ({ doc }) => {
  const [thumbnail, setThumbnail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="relative border rounded-lg p-2 shadow-md">
      {isLoading ? (
        <div className="w-full h-40 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <img
          src={thumbnail || defaultFileImg}
          alt={doc.title}
          className="w-full h-40 object-cover rounded-md"
        />
      )}
      <p className="flex items-center justify-center text-center font-medium mt-2 h-10">
        {doc.title}
      </p>
    </div>
  )
}

export default DocumentCard
