import React, { Component } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api"

const MapContainer = (props) => {
  
    const mapStyles = {        
        width: '100%',
        height: '500px'
    };
  
    const defaultCenter = {
        lat: props.lat, lng: props.lng
    }
  
  return (
     
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={defaultCenter}
        >
            <Marker
                lat={props.lat}
                lng={props.lng}
            />
        </GoogleMap>
     
  )
}

export default MapContainer;