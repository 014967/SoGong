import React ,{useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router';

import styled from 'styled-components';
import axios from 'axios';
import CheckBox from './elements/CheckBox';
import Button from './elements/Button';


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
margin-right : 10px;
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


const  GetProductData =  ({ setEnterProduct, checked, productList, setChecked, selected ,order, setOrder}) =>
{
  

  const history = useHistory();
  const [isLoading , setIsLoading] = useState(true);

  const [flag ,setFlag] = useState(false);
  
  const [productCount , setProductCount] = useState();

  const [page ,setPage] = useState();
  
  
  const pageCount = () =>
  {
      const result = [];
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
  const getProductList = async () => 
  {
    

   const {data : productLength} = await axios.get("/api/products/")
   setProductCount(productLength.length)
  

    const {data : products} = await axios.post("/api/products/unsorted",
    {
        page : page,
    })
    setEnterProduct(
      {
        data: products
      }
    )
    
    setChecked([...Array(products.length).fill(false)])
    setIsLoading(false)
     
   
    
  }
  const handleChecked = index => () => {
    setChecked(prev => [...prev.map((v,i) =>
      i === index ? !v : v
      )])
  }
  
  useEffect(()=>
  {
    getProductList()
  },[])

  useEffect(()=>
  {
    getProductList()
  },[page])
  

  
  
  useEffect(() =>
  {
    console.log(productList)
    if (productList.data !==Array(0))
    {
      
      if(productList.data.some(product => product.imgPath === 'no image'))
      {
        try{
          console.log('no image occured')
          setFlag(true)
    
        }
        catch(err)
        {
          console.log(err)
        }
        
      }
    }
  
  },[productList.data])
 
  useEffect(() =>{
    if(flag){
        setIsLoading(true)
        getProductList()
        setFlag(false)
    }

  },[flag])




    return (
   
      <Container>
      {
        
         isLoading ? 'Loading...' :  productList.data.map((data,index) =>
        (
          
          <Row key={data._id}>
            
          <CheckBox checked={checked[index]} onClick={handleChecked(index)} />   
          <div>
          {
            
            console.log("이미지 파일들 : " + data.img),
            
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
              pathname : `/product/${data._id}`,
              state : {data : data}
            })}} >확인</Button>
          <Button background="primary" onClick={ () =>
          {
            console.log(data)
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