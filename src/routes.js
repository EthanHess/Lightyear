import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home'
import BottomHome from './components/Home/BottomHome'; 
import Auth from './components/Auth/Auth'; 
import Friends from './components/Friends/Friends'; 
import News from './components/News/News'; 
import SpaceStation from './components/SpaceStation/SpaceStation'; 
import Feed from './components/Feed/Feed'; 
import Chat from './components/Chat/Chat'; 
import Apod from './components/Apod/Apod'; 

export default (
    <Switch>
        <Route component={ Home } exact path="/"/>
        <Route component={ Auth } path="/auth"/>
        <Route component={ Friends } path="/friends"/>
        <Route component={ News } exact path="/news"/>
        <Route component={ SpaceStation } path="/iss"/>
        <Route component={ Feed } path="/feed"/> 
        <Route component={ Chat } path="/chat"/>
        <Route component={ Apod } path="/apod"/>
    </Switch>
)