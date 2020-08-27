import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { FormControl, InputGroup } from 'react-bootstrap';

 
export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.address };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      this.setState({ address})
      this.props.handleAddressChange(address)
    //   .then(latLng => console.log('Success', latLng))
    //   .catch(error => console.error('Error', error));
  };
 
  render() {

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text>Address</InputGroup.Text>
                    </InputGroup.Prepend> 
                    <FormControl {...getInputProps({
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