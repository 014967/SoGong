import react,{useState , useEffect} from 'react'
import { FaStar } from 'react-icons/fa';
import styled  from 'styled-components';
import Button from './elements/Button';
import axios from 'axios';
import {useParams , useHistory} from 'react-router-dom';
import { CollectionsBookmarkRounded, Receipt } from '@material-ui/icons';


const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.color.primary};
    &:focus {
        outline: none;
    }
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.light};
    height: 100px;
    width: 200px;
    max-width: 894px;
    padding: 8px;
    resize: none;
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



const BigTitle = styled.div`

`
const InputArea = styled.div`
display : flex`

const TitleContainer = styled.div`
display : flex;
`
const ReviewContainer = styled.div`
display : flex;
`

const ProductContainer = styled.div``
const RecommandContainer = styled.div``
const DeliveryContainer = styled.div``
const ScoreContainer = styled.div``
const CommentContainer = styled.div``

//recommend
const Recommand = styled.div`
display : flex`

//delivery
const Delivery = styled.div``


const RowContainer = styled.div`

`

const Container = styled.div`
display: flex;
    flex-direction: column;
    padding: 64px 32px 0;
    margin-bottom: 64px;
    margin-top : 200px;
    width: 100%;
    & > * + * {
        margin-top: 64px;
    }
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
const Image = styled.img`
width : 100px;
height : 100px;
`

const ListDiv = styled.div`
margin-top : 100px;`

const ARRAY = [0, 1, 2, 3, 4];
const UserReview = () =>
{

    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const [productData , setProductData]= useState([])
    const [recommend, setRecommend] = useState([]) //추천 적극추천, 추천 ,비추천 
    const [deliveryRating, setDeliveryRating] = useState([]) // 배송 평가 매우빠름, 빠름 ,보통
    const [score , setScore] = useState([]) //점수 1~5점
    const [comment ,setComment]= useState([]) // 리뷰 이거 글자수 제한있어야함
    
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

    const handleScore = (i,e) =>
    {
        setScore(prev => [...prev.map((v, index) => 
            i === index ? e.target.value : v
        )])
    }

    const handleBackbutton = e =>
    {
        history.goBack();
    }

    const handleSubmit = async() =>
    {
        if (recommend.some(v => !v) || deliveryRating.some(v => !v) || 
            comment.some(v => v.length === 0)) {
            alert("리뷰를 전부 작성해주세요.")
            return
        }
        if (comment.some(v => v.length > 20)) {
            alert('코멘트가 너무 깁니다.')
            return
        }

        console.log(username)
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
            setComment(Array(product[0].product.length).fill(false))
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
        <Container className ="최상위 컨테이너">
            <Title>K-SINSA 
                주문 리뷰</Title>
        
       
        <TitleContainer>
            <Title>상품명</Title>
            <Title>추천</Title>
            <Title>배송평가</Title>
            <Title>점수</Title>
            <Title>후기</Title>
        </TitleContainer>
        
        <ListDiv>
        
          {  
            productData ? productData.map((data, i) =>
            (
                
                <RowContainer key={i}>
                    <ReviewContainer>
                        <ProductContainer>
                            <Title>{data.name}</Title>
                        </ProductContainer>
                        <RecommandContainer>
                            <Recommand>
                                <input type="radio" value="추천" checked={recommend[i] ==="추천"} onChange={(e) =>handleRecommend(i,e)}/>
                                            추천
                            </Recommand>
                            <Recommand>
                            <input type="radio" value="적극 추천" checked={recommend[i] ==="적극 추천"} onChange={(e)=>handleRecommend(i,e)}/> 
                                            적극 추천

                            </Recommand>
                            <Recommand>
                            <input type="radio" value="비추천" checked={recommend[i] ==="비추천"} onChange={(e)=>handleRecommend(i,e)}/>
                                            비추천
                            </Recommand>

                        </RecommandContainer>
                        <DeliveryContainer>
                            <Delivery>
                                <input type="radio" value="보통" checked={deliveryRating[i] ==="보통"} onChange={(e)=>handleDelivery(i,e)}/>
                                    보통
                            </Delivery>
                            <Delivery>
                                <input type="radio" value="빠름"  checked={deliveryRating[i] ==="빠름"} onChange={(e)=>handleDelivery(i,e)}/>
                                    빠름
                            </Delivery>
                            <Delivery>
                                <input type="radio" value="매우빠름" checked={deliveryRating[i] ==="매우빠름"}  onChange={(e)=>handleDelivery(i,e)}/>
                                    매우빠름
                            </Delivery>
                                

                        </DeliveryContainer>
                        <ScoreContainer>
                            <select
                            value={score[i]}
                            onChange ={(e)=>handleScore(i,e)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>

                            </select>
                        </ScoreContainer>
                        <CommentContainer>

                        <Input placeholder="코멘트 입력(최대 20자)" type='text' onChange={(e)=>handleComment(i,e)}></Input>
                        </CommentContainer>

                    </ReviewContainer>
                </RowContainer>
            ))

         : "로딩중" }
         
         
         </ListDiv>
    
    
            <div className="취소하기 등록하기 버튼">
                <Button onClick={handleBackbutton}>취소하기</Button>
                <Button onClick={handleSubmit}>등록하기</Button>
            </div>
           
        </Container>
    )


}

export default UserReview;
