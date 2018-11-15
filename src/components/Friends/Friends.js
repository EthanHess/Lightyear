import React, { Component } from 'react'; 
import './Friends.css'
import GNUser from './gn_user.png';
import axios from 'axios'; 

import { connect } from 'react-redux';
import { loginUser } from '..//../ducks/reducer'; 
import { logoutUser } from '..//../ducks/reducer'; 
import { updateFollowing } from '..//../ducks/reducer'; 

class Friends extends Component {
    constructor() {
        super()
        this.state = {
            following: [],
            followers: [], //TODO add other display tab for this
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
        this.refreshData();
    }

    refreshData = () => {
        this.getAllUsers(); 
        this.getMyFriends(); 
        //this.getMyFollowers(); 
    }

    followUnfollow = (id) => {
        console.log('id + user', id, this.props.user.user)
        const myUID = this.props.user.user.user_id
        if (id === myUID) {
            alert('YO, This is you')
            return; 
        }
        const url = `/api/follow/${myUID}/${id}`
        console.log('follow url', url)
        axios.post(url).then(response => {
            console.log('response data from follow unfollow', response.data)
            this.refreshData(); 
        }).catch(error => {
            console.log('error sending follow request', error)
        })
    }

    getAllUsers = () => {
        axios.get('/api/users').then(response => {
            console.log('response data', response.data)
            this.setState({ allUsers: response.data })
        })
    }

    getMyFriends = () => {
        if (this.props.user === null || this.props.user === undefined) { return }
        const myUID = this.props.user.user.user_id
        axios.get(`/api/following/${myUID}`).then(response => {
            const friendArray = []
            response.data.map(friend => friendArray.push(friend.tofollow_id))
            console.log('friends and response', friendArray, response.data)
            this.setState({ following: friendArray })
        }).catch(error => {
            console.log('error getting who I follow', error)
        })
    }

    getMyFollowers = () => {
        if (this.props.user === null || this.props.user === undefined) { return }
        const myUID = this.props.user.user.user_id
        axios.get(`/api/followers/${myUID}`).then(response => {
            this.setState({ followers: response.data })
        }).catch(error => {
            console.log('error getting followers', error)
        })
    }

    render() {
        const allUsersMapped = this.state.allUsers.map(user => {
            console.log('user + friend array', user, this.state.following)
            const amFollowing = this.state.following.includes(user.user_id) === true ? "Following" : "Follow"
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
        user: state.user,
        following: state.following
    }
  }
  
export default connect(mapStateToProps, { loginUser, logoutUser, updateFollowing })(Friends);
  
  