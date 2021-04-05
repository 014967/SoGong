import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Event, NoticeEvent, Product } from '../pages';
import { HeaderElement , ManagerMenu } from '../components/elements';


class App extends Component{
    render()
    {
        return (
            <div>
                <HeaderElement/>
              
              <NoticeEvent/>
              
               
            
                
            </div>
        );
    }
}
export default App;