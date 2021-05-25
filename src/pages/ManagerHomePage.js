import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ManagerContents from '../components/ManagerContents'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 282px;
`

const Loading = styled.div`
    padding: 200px 0 1000px;
`

const ManagerHomePage = ({ history }) => {

    const [isLoading, setIsLoading] = useState(true)

    const isAdmin = async () => {
        const { data: response } = await axios.get('/api/auth')
        if (!response.isAdmin) {
            alert('관리자만 접근 가능합니다.')
            history.push('/')
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        isAdmin()
    }, [])

    return (
        <Wrapper>
            {isLoading ? <Loading>Loading...</Loading> : 
                <ManagerContents history={history} />
            }
        </Wrapper>
    )
}

export default ManagerHomePage;