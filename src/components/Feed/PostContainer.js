import React, { Component } from 'react';
import './PostContainer.css'; 
import like from './like.png'; 
import liked from './liked.png'; 
import comments from './comments.png'; 
import axios from 'axios'; 

export default class PostContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: [],
            comments: [], 
            likerArray: []
        }
    }

    nothing = () => {
        //Pop alert 
    }

    componentDidMount() {
        this.fetchLikeCount()
    }

    likeHandler = (id) => {
        const reqBody = {
            likerImage: this.props.user.user.profile_picture, 
            likerName: this.props.user.user.name
        }
        axios.post(`/api/likes/${id}/${this.props.user.user.user_id}`, reqBody).then(response => {
            this.setState({ likes: response.data })
        }).catch(error => {
            console.log('error adding like for post front end', error)
        })
    }

    commentHandler = (id) => {

    }

    fetchLikeCount = () => {
        axios.get(`api/likes/${this.props.id}`).then(response => {
            console.log('likes front end', response.data)
            this.setState({ likes: response.data })
        }).catch(error => { 
            console.log('error fetching likes for post front end', error)
        })
    }

    //TODO add edit/delete button for own post (pass fns via props)
    render() {

        const { user, deleteFn, editFn } = this.props; 
        const { id, authorImage, postMedia, authorName, title, authorId } = this.props; 
        const isCurrent = user.user.user_id === authorId; //can delete own posts
        const likeCount = this.state.likes.length; 
        const commentCount = this.state.comments.length;
        const { likes } = this.state; 
    
        //For MVP, not scalable. Use SQL join :)
        let likedPost = false; 

        for (var i = 0; i < likes.length; i++) {
            const like = likes[i]; 
            if (like.post_id === id) {
                likedPost = true; 
            }
        }

        return (
            <div className="post_container">
                <div className="post_top_div">
                    <img src={authorImage} alt=""/>
                    <p>{authorName}</p>
                </div>
                <div className="main_post_image">
                    <img src={postMedia} alt=""/>
                </div>
                <div className="post_bottom_div">
                    <p>{title}</p>
                </div>
                {/* Set delete/edit hidden if not current?  */}
                <div className="footer_div"> 
                    <div className="likes_container">
                        <img onClick={() => {this.likeHandler(id)}} src={likedPost ? liked : like}/>
                        <p>{likeCount}</p>
                    </div>
                    <div className="comments_container">
                        <img onClick={() => {this.commentTapped(id)}} src={comments}/>
                        <p>{commentCount}</p>
                    </div>
                    <div className="button_container">
                        <button onClick={ isCurrent ? () => editFn(id) : this.nothing }>{isCurrent ? "Edit" : ""}</button>
                        <button onClick={ isCurrent ? () => deleteFn(id) : this.nothing }>{isCurrent ? "Delete" : ""}</button>
                    </div>
                </div>
            </div>
        )
    }
}