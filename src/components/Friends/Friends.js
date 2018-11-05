import React, { Component } from 'react'; 
import './Friends.css'
import GNUser from './gn_user.png';
import axios from 'axios'; 

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

    componentDidMount() {
        this.getAllUsers(); 
    }

    getAllUsers = () => {
        axios.get('/api/users').then(response => {
            console.log('response data', response.data)
            this.setState({ allUsers: response.data })
        })
    }

    render() {
        const allUsersMapped = this.state.allUsers.map(user => {
            //Check user if to see if user is following, then set button title/action accordingly
            return <div className="user_container">
                <img src={user.profile_picture} alt=""/>
                <p>{user.name}</p>
                <button>Follow</button>
            </div>
        })
        //maps (friend array + all users array)
        //be able to update user info
        return (
            <div className="friends_container">
                <div className="my_profile_container">
                    <img src={GNUser} alt=""></img>
                </div>
                <div className="my_friends_container">
                    <p>Space buddies</p>
                    {allUsersMapped}
                </div>
            </div>
        )
    }
}