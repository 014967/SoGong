import React from 'react'
import styled from 'styled-components'
import Banner from '../components/Banner'
import HomeContents from '../components/HomeContents'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 218px;
`

const ClientHomePage = () => {
    return (
        <Wrapper>
            <Banner />
            <HomeContents />
        </Wrapper>
    );
};
export default ClientHomePage;