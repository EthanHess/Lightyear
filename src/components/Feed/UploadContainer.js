import React, { Component } from 'react'; 
import './Feed.css'; //TODO have separate?
import Dropzone from 'react-dropzone';
import placeholder from './pic-placeholder.png'; 

export default class UploadContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //TODO use drop zone and display chosen image!
    render() {
        const { monitorFn, newPostFn, toggleFn, handleOnDropFn, chosenPic } = this.props; 
        const pic = chosenPic != '' ? chosenPic : placeholder
        return (
            <div className="image_upload_container">
                    <button onClick={toggleFn}>Toggle</button>
                    <Dropzone 
                            multiple={false}
                            accept="image/*"
                            onDrop={handleOnDropFn}
                            className='dropzone'
                            >
                    Tap here to upload an image!
                    </Dropzone>
                    <img src={pic} alt=""/> 
                    <input onChange={ (e) => monitorFn(e.target.value)}></input>
                    <button onClick={newPostFn}>Post</button>
            </div>
        )
    }
}