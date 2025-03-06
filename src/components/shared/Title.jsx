import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({
  title = 'PTIT Documents',
  description = 'Documents for PTITers',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title
