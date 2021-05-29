import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Button from './elements/Button';
import axios from 'axios'
import { useHistory , useLocation } from 'react-router';
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'

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

const InquiryContents = () =>
{

 
    return(
        <>
       
          <div>
               <Title>문의하기</Title>
        
        <Container>
            <InputContainer>
            <Title2>제목</Title2>
            <Input placeholder="제목 입력" onChange></Input>
            </InputContainer>
            <InputContainer>
                    <Title2>내용</Title2>
                    <Textarea placeholder="내용 입력" onChange></Textarea>
            </InputContainer>
            <InputContainer>
                    <LabelButton>등록</LabelButton>
                    <LabelButton>취소</LabelButton>
            </InputContainer>
           
        </Container>
           </div>
           <ContentsWrapper>
           <TableHeader>
          <TableHeaderContent width="80px">등록일시</TableHeaderContent>
            <TableHeaderContent width="197px">종류</TableHeaderContent>
            <TableHeaderContent width="485px">문의내용</TableHeaderContent>
            <TableHeaderContent width="270px">답변</TableHeaderContent>
          </TableHeader>
          <Row>
              <Date width="80px">a</Date>
              <Available width="197px">b</Available>
              <DateRange width="485px">c</DateRange>
              <DateRange width="270px">c</DateRange>
          </Row>
       </ContentsWrapper>
        </>
    ) 
}
export default InquiryContents;