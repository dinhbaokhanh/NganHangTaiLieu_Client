import { jwtDecode } from 'jwt-decode'
import api from '../redux/api/api.js'
import { loginSuccess, logout } from '../redux/reducers/auth.js'

export const checkTokenExpiration = (token) => {
  if (!token) return true

  try {
    const decoded = jwtDecode(token)
    const exp = decoded.exp * 1000 // Chuyển đổi thời gian hết hạn sang ms
    const now = Date.now()
    return now > exp
  } catch (error) {
    console.error('Error decoding token:', error)
    return true // Nếu token không hợp lệ, cho rằng token đã hết hạn
  }
}

export const refreshTokenIfNeeded = async (dispatch, getState) => {
  // Get token from state if getState is provided, otherwise from localStorage
  let token
  if (getState) {
    token = getState().auth?.token
  } else {
    token = localStorage.getItem('token')
  }

  if (!token) {
    dispatch(logout()) // Không có token thì logout
    return
  }

  const isExpired = checkTokenExpiration(token)
  if (isExpired) {
    try {
      const response = await api.endpoints.refreshToken.initiate()(
        dispatch,
        getState
      )

      if (response?.data?.token) {
        const newToken = response.data.token
        localStorage.setItem('token', newToken)

        const decoded = jwtDecode(newToken)
        const userInfo = {
          id: decoded._id,
          role: decoded.role,
        }

        dispatch(loginSuccess({ token: newToken, userInfo }))
        console.log('Token refreshed successfully, user role:', userInfo.role)
      } else {
        throw new Error('No token returned from refresh API')
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
      dispatch(logout())
    }
  }
}
