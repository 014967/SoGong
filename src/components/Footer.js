import React from 'react'
import styled from 'styled-components'
import Text from './elements/Text'
import Logo from './elements/Logo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;

  height: 320px;
  padding: 32px 64px;
  
  background: ${({ theme }) => theme.color.primary};
`

const Footer = () => {
  return (
    <Container>
      <Text color="background">
        Footer
      </Text>
      <Logo color="background" />
    </Container>
  )
}

export default Footer