import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import HomeContentCards from './HomeContentCards'

// data = {
//   available: true
//   category: "남성 상의"
//   date: "2021-05-23T13:09:30.276Z"
//   detail: "4"
//   detailImg: []
//   detailImgPath: []
//   img: "1621742970391_1621488599029_1.png"
//   imgPath: "../assets/images/products/1621742970391_1621488599029_1.png"
//   name: "0523130930"
//   price: 4
//   productNo: 0
//   stock: 4
//   token: false
//   __v: 0
//   _id: "60a9d57aeade87699b3cc861"
// }

const HomeContents = () => {

  const [data, setData] = useState([])

  const getNewProduct = async () => {
    const { data: products } = await axios.get("/api/products/")
    .catch(err => console.log(err))
    setData(products.filter(v => v.available).reverse().slice(0, 4))
  }

  useEffect(() => {
    getNewProduct()
  }, [])

  return (
    <ContentsWrapper>
      <Title>NEW</Title>
      <HomeContentCards data={data} />
    </ContentsWrapper>
  );
}

export default HomeContents