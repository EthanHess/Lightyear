import React, { Component } from 'react'; 
import './Feed.css'; //TODO have separate?
import ImageUploader from 'react-images-upload';
import placeholder from './pic-placeholder.png'; 

export default class SpaceStation extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { monitorFn, newPostFn, chosenPic} = this.props; 
        const pic = chosenPic ? <img src={chosenPic} alt="" /> : placeholder
        return (
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
                    <input onChange={ (e) => monitorFn(e.target.value)}></input>
                    <button onClick={newPostFn}>Post</button>
            </div>
        )
    }
}