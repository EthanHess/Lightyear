import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import './Feed.css'; 

export default class Feed extends Component {
    constructor() {
        super()
        this.state = {
            user: null
        }
    }
    //When they choose an image
    onDrop = (picture) => {
        console.log('chosen pic', picture)
    }

    render() {
        return (
            <div className="feed_parent">
                <div className="image_upload_container">
                <ImageUploader
                    className="image_uploader"
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                </div>
                <div className="main_feed">
                
                </div>
            </div>   
        )
    }
}