import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { FormControl, InputGroup, Form } from 'react-bootstrap';

 
export default class LocationSearchInput extends React.Component {
 
  render() {

    return (

        <PlacesAutocomplete
          value={this.props.address}
          onChange={(e)=>this.props.handleAddressChange(e)}
          onSelect={(e)=>this.props.handleAddressSelect(e)}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                  <InputGroup className="mb-3">
                  <Form.Label style={{width: "100%", textAlign: "left"}}>Address</Form.Label>
                      <FormControl placeholder= "Address" {...getInputProps({
                          autoComplete: "new-password"
                      })}>
                      </FormControl>
                  </InputGroup>
              <div style={{cursor: "pointer", fontSize: 15.5}}>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const style={
                      backgroundColor: suggestion.active ? "#B98757" : "#ffffff"
                  };
                  return(<div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.description}>{suggestion.description }</div>)
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
    );
  }
}