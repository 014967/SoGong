import React from 'react';
import styled from 'styled-components'
import { HashRouter as Router, Route } from "react-router-dom";
import GlobalStyle from '../styles/GlobalStyle'
import ClientHomePage from './ClientHomePage'
import ManagerHomePage from './ManagerHomePage'
import Data from './Data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ManagerHomePage from './ManagerHomePage';




const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Header />
                <Route exact path="/" component={ClientHomePage} />
                <Route exact path="/manager" component={ManagerHomePage} />
                <Route exact path="/data" component={Data} />
                <Footer />
            </Router>
        </>
    );
}



export default App