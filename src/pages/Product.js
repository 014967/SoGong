import React from 'react'
import styled from 'styled-components'
import ContentsWrapper from '../components/elements/ContentsWrapper'
import ProductData from '../components/ProductData'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const Product = () => {
    return (
        <Wrapper>
            <ContentsWrapper>
              <ProductData />
            </ContentsWrapper>
        </Wrapper>
    );
};
export default Product;