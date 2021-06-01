import react , {useState, useEffect, useContext } from 'react'
import {useHistory, useLocation} from 'react-router'
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
import Pay from './Pay'
import moment from 'moment'

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

const ReviewCircle = styled.div`
margin-right : 10px;
max-width : 150px;
width : 150px;

`
const ReviewComment = styled.div`
margin-right : 10px;
max-width : 1000px;
width : 1000px;
`
const ReviewUserDate = styled.div`
display: flex;
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


const ReviewRow = styled.div`
display : flex;`

const PageContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content: center;
  margin-top : 100px;
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
margin-bottom: 50px;
color: ${({ theme }) => theme.color.secondary};
`

const Description = styled.div`
  padding-left: 64px;
  margin-bottom: 128px;
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

const ProductData = () => {  

  const params = useParams()
  const id = params.id
  console.log(params)

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
  const [page, setPage] = useState();
 
  const [reviewList , setReviewList ] = useState();


  const { success } = useContext(LoginContext)
  const { setWishListFlag } = useContext(WishListContext)
  const classes = useStyles();
  
  const getProductData = async () => {
    if (id.length !== 0) {
      const { data: product } = await axios.get(`/api/products/${id}`)
      console.log(product)
      setCategory(categoryMap[product[0].category])
      setImg(product[0].img)
      setName(product[0].name)
      setPrice(product[0].price)
      setDescription(product[0].detail)
      setDetailImg(product[0].detailImg)
      setDeliveryFee(product[0].deliveryFee)
    }
  }


  const getReviewData = async () =>
  {
    if(id.length !== 0)
    {
      console.log(id)
      const { data : reviewData } = await axios.get(`/api/product/review/${id}`)
      console.log(reviewData);
     
      setReviewList(reviewData)
    }
    
  }


  const PageCount = () =>
  {
    const result = [];
    for(let i =0; i<=reviewList.length/3; i++)
    {
      result.push(
        <PageButton key={i+1} onClick={
          ()=>
          {
            setPage(i+1)

          }

        }>{i+1}

        </PageButton>
      )
    }
    return result;
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
    getReviewData()
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


  const filterName = (name) =>
  {
    
    if(typeof name !== "undefined")
    {
      console.log(name);
    
      var reviewname = name;

      reviewname = reviewname.replace(/(?<=.{1})./gi, "*");

      return reviewname;


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
        <Price>상품 설명</Price>
        <Description>{description}</Description>
        </MiddleContainer>
        <BottomContainer>
          <Review>상품 리뷰</Review>
          
          {
            console.log(reviewList),
            reviewList ?  reviewList.map((data,index) =>
            (
             <ReviewRow key={index} >
                <ReviewCircle>{data.recommend}</ReviewCircle>
                <ReviewCircle>{data.deliveryrating}</ReviewCircle>
                <ReviewComment>{data.comment}</ReviewComment>
                <ReviewUserDate>
                  <ReviewUser>
                  {
                    filterName(data.username)
                  }
                  </ReviewUser>                
                  <ReviewDate>
                  {data.date.split('T')[0]}
                  </ReviewDate>
                  
                </ReviewUserDate>



             </ReviewRow> 


            )) : 'Loading ...'
          }
          
          
         
          


        </BottomContainer>
        <PageContainer>
        {
            reviewList ? PageCount() : null
        }
        </PageContainer>

      </>
  )
}

export default ProductData;