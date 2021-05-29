import React from 'react'
import styled from 'styled-components'
import InquiryContents from '../components/InquiryContents'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 320px;
`

const Inquiry = () => {
    return (
        <Wrapper>
            <InquiryContents />
        </Wrapper>
    );
};

export default Inquiry;