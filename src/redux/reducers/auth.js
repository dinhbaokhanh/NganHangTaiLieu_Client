import { createSlice } from '@reduxjs/toolkit'
import api from '../api/api.js'

// Tạo Redux slice để quản lý trạng thái xác thực người dùng (auth)
const authSlice = createSlice({
  name: 'user', // Tên slice
  initialState: {
    userInfo: null, // Lưu thông tin người dùng sau khi đăng ký/thành công
    token: null, // Lưu token sau khi đăng nhập
    isLoading: false, // Trạng thái loading khi đang xử lý request
  },
  reducers: {}, // Hiện tại không có reducer thông thường

  // Xử lý các action async từ API (sử dụng với RTK Query hoặc createAsyncThunk)
  extraReducers: (builder) => {
    builder
      // Khi đang gửi request đăng ký (pending)
      .addMatcher(api.endpoints.registerUser.matchPending, (state) => {
        state.isLoading = true // Bật trạng thái loading
      })

      // Khi request đăng ký thành công (fulfilled)
      .addMatcher(
        api.endpoints.registerUser.matchFulfilled,
        (state, action) => {
          state.userInfo = action.payload // Lưu thông tin người dùng trả về từ server
          state.isLoading = false // Tắt trạng thái loading
        }
      )

      // Khi request đăng ký thất bại (rejected)
      .addMatcher(api.endpoints.registerUser.matchRejected, (state) => {
        state.isLoading = false // Tắt trạng thái loading (nhưng không thay đổi userInfo)
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

export default authSlice.reducer // Export reducer để sử dụng trong store
