import { createAsyncThunk } from '@reduxjs/toolkit'
import { server } from '../../constants/config'
import axios from 'axios'

const registerUser = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${server}/api/user/register`,
        formData,
        config
      )

      return data.message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      )
    }
  }
)

export { registerUser }
