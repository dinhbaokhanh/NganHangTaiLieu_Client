import React, { lazy, Suspense, useEffect } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import Subjects from './pages/Admin/Subjects'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { checkTokenExpiration, refreshTokenIfNeeded } from './utils/checkToken'
import { loadUserFromStorage, setInitialized } from './redux/reducers/auth'
import Main from './pages/Main'

const Home = lazy(() => import('./pages/Home'))
const FileDetails = lazy(() => import('./pages/FileDetails'))
const Profile = lazy(() => import('./pages/Profile'))
const ChangePassword = lazy(() => import('./pages/Auth/ChangePassword'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
const Forgot = lazy(() => import('./pages/Auth/ForgotPassword'))
const Reset = lazy(() => import('./pages/Auth/ResetPassword'))
const Users = lazy(() => import('./pages/Admin/Users'))
const Files = lazy(() => import('./pages/Admin/Files'))

const PrivateRoute = ({ children }) => {
  const { token, isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  )
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }
  return token ? children : <Navigate to="/login" replace />
}

// Component bảo vệ route admin
const AdminRoute = ({ children }) => {
  const { token, userInfo, isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  )

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!token || userInfo?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

// Component bảo vệ route chỉ dành cho khách (người chưa đăng nhập)
const GuestRoute = ({ children }) => {
  const { token, isInitialized } = useSelector((state) => state.auth)

  if (token) {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')

    const initialize = async () => {
      if (token) {
        try {
          const isExpired = checkTokenExpiration(token)
          if (!isExpired) {
            const decoded = jwtDecode(token)
            const userInfo = { id: decoded._id, role: decoded.role }
            dispatch(loadUserFromStorage({ token, userInfo }))
          } else {
            await refreshTokenIfNeeded(dispatch)
          }
        } catch (error) {
          console.error('Error processing token:', error)
          localStorage.removeItem('token')
        }
      }
      dispatch(setInitialized())
    }

    initialize()

    // === Thêm interval để kiểm tra token định kỳ
    const intervalId = setInterval(() => {
      const currentToken = localStorage.getItem('token')
      if (currentToken) {
        const isExpired = checkTokenExpiration(currentToken)
        if (isExpired) {
          refreshTokenIfNeeded(dispatch)
        }
      }
    }, 5 * 60 * 1000) // kiểm tra mỗi 5 phút

    return () => clearInterval(intervalId) // clear interval khi unmount
  }, [dispatch])

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/main" element={<Home />} />
            <Route path="/" element={<Main />} />
            <Route path="/file" element={<FileDetails />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/change"
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/forgot"
              element={
                <GuestRoute>
                  <Forgot />
                </GuestRoute>
              }
            />
            <Route path="/reset-password/:id/:token" element={<Reset />} />
          </Route>

          {/* Add direct route to admin dashboard for testing */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/files" element={<Files />} />
            <Route path="/admin/subjects" element={<Subjects />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
