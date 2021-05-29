import React from 'react'
import styled from 'styled-components'
import ManagerOrderListContents from '../components/ManagerOrderListContents'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const ManagerOrderList = () => {
    return (
        <Wrapper>
            <ManagerOrderListContents />
        </Wrapper>
    );
};

export default ManagerOrderList;