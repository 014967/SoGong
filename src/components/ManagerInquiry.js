import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import Button from './elements/Button';
import CheckBox from './elements/CheckBox'
import HeaderButton from './elements/HeaderButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import DatePicker from "react-datepicker";
import { defaults } from 'js-cookie';

const Container = styled.div`
  width: 100%;
  margin-top: 96px;
  display: flex;
  flex-direction: column;
`

const ListContainer = styled.div`
`
const StatisticsContainer = styled.div`
  padding: 64px 0 0 64px;
`
const StatisticsTitle = styled(Title)`
  font-size: 32px;
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

const StatInfoContainer = styled(InfoContainer)`
  font-size: 24px;
  & > *:first-child {
    width: auto;
  }
  margin-bottom: 32px;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`


const DetailProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 8px;
  }
`

const Header = styled.div`
  display: flex;
  width: 1072px;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > * + * {
    margin-left: 16px;
  }
`

const RowContent = styled.div`
  width: ${(props) => props.width};
  text-align: center;
`

const Name = styled(RowContent)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 1072px;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 1072px;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`

const Pagination = styled.div`
  display: flex;
  width: 1072px;
  justify-content: center;
  margin: 64px 0;
  & > * + * {
    margin-left: 16px;
  }
`

const PageButton = styled.button`
  color: ${(props) => props.theme.color[props.color] || props.theme.color.secondary};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 300px;
  height: 48px;
  background: ${({ theme }) => theme.color.secondary};
  border-radius: 32px;
`

const FilterButtonText = styled.button`
  width: 129px;
  height: 48px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  &:focus {
    outline: none;
  }
`

const FilterButtonHyphen = styled.div`
  color: white;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
`

const Textarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.color.primary};
  &:focus {
      outline: none;
  }
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  height: 400px;
  width: 640px;
  padding: 8px;
  resize: none;
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

const ROW_PER_PAGE = 5

const defaultStartDate = new Date()
defaultStartDate.setDate(defaultStartDate.getDate() - 7)
defaultStartDate.setHours(0, 0, 0, 0)
const defaultEndDate = new Date()
defaultEndDate.setDate(defaultEndDate.getDate())
defaultEndDate.setHours(0, 0, 0, 0)

const ManagerInquiry = () => {
  const [range, setRange] = useState(0) // 0(all), 1, 7, 30, 365
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)
  const [page, setPage] = useState(1) //이중배열 말고 걍 slice로 ㄱㄱ
  const [pageNum, setPageNum] = useState(1)
  const [questions, setQuestions] = useState([])
  const [open, setOpen] = useState([])
  const [openAnswer, setOpenAnswer] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [orderList, setOrderList] = useState([])
  const [answer, setAnswer] = useState('')

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = (index, op) => {
    if (op) {
      if (questions[index].answer.length === 0) {//답변 없으면
        setOpenAnswer(prev => [...prev.map((v, i) => 
          i === index ? true : false
        )])
      } else {
        setOpen(prev => [...prev.map((v, i) => 
          i === index ? true : false
        )])
      }
    }
    else {
      setOpen(prev => [...prev.map(v => false)])
      setOpenAnswer(prev => [...prev.map(v => false)])
    }
  }

  const handleRange = async () => {
    
    const { data: res } = await axios.get('/api/admin/customerquestion')
    if (res.length === 0) {
      return
    } 

    let rangeList = [...res]

    // 필터링, 페이징
    rangeList = rangeList.filter(data => {
      const temp = data.date.split('T')[0].split('-')
      const dataDate = new Date(temp[0], temp[1] - 1, temp[2])
      return startDate <= dataDate && endDate >= dataDate
    }).reverse()
    setQuestions(rangeList)
    setPageNum(Math.ceil(rangeList.length / ROW_PER_PAGE))
    setOpen(Array(rangeList.length).fill(false))
    setOpenAnswer(Array(rangeList.length).fill(false))

    console.log(rangeList.map(q => q.orderlist))
    const { data: orders } = await axios.post('/api/purchasesById', {
      purchase_ids: rangeList.map(q => q.orderlist)
    })

    const temp2 = rangeList.map(q => q.orderlist).map(o => orders.find(order => order._id === o))
    setOrderList(temp2.map(o => `${o.product[0].name} ${o.product.length > 1 ? '외 ' + (o.product.length - 1).toString() + '건' : ''}`))
    
    setIsLoading(false)
  }

  const handleAnswer = async (id) => {
    const { data: res } = await axios.patch('/api/admin/Answer/' + id, {
      answer
    })
    setAnswer('')
    handleRange()
    handleOpen(0, false)
  }


  useEffect(() => {
    handleRange()
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      handleRange()
    }
  }, [startDate, endDate])

  const StartFilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <FilterButtonText
        onClick={onClick} ref={ref}>
        {value || '시작일'}
      </FilterButtonText>
    ),
  )
  const EndFilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <FilterButtonText
        onClick={onClick} ref={ref}>
        {value || '종료일'}
      </FilterButtonText>
    ),
  )

    return (
        <>
          {isLoading ? <div style={{marginBottom: '32px'}}>
            Loading...
          </div> : <>
          <Container>
            <ListContainer>
              <Header>
                <FilterButtonContainer>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    isclearable
                    customInput={<StartFilterButton />}
                  />
                  <FilterButtonHyphen>~</FilterButtonHyphen>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    isclearable
                    customInput={<EndFilterButton />}
                  />
                </FilterButtonContainer>
              </Header>
              <TableHeader>
                <TableHeaderContent width="150px">등록일</TableHeaderContent>
                <TableHeaderContent width="300px">주문 정보</TableHeaderContent>
                <TableHeaderContent width="400px">제목</TableHeaderContent>
              </TableHeader>
              {
                questions.length !== 0 && questions.slice((page - 1) * ROW_PER_PAGE, page * ROW_PER_PAGE).map((q, i) => (
                  <Row key={i}>
                    <RowContent width="150px">{q.date.split('T')[0]}</RowContent>
                    <RowContent width="300px">{orderList[i + ROW_PER_PAGE * (page - 1)]}</RowContent>
                    <RowContent width="400px">{q.title}</RowContent>
                    <Button onClick={() => handleOpen(i, true)}>
                      {q.answer.length === 0 ? '답변하기' : '답변완료'}
                    </Button>
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
                    <Modal open={openAnswer[i]} onClose={() => handleOpen(0, false)}>
                      <ModalContainer style={modalStyle} className={classes.paper}>
                        <Title>답변하기</Title>
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
                          <Textarea placeholder="답변 입력" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </InfoContainer>
                        <Button background="primary" onClick={() => handleAnswer(q._id)}>답변하기</Button>
                      </ModalContainer>
                    </Modal>
                  </Row>
                ))
              }
            </ListContainer>
            <Pagination>
              {Array(pageNum).fill(0).map((p, i) => (
                <PageButton key={i} 
                color={i + 1 === page && 'primary'}
                onClick={() => setPage(i + 1)}>{i + 1}</PageButton>
              ))}
            </Pagination>
          </Container>
        </>}
        </>
    );
}

export default ManagerInquiry