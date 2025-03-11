import React, { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Auth = lazy(() => import('./pages/Auth'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route>
            {/* App Route */}
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="auth" element={<Auth />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
