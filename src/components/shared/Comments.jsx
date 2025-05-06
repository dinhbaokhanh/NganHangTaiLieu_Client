import React, { useState } from 'react'
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
} from '../../redux/api/api.js'
import { useErrors, useAsyncMutationWithUnwrap } from '../../hooks/hook.js'

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

// Build tree from flat replies
const buildReplyTree = (flatReplies) => {
  const map = {}
  flatReplies.forEach((r) => {
    map[r._id] = { ...r, replies: [] }
  })
  const roots = []
  flatReplies.forEach((r) => {
    if (r.parentReplyId) {
      map[r.parentReplyId]?.replies.push(map[r._id])
    } else {
      roots.push(map[r._id])
    }
  })
  return roots
}

// Recursive component to render nested replies
const ReplyNode = ({ node, reviewId, level, handlers, state }) => {
  const { onReplyClick, onReplySubmit, onReplyDelete } = handlers
  const { activeReply, replyText, setReplyText, user, userId } = state

  return (
    <div className={`ml-${level * 6} mt-4`}>
      <div className="flex gap-3">
        <Avatar avatar={node.userId.avatar?.url} name={node.userId.username} />
        <div className="flex-1">
          <div className="text-sm font-semibold">{node.userId.username}</div>
          <div className="text-xs text-gray-500">
            {formatTime(node.createdAt)}
          </div>
          <p className="mt-1">{node.reply}</p>
          <div className="flex gap-3 mt-1">
            <button
              className="text-xs text-red-700 hover:underline"
              onClick={() => onReplyClick(reviewId, node._id)}
            >
              {activeReply?.reviewId === reviewId &&
              activeReply?.replyId === node._id
                ? 'Hủy'
                : 'Trả lời'}
            </button>
            {userId === node.userId._id && (
              <button
                className="text-xs text-gray-500 hover:underline"
                onClick={() => onReplyDelete(reviewId, node._id)}
              >
                Xóa
              </button>
            )}
          </div>
          {activeReply?.reviewId === reviewId &&
            activeReply?.replyId === node._id && (
              <div className="mt-3 flex items-start gap-2">
                <Avatar avatar={user?.avatar?.url} name={user?.username} />
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Viết phản hồi..."
                  className="flex-1 p-2 text-sm border rounded"
                />
                <button
                  onClick={() => onReplySubmit(reviewId)}
                  className="px-3 py-1 bg-red-700 text-white text-sm rounded hover:bg-white hover:text-red-700 border border-transparent hover:border-red-700"
                >
                  Gửi
                </button>
                <button
                  onClick={() => onReplyClick(null, null)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Hủy
                </button>
              </div>
            )}
          {node.replies.map((child) => (
            <ReplyNode
              key={child._id}
              node={child}
              reviewId={reviewId}
              level={level + 1}
              handlers={handlers}
              state={state}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

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
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
    error: errorReviews,
    refetch,
  } = useGetReviewsByDocumentQuery(documentId, { skip: !documentId })

  useErrors([
    {
      isError: isErrorReviews,
      error: errorReviews,
      fallback: () => toast.error('Không thể tải bình luận'),
    },
  ])

  const [addReview, isAddingReview] =
    useAsyncMutationWithUnwrap(useAddReviewMutation)
  const [deleteReview] = useAsyncMutationWithUnwrap(useDeleteReviewMutation)
  const [addReply] = useAsyncMutationWithUnwrap(useAddReplyMutation)
  const [deleteReply] = useAsyncMutationWithUnwrap(useDeleteReplyMutation)

  const reviews = reviewsData?.reviews || []

  const handleAddComment = async () => {
    if (!comment.trim()) return
    const result = await addReview('Đang thêm bình luận...', {
      documentId,
      comment,
      userId, // Added userId to match backend expectation
    })
    if (result.success) {
      setComment('')
      refetch()
    }
  }

  const handleReplyClick = (reviewId, replyId = null) => {
    if (
      activeReply?.reviewId === reviewId &&
      activeReply?.replyId === replyId
    ) {
      setActiveReply(null)
      setReplyText('')
    } else {
      setActiveReply({ reviewId, replyId })
      setReplyText('')
    }
  }

  const handleReplySubmit = async (reviewId) => {
    if (!replyText.trim()) return
    const body = {
      reply: replyText,
      parentReplyId: activeReply?.replyId || null,
      userId, // Added userId to match backend expectation
    }
    const result = await addReply('Đang thêm phản hồi...', { reviewId, body })
    if (result.success) {
      setReplyText('')
      setActiveReply(null)
      refetch()
    }
  }

  const handleReviewDelete = async (reviewId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return
    const result = await deleteReview('Đang xóa bình luận...', {
      reviewId,
      userId, // Added userId to match backend expectation
    })
    if (result.success) refetch()
  }

  const handleReplyDelete = async (reviewId, replyId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return
    const result = await deleteReply('Đang xóa phản hồi...', {
      reviewId,
      replyId,
      userId, // Added userId to match backend expectation
    })
    if (result.success) refetch()
  }

  // Prepare handlers & state for reply tree
  const handlers = {
    onReplyClick: handleReplyClick,
    onReplySubmit: handleReplySubmit,
    onReplyDelete: handleReplyDelete,
  }
  const state = { activeReply, replyText, setReplyText, user, userId }

  return (
    <div>
      <h3 className="text-lg font-semibold text-red-700 mb-4">Bình luận</h3>

      {user ? (
        <div className="flex items-center gap-4 mb-4">
          <Avatar avatar={user.avatar?.url} name={user.username} />
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
        {isLoadingReviews ? (
          <div className="text-center py-4">Đang tải bình luận...</div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => {
            const tree = buildReplyTree(review.replies)
            return (
              <div key={review._id} className="pt-4">
                <div className="flex items-start gap-3">
                  <Avatar
                    avatar={review.userId.avatar?.url}
                    name={review.userId.username}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {review.userId.username}
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
                      {userId === review.userId._id && (
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
                        <div className="mt-3 flex items-start gap-2">
                          <Avatar
                            avatar={user?.avatar?.url}
                            name={user?.username}
                          />
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Viết phản hồi..."
                            className="flex-1 p-2 text-sm border rounded"
                          />
                          <button
                            onClick={() => handleReplySubmit(review._id)}
                            className="px-3 py-1 bg-red-700 text-white text-sm rounded hover:bg-white hover:text-red-700 border border-transparent hover:border-red-700"
                          >
                            Gửi
                          </button>
                          <button
                            onClick={() => handleReplyClick(null, null)}
                            className="text-sm text-gray-500 hover:underline"
                          >
                            Hủy
                          </button>
                        </div>
                      )}

                    {tree.map((root) => (
                      <ReplyNode
                        key={root._id}
                        node={root}
                        reviewId={review._id}
                        level={1}
                        handlers={handlers}
                        state={state}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })
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
