import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'
import { ProductListContext } from '../pages/App'
import { WishListContext } from '../pages/App'
import Logo from './elements/Logo'
import Login from './Login'
import HeaderSearchBar from './HeaderSearchBar'
import Button from './elements/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { LoginContext } from '../pages/App'

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

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 16px;
  }
`
const WishList = styled.div`
  display: flex;
  padding-bottom: 12px;
  cursor: pointer;
  margin-right: 12px;
  margin-top: 12px;
  & > *:last-child {
    font-size: 10px;
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
  const { setCategory, setSearch, setStartPrice, setEndPrice, currentState, setSubmitFlag } = useContext(ProductListContext)
  const { wishListFlag, setWishListFlag } = useContext(WishListContext)
  const { success } = useContext(LoginContext)

  const [wishList, setWishList] = useState(0)

  const handleCategory = (cate) => {
    setCategory(cate)
    setSearch('')
    setStartPrice(0)
    setEndPrice(200000)
    if (!location.pathname.includes('/list'))
      history.push('/list')
    setSubmitFlag(true)
  }

  const handleWishList = () => {
    history.push('/user/wishlist')
  }

  const getWishList = async () => {
    const {data: wl} = await axios.get('/api/wishlist')
      setWishList(wl.wishlist.length)
  }

  const handleOrder = async () => {
    history.push('/user/orderlist')
  }

  const handleColor = useCallback((cate) => (currentState.category === cate ? 'primary' : 'secondary'), [currentState])

  useEffect(async () => {
    if (location.pathname.includes('manager')) {
      const { data: response } = await axios.get('/api/auth')
        if (!response.isAdmin) {
            alert('관리자만 접근 가능합니다.')
            history.push('/')
        }
    }
  }, [location])

  useEffect(() => {
    if (success) {
      getWishList()
    }
  }, [success])

  useEffect(() => {
    if (wishListFlag) {
      getWishList()
      setWishListFlag(false)
    }
  }, [wishListFlag])

    return (
      <Container>
        <BaseContainer>
          <Logo />
          <LoginContainer>
            {success && 
            <WishList onClick={handleWishList}>
              <ShoppingCartIcon style={{ fontSize: 28 }} />
              <div>{wishList}</div>
            </WishList>}
            <Login />
            {success &&
            <Button onClick={handleOrder}>ORDER</Button>
            }
          </LoginContainer>
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