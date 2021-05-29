import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoginContext } from '../pages/App'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import ManagerMenuButton from './elements/ManagerMenuButton'
import EventNotice from './EventNotice'
import Product from './Product'
import { useLocation} from 'react-router';
import ManagerOrderListContents from './ManagerOrderListContents'
import ManagerInquiry from './ManagerInquiry'

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 96px;
`

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin: 64px 64px 64px 0;
  min-width: 232px;
  & > * + * {
    margin-top: 16px;
  }
`

const title = {
  event: '공지/이벤트 관리',
  product: '상품 관리',
  order: '주문 내역 관리',
  inquiry: '고객 문의 관리'
}

const ManagerContents = ({ history }) => {
  const [selected, setSelected] = useState('event');

  
  const { setID, setPW, setSuccess } = useContext(LoginContext)

  const handleItemClick = e => {
    setSelected(e.target.value)
  };

  const handleLogOut = async () => {
    const { data } = await axios.get('/api/logout')
    if (data.success) {
      Cookies.remove('w_auth')
      setSuccess(false)
      setID('')
      setPW('')
      history.push('/')
    }
  }
  const location = useLocation();
  
  useEffect(() => {
    location.state ? setSelected(location.state.selected) : console.log(location.state)
  }, [])
  
    return (
        <ContentsWrapper wide>
          <Title>{title[selected]}</Title>
          <Container>
            <Menu>
              <ManagerMenuButton
                value="event"
                onClick={handleItemClick}
                selected={selected === 'event'}
              >
                공지/이벤트 관리
              </ManagerMenuButton>
              <ManagerMenuButton
                value="product"
                onClick={handleItemClick}
                selected={selected === 'product'}
              >
                상품 관리
              </ManagerMenuButton>
              <ManagerMenuButton
                value="order"
                onClick={handleItemClick}
                selected={selected === 'order'}
              >
                주문 내역 관리
              </ManagerMenuButton>
              <ManagerMenuButton
                value="inquiry"
                onClick={handleItemClick}
                selected={selected === 'inquiry'}
              >
                고객 문의 관리
              </ManagerMenuButton>
              <ManagerMenuButton
                value="logout"
                onClick={handleLogOut}>
                로그아웃
              </ManagerMenuButton>
            </Menu>
            {
              selected === 'event' && (
                
                <EventNotice selected={selected} history={history}/>
              )
            }
            {
              selected === 'product' && (
                
                <Product selected={selected} history ={history}/>
              )
            }
            {
              selected === 'order' && (
                <ManagerOrderListContents />
              )
            }
            {
              selected === 'inquiry' && (
                <ManagerInquiry />
              )
            }
          </Container>
        </ContentsWrapper>
    );
}

export default ManagerContents