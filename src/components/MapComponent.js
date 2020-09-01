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
      <div className="mapWrapper"style={{border: '2.75px solid #B98757', padding: 3, marginBottom: 5}}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={19}
          center={defaultCenter}
        >
            <Marker position={defaultCenter} />
        </GoogleMap>
      </div>
     
  )
}

export default MapContainer;