import React, { useState } from 'react';
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
const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > *:first-child {
    margin-right: 64px;
  }
  & > *:last-child {
    margin-left: 64px;
  }
`
const Title2 = styled.div`
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
  padding: 0 242px 0 120px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`
const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 64px;
  & > * + * {
    margin-left: 16px;
  };
`
const ButtonsContainer2 = styled.div`
  display: flex;
  width: 100%;
  padding-left: 64px;
  justify-content : flex-end;
  margin-top : 10px;
  margin-bottom : 10px;
  & > * + * {
    margin-left: 16px;
  };
`
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const WishListContents = () => {
  const [selected, setSelected] = useState('event');



    return (
        <ContentsWrapper wide>
          <Title>장바구니</Title>
          <Container>
          
          <TableHeader>
          <TableHeaderContent width="619px">이미지</TableHeaderContent>
                  <TableHeaderContent width="619px">상품명</TableHeaderContent>
                  <TableHeaderContent width="201px">수량</TableHeaderContent>
                  <TableHeaderContent width="201px">상품 주문 금액</TableHeaderContent>
          </TableHeader>
          <Row>
              <CheckBox />
              <Title2>상품_이미지.png</Title2>
              <Available>k-sinsa 바지</Available>
              <DateRange>3</DateRange>
              <DateRange>90,000</DateRange>
              <Button background="primary">수정</Button>
            </Row>
          </Container>
          <Row>
              총 금액
          </Row>
          <ButtonsContainer2>
          <Button>결제하기</Button>
          </ButtonsContainer2>
          
        </ContentsWrapper>
    );
}

export default WishListContents