import React, { Component } from 'react';
import { GoogleMap, Marker, InfoBox } from "@react-google-maps/api"

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
          zoom={19}
          center={defaultCenter}
        >
            <Marker position={defaultCenter} />
        </GoogleMap>
     
  )
}

export default MapContainer;