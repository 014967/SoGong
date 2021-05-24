import React, { useEffect, useState } from 'react';
import Title from './elements/Title'
import Button from './elements/Button'
import ContentsWrapper from './elements/ContentsWrapper'
import styled from 'styled-components'

const Input = styled.input`
  position: relative;
  width: 300px;
  height: 48px;
  border: solid 1px ${({ theme }) => theme.color.primary};
  background: white;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  padding-left: 8px;
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
    & > * {
        margin-top: 32px;
    }
    & > *:last-child {
        margin-bottom: 64px;
    }
`

const SignUpInput = () => {

    const [id,setId] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    

    const onSubmit = (e) => {
        e.preventDefault();
       
         // 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
         
        
        
        console.log({
            id,
            email,
            password,
            passwordCheck,
        });
    };

    useEffect(() => {
        if(password !== passwordCheck){
        return setPasswordError(true);
    }
    }, [password, passwordCheck])

    // Coustom Hook 이전
    const onChangeId = (e) => {
        setId(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordChk = (e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };
    
    
    return (
        <ContentsWrapper>
            <Title>
            SIGN UP
            </Title>
            <Form onSubmit={onSubmit}>
                <div>
                <label htmlFor="user-id">ID*</label><br/>
                <Input name="user-id" value={id} placeholder="ID" required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-password">PW*</label><br/>
                    <Input name="user-password" type="password" value={password} placeholder="PW" required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">RE-ENTER PW*</label><br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} placeholder="PW" required onChange={onChangePasswordChk} />
                    {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <label htmlFor="user-email">E-MAIL</label><br/>
                    <Input name="user-email" value={email} placeholder="EMAIL@GMAIL.COM" required onChange={onChangeEmail} />
                </div>
                <div>
                    <Button type="primary" htmlType="submit" >가입하기</Button>
                </div>
            </Form>
        </ContentsWrapper>
    );
}


export default SignUpInput;