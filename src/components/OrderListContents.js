import React, { useState } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import ManagerMenuButton from './elements/ManagerMenuButton'
import OrderNotice from './OrderNotice'
import Product from './Product'

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 96px;
`





const OrderListContents = () => {
  const [selected, setSelected] = useState('event');



    return (
        <ContentsWrapper wide>
          <Title>주문 내역</Title>
          <Container>
            {
              selected === 'event' && (
                <OrderNotice />
              )
            }
            {
              selected === 'product' && (
                <Product />
              )
            }
          </Container>
        </ContentsWrapper>
    );
}

export default OrderListContents