import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import InquiryContents from '../components/InquiryContents'
import InquiryList from '../components/InquiryList'
import ContentsWrapper from '../components/elements/ContentsWrapper'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const Inquiry = () => {
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const getQuestions = async () => {
        const { data: res } = await axios.get('/api/user/customerquestion/' + params.id)
        setQuestions(res)
        setIsLoading(false)
      }
    
      useEffect(() => {
        getQuestions()
        console.log(typeof setQuestions)
      }, [])

    return (
            <Wrapper>
                <ContentsWrapper>
                    {
                        isLoading ? <div style={{margin: '0 32px 64px'}}>Loading...</div> :
                            questions.length === 0 ? 
                            <InquiryContents /> :
                            <InquiryList questions={questions} setQuestions={setQuestions} />
                    }
                </ContentsWrapper>
            </Wrapper>
    );
};

export default Inquiry;