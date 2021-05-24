import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
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

const DateRange = styled.div`
  width: 185px;
  text-align: center;
`

const regDate = date => date.split('.')[0].replace('T', ' ').replace('-', '.').replace('-', '.').slice(2)
const regDate2 = date => date.split('.')[0].replace('T', '').replace('-', '').replace('-', '').replace(':', '').replace(':', '')
const regDate3 = date => `${date.getFullYear()}${date.getMonth() < 9 ? 0 : ''}${date.getMonth() + 1}${date.getDate() < 9 ? 0 : ''}${date.getDate()}000000`

const GetEventData = ({ eventList, setEventList, checked, setChecked, modifiedFlag, setModifiedFlag, startDate, endDate, handleAlter }) => {

  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory();

  const getEvents = async () => {
    const res = await axios.get("/api/eventsAvailable")
    const { data: events } = await axios.get("/api/events")
    .catch((err) => console.log('error'))
    setEventList(events)
    setIsLoading(false)
    setChecked([...Array(events.length).fill(false)])
    return await new Promise(r => r(events))
  }

  const handleChecked = index => () => {
    setChecked(prev => [...prev.map((v, i) => 
      i === index ? !v : v
    )])
  }

  const changeDateRange = async () => {
    if (startDate && endDate) {
      setIsLoading(true)
      await getEvents()
      const newEndDate = new Date(endDate.getTime())
      newEndDate.setDate(newEndDate.getDate() + 1)
      setEventList(prev => [...prev.filter(evt => {
        console.log(regDate2(evt.date))
        console.log(regDate2(evt.due))
        console.log(regDate3(startDate))
        console.log(regDate3(newEndDate))
        return (
          regDate2(evt.date) > regDate3(startDate) &&
          regDate2(evt.due) < regDate3(newEndDate)
        )
      })])
    }}

  useEffect(() => {
    getEvents()
    // if (eventList.some(event => event.imgPath === 'no image'))
	}, [])

  useEffect(() => {
    if (eventList.some(event => event.imgPath === 'no image')) {
      console.log('no image occured')
      console.log(eventList)
      setModifiedFlag(true)
    }
  }, [eventList])

  useEffect(() => {
    if (modifiedFlag) {
      setIsLoading(true)
      getEvents()
      setModifiedFlag(false)
    }
	}, [modifiedFlag])

  useEffect(() => {
    changeDateRange()
  }, [startDate, endDate])

    return (
      <Container>
        {isLoading ? 'Loading...' : eventList.map((data, index) => (
            <Row key={index}>
              <CheckBox checked={checked[index]} onChange={handleChecked(index)}/>
              <Title>{data.title}</Title>
              <Available>{data.available ? '활성화' : '비활성화'}</Available>
              <DateRange>{regDate(data.date)}<br />~<br />{regDate(data.due)}</DateRange>
              <Button background="primary" onClick={() => {handleAlter(data)}}>수정</Button>
            </Row>
          )
        )}
      </Container>
    )
}

export default GetEventData;