import React from 'react'
import {BrowserRouter, Route, Switch}  from 'react-router-dom'
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Signout from './Components/Signout';


export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                    <Route path="/" exact component = {Home} />
                    <Route path="/signup" component = {Signup} />
                    <Route path="/login" component = {Login} />
                    <Route path="/signout" component={Signout} />
            </Switch> 
        </BrowserRouter>  
    )
}
