import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/public/HomePage';
import Shop from './components/public/Shop';
import Checkout from './components/public/Checkout';
import Admin from './components/admin/Admin';

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={Shop}/>
                    <Route path="/checkout" component={Checkout} exact/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
            </BrowserRouter>
        );
    };
};

export default App;