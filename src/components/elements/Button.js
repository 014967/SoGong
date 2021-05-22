import styled from 'styled-components';

const Button = styled.button`
  width: 164px;
  height: 48px;
  color: white;
  background: ${(props) => props.theme.color[props.background] || props.theme.color.secondary};
  border: none;
  border-radius: 32px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font.light};
  cursor: ${({ background }) => background === 'disabled' ? 'arrow' : 'pointer'};
  &:focus {
    outline: none;
  }
`

export default Button
