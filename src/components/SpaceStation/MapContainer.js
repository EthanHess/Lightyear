import React, { Component } from 'react'; 
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './SpaceStation.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

//TODO pass lat + long from axios

export class MapContainer extends Component {
    render() {
      return (
        <Map className ="the_map"
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
           lat: -1.2884,
           lng: 36.8233
          }}
        />
      );
   }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);