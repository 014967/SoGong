import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import DatePicker from "react-datepicker";
import HeaderButton from './elements/HeaderButton';
import GetEventData from './GetEventData';
import CheckBox from './elements/CheckBox'
import EnterEventNotice from './EnterEventNotice'
import AlterEventNotice from './AlterEventNotice'

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

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 300px;
  height: 48px;
  background: ${({ theme }) => theme.color.secondary};
  border-radius: 32px;
`

const FilterButtonText = styled.button`
  width: 129px;
  height: 48px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  &:focus {
    outline: none;
  }
`

const FilterButtonHyphen = styled.div`
  color: white;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
`

const regDate = date => date.split('.')[0].replace('T', '').replace('-', '').replace('-', '').replace(':', '').replace(':', '')
const regDate2 = date => `${date.getFullYear()}${date.getMonth() < 9 ? 0 : ''}${date.getMonth() + 1}${date.getDate() < 9 ? 0 : ''}${date.getDate()}000000`

const EventNotice = () => {
  const [eventList, setEventList] = useState([])
  const [enter, setEnter] = useState(false)
  const [alter, setAlter] = useState(null)
  const [checked, setChecked] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [modifiedFlag, setModifiedFlag] = useState(false)
  const [buttonColor, setButtonColor] = useState('disabled')
  const [order, setOrder] = useState(false) //최신순(default): false, 오래된순: true
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  

  const handleEnter = () => {
    setEnter(true)
  }

  const handleAlter = (data) => {
    setAlter(data)
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
      checked.forEach((isChecked, i) => {
        if (isChecked) {
          ids.push(eventList[i]._id)
          paths.push(eventList[i].imgPath)
        }
      })
      const res = await axios.post('/api/events/delete', { eventIds: ids })
        .catch((err) => console.log('error'))
      .then(setEventList([]))
      .then(setModifiedFlag(true))
    }
  }

  const handleOrder = () => {
    setOrder(prev => !prev)
  }

  const StartFilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <FilterButtonText
        onClick={onClick} ref={ref}>
        {value || '시작일'}
      </FilterButtonText>
    ),
  )
  const EndFilterButton = forwardRef( //datepicker custom input
    ({ value, onClick }, ref) => (
      <FilterButtonText
        onClick={onClick} ref={ref}>
        {value || '종료일'}
      </FilterButtonText>
    ),
  )

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
    if (startDate && endDate) {
      setEventList(prev => [...prev.filter(evt => {
        const newEndDate = new Date(endDate)
        newEndDate.setDate(newEndDate.getDate() + 1)
        return (
          regDate(evt.date) > regDate2(startDate) &&
          regDate(evt.due) < regDate2(newEndDate)
        )
      })])
    }
  }, [startDate, endDate])

  return (
      <Container>
        {
          enter ? (
            <EnterEventNotice setEnter={setEnter} />
          ) : (
            alter ? (
              <AlterEventNotice data={alter} setAlter={setAlter} />
            ) : (
              <>
                <Header>
                <CheckBox checked={checkedAll} onChange={handleCheckedAll} />
                <ButtonsContainer>
                  <HeaderButton background={buttonColor} onClick={handleAvailable}
                    disabled={buttonColor === 'disabled'}
                  >선택 활성화</HeaderButton>
                  <HeaderButton background={buttonColor} onClick={handleUnavailable}
                    disabled={buttonColor === 'disabled'}
                  >선택 비활성화</HeaderButton>
                  <HeaderButton background={buttonColor} onClick={handleDelete}
                    disabled={buttonColor === 'disabled'}
                  >선택 삭제</HeaderButton>
                  <HeaderButton background="secondary" onClick={handleOrder}>
                    {order ? '최신 순' : '오래된 순'}
                  </HeaderButton>
                  <FilterButtonContainer>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      isclearable
                      customInput={<StartFilterButton />}
                    />
                    <FilterButtonHyphen>~</FilterButtonHyphen>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={endDate}
                      onChange={date => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      isclearable
                      customInput={<EndFilterButton />}
                    />
                  </FilterButtonContainer>
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
                  modifiedFlag={modifiedFlag} setModifiedFlag={setModifiedFlag} 
                  startDate={startDate} endDate={endDate} handleAlter={handleAlter} />
              </>
            )
          )
        }
      </Container>
  )
}

export default EventNotice