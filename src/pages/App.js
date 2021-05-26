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
import EnterProduct from '../components/EnterProduct';
import Product from './Product';
import AlterProduct from '../components/AlterProduct';
import UserPostList from '../components/UserPostList';
import ProductList from './ProductList'
import WishList from './WishList';
import OrderList from './OrderList';
import {useHistory, useLocation} from 'react-router'

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

export const ProductListContext = createContext({
    category: '',
    setCategory: () => {},
    search: '',
    setSearch: () => {},
    startPrice: 0,
    setStartPrice: () => {},
    endPrice: 0,
    setEndPrice: () => {},
    currentState: {},
    setCurrentState: () => {},
    submitFlag: false,
    setSubmitFlag: () => {}
})

export const WishListContext = createContext({
    wishListFlag: false,
    setWishListFlag: () => {}
})

const App = () => {
    const [ID, setID] = useState('')
    const [PW, setPW] = useState('')
    const [success, setSuccess] = useState(false)
    const [signUpFlag, setSignUpFlag] = useState(false)
    const loginContextValue = useMemo(() => ({ 
        ID, setID, PW, setPW, success, setSuccess, signUpFlag, setSignUpFlag
    }), [ID, setID, PW, setPW, success, setSuccess, signUpFlag, setSignUpFlag])

    const [category, setCategory] = useState('ALL')
    const [search, setSearch] = useState('')
    const [startPrice, setStartPrice] = useState(0)
    const [endPrice, setEndPrice] = useState(200000)
    const [currentState, setCurrentState] = useState({
        category: 'ALL',
        search: '',
        startPrice: 0,
        endPrice: 200000
      })
    const [submitFlag, setSubmitFlag] = useState(false)
    const productListContextValue = useMemo(() => ({
        category, setCategory, search, setSearch, startPrice, setStartPrice, endPrice, currentState, setCurrentState, setEndPrice, submitFlag, setSubmitFlag
    }), [category, setCategory, search, setSearch, startPrice, setStartPrice, endPrice, currentState, setCurrentState, setEndPrice, submitFlag, setSubmitFlag])
    
    const [wishListFlag, setWishListFlag] = useState(false)
    const wishListContextValue = useMemo(() => ({
        wishListFlag, setWishListFlag
    }), [wishListFlag, setWishListFlag])

    return (
        <LoginContext.Provider value={loginContextValue}>
            <ProductListContext.Provider value={productListContextValue}>
                <WishListContext.Provider value={wishListContextValue}>
                    <GlobalStyle />
                    <Router>
                        <Header />
                        <Route exact path="/" component={ClientHomePage} />
                        <Route exact path="/manager" component={ManagerHomePage} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/data" component={Data} />
                        <Route exact path= "/manager/Enter" component = {EnterProduct}/>
                        <Route exact path="/manager/Alter" component = {AlterProduct} />
                        <Route exact path="/list" component={ProductList} />
                        <Route path ="/product/:id" component={Product} />
                        <Route path ="/manager/product/:id" component={Product} />
                        <Route path ='/user/PostList' component ={UserPostList}/>
                        <Route exact path ='/user/wishlist' component ={WishList}/>
                        <Route exact path ='/user/orderlist' component ={OrderList}/>
                        <Footer />
                    </Router>
                </WishListContext.Provider>
            </ProductListContext.Provider>
        </LoginContext.Provider>
    );
}


export default App