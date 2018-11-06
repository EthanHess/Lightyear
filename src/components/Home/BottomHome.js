import React, { Component } from 'react'; 

import chat from './chat.png'; 
import apod from './apod.png'; 
import feed from './feed.png'; 


export default class BottomHome extends Component {
    constructor() {
        super() 
        this.state = {
            //Add props
        }
    }

    //TODO update class names? 

    render() {
        console.log('sef a', this.props)
        return (
            <div className="intro_container">
              <div className="text_intro">
                <p>More...</p>
              </div>
              <div className="intro_tabs">
                <div className="news_bubble">
                    <img className="news_img" src={feed} alt=""/>
                    <button onClick={() => this.props.router.history.push('/feed')} className="main_button_tab">Feed</button>
                </div>
                <div className="friends_bubble">
                    <img className="friends_img" src={chat} alt=""/>
                    <button onClick={() => this.props.router.history.push('/chat')} className="main_button_tab">Chat</button>
                </div>
                <div className="space_station_bubble">
                    <img className="ss_img" src={apod} alt=""/>
                    <button onClick={() => this.props.router.history.push('/apod')} className="main_button_tab">APOD</button>
                </div>
              </div>
              <div className="bottom_footer">
                 
              </div>
          </div>
        )
    }
}   