import React from 'react'
import styled from 'styled-components'
import ManagerContents from '../components/ManagerContents'

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  margin-bottom: 128px;
  box-shadow: 0px 10px 40px #00000029;
  border-radius: 32px;
`
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