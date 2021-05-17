import React, { useState, useEffect, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios'
import DatePicker from "react-datepicker";
import HeaderButton from './elements/HeaderButton';
import GetEventData from './GetEventData';
import CheckBox from './elements/CheckBox'
import EnterEventNotice from './EnterEventNotice'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`
const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 64px;
  & > * + * {
    margin-left: 16px;
  };
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 242px 0 120px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`

const TableHeaderContent = styled.div`
  width: ${(props) => props.width};
  font-size: 20px;
  text-align: center;
`
const regDate = date => date.split('.')[0].replace('T', '').replace('-', '').replace('-', '').replace(':', '').replace(':', '').slice(2)

const EventNotice = () => {
  const [eventList, setEventList] = useState([])
  const [enter, setEnter] = useState(false)
  const [checked, setChecked] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [modifiedFlag, setModifiedFlag] = useState(false)
  const [buttonColor, setButtonColor] = useState('disabled')
  const [order, setOrder] = useState(false) //최신순(default): false, 오래된순: true
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  

  const handleEnter = () => {
    setEnter(true)
  }

  const handleCheckedAll = () => {
    setCheckedAll(prev => !prev)
    setChecked(prev => [...prev.fill(!checkedAll)])
  }

  const handleAvailable = async () => {
    const eventIds = []
    checked.forEach((isChecked, i) => {
      if (isChecked) {
        eventIds.push(eventList[i]._id)
      }
    })
    const res = await axios.post('/api/events/available', { eventIds })
      .catch((err) => console.log('error'))
    .then(setEventList([]))
    .then(setModifiedFlag(true))
  }

  const handleUnavailable = async () => {
    const eventIds = []
    checked.forEach((isChecked, i) => {
      if (isChecked) {
        eventIds.push(eventList[i]._id)
      }
    })
    const res = await axios.post('/api/events/unavailable', { eventIds: eventIds })
      .catch((err) => console.log('error'))
    .then(setEventList([]))
    .then(setModifiedFlag(true))
  }

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const ids = []
      const paths = []
      console.log(eventList)
      checked.forEach((isChecked, i) => {
        if (isChecked) {
          ids.push(eventList[i]._id)
          paths.push(eventList[i].imgPath)
        }
      })
      const res = await axios.post('/api/events/delete', { eventIds: ids })
        .catch((err) => console.log('error'))
      console.log(paths)
      const resImg = await axios.post('/eventImgDel', { imgPaths: paths })
        .catch((err) => console.log('error', err))
      .then(setEventList([]))
      .then(setModifiedFlag(true))
    }
  }

  const handleOrder = () => {
    setOrder(prev => !prev)
  }

  const FilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <HeaderButton background="secondary"
        onClick={onClick} ref={ref}>
        {value || '필터링'}
      </HeaderButton>
    ),
  )

  useEffect(() => {
    console.log(eventList)
  }, [eventList])

  useEffect(() => {
    setCheckedAll(checked.every(v => v) && eventList.length !== 0)
    setButtonColor(checked.some(v => v) ? 'secondary' : 'disabled')
  }, [checked])

  useEffect(() => {
    if (order) {
      setEventList(prev => [...prev.sort((h, t) => regDate(h.date) - regDate(t.date))])
    } else {
      setEventList(prev => [...prev.sort((h, t) => regDate(t.date) - regDate(h.date))])
    }
  }, [order])

  useEffect(() => {
  }, [dateRange])

  return (
      <Container>
        {
          enter ? (
            <EnterEventNotice setEnter={setEnter} />
          ) : (
            <>
              <Header>
              <CheckBox checked={checkedAll} onClick={handleCheckedAll} />
              <ButtonsContainer>
                <HeaderButton background={buttonColor} onClick={handleAvailable}>선택 활성화</HeaderButton>
                <HeaderButton background={buttonColor} onClick={handleUnavailable}>선택 비활성화</HeaderButton>
                <HeaderButton background={buttonColor} onClick={handleDelete}>선택 삭제</HeaderButton>
                <HeaderButton background="secondary" onClick={handleOrder}>
                  {order ? '최신 순' : '오래된 순'}
                </HeaderButton>
                <DatePicker
                  selectsRange
                  isClearable
                  startDate={startDate}
                  endDate={endDate}
                  onChange={update => {
                    setDateRange(update)
                  }}
                  // customInput={<FilterButton />}
                />
                  <HeaderButton background="primary" right onClick={handleEnter}>등록</HeaderButton>
                </ButtonsContainer>
              </Header>
              <TableHeader>
                <TableHeaderContent width="619px">제목</TableHeaderContent>
                <TableHeaderContent width="201px">활성화/비활성화</TableHeaderContent>
                <TableHeaderContent width="185px">진행기간</TableHeaderContent>
              </TableHeader>
              <GetEventData eventList={eventList} setEventList={setEventList}
                checked={checked} setChecked={setChecked}
                modifiedFlag={modifiedFlag} setModifiedFlag={setModifiedFlag} />
            </>
          )
        }
      </Container>
  )
}

export default EventNotice