import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'

const Login = lazy(() => import('../../pages/Auth/Login'))
const Register = lazy(() => import('../../pages/Auth/Register'))
const Forgot = lazy(() => import('../../pages/Auth/ForgotPassword'))
const Reset = lazy(() => import('../../pages/Auth/ResetPassword'))

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
