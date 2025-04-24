import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api', // Tên reducer slice trong Redux store
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }), // Base URL cho các API endpoint

  tagTypes: ['User'], // Tag dùng để quản lý cache (tự động refetch khi cần)

  endpoints: (builder) => ({
    // Endpoint để gọi API đăng ký người dùng
    registerUser: builder.mutation({
      query: (formData) => ({
        url: '/user/register', // Endpoint phía server
        method: 'POST', // Phương thức POST
        body: formData, // Dữ liệu gửi đi (thường là từ form)
        credentials: 'include', // Gửi cookie nếu cần (cho phiên đăng nhập)
      }),
    }),
  }),
})

export default api

export const { useRegisterUserMutation } = api // Export custom hook để gọi mutation từ component React
