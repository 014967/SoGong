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
    const [passwordAvailable,setPasswordAvailable] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault()
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
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        setPasswordAvailable(regExp.test(e.target.value)==false);
        setPassword(e.target.value);
        if(regExp.test(e.target.value)==false){
            return setPasswordAvailable(true);
        }
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
            
            
            <form onSubmit={onSubmit}>
            <div>
            <label htmlFor="user-id">ID*</label><br/>
            <Input name="user-id" value={id} placeholder="ID" required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="user-password">PW*</label><br/>
                <Input name="user-password" type="password" value={password} placeholder="PW" required onChange={onChangePassword} />
                {passwordAvailable && <div style={{color : 'red'}}>영문과 숫자로 이루어진 8~10자로 입력하여 주세요.</div>}
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
            <div style={{marginTop:10}}>
                <Button type="primary" htmlType="submit" >가입하기</Button>
            </div>
        </form>
        </ContentsWrapper>
    );
}

export default SignUpInput;