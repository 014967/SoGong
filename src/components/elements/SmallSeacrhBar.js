import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Search from '@material-ui/icons/Search'

const Container = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 200px;
  max-width: 200px;
  height: 60px;
  padding: 24px;

  &:focus {
    outline: none;
  }
  border-style: solid;
  border-image: linear-gradient(
    to right, 
    ${({ theme }) => theme.color.gradient} 0%,
    ${({ theme }) => theme.color.primary} 100%
  );
  border-image-slice: 1;
  border-image-width: 8px;
  background: ${({ theme }) => theme.color.background};

  font-size: 32px;
  font-family: ${({ theme }) => theme.font.regular};
`

const SearchButton = styled(Search)`
  color: ${({ theme }) => theme.color.primary};
  margin-left: 12px;
`

const SmallSearchBar = ({value, setValue,setSubmit}) => {


  const [text ,setText] = useState("");
  const [click, setClick ] = useState(false);
  const handleInput = e =>
  {
    setText(e.target.value);
  }
  useEffect(()=>
  {
    
    setValue(text)  
  },[text])
 


    return (
      <Container>
        <Input  onChange={handleInput} placeholder="단어 입력"/>
       
      </Container>
    )
}

export default SmallSearchBar;
/* <SearchButton style={{fontSize: 80}} 
onClick={()=>
  {
    console.log("click")
    setClick(true)
  }}/>*/