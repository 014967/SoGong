import React from 'react';
import Postcode from 'react-daum-postcode'
import styled from 'styled-components'

const PopContainer = styled.div`
position: fixed;
background: #00000050;
width: 50%;
  padding : 100px 100px 100px ;

margin-top : 30px;

`;

const innerContainer = styled.div`
width: 70%;
margin: 0 auto;
height: auto;
max-height: 70vh;
margin-top: calc(100vh - 85vh - 20px);
background: #fff;
border-radius: 4px;
padding: 20px;
border: 1px solid #999;
overflow: auto;
`


const DaumPop = ({isOpen, setIsOpen ,setAddress}) => 
{
    
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setIsOpen(false);
        setAddress(fullAddress);
        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
      }

    return (
        <PopContainer>
            <innerContainer>
            <Postcode onComplete={handleComplete} />
            </innerContainer>
        </PopContainer>
    )
}
export default DaumPop;