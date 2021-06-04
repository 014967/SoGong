import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Button from './elements/Button';
import axios from 'axios'
import { useHistory , useLocation } from 'react-router';
import Title from './elements/Title'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const InputContainer = styled.div`
    display: flex;
    max-width: 1094px;
`
const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  & > *:first-child {
    width: 110px;
    color: ${({ theme }) => theme.color.secondary};
    font-family: ${({ theme }) => theme.font.bold};
    margin-right: 16px;
  }
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


const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 0 16px 0 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  
`
const RowContent = styled.div`
  width: ${(props) => props.width};
  text-align: center;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px 0 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  margin-top: 64px;
`

const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`

const QuestionTitle = styled(RowContent)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 64px 0;
`

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '1000px',
    padding: '64px 64px',
    boxShadow: '0px 10px 40px #00000029',
    borderRadius: '32px',
    background: 'white',
    '&:focus': {
      outline: 'none'
    }
  },
}));

const InquiryList = ({ questions, setQuestions }) => {

  const [open, setOpen] = useState([])
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [order, setOrder] = useState([])

  const handleOpen = (index, op) => {
    if (op) {
      setOpen(prev => [...prev.map((v, i) => 
        i === index ? true : false
      )])
    }
    else {
      setOpen(prev => [...prev.map(v => false)])
    }
  }

  const getOrder = async () => {
    const { data: res } = await axios.get('/api/purchases/' + questions[0].orderlist)
    setOrder(res[0].product)
  }

  const handleQuestions = () => {
    setQuestions([])
  }

  useEffect(() => {
    setOpen(Array(questions.length).fill(false))
    getOrder()
  }, [])

  return (
    <>
      <Title>문의 내역</Title>
      <InfoContainer style={{marginTop: '32px'}}>
        <div>주문 내역</div>
        <div>
          {
            (order && order.length !== 0) && order.map((p, i) => (
              <div key={i}>{p.name} {p.quantity}개</div>
            ))
          }
        </div>
      </InfoContainer>
      <TableHeader>
        <TableHeaderContent width="200px">등록일</TableHeaderContent>
        <TableHeaderContent width="600px">제목</TableHeaderContent>
        <TableHeaderContent width="200px">답변</TableHeaderContent>
      </TableHeader>
      {
        questions.map((q, i) => (
          <Row key={i}>
            <RowContent width="200px">{q.date.split('T')[0]}</RowContent>
            <QuestionTitle width="600px" onClick={() => handleOpen(i, true)}>{q.title}</QuestionTitle>
            <RowContent width="200px">{q.answer.length > 0 ? '등록' : '미등록'}</RowContent>
            <Modal open={open[i]} onClose={() => handleOpen(0, false)}>
              <ModalContainer style={modalStyle} className={classes.paper}>
                <Title>주문 상세 정보</Title>
                <InfoContainer>
                  <div>제목</div>
                  <div>{q.title}</div>
                </InfoContainer>
                <InfoContainer>
                  <div>문의 내용</div>
                  <div>{q.contents.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}</div>
                </InfoContainer>
                <InfoContainer>
                  <div>답변</div>
                  <div>{q.answer.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}</div>
                </InfoContainer>
              </ModalContainer>
            </Modal>
          </Row>
        ))
      }
      <ButtonContainer>
        <Button onClick={handleQuestions}>추가 문의</Button>
      </ButtonContainer>
    </>
  )
}
export default InquiryList;