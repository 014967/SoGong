import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './Button'

const LinkedButton = ({ children, link, ...props }) => {
  return (
    <Link to={link}>
      <Button {...props}>{children}</Button>
    </Link>
  )
}

export default LinkedButton