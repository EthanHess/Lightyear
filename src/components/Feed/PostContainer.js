import React, { Component } from 'react';
import './PostContainer.css'; 

export default class PostContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //will pass down user in props
        }
    }

    //TODO add edit/delete button for own post (pass fns via props)
    render() {
        const { id, authorImage, postMedia, authorName, title, authorId } = this.props; 
        console.log('ids', id, authorId)
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
            </div>
        )
    }
}