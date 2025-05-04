import React from 'react'
import Title from '../shared/Title'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Title />
      <div className="fixed top-0 left-0 right-0 w-full z-10">
        <Header />
      </div>
      <div className="flex-1 pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
