import React, { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const FileDetails = lazy(() => import('./pages/FileDetails'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route>
            {/* App Route */}
            <Route path="/" element={<Home />} />
            <Route path="/file" element={<FileDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
