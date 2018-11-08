import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import PostContainer from './PostContainer'; 
import './Feed.css'; 
import axios from 'axios'; 

import placeholder from './pic-placeholder.png'; 

import { connect } from 'react-redux'; 
import { loginUser } from '..//../ducks/reducer'; 
import { logoutUser } from '..//../ducks/reducer'; 

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            user: null, 
            chosenPic: '', 
            posts: [], 
            postCaption: '',
            mineOnly: false //show only my posts, can edit/delete
        }
    }
    //When they choose an image
    onDrop = (picture) => {
        console.log('chosen pic', picture[0].name) //picture is array, rename? 
        this.setState({ chosenPic: URL.createObjectURL(picture[0]) })
    }

    componentDidMount() {
        this.fetchFeed()
    }

    fetchFeed = () => {
        if (this.state.mineOnly === false) {
            const urlToFetchAll = "/api/posts"
            axios.get(urlToFetchAll).then(response => {
                this.setState({posts: response.data })
            }).catch(error => {
                console.log('error fetching all', error)
            })
        } else {
            const urlToFetchMine = ""
            axios.get(urlToFetchMine).then(response => {

            }).catch(error => {
                console.log('error fetching mine', error)
            })
        }  
    }

    monitorTextChange = (val) => {
        this.setState({ postCaption: val})
    }  

    newPost = () => {
        console.log('this.props.user in feed', this.props.user)
        if (this.props.user === undefined) { alert('please sign in') }
        const { user } = this.props; 
        const newPost = {
            user_id: user.user.user_id, 
            title: this.state.postCaption, 
            author_name: user.user.name, 
            author_image: user.user.profile_picture, 
            post_media: this.state.chosenPic //Make sure this works, is from URL.createObjectURL 
        }
        console.log('new post', newPost)
        axios.post('/api/posts', newPost).then(response => {
            console.log('reponse', response.data)
            this.fetchFeed()
        }).catch(error => {
            console.log('error uploading new post', error)
        })
    }

    //TODO expand and shrink upload box, shoulnd't show when they've posted
    render() {
        //Header pic for post
        const pic = this.state.chosenPic ? this.state.chosenPic : placeholder
        //Map feed
        const postsMapped = this.state.posts.map(post => {
            return <PostContainer id={post.id} 
            authorImage={post.author_image}
            postMedia={post.post_media}
            authorName={post.author_name}
            title={post.title}
            authorId={post.author_id}
            /> 
        })

        return (
            <div className="feed_parent">
                <div className="upload_header"></div>
                    <div className="image_upload_container">
                    <ImageUploader
                    className="image_uploader"
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    />
                    <img src={pic} alt=""/>
                    <input onChange={ (e) => this.monitorTextChange(e.target.value)}></input>
                    <button onClick={this.newPost}>Post</button>
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
        user: state.user
    }
}

export default connect(mapStateToProps, { loginUser, logoutUser })(Feed); 