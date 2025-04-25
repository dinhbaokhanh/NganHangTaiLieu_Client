import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }),
  tagTypes: ['User'],

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
  }),
})

export default api

export const {
  useForgotPasswordMutation,
  useLoginUserMutation,
  useResetPasswordMutation,
} = api
