import React, { Component } from 'react'; 
import axios from 'axios'; 
import './Auth.css'; 

import noUser from './no_user.png'; 

export default class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '', 
            user: null
        }
    }
    loginHandler = () => {
        const { username, password } = this.state; 
        axios.post('/login', { username, password }).then(response => {
            this.setState({ user: response.data });
        }).catch(error => {
            alert(error.response.data.message);
        })
    }
    //TODO hook up
    registerHandler = () => {
        const { username, password } = this.state; //Email? 
        axios.post('/register', { username, password }).then(response => {
            this.setState({ user: response.data });
        }).catch(error => {
            alert(error.response.data.message);
        })
    }

    //Auth0 promt
    auth0Handler = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        console.log('domain', process.env.REACT_APP_AUTH0_DOMAIN); 
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }

    //Logout --- Show on top/nav bar? ---
    usernameUpdate = (val) => {
        this.setState({ username: val })
    }
    passwordUpdate = (val) => {
        this.setState({ password: val })
    }
    emailUpdate = (val) => {
        this.setState({ email: val })
    }
    render() {
        return (
            <div className="auth_container">
                <div className="auth_bar">
                    <p>Create an account or sign in with a 3rd party</p>
                </div>
                <div className="auth_portal">
                    <img src={noUser} alt=""/>
                    <input onChange = {(e) => this.usernameUpdate(e.target.value)} placeholder="Username"></input>
                    <input onChange = {(e) => this.passwordUpdate(e.target.value)} placeholder="Password"></input>
                    <input onChange = {(e) => this.emailUpdate(e.target.value)} placeholder="Email"></input>
                    <button onClick={this.loginHandler}>Proceed</button>
                    <button onClick={this.auth0Handler}>3rd Party (Facebook etc.)</button>
                </div>
            </div>
        )
    }
}
  
  
