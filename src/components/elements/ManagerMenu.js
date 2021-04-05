import React, { Component, useState} from 'react';
import { NoticeEvent } from '../../pages';
import { Nav, Menu, MenuItem ,MenuLink, Logout } from '../styles/ManagerMenuStyle';
const ManagerMenu = () =>
{
    return (
        <>
        <Nav>
            <Menu>
                <MenuItem >
                    <MenuLink exact to= '/Event' activeStyle>
                    공지/이벤트
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
                    
                    <Logout to ='/'>
                        로그아웃
                    </Logout>
                    
              

                </MenuItem>
                
            </Menu>
        </Nav>

        </>


    )
}

export default ManagerMenu;