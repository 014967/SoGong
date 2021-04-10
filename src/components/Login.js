import React from 'react'
import styled from 'styled-components'
import Button from './elements/Button'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  & > * + * {
    margin-left: 16px;
  }
`;

const Input = styled.input`
  position: relative;
  width: 192px;
  height: 48px;
  border: solid 1px ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.background};
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  padding-left: 8px;
  &:focus {
    outline: none;
  }
`;

//아디 비번 값 받기
//값없으면 disabled
const Login = () => {
  return (
    <Container>
      <Input placeholder="ID" />
      <Input type="password" placeholder="PW" />
      <Button>SIGN IN</Button>
      <Button background="primary">SIGN UP</Button>
    </Container>
  );
}

export default Login
