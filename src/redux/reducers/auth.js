import { createSlice } from '@reduxjs/toolkit'
import api from '../api/api.js'

const authSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
})

export default authSlice.reducer
