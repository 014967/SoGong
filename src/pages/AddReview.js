import React from 'react'
import styled from 'styled-components'
import ContentsWrapper from '../components/elements/ContentsWrapper'
import UserReview from '../components/UserReview'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const AddReview = () => {
    return (
        <Wrapper>
            <ContentsWrapper>
                <UserReview />
            </ContentsWrapper>
        </Wrapper>
    );
};

export default AddReview;