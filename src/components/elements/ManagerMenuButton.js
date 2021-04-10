import styled from 'styled-components'

const ManagerMenuButton = styled.button`
  font-size: 32px;
  font-family: ${({ theme }) => theme.font.medium};
  color: ${(props) => props.selected ? 
    props.theme.color.primary : props.theme.color.secondary};
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  outline: 0;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`

export default ManagerMenuButton