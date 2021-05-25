import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { ProductListContext } from '../pages/App'
import ContentsWrapper from '../components/elements/ContentsWrapper'
import Title from '../components/elements/Title'
import ProductListCards from '../components/ProductListCards'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 218px;
`
const Result = styled.div`
  margin-bottom: 64px;
`

const Pagination = styled.div`
  display: flex;
`

const PageButton = styled.button`

`

const ProductList = () => {
  
  const [currentState, setCurrentState] = useState({
    category: 'ALL',
    search: '',
    startPrice: 0,
    endPrice: 100000
  })
  const { category, setCategory, search, setSearch,
        startPrice, setStartPrice, endPrice, setEndPrice,
        submitFlag, setSubmitFlag } = useContext(ProductListContext)
  const [products, setProducts] = useState([])

  const getProduct = async () => {
    const { data } = await axios.get("/api/products/")
    .catch(err => console.log(err))
    setProducts(data.filter(product => {
      let cate = ''
      if (product.category.includes('남성')) {
        cate = 'MEN'
      } else if (product.category.includes('여성')) {
        cate = 'WOMEN'
      } else {
        cate = 'KIDS'
      }
      return (
        product.available &&
        (cate === category || category === 'ALL') &&
        product.name.includes(search) &&
        product.price >= startPrice &&
        product.price <= endPrice
      )
    }))
    setCurrentState({
      category,
      search,
      startPrice,
      endPrice
    })
  }

  useEffect(() => {
    getProduct()
    return () => {
      setCategory('ALL')
      setSearch('')
      setStartPrice(0)
      setEndPrice('100000')
      setCurrentState({
        category: 'ALL',
        search: '',
        startPrice: 0,
        endPrice: 100000
      })
    }
  }, [])

  useEffect(() => {
    if (submitFlag) {
      getProduct()
      setSubmitFlag(false)
    }
  }, [submitFlag])

    return (
        <Wrapper>
            <ContentsWrapper>
              <Title>{currentState.category}</Title>
              <Result>
                {currentState.search.length !== 0 && `"${currentState.search}"`}
                {(currentState.startPrice !== 0 || currentState.endPrice !== 100000) && `, W${currentState.startPrice} ~ ${currentState.endPrice}`}
                {(currentState.search.length !== 0 || (currentState.startPrice !== 0 || currentState.endPrice !== 100000)) && '의 검색 결과입니다.'}
              </Result>
              <ProductListCards data={products} />
              <Pagination>
                <PageButton>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>3</PageButton>
              </Pagination>
            </ContentsWrapper>
        </Wrapper>
    );
};
export default ProductList;