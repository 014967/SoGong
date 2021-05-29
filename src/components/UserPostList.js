import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import HeaderButton from './elements/HeaderButton';
import Button from './elements/Button'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DaumPop from './DaumPop'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 64px;
  & > * + * {
    margin-left: 16px;
  };
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
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
  & > * + * {
    margin-left: 16px;
  }
`
const Name = styled.div`
  width: 201px;
  text-align: center;
`

const Address = styled.div`
  width: 500px;
  text-align: center;
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

const UserPostList = ({ setOpenP }) => {
  const [buttonColor, setButtonColor] = useState('disabled')
  const [postList, setPostList] = useState([])
  const [open, setOpen] = useState(false)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelect = async (post) => {
    console.log(post)
    const { data: res } = await axios.patch(`/api/delivery/${post.deliveryname}`, {...post, default: true}
    // {
    //   default: true,
    //   deliveryname: post.deliveryname,
    //   name: post.name,
    //   address: post.address,
    //   detailaddress: post.detailaddress,
    //   zonecode: "12345",
    //   phonenumber: "010-8282-8282"
    // }
    )
    setOpenP(false)
  }

  const handleDelete = async (name) => {
    if (window.confirm('삭제하시겠습니까?')) {
      const {data: res} = await axios.get(`/api/removeFromdelivery?deliveryname=${name}`)
      getPostList()
    }
  }

  const getPostList = async () => {
    const { data: pl } = await axios.get('/api/delivery')
    if (!pl.delivery) return
    console.log(pl.delivery)
    setPostList(pl.delivery)
  }

  useEffect(() => {
    getPostList()
  }, [])
  // const handleDelete = async () => {
  //   if (window.confirm('삭제하시겠습니까?')) {
  //     const ids = []
  //     const paths = []
  //     checked.forEach((isChecked, i) => {
  //       if (isChecked) {
  //         ids.push(eventList[i]._id)
  //         paths.push(eventList[i].imgPath)
  //       }
  //     })
  //     const res = await axios.post('/api/events/delete', { eventIds: ids })
  //       .catch((err) => console.log('error'))
  //     const resImg = await axios.post('/eventImgDel', { imgPaths: paths })
  //       .catch((err) => console.log('error', err))
  //     .then(setEventList([]))
  //     .then(setModifiedFlag(true))
  //   }
  // }


  useEffect(() => {
    if (!open) {
      getPostList()
    }
  }, [open])

  return (
      <Container style={modalStyle} className={classes.paper}>
        <Header>
        <ButtonsContainer>
          <HeaderButton background="primary" right onClick={handleOpen}>등록</HeaderButton>
          <Modal open={open} onClose={handleClose}>
            <DaumPop setOpen={setOpen} />
          </Modal>
        </ButtonsContainer>
        </Header>
        <TableHeader>
          <TableHeaderContent width="150px">이름</TableHeaderContent>
          <TableHeaderContent width="450px">주소</TableHeaderContent>
        </TableHeader>
        {postList.length !== 0 && postList.map((post, index) => (
          <Row key={index}>
            <Name>{post.deliveryname}{index === 0 && '(기본 배송지)'}</Name>
            <Address>{`${post.address}, ${post.detailaddress}`}</Address>
            <Button>수정</Button>
            <Button onClick={() => handleDelete(post.deliveryname)}>삭제</Button>
            <Button background="primary" onClick={() => handleSelect(post)}>선택</Button>
          </Row>
        ))}
      </Container>
  )
}

export default UserPostList

// import react , { useEffect , useState} from 'react'
// import styled from 'styled-components'
// import DaumPop from './DaumPop'
// import Button from './elements/Button'
// import ReactDom from 'react-dom'


// import { makeStyles } from '@material-ui/core/styles';
// import ContentsWrapper from './elements/ContentsWrapper'
// import Title from './elements/Title'
// import { set } from 'js-cookie'


// const Container = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 10px;
// `

// const ListCotainer = styled.div`

// margin: 64px 64px 64px 0;
// min-width: 232px;
// & > * + * {
//   margin-top: 16px;
// }

// `
// const Input = styled.input`
//     border: 1px solid ${({ theme }) => theme.color.primary};
//     &:focus {
//         outline: none;
//     }
//     font-size: 20px;
//     font-family: ${({ theme }) => theme.font.light};
//     height: 48px;
//     width: 400px;
//     max-width: 400px;
// `

// const OutContainer = styled.div`

// `








// function getModalStyle() {
//   const top = 50 ;
//   const left = 50 ;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }


// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     /*width: 1275,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),*/
//     width: 1275,
//     padding: "64px 64px 0",
//     marginbottom: "128px",
//     boxShadow: "0px 10px 40px #00000029",
//     borderRadius : "32px",
//     background: "white",

//   },
// }));





// const UserPostList = () =>
// {


// const classes = useStyles();
// const [modalStyle] = react.useState(getModalStyle);

//     const [address ,setAddress ] = useState("");
//     const [detailAddress ,setDetailAddress] = useState("");
//     const [isOpen, setIsOpen]= useState(false);
//     const [fixedAddress, setFixedAddress] = useState({
//       totalAddress : []
//     });
//     const togglePopup = () =>
//     {
//       setIsOpen(prev => !prev);
//     }


//     const handleDetailAddress = e =>
//     {
//         setDetailAddress(e.target.value);
//     }

//     const handleFixedAddress = () =>
//     {
//       setFixedAddress({
//         totalAddress :address + detailAddress
//       });
//     }

//    return(
//      <div style={modalStyle} className={classes.paper}>
          
//             <Container>

//             <OutContainer>
//             <Title>배송지 목록</Title>
//             <Button onClick={togglePopup}>
//                   배송지 검색
//             </Button>
//                   {
//                     address == "" ? 
//                     isOpen && <DaumPop isOpen={isOpen} setIsOpen= {setIsOpen} setAddress = {setAddress}/>
//                     : address 
                    
//                   }
//                     <div>
//                     {
//                       address !== "" ? 
//                       <Input placeholder="상세 배송지 입력" onChange={handleDetailAddress}></Input>: null
                      
//                     }
                    
//                     {
//                       address !== "" ?
//                       <Button onClick={handleFixedAddress} >
//                           배송지 추가
//                       </Button> : null
//                     }
//                       <ListCotainer>
//                       {

//                         fixedAddress ? fixedAddress[0] : null
//                         //이거 여러개 배열에 넣을 수 있도록해야함
//                         //한번 배송지 추가를 할 때마다 post를 해서 유재 배송지에 추가를 할수있도록 접근해야함
//                         //주소 옆에 버튼을 추가한다. 해당 버튼 클릭시에  상품상세 목록으로 데이터를 가져온다.
//                       }
//                       </ListCotainer>
//                     </div>

//                     </OutContainer>
           

//             </Container>
           
//         </div>
        

//    )
                  
  

// }
// export default UserPostList;