import React, { Component } from 'react';
// import axios from 'axios'; 
import logo from './Spacegram-logo-one.png'; 

import {withRouter} from 'react-router-dom';
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
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    console.log(this.props)
    return (
      <div> 
        <header className="header_class">
          <div className="spacegram_logo">
            <img className="logo" src={logo} alt=""/>
         </div>
        </header>
        <main className="main_body">
          {routes}
          <div className="space_animation_container">
            <div className="space_animation">

            </div>
          </div>
        </main>
      </div>
      
    );
  }
}

export default withRouter(App);
