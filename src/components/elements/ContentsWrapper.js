import React from 'react'
import styled from 'styled-components'

const ContentsWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.wide ? '1792px' : '1200px'};
  padding: 64px 64px 0;
  margin-bottom: 128px;
  box-shadow: 0px 10px 40px #00000029;
  border-radius: 32px;
`

export default ContentsWrapper