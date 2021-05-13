import React, { useEffect, useState, useCallback } from 'react';
import Button from './elements/Button'
import ContentsWrapper from './elements/ContentsWrapper'
import styled from 'styled-components'

const Input = styled.input`
  position: relative;
  width: 300px;
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

const SignUpInput = () => {

const [passwordCheck,setPasswordCheck] = useState('');
const [passwordError,setPasswordError] = useState(false);

const [id,onChangeId] = useState('');
const [nick,onChangeNick] = useState('');
const [password,onChangePassword] = useState('');
    

const onSubmit = useCallback((e) => {
    e.preventDefault();
    /*검증 로직 만들기
    비밀번호와 비밀번호 체크가 다를 경우를 검증한다
     */
    if(password !== passwordCheck){
        return setPasswordError(true);
    }
    
},[password,passwordCheck]);    
    const onChangePasswordChk = useCallback((e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
        //password state를 사용하기때문에 password를 넣어준다
    },[passwordCheck]);
    

    //반복되는 코드들을 Coustom Hook을 활용하여 줄여줄 수 있다.
    const useState = (initValue = null) =>{
        const [value,setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        },[]);
        return [value,handler];
    };
    

    
    return (
        <ContentsWrapper wide>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
            <div>
            <label htmlFor="user-id">아이디</label><br/>
            <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label><br/>
                <Input name="user-nick" value={nick} required onChange={onChangeNick} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label><br/>
                <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호체크</label><br/>
                <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            
            <div style={{marginTop:10}}>
                <Button type="primary" htmlType="submit" >가입하기</Button>
            </div>
        </form>
        </ContentsWrapper>
    );
}


export default SignUpInput;