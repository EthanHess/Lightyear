import React, { Component } from 'react'; 
import './SpaceStation.css'; 
import MapContainer from './MapContainer'; 

export default class SpaceStation extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        
        return (
            <div>
                <div className="map_container">
                    <MapContainer /> 
                </div>
            </div>
        )
    }
}