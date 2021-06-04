import React, {useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Title from './elements/Title'
import ProductImage from './elements/ProductImage'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from './elements/Button'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import UserPostList from './UserPostList'
import { WishListContext } from '../pages/App'
import { LoginContext } from '../pages/App'
import StarIcon from '@material-ui/icons/Star'
import Pay from './Pay'

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const MiddleContainer = styled.div`
width: 100%;
padding-bottom: 64px;
border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const BottomContainer = styled.div`

`

//review
const ReviewCircle = styled.div`
margin-right : 10px;
max-width : 150px;
width : 150px;

`
const ReviewComment = styled.div`
margin-right : 10px;
max-width : 500px;
width : 500px;
`
const ReviewUser = styled.div`
margin-right : 10px;
max-width : 100px;
width : 100px;
`
const ReviewDate = styled.div`
max-width : 200px;
width : 200px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 1072px;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > * {
    text-align: center;
  }
`
const ReviewHeader = styled.div`
  display :flex;
  align-items: center;
  width: 1072px;
  padding: 32px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > * {
    text-align: center;
  }
`
const HeaderRecommend = styled.div`
  margin-right : 10px;
  width : 150px;
  font-family: ${({ theme }) => theme.font.medium};
`

const HeaderDelivery = styled.div`
  margin-right : 10px;
  width : 150px;
  font-family: ${({ theme }) => theme.font.medium};
`

const HeaderComment = styled.div`
  margin-right : 10px;
  width : 500px;
  font-family: ${({ theme }) => theme.font.medium};
  text-align: center;
`
  const HeaderUser = styled.div`
  margin-right : 10px;
  width : 100px;
  font-family: ${({ theme }) => theme.font.medium};`
  const HeaderDate = styled.div`
  width : 200px;
  font-family: ${({ theme }) => theme.font.medium};`
  const NoReview = styled.div`
  margin-top : 20px;
  align-items : center;
  justify-content: center;

`

const PageContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content: center;
  margin: 100px 0;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

const ButtonContainer = styled.div`
  margin-top: 16px;
  justify-content: space-between;
  & > * + * {
    margin-left: 16px;
  }
`

const Name = styled.h3`
  font-size: 48px;
  font-family: ${({ theme }) => theme.font.medium};
`

const Price = styled.div`
  font-size: 24px;
  font-family: ${({ theme }) => theme.font.regular};
  margin-top: 16px;
  margin-bottom: 200px;
  color: ${({ theme }) => theme.color.secondary};
`
const Review = styled.div`
  font-size: 24px;
  font-family: ${({ theme }) => theme.font.regular};
  margin-top: 16px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.secondary};
`

const Description = styled.div`
  padding: 16px 32px 32px;
`

const Address = styled.div`
  font-size: 14px;
  width: 300px;
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
  & + & {
    margin-left: 16px;
  }
`

const Score = styled.div`
  display: flex;
  align-items: center;
  & > *:first-child {
    color: #ffd179;
  }
