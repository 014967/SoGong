import React from 'react'
import styled from 'styled-components'
import Img1 from '../assets/images/item1.PNG'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 504px;
  margin-bottom: 48px;
  & > * + * {
    margin-top: 16px;
  }
  cursor: pointer;
`
const Image = styled.img`
  width: 504px;
  height: 504px;
`
const ContentTitle = styled.h3`
  font-size: 48px;
  font-family: ${({ theme }) => theme.font.medium};
`
const ContentDesc = styled.div`
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.regular};
  text-align: center;
  margin-top: 8px;
  color: ${({ theme }) => theme.color.secondary};
`

const HomeContentCard = ({ img, title, desc }) => {
  return (
    <Container>
      <Image src={require('../assets/images/products/' + img).default} />
      <ContentTitle>
        {title}
      </ContentTitle>
      <ContentDesc>
        &#8361;{desc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
      </ContentDesc>
    </Container>
  )
}

export default HomeContentCard