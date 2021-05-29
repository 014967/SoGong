import react,{useState , useEffect} from 'react'
import { FaStar } from 'react-icons/fa';
import styled  from 'styled-components';
import Button from './elements/Button';
import axios from 'axios';
import {useParams , useHistory} from 'react-router-dom';


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

const SmallTextarea = styled.textarea`

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


const ARRAY = [0, 1, 2, 3, 4];
const UserReview = () =>
{

    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const [recommend, setRecommend] = useState() //추천 적극추천, 추천 ,비추천 
    const [deliveryRating, setDeliveryRating] = useState() // 배송 평가 매우빠름, 빠름 ,보통
    const [score , setScore] = useState() //점수 1~5점
    const [comment ,setComment]= useState() // 리뷰 이거 글자수 제한있어야함
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [productId , setProductId] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [purchaseId, setPurChaseId] = useState('');

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
      };
    
      useEffect(() => {
        
        setScore(clicked.filter(Boolean).length)
      }, [clicked]); //컨디마 컨디업

    const handleDelivery = e =>
    {
        setDeliveryRating(e.target.value);
    }

    const handleRecommend = e =>
    {
        setRecommend(e.target.value);
    }

    const handleComment = e =>
    {
        setComment(e.target.value);

    }

    const handleBackbutton = e =>
    {
        history.goBack();
    }

    const handleSubmit = async() =>
    {
        console.log(score)
        const { data : reviews } = await axios.post('api/addreview',
        {
            productId : productId,
            userId : userId,
            recommend : recommend,
            deliveryrating : deliveryRating,
            score : score,
            comment : comment,
            purchaseId : purchaseId,
        })
      
    
        history.goBack();
    }

    const getProductData = async () =>
    {
        if(id.length !== 0 )
        {
            const {data : product} = await axios.get(`/api/purchases/${id}`)
            console.log(product)
            setProductId(product[0].product[0]._id)
            setProductTitle(product[0].product[0].name)
            setUserId(product[0].user_id)
            setPurChaseId(id)
        }
        
    }
    useEffect(()=>
    {
        getProductData()
    },[])

    useEffect(()=>
    {
        getProdudctImg()
    },[productId])
    const getProdudctImg = async () =>
    {
        if(productId.length !==0)
        {
            const {data : product} =await axios.get(`/api/products/${productId}`)
         
            setProductImg(product[0].img)
        }
    }

    return(
        <Container className ="최상위 컨테이너">
            <div className="배송 컨테이너">
                <div className="서비스 리뷰 텍스트">
                    <BigTitle>
                        K-SINSA 배송 서비스 리뷰
                    </BigTitle>
                </div>
                <div className="배송 만족도">
                    <Title>만족도</Title>
                    <InputArea>
                        <input type="radio" value="보통" checked={deliveryRating ==="보통"} onChange={handleDelivery}/>
                        보통
                    </InputArea>
                    
                    <InputArea>
                        <input type="radio" value="빠름"  checked={deliveryRating ==="빠름"} onChange={handleDelivery}/>
                        빠름
                    </InputArea>
                    <InputArea>
                        <input type="radio" value="매우빠름" checked={deliveryRating ==="매우빠름"}  onChange={handleDelivery}/>
                        매우빠름
                    </InputArea>
                </div>

            </div>
            <div className = "상품 품질 리뷰 컨테이너">
                <div className="상품 품질 리뷰 텍스트">
                    <BigTitle>
                        상품 품질 리뷰
                    </BigTitle>
                </div>
                <div className = "상품 이미지 및 별 평점(1~5)">
                    <div className="이미지 ">
                        <Image src={productImg}/>
                    </div>
                    <div className="상품 이름 및 평점">
                        <Title className="상품 이름 가져와야함">
                            {
                                productTitle
                            }
                        </Title>
                        <Stars>
                            {ARRAY.map((el, idx) => {
                                return (
                                <FaStar 
                                key={idx}
                                size="50"
                                onClick={() => handleStarClick(el)}
                                className={clicked[el] && 'yellowStar'}
                                 />
                                );
                            })}
                        </Stars>
                    </div>
                </div>
                <div className ="리뷰"> 
                    <div className="리뷰 텍스트">
                    <Title>리뷰</Title>
                    </div>
                    <div className="리뷰 평가" >
                        <div>
                            옷에 대한 만족도를 알려주세요
                            <InputArea>
                                <input type="radio" value="추천" checked={recommend ==="추천"} onChange={handleRecommend}/>
                                추천
                            </InputArea>
                            
                            <InputArea>
                                <input type="radio" value="적극 추천" checked={recommend ==="적극 추천"} onChange={handleRecommend}/> 
                                적극 추천
                            </InputArea>
                            <InputArea>
                                <input type="radio" value="비추천" checked={recommend ==="비추천"} onChange={handleRecommend}/>
                                비추천
                            </InputArea>
                        </div>
                    </div>



                </div>
                <div className = "상세리뷰">
                    <Textarea placeholder="상세 설명 입력" onChange={handleComment}></Textarea>
                </div>
                
            </div>

            <div className="취소하기 등록하기 버튼">
                <Button onClick={handleBackbutton}>취소하기</Button>
                <Button onClick={handleSubmit}>등록하기</Button>
            </div>
        </Container>
    )


}

export default UserReview;
