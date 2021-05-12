import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from './elements/Button'
import axios from 'axios'
import Cookies from 'js-cookie'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginContainer = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 16px;
  & > * {
    margin-left: 16px;
  }
`

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

const Login = () => {

  const [ID, setID] = useState('')
  const [PW, setPW] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async () => {
    const { data: response } = await axios.post('/api/login',
      {
        id: ID,
        password: PW
      }
    )
    setSuccess(response.loginSuccess)
    if (!response.loginSuccess) {
      alert(response.message)
    }
  }

  const handleLogOut = async () => {
    const { data } = await axios.get('/api/logout')
    if (data.success) {
      Cookies.remove('w_auth')
      setSuccess(false)
      setID('')
      setPW('')
    }
  }

  const handleIDChange = e => {
    setID(e.target.value)
  }

  const handlePWChange = e => {
    setPW(e.target.value)
  }

  const auth = async () => {
    const { data } = await axios.get('/api/auth')
    setSuccess(true)
    setID(data.id)
  }

  useEffect(() => {
    const session = Cookies.get('w_auth')
    if (session) {
      auth()
    }
  }, [])

  return (
    <Container>
      {
        success ? 
        <>
          <div>{ID}님 환영합니다.</div>
          <Button onClick={handleLogOut}>SIGN OUT</Button>
        </>
        : 
        <>
          <LoginContainer onSubmit={handleLogin}>
            <Input placeholder="ID" onChange={handleIDChange} />
            <Input type="password" placeholder="PW" onChange={handlePWChange} />
            <Button type="submit">SIGN IN</Button>
          </LoginContainer>
          <Button background="primary">SIGN UP</Button>
        </>
      }
    </Container>
  );
}

export default Login
