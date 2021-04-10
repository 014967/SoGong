import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './elements/Button';
import GetEventData from './elements/GetEventData';
import CheckBox from './elements/CheckBox'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
  }
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

const EventNotice = () => {
  return (
    <Container>
      <Header>
        <CheckBox />
        <ButtonsContainer>
          <Button background="disabled">선택 비활성화</Button>
          <Button background="disabled">선택 활성화</Button>
          <Button background="disabled">선택 삭제</Button>
          <Button background="secondary">정렬하기</Button>
          <Button background="secondary">필터링</Button>
        </ButtonsContainer>
      </Header>
      <TableHeader>
        <TableHeaderContent width="619px">제목</TableHeaderContent>
        <TableHeaderContent width="201px">활성화/비활성화</TableHeaderContent>
        <TableHeaderContent width="185px">진행기간</TableHeaderContent>
      </TableHeader>
      <GetEventData />
    </Container>
  )
}

// const handleWidth = width =>
// {
//   switch(width)
//   {
//     case "primary":
//       return "40%";
//     case "normal":
//       return "20%";
//     case "middle":
//       return "50%";
//   }
// };

// const StyleTitle = styled.div`
// text-align : center;
// width : ${({width}) => handleWidth(width)};
// font: normal normal 300 20px/29px Spoqa Han Sans Neo;
// `

// const NoticeComponent = styled.div`
// width: 900px;
// `
// const Stylediv = styled.div`
// width : 100;
// display : flex;
// padding : 10px;
// `


//  const StyleCB = styled.input`
// margin-left : 31px;
// width: 164px;
// height: 40px;
// border: 15px solid #DF988F;
// border-radius: 8px;
// opacity: 1;
// `

// const Bars = styled.div` 
//       width : 30%;
// `


// const PinkBars = styled.div`
// background: #DF988F;
// height : 0.1px;
// width: 100%;

// `
// const EventNotice = () => {
//     return (
//     <NoticeComponent>
//     <div>
//       <Stylediv>
//           <StyleCB type="checkbox" />
//           <Button background="primary">선택 비활성화</Button>
//           <Button background="primary">선택 활성화</Button>
//           <Button background="primary">선택 삭제</Button>
//           <Button background="secondary">정렬하기</Button>
//           <Button background="secondary">필터링</Button>
//           <Bars/>
//           <Button background="third">등록</Button>
//         </Stylediv>
//         <PinkBars/>
//             <Stylediv>
//               <StyleTitle width="normal">선택</StyleTitle>
//               <StyleTitle width="primary">제목</StyleTitle>
//               <StyleTitle width ="normal">활성화/비활성화</StyleTitle>
//               <StyleTitle width = "middle">진행기간</StyleTitle>
//             </Stylediv>
//             <PinkBars/>
//            <Stylediv>
//               <GetEventData/>
//            </Stylediv>
//      </div>
//      </NoticeComponent>
//     )
// }

export default EventNotice