import React from 'react'
import styled from 'styled-components'
import WishListContents from '../components/WishListContents'


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const WishList = () => {
    return (
        <Wrapper>
            <WishListContents />
        </Wrapper>
    );
};

export default WishList;