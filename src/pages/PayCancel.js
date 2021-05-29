import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const Dummy = styled.div`
    height: 3000px;
`

const PayCancel = () => {
    const history = useHistory()

    useEffect(() => {
        alert('결제가 취소되었습니다.')
        const path = window.localStorage.getItem('history')
        window.localStorage.setItem('history', '')
        window.localStorage.setItem('_id', '')
        window.localStorage.setItem('wishlist', '')
        history.push(path)
    }, [])

    return (
        <Dummy></Dummy>
    );
};
export default PayCancel;