import React, { Component } from 'react'; 
import './Friends.css'
import GNUser from './gn_user.png'; 

export default class Friends extends Component {
    constructor() {
        super()
        this.state = {
            friends: [],
            allUsers: [], 
            user: null, 
            allUserMode: false
        }
    }

    //To display friends/all users
    updateAllUserMode = () => {
        this.setState({ allUserMode: !this.state.allUserMode })
    }

    render() {
        //maps (friend array + all users array)
        //be able to update user info
        return (
            <div className="friends_container">
                <div className="my_profile_container">
                    <img src={GNUser} alt=""></img>
                </div>
                <div className="my_friends_container">
                    <p>Space buddies</p>
                </div>
            </div>
        )
    }
}