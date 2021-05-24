import React from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import Logo from './elements/Logo'
import Login from './Login'
import HeaderSearchBar from './HeaderSearchBar'

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 999;

  padding: 32px 64px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
`

const BaseContainer = styled.div`
  display: flex;
  min-width: 100%;
  justify-content: space-between;
  margin-bottom: 16px;
  & > *:first-child {
    margin-right: 256px; // 브라우저 width 감소 대응
  }
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
  const location = useLocation()
  console.log(location)
    return (
      <Container>
        <BaseContainer>
          <Logo />
          <Login />
        </BaseContainer>
        {
          !location.pathname.includes('manager') && (
            <ExtensionContainer>
            <Categories>
              <Category>NEW</Category>
              <Category>MEN</Category>
              <Category>WOMEN</Category>
              <Category>KIDS</Category>
            </Categories>
            <HeaderSearchBar />
            </ExtensionContainer>
          )
        }
      </Container>
    )
}

export default Header