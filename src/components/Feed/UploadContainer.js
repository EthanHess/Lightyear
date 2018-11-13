import React, { Component } from 'react'; 
import './Feed.css'; //TODO have separate?
import ImageUploader from 'react-images-upload';
import placeholder from './pic-placeholder.png'; 

export default class UploadContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //TODO use drop zone and display chosen image!
    render() {
        const { monitorFn, newPostFn, chosenPic, toggleFn } = this.props; 
        const pic = chosenPic ? <img src={chosenPic} alt="" /> : <img src={placeholder} alt=""/>
        console.log('pic', pic)
        return (
            <div className="image_upload_container">
                    <button onClick={toggleFn}>Toggle</button>
                    <ImageUploader
                        className="image_uploader"
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                    {chosenPic}
                    <input onChange={ (e) => monitorFn(e.target.value)}></input>
                    <button onClick={newPostFn}>Post</button>
            </div>
        )
    }
}