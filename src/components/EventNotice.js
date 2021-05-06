import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
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
  const [buttonColor, setButtonColor] = useState('disabled')
  const [eventList, setEventList] = useState([])

  const handleEnter = () => {
    setEnter(true)
  }

  const handleCheckedAll = () => {
    setCheckedAll(prev => !prev)
    setChecked(prev => [...prev.fill(!checkedAll)])
  }

  useEffect(() => {
    setCheckedAll(checked.every(v => v))
    setButtonColor(checked.some(v => v) ? 'secondary' : 'disabled')
    console.log(eventList)
  }, [checked])

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
                    <HeaderButton background={buttonColor}>선택 비활성화</HeaderButton>
                    <HeaderButton background={buttonColor}>선택 활성화</HeaderButton>
                    <HeaderButton background={buttonColor}>선택 삭제</HeaderButton>
                    <HeaderButton background="secondary">정렬하기</HeaderButton>
                    <HeaderButton background="secondary">필터링</HeaderButton>
                    <HeaderButton background="primary" right onClick={handleEnter}>등록</HeaderButton>
                  </ButtonsContainer>
                </Header>
                <TableHeader>
                  <TableHeaderContent width="619px">제목</TableHeaderContent>
                  <TableHeaderContent width="201px">활성화/비활성화</TableHeaderContent>
                  <TableHeaderContent width="185px">진행기간</TableHeaderContent>
                </TableHeader>
                <GetEventData eventList={eventList} setEventList={setEventList} checked={checked} setChecked={setChecked} />
              </>
            )
          }
      </Container>
  )
}

export default EventNotice