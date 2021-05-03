import styled from 'styled-components';

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