import React from 'react'
import Title from '../shared/Title'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
      <Title />
      <Header />
      <Outlet />
    </>
  )
}

export default AppLayout
