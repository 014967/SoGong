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

const SmallSearchBar = ({value, setValue}) => {


  const [text ,setText] = useState("");
  const [click, setClick ] = useState(false);
  const handleInput = e =>
  {
    setText(e.target.value);
  }
  useEffect(()=>
  {
    
  },[text])
  useEffect(()=>
  {
    console.log(click)

    if(click)
    {
      
      setValue(text)  

    }
  },[click])
    return (
      <Container>
        <Input onChange={handleInput} />
        <SearchButton style={{fontSize: 80}} 
        onClick={()=>
        {
          console.log("click")
          setClick(true)
        }}/>
      </Container>
    )
}

export default SmallSearchBar;
