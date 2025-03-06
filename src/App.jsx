import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* App Route */}
          <Route path="/" />
        </Route>
        <Route path="login" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
