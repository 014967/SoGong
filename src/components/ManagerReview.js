import react,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
`

const ManagerReview = () => 
{

    const [reviewList, getReviewList] = useState();

    const getReview = async () =>
    {

        const {data : review} = await axios.get(`/admin/product/review/${}`)
    }

    return (
        <Container>
            {






            }






        </Container>



    )
}

export default ManagerReivew;