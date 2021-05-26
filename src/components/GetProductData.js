import React ,{useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router';

import styled from 'styled-components';
import axios from 'axios';
import CheckBox from './elements/CheckBox';
import Button from './elements/Button';
import { AirlineSeatLegroomReducedRounded, CompareSharp } from '@material-ui/icons';
import { set } from 'js-cookie';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 64px;
`
const PageContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content: center;
  margin-top : 100px;


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
  & + & {
    margin-left: 16px;
  }
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
const Title = styled.div`
  width: 619px;
  text-align: center;
`

const Price = styled.div`
  width: 201px;
  text-align: center;
`
const StyleImg = styled.img`
width : 100px;
height : 100px;
`

const handleWidth = width =>
{
  switch(width)
  {
    case "primary":
      return "40%";
    case "normal":
      return "20%";
    case "middle":
      return "50%";
  }
};

const StyleTitle = styled.div`
line-height: 1.5;
vertical-align : middle;
width : ${({width}) => handleWidth(width)};
font: normal normal 300 20px/29px Spoqa Han Sans Neo;
`

const regDate = date => date.split('.')[0].replace('T', ' ').replace('-', '.').replace('-', '.').slice(2)


const  GetProductData =  ({ setEnterProduct, checked, productList, setChecked, selected ,order, filter,
    minPrice, maxPrice,   value  ,history , submit ,setSubmit ,modifiedFlag ,setModifiedFlag ,setDeleteFlag , deleteFlag,getText}) =>
{

 

  const [isLoading , setIsLoading] = useState(true);

  const [flag ,setFlag] = useState(false);
  
  const [productCount , setProductCount] = useState();

  const [page ,setPage] = useState(1);

  const [option ,setOption] = useState({
    order : null,
    search : "",
    min : 0,
    max : 200000,
    page : 1,
  })

 

 

  useEffect(()=>
  {
    setOption(option => ({...option , order : order}));
  },[order])

  useEffect(()=>
  {
    setOption(option => ({...option , search : value}));
  },[value])
  useEffect(()=>
  {
    if(minPrice=="")
    {
      setOption(option => ({...option, min : "0"}))
    }
    else
    setOption(option => ({...option , min : minPrice}));
  },[minPrice])
  useEffect(()=>
  {
    if(maxPrice=="")
    {
      setOption(option => ({...option, max : "200000"}))
    }
    else
    setOption(option => ({...option , max : maxPrice}));
  },[maxPrice])
  useEffect(()=>
  {
    console.log(page)

    setOption(option => ({...option , page : page}));
  },[page])



  useEffect(()=>
  {
    console.log(option)
    console.log("option")
    getProductList(option)
  },[option])


useEffect(()=>
{
  
  if(filter==false)
  {
    console.log("필터 " + filter)
    setOption(option => ({...option, order : null , min : 0 , max : 200000 , search : ""}));
  }
  else{
    console.log("필터 " + filter)
  }

},[filter])


  useEffect(() =>
  {
    if (productList.data !==Array(0))
    {
      
      if(productList.data.some(product => product.imgPath === 'no image'))
      {
        try{
          console.log('no image occured')
          setModifiedFlag(true)
    
        }
        catch(err)
        {
          console.log(err)
        }
        
      }
    }
  
  },[productList.data])
 
  useEffect(() =>{
    if(modifiedFlag){
        setIsLoading(true)
        getProductList()
        setModifiedFlag(false)
    }

  },[modifiedFlag])

  useEffect(()=>
  {
    if(deleteFlag == true)
    {
      setOption(option => ({...option , order : null}));
    }
    setDeleteFlag(false);
  } ,[deleteFlag])


  useEffect(()=>
  {
    console.log(productCount)
    pageCount()
  },[productCount])

  const pageCount = () => {
    const result = [];
    console.log("pageCount  실행" + productCount)
    for(let i =0; i<= productCount/10 ; i++)
    {
      result.push(
        <PageButton key={i+1} onClick={()=>
        {
          setPage(i+1)

         
        }
        }>{i+1}</PageButton>
      )
    }
  return result;
}



const getProductList = async (option) => {
  const {data : productLength} = await axios.get("/api/products/")
  
  setProductCount(productLength.length)

  
  
  if(filter)
  {
    


    if( typeof option !=="undefined" && option.order !== null) {
      console.log("옵션 필터 " + option.page)
      //const sortedPage = await axios.post('/api/products/sorted/') //하나는 전체를 가져오는 api 이것을 통해서 페이징을 넘긴다. 해당하는 옵션에 해당하는 개수를 가져와야함
      //console.log(sortedPage.length)
      //setProductCount(sortedPage.length)

      const {data : sortedProducts} = await axios.post("/api/products/sorted/", {  //여기는 옵션의 page를 가져와서 해당하는 옵션의 page를 보여줘야함
        search : option.search,
        order : option.order,
        page : option.page,
        min : option.min,
        max : option.max,
        available : "available",
    }
    )
  
    console.log(sortedProducts)
    setProductCount(sortedProducts.length)
    
    setSubmit(prev => !prev)
    setEnterProduct({ data: sortedProducts })
    setChecked([...Array(sortedProducts.length).fill(false)])
      
    } 
    else //option.order ==null (최신순) 
    {

      console.log("최신 순 필터 " + page)
      const {data : products} = await axios.post("/api/products/unsorted", {
        page : page,
        search : value,
        min : minPrice,
        max : maxPrice,
        available : "available",
      })
      console.log(products)
      
      setProductCount(products.length)
      setEnterProduct(
        {
          data: products,
        }
      )
      setChecked([...Array(products.length).fill(false)])
    }

  }
  else //필터링 오프
  {

    
    if( typeof option !=="undefined" && option.order !== null) {
      console.log("필터링 없는 옵션 page " +option.page) // 사용자가 원하는 page를 찍게 됌. 
      const {data : sortedProducts} = await axios.post("/api/products/sorted", {
        search : option.search,
        order : option.order,
        page : option.page, //option을 통해서 사용자가 원하는 데이터를 가져온다 .
        min : option.min,
        max : option.max,
        available : "available",
    }
    )
  
    console.log(sortedProducts)
    //setProductCount(sortedProducts.length)
    
    setSubmit(prev => !prev)
    setEnterProduct({ data: sortedProducts })
    setChecked([...Array(sortedProducts.length).fill(false)])
      
    } 
    else //option.order ==null (최신순) 
    {
      console.log("최신순 노 필터 " + page)
      const {data : products} = await axios.post("/api/products/unsorted", {
        page : page, //기본 default 페이지 1을  1에 해당하는 데이터들을 가져오게된다.
        search : value,
        min : 0,
        max : 100000,
        available : "available",
      })
      setProductCount(productLength.length)
      setEnterProduct(
        {
          data: products,
        }
      )
      setChecked([...Array(products.length).fill(false)])
    }
   



  }
  
  
  
  
  setIsLoading(false)
}

const handleChecked = index => () => {
  setChecked(prev => [...prev.map((v,i) =>
    i === index ? !v : v
    )])
}







    return (
   
      <Container>
      {
        
         isLoading ? 'Loading...' :  productList.data.map((data,index) =>
        (
          
          <Row key={data._id}>
            
          <CheckBox checked={checked[index]} onChange={handleChecked(index)} />   
          <div>
          {
            
          
            
            flag ? 
              "이미지준비중" :
              <StyleImg src={require('../assets/images/products/' + data.img).default}
              onError={(e)=>
                {
                  console.log(e);
                }}/> 
            
          
           
          }
          </div>
          <Title>{data.name}</Title>
          <Price>{data.price}</Price>
          <Button background="secondary" onClick= { () => {history.push(
            {
              pathname : `/manager/product/${data._id}/`,
              state : {data : data}
            })}} >확인</Button>
          <Button background="primary" onClick={ () =>
          {
            history.push(
              {
                pathname : `/manager/Alter/`,
                state : {data: data , selected : selected }
              }
            )
          }} >수정</Button>
          </Row>
          
        )
        
        )
        
      }
    { 
      
          <PageContainer>
          {
            pageCount()
          }
          </PageContainer>
        
   
    }
    </Container>
    )
}

export default GetProductData;