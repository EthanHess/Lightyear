import React, { Component } from 'react';
import axios from 'axios'; 
import logo from './mainIcon.png'; 
import { connect } from 'react-redux';
import { loginUser } from './ducks/reducer'; 
import { logoutUser } from './ducks/reducer'; 
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
      this.props.logoutUser(); 
      this.setState({ user: null });
    });
  }

  //TODO will want to set following here and pass to redux since we have two components where they are needed

  login = () => {
    this.props.history.push('/auth')
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
        this.props.loginUser(response.data)
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
                <p>Spacegram</p>
            </div>
            <div className ="right_nav_utils">
              <img src={prfPic} alt=""/> 
              <button onClick={exists ? this.logout : this.login}>{exists ? this.state.username : "Login"}</button>
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

export default withRouter(connect(mapStateToProps, { loginUser, logoutUser })(App));

