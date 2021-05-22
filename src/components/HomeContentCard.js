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
`

const HomeContentCard = ({ img, title, desc }) => {
  return (
    <Container>
      <Image src={Img1} />
      <ContentTitle>
        {title}
      </ContentTitle>
      <ContentDesc>
        {desc}
      </ContentDesc>
    </Container>
  )
}

export default HomeContentCard