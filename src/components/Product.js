import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './elements/Button';
import HeaderButton from './elements/HeaderButton';
import GetProductData from './GetProductData';
import CheckBox from './elements/CheckBox'
import EnterProduct from './EnterProduct'
import SearchBar from './elements/SearchBar';
import { addYears } from 'date-fns';
import axios from 'axios';

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

const regDate = date => date.split('.')[0].replace('T','').replace('-','').replace(':','').replace(':','').slice(2)


const Product = () => {

  
  const [enterProduct, setEnterProduct] = useState(
    {
      enter : false,
      data : [],
      index : [],
    })

  const [alter , setAlter] = useState(false);
  const [order, setOrder] = useState(false)
  const [checked, setChecked] = useState([false]);
  const [checkedAll ,setCheckedAll] = useState(false);
  const [modifiedFlag, setMoodifiedFlag] = useState(false);
  const [buttonColor, setButtonColor] = useState('disabled');


  const handleCheckedAll = () =>
  {
    setCheckedAll(prev=> !prev)
    
    setChecked(prev => [...prev.fill(!checkedAll)])
  }

  const handleDelete = async () => 
  {
    if(window.confirm('삭제하시곘습니까?'))
    {
      const ids = []
      const paths = []
      checked.forEach((isChecked, i ) =>
      {
        if(isChecked)
        {
          ids.push(enterProduct.data[i]._id)
          paths.push(enterProduct.data[i].imgPath)
        }
      })
      const res = await axios.post('/api/products/delete', { productIds: ids})
      .catch((err)=> console.log('error'))
      const resImg = await axios.post('/productImgDel', { imgPaths : paths })
      .catch((err) => console.log('error'))
      .then(setEnterProduct(
        {
          data : []
        }
      ))
      .then(setMoodifiedFlag(true))
    }
  }
  
  const handleOrder = () => 
  {
     setOrder(prev => !prev)
  }
   

  const handleEnter = () => {
    setEnterProduct({...enterProduct, enter: true});
    
  }
  
  useEffect(()=>{
    if(order){
      setEnterProduct(
        {data : prev => [...prev.sort((h,t) => regDate(h.date)- regDate(t.date))]
        }
      )
    }
    else
    {
      setEnterProduct(
        {
          data: prev => [...prev.sort((h,t) => regDate(t.date) - regDate(h.date))]
        }
      )
    }
  } , [order])

  
  useEffect(()=>
  {
    setCheckedAll(checked.every(v => v) && enterProduct.data.length !== 0)
    setButtonColor(checked.some(v=>v) ? 'secondary' : 'disabled')
    
  })
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
                  <CheckBox checked={checkedAll} onClick={handleCheckedAll} />
                  <ButtonsContainer>
                    <HeaderButton background={buttonColor} onClick={handleDelete}>선택 삭제</HeaderButton>
                    <HeaderButton background="secondary" onClick={handleOrder}>
                      {
                        order ? '최신 순 ' : '오래된 순'
                      }
                    </HeaderButton>
                    <HeaderButton background="secondary">필터링</HeaderButton>
                    <SearchBar/>
                  </ButtonsContainer>
                  <Button background="primary" onClick={handleEnter}>등록</Button>
                </Header>
                <TableHeader>
                  <TableHeaderContent width="192px"></TableHeaderContent>
                  <TableHeaderContent width="704px">상품명</TableHeaderContent>
                  <TableHeaderContent width="140px">가격</TableHeaderContent>
                </TableHeader>
                {<GetProductData productList={enterProduct.data}  setEnter= {setEnterProduct} setAlter = {setAlter}
                 checked ={ checked } setChecked={setChecked} modifiedFlag={modifiedFlag} setMoodifiedFlag={setMoodifiedFlag} /> }
              </>
            )
          }
      </Container>
  )
}

export default Product