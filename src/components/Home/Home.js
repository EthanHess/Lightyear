import React, { Component } from 'react'; 

import astronaut from './astronaut.png'; 
import news from './news.png'; 
import friends from './friends.png'; 
import spaceLock from './space_lock.png';

import BottomHome from './BottomHome';
import ComingSoon from './ComingSoon';

export default class Home extends Component {
    constructor() {
        super() 
        this.state = {
            //Add props
        }
    }

    //Both login/register go to Auth and will pass a different global state, but maybe not necessary when doing auth0
    render() {
        
        return (
            <div className="home_parent">
              <div className="intro_container">
              <div className="text_intro">
                <p>An online community for Astronomy geeks</p>
              </div>
              <div className="intro_tabs">
                <div className="news_bubble">
                    <img className="news_img" src={news} alt=""/>
                    <button onClick={() => this.props.history.push('/news')} className="main_button_tab">News</button>
                </div>
                <div className="friends_bubble">
                    <img className="friends_img" src={friends} alt=""/>
                    <button onClick={() => this.props.history.push('/friends')} className="main_button_tab">Friends</button>
                </div>
                <div className="space_station_bubble">
                    <img className="ss_img" src={astronaut} alt=""/>
                    <button onClick={() => this.props.history.push('/iss')} className="main_button_tab">Space Station</button>
                </div>
              </div>
              <div className="login_register_main">
                    <button onClick={() => this.props.history.push('/auth')} className="main_button">Login</button>
                    <img src={spaceLock} alt=""/>
                    <button onClick={() => this.props.history.push('/auth')} className="main_button">Sign Up</button>
              </div>
             </div>
                <BottomHome router={this.props}/>
                {/* <ComingSoon router={this.props}/> */}
            </div>
        )
    }
}   