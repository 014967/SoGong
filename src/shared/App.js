import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ClientHomePage, ManagerHomePage } from '../pages';

class App extends Component{
    render()
    {
        return (
            <div>
                <Route exact path ="/" component ={ClientHomePage}/>
                <Route path ="/Manager" component ={ ManagerHomePage} />
            </div>
        );
    }
}
export default App;