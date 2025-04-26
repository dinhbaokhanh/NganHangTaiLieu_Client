import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Document', 'User'],

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (formData) => ({
        url: '/user/login',
        method: 'POST',
        body: formData,
        credentials: 'include',
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
        credentials: 'include',
      }),
    }),

    getAllDocument: builder.query({
      query: () => ({
        url: '/document/',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateDocument: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/document/update/${id}`,
        method: 'PUT',
        body: updatedData,
        credentials: 'include',
      }),
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
} = api
