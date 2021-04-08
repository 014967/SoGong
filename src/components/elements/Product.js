import React from 'react';
import styled from 'styled-components';
import {Stylebtn} from './Button';
import GetProductData from './GetProductData';

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
text-align : center;
width : ${({width}) => handleWidth(width)};
font: normal normal 300 20px/29px Spoqa Han Sans Neo;
`

const ProductComponent = styled.div`
width: 900px;
`
const Stylediv = styled.div`
width : 100;
display : flex;
padding : 10px;
`


 const StyleCB = styled.input`
width: 164px;
height: 40px;
border: 15px solid #DF988F;
border-radius: 8px;
opacity: 1;
`

const Bars = styled.div` 
      width : 30%;
`


const PinkBars = styled.div`
background: #DF988F;
height : 0.1px;
width: 100%;
`

const Product = () =>
{
    return (
        <ProductComponent>
            <>

            <Stylediv>

                <StyleCB type="checkbox" />
                <Stylebtn background="primary">선택 삭제</Stylebtn>
                <Stylebtn background="primary">정렬하기</Stylebtn>
                <Stylebtn background="primary">필터링</Stylebtn>
                <Bars/>
                <Bars/>
                <Stylebtn background="third">등록</Stylebtn>

            </Stylediv>
            <PinkBars/>
            <Stylediv>
              <Bars/>
              <StyleTitle width = "primary">상품명</StyleTitle>
              <StyleTitle width = "normal">가격</StyleTitle>
            </Stylediv>
            <PinkBars/>
            <PinkBars/>

            <Stylediv>



                <GetProductData/>
            </Stylediv>








            </>
        </ProductComponent>
    )
}

export default Product;