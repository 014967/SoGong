import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router'
import axios from 'axios'
import Title from './elements/Title'
import Button from './elements/Button'
import ContentsWrapper from './elements/ContentsWrapper'
import styled from 'styled-components'
import { LoginContext } from '../pages/App'

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

const Form = styled.div`
    & > * {
        margin-top: 32px;
    }
    & > *:last-child {
        margin-bottom: 64px;
    }
`

const SignUpInput = () => {

    const [id,setId] = useState('');
    const [checkId, setCheckId] = useState('') //id 중복확인
    const [checkEmail, setCheckEmail] = useState('') //email 중복확인
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false); //pw 확인과 같은지
    const [passwordViolate, setPasswordViolate] = useState('') //pw reg
    const [email,setEmail] = useState('');
    const [emailViolate, setEmailViolate] = useState('') //email reg
    const [checkSignUp, setCheckSignUp] = useState(false) //회원가입 가능한지
    const [name, setName] = useState('')

    const { setSignUpFlag } = useContext(LoginContext)
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (checkSignUp) {
            //회원가입
            const res = await axios.post('/api/users', { id, password, name, email })
            .catch(err => console.log(err))
            alert('회원가입이 완료되었습니다.')
            const { data: response } = await axios.post('/api/login', { id, password })
            setSignUpFlag(true)
            history.push('/')
        } else {
            alert('필수정보가 입력되지 않았습니다.')
        }
    };

    useEffect(() => {
        setPasswordError(password !== passwordCheck)
    }, [password, passwordCheck])

    useEffect(() => {
        if (
            id.length === 0 ||
            password.length === 0 ||
            passwordCheck.length === 0 ||
            name.length === 0 ||
            email.length === 0 ||
            checkId !== '사용 가능한 ID입니다.' ||
            checkEmail !== '사용 가능한 E-MAIL입니다.' ||
            passwordError ||
            passwordViolate.length !== 0 ||
            emailViolate.length !== 0
        ) {
            setCheckSignUp(false)
        } else {
            setCheckSignUp(true)
        }
    })

    // Coustom Hook 이전
    const onChangeId = (e) => {
        setId(e.target.value)
        setCheckId('')
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        checkEmailViolate(e.target.value)
        setCheckEmail('')
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value)
        checkViolate(e.target.value)
    };
    const onChangePasswordChk = (e) => {
        setPasswordCheck(e.target.value)
    };
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const checkViolate = pw => {
        const reg = /^(?=.*?[\w])(?=.*?[\d])(?=.*?[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]).{8,20}$/
        if (pw.length === 0) {
            setPasswordViolate('')
        } else if (!reg.test(pw)) {
            setPasswordViolate('비밀번호 생성 규칙에 맞지 않습니다.')
        } else {
            setPasswordViolate('')
        }
    }

    const checkEmailViolate = em => {
        const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        if (em.length === 0) {
            setEmailViolate('')
        } else if (!reg.test(em)) {
            setEmailViolate('이메일 규칙에 맞지 않습니다.')
        } else {
            setEmailViolate('')
        }
    }

    const handleCheckId = async () => {
        if (id.length === 0) {
            setCheckId('')
        } else {
            const { data: overlap } = await axios(`/api/users/${id}`) //true면 중복
            if (overlap) {
                setCheckId('이미 사용 중인 ID입니다.')
            } else {
                setCheckId('사용 가능한 ID입니다.')
            }
        }
    }

    const handleCheckEmail = async () => {
        if (email.length === 0 || emailViolate === '이메일 규칙에 맞지 않습니다.') {
            setCheckEmail('')
        } else {
            const { data: overlap } = await axios(`/api/usersEmail/${email}`) //true면 중복
            if (overlap) {
                setCheckEmail('이미 사용 중인 E-MAIL입니다.')
            } else {
                setCheckEmail('사용 가능한 E-MAIL입니다.')
            }
        }
    }
    
    return (
        <ContentsWrapper>
            <Title>
            SIGN UP
            </Title>
            <Form>
                <div>
                    <label htmlFor="user-id">ID*</label><br/>
                    <Input name="user-id" value={id} placeholder="ID" required onChange={onChangeId} />
                    <Button onClick={handleCheckId} style={{marginLeft: '16px'}}>중복 확인</Button>
                    <div>{checkId}&nbsp;</div>
                </div>
                <div>
                    <label htmlFor="user-password">PW (영문 대소문자/숫자/특수문자 혼용 8자 이상, 20자 이하여야 합니다.)*</label><br/>
                    <Input name="user-password" type="password" value={password} placeholder="PW" required onChange={onChangePassword} />
                    <div style={{color : 'red'}}>{passwordViolate}&nbsp;</div>
                </div>
                <div>
                    <label htmlFor="user-password-check">RE-ENTER PW*</label><br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} placeholder="PW" required onChange={onChangePasswordChk} />
                    {passwordError ? <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div> : <div>&nbsp;</div>}
                </div>
                <div>
                    <label htmlFor="user-name">이름*</label><br/>
                    <Input name="user-name" value={name} placeholder="이름" required onChange={onChangeName} /><br /><br />
                </div>
                <div>
                    <label htmlFor="user-email">E-MAIL*</label><br/>
                    <Input name="user-email" value={email} placeholder="EMAIL@GMAIL.COM" required onChange={onChangeEmail} />
                    <Button onClick={handleCheckEmail} style={{marginLeft: '16px'}}>중복 확인</Button>
                    <div>{emailViolate}&nbsp;</div>
                    <div>{checkEmail}&nbsp;</div>
                </div>
                <br />
                <div>
                    <Button type="primary" htmlType="submit" background={checkSignUp ? 'primary' : 'disabled'} onClick={onSubmit}>가입하기</Button>
                </div>
            </Form>
        </ContentsWrapper>
    );
}

export default SignUpInput;