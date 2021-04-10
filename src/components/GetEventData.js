import react from 'react';
import styled from 'styled-components';
import event from '../testData/event.json';


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


var eventList = event.event;

const GetEventData = () =>
{

    return (
        <ListComponent>
        <div>
                {
                  eventList.map((s) =>{
                    return (
                      <Stylediv>
                        <StyleCB type="checkbox"/>
                        <StyleTitle width="primary">{s.title}</StyleTitle>
                        <StyleTitle width="normal">{s.active}</StyleTitle>
                        <StyleTitle width="middle">{s.Date}</StyleTitle>
                       
                       
                      </Stylediv>
                    )
                  })



                }

        </div>
        </ListComponent>
    )




}
export default GetEventData;