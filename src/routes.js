import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'; 
import Friends from './components/Friends/Friends'; 
import News from './components/News/News'; 
import SpaceStation from './components/SpaceStation/SpaceStation'; 

export default (
    <Switch>
        <Route component={ Home } exact path="/"/>
        <Route component={ Auth } path="/auth"/>
        <Route component={ Friends } path="/friends"/>
        <Route component={ News } exact path="/news"/>
        <Route component={ SpaceStation } path="/iss"/>
    </Switch>
)