`

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const categoryMap = {
  Man: 'MEN',
  Woman: 'WOMEN',
  Child: 'KIDS',
}

const filterName = (username) => { 
  if(typeof username !== "undefined") {
    let reviewname = username
    reviewname = reviewname.replace(/(?<=.{1})./gi, "*")
    return reviewname
  }
}

const filterScore = (score) => {
  if(typeof score !== "undefined") {
    let reviewScore = score;
    reviewScore = reviewScore.toFixed(2);
    return reviewScore;
  }
}

const ROW_PER_PAGE = 5 
const defaultStartDate = new Date()
defaultStartDate.setDate(defaultStartDate.getDate() - 7)
defaultStartDate.setHours(0, 0, 0, 0)
const defaultEndDate = new Date()
defaultEndDate.setDate(defaultEndDate.getDate())
defaultEndDate.setHours(0, 0, 0, 0)


const ProductData = () => {  

  const params = useParams()
  const id = params.id

  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [orderStock, setOrderStock] = useState(null);
  const [detailImg, setDetailImg] = useState([])
  const [address, setAddress] = useState('등록된 배송지가 없습니다.');
  const [deliveryFee, setDeliveryFee] = useState(3000)
  const [open, setOpen] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false)

  //reviewData
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [reviewList, setReviewList] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)
  const [reviewOpen, setReviewOpen] = useState([])
  const [avgScore, setAvgScore] = useState(0.00);

  const { success } = useContext(LoginContext)
  const { setWishListFlag } = useContext(WishListContext)
  const classes = useStyles();
  
  const getProductData = async () => {
    if (id.length !== 0) {
      const { data: product } = await axios.get(`/api/products/${id}`)
      setCategory(categoryMap[product[0].category])
      setImg(product[0].img)
      setName(product[0].name)
      setPrice(product[0].price)
      setDescription(product[0].detail)
      setDetailImg(product[0].detailImg)
      setDeliveryFee(product[0].deliveryFee)
    }
  }

  const handleRange = async () => {
    const {data :res} = await axios.get(`/api/product/review/${id}`)
    if(res.length === 0) {
      return
    }

    let rangeList = [...res]

    rangeList = rangeList.filter(data => {
      const temp = data.date.split('T')[0].split('-')
      const dataDate = new Date(temp[0], temp[1] - 1, temp[2])
      return startDate <= dataDate && endDate >= dataDate 
    }).reverse()
    
    setReviewList(rangeList)
    setPageNum(Math.ceil(rangeList.length / ROW_PER_PAGE))
    setReviewOpen(Array(rangeList.length).fill(false)) 
  }

  const handleAvgScore = async () => {
    const { data: res } = await axios.get(`/api/product/review/avgscore/${id}`)
    console.log(res)
    if(res.length !== 0) {
      if(typeof res[0].avg !== 'undefined') {
        setAvgScore(res[0].avg)
      }
      else {
        setAvgScore(0)
      }
    }
  }

  const getAddress = async () => {
    const { data: ad } = await axios.get('/api/delivery')
    if (!ad.delivery) {
      setAddress('등록된 배송지가 없습니다.')
      return
    }
    if (ad.delivery.length === 0) {
      setAddress('등록된 배송지가 없습니다.')
      return
    }
    setAddress(ad.delivery[0].address + ', ' + ad.delivery[0].detailaddress)
  }

  const handleOrderStock = e => {
    setOrderStock(e.target.value);
  }

  const handleWishList = async () => {
    if (success) {
      if (!orderStock) {
        alert('먼저 수량을 선택해주세요.')
      } else {
        const { data: res } = await axios.post('/api/addTowishlist', {
          productId: id,
          quantity: orderStock
        })
        alert('장바구니에 추가되었습니다.')
      }
      setWishListFlag(true)
    } else
      alert('먼저 로그인 해주세요.')
  }

  useEffect(() => {
    
    getProductData()
    getAddress()
    handleAvgScore()
    handleRange()
  }, [])

  
  useEffect(() => {
    if (!open) {
      getAddress()
    }
  }, [open])

  //modal

  const handleOpen = () => {
    if (success) { 
      setOpen(true);
    } else {
      alert('먼저 로그인 해주세요.')
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPurchase = () => {
    if (success && img && orderStock) {
      setOpenPurchase(true)
    } else if (!success) {
      alert('먼저 로그인 해주세요.')
    } else if (!orderStock) {
      alert('먼저 수량을 선택해주세요.')
    } else {
      alert('로딩 중입니다. 잠시만 기다려주세요.')
    }
  }

  return (
    <>
      <Title>{category}</Title>
      <TopContainer>
        {(img && detailImg) ? <ProductImage img={img} detailImg={detailImg} />
        : '...loading'}
        <InfoContainer>
          
          <Name>{name}</Name>
          <Score><StarIcon />
            {
              filterScore(avgScore)
            }
          </Score>
          <Price>&#8361;{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Price>
          <Address>
            기본 배송지: {address}
          </Address>
          <ButtonContainer>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">수량</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderStock}
                onChange={handleOrderStock}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>
            
            <Button onClick={handleOpen}>
              배송지 선택
            </Button>
            <Modal open={open} onClose={handleClose}>
              <UserPostList setOpenP={setOpen}/>
            </Modal>
          </ButtonContainer>
          <ButtonContainer>
            <Button onClick={handleWishList}>
              장바구니 담기
            </Button>
            <Button background='primary' onClick={handleOpenPurchase}>
              바로 구매하기
            </Button>
            <Modal open={openPurchase} onClose={() => {setOpenPurchase(false)}}>
              <Pay isWishList={false} data={{
                img,
                product: [{
                  _id: id,
                  name,
                  quantity: orderStock,
                  price
                }],
                address,
                totalPrice: price * orderStock,
                deliveryFee
              }} />
            </Modal>
          </ButtonContainer>
        </InfoContainer>
      </TopContainer>
      <MiddleContainer>
      <Review>상품 설명</Review>
      <Description>{description}</Description>
      </MiddleContainer>
      <BottomContainer>
        <Review>상품 리뷰</Review>
        <ReviewHeader>
          <HeaderRecommend>상품만족도</HeaderRecommend>
          <HeaderDelivery>배송속도</HeaderDelivery>
          <HeaderComment>내용</HeaderComment>
          <HeaderUser>작성자</HeaderUser>
          <HeaderDate>작성날짜</HeaderDate>
        </ReviewHeader>
        {
          
          //<ReviewListCards data ={reviewList[page - 1]}/>
        
          
          reviewList.length !== 0 ? reviewList.slice((page - 1) * ROW_PER_PAGE, page * ROW_PER_PAGE).map((data, i) => (
          <Row key={i}>
            <ReviewCircle>{data.recommend}</ReviewCircle>
            <ReviewCircle>{data.deliveryrating}</ReviewCircle>
            <ReviewComment>{data.comment}</ReviewComment>
            <ReviewUser>{filterName(data.username)}</ReviewUser>                
            <ReviewDate>{data.date.split('T')[0]}</ReviewDate>
          </Row>
          )) : <NoReview ><div>리뷰없음</div></NoReview>
        }
        
      </BottomContainer>
      <PageContainer>
      {
          Array(pageNum).fill(0).map((p, i) => (
            <PageButton key={i} 
                color={i + 1 === page && 'primary'}
                onClick={() => setPage(i + 1)}>{i + 1}</PageButton>
          ))
      }
      </PageContainer>
    </>
  )
}

export default ProductData;