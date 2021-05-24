import React, { useEffect, useState } from 'react';
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

const regDate = date => date.split('.')[0].replace('T','').replace('-','').replace(':','').replace(':','').slice(2)


const Product = ({selected}) => {

  const selectedProduct = selected;
  const history = useHistory();
  const location = useLocation();
  const [enterProduct, setEnterProduct] = useState(
    {
      enter : false,
      data : [],
      index : [],
    })
  const [alter , setAlter] = useState(false);


  const [order, setOrder] = useState("최신순");
  const orderList= ["최신순 ", "최저가 순" , "최고가 순"];


  const [filter , setFilter] = useState(false);
  const [checked, setChecked] = useState([false]);
  const [checkedAll ,setCheckedAll] = useState(false);
  const [modifiedFlag, setMoodifiedFlag] = useState(false);
  const [buttonColor, setButtonColor] = useState('disabled');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice , setMaxPrice] = useState(100000000);
  const [priceFlag , setPriceFlag] = useState(false);

  const [sorted , setSorted] = useState(false);
  const [value , setValue] = useState("");

  const [index, setIndex] = useState(0);

  const handleCheckedAll = () =>
  {
    setCheckedAll(prev=> !prev)
    
    setChecked(prev => [...prev.fill(!checkedAll)])
  }

  const handleDelete = async () => 
  {
    if(window.confirm('삭제하시곘습니까?'))
    {
    //  const ids = []
    //  const paths = []
     // checked.forEach((isChecked, i ) =>
      //{
       // if(isChecked)
        //{
         // ids.push(enterProduct.data[i]._id)
         // paths.push(enterProduct.data[i].imgPath)
       // }
      //})
     // const res = await axios.post('/api/products/delete', { productIds: ids})
      //.catch((err)=> console.log('error'))
      //const resImg = await axios.post('/productImgDel', { imgPaths : paths })
      //.catch((err) => console.log('error'))
      //.then(setEnterProduct(
       // {
        //  data : [],
          
        //}

      //),
      // console.log("location :" + location)
      // console.log("location state :" + location.state)
      //console.log("location state selected :" +location.state.selected)
      ( location.state  == undefined ) ?
      
      
        history.replace(
          {
            pathname : `/manager`,
          }
        )
      
      :
      
        history.replace(
        {
            pathname : `/manager`,
            state : {selected : location.state.selected},
        }
      )
      
  
    alert("삭제되었습니다")
    
    setMoodifiedFlag(true)
    
    
    }
  }
  
 

 
  const handleOrder = () => 
  {
    if(index === 2  )
    {
      setIndex(0)
    }
    else{
      setIndex(prev => prev+1)
    
    }
    setOrder(orderList[index])
   
  }

  
  useEffect(()=>
  {
    setOrder(orderList[index])
  }, [])


  const handleEnter = () => {
    
    console.log(selected)
    history.push(
      {
        pathname : '/manager/Enter/',
        state : {selected : selected},

      }
    )
    
    
  }
  
  

const handleFilter = () =>
{
    setFilter(prev => !prev)
}
 
 
const handleMinPrice = e =>
{
  setMinPrice(e.target.value);
}
const handleMaxPrice = e =>
{
  setMaxPrice(e.target.value);
}
  
  useEffect(()=>
  {
    if(enterProduct.enter !== null)
    {
      setCheckedAll(checked.every(v => v) && enterProduct.data !== Array(0))
      setButtonColor(checked.some(v=>v) ? 'secondary' : 'disabled')
  
    }
    
  }, [enterProduct.enter])

 
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
                      {
                        order
                      }
                    </HeaderButton>
                    <HeaderButton background="secondary" onClick={handleFilter}>
                    {
                      filter ? '가격필터링on' : '가격필터링off'
                    }
                    </HeaderButton>
                    {
                      filter ? 
                      <div>
                          <Input placeholder="상품 최소 가격" type='number' onChange={handleMinPrice} />
                          <Input placeholder="상품 최대 가격" type='number' onChange={handleMaxPrice} />
                          <button onClick= { ()=>
                          {
                              setPriceFlag(true);
                          }}>가격 설정</button>
                      </div> : null
                    }
                    <SmallSearchBar value={value} setValue={setValue}/>
                  </ButtonsContainer>
                  <Button background="primary" onClick={handleEnter}>등록</Button>
                </Header>
                <TableHeader>
                  <TableHeaderContent width="192px"></TableHeaderContent>
                  <TableHeaderContent width="704px">상품명</TableHeaderContent>
                  <TableHeaderContent width="140px">가격</TableHeaderContent>
                </TableHeader>
                {<GetProductData productList={enterProduct}  setEnterProduct= {setEnterProduct} setAlter = {setAlter} order = {order} setOrder = {setOrder} 
                maxPrice = {maxPrice} minPrice = {minPrice} priceFlag={priceFlag} sorted={sorted} setSorted ={ setSorted} value={value}
                 checked ={ checked } setChecked={setChecked} modifiedFlag={modifiedFlag} setMoodifiedFlag={setMoodifiedFlag}
                 selected={selected} /> }
              </>
            )
          }
      </Container>
  )
}

export default Product