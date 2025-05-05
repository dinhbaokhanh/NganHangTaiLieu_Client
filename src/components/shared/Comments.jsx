import React, { useState } from 'react'

const mockComments = [
  {
    id: 1,
    user: 'Nguyễn Văn A',
    avatar: '',
    time: '2 giờ trước',
    text: 'Tài liệu này rất hữu ích, cảm ơn bạn!',
    replies: [
      {
        id: 11,
        user: 'Trần Thị B',
        avatar: '',
        time: '1 giờ trước',
        text: 'Đúng vậy, mình cũng thấy thế!',
      },
    ],
  },
  {
    id: 2,
    user: 'Lê Minh C',
    avatar: '',
    time: '3 ngày trước',
    text: 'Có ai có bản PDF chất lượng cao hơn không?',
    replies: [],
  },
]

const Comments = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(mockComments)

  const handleAddComment = () => {
    if (!comment.trim()) return

    const newComment = {
      id: Date.now(),
      user: 'Bạn',
      avatar: '',
      time: 'Vừa xong',
      text: comment,
      replies: [],
    }

    setComments([newComment, ...comments])
    setComment('')
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-red-700 mb-4">Bình luận</h3>

      {/* Nhập bình luận */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:opacity-80 transition duration-200" />
        <input
          type="text"
          placeholder="Viết bình luận..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleAddComment}
          className="p-2 bg-red-700 text-white rounded hover:cursor-pointer hover:bg-white hover:text-red-700 border border-transparent hover:border-red-700 transition duration-200"
        >
          ➤
        </button>
      </div>

      {/* Danh sách bình luận */}
      <div className="mt-6 space-y-6">
        {comments.map((cmt) => (
          <div key={cmt.id} className=" pt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  {cmt.user}
                </div>
                <div className="text-xs text-gray-500">{cmt.time}</div>
                <p className="mt-1 text-gray-700">{cmt.text}</p>
                <button className="text-sm text-red-700 mt-1 hover:underline">
                  Trả lời
                </button>

                {/* Trả lời lồng bên trong */}
                {cmt.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-4">
                    {cmt.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                        <div>
                          <div className="text-sm font-semibold text-gray-800">
                            {reply.user}
                          </div>
                          <div className="text-xs text-gray-500">
                            {reply.time}
                          </div>
                          <p className="mt-1 text-gray-700">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Comments
