import react , { useEffect , useState} from 'react'
import styled from 'styled-components'
import DaumPop from './DaumPop'
import Button from './elements/Button'
import ReactDom from 'react-dom'


import { makeStyles } from '@material-ui/core/styles';
import ContentsWrapper from './elements/ContentsWrapper'
import Title from './elements/Title'
import { set } from 'js-cookie'


const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`

const ListCotainer = styled.div`

margin: 64px 64px 64px 0;
min-width: 232px;
& > * + * {
  margin-top: 16px;
}

`
const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 48px;
    width: 400px;
    max-width: 400px;
`

const OutContainer = styled.div`

`








function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    /*width: 1275,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),*/
    width: 1275,
    padding: "64px 64px 0",
    marginbottom: "128px",
    boxShadow: "0px 10px 40px #00000029",
    borderRadius : "32px",
    background: "white",

  },
}));





const UserPostList = () =>
{


const classes = useStyles();
const [modalStyle] = react.useState(getModalStyle);

    const [address ,setAddress ] = useState("");
    const [detailAddress ,setDetailAddress] = useState("");
    const [isOpen, setIsOpen]= useState(false);
    const [fixedAddress, setFixedAddress] = useState({
      totalAddress : []
    });
    const togglePopup = () =>
    {
      setIsOpen(prev => !prev);
    }


    const handleDetailAddress = e =>
    {
        setDetailAddress(e.target.value);
    }

    const handleFixedAddress = () =>
    {
      setFixedAddress({
        totalAddress :address + detailAddress
      });
    }

   return(
     <div style={modalStyle} className={classes.paper}>
          
            <Container>

            <OutContainer>
            <Title>배송지 목록</Title>
            <Button onClick={togglePopup}>
                  배송지 검색
            </Button>
                  {
                    address == "" ? 
                    isOpen && <DaumPop isOpen={isOpen} setIsOpen= {setIsOpen} setAddress = {setAddress}/>
                    : address 
                    
                  }
                    <div>
                    {
                      address !== "" ? 
                      <Input placeholder="상세 배송지 입력" onChange={handleDetailAddress}></Input>: null
                      
                    }
                    
                    {
                      address !== "" ?
                      <Button onClick={handleFixedAddress} >
                          배송지 추가
                      </Button> : null
                    }
                      <ListCotainer>
                      {

                        fixedAddress ? fixedAddress[0] : null
                        //이거 여러개 배열에 넣을 수 있도록해야함
                        //한번 배송지 추가를 할 때마다 post를 해서 유재 배송지에 추가를 할수있도록 접근해야함
                        //주소 옆에 버튼을 추가한다. 해당 버튼 클릭시에  상품상세 목록으로 데이터를 가져온다.
                      }
                      </ListCotainer>
                    </div>

                    </OutContainer>
           

            </Container>
           
        </div>
        

   )
                  
  

}
export default UserPostList;