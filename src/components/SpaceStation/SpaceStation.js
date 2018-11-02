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
                <div className="ss_sub_header">
                    <div>
                        <button></button>
                        <button></button>
                    </div>
                </div>
                <div className="map_container">
                    <MapContainer /> 
                </div>
            </div>
        )
    }
}