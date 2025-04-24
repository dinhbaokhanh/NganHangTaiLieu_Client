import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config.js'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }),
  tagTypes: ['User'],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: '/user/register',
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
  }),
})

export default api

export const { useRegisterUserMutation } = api
