import { createSlice } from '@reduxjs/toolkit'
import api from '../api/api.js'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.userInfo = action.payload.userInfo
      state.isAuthenticated = true
    },
    loadUserFromStorage: (state, action) => {
      state.token = action.payload.token
      state.userInfo = action.payload.userInfo
      state.isAuthenticated = true
    },
    setInitialized: (state) => {
      state.isInitialized = true
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.loginUser.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state, action) => {
        const { id, role } = action.payload.user
        state.userInfo = { id, role }
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addMatcher(api.endpoints.loginUser.matchRejected, (state) => {
        state.isLoading = false
      })
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

export const {
  clearMessage,
  logout,
  loginSuccess,
  loadUserFromStorage,
  setInitialized,
} = authSlice.actions
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectIsInitialized = (state) => state.auth.isInitialized
export default authSlice.reducer
