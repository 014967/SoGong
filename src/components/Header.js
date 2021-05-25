import React, { useContext, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router'
import styled from 'styled-components'
import { ProductListContext } from '../pages/App'
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
  color: ${(props) => props.theme.color[props.color] || props.theme.color.secondary};
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
  const history = useHistory()
  const { category, setCategory, setSearch, setStartPrice, setEndPrice, submitFlag, setSubmitFlag } = useContext(ProductListContext)

  const handleCategory = (cate) => {
    setCategory(cate)
    setSearch('')
    setStartPrice(0)
    setEndPrice(200000)
    if (!location.pathname.includes('list'))
      history.push('/list')
    setSubmitFlag(true)
  }

  const handleColor = useCallback((cate) => (category === cate ? 'primary' : 'secondary'), [submitFlag])

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
              <Category color={handleColor('MEN')} onClick={() => handleCategory('MEN')}>MEN</Category>
              <Category color={handleColor('WOMEN')} onClick={() => handleCategory('WOMEN')}>WOMEN</Category>
              <Category color={handleColor('KIDS')} onClick={() => handleCategory('KIDS')}>KIDS</Category>
            </Categories>
            <HeaderSearchBar location={location} history={history} />
            </ExtensionContainer>
          )
        }
      </Container>
    )
}

export default Header