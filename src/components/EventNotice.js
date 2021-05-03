import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './elements/Button';
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
  margin-right: 186px;
  padding-left: 64px;
  & > * + * {
    margin-left: 16px;
  };
  & > * {
    /* ${props => 
    props.background === 'primary' && 
    css`
      width: 500px !important;
      margin-left: auto;
    `} */
  }
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

  const handleEnter = () => {
    setEnter(true);
  }

  return (
      <Container>
          {
            enter ? (
              <EnterEventNotice setEnter={setEnter} />
            ) : (
              <>
                <Header>
                  <CheckBox />
                  <ButtonsContainer>
                    <Button background="disabled">선택 비활성화</Button>
                    <Button background="disabled">선택 활성화</Button>
                    <Button background="disabled">선택 삭제</Button>
                    <Button background="secondary">정렬하기</Button>
                    <Button background="secondary">필터링</Button>
                    <Button background="primary" right onClick={handleEnter}>등록</Button>
                  </ButtonsContainer>
                </Header>
                <TableHeader>
                  <TableHeaderContent width="619px">제목</TableHeaderContent>
                  <TableHeaderContent width="201px">활성화/비활성화</TableHeaderContent>
                  <TableHeaderContent width="185px">진행기간</TableHeaderContent>
                </TableHeader>
                <GetEventData />
              </>
            )
          }
      </Container>
  )
}

export default EventNotice