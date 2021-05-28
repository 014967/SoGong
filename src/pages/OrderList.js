import React from 'react'
import styled from 'styled-components'
import OrderListContents from '../components/OrderListContents'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const OrderList = () => {
    return (
        <Wrapper>
            <OrderListContents />
        </Wrapper>
    );
};

export default OrderList;