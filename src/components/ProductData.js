import react , {useState, useEffect } from 'react'
import {useHistory, useLocation} from 'react-router'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import ContentsWrapper from './elements/ContentsWrapper'
import Title from './elements/Title'


import Button from './elements/Button'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



const ProductData = (props) =>
{ 

  
  const params = useParams();
  console.log(params);
  const id = params.id;
  console.log(id);
  useEffect(()=>
  {
    console.log(props);

  },[props])



  const [d1, setD1] = useState([]);
  const location = useLocation();
  
   /*
    if (window.performance) {
      if (performance.navigation.type == 1) {
        getRefreshData()
      } else {
        console.log( "This page is not reloaded");
      }

    }*/

    if(props.location.state == "undefined")
    {
      getRefreshData()
    }
  

  const getRefreshData = async ()=>
  {
    if(id !== "")
    {
      const {data : product} = await axios.get(`/api/products/get/${id}`)
      /*setImg(props.location.state.data.img);
      setName(props.location.state.data.name);
      setPrice(props.location.state.data.price);
      setDescription(props.location.state.data.detail);
      setCategory(props.location.state.data.category);*/
      setD1(product);

    }
  }

  useEffect(()=>
  {
    console.log(d1)
  },[d1])


  


  const history = useHistory();

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

//modal
const classes = useStyles();
const [modalStyle] = react.useState(getModalStyle);
const [open , setOpen] = react.useState(false);

const handleOpen = ()=>{
  setOpen(true);
};
const handleClose = () =>
{
  setOpen(false);
};
const body = (
  <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
   
    </div>
);


    console.log(props);
    
    useEffect(() => {
      if(!img || !name || !price || !description || !category || !detailImgPath)
        {
          if(typeof props.location.state == "undefined")
          {
            getRefreshData();
          }
          else{
            setImg(props.location.state.data.img);
            setName(props.location.state.data.name);
            setPrice(props.location.state.data.price);
            setDescription(props.location.state.data.detail);
            setCategory(props.location.state.data.category);
           
          }
         }
      }, [props]);


      

      

    const handleOrderStock = e =>
    {
      setOrderStock(e.target.value);

    }


    const handelDetailImg = () =>
    {

      if(typeof props.location.state =="undefined")
      {

      }
      else{
        console.log(props)
        console.log(props.location)
      console.log(props.location.state)
      console.log(props.location.state.data)
      const result = [];
      for(let i= 0 ; i < props.location.state.data.detailImg.length; i++)
      {
        result.push(
          <Img src={require('../assets/images/products/'+props.location.state.data.detailImg[i]).default} />
            
          
        )
      }
      return result;
    }
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
                    /*history.push(
                     {
                       pathname : '/user/PostList'
                    }  
                    )*/
                    //popup()


                    handleOpen()
                  }}>
                  배송지 추가
                  </Button>
                  <Modal
                  open={open}
                  onClose={handleClose}  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                 {<UserPostList/>}


                  </Modal>
                  
                  
                  
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