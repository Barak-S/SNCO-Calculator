import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '25%',
  height: '25%'
};

export class MapContainer extends Component {

    render() {

        return (
        <Map
            google={this.props.google}
            zoom={18}
            style={mapStyles}
            center={{ lat: this.props.lat, lng: this.props.lng }}
            >
        </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBmud-ICOi08US4on_wa85S4k_-0qDH80Q'
})(MapContainer);