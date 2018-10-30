import React, { Component } from 'react';
import axios from 'axios'; 
import logo from './Spacegram-logo-one.png'; 
import './App.css';

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

    console.log('process', process.env.GOOGLE_NEWS_API_KEY); 

    var url = 'https://newsapi.org/v2/everything?' +
    'q=Nasa&' +
    'from=2018-10-29&' +
    'sortBy=popularity&' +
    `apiKey=${process.env.GOOGLE_NEWS_API_KEY}`;

    axios.get(url).then(response => {
      console.log('response.data', response.data); 
    }).catch(error => {
      console.log('error fetching data', error); 
    })
  }

  componentDidUnmount() {
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
          <div className="space_animation_container">
              <div className="text_intro">
                <p>An online community for Astronomy geeks</p>
              </div>
              <div className="space_animation">
                <div className="news_bubble"></div>
                <div className="friends_bubble"></div>
                <div className="space_station_bubble"></div>
              </div>
          </div>
        </main>
      </div>
      
    );
  }
}

export default App;
