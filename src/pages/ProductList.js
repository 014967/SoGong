import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router'
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
    padding-top: 320px;
`
const Result = styled.div`
  margin-bottom: 64px;
`

const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 64px;
  & > * + * {
    margin-left: 16px;
  }
`

const PageButton = styled.button`
  color: ${(props) => props.theme.color[props.color] || props.theme.color.secondary};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`

const ProductList = () => {
  const { category, setCategory, search, setSearch,
        startPrice, setStartPrice, endPrice, setEndPrice,
        currentState, setCurrentState, submitFlag, setSubmitFlag } = useContext(ProductListContext)

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const getProduct = async () => {
    const { data } = await axios.get("/api/products/")
    .catch(err => console.log(err))

    const temp = data.filter(product => {
      let cate = ''
      if (product.category.includes('Man')) {
        cate = 'MEN'
      } else if (product.category.includes('Woman')) {
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
    })
    temp.reverse()
    const temp2 = [] //20개씩 slice
    for (let i = 0; i < Math.floor(temp.length / 20) + 1; i++) {
      if (temp.length - i * 20 < 20) {
        temp2[temp2.length] = temp.slice(i * 20)
      } else {
        temp2[temp2.length] = temp.slice(i * 20, (i + 1) * 20)
      }
    }
    console.log(temp2)
    setProducts(temp2)

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
      setEndPrice(200000)
      setCurrentState({
        category: 'ALL',
        search: '',
        startPrice: 0,
        endPrice: 200000
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
                {(currentState.startPrice !== 0 || currentState.endPrice !== 200000) && ` ₩${currentState.startPrice} ~ ₩${currentState.endPrice}`}
                {(currentState.search.length !== 0 || (currentState.startPrice !== 0 || currentState.endPrice !== 200000)) && '의 검색 결과입니다.'}
              </Result>
              <ProductListCards data={products[page - 1]} />
              <Pagination>
                {products.map((p, i) => (
                  <PageButton key={i} 
                  color={i + 1 === page && 'primary'}
                  onClick={() => setPage(i + 1)}>{i + 1}</PageButton>
                ))}
              </Pagination>
            </ContentsWrapper>
        </Wrapper>
    );
};
export default ProductList;