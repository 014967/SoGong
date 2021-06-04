import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'

const Dummy = styled.div`
    height: 3000px;
`

const PaySuccess = () => {
    const history = useHistory()
    const location = useLocation()

    const handleSuccess = async () => {
        const _id = window.localStorage.getItem('_id')
        const isWishList = window.localStorage.getItem('wishlist')
        const { data: res } = await axios.post('/api/purchaseStatus/' + _id, {
            status: '결제 완료',
            isWishList
        })
        alert('결제가 완료되었습니다.')
        window.localStorage.setItem('_id', '')
        window.localStorage.setItem('history', '')
        window.localStorage.setItem('wishlist', '')
        history.push('/user/orderlist')
    }

    useEffect(async () => {
        handleSuccess()
    }, [])

    return (
        <>
            <Dummy></Dummy>
        </>
    );
};
export default PaySuccess;