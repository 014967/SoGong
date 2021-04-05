import React from 'react'
import styled from 'styled-components'
import Logo from './elements/Logo'
import Login from './Login'
import HeaderSearchBar from './HeaderSearchBar'

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 32px 64px;
  width: 100%;
  height: 218px;
  background: ${({ theme }) => theme.color.background};
`

const BaseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & > * + * {
    margin-left: 16px;
  }
`

const ExtensionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Categories = styled.nav`
  display: flex;
  & > * + * {
    margin-left: 64px;
  }
`
const Category = styled.button`
  font-size: 64px;
  font-family: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.color.secondary};
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`

const Header = () => {
    return (
      <Container>
        <BaseContainer>
          <Logo />
          <Login />
        </BaseContainer>
        <ExtensionContainer>
          <Categories>
            <Category>NEW</Category>
            <Category>MEN</Category>
            <Category>WOMEN</Category>
            <Category>KIDS</Category>
          </Categories>
          <HeaderSearchBar />
        </ExtensionContainer>
      </Container>
      // <>
      //   <Nav >
      //   <NavLink to ="/">
      //         logo 
      //   </NavLink>
      //   <Bars />
      //   <SignBtn>
      //         <SignLink to = "/signIn" activeStyle>
      //             SIGN UP
      //         </SignLink>
              
      //   </SignBtn>
      //   <SignBox placeholder="ID"/>
      //   <SignBox placeholder="PW"/>

      //   </Nav>
      //   <Nav> 
      //     <NavMenu>
      //       <NavLink to = '/new' activeStyle>
      //           NEW
      //       </NavLink> 
      //       <NavLink to = '/men' activeStyle>
            
      //           MEN

              
      //       </NavLink> 
      //       <NavLink to = '/women' activeStyle>
            
      //           WOMEN

              
      //       </NavLink> 
      //       <NavLink to = '/kid' activeStyle>
          
      //           KIDS

              
      //       </NavLink> 

            
      //     </NavMenu>
      //   </Nav>
      // </>
    )
}

export default Header