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

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            uploadedFileCloudinaryUrl: '', 
            files: null,
            user: null, 
            following: [], //TODO will need to set following in reducer
            chosenPic: '', 
            posts: [], 
            postCaption: '',
            mineOnly: false, //show only my posts, can edit/delete
            displayHeader: false //shows upload div
        }
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

    //make sure following is passed to redux before this view is loaded

    fetchFriendsPosts = () => {
        if (this.props.user === null || this.props.user === undefined) { return }
        if (this.props.user.user === null || this.props.user.user === undefined) { return }
        if (this.state.mineOnly === false) {
            console.log('following in feed 1', this.props.following)
            this.props.following.push(this.props.user.user.user_id)
            const reqBody = {
                array: this.props.following
            }
            console.log('following in feed', this.props.following)
            const urlToFetchFeed = '/api/posts/friends';
            axios.post(urlToFetchFeed, reqBody).then(response => {
                const array = Array.from(response.data)
                this.setState({ posts: array.reverse() })
            }).catch(error => {
                console.log('error fetching feed', error)
            })
        } else {
            const urlToFetchMine = `/api/posts/me/${this.props.user.user.user_id}`
            axios.get(urlToFetchMine).then(response => {
                const array = Array.from(response.data)
                this.setState({ posts: array.reverse() })
            }).catch(error => {
                console.log('error fetching mine', error)
            })
        }  
    }


    handleImageUpload = () => {
        if (this.props.user === undefined || this.props.user === null) { alert('Please sign in'); return }
        axios.get('/api/upload').then(response => {
        let formData = new FormData();
        formData.append("signature", response.data.signature)
        formData.append("api_key", "288326384771891")
        formData.append("timestamp", response.data.timestamp)
        formData.append("file", this.state.files[0]);
        return axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
            console.log('upload cld response', response.data);
            this.setState({
                 uploadedFileCloudinaryUrl: response.data.secure_url, 
            }, this.newPost())
        }).catch(error => { console.log('upload cld error', error) }) 
        })
    }     

    handleOnDrop = (files) => {
        this.setState({ files: files })
        var reader  = new FileReader();
        reader.addEventListener("load", function () {

        }, false);
        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
        reader.onload = () => {
            this.setChosenPic(reader.result)
        }
    }

    setChosenPic = (b64) => {
        this.setState({ chosenPic: b64 })
    }

    monitorTextChange = (val) => {
        this.setState({ postCaption: val})
    }  

    newPost = () => {
        console.log('this.state.ucurl', this.state.uploadedFileCloudinaryUrl )
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
                chosenPic: '',
                displayHeader: false
            }, this.fetchFeed())
        }).catch(error => {
            //Do this? 
            this.setState({
                uploadedFileCloudinaryUrl: '',
                postCaption: '', 
                chosenPic: '',
                displayHeader: false
            })
            console.log('error uploading new post', error)
        })
    }

    render() {

        const postsMapped = this.state.posts.map(post => {
            return <PostContainer id={post.id} 
                authorImage={post.author_image}
                postMedia={post.post_media}
                authorName={post.author_name}
                title={post.title}
                authorId={post.author_id}
                user={this.props.user}
            /> 
        })

        const headerCompToDisplay = this.state.displayHeader === true ? 
        <UploadContainer 
            monitorFn={this.monitorTextChange} 
            newPostFn={this.handleImageUpload} 
            chosenPic={this.state.chosenPic}
            toggleFn={this.toggleDisplayHeader}
            handleOnDropFn={this.handleOnDrop}
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