import react , { useEffect , useState} from 'react'
import styled from 'styled-components'
import DaumPop from './DaumPop'
import Button from './elements/Button'

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


const UserPostList = () =>
{
    const [address ,setAddress ] = useState("");

    const [isOpen, setIsOpen]= useState(false);
    const togglePopup = () =>
    {
      setIsOpen(!isOpen);
    }


    return(
        <ContentsWrapper wide>
            <Container>

            <ListCotainer>
            <Title>배송지 목록</Title>
            <Button onClick={setIsOpen}>
                  배송지 추가
                  </Button>
                  {
                    address == "" ? 
                    isOpen && <DaumPop isOpen={isOpen} setIsOpen= {setIsOpen} setAddress = {setAddress}/>
                    : address 
                    
                  }

            </ListCotainer>
           

            </Container>
           
        </ContentsWrapper>


    )

}
export default UserPostList;