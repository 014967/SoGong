import React from 'react';
import styled from 'styled-components';
import product from '../testData/product.json';
const PinkBars = styled.div`
background: #DF988F;
height : 0.1px;
width: 100%;
margin-bottom : 5px;

`

const ListComponent = styled.div`
width: 900px;
`
const StyleCB = styled.input`
margin-top : 30px;
width: 90px;
height: 40px;
border: 15px solid #DF988F;
border-radius: 8px;
opacity: 1;
`
const Stylediv = styled.div`
width : 100%;
display : flex;
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
const StyleImg = styled.img`
width : 100px;
height : 100px;
`

var productList = product.product;

const GetProductData = () =>
{
    return (
        <ListComponent>
            <div>
            {
                productList.map((s) =>
                {
                    return (
                        <div>
                        <Stylediv>
                            <StyleCB type="checkbox"/>
                            <StyleTitle width= "normal">
                            <StyleImg src={s.img}></StyleImg>
                            </StyleTitle>
                            <StyleTitle width="primary">{s.productTitle}</StyleTitle>
                            <StyleTitle width="normal">{s.price}</StyleTitle>
                            
                        </Stylediv>
                        <PinkBars/>
                        </div>
                        
                    )
                }
                )
                
            }
          


            </div>






        </ListComponent>

    )
}

export default GetProductData;