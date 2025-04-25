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
  return token ? children : <Navigate to="/login" /> // Nếu có token, cho phép truy cập, nếu không chuyển hướng đến trang đăng nhập
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          {/* Layout của app */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/file" element={<PrivateRoute><FileDetails /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/change" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          </Route>

          {/* Layout cho Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
          </Route>

          {/* Layout cho Admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route path="/admin/files" element={<PrivateRoute><Files /></PrivateRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
