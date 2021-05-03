import React from 'react'
import styled from 'styled-components'
import ManagerContents from '../components/ManagerContents'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 282px;
`

const ManagerHomePage = () =>
{
    return (
        <Wrapper>
            <ManagerContents />
        </Wrapper>
    )
}
export default ManagerHomePage;