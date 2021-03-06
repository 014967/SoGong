import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import ContentsWrapper from './elements/ContentsWrapper'
import Button from './elements/Button';
import CheckBox from './elements/CheckBox'
import HeaderButton from './elements/HeaderButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import DatePicker from "react-datepicker";
import { defaults } from 'js-cookie';

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`

const ListContainer = styled.div`
`
const StatisticsContainer = styled.div`

`
const StatisticsTitle = styled(Title)`
  font-size: 32px;
`
//review
const ReviewCircle = styled.div`
margin-right : 10px;
max-width : 300px;
width : 300px;

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
//review

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

const StatInfoContainer = styled(InfoContainer)`
  font-size: 24px;
  & > *:first-child {
    width: auto;
  }
  margin-bottom: 32px;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`


const DetailProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 8px;
  }
`

const Header = styled.div`
  display: flex;
  width: 1072px;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > * + * {
    margin-left: 16px;
  }
`

const RowContent = styled.div`
  width: ${(props) => props.width};
  text-align: center;
`

const Name = styled(RowContent)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 1072px;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 1072px;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`

const Pagination = styled.div`
  display: flex;
  width: 1072px;
  justify-content: center;
  margin: 64px 0;
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

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 300px;
  height: 48px;
  background: ${({ theme }) => theme.color.secondary};
  border-radius: 32px;
`

const FilterButtonText = styled.button`
  width: 129px;
  height: 48px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  &:focus {
    outline: none;
  }
`

