import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

// Tạo baseQuery gốc
const baseQuery = fetchBaseQuery({
  baseUrl: `${server}/api/`,
  credentials: 'include', // QUAN TRỌNG: để cookie gửi kèm
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Tạo baseQuery mới có khả năng tự refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Token hết hạn, gọi API refresh
    const refreshResult = await baseQuery(
      { url: '/user/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult?.data?.accessToken) {
      // Cập nhật token mới vào localStorage
      localStorage.setItem('token', refreshResult.data.accessToken)

      // Retry lại request cũ với token mới
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.error('Refresh token failed')
    }
  }

  return result
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Document', 'User'], // Định nghĩa tag 'User'

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (formData) => ({
        url: '/user/login',
        method: 'POST',
        body: formData,
      }),
    }),

    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ id, token, password, confirmPassword }) => ({
        url: `/user/reset-password/${id}/${token}`,
        method: 'POST',
        body: { password, confirmPassword },
      }),
    }),

    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: '/document/upload',
        method: 'POST',
        body: formData,
      }),
    }),

    getAllDocument: builder.query({
      query: () => ({
        url: '/document/',
        method: 'GET',
      }),
    }),

    updateDocument: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/document/update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    // Sửa lại API addUser với endpoint mới
    addUser: builder.mutation({
      query: (formData) => ({
        url: '/user/add', // Endpoint mới
        method: 'POST',
        body: formData,
      }),
    }),

    // Bổ sung API getAllUsers
    getAllUsers: builder.query({
      query: () => ({
        url: '/user/',
        method: 'GET',
      }),
      providesTags: ['User'], // Thêm providesTags để liên kết với tag 'User'
    }),

    // Bổ sung API updateUserStatus
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/${id}/status`, // Endpoint cập nhật trạng thái
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['User'], // Làm mới dữ liệu liên quan đến User
    }),
  }),
})

export default api

export const {
  useForgotPasswordMutation,
  useLoginUserMutation,
  useResetPasswordMutation,
  useUploadDocumentMutation,
  useGetAllDocumentQuery,
  useUpdateDocumentMutation,
  useAddUserMutation, // Export hook để gọi API addUser
  useGetAllUsersQuery, // Export hook để gọi API getAllUsers
  useUpdateUserStatusMutation, // Export hook để gọi API updateUserStatus
} = api
