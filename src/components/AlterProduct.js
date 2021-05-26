import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Button from './elements/Button';
import axios from 'axios'
import { useHistory , useLocation} from 'react-router';
import { AirlineSeatFlatAngled, FastForward } from '@material-ui/icons';


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
    const [imgFileName, setImgFileName] = useState("이미지는 다중 선택이 가능하며, 최대 5장까지 등록됩니다.");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("카테고리");
    const [stock , setStock ] = useState();
    const [flag, setFlag ]= useState(false);
    const [file, setFile] =useState({
        files : [],
    });
  

    console.log(location);

    const handleDetailImg = () =>
    {

        console.log(location.state.data.detailImg.length);
        const result =[];
        for(let i=0; i<location.state.data.detailImg.length ; i++)
        {
            result.push(
                <FileName key = {i+1}>
                    {
                        location.state.data.detailImg[i]
                    }
                </FileName>
            )
        }
    
        return result;
    }


    useEffect(()=>
    {
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

        const responseImg = await axios.post(`/productMutipleImg/${response.data_id}`, formData)
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

    const fileSelectedHandler = (e)=>
    {
        setFlag(true)
        setFile({files : [...e.target.files]})
    }

    const handleImgName = () =>
    {
        
    
       const result =[];
       console.log("hello")
       console.log(file.files.length);
       console.log(file.files[0].name);
       for(let i=0; i<file.files.length ; i++)
       {

       
            result.push(
                <FileName key ={i+1}>
                  {
                  file.files[i].name
                  }
                </FileName>
            )
       }
       
       return result;
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

    useEffect(()=>
    {
        if(location.state.data.detailImg === Array(0))
        {

            setFlag(true)
            
        }
        else
        {
            setFlag(false)
            
        }

    },[location.state])
 

    return(
        <>
       
          
               
           <div>
               <Header>
            <Button background = "primary" onClick= { alterSubmit}>
                상품 수정
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
                        <option value="Man">남성용</option>
                        <option value="Woman">여성용</option>
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
                    <FileInput type="file" accept="image/x-png,image/jpeg" id ="file_input" name="img" multiple onChange={fileSelectedHandler} />
               
                    <FileName >
                        {
                            flag ? 
                            
                              
                              handleImgName()
                               :  <div>{imgFileName}
                                {handleDetailImg()}</div>
                            
                            
                        }
                    </FileName>
            </InputContainer>
            <InputContainer>
                <Title>상품 수량</Title>
                <Input value={stock}  type='number'  min="0" onChange={handleStock}></Input>
                <PriceText>개</PriceText>
                
            </InputContainer>
            <InputContainer>
            <Title>상품 가격 (20만원 이하)</Title>
            <Input  value={price} type='number'  min="0" max="200000" onChange={handlePrice}></Input>
            <PriceText>원</PriceText>

            
            </InputContainer>
            <div>*최대 20만원 까지 가능합니다.</div>
        </Container>
           </div>
       
        
        
        

        </>
    ) 
}
export default AlterProduct;