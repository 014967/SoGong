import React from 'react'
import styled from 'styled-components'
import SignUpInput from '../components/SignUpInput'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const SignUp = () => {
    return (
        <Wrapper>
         <SignUpInput />
         
        </Wrapper>
    );
};

export default SignUp;