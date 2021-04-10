import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import event from '../../testData/event.json';
import axios from 'axios'


const ListComponent = styled.div`

width: 900px;

`
const StyleCB = styled.input`
width: 164px;
height: 40px;
border: 15px solid #DF988F;
border-radius: 8px;
opacity: 1;
`
const Stylediv = styled.div`
width : 100%;
display : flex;
padding : 10px;
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

function returnAxios() {
  const promise = axios.get()
  const dataPromise = promise.then((response) => response.data)
  console.log(dataPromise)
  return dataPromise
}

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
      <div>
        {isLoading ? 'Loading...' : eventList.map(v => (
            <>
              <div>{v.title}</div>
              <div>{v.available ? '활성화' : '비활성화'}</div>
              <div>{v.date}~{v.due}</div>
            </>
          )
        )}
      </div>
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