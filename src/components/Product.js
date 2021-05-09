import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './elements/Button';
import GetProductData from './GetProductData';
import CheckBox from './elements/CheckBox'
import EnterProduct from './EnterProduct'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 64px;
  & > * + * {
    margin-left: 16px;
  };
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

const Product = () => {

  const [enterProduct, setEnterProduct] = useState(
    {
      enter : false,
      data : null,
      index : null,
    })

  const [alter , setAlter] = useState(false);

  

  const handleEnter = () => {
    setEnterProduct({...enterProduct, enter: true});
    
  }

  useEffect(() =>
  {
    console.log(enterProduct);
    
  },[enterProduct])


  return (
      <Container>
        
          {
            
            enterProduct.enter ? (
              
              <EnterProduct enter ={enterProduct} setEnter={setEnterProduct} alter={alter} />
            ) : (
              <>
                <Header>
                  <CheckBox />
                  <ButtonsContainer>
                    <Button background="disabled">선택 삭제</Button>
                    <Button background="secondary">정렬하기</Button>
                    <Button background="secondary">필터링</Button>
                  </ButtonsContainer>
                  <Button background="primary" onClick={handleEnter}>등록</Button>
                </Header>
                <TableHeader>
                  <TableHeaderContent width="192px"></TableHeaderContent>
                  <TableHeaderContent width="704px">상품명</TableHeaderContent>
                  <TableHeaderContent width="140px">가격</TableHeaderContent>
                </TableHeader>
                {<GetProductData setEnter= {setEnterProduct} setAlter = {setAlter}/> }
              </>
            )
          }
      </Container>
  )
}

export default Product