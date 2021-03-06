import react,{useState , useEffect} from 'react'
import { FaStar } from 'react-icons/fa';
import styled  from 'styled-components';
import Button from './elements/Button';
import axios from 'axios';
import {useParams , useHistory} from 'react-router-dom';
import { CollectionsBookmarkRounded, Receipt } from '@material-ui/icons';
import Title from './elements/Title'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactStars from "react-rating-stars-component";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 40px;
    width: 320px;
    max-width: 894px;
    padding: 8px;
    resize: none;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  margin-top: 64px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 132px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`


const RowContent = styled.div`
  width: ${(props) => props.width};
  text-align: center;
`

const RadioContainer = styled(RowContent)`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    display: flex;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 16px;
    & > * + * {
        margin-left: 16px;
    }
`

const Container = styled.div`
display: flex;
    flex-direction: column;
    padding: 64px 32px 0;
    margin-bottom: 64px;
    width: 100%;
`

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`

const UserReview = () =>
{

    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const [productData , setProductData]= useState([])
    const [recommend, setRecommend] = useState([]) //?????? ????????????, ?????? ,????????? 
    const [deliveryRating, setDeliveryRating] = useState([]) // ?????? ?????? ????????????, ?????? ,??????
    const [score , setScore] = useState([]) //?????? 1~5???
    const [comment ,setComment]= useState([]) // ?????? ?????? ????????? ??????????????????
    
    const [productId , setProductId] = useState('');
    const [userId, setUserId] = useState('');
    const [purchaseId, setPurchaseId] = useState('');
    const [username, setUsername] = useState('');

    

    const handleDelivery = (i,e) =>
    {
        setDeliveryRating(prev => [...prev.map((v, index) => 
            i === index ? e.target.value : v
        )])
    }

    const handleRecommend = (i,e) =>
    {
        setRecommend(prev => [...prev.map((v, index) => 
            i === index ? e.target.value : v
        )])
    }

    const handleComment = (i,e) =>
    {
        setComment(prev => [...prev.map((v, index) => 
            i === index ? e.target.value : v
        )])

    }

    const handleScore = (i, r) =>
    {
        setScore(prev => [...prev.map((v, index) => 
            i === index ? r : v
        )])
    }

    const handleBackbutton = e =>
    {
        history.goBack();
    }

    const handleSubmit = async () => {
        if (recommend.some(v => !v) || deliveryRating.some(v => !v) || 
            comment.some(v => v.length === 0)) {
            alert("????????? ?????? ??????????????????.")
            return
        }
        if (comment.some(v => v.length > 20)) {
            alert('???????????? ?????? ?????????.')
            return
        }
        const { data : reviews } = await axios.post('/api/addreviewBypurchase', {
            reviews: productId.map((p, i) => ({
                productId: p,
                userId,
                recommend: recommend[i],
                deliveryrating: deliveryRating[i],
                score: score[i],
                comment: comment[i],
                purchaseId,
                username
            }))
        })
        alert('?????????????????????.')
        history.goBack();
    }

    

    const getProductData = async () =>
    {
        if(id.length !== 0 )
        {
            const {data : product} = await axios.get(`/api/purchases/${id}`)
            console.log(product)
            setProductData(product[0].product)
            setRecommend(Array(product[0].product.length).fill(false))
            setComment(Array(product[0].product.length).fill(''))
            setDeliveryRating(Array(product[0].product.length).fill(false))
            setScore(Array(product[0].product.length).fill(5))
            setProductId(product[0].product.map(p => p._id))
            setUserId(product[0].user_id)
            setPurchaseId(id)
            setUsername(product[0].username)
        }
        
    }
    useEffect(()=>
    {
        getProductData()
    },[])


    return(
        <Container>
            <Title>REVIEW</Title>
            <TableHeader>
              <TableHeaderContent width="200px">?????????</TableHeaderContent>
              <TableHeaderContent width="150px">??????</TableHeaderContent>
              <TableHeaderContent width="150px">????????????</TableHeaderContent>
              <TableHeaderContent width="120px">??????</TableHeaderContent>
              <TableHeaderContent width="350px">??????</TableHeaderContent>
            </TableHeader>
            {  
                productData ? productData.map((data, i) =>
                (
                    <Row key={i}>
                        <RowContent width="200px">{data.name.length > 10 ? data.name.slice(0, 10) + '...' : data.name}</RowContent>
                        <RadioContainer width="150px">
                            <Label>
                                <Radio value="?????? ??????" checked={recommend[i] ==="?????? ??????"} onChange={(e)=>handleRecommend(i,e)}/> 
                                ?????? ??????
                            </Label>
                            <Label>
                                <Radio value="??????" checked={recommend[i] ==="??????"} onChange={(e) =>handleRecommend(i,e)} />
                                ??????
                            </Label>
                            <Label>
                                <Radio value="?????????" checked={recommend[i] ==="?????????"} onChange={(e)=>handleRecommend(i,e)}/>
                                ?????????
                            </Label>
                        </RadioContainer>
                        <RadioContainer width="150px">
                            <Label>
                                <Radio value="????????????" checked={deliveryRating[i] ==="????????????"}  onChange={(e)=>handleDelivery(i,e)}/>
                                    ?????? ??????
                            </Label>
                            <Label>
                                <Radio value="??????"  checked={deliveryRating[i] ==="??????"} onChange={(e)=>handleDelivery(i,e)}/>
                                    ??????
                            </Label>
                            <Label>
                                <Radio value="??????" checked={deliveryRating[i] ==="??????"} onChange={(e)=>handleDelivery(i,e)}/>
                                    ??????
                            </Label>
                        </RadioContainer>
                        <RowContent width="150px">
                            <ReactStars
                                count={5}
                                value={5}
                                onChange={(r) => handleScore(i, r)}
                                size={24}
                                activeColor="#ffd700"
                            />
                            {/* <select
                            value={score[i]}
                            onChange ={(e)=>handleScore(i,e)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                        </RowContent>
                        <RowContent width="320px">
                            <Input placeholder="????????? ??????(?????? 20???)" type='text' value={comment[i]} onChange={(e)=>handleComment(i,e)}></Input>
                        </RowContent>
                    </Row>
                ))
                : "?????????"
            }
            <ButtonContainer>
                <Button onClick={handleSubmit} background='primary'>??????</Button>
                <Button onClick={handleBackbutton}>??????</Button>
            </ButtonContainer>
        </Container>
    )
}

export default UserReview;
