import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth'; 
import Friends from './components/Friends/Friends'; 
import News from './components/News/News'; 
import SpaceStation from './components/SpaceStation/SpaceStation'; 

export default (
    <Switch>
        <Route component={ Auth } exact path="/auth"/>
        <Route component={ Friends } path="/friends"/>
        <Route component={ News } exact path="/news"/>
        <Route component={ SpaceStation } path="/iss"/>
    </Switch>
)