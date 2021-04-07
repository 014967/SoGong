import styled from 'styled-components'

const Text = styled.div`
  color: ${props => props.theme.color[props.color]};
`

export default Text