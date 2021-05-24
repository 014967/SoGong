import React, {createContext, useMemo, useState} from 'react';
import styled from 'styled-components'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from '../styles/GlobalStyle'
import ClientHomePage from './ClientHomePage'
import ManagerHomePage from './ManagerHomePage'
import SignUp from './SignUp'
import Data from './Data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AlterEventNotice from '../components/AlterEventNotice'
import ProductData from '../components/ProductData';
import EnterProduct from '../components/EnterProduct';
import Product from '../components/Product';
import AlterProduct from '../components/AlterProduct';
import UserPostList from '../components/UserPostList';

export const LoginContext = createContext({
    ID: '',
    setID: () => {},
    PW: '',
    setPW: () => {},
    success: false,
    setSuccess: () => {},
    signUpFlag: false,
    setSignUpFlag: () => {}
})

const App = () => {
    const [ID, setID] = useState('')
    const [PW, setPW] = useState('')
    const [success, setSuccess] = useState(false)
    const [signUpFlag, setSignUpFlag] = useState(false)
    const value = useMemo(() => ({ 
        ID, setID, PW, setPW, success, setSuccess, signUpFlag, setSignUpFlag
    }), [ID, setID, PW, setPW, success, setSuccess, signUpFlag, setSignUpFlag])

    return (
        <LoginContext.Provider value={value}>
            <GlobalStyle />
            <Router>
                <Header />
                <Route exact path="/" component={ClientHomePage} />
                <Route exact path="/manager" component={ManagerHomePage} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/data" component={Data} />
                
                <Route exact path="/manager/alterevent" component = {AlterEventNotice} />
                <Route exact path= "/manager/Enter" component = {EnterProduct}/>
                <Route exact path="/manager/Alter" component = {AlterProduct} />
                <Route exact path ="/product/:id" component = {ProductData} />
                <Route exact path ='/user/PostList' component ={UserPostList}/>
                <Footer />
            </Router>
        </LoginContext.Provider>
    );
}


//Route exact path="/manager/:id" component = {ProductData}/>
export default App