/* eslint-disable no-unused-vars */
import React from 'react'
import Title from '../shared/Title'
import Header from './Header'
import DocumentTabs from './DocumentTabs'

const AppLayout = (WrappedComponent) => {
  return (props) => (
    <>
      <Title />
      <Header />
      <WrappedComponent {...props} />
    </>
  )
}

export default AppLayout
