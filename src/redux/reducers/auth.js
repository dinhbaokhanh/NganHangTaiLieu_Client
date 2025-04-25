import { createSlice } from '@reduxjs/toolkit'
import api from '../api/api.js'

const authSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null, // Lưu thông tin người dùng sau khi đăng ký/thành công
    token: null, // Lưu token sau khi đăng nhập
    userInfo: null,
    isLoading: false,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null
    },
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addMatcher(api.endpoints.registerUser.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(
        api.endpoints.registerUser.matchFulfilled,
        (state, action) => {
          state.userInfo = action.payload
          state.isLoading = false
        }
      )

      .addMatcher(api.endpoints.registerUser.matchRejected, (state) => {
        state.isLoading = false
      })

      // Forgot Password
      .addMatcher(api.endpoints.forgotPassword.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(
        api.endpoints.forgotPassword.matchFulfilled,
        (state, action) => {
          state.message = action.payload?.message || 'Reset link sent!'
          state.isLoading = false
        }
      )
      .addMatcher(api.endpoints.forgotPassword.matchRejected, (state) => {
        state.isLoading = false
      })

      // Reset Password
      .addMatcher(api.endpoints.resetPassword.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(
        api.endpoints.resetPassword.matchFulfilled,
        (state, action) => {
          state.message =
            action.payload?.message || 'Password reset successfully!'
          state.isLoading = false
        }
      )
      .addMatcher(api.endpoints.resetPassword.matchRejected, (state) => {
        state.isLoading = false
      })

      // Khi đang gửi request đăng nhập (pending)
      .addMatcher(api.endpoints.loginUser.matchPending, (state) => {
        state.isLoading = true // Bật trạng thái loading
      })

      // Khi request đăng nhập thành công (fulfilled)
      .addMatcher(
        api.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.userInfo = action.payload.user // Lưu thông tin người dùng trả về từ server
          state.token = action.payload.token // Lưu token trả về từ server
          state.isLoading = false // Tắt trạng thái loading
        }
      )

      // Khi request đăng nhập thất bại (rejected)
      .addMatcher(api.endpoints.loginUser.matchRejected, (state) => {
        state.isLoading = false // Tắt trạng thái loading
      })
  },
})

export const { clearMessage } = authSlice.actions
export default authSlice.reducer
