import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import Button from './elements/Button';
import CheckBox from './elements/CheckBox'
import { WishListContext } from '../pages/App'
import { LoginContext } from '../pages/App'
import Modal from '@material-ui/core/Modal';
import Pay from './Pay'
import { TrendingUpOutlined } from '@material-ui/icons';

const Container = styled.div`
  
  width: 100%;
  margin-top: 96px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > *:first-child {
    margin-right: 64px;
  }
`
const Image = styled.img`
  width: 100px;
  height: 100px;
`

const Name = styled.div`
  width: 475px;
  text-align: center;
`

const Quantity = styled.input`
  width: 51px;
  margin: 0 42px;
  text-align: center;
  border: none;
  height: 40px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
  &:focus {
    outline: none;
  }

`
const Price = styled.div`
  width: 245px;
  text-align: center;
`
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > * + * {
    margin-left: 32px;
  }
`
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px 0 120px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 64px;
  justify-content : flex-end;
  margin-top : 16px;
  margin-bottom : 64px;
  & > * + * {
    margin-left: 16px;
  };
`

const WishListContents = () => {
  const [wishList, setWishList] = useState([])
  const [checked, setChecked] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [buttonColor, setButtonColor] = useState('disabled')
  const [quantity, setQuantity] = useState([])
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState(false)
  const { setWishListFlag } = useContext(WishListContext)

  const history = useHistory()

  const getWishList = async () => {
    const { data: wl } = await axios.get('/api/wishlist')
    if (!wl.wishlist) return
    
    wl.wishlist.forEach(v => {
      setQuantity(prev => [...prev, v.quantity])
    })
    setWishList(await Promise.all(wl.wishlist.map(async wishlist => {
      const { data: product } = await axios.get(`/api/products/${wishlist.id}`)
      return {
        ...wishlist,
        product: product[0]
      }
    })))
    setChecked([...Array(wl.wishlist.length).fill(false)])
  }
  const handleChecked = index => () => {
    setChecked(prev => [...prev.map((v, i) => 
      i === index ? !v : v
    )])
  }
  const handleCheckedAll = () => {
    setCheckedAll(prev => !prev)
    setChecked(prev => [...prev.fill(!checkedAll)])
  }
  
  const handleOpen = async () => {
    if (wishList.length !== 0) {
      const { data: ad } = await axios.get('/api/delivery')
      if (!ad.delivery) {
        alert('등록된 배송지가 없습니다.')
        return
      }
      if (ad.delivery.length === 0) {
        alert('등록된 배송지가 없습니다.')
        return
      }
      setAddress(ad.delivery[0].address + ', ' + ad.delivery[0].detailaddress)
      setOpen(true)
    } else {
      alert('장바구니에 상품이 없습니다.')
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const ids = []
      console.log(wishList)
      checked.forEach((isChecked, i) => {
        if (isChecked) {
          ids.push(wishList[i].id)
          console.log(ids)
        }
      })
      const {data: res} = await axios.post(`/api/removeFromwishlist`, {
        productIds: ids
      })
      setWishListFlag(true)
      getWishList()
    }
  }

  const handleQuantity = (e, index) => {
    setQuantity(prev => [...prev.map((v, i) => 
      i === index ? Math.floor(e.target.value) : v
    )])
  }

  const checkLogin = async () => {
    const { data: response } = await axios.get('/api/auth')
    console.log(response.isAuth)
    if (response.isAuth)
      getWishList()
    else {
      alert('먼저 로그인 해주세요.')
      history.push('/')
    }
  }

  useEffect(() => {
    checkLogin()

  }, [])

  useEffect(() => {
    setCheckedAll(checked.every(v => v) && wishList.length !== 0)
    setButtonColor(checked.some(v => v) ? 'secondary' : 'disabled')
    console.log(wishList)
  }, [checked])


    return (
        <ContentsWrapper>
          <Title>장바구니</Title>
          <Container>
          <Header>
            <CheckBox checked={checkedAll} onChange={handleCheckedAll} />
            <Button background={buttonColor} onClick={handleDelete}>선택 삭제</Button>
          </Header>
          <TableHeader>
          <TableHeaderContent width="100px">이미지</TableHeaderContent>
            <TableHeaderContent width="485px">상품명</TableHeaderContent>
            <TableHeaderContent width="137px">수량</TableHeaderContent>
            <TableHeaderContent width="250px">금액</TableHeaderContent>
          </TableHeader>
          {wishList.length !== 0 && wishList.map((v, i) => (
              <Row key={i}>
                  <CheckBox checked={checked[i]} onChange={handleChecked(i)}/>
                  <Image src={v.product.img} />
                  <Name>{v.product.name}</Name>
                  <Quantity min={0} value={quantity[i]} onChange={(e) => handleQuantity(e, i)} type='number' />
                  <Price>{(quantity[i] * v.product.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Price>
              </Row>
            ))}
          </Container>
          <Row>
              총 금액 :&nbsp;
              <b>
                {
                  wishList.length !== 0 && wishList.reduce((pre, cur, i) => (
                    pre + cur.product.price * quantity[i]
                  ), 0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                }
              </b>
          </Row>
          <ButtonsContainer>
            <Button background='primary' onClick={handleOpen}>구매하기</Button>
            <Modal open={open} onClose={handleClose}>
              {
                wishList.length !== 0 &&
                <Pay isWishList={true} data={{
                  img: wishList[0].product.img,
                  product: wishList.map((p, i) => ({
                    _id: p.id,
                    name: p.product.name,
                    quantity: quantity[i],
                    price: p.product.price
                  })),
                  address,
                  totalPrice: wishList.reduce((pre, cur, i) => (
                      pre + cur.product.price * quantity[i]
                    ), 0),
                  deliveryFee: wishList.reduce((pre, cur) => pre > cur.product.deliveryFee ? pre : cur.product.deliveryFee, wishList[0].product.deliveryFee)
                }} />
              }
            </Modal>
          </ButtonsContainer>
          
        </ContentsWrapper>
    );
}

export default WishListContents

// import axios from 'axios';

// const ADD_TO_WISHLIST = 'add_to_wishlist';
// const WISHLIST = 'wishlist'
// const REMOVE_WISHLIST_ITEM = 'remove_From_wishlist';
// const SERVER = '/api';

// export function addTowishlist(id) {
//     let body = {
//         productId: id
//     }
//     const request = axios.post(`${SERVER}/addTowishlist`, body)
//         .then(response => response.data);

//     return {
//         type: ADD_TO_WISHLIST,
//         payload: request
//     }
// }

// export function removewishlistItem(productId) {

//     const request = axios.get(`/api/removeFromwishlist?id=${productId}`)
//         .then(response => {
//             //productInfo ,  wishlist 정보를 조합해서   CartDetail을 만든다. 
//             response.data.wishlist.forEach(item => {
//                 response.data.productInfo.forEach((product, index) => {
//                     if (item.id === product._id) {
//                         response.data.productInfo[index].quantity = item.quantity
//                     }
//                 })
//             })
//             return response.data;
//         });

//     return {
//         type: REMOVE_WISHLIST_ITEM,
//         payload: request
//     }
// }

// export default wishlist