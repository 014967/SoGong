import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import Button from './elements/Button';
import { useHistory } from 'react-router'
import HeaderButton from './elements/HeaderButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const Container = styled.div`
  
  width: 100%;
  margin-top: 96px;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const DetailProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 8px;
  }
`

const Header = styled.div`
  display: flex;
  width: 100%;
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
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  width: 100%;
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

const buttonMap = {
  '결제 완료': '문의하기',
  '배송 중': '문의하기',
  '배송 완료': '구매 확정',
  '구매 확정': '상품평'
}

const OrderListContents = () => {
  const [range, setRange] = useState(0) // 0(all), 1, 7, 30, 365
  const [page, setPage] = useState(1) //이중배열 말고 걍 slice로 ㄱㄱ
  const [pageNum, setPageNum] = useState(1)
  const [list, setList] = useState([])
  const [open, setOpen] = useState([])

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const history = useHistory()

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

  const handleButtonColor = (r) => r === range ? 'primary' : 'secondary'

  const handleButton = async (index) => {
    if (list[index].status === '배송 완료') {
      const { data: res } = await axios.post('/api/purchaseStatus/' + list[index]._id, {
        status: '구매 확정'
      })
    } else if (list[index].status === '구매 확정') {
      // 상품평 쓰기
      history.push('/user/review/' + list[index]._id)  //구매 목록의 _id
    } else {
      history.push('/user/inquiry/' + list[index]._id)
    }
    handleRange(range)
  }

  const handleRange = async (r) => {

    if (r === 0) { // 같은거 한번 더 눌렀을 경우 (모두 출력)
      setRange(0)
      const { data: user } = await axios.get('/api/auth')
      const { data: res } = await axios.get('/api/purchases/User/' + user._id)

      setList(res.reverse())
      setPageNum(Math.ceil(res.length / ROW_PER_PAGE))
      setOpen(Array(res.length).fill(false))
    } else {
      setRange(r)

      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 1)
      endDate.setHours(0, 0, 0, 0)
      const startDate = new Date()
      startDate.setDate(startDate.getDate() + 1 - r)
      startDate.setHours(0, 0, 0, 0)
      
      const { data: user } = await axios.get('/api/auth')
      const { data: res } = await axios.get('/api/purchases/User/' + user._id)
      let rangeList = [...res]

      rangeList = rangeList.filter(data => {
        const temp = data.date.split('T')[0].split('-')
        const dataDate = new Date(temp[0], temp[1] - 1, temp[2])
        return startDate <= dataDate && endDate > dataDate
      }).reverse()

      setList(rangeList)
      setPageNum(Math.ceil(rangeList.length / ROW_PER_PAGE))
      setOpen(Array(rangeList.length).fill(false))
    }
  }



  const handleRangeButton = (r) => {
    if (range === r) { //같은 버튼 한번 또 누르면 모두 표시
      handleRange(0)
    } else {
      handleRange(r)
    }
  }

  useEffect(() => {
    handleRange(7)
  }, [])

    return (
        <ContentsWrapper>
          <Title>주문 내역</Title>
          <Container>
            <Header>
              <HeaderButton background={handleButtonColor(1)} onClick={() => handleRangeButton(1)}>오늘</HeaderButton>
              <HeaderButton background={handleButtonColor(7)} onClick={() => handleRangeButton(7)}>7일</HeaderButton>
              <HeaderButton background={handleButtonColor(30)} onClick={() => handleRangeButton(30)}>30일</HeaderButton>
              <HeaderButton background={handleButtonColor(365)} onClick={() => handleRangeButton(365)}>1년</HeaderButton>
            </Header>
            <TableHeader>
              <TableHeaderContent width="150px">주문 날짜</TableHeaderContent>
              <TableHeaderContent width="350px">상품명</TableHeaderContent>
              <TableHeaderContent width="150px">상품 상태</TableHeaderContent>
              <TableHeaderContent width="200px">가격</TableHeaderContent>
            </TableHeader>
            {
              list.length !== 0 && list.slice((page - 1) * ROW_PER_PAGE, page * ROW_PER_PAGE).map((data, i) => (
                <Row key={i}>
                  <RowContent width="150px">{data.date.split('T')[0]}</RowContent>
                  <Name width="350px" onClick={() => handleOpen(i + ROW_PER_PAGE * (page - 1), true)}>
                    {data.product[0].name} {data.product.length > 1 && `외 ${data.product.length - 1}건`}
                  </Name>
                  <Modal open={open[i + ROW_PER_PAGE * (page - 1)]} onClose={() => handleOpen(0, false)}>
                    <ModalContainer style={modalStyle} className={classes.paper}>
                      <Title>주문 상세 정보</Title>
                      <InfoContainer>
                        <div>주문 날짜</div>
                        <div>{data.date.split('T')[0]}</div>
                      </InfoContainer>
                      <InfoContainer>
                        <div>배송지</div>
                        <div>{data.address}</div>
                      </InfoContainer>
                      <InfoContainer>
                        <div>주문 상품</div>
                        <DetailProductContainer>
                          {data.product.map((v, j) => (
                            <div key={j}>{v.name} {v.quantity}개 (₩{(v.price * v.quantity).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")})</div>
                          ))}
                        </DetailProductContainer>
                      </InfoContainer>
                      <InfoContainer>
                        <div>결제 금액</div>
                        <b>₩{data.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</b>
                      </InfoContainer>
                    </ModalContainer>
                  </Modal>
                  <RowContent width="150px">{data.status}</RowContent>
                  <RowContent width="200px">{data.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</RowContent>
                  <Button background="primary" onClick={() => handleButton(i + ROW_PER_PAGE * (page - 1))}>{buttonMap[data.status]}</Button>
                </Row>
              ))
            }
          </Container>
          <Pagination>
            {Array(pageNum).fill(0).map((p, i) => (
              <PageButton key={i} 
              color={i + 1 === page && 'primary'}
              onClick={() => setPage(i + 1)}>{i + 1}</PageButton>
            ))}
          </Pagination>
        </ContentsWrapper>
    );
}

export default OrderListContents