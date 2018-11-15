import React, { Component } from 'react'; 
import MapGL, { NavigationControl, Marker, Popup, } from 'react-map-gl';
import './SpaceStation.css';
import axios from 'axios'; 
import spacestation from './ss.png' //TODO make custom 

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

//TODO pass lat + long from axios

export default class MapContainer extends Component {
    constructor() {
      super()
      this.state = { //fetch ll from space station api
        viewport: {
          latitude: 37.785164,
          longitude: -100,
          zoom: 2.8,
          bearing: 0,
          pitch: 0,
          width: 500,
          height: 500,
        },
        markerLat: 37.785164, 
        markerLong: -100, 
        offsetLeft: 0, 
        offsetTop: 0,
        popupInfo: null
      }
      this.renderPopup = this.renderPopup.bind(this)
    }

    renderPopup(){
      return this.state.popupInfo && (
        <Popup tipSize={5}
          anchor="bottom-right"
          longitude={this.state.popupInfo.state.longitude}
          latitude={this.state.popupInfo.state.latitude}
          onClose={() => this.setState({popupInfo: null})}
          closeOnClick={true}>
          <p>{"Heyo!"}</p>
        </Popup>
      )
    }

    fetchISSData = () => {

    }

    render() {
      const { viewport, markerLat, markerLong, offsetLeft, offsetTop } = this.state;
      return (
        <MapGL
          className="the_map"
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiZWNobXBieCIsImEiOiJjam9ocTA1dWMwMHdiM3BwM3ZoZnRyM3h0In0.Ui3wkCjCEWiknL3e-O4LMg">
          <div className="nav" style={navStyle}>
            <NavigationControl/>
            <Marker longitude={markerLong} latitude={markerLat} offsetTop={offsetTop} offsetLeft={offsetLeft}>
              <img src={spacestation} onClick={() => this.setState({popupInfo: "HEY"})}/>
            </Marker>
          </div>
        </MapGL>
      )
   }
}