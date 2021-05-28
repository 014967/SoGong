import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'

const PaySuccess = () => {
    const history = useHistory()
    const location = useLocation()

    const handleSuccess = async () => {
        const pg_token = location.search.split('=')[1]
        const tid = window.localStorage.getItem('tid')
        const { data: res } = await axios.post('/pay/success', {
            pg_token, tid
        })
        console.log(res)
        alert('결제가 완료되었습니다.')
        history.push('/user/orderlist')
    }

    useEffect(async () => {
        handleSuccess()
    }, [])

    return (
        <>
        <div>t</div>
        </>
    );
};
export default PaySuccess;