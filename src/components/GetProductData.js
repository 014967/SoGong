import React ,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';

import styled from 'styled-components';
import product from '../testData/product.json';
import axios from 'axios';
import CheckBox from './elements/CheckBox';
import Button from './elements/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 64px;
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


var productList = product.product;


const GetProductData = ({setEnter, setAlter}) =>
{

  const history = useHistory();
  const [productList , setProductList] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [images , setImages]= useState([]);

  const getProductList = async () => 
  {
    const {data : products} = await axios.get("/api/products")
    setProductList(products)
    setIsLoading(false)
    setImages(products.map(product => product.img))
  }

  useEffect(()=>
  {
    getProductList()
    

  } , [])

  const clickButton = (data, index) => ()  =>
  {
    console.log(data, index);
    setEnter({ enter: true, data: data , index: index});
    setAlter(true);
  }

  


    return (
        <Container>
          {
            isLoading ? 'Loading...' : productList.map((data,index) =>
            (
              
              
              <Row key={index}>
              <CheckBox />
              <StyleImg src={require('../assets/images/products/' + data.img).default}/>
            
              <Title>{data.name}</Title>
              <Price>{data.price}</Price>
              <Button background="secondary" onClick= { () => {history.push(
                {
                  pathname : `/manager/${data._id}`,
                  state : {data : data}
                })}} >확인</Button>
              <Button background="primary" onClick={clickButton({data,index})}>수정</Button>
              </Row>
            )
            
            )
            
          }
        
        </Container>

    )
}

export default GetProductData;