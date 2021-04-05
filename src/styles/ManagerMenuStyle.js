import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';


export const MComponent = styled.div`

margin-left : 50px;
margin-right : 50px;
margin-top : 25px;

display : flex;

top: 285px;
left: 64px;
width: 1690px;
height: 668px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 10px 40px #00000029;
border-radius: 32px;
opacity: 1;
`
export const Nav = styled.nav`

 width : 244px;
 padding : 20px;


 

`;
export const Menu = styled.ul`
    list-style : none;


`;

export const MenuItem = styled.li`
display : inline-block;
`

export const MenuLink = styled(Link)`
color: #DF988F;
  top: 17px;
  left: 64px;
  width: 244px;
  font-size: 2em;
  align-items: left;
  text-decoration: none;
  cursor: pointer;
  &.active {
    color: #B20A2C;
  }
`

export const Logout = styled(Link)`
color: #DF988F;
  top: 17px;
  left: 64px;
  width: 244px;
  font-size: 2em;
  align-items: left;
  text-decoration: none;
  cursor: pointer;
`




