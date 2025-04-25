import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }),

  tagTypes: ['User'],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: '/user/register', // Endpoint phía server
        method: 'POST', // Phương thức POST
        body: formData, // Dữ liệu gửi đi (thường là từ form)
        credentials: 'include', // Gửi cookie nếu cần (cho phiên đăng nhập)
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
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = api
