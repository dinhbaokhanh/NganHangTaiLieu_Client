import React, { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          {/* Layout của app */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/file" element={<FileDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change" element={<ChangePassword />} />
          </Route>

          {/* Layout cho Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset-password/:id/:token" element={<Reset />} />
          </Route>

          {/* Layout cho Admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/files" element={<Files />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
