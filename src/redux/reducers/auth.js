import { createSlice } from '@reduxjs/toolkit'
import api from '../api/api.js'

const authSlice = createSlice({
  name: 'user',
  initialState: {
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
  },
})

export const { clearMessage } = authSlice.actions
export default authSlice.reducer
