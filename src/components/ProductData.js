import react , {useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ContentsWrapper from './elements/ContentsWrapper'




const Container = styled.div`
  width: 100%;
  margin-top: 230px;
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




const ProductData = (props) =>
{ 

  



    const [category, setCategory] = useState();
    const [img , setImg] = useState();
    const [name , setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    console.log(props);
    useEffect(() => {
        setImg(props.location.state.data.img);
        setName(props.location.state.data.name);
        setPrice(props.location.state.data.price);
        setDescription(props.location.state.data.detail);
        setCategory(props.location.state.data.category);

      }, [props]);



      console.log(img);
    return (

        <ContentsWrapper wide>

        <TopContainer id= 'topmenu'>
            <div>
            <Category>{category}</Category>
      
            {img ? <Img src={require('../assets/images/products/' + img).default} /> : 
             '...loading'}
             
           
            
            </div>

            <div id='name, price , etc'>
                <div id= 'product name'></div>
                <div id='product price'>
                    {price}
                </div>
            <div id='count, delivery'> 
                <div id='count'>
                </div>
                <div id='delivery'></div>

                </div>
            <div id='basket, buy'>
                <div id='basket'></div>
                <div id='buy'></div>
            </div>
            
        </div>
    </TopContainer>    
    <BottomContainer id='product detail description'>
    {description}
    
    
    </BottomContainer>    


    </ContentsWrapper>
    )




}

export default ProductData;