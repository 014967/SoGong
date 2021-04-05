import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import GlobalStyle from '../styles/GlobalStyle'
import ClientHomePage from './ClientHomePage'
import ManagerHomePage from './ManagerHomePage'
import Header from '../components/Header'
import Footer from '../components/Footer'

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Header />
                <Route exact path="/" component={ClientHomePage} />
                <Route exact path="/manager" component={ManagerHomePage} />
                <Footer />
            </Router>
        </>
    );
}

export default App