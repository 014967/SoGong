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
import { useHistory , useLocation} from 'react-router';

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
  product: '상품 관리'
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
  console.log(location);
  
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
                value="logout"
                onClick={handleLogOut}>
                로그아웃
              </ManagerMenuButton>
            </Menu>
            {
              selected === 'event' && (
                
                <EventNotice selected={selected}/>
              )
            }
            {
              selected === 'product' && (
                
                <Product selected={selected} />
              )
            }
          </Container>
        </ContentsWrapper>
    );
}

export default ManagerContents