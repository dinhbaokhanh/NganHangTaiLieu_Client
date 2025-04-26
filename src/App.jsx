import React, { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'

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

// Component bảo vệ route yêu cầu đăng nhập
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token') // Lấy token từ localStorage
  return token ? children : <Navigate to="/login" replace /> // Nếu chưa đăng nhập, chuyển hướng đến Login
}

// Component bảo vệ route admin
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  const role = localStorage.getItem('role'); // Lấy vai trò từ localStorage (hoặc từ token)

  if (!token) {
    return <Navigate to="/login" replace />; // Nếu chưa đăng nhập, chuyển hướng đến Login
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />; // Nếu không phải admin, chuyển hướng đến Home
  }

  return children; // Nếu là admin, cho phép truy cập
};

// Component bảo vệ route chỉ dành cho khách (người chưa đăng nhập)
const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token') // Lấy token từ localStorage

  if (token) {
    return <Navigate to="/" replace /> // Nếu đã đăng nhập, chuyển hướng đến Home
  }

  return children // Nếu chưa đăng nhập, cho phép truy cập
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          {/* Layout của app */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />{' '}
            {/* Trang Home không yêu cầu đăng nhập */}
            <Route path="/file" element={<FileDetails />} />{' '}
            {/* Trang FileDetails không yêu cầu đăng nhập */}
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

          {/* Layout cho Auth */}
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

          {/* Layout cho Admin */}
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/files"
              element={
                <AdminRoute>
                  <Files />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
