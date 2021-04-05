import React from 'react'
import styled from 'styled-components'

// TODO: 로고 제작 이후 img로 변경
const StyledLogo = styled.div`
  color: ${({ theme }) => theme.color.primary};
  font-size: 48px;
  font-family: ${({ theme }) => theme.font.medium};
`
const Logo = () => (
  <StyledLogo>
    LOGO
  </StyledLogo>
)


export default Logo