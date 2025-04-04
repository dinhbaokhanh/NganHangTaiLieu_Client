import React, { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import AdminLayout from './components/layout/AdminLayout'

const Home = lazy(() => import('./pages/Home'))
const FileDetails = lazy(() => import('./pages/FileDetails'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
const Forgot = lazy(() => import('./pages/Auth/ForgotPassword'))
const Reset = lazy(() => import('./pages/Auth/ResetPassword'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          {/* Layout chính của app */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/file" element={<FileDetails />} />
          </Route>

          {/* Layout cho Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
          </Route>

          {/* Layout cho Admin */}
          <Route element={<AdminLayout />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
