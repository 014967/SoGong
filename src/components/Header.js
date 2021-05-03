import React from 'react'
import styled from 'styled-components'
import Logo from './elements/Logo'
import Login from './Login'
import HeaderSearchBar from './HeaderSearchBar'

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 999;

  padding: 32px 64px;
  width: 100%;
  height: 218px;
  background: ${({ theme }) => theme.color.background};
`

const BaseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & > * + * {
    margin-left: 16px;
  }
`

const ExtensionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Categories = styled.nav`
  display: flex;
  margin-right: 64px;
  & > * + * {
    margin-left: 64px;
  }
`
const Category = styled.button`
  font-size: 64px;
  font-family: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.color.secondary};
  border: none;
  background: none;
  cursor: pointer;
  outline: 0;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`

const Header = () => {
    return (
      <Container>
        <BaseContainer>
          <Logo />
          <Login />
        </BaseContainer>
        <ExtensionContainer>
          <Categories>
            <Category>NEW</Category>
            <Category>MEN</Category>
            <Category>WOMEN</Category>
            <Category>KIDS</Category>
          </Categories>
          <HeaderSearchBar />
        </ExtensionContainer>
      </Container>
    )
}

export default Header