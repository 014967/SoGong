import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import GetEventData from './GetEventData';



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


const NoticeComponent = styled.div`
width: 900px;
`
const Stylediv = styled.div`
width : 100;
display : flex;
padding : 10px;
`


 const StyleCB = styled.input`
margin-left : 31px;
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
const EventNotice= ()=>
{

    return(
    <NoticeComponent>
    <div>
    
      <Stylediv>

          <StyleCB type="checkbox" />
          <Button background="primary">선택 비활성화</Button>
          <Button background="primary">선택 활성화</Button>
          <Button background="primary">선택 삭제</Button>
          <Button background="second">정렬하기</Button>
          <Button background="second">필터링</Button>
          <Bars/>
          <Button background="third">등록</Button>
          
        </Stylediv>
          
          
         
     
      
        <PinkBars/>
      
           
          
          
            <Stylediv>
              <StyleTitle width="normal">선택</StyleTitle>
              <StyleTitle width="primary">제목</StyleTitle>
              <StyleTitle width ="normal">활성화/비활성화</StyleTitle>
              <StyleTitle width = "middle">진행기간</StyleTitle>
            </Stylediv>
            <PinkBars/>
           
           <Stylediv>
              <GetEventData/>



           </Stylediv>

        
      
        
       
     
     </div>
     </NoticeComponent>



    )

}
export default EventNotice;