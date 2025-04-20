import React from 'react'
import Title from '../shared/Title'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Title />
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
