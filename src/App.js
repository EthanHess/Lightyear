import React, { Component } from 'react';
import axios from 'axios'; 
import logo from './Spacegram-logo-one.png'; 
import astronaut from './astronaut.png'; 
import news from './news.png'; 
import friends from './friends.png'; 
import spaceLock from './space_lock.png'; 
import './App.css';

import routes from './routes'; 

class App extends Component {
  constructor() {
    super() 
    this.state = {
      scrolling : false
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.addListener = this.addListener.bind(this)
    this.removeListener = this.removeListener.bind(this)
  }

  //Listen for scrolling
  addListener() {
    window.addEventListener('scroll', this.handleScroll)
  }

  removeListener() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({scrolling: false});
    }
    else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({scrolling: true});
    }
  }

  //Lifecycle
  componentDidMount() {
    this.addListener() 
    // --- TODO credit Google for their API! ---

    console.log('ROUTES', routes); 
    console.log('process env', process.env); 
    console.log('process', process.env.REACT_APP_GOOGLE_NEWS_API_KEY); 

    var url = 'https://newsapi.org/v2/everything?' +
    'q=Nasa&' +
    'from=2018-10-29&' +
    'sortBy=popularity&' +
    `apiKey=${process.env.REACT_APP_GOOGLE_NEWS_API_KEY}`;

    axios.get(url).then(response => {
      console.log('response.data', response.data); 
    }).catch(error => {
      console.log('error fetching data', error); 
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  //Parent div className="App"?
  render() {
    return (
      <div> 
        <header className="header_class">
          <div className="spacegram_logo">
            <img className="logo" src={logo} alt=""/>
         </div>
        </header>
        <main className="main_body">
          <div className="intro_container">
              <div className="text_intro">
                <p>An online community for Astronomy geeks</p>
              </div>
              <div className="intro_tabs">
                <div className="news_bubble">
                    <img className="news_img" src={news} alt=""/>
                    <button className="main_button_tab">News</button>
                </div>
                <div className="friends_bubble">
                    <img className="friends_img" src={friends} alt=""/>
                    <button className="main_button_tab">Friends</button>
                </div>
                <div className="space_station_bubble">
                    <img className="ss_img" src={astronaut} alt=""/>
                    <button className="main_button_tab">Space Station</button>
                </div>
              </div>
              <div className="login_register_main">
                    <button className="main_button">Login</button>
                    <img src={spaceLock} alt=""/>
                    <button className="main_button">Sign Up</button>
              </div>
          </div>
          <div className="space_animation_container">
            <div className="space_animation">

            </div>
          </div>
        </main>
      </div>
      
    );
  }
}

export default App;
