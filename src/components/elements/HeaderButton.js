import styled from 'styled-components';
import Button from './Button'

const HeaderButton = styled(Button)`
  margin-left: ${props => props.right && 'auto !important'};
`

export default HeaderButton
