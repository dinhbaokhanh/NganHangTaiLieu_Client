import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'

import {
  useGetReviewsByDocumentQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useAddReplyMutation,
  useDeleteReplyMutation,
  useGetUserProfileQuery,
} from '../../redux/api/api'
import { useErrors, useAsyncMutationWithUnwrap } from '../../hooks/hook'

// ------------------------ Helpers ------------------------
const formatTime = (timestamp) => {
  if (!timestamp) return 'Vừa xong'
  const date = new Date(timestamp)
  const now = new Date()
  const diffMins = Math.floor((now - date) / (1000 * 60))

  if (diffMins < 1) return 'Vừa xong'
  if (diffMins < 60) return `${diffMins} phút trước`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} giờ trước`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays} ngày trước`
  return format(date, 'dd/MM/yyyy HH:mm', { locale: vi })
}

const Avatar = ({ avatar, name }) => (
  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
    {avatar ? (
      <img src={avatar} alt={name} className="w-full h-full object-cover" />
    ) : (
      name?.charAt(0)?.toUpperCase() || '?'
    )}
  </div>
)

const ReplyForm = ({ onSubmit, onCancel, value, onChange, avatar, name }) => (
  <div className="mt-3 flex items-start gap-2">
    <Avatar avatar={avatar} name={name} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Viết phản hồi..."
      className="flex-1 p-2 text-sm border rounded"
    />
    <button
      onClick={onSubmit}
      className="px-3 py-1 bg-red-700 text-white text-sm rounded hover:bg-white hover:text-red-700 border border-transparent hover:border-red-700"
    >
      Gửi
    </button>
    {onCancel && (
      <button
        onClick={onCancel}
        className="text-sm text-gray-500 hover:underline"
      >
        Hủy
      </button>
    )}
  </div>
)

