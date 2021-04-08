import React from 'react';
import { Nav, Menu, MenuItem ,MenuLink } from '../../styles/ManagerMenuStyle';
const ManagerMenu = () =>
{
    return (
        <>
        <Nav>
            <Menu>
                <MenuItem >
                    <MenuLink exact to= '/event' activeStyle>
                    이벤트/공지
                    </MenuLink>
                    
                </MenuItem>

            </Menu>
            <Menu>
                <MenuItem>
                <MenuLink  to ='/product' activeStyle>
                상품등록
                </MenuLink>

                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem>
                    <MenuLink to ='/logout' activeStyle>
                    로그아웃
                    </MenuLink>

                </MenuItem>
                
            </Menu>
        </Nav>

        </>


    )
}

export default ManagerMenu;