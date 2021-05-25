import react , { useEffect , useState} from 'react'
import styled from 'styled-components'
import DaumPop from './DaumPop'
import Button from './elements/Button'
import ReactDom from 'react-dom'

import ContentsWrapper from './elements/ContentsWrapper'
import Title from './elements/Title'


const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 96px;
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

const  ZContainer = styled.div`
position : fixed,
top : 50%,
left : 50%,
transform : translate(-50%,-50%),
padding : '50px',
zIndex :1000
`


const Modal_wrapper = styled.div`
position : fixed,
top : 0,
bottom :0 ,
left :0,
right : 0,
`

const Modal_backdrop = styled.div`
position : fixed,
top : 0,
bottom : 0 ,
left :0,
right : 0,
z-index : 100,
background-color : rgba(0,0,0.3)
`
const Modal_box = styled.div`
position : relative,
top : 50%,
left : 50%,
transform : translate(-50%, -50%),
height : 70%,
width: 60%,
overflow : auto,
background-color : white,
box-shadow : 0 0 10px rgba(0,0,0,0.25)
z-index : 101,
padding : 40px,
` 



const UserPostList = (openDelivery) =>
{
    const [address ,setAddress ] = useState("");
    const [detailAddress ,setDetailAddress] = useState("");
    const [isOpen, setIsOpen]= useState(false);
    const togglePopup = () =>
    {
      setIsOpen(prev => !prev);
    }


    const handleDetailAddress = e =>
    {
        setDetailAddress(e.target.value);
    }


    if(openDelivery)
    {
      return ReactDom.createPortal(<Modal_wrapper>
        <div className = {'model-background'}/>
          <Modal_box>
        {<ContentsWrapper wide>
            <Container>

            <ListCotainer>
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
                      <Button >
                    배송지 추가
                    </Button> : null
                    }
                    </div>

            </ListCotainer>
           

            </Container>
           
        </ContentsWrapper>


        
        }   
               </Modal_box>
        </Modal_wrapper> , document.getElementById("modal-root"))
    }
  

}
export default UserPostList;