const ReplyList = ({ replies, reviewId, userId, onReply, onDelete }) => (
  <div className="ml-6 mt-4 space-y-4">
    {replies.map((reply) => (
      <div key={reply._id} className="flex gap-3">
        <Avatar
          avatar={reply.userId?.avatar?.url}
          name={reply.userId?.username}
        />
        <div className="flex-1">
          <div className="text-sm font-semibold">{reply.userId?.username}</div>
          <div className="text-xs text-gray-500">
            {formatTime(reply.createdAt)}
          </div>
          <p className="mt-1">{reply.reply}</p>
          <div className="flex gap-3 mt-1">
            <button
              className="text-xs text-red-700 hover:underline"
              onClick={() => onReply(reviewId, reply._id)}
            >
              Trả lời
            </button>
            {userId === reply.userId?._id && (
              <button
                className="text-xs text-gray-500 hover:underline"
                onClick={() => onDelete(reviewId, reply._id)}
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)

//   review,
//   userId,
//   user,
//   activeReply,
//   replyText,
//   setReplyText,
//   onReplyClick,
//   onReplySubmit,
//   onReviewDelete,
//   onReplyDelete,
// }) => (
//   <div className="pt-4">
//     <div className="flex items-start gap-3">
//       <Avatar
//         avatar={review.userId?.avatar?.url}
//         name={review.userId?.username}
//       />
//       <div className="flex-1">
//         <div className="text-sm font-semibold">{review.userId?.username}</div>
//         <div className="text-xs text-gray-500">
//           {formatTime(review.createdAt)}
//         </div>
//         <p className="mt-1 text-gray-700">{review.comment}</p>

//         <div className="flex gap-3 mt-1">
//           <button
//             className="text-sm text-red-700 hover:underline"
//             onClick={() => onReplyClick(review._id)}
//           >
//             {activeReply?.reviewId === review._id ? 'Hủy' : 'Trả lời'}
//           </button>
//           {userId === review.userId?._id && (
//             <button
//               className="text-sm text-gray-500 hover:underline"
//               onClick={() => onReviewDelete(review._id)}
//             >
//               Xóa
//             </button>
//           )}
//         </div>

//         {activeReply?.reviewId === review._id &&
//           activeReply?.replyId === null && (
//             <ReplyForm
//               value={replyText}
//               onChange={setReplyText}
//               onSubmit={() => onReplySubmit(review._id)}
//               onCancel={() => onReplyClick(null)}
//               avatar={user?.avatar?.url}
//               name={user?.username}
//             />
//           )}

//         <ReplyList
//           replies={review.replies || []}
//           reviewId={review._id}
//           userId={userId}
//           onReply={onReplyClick}
//           onDelete={onReplyDelete}
//         />
//       </div>
//     </div>
//   </div>
// )

// ------------------------ Main Component ------------------------
const Comments = ({ documentId }) => {
  const [comment, setComment] = useState('')
  const [replyText, setReplyText] = useState('')
  const [activeReply, setActiveReply] = useState(null)
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?.id

  const { data: userProfile } = useGetUserProfileQuery(userId)
  const user = userProfile?.user

  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
    refetch, // Thêm refetch để gọi lại dữ liệu khi cần
  } = useGetReviewsByDocumentQuery(documentId, { skip: !documentId })

  const [addReview, isAddingReview] =
    useAsyncMutationWithUnwrap(useAddReviewMutation)
  const [deleteReview] = useAsyncMutationWithUnwrap(useDeleteReviewMutation)
  const [addReply] = useAsyncMutationWithUnwrap(useAddReplyMutation)
  const [deleteReply] = useAsyncMutationWithUnwrap(useDeleteReplyMutation)

  useErrors([
    {
      isError,
      error,
      fallback: () => toast.error('Không thể tải bình luận'),
    },
  ])

  const reviews = reviewsData?.reviews || []

  const handleAddComment = async () => {
    if (!comment.trim() || !userId) return
    await addReview({ documentId, comment, userId })
    setComment('')

    // Sau khi thêm bình luận, gọi lại dữ liệu để cập nhật ngay
    refetch()
  }

  const handleReplyClick = (reviewId, replyId = null, replyUsername = '') => {
    if (
      activeReply?.reviewId === reviewId &&
      activeReply?.replyId === replyId
    ) {
      setActiveReply(null)
      setReplyText('')
    } else {
      setActiveReply({ reviewId, replyId })
      setReplyText(replyUsername ? `@${replyUsername} ` : '') // Thêm @username
    }
  }

  const handleReplySubmit = async (reviewId) => {
    if (!replyText.trim() || !userId) return

    if (activeReply?.replyId === null) {
      // Reply to the review
      await addReply('Đang thêm phản hồi...', {
        reviewId,
        body: {
          documentId,
          reply: replyText,
          userId,
          parentReplyId: null,
        },
      })
    } else {
      // Reply to a reply
      await addReply('Đang thêm phản hồi...', {
        reviewId,
        body: {
          documentId,
          reply: replyText,
          userId,
          parentReplyId: activeReply?.replyId,
        },
      })
    }

    setReplyText('')
    setActiveReply(null)

    // Sau khi thêm phản hồi, gọi lại dữ liệu để cập nhật ngay
    refetch()
  }

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      await deleteReview({ documentId, reviewId })

      // Sau khi xóa bình luận, gọi lại dữ liệu để cập nhật ngay
      refetch()
    }
  }

  const handleReplyDelete = async (reviewId, replyId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      await deleteReply({ documentId, reviewId, replyId })

      // Sau khi xóa phản hồi, gọi lại dữ liệu để cập nhật ngay
      refetch()
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-red-700 mb-4">Bình luận</h3>

      {userInfo ? (
        <div className="flex items-center gap-4 mb-4">
          <Avatar avatar={user?.avatar?.url} name={user?.username} />
          <input
            type="text"
            placeholder="Viết bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleAddComment}
            disabled={isAddingReview}
            className="p-2 bg-red-700 text-white rounded hover:bg-white hover:text-red-700 border hover:border-red-700"
          >
            {isAddingReview ? '...' : '➤'}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          Vui lòng{' '}
          <span
            className="text-red-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            đăng nhập
          </span>{' '}
          để bình luận
        </div>
      )}

      <div className="mt-6 space-y-6">
        {isLoading ? (
          <div className="text-center py-4">Đang tải bình luận...</div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="pt-4">
              <div className="flex items-start gap-3">
                <Avatar
                  avatar={review.userId?.avatar?.url}
                  name={review.userId?.username}
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    {review.userId?.username}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(review.createdAt)}
                  </div>
                  <p className="mt-1 text-gray-700">{review.comment}</p>

                  <div className="flex gap-3 mt-1">
                    <button
                      className="text-sm text-red-700 hover:underline"
                      onClick={() => handleReplyClick(review._id, null)}
                    >
                      {activeReply?.reviewId === review._id &&
                      activeReply?.replyId === null
                        ? 'Hủy'
                        : 'Trả lời'}
                    </button>
                    {userId === review.userId?._id && (
                      <button
                        className="text-sm text-gray-500 hover:underline"
                        onClick={() => handleReviewDelete(review._id)}
                      >
                        Xóa
                      </button>
                    )}
                  </div>

                  {activeReply?.reviewId === review._id &&
                    activeReply?.replyId === null && (
                      <ReplyForm
                        value={replyText}
                        onChange={setReplyText}
                        onSubmit={() => handleReplySubmit(review._id)}
                        onCancel={() => handleReplyClick(null)}
                        avatar={user?.avatar?.url}
                        name={user?.username}
                      />
                    )}

                  {review.replies && review.replies.length > 0 && (
                    <div className="ml-6 mt-4 space-y-4">
                      {review.replies.map((reply) => (
                        <div key={reply._id} className="flex gap-3">
                          <Avatar
                            avatar={reply.userId?.avatar?.url}
                            name={reply.userId?.username}
                          />
                          <div className="flex-1">
                            <div className="text-sm font-semibold">
                              {reply.userId?.username}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(reply.createdAt)}
                            </div>
                            <p className="mt-1">{reply.reply}</p>
                            <div className="flex gap-3 mt-1">
                              <button
                                className="text-xs text-red-700 hover:underline"
                                onClick={() =>
                                  handleReplyClick(
                                    review._id,
                                    reply._id,
                                    reply.userId?.username
                                  )
                                } // Truyền username của người trả lời
                              >
                                Trả lời
                              </button>
                              {userId === reply.userId?._id && (
                                <button
                                  className="text-xs text-gray-500 hover:underline"
                                  onClick={() =>
                                    handleReplyDelete(review._id, reply._id)
                                  }
                                >
                                  Xóa
                                </button>
                              )}
                            </div>

                            {activeReply?.reviewId === review._id &&
                              activeReply?.replyId === reply._id && (
                                <ReplyForm
                                  value={replyText}
                                  onChange={setReplyText}
                                  onSubmit={() => handleReplySubmit(review._id)}
                                  onCancel={() => handleReplyClick(null, null)}
                                  avatar={user?.avatar?.url}
                                  name={user?.username}
                                />
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
