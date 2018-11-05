import React, { Component } from 'react';
import axios from 'axios'; 
import logo from './Spacegram-logo-one.png'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import helmet from './helmet.png'; 

import './App.css';

import routes from './routes'; 

class App extends Component {
  constructor() {
    super() 
    this.state = {
      scrolling : false, 
      user: null,
      username: '', 
      userImage: ''
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.addListener = this.addListener.bind(this)
    this.removeListener = this.removeListener.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    console.log('logout called')
    axios.post('/api/logout').then(() => {
      this.setState({ user: null });
    });
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
    this.getProfileInfo()
  }

  getProfileInfo = () => {
    axios.get('/api/profile').then(response => {
      console.log('response data for login', response.data)
        this.setState({ 
          user: response.data, 
          username: response.data.user.name, 
          userImage: response.data.user.profile_picture
        })
    }).catch(error => {
      console.log('get profile info error', error)
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  //TODO hide logout button when user isn't logged in

  render() {
    const exists = this.state.user !== null; 
    const prfPic = exists ? this.state.userImage : helmet; 
    return (
      <div> 
        <header className="header_class">
          <div className="header_container">
            <div className ="spacegram_logo">
                <img className="logo" src={logo} alt=""/>
            </div>
            <div className ="right_nav_utils">
              <img src={prfPic} alt=""/> 
              <p>{exists ? this.state.username : "Login"}</p>
              <button onClick={this.logout}>Logout</button>
            </div>
         </div>
        </header>
        <main className="main_body">
          {routes}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(App));

