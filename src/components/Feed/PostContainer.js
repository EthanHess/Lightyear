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
            // user: null
        }
    }

    nothing = () => {
        //Pop alert 
    }

    likeHandler = (id) => {

    }

    commentHandler = (id) => {

    }

    fetchLikeCount = () => {

    }

    //TODO add edit/delete button for own post (pass fns via props)
    render() {
        const { user, deleteFn, editFn } = this.props; 
        const { id, authorImage, postMedia, authorName, title, authorId } = this.props; 
        //const isCurrent = user.user.user_id === authorId; //can delete own posts
        const isCurrent = false; 
        const likedPost = false; //get from props for heart pic
        const likeCount = 0; 
        const commentCount = 0; 
        
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
                    <img onClick={() => {this.likeHandler(id)}} src={likedPost ? liked : like}/>
                    <p>{likeCount}</p>
                    <img onClick={() => {this.commentTapped(id)}} src={comments}/>
                    <p>{commentCount}</p>
                    <button onClick={ isCurrent ? () => editFn(id) : this.nothing }>{isCurrent ? "Edit" : ""}</button>
                    <button onClick={ isCurrent ? () => deleteFn(id) : this.nothing }>{isCurrent ? "Delete" : ""}</button>
                </div>
            </div>
        )
    }
}