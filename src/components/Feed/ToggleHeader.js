import React, { Component } from 'react'; 
import './Feed.css'; //TODO have separate?


export default class ToggleHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //TODO use drop zone and display chosen image!
    render() {
        const { toggleFn } = this.props; 
        return (
            <div className="toggle_header">
                <button onClick={toggleFn}>Post</button>
            </div>
        )
    }
}