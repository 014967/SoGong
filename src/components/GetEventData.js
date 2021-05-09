import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import CheckBox from './elements/CheckBox'
import Button from './elements/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 64px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  & > *:first-child {
    margin-right: 64px;
  }
  & > *:last-child {
    margin-left: 64px;
  }
`
const Title = styled.div`
  width: 619px;
  text-align: center;
`

const Available = styled.div`
  width: 201px;
  text-align: center;
`

const Date = styled.div`
  width: 185px;
  text-align: center;
`

const regDate = date => date.split('.')[0].replace('T', ' ').replace('-', '.').replace('-', '.').slice(2)

const GetEventData = ({ eventList, setEventList, checked, setChecked }) => {

  const [isLoading, setIsLoading] = useState(true)

  const getEvents = async () => {
    const { data: events } = await axios.get("/api/events")
    setEventList(events)
    setIsLoading(false)
    setChecked([...Array(events.length).fill(false)])
  }

  const handleChecked = index => () => {
    setChecked(prev => [...prev.map((v, i) => 
      i === index ? !v : v
    )])
  }

  useEffect(() => {
    getEvents()
	}, [])

    return (
      <Container>
        {isLoading ? 'Loading...' : eventList.map((data, index) => (
            <Row key={index}>
              <CheckBox checked={checked[index]} onClick={handleChecked(index)}/>
              <Title>{data.title}</Title>
              <Available>{data.available ? '활성화' : '비활성화'}</Available>
              <Date>{regDate(data.date)}<br />~<br />{regDate(data.due)}</Date>
              <Button background="primary">수정</Button>
            </Row>
          )
        )}
      </Container>
    )
}

export default GetEventData;