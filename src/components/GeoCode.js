import React from 'react'

import { FormControl, InputGroup } from 'react-bootstrap';


import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


export default function GeoCode() {

    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    })

    const handleSelect = async (value)=>{
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latlng)
    };

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>{
                ({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
                    <div>
                        {/* <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p> */}
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>Address</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl {...getInputProps()} autoComplete="new-password"></FormControl>
                        </InputGroup>
                        <div style={{cursor: "pointer"}}>
                            {loading? <div>...loading</div> : null}
                            {suggestions.map((suggestion)=>{
                                const style={
                                    backgroundColor: suggestion.active ? "#B98757" : "#ffffff"
                                };
                                return(<div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description }</div>)
                            })}
                        </div>
                    </div>
                )
            }

            </PlacesAutocomplete>
        </div>
    )
}
