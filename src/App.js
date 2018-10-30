import React, { Component } from 'react';
import axios from 'axios'; 
import logo from './Spacegram-logo-one.png'; 
import './App.css';

class App extends Component {
  constructor() {
    super() 

  }
  componentDidMount() {

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
  render() {
    return (
      <header className="header_class">
        <div className="spacegram_logo">
           <img className="logo" src={logo} alt=""/>
        </div>
      </header>
    );
  }
}

export default App;
