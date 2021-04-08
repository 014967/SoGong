import React from 'react'
import styled from 'styled-components'

// TODO: 로고 제작 이후 img로 변경
const StyledLogo = styled.div`
  color: ${props => props.theme.color[props.color] || props.theme.color.primary};
  font-size: 48px;
  font-family: ${({ theme }) => theme.font.medium};
`
const Logo = () => (
  <StyledLogo>
    K-SINSA
  </StyledLogo>
)


export default Logo