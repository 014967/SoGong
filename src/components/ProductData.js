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

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
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
  margin-bottom: 256px;
  color: ${({ theme }) => theme.color.secondary};
`

const Description = styled.div`
  margin-top: 64px;
  padding-left: 64px;
  margin-bottom: 128px;
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const categoryMap = {
  Man: 'MEN',
  Woman: 'WOMEN',
  Child: 'KIDS',
}

const ProductData = (props) => {  

  const params = useParams()
  const id = params.id
  const history = useHistory()

  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [orderStock, setOrderStock] = useState('수량');
  const [detailImg, setDetailImg] = useState([])
  const [openDelivery, setOpenDelivery] =useState(false);

  const { success } = useContext(LoginContext)
  const { wishListFlag, setWishListFlag } = useContext(WishListContext)
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
    }
  }

  const handleOrderStock = e => {
    setOrderStock(e.target.value);
  }

  const handleWishList = async () => {
    if (success) {
      const { data: res } = await axios.post('/api/addTowishlist', {
        productId: id,
        quantity: orderStock
      })
      alert('장바구니에 추가되었습니다.')
      setWishListFlag(true)
    } else
      alert('먼저 로그인 해주세요.')
  }

  useEffect(() => {
    getProductData()
  }, [])

  //modal
  const [modalStyle] = react.useState(getModalStyle);
  const [open, setOpen] = react.useState(false);

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

    return (
      <>
        <Title>{category}</Title>
        <TopContainer>
          {(img && detailImg) ? <ProductImage img={img} detailImg={detailImg} />
          : '...loading'}
          <InfoContainer>
            <Name>{name}</Name>
            <Price>&#8361;{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Price>
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
                <UserPostList />
              </Modal>
            </ButtonContainer>
            <ButtonContainer>
              <Button onClick={handleWishList}>
                장바구니 담기
              </Button>
              <Button background='primary'>
                바로 구매하기
              </Button>
            </ButtonContainer>
          </InfoContainer>
        </TopContainer>
        <Price>상품 설명</Price>
        <Description>{description}</Description>
      </>
  )
}

export default ProductData;