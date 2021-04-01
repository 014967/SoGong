import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ClientHomePage, ManagerHomePage } from '../pages';
import { HeaderElement , ManagerMenu } from '../components/elements';


class App extends Component{
    render()
    {
        return (
            <div>
                <HeaderElement/>
                <Route exact path ="/" component ={ClientHomePage}/>
                <Route path ="/manager" component ={ ManagerHomePage} />
               
                <ManagerMenu/>

                
            
                
            </div>
        );
    }
}
export default App;