import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Button from './elements/Button';
import axios from 'axios'
import { useHistory , useLocation} from 'react-router';


const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  margin-top : 500px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 64px 32px 0;
    margin-bottom: 64px;
    width: 100%;
    & > * + * {
        margin-top: 64px;
    }
`

const InputContainer = styled.div`
    display: flex;
    max-width: 1094px;
`
const Title = styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    height: 47px;
    font-size: 32px;
    font-family: ${({ theme }) => theme.font.regular};
    color: ${({ theme }) => theme.color.secondary};
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 48px;
    width: 894px;
    max-width: 894px;
    padding-left: 8px;

`
const Textarea = styled.textarea`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 640px;
    width: 894px;
    max-width: 894px;
    padding: 8px;
    resize: none;
`

const FileInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
`

const LabelButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 48px;
    color: white;
    background: ${(props) => props.theme.color[props.background] || props.theme.color.secondary};
    border: none;
    border-radius: 32px;
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    cursor: pointer;
    &:focus {
    outline: none;
    }
`
const FileName = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 48px;
    padding-left: 8px;
`
const PriceText = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    height: 48px;
    padding: 0 16px 0 8px;
`



const AlterProduct = () =>
{

    

    const history = useHistory();
    const location = useLocation();



    const [productTitle ,setProductTitle] =useState('');
    const [productDescription , setProductDescription] = useState('');
    const [productImg , setProductImg] = useState(null);
    const [imgFileName, setImgFileName] = useState("이미지는 정사각형으로 표시됩니다");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("남성 상의");
    const [stock , setStock ] = useState();
  
  
    useEffect(()=>
    {
        console.log(location.state)
        console.log(location.state.data.name)

        if(location.state !== "undefined")
        {
            console.log("hello")
            setProductTitle(location.state.data.name)
            setProductDescription(location.state.data.detail)
            setCategory(location.state.data.category)
            setStock(location.state.data.stock)
            setPrice(location.state.data.price)
            setImgFileName(location.state.data.img)
       

        }
        else
        {

        }
       
         
        
    },[])

    
    

   

    const alterSubmit = async (e) =>
    {
        
        e.preventDefault()
        const formData = new FormData()
        const response = await axios.put("api/products/" +`${location.state.data._id}`,
        
        {
            name : productTitle,
            detail : productDescription,
            price : price,
            category : category,
            stock : stock,
        }
        ).catch((err)=> console.log('error'))
        .then(
            history.replace(
                {
                    pathname : `/manager`,
                    state : {selected : location.state.selected }
                }
            )
        )
        
        
    }

    const handleProductTitle = e =>
    {
        setProductTitle(e.target.value);
    }
    const handleDiscription = e =>
    {
        setProductDescription(e.target.value);
    }
    const getImg = e =>
    {
        setProductImg(e.target.files[0]);
        setImgFileName(e.target.files[0].name);
    }
    const handlePrice = e =>
    {
        setPrice(e.target.value);
    }
    
    const handleStock = e =>
    {
        setStock(e.target.value);
    }
    const handleCategory = e =>
    {
        setCategory(e.target.value);
    }

    return(
        <>
       
          
               
           <div>
               {console.log("수정")}
               <Header>
            <Button background = "primary" onClick= { alterSubmit}>
                상품 등록
            </Button>
        </Header>
        <Container>
            <InputContainer>        
            <Title>상품명</Title>
            <Input value={productTitle} onChange={handleProductTitle}></Input>
            </InputContainer>
            <InputContainer>
                    <Title>카테고리</Title>
                    <select 
                    value={category}
                    onChange={handleCategory}
                    >
                        <option value="Man Top">남성 상의</option>
                        <option value="Man Bottom">남성 하의</option>
                        <option value="Woman Top">여성 상의</option>
                        <option value="Woman Bottom">여성 하의</option>
                        <option value="Child">아동용</option>

                    </select>
                    
            </InputContainer>
            <InputContainer>
                    <Title>설명*</Title>
                    <Textarea value={productDescription} onChange={handleDiscription}></Textarea>
            </InputContainer>
            <InputContainer>
                    <Title>대표 이미지*</Title>
                    <LabelButton for="file_input">이미지 업로드</LabelButton>
                    <FileInput type="file" accept="image/x-png,image/jpeg" id ="file_input" name="img" onChange={getImg} />
                    <FileName>{imgFileName}</FileName>
            </InputContainer>
            <InputContainer>
                <Title>상품 수량</Title>
                <Input value={stock}  type='number' onChange={handleStock}></Input>
                <PriceText>개</PriceText>
                
            </InputContainer>
            <InputContainer>
            <Title>상품 가격</Title>
            <Input  value={price} type='number' onChange={handlePrice}></Input>
            <PriceText>원</PriceText>

            
            </InputContainer>
        </Container>
           </div>
       
        
        
        

        </>
    ) 
}
export default AlterProduct;