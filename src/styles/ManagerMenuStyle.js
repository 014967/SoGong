import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';


export const Nav = styled.nav`
background: #fff;
  margin-left: 10px;
  margin-top : 25px;

`;
export const Menu = styled.ul`
    list-style : none;


`;

export const MenuItem = styled.li`
display : inline-block;
`

export const MenuLink = styled(Link)`
color: #CCD2D6;
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
`
