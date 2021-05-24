import styled from 'styled-components'

const Text = styled.div`
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.size};
`

export default Text