const FilterButtonHyphen = styled.div`
  color: white;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
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
    '&:focus': {
      outline: 'none'
    }
  },
}));

const isEqual = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const ROW_PER_PAGE = 5

const buttonMap = {
  '?????? ??????': '????????????',
  '?????? ???': '?????? ??????',
  '?????? ??????': '?????????',
  '?????? ??????': '?????????'
}

const defaultStartDate = new Date()
defaultStartDate.setDate(defaultStartDate.getDate() - 7)
defaultStartDate.setHours(0, 0, 0, 0)
const defaultEndDate = new Date()
defaultEndDate.setDate(defaultEndDate.getDate())
defaultEndDate.setHours(0, 0, 0, 0)

const ManagerOrderListContents = () => {
  const [range, setRange] = useState(0) // 0(all), 1, 7, 30, 365
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)
  const [page, setPage] = useState(1) //???????????? ?????? ??? slice??? ??????
  const [pageNum, setPageNum] = useState(1)
  const [list, setList] = useState([])
  const [open, setOpen] = useState([])
  const [total, setTotal] = useState(0)
  const [productRanking, setProductRanking] = useState([])
  const [categoryRanking, setCategoryRanking] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [purchaseReview, setPurChaseReview] = useState([]);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = (index, op) => {
    if (op) {
      setOpen(prev => [...prev.map((v, i) => 
        i === index ? true : false
      )])
    }
    else {
      setOpen(prev => [...prev.map(v => false)])
    }
  }
  const handleReviewOpen = () =>
  {
    setReviewModalOpen(false)
  }

  const handleButton = async (index) => {
    if (list[index].status === '?????? ??????') {
      const { data: res } = await axios.post('/api/purchaseStatus/' + list[index]._id, {
        status: '?????? ???'
      })
    } else if (list[index].status === '?????? ???') {
      const { data: res } = await axios.post('/api/purchaseStatus/' + list[index]._id, {
        status: '?????? ??????'
      })
    } else {
      // ????????? ??????
      console.log(list[index]);
      console.log(list[index]._id);
      const { data : review } = await axios.get(`/api/admin/product/review/${list[index]._id}`);
      console.log(review);
      setPurChaseReview(review);
      setReviewModalOpen(true)
      
    }
    handleRange(range)
  }

 
  
  const handleRange = async () => {
    
    const { data: res } = await axios.get('/api/purchases/')
    if (res.length === 0) {
      return
    } 

    let rangeList = [...res]

    // ?????????, ?????????
    rangeList = rangeList.filter(data => {
      const temp = data.date.split('T')[0].split('-')
      const dataDate = new Date(temp[0], temp[1] - 1, temp[2])
      return startDate <= dataDate && endDate >= dataDate
    }).reverse()
    setList(rangeList)
    setPageNum(Math.ceil(rangeList.length / ROW_PER_PAGE))
    setOpen(Array(rangeList.length).fill(false))

    if (rangeList.length === 0) {
      setTotal(0)
      return
    }

    const products = []
    rangeList.forEach(data => {
      data.product.forEach(p => {
        products[products.length] = p
      })
    })
    setTotal(products.reduce((pre, cur) => pre + cur.price * cur.quantity, 0))

    

    setIsLoading(false)
  }


  useEffect(() => {
    handleRange()
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      handleRange()
    }
  }, [startDate, endDate])

  const StartFilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <FilterButtonText
        onClick={onClick} ref={ref}>
        {value || '?????????'}
      </FilterButtonText>
    ),
  )
  const EndFilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <FilterButtonText
        onClick={onClick} ref={ref}>
        {value || '?????????'}
      </FilterButtonText>
    ),
  )

    return (
        <>
          {isLoading ? <div style={{marginBottom: '32px'}}>
            Loading...
          </div> : <>
          <Container>
            <StatisticsContainer>
              <StatisticsTitle>??? ????????????(????????? ??????)</StatisticsTitle>
                <StatInfoContainer>
                  <div>
                    {total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}???
                  </div>
                </StatInfoContainer>
            </StatisticsContainer>
            <ListContainer>
              <Header>
                <FilterButtonContainer>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    isclearable
                    customInput={<StartFilterButton />}
                  />
                  <FilterButtonHyphen>~</FilterButtonHyphen>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    isclearable
                    customInput={<EndFilterButton />}
                  />
                </FilterButtonContainer>
              </Header>
              <TableHeader>
                <TableHeaderContent width="150px">?????? ??????</TableHeaderContent>
                <TableHeaderContent width="350px">?????????</TableHeaderContent>
                <TableHeaderContent width="150px">?????? ??????</TableHeaderContent>
                <TableHeaderContent width="200px">?????? ??????(????????? ??????)</TableHeaderContent>
              </TableHeader>
              {
                list.length !== 0 && list.slice((page - 1) * ROW_PER_PAGE, page * ROW_PER_PAGE).map((data, i) => (
                  <Row key={i}>
                    <RowContent width="150px">{data.date.split('T')[0]}</RowContent>
                    <Name width="350px" onClick={() => handleOpen(i + ROW_PER_PAGE * (page - 1), true)}>
                      {data.product[0].name} {data.product.length > 1 && `??? ${data.product.length - 1}???`}
                    </Name>
                    <Modal open={open[i + ROW_PER_PAGE * (page - 1)]} onClose={() => handleOpen(0, false)}>
                      <ModalContainer style={modalStyle} className={classes.paper}>
                        <Title>?????? ?????? ??????</Title>
                        <InfoContainer>
                          <div>?????? ??????</div>
                          <div>{data.date.split('T')[0]}</div>
                        </InfoContainer>
                        <InfoContainer>
                          <div>?????????</div>
                          <div>{data.address}</div>
                        </InfoContainer>
                        <InfoContainer>
                          <div>?????? ??????</div>
                          <DetailProductContainer>
                            {data.product.map((v, j) => (
                              <div key={j}>{v.name} {v.quantity}??? (???{(v.price * v.quantity).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")})</div>
                            ))}
                          </DetailProductContainer>
                        </InfoContainer>
                        <InfoContainer>
                          <div>?????? ??????</div>
                          <b>???{data.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</b>
                        </InfoContainer>
                      </ModalContainer>
                    </Modal>
                    <RowContent width="150px">{data.status}</RowContent>
                    <RowContent width="200px">{data.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</RowContent>
                    <Button background="primary" onClick={() => handleButton(i + ROW_PER_PAGE * (page - 1))}>{buttonMap[data.status]}</Button>
                  </Row>
                ))
              }
              
            </ListContainer>
           
            {
                
               
                
                <Modal open={reviewModalOpen} onClose={() => handleReviewOpen()}>
                <ModalContainer style={modalStyle} className={classes.paper}>

                  <Title>?????? ?????? ????????? ??????</Title>
                  <div>
                  {
                  console.log(purchaseReview),
                  purchaseReview.length !== 0 ? 
                  purchaseReview.map((data,index) =>
                  (
                    <ReviewRow key={index}>
                      <ReviewCircle>{data.recommend}</ReviewCircle>
                      <ReviewCircle>{data.deliveryrating}</ReviewCircle>
                      <ReviewComment>{data.comment}</ReviewComment>
                      <ReviewUserDate>
                                  <ReviewUser>
                                        {
                                          data.username
                                        }
                                  </ReviewUser>                
                                  <ReviewDate>
                                        {data.date.split('T')[0]}
                                  </ReviewDate>
                                        
                      </ReviewUserDate>



                    </ReviewRow>
                  )) : "????????????"
                  }
                   
                  </div>
                </ModalContainer>
                
                </Modal>
                
                
              }
            <Pagination>
              {Array(pageNum).fill(0).map((p, i) => (
                <PageButton key={i} 
                color={i + 1 === page && 'primary'}
                onClick={() => setPage(i + 1)}>{i + 1}</PageButton>
              ))}
            </Pagination>
          </Container>
        </>}
        </>
    );
}

export default ManagerOrderListContents