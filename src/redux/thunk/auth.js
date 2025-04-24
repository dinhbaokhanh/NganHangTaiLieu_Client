import { createAsyncThunk } from '@reduxjs/toolkit'
import { server } from '../../constants/config'
import axios from 'axios'

const registerUser = createAsyncThunk(
  'user/register', // Tên action
  async (formData, { rejectWithValue }) => {
    try {
      // Cấu hình request: gửi cookie và đặt header là JSON
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // Gửi request POST tới API để đăng ký người dùng
      const { data } = await axios.post(
        `${server}/api/user/register`, // URL của API (lấy từ biến server)
        formData, // Dữ liệu form đăng ký
        config // Cấu hình request
      )

      // Trả về message từ server nếu đăng ký thành công
      return data.message
    } catch (error) {
      // Nếu có lỗi thì trả về message lỗi thông qua rejectWithValue để xử lý tại reducer
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      )
    }
  }
)
export { registerUser }
