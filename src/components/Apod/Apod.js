import React, { Component } from 'react';
import axios from 'axios'; 
import './Apod.css'

export default class Apod extends Component {
    constructor() {
        super()
        this.state = {
            user: null, //add following for share with friends? 
            imageURL: '', //will need to update for video
            descriptionString: ''
        }
    }

    componentDidMount() {
        this.fetchAPOD()
    }

    fetchAPOD = () => {
        const fullURLNasa = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`; 
        axios.get(fullURLNasa).then(response => {
            if (response.data.media_type === "image") {
                this.setState({
                  imageURL: response.data.url, 
                  descriptionString: response.data.explanation, 
                }); 
              } else {
                console.log('--- TODO video config ---')
              }
        }).catch(error => {
            console.log('error getting NASA image apod', error)
        })
    }

    render() {
        return (
            <div className="apod_container">
                <img src={this.state.imageURL} alt=""/>
                <p>{this.state.descriptionString}</p>
            </div>   
        )
    }
}