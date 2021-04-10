import {React, useState,useEffect} from 'react';
import styled from 'styled-components';
import EventNotice from './EventNotice';
import Title from './Title';
import Product from './Product';
import { SelectAllRounded } from '@material-ui/icons';
import { Select } from '@material-ui/core';
const LeftMenu = styled.div`
    id : LeftMenu;
`
const Nav = styled.nav`
 padding : 5px;
 display : flex;

`;

const Menu = styled.ul`
    list-style : none;
    width : 200px;
`;

const MenuItem = styled.li`
display : inline-block;
`
const MenuLink = styled.button`


color : #B20A2C;
background : none;
  top: 17px;
  left: 64px;
  width: 200px;
  height : 50px;
  font-size: 1.7em;
  text-align : left;
  border : none;
  &:hover{
    color: ${({ theme }) => theme.color.primary};
  }
  &:focus{
      outline: none;
  }
`



const ManagerMenu = () =>
{ 
    const [MenuName, setMenuName] = useState("event");

    useEffect(()=>
    {
    console.log(MenuName);
        
    },[MenuName]);
  

  
            
 const handleItemClick =  e  =>
{
        setMenuName(e.target.value); 
}
            
  

    return (
    
       
    
         
        <div>
        <Title />
        <Nav>
            <LeftMenu>
                <Menu>
                    <MenuItem >
                        <MenuLink
                        value = "event"
                        //default 생성해야함
                        onClick={(handleItemClick)}>
                        공지/이벤트 관리
                        </MenuLink>
                        
                    </MenuItem>

                </Menu>
                <Menu>
                    <MenuItem>
                    <MenuLink 
                    value ="product"
                    onClick ={handleItemClick} >
                    상품등록
                    </MenuLink>

                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <MenuLink 
                        value="logout"
                        onClick= {handleItemClick}>
                        로그아웃
                        </MenuLink>
                    </MenuItem>
                </Menu>
            </LeftMenu>
            <div>
                {   
                 MenuName ? (
                    
                     MenuName ==='event'  &&
                     (
                         
                        <EventNotice/>
                    )
                    || 
                    MenuName ==='product' && (
                        <Product/>
                    )        
                          
                    ) : null 



                }
                
            
            </div>
        </Nav>
        </div>
      
        
       
    
    
        
     


        
       
       

    )
}


export default ManagerMenu;