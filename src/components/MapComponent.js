import React from 'react';
import { GoogleMap, Marker, InfoBox } from "@react-google-maps/api"
import { InputGroup, FormControl, DropdownButton, Dropdown,Card } from 'react-bootstrap';


const MapContainer = (props) => {
  
  const mapStyles = {        
      width: '100%',
      height: '500px'
  };

  const defaultCenter = {
      lat: props.lat, lng: props.lng
  }

  
  return (

      <Card style={{ padding: 12.5, marginBottom: 5, borderRadius: 10, marginBottom: 12 }}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={19}
            center={defaultCenter}
          >
              <Marker position={defaultCenter} />
          </GoogleMap>

      </Card>
     
  )
}

export default MapContainer;