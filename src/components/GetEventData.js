import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 112px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
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
text-align : center;
width : ${({width}) => handleWidth(width)};
font: normal normal 300 20px/29px Spoqa Han Sans Neo;
`

const GetEventData = () => {

  const [eventList, setEventList] = useState('vvv')
  const [isLoading, setIsLoading] = useState(true)

  const getEvents = async () => {
    const { data: events } = await axios.get("/api/events")
    console.log(events)
    setEventList(events)
    setIsLoading(false)
  }

  useEffect(() => {
    getEvents()
	}, [])

    return (
      <Container>
        {isLoading ? 'Loading...' : eventList.map(v => (
            <>
              <div>{v.title}</div>
              <div>{v.available ? '활성화' : '비활성화'}</div>
              <div>{v.date}~{v.due}</div>
            </>
          )
        )}
      </Container>
        // <ListComponent>
        // <div>
        //         {
        //           eventList.map((s) =>{
        //             return (
        //               <Stylediv>
        //                 <StyleCB type="checkbox"/>
        //                 <StyleTitle width="primary">{s.title}</StyleTitle>
        //                 <StyleTitle width="normal">{s.active}</StyleTitle>
        //                 <StyleTitle width="middle">{s.Date}</StyleTitle>
                       
                       
        //               </Stylediv>
        //             )
        //           })



        //         }

        // </div>
        // </ListComponent>
    )




}
export default GetEventData;