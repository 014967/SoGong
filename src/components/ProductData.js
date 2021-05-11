import react , {useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'





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
const TopComponent = styled.div`
    display : flex;
    width :100 %;

`

const BottomComponent = styled.div`
    width : 100%;
`




const ProductData = (props) =>
{ 

    console.log(props.location.state.data);
    const [category, setCategory] = useState();
    const [img , setImg] = useState();
    const [name , setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        setName(props.location.state.data.name);
        setPrice(props.location.state.data.price);
        setDescription(props.location.state.data.detail);

      }, []);

    return (

        <Container>

        <TopComponent id= 'topmenu'>
            <div id='ctg, img'>
            <Category>{name}</Category>
            
            <Img />
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
    </TopComponent>    
    <BottomComponent id='product detail description'>
    {description}
    
    
    </BottomComponent>    


    </Container>
    )




}

export default ProductData;