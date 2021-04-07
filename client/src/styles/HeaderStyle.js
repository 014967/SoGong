import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #fff;
  display : flex;
  margin-left: 50px;
  margin-top : 25px;
`;



export const SignLink = styled(Link)`
text-decoration : none;
color : #FFFFFF;  //SIGN UP TEXT COLOR
cursor: pointer;
&.active {
  color: #FFFFFF;
}
`


export const NavLink = styled(Link)`

  color: #DF988F;
  top: 17px;
  left: 64px;
  width: 244px;
  font-size: 3em;
  align-items: left;
  text-decoration: none;
  cursor: pointer;
  &.active {
    color: #B20A2C;
  }
`;


export const NavMenu = styled.div`
  display: flex;
  align-items: left;
  
`;

export const Bars = styled.div`
display: flex;
width : 900px;
`


export const SignBtn = styled.button`
top: 32px;
left: 1276px;
width: 164px;
height: 48px;
font-size: 1.5em;
background: #B20A2C;
border-radius: 32px;
opacity: 1;
`;


export const SignBox = styled.input`
border-color : #B20A2C;
height: 40px;
margin-left: 0.3em;
`




