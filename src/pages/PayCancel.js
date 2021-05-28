import React, { useEffect } from 'react'


const PayCancel = () => {

    useEffect(() => {
        alert('결제가 취소되었습니다.')
        window.close()
    }, [])

    return (
        <>
        </>
    );
};
export default PayCancel;