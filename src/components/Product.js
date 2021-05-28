import React, { useEffect, useState , useLayoutEffect } from 'react';
import styled from 'styled-components';
import Button from './elements/Button';
import HeaderButton from './elements/HeaderButton';
import GetProductData from './GetProductData';
import CheckBox from './elements/CheckBox'
import EnterProduct from './EnterProduct'
import SmallSearchBar from './elements/SmallSeacrhBar';
import { addYears } from 'date-fns';
import axios from 'axios';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 48px;
    width: 150px;
    max-width: 150px;

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

const FilterBox = styled.div`
display: flex;
`

const Product = ({selected, history}) => {

  const location = useLocation();
  const [enterProduct, setEnterProduct] = useState({
    enter : false,
    data : [],
    index : [],
  })
  const [alter , setAlter] = useState(false);

  const [filter , setFilter] = useState(false);
  const [checked, setChecked] = useState([false]);
  const [checkedAll ,setCheckedAll] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [buttonColor, setButtonColor] = useState('disabled');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice , setMaxPrice] = useState(10000000);

  const [priceFlag , setPriceFlag] = useState(false);
  const [value , setValue] = useState("");
  const [index, setIndex] = useState(0);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const [order, setOrder] = useState(null);
  const [orderText, setOrderText] = useState("최신순");

  const [submit, setSubmit] = useState(false);

  const handleCheckedAll = () => {
    setCheckedAll(prev=> !prev)
    setChecked(prev => [...prev.fill(!checkedAll)])
  }

  const handleDelete = async () => {
    if(window.confirm('삭제하시곘습니까?')) {
      const Ids = []
      checked.forEach((isChecked, i) => {
        if(isChecked) {
          Ids.push(enterProduct.data[i]._id)
        }
      })
      const res = await axios.post('/api/products/unavailable' , { productIds : Ids})
      .catch((error) => console.log('error'))
    }

    location.state  == undefined ?
      history.replace({ pathname : `/manager` }) :
      history.replace({
          pathname : `/manager`,
          state : {selected : location.state.selected},
      })
      
    alert("삭제되었습니다.")
    setDeleteFlag(true)
  }

  const handleOrder = () => {
     setOrder(prev => {
      if (prev === null)
        return 'asc'
      else if (prev === 'asc')
        return '-1'
      else return null
    })
  }

  const handleEnter = () => {
    history.push({
      pathname : '/manager/Enter/',
      state : {selected : selected},
    })
  }

  const handleFilter = () => {
    setFilter(prev => !prev)
  }
  
  
  const handleMinPrice = e => {
    setMinPrice(e.target.value);
  }
  const handleMaxPrice = e => {
    setMaxPrice(e.target.value);
  }
  
  useEffect(() => {
    if(enterProduct.enter !== null) {
      setCheckedAll(checked.every(v => v) && enterProduct.data !== Array(0))
      setButtonColor(checked.some(v=>v) ? 'secondary' : 'disabled')
    }
  }, [enterProduct.enter])

  useEffect(() => {
    setCheckedAll(checked.every(v => v) && enterProduct.data !== Array(0))
    setButtonColor(checked.some(v => v) ? 'secondary' : 'disabled')
  }, [checked])

  
  const getText = (props) => {
    const result = [];
   console.log("props : " +props)
    if(props ===false)
    {
     console.log("di") 
      result.push("최신 순")
    }
    if(order === null) {
      result.push("최신순")
    }
    else if(order === "asc") {
      result.push("최저가 순")
    }
    else if (order ==="-1") {
      result.push("최고가 순")
    }
    return result;
  }

  useEffect(()=>
  {
    if(filter === false)
    { 
      getText(false)
  
    }
    },[filter])
  return (
      <Container>
          {
            enterProduct.enter ? (
              <EnterProduct enter ={enterProduct} setEnter={setEnterProduct} alter={alter} setAlter={setAlter} />
            ) : (
              <>
                <Header>
                  <CheckBox checked={checkedAll} onChange={handleCheckedAll} />
                  <ButtonsContainer>
                    <HeaderButton background={buttonColor} onClick={handleDelete}>선택 삭제</HeaderButton>
                    <HeaderButton background="secondary" onClick={handleOrder}>
                      { getText() }
                    </HeaderButton>
                    <HeaderButton background="secondary" onClick={handleFilter}>
                    { filter ? '필터링on' : '필터링off' }
                    </HeaderButton>
                    { filter ? 
                      <FilterBox>
                          <Input  placeholder="상품 최소 가격" type='number' min="0" max="200000" onChange={handleMinPrice} />
                          <Input  placeholder="상품 최대 가격" type='number' min="0" max="200000" onChange={handleMaxPrice} />
                          <SmallSearchBar value={value} setValue={setValue} setSubmit={setSubmit}/>
                      </FilterBox> : null }
                    <HeaderButton right background="primary" onClick={handleEnter}>등록</HeaderButton>
                  </ButtonsContainer>
                </Header>
                <TableHeader>
                  <TableHeaderContent width="100px">사진</TableHeaderContent>
                  <TableHeaderContent width="600px">상품명</TableHeaderContent>
                  <TableHeaderContent width="200px">가격</TableHeaderContent>
                </TableHeader>
                {<GetProductData productList={enterProduct} setEnterProduct={setEnterProduct} setAlter={setAlter} order={order} setOrder={setOrder} 
                maxPrice={maxPrice} minPrice={minPrice} value={value} filter={filter} priceFlag={priceFlag}
                 checked={checked} setChecked={setChecked} modifiedFlag={modifiedFlag} setModifiedFlag={setModifiedFlag} history={history}
                 selected={selected} 
                 submit={submit} setSubmit={setSubmit} deleteFlag={deleteFlag} setDeleteFlag={setDeleteFlag} getText={getText} /> }
              </>
            )
          }
      </Container>
  )
}

export default Product