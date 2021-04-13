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





