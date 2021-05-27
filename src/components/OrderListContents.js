import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import Button from './elements/Button';
import CheckBox from './elements/CheckBox'
import HeaderButton from './elements/HeaderButton';

const Container = styled.div`
  
  width: 100%;
  margin-top: 96px;
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

const dummy = [
  {
    date: '2021-05-28', //형식은 자유
    product: [{
        name: '티셔츠1',
        quantity: 2, //수량
        price: 30000
      }, {
        name: '티셔츠2',
        quantity: 1,
        price: 40000
      },
    ],
    status: '배송 완료', //결제 완료, 배송 중, 배송 완료, 구매 확정
    price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
  },{
    date: '2021-05-28', //형식은 자유
    product: [{
        name: '티셔츠1',
        quantity: 2, //수량
        price: 30000
      }, {
        name: '티셔츠2',
        quantity: 1,
        price: 40000
      },
    ],
    status: '배송 중', //결제 완료, 배송 중, 배송 완료, 구매 확정
    price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
  },{
    date: '2021-05-28', //형식은 자유
    product: [{
        name: '티셔츠1',
        quantity: 2, //수량
        price: 30000
      }, {
        name: '티셔츠2',
        quantity: 1,
        price: 40000
      },
    ],
    status: '배송 중', //결제 완료, 배송 중, 배송 완료, 구매 확정
    price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
  },{
    date: '2021-05-28', //형식은 자유
    product: [{
        name: '티셔츠1',
        quantity: 2, //수량
        price: 30000
      }, {
        name: '티셔츠2',
        quantity: 1,
        price: 40000
      },
    ],
    status: '배송 완료', //결제 완료, 배송 중, 배송 완료, 구매 확정
    price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
  },{
    date: '2021-05-28', //형식은 자유
    product: [{
        name: '티셔츠1',
        quantity: 2, //수량
        price: 30000
      }, {
        name: '티셔츠2',
        quantity: 1,
        price: 40000
      },
    ],
    status: '배송 중', //결제 완료, 배송 중, 배송 완료, 구매 확정
    price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
  },{
    date: '2021-05-28', //형식은 자유
    product: [{
        name: '티셔츠1',
        quantity: 2, //수량
        price: 30000
      }, {
        name: '티셔츠2',
        quantity: 1,
        price: 40000
      },
    ],
    status: '배송 완료', //결제 완료, 배송 중, 배송 완료, 구매 확정
    price: 103000, //총결제금액. 주문내역 post 시 미리 계산된 상태로 프론트에서 줄거임
  },
]

const ROW_PER_PAGE = 5

const buttonMap = {
  '결제 완료': '문의하기',
  '배송 중': '문의하기',
  '배송 완료': '구매 확정',
  '구매 확정': '상품평'
}


const OrderListContents = () => {
  const [range, setRange] = useState('w') //d, w, m, y
  const [page, setPage] = useState(1) //이중배열 말고 걍 slice로 ㄱㄱ
  const [pageNum, setPageNum] = useState(1)
  const [list, setList] = useState([])

  const getList = () => {
    setList(dummy)
    setPageNum(Math.ceil(dummy.length / ROW_PER_PAGE))
  }

  const handleButtonColor = (r) => r === range ? 'primary' : 'secondary'

  const handleButton = index => {
    // if (list[index].status === '배송 완료') {
    //   setList(prev => [...prev.map((v, i) => 
    //     i === index ? {
    //       ...v,
    //       status: '구매 확정'
    //     } : v
    //   )])
    // }
  }

  const handleRange = r => {
    setRange(r)
  }

  useEffect(() => {
    getList()
  }, [])

    return (
        <ContentsWrapper>
          <Title>주문 내역</Title>
          <Container>
            <Header>
              <HeaderButton background={handleButtonColor('d')} onClick={() => handleRange('d')}>오늘</HeaderButton>
              <HeaderButton background={handleButtonColor('w')} onClick={() => handleRange('w')}>1주일</HeaderButton>
              <HeaderButton background={handleButtonColor('m')} onClick={() => handleRange('m')}>1개월</HeaderButton>
              <HeaderButton background={handleButtonColor('y')} onClick={() => handleRange('y')}>1년</HeaderButton>
              </Header>
            <TableHeader>
              <TableHeaderContent width="150px">주문 날짜</TableHeaderContent>
              <TableHeaderContent width="350px">상품명</TableHeaderContent>
              <TableHeaderContent width="150px">상품 상태</TableHeaderContent>
              <TableHeaderContent width="200px">가격</TableHeaderContent>
            </TableHeader>
            {
              list.length !== 0 && list.slice((page - 1) * ROW_PER_PAGE, page * ROW_PER_PAGE).map((data, i) => (
                <Row>
                  <RowContent width="150px">{data.date}</RowContent>
                  <RowContent width="350px">{data.product[0].name} {data.product.length > 1 && `외 ${data.product.length - 1}건`}</RowContent>
                  <RowContent width="150px">{data.status}</RowContent>
                  <RowContent width="200px">{data.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</RowContent>
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