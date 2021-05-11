import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios'
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

const EventNotice = () => {

  const [enter, setEnter] = useState(false)
  const [checked, setChecked] = useState([])
  const [checkedAll, setCheckedAll] = useState(false)
  const [modifiedFlag, setModifiedFlag] = useState(false)
  const [buttonColor, setButtonColor] = useState('disabled')
  const [order, setOrder] = useState(false) //최신순(default): false, 오래된순: true
  const [eventList, setEventList] = useState([])

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
      checked.forEach((isChecked, i) => {
        if (isChecked) {
          ids.push(eventList[i]._id)
          paths.push(eventList[i].imgPath)
        }
      })
      const res = await axios.post('/api/events/delete', { eventIds: ids })
        .catch((err) => console.log('error'))
      const resImg = await axios.post('/eventImgDel', { imgPaths: paths })
        .catch((err) => console.log('error'))
      .then(setEventList([]))
      .then(setModifiedFlag(true))
    }
  }

  const handleOrder = () => {
    setOrder(prev => !prev)
  }

  useEffect(() => {
    setCheckedAll(checked.every(v => v) && eventList.length !== 0)
    setButtonColor(checked.some(v => v) ? 'secondary' : 'disabled')
  }, [checked])

  useEffect(() => {
    if (order) {
      console.log(order)
      console.log(eventList)
    } else {
      console.log(order)
      console.log(eventList)
    }
  }, [order])

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
                    <HeaderButton background="secondary">필터링</HeaderButton>
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