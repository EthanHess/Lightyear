import React, { Component } from 'react'; 
import './Friends.css'
import GNUser from './gn_user.png';
import axios from 'axios'; 

import { connect } from 'react-redux';
import { loginUser } from '..//../ducks/reducer'; 
import { logoutUser } from '..//../ducks/reducer'; 

class Friends extends Component {
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

    followUnfollow = (id) => {
        console.log('id', id)
        if (this.state.user.user.user_id === id) {
            alert('YO, This is you')
            return; 
        }

        //Check to see if they're already following here
        if (this.state.allUserMode === true) {
            
        } else {

        }
    }

    getAllUsers = () => {
        axios.get('/api/users').then(response => {
            console.log('response data', response.data)
            this.setState({ allUsers: response.data })
        })
    }

    render() {
        const allUsersMapped = this.state.allUsers.map(user => {
            const amFollowing = this.state.friends.includes(user) === true ? "Following" : "Follow"
            //TODO check if current user
            return <div className="user_container">
                <img src={user.profile_picture} alt=""/>
                <p>{user.name}</p>
                <button onClick={ ()=> {this.followUnfollow(user.user_id)}}>{amFollowing}</button>
            </div>
        })

        const title = this.state.allUserMode ? "All Users" : "Following"

        //maps (friend array + all users array)
        //be able to update user info
        return (
            <div className="friends_container">
                <div className="my_profile_container">
                    <img src={GNUser} alt=""></img>
                </div>
                <div className="my_friends_container">
                    <p>Space buddies</p>
                    <button onClick={this.updateAllUserMode}>{title}</button>
                    {allUsersMapped}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }
  
export default connect(mapStateToProps, { loginUser, logoutUser })(Friends);
  
  