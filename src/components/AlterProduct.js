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
    const [imgFileName, setImgFileName] = useState("???????????? ?????? ????????? ????????????, ?????? 5????????? ???????????????.");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("????????????");
    const [stock, setStock ] = useState();
    const [deliveryFee, setDeliveryFee] = useState(3000)
    const [flag, setFlag]= useState(false);
    const [file, setFile] =useState({
        files : [],
    });

    const handleDetailImg = () =>
    {

        //console.log(location.state.data.detailImg.length);
        const result =[];
        if(typeof location.state !== "undefined")
        {

        
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
        }
    
        return result;
    }


    useEffect(()=>
    {
        if(typeof location.state !== "undefined")
        {
            console.log("hello")
            setProductTitle(location.state.data.name)
            setProductDescription(location.state.data.detail)
            setCategory(location.state.data.category)
            setStock(location.state.data.stock)
            setPrice(location.state.data.price)
            setImgFileName(location.state.data.img)
            setDeliveryFee(location.state.data.deliveryFee)
        }
        
    }, [])

    useEffect(()=>
    {
            console.log(location);
    },[location])

    const alterSubmit = async (e) => {
        e.preventDefault()
        if(!productTitle || !productDescription || !file.files || !price || !stock || category === "default" || !deliveryFee) {
            alert("?????? ?????? ????????? ???????????? ??????????????????.");
            return
        }

        if(price > 200000) {
            alert("????????? 20?????? ????????? ??????????????????.");
            return
        }

        const formData = new FormData()
        for( let i =0; i<file.files.length; i++)
        {
            formData.append('img', file.files[i])
        }
        const response = await axios.put("api/products/" +`${location.state.data._id}`,
        
        {
            name : productTitle,
            detail : productDescription,
            price : price,
            category,
            stock,
            deliveryFee
        }
        ).catch((err)=> console.log('error'))
        const responseImg = await axios.post(`/productMutipleImg/${response.data._id}`, formData)
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
        if(typeof location.state !== "undefined"){

        
        if(location.state.data.detailImg === Array(0))
        {

            setFlag(true)
            
        }
        else
        {
            setFlag(false)
            
        }
    }
    else
    {
        alert("????????? ???????????????.")
        history.goBack()
    }

    },[location.state])
 

    return(
        <>
       
          
               
           <div>
               <Header>
            <Button background = "primary" onClick= { alterSubmit}>
                ?????? ??????
            </Button>
        </Header>
        <Container>
            <InputContainer>        
            <Title>?????????</Title>
            <Input value={productTitle} onChange={handleProductTitle}></Input>
            </InputContainer>
            <InputContainer>
                    <Title>????????????</Title>
                    <select 
                    value={category}
                    onChange={handleCategory}
                    >
                        <option value="Man">?????????</option>
                        <option value="Woman">?????????</option>
                        <option value="Child">?????????</option>

                    </select>
                    
            </InputContainer>
            <InputContainer>
                    <Title>??????*</Title>
                    <Textarea value={productDescription} onChange={handleDiscription}></Textarea>
            </InputContainer>
            <InputContainer>
                    <Title>?????? ?????????*</Title>
                    <LabelButton for="file_input">????????? ?????????</LabelButton>
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
                <Title>?????? ??????</Title>
                <Input value={stock}  type='number'  min="0" onChange={handleStock}></Input>
                <PriceText>???</PriceText>
                
            </InputContainer>
            <InputContainer>
                <Title>?????? ??????</Title>
                <Input  value={price} type='number'  min="0" max="200000" onChange={handlePrice}></Input>
                <PriceText>???</PriceText>
            </InputContainer>
            <div style={{marginTop: '8px', marginLeft: '200px'}}>*?????? 20?????? ?????? ???????????????.</div>
            <InputContainer>
                <Title>?????????*</Title>
                <Input placeholder="????????? ??????" type='number' min="0" value={deliveryFee} onChange={e => setDeliveryFee(e.target.value)}></Input>
                <PriceText>???</PriceText>
            </InputContainer>
        </Container>
           </div>
        </>
    ) 
}
export default AlterProduct;