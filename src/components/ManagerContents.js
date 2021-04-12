import React, { useState } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import ManagerMenuButton from './elements/ManagerMenuButton'
import EventNotice from './EventNotice'
import Product from './Product'

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 96px;
  & > *:first-child {
    margin-right: 64px;
  }
`

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin-top: 64px;
  min-width: 232px;
  & > * + * {
    margin-top: 16px;
  }
`

const title = {
  event: '공지/이벤트 관리',
  product: '상품 관리'
}

const ManagerContents = () => {
  const [selected, setSelected] = useState('event');

  const handleItemClick = e => {
    setSelected(e.target.value)
  };

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
                onClick={handleItemClick}>
                로그아웃
              </ManagerMenuButton>
            </Menu>
            {
              selected === 'event' && (
                <EventNotice/>
              )
            }
            {
              selected === 'product' && (
                <Product/>
              )
            }
          </Container>
        </ContentsWrapper>
    );
}

export default ManagerContents