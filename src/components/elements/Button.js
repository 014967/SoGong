import React from 'react';
import styled from 'styled-components';

export const Stylebtn = styled.button`
width: 200px;
height: 40px;
margin-right : 10px;
background : ${({background}) => handleBackGroundType(background)}; 
color : #FFFFFF;
border-radius: 50px;
opacity: 1;
border-style : none;
&:focus{
  outline: none;
}
`

  export const handleBackGroundType = background =>
  {
    switch (background) 
      {
        case "primary":
          return "#D3D3D3";
        case "second":
          return "#DF988F";
        case "third":
          return "#B20A2C";
  
      }
  };

  export const Bars = styled.div`
      width : ${({width}) => handleWidth(width)};
  `
  export const PinkBars= styled.div`
  background : #DF988F;
  height : 0.1px;
  width : ${({width}) => handleWidth(width)};
  `

  export const handleWidth = width =>
  {
    switch(width)
    {
      case "100":
        return "100%";
      case "90":
        return "70%";
      case "80":
        return "70%";
      case "70":
        return "70%";
      case "60":
        return "60%"; 
      case "50":
        return "50%";
      case "40":
        return "40%";
      case "30":
        return "30%";
      case "20":
        return "20%";
      case "10":
        return "10%";
    }
  }

 



