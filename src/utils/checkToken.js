import { logout } from '../redux/reducers/auth'
import { jwtDecode } from 'jwt-decode'

// Hàm kiểm tra token hết hạn
export const checkTokenExpiration = (token) => {
  try {
    const decoded = jwtDecode(token)
    return decoded.exp * 1000 < Date.now()
  } catch (e) {
    return true // lỗi decode => token hỏng => hết hạn
  }
}

export const refreshTokenIfNeeded = async (dispatch, getState) => {
  const token = getState().auth?.token

  if (!token) {
    dispatch(logout())
    return
  }

  const isExpired = checkTokenExpiration(token)
  if (isExpired) {
    console.warn(
      'Token đã hết hạn. Đợi request tự động làm mới từ baseQueryWithReauth.'
    )
  } else {
    console.log('Token hợp lệ, tiếp tục sử dụng...')
  }
}
