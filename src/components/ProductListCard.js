import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 252px;
  margin: 0 8px 48px;
  & > * + * {
    margin-top: 8px;
  }
  cursor: pointer;
`
const Image = styled.img`
  width: 252px;
  height: 252px;
`
const ContentTitle = styled.h3`
  font-size: 28px;
  font-family: ${({ theme }) => theme.font.medium};
`
const ContentDesc = styled.div`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.regular};
  text-align: center;
  margin-top: 4px;
  color: ${({ theme }) => theme.color.secondary};
`

const ProductListCard = ({ img, title, desc, pid }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/product/${pid}`)
  }

  return (
    <Container onClick={handleClick}>
      <Image src={img} />
      <ContentTitle>
        {title}
      </ContentTitle>
      <ContentDesc>
        &#8361;{desc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
      </ContentDesc>
    </Container>
  )
}

export default ProductListCard