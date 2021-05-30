import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Button from './elements/Button';
import axios from 'axios'
import { useHistory , useLocation } from 'react-router';
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import { useParams } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 64px 32px 0;
    margin-bottom: 64px;
    width: 100%;
    & > * + * {
        margin-top: 64px;
    }
`

const InputContainer = styled.div`
    display: flex;
    max-width: 1094px;
`
const Title2 = styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    height: 47px;
    font-size: 32px;
    font-family: ${({ theme }) => theme.font.regular};
    color: ${({ theme }) => theme.color.secondary};
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 48px;
    width: 894px;
    max-width: 894px;
    padding-left: 8px;

`
const Textarea = styled.textarea`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 540px;
    width: 894px;
    max-width: 894px;
    padding: 8px;
    resize: none;
`



const LabelButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 48px;
    color: white;
    margin-left: 15px;
    background: ${(props) => props.theme.color[props.background] || props.theme.color.secondary};
    border: none;
    border-radius: 32px;
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    cursor: pointer;
    &:focus {
    outline: none;
    }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 0 16px 0 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  
`
const Date = styled.div`
  width: 619px;
  text-align: center;
`

const Available = styled.div`
  width: 201px;
  text-align: center;
`

const DateRange = styled.div`
  width: 185px;
  text-align: center;
`
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px 0 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 64px 0;
  & > * + * {
    margin-left: 16px;
  }
`

const InquiryContents = () => {

  const history = useHistory()
  const params = useParams()

  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')


  const handleSubmit = async () => {
    if (title.length === 0 || contents.length === 0) {
      alert('필수사항을 입력하지 않으셨습니다.')
      return
    }
    const { data: user } = await axios.get('/api/auth')
    const { data: res } = await axios.post('/api/addcustomQuestion', {
      id: user._id,
      title,
      contents,
      orderlist: params.id
    })
    alert('등록되었습니다.')
    history.goBack()
  }

  const handleCancel = () => {
    history.goBack()
  }


    return (
        <>
          <Title>문의하기</Title>
        
        <Container>
            <InputContainer>
            <Title2>제목</Title2>
            <Input placeholder="제목 입력" value={title} onChange={(e) => setTitle(e.target.value)} />
            </InputContainer>
            <InputContainer>
                    <Title2>내용</Title2>
                    <Textarea placeholder="내용 입력" value={contents} onChange={(e) => setContents(e.target.value)} />
            </InputContainer>
            <ButtonContainer>
                    <LabelButton background='primary' onClick={handleSubmit}>등록</LabelButton>
                    <LabelButton onClick={handleCancel}>취소</LabelButton>
            </ButtonContainer>
           
        </Container>
        </>
    ) 
}
export default InquiryContents;