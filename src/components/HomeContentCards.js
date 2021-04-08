import React from 'react'
import styled from 'styled-components'
import HomeContentCard from './HomeContentCard'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 48px;
`

const HomeContentCards = ({ data }) => {
  return (
    <Container>
      {data.map((card, i) => (
        <HomeContentCard key={i}
          img={card.img}
          title={card.title}
          desc={card.desc}
        />
      ))}
    </Container>
  )
}

export default HomeContentCards