import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { LoginContext } from '../pages/App'
import Button from './elements/Button'
import LinkedButton from './elements/LinkedButton'
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

const SignedContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > *:last-child {
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

const Login = ({ location, history }) => {

  const { ID, setID, PW, setPW, success, setSuccess, signUpFlag, setSignUpFlag } = useContext(LoginContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    const { data: response } = await axios.post('/api/login', {
        id: ID,
        password: PW
      }
    )
    setSuccess(response.loginSuccess)
    if (!response.loginSuccess) {
      alert(response.message)
    } else {
      const { data: response } = await axios.get('/api/auth')
      if (response.isAdmin) {
        history.push('/manager')
      }
    }
  }

  const handleLogOut = async () => {
    const { data } = await axios.get('/api/logout')
    if (data.success) {
      Cookies.remove('w_auth')
      setSuccess(false)
      setID('')
      setPW('')
      if (location.pathname.includes('manager') || location.pathname.includes('wishlist')) {
        history.push('/')
      }
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

  useEffect(() => {
    const session = Cookies.get('w_auth')
    if (session) {
      auth()
    }
    setSignUpFlag(false)
  }, [signUpFlag])

  return (
    <Container>
      {
        success ? 
        <SignedContainer>
          <div>{ID}님 환영합니다.</div>
          <Button onClick={handleLogOut}>SIGN OUT</Button>
        </SignedContainer>
        : 
        <>
          <LoginContainer onSubmit={handleLogin}>
            <Input placeholder="ID" onChange={handleIDChange} />
            <Input type="password" placeholder="PW" onChange={handlePWChange} />
            <Button type="submit">SIGN IN</Button>
          </LoginContainer>
          <LinkedButton background="primary" link='/signup'>SIGN UP</LinkedButton>
        </>
      }
    </Container>
  );
}

export default withRouter(Login)
