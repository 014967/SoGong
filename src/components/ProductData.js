import react , {useState, useEffect } from 'react'
import {useHistory, useLocation} from 'react-router'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import ContentsWrapper from './elements/ContentsWrapper'
import Title from './elements/Title'


import Button from './elements/Button'
import { PowerInputSharp } from '@material-ui/icons'
import UserPostList from './UserPostList'


const Container = styled.div`
  width: 100%;
  & > *:first-child {
    margin-right: 64px;
  }
`


const Category = styled.div`
  font-size: 32px;
  font-family: ${({ theme }) => theme.font.medium};
  color: ${(props) => props.selected ? 
    props.theme.color.primary : props.theme.color.secondary};
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  outline: 0;
`
const Img=  styled.img`
  width : 500px;
  height : 500px; 
`
const TopContainer = styled.div`
    display : flex;
    width :100 %;
    padding : 64px 64px 0;
    max-width: 1792px;
    margin-top : 200px;


`

const BottomContainer = styled.div`
    width : 100%;
    padding : 64px 64px 0;
    max-width :1792px;

`

const InputContainer = styled.div`
    display: flex;
    max-width: 1094px;
`




const ProductData = (props) =>
{ 

  
  let params = useParams();
  console.log(params);
  

  const history = useHistory();

  console.log(history);

    const [category, setCategory] = useState();
    const [img , setImg] = useState();
    const [name , setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [orderStock, setOrderStock] = useState(1);

    const [detailImg , setDetailImg] = useState();

    const [detailImgPath, setDetailImgPath] = useState(
      {
        path : []
      }
    );


    const [openDelivery,setOpenDelivery] =useState(false);

    const popup = ()=>
    {
      setOpenDelivery(prev => !prev);
    }


    console.log(props);
    
    useEffect(() => {
      if(!img || !name || !price || !description || !category || !detailImgPath)
        {
        setImg(props.location.state.data.img);
        setName(props.location.state.data.name);
        setPrice(props.location.state.data.price);
        setDescription(props.location.state.data.detail);
        setCategory(props.location.state.data.category);
        }
      }, [props]);


      

      

    const handleOrderStock = e =>
    {
      setOrderStock(e.target.value);

    }


    const handelDetailImg = () =>
    {

      const result = [];
      for(let i= 0 ; i < props.location.state.data.detailImg.length; i++)
      {
        result.push(
          <Img src={require('../assets/images/products/'+props.location.state.data.detailImg[i]).default} />
            
          
        )
      }
      return result;
    }



    return (

        <ContentsWrapper wide>
        
        
       
        <TopContainer id= 'topmenu'>
            <div>
            <Category>{category}</Category>
      
            {img ? <Img src={require('../assets/images/products/' + img).default} /> : 
             '...loading'}
             
           
            
            </div>

           
          <Container id='name, price , etc'>
                <div id= 'product name'>상품이름 : {name}</div>
                <div id='product price'>
                    상품 가격 :{price}
                </div>
            <InputContainer id='count, delivery' > 
                <div id='count'>
                  상품수량
                  <select
                    value ={ orderStock }
                    onChange ={handleOrderStock}>
                      <option value = "1">1</option>
                      <option value = "2">2</option>
                      <option value = "3">3</option>
                      <option value = "4">4</option>
                      <option value = "5">5</option>
                      <option value = "6">6</option>
                      <option value = "7">7</option>
                      <option value = "8">8</option>
                      <option value = "9">9</option>


                  </select>
                </div>
               
                <div id='delivery'>
                  <Button onClick={()=>
                  {
                    history.push(
                     {
                       pathname : '/user/PostList'
                    }  
                    )
                    //popup()

                  }}>
                  배송지 추가
                  </Button>
                  
                  
                  
                </div>
                </InputContainer>
                
                  
            <div id='basket, buy'>
                <div id='basket'></div>
                <div id='buy'></div>
            </div>
            
        </Container>
    </TopContainer>    
    <BottomContainer id='product detail description'>
    {
        handelDetailImg()
    }

    
    {
      <div>
        {description}
      </div>
    }
    
    </BottomContainer>    


    </ContentsWrapper>
    )




}

export default ProductData;