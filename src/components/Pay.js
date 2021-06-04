import React, { useState } from 'react';
import { useLocation } from 'react-router'
import styled from 'styled-components';
import axios from 'axios'
import Button from './elements/Button'
import { makeStyles } from '@material-ui/core/styles';
import Title from './elements/Title'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > *:last-child {
    margin-top: 32px;
  }
`

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  & > *:last-child {
    font-size: 28px;
    font-family: ${({ theme }) => theme.font.regular};
    margin-left: 32px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  & > *:first-child {
    width: 110px;
    color: ${({ theme }) => theme.color.secondary};
    font-family: ${({ theme }) => theme.font.bold};
    margin-right: 16px;
  }
`

const Image = styled.img`
  width: 200px;
  height: 200px;
`

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '1000px',
    padding: '64px 64px',
    boxShadow: '0px 10px 40px #00000029',
    borderRadius: '32px',
    background: 'white',
  },
}));

const Pay = ({ isWishList, data }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const location = useLocation()

  const handlePay = async () => {
    const other = data.product.length > 1 ? `외 ${data.product.length - 1}건` : ''
    const { data: user } = await axios.get('/api/auth')
    const { data: res } = await axios.post('/api/purchases', {
      user_id: user._id,
      product: data.product,
      totalPrice: data.totalPrice + data.deliveryFee,
      address: data.address,
      username : user.name,
    })
    const { data: qr } = await axios.post('/api/pay', {
      _id: user._id,
      name: `${data.product[0].name} ${data.product[0].quantity}개 ${other}`,
      totalPrice: data.totalPrice + data.deliveryFee
    })
    window.localStorage.setItem('_id', res._id)
    window.localStorage.setItem('history', location.pathname)
    window.localStorage.setItem('wishlist', isWishList)
    window.open(qr.qr, '_self')
  }

  return (
      <Container style={modalStyle} className={classes.paper}>
        <Title>PURCHASE</Title>
        <ProductContainer>
          <Image src={data.img} />
          <div>{data.product[0].name} {data.product[0].quantity}개 {data.product.length > 1 && ` 외 ${data.product.length - 1}건`}</div>
        </ProductContainer>
        <InfoContainer>
          <div>배송지</div>
          <div>{data.address}</div>
        </InfoContainer>
        <InfoContainer>
          <div>상품 금액</div>
          <div>{data.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</div>
        </InfoContainer>
        <InfoContainer>
          <div>배송비</div>
          <div>{data.deliveryFee.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원 (상품이 여러 개일 시 그 중 최대 배송비로 책정됩니다.)</div>
        </InfoContainer>
        <InfoContainer>
          <div>총 결제 금액</div>
          <b>{(data.totalPrice + data.deliveryFee).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</b>
        </InfoContainer>
        <Button background="primary" onClick={handlePay}>결제</Button>
      </Container>
  )
}

export default Pay
