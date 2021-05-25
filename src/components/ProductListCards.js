import React from 'react'
import styled from 'styled-components'
import ProductListCard from './ProductListCard'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 48px;
  /* & > * + * {
    margin-left: 20px;
  } */
`

const ProductListCards = ({ data }) => {
  return (
    <Container>
      {data && data.map((card, i) => (
        <ProductListCard key={i}
          img={card.img}
          title={card.name}
          desc={card.price}
          pid={card._id}
        />
      ))}
    </Container>
  )
}

export default ProductListCards