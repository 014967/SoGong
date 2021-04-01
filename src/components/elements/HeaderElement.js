import React, { Component, useState} from 'react'
import {
  Nav,
  NavLink,
  NavMenu,
  SignBtn,
  Bars,
  SignLink,
  SignBox,

} from '../styles/HeaderStyle';


const  HeaderElement = () =>
{

  
    return (
      <>
    
      <Nav >
      <NavLink to ="/">
            logo 
      </NavLink>
      <Bars />
      <SignBtn>
             <SignLink to = "/signIn" activeStyle>
                SIGN UP
             </SignLink>
             
      </SignBtn>
      <SignBox placeholder="ID"/>
      <SignBox placeholder="PW"/>

      </Nav>
       <Nav> 
         <NavMenu>
           <NavLink to = '/new' activeStyle>
               NEW
           </NavLink> 
           <NavLink to = '/men' activeStyle>
          
               MEN

             
           </NavLink> 
           <NavLink to = '/women' activeStyle>
           
               WOMEN

            
           </NavLink> 
           <NavLink to = '/kid' activeStyle>
         
               KIDS

            
           </NavLink> 

           
         </NavMenu>
       </Nav>
      </>
    )
  
}

export default HeaderElement;