import React, { Component } from 'react'; 

import cart from './cart.png'; 
import meetups from './meetups.png'; 
import spacegames from './spacegames.png'; 
import constellations from './constellations.png'; 
import learn from './learn.png'; 
import credit from './credit.png'; 


export default class ComingSoon extends Component {
    constructor() {
        super() 
        this.state = {
            //Add props
        }
    }

    //TODO update class names? 

    render() {
        return (
            <div className="intro_container_cs">
              <div className="text_intro_cs">
                <p>Coming Soon...</p>
              </div>
              <div className="intro_tabs_cs">
                <div className="cart_bubble">
                    <img className="cart_img" src={cart} alt=""/>
                    <button onClick={() => this.props.router.history.push('/')} className="main_button_tab_cs">Shop</button>
                </div>
                <div className="meetups_bubble_cs">
                    <img className="meetups_img" src={meetups} alt=""/>
                    <button onClick={() => this.props.router.history.push('/')} className="main_button_tab_cs">Events</button>
                </div>
                <div className="credits_bubble_cs">
                    <img className="credits_img" src={credit} alt=""/>
                    <button onClick={() => this.props.router.history.push('/')} className="main_button_tab_cs">Credits</button>
                </div>
                <div className="constellations_bubble_cs">
                    <img className="const_img" src={constellations} alt=""/>
                    <button onClick={() => this.props.router.history.push('/')} className="main_button_tab_cs">Constellations</button>
                </div>
                <div className="learn_bubble_cs">
                    <img className="learn_img" src={learn} alt=""/>
                    <button onClick={() => this.props.router.history.push('/')} className="main_button_tab_cs">Learn</button>
                </div>
                <div className="games_bubble_cs">
                    <img className="games_img" src={spacegames} alt=""/>
                    <button onClick={() => this.props.router.history.push('/')} className="main_button_tab_cs">Games</button>
                </div>
              </div>
              <div className="bottom_footer_cs">
                 
              </div>
          </div>
        )
    }
}   