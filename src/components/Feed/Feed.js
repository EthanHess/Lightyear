import React, { Component } from 'react';
import PostContainer from './PostContainer'; 
import UploadContainer from './UploadContainer'; 
import ToggleHeader from './ToggleHeader'; 
import './Feed.css'; 
import axios from 'axios'; 

//Redux
import { connect } from 'react-redux'; 
import { loginUser } from '..//../ducks/reducer'; 
import { logoutUser } from '..//../ducks/reducer'; 
import { updateFollowing } from '..//../ducks/reducer'; 

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dmqhrqwc2/image/upload';
// const CLOUDINARY_FETCH_UPLOAD_URL = 'https://res.cloudinary.com/dmqhrqwc2'

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            uploadedFileCloudinaryUrl: '', 
            user: null, 
            following: [], //TODO will need to set following in reducer
            chosenPic: null, 
            posts: [], 
            postCaption: '',
            mineOnly: false, //show only my posts, can edit/delete
            displayHeader: true //shows upload div
        }
    }
    //When they choose an image
    onDrop = (picture) => {
        console.log('chosen pic', picture[0].name) //picture is array, rename? 
        this.setState({chosenPic: picture[0]})
        this.handleImageUpload(picture)
    }

    componentDidMount() {
        this.fetchFeed()
    }

    toggleDisplayHeader = () => {
        this.setState({ displayHeader: !this.state.displayHeader})
    }

    fetchFeed = () => {
        this.fetchFriendsPosts()
    }

    //make sure following isn't undefined or null
    fetchFriendsPosts = () => {
        if (this.props.user === null || this.props.user === undefined) { return }
        if (this.props.user.user === null || this.props.user.user === undefined) { return }
        if (this.state.mineOnly === false) {
            this.props.following.push(this.props.user.user.user_id)
            const reqBody = {
                array: this.props.following
            }
            const urlToFetchFeed = '/api/posts/friends';
            axios.post(urlToFetchFeed, reqBody).then(response => {
                this.setState({ posts: response.data })
            }).catch(error => {
                console.log('error fetching feed', error)
            })
        } else {
            const urlToFetchMine = `/api/posts/me/${this.props.user.user.user_id}`
            axios.get(urlToFetchMine).then(response => {
                this.setState({ posts: response.data })
            }).catch(error => {
                console.log('error fetching mine', error)
            })
        }  
    }


    handleImageUpload = (files) => {
        axios.get('/api/upload').then(response => {
        let formData = new FormData();
        formData.append("signature", response.data.signature)
        formData.append("api_key", "288326384771891")
        formData.append("timestamp", response.data.timestamp)
        formData.append("file", files[0]);
        return axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
            console.log('upload cld response', response.data);
            this.setState({
                 uploadedFileCloudinaryUrl: response.data.secure_url, 
            })
        }).catch(error => { console.log('upload cld error', error) }) 
        })
    }     

    monitorTextChange = (val) => {
        this.setState({ postCaption: val})
    }  

    newPost = () => {
        console.log('this.props.user in feed', this.props.user)
        if (this.props.user === undefined || this.props.user === null) { alert('Please sign in'); return }
        const { user } = this.props; 
        if (this.state.uploadedFileCloudinaryUrl === '') { alert('Please add media'); return }
        const newPost = {
            user_id: user.user.user_id, 
            title: this.state.postCaption, 
            author_name: user.user.name, 
            author_image: user.user.profile_picture, 
            post_media: this.state.uploadedFileCloudinaryUrl
        }
        axios.post('/api/posts', newPost).then(response => {
            console.log('response from cld post', response.data)
            this.setState({
                uploadedFileCloudinaryUrl: '',
                postCaption: '', 
                displayHeader: false
            })
            this.fetchFeed()
        }).catch(error => {

            //Do this? 
            this.setState({
                uploadedFileCloudinaryUrl: '',
                postCaption: '', 
                displayHeader: false
            })
            console.log('error uploading new post', error)
        })
    }

    //TODO expand and shrink upload box, shoulnd't show when they've posted
    render() {

        //Map feed
        const arrayToMap = this.state.posts.reverse()
        const postsMapped = arrayToMap.map(post => {
            return <PostContainer id={post.id} 
                authorImage={post.author_image}
                postMedia={post.post_media}
                authorName={post.author_name}
                title={post.title}
                authorId={post.author_id}
            /> 
        })

        const headerCompToDisplay = this.state.displayHeader === true ? 
        <UploadContainer 
            monitorFn={this.monitorTextChange} 
            newPostFn={this.newPost} 
            chosenPic={this.state.uploadedFileCloudinaryUrl}
            toggleFn={this.toggleDisplayHeader}
            /> 
        : <ToggleHeader toggleFn={this.toggleDisplayHeader}/>

        const className = this.state.displayHeader === true ? "upload_header" : "toggle_container"

        return (
            <div className="feed_parent">
                <div className={className}>
                    {headerCompToDisplay}
                </div>
                <div className="main_feed">
                    {postsMapped}
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

export default connect(mapStateToProps, { loginUser, logoutUser, updateFollowing })(Feed); 