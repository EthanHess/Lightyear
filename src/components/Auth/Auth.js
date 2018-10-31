import React, { Component } from 'react'; 
// import axios from 'axios'; 
import './Auth.css'; 
import noUser from './no_user.png'; 

export default class Auth extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="auth_container">
                <div className="auth_bar">
                    <p>Create an account or sign in with a 3rd party</p>
                </div>
                <div className="auth_portal">
                    <img src={noUser} alt=""/>
                    <input placeholder="Username"></input>
                    <input placeholder="Password"></input>
                    <input placeholder="Email"></input>
                    <button>Proceed</button>
                    <button>3rd Party (Facebook etc.)</button>
                </div>
            </div>
        )
    }
}