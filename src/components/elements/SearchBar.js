import React from 'react'
import styled from 'styled-components'
import Search from '@material-ui/icons/Search'

const Container = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 432px;
  max-width: 432px;
  height: 80px;
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

const SearchBar = () => {
    return (
      <Container>
        <Input />
        <SearchButton style={{fontSize: 80}} />
      </Container>
    )
}

export default SearchBar;
