import React from 'react';
import styled from 'styled-components'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from '../styles/GlobalStyle'
import ClientHomePage from './ClientHomePage'
import ManagerHomePage from './ManagerHomePage'
import SignUp from './SignUp'
import Data from './Data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductData from '../components/ProductData';
import OrderList from './OrderList'

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Header />
                <Route exact path="/" component={ClientHomePage} />
                <Route exact path="/manager" component={ManagerHomePage} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/data" component={Data} />
                <Route exact path="/manager/:id" component= {ProductData}/>
                <Route exact path="/orderlist" component= {OrderList}/>
                <Footer />
            </Router>
        </>
    );
}



export default App