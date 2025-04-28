import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

// Base query gốc
const baseQuery = fetchBaseQuery({
  baseUrl: `${server}/api/`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Base query với khả năng tự refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/user/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult?.data?.accessToken) {
      localStorage.setItem('token', refreshResult.data.accessToken)
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
  tagTypes: ['Document', 'User', 'Subject'],

  endpoints: (builder) => ({
    // --- USER ---
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

    // --- DOCUMENT ---
    // --- DOCUMENT ---
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
        url: `/document/${id}`, // PUT /document/:id
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
    replaceDocument: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: `/document/replace/${id}`, // PUT /document/replace/:id
          method: 'PUT',
          body: formData,
        }
      },
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/document/${id}`, // DELETE /document/:id
        method: 'DELETE',
      }),
    }),

    // --- SUBJECT ---
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: '/subject/create',
        method: 'POST',
        body: subjectData,
      }),
    }),
    getAllSubjects: builder.query({
      query: () => ({
        url: '/subject',
        method: 'GET',
      }),
    }),
    getSubjectById: builder.query({
      query: (id) => ({
        url: `/subject/${id}`,
        method: 'GET',
      }),
    }),
    updateSubjectById: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/subject/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),
    deleteSubjectById: builder.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export default api

export const {
  // User
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  // Document
  useUploadDocumentMutation,
  useGetAllDocumentQuery,
  useUpdateDocumentMutation,
  useAddUserMutation, // Export hook để gọi API addUser
  useGetAllUsersQuery, // Export hook để gọi API getAllUsers
  useUpdateUserStatusMutation, // Export hook để gọi API updateUserStatus
  useReplaceDocumentMutation,
  useDeleteDocumentMutation,

  // Subject
  useCreateSubjectMutation,
  useGetAllSubjectsQuery,
  useGetSubjectByIdQuery,
  useUpdateSubjectByIdMutation,
  useDeleteSubjectByIdMutation,
} = api
