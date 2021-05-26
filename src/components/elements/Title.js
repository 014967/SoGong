import styled from 'styled-components'

const Title = styled.h2`
  font-size: 64px;
  font-family: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.color.primary};
  margin-bottom: 16px;
  cursor: default;
`

export default Title