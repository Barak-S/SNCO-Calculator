import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
  
import MapContainer from '../components/MapComponent'

export default class SingleLoan extends Component {

    state={
        lat: 0,
        lng: 0,
    }

    componentDidMount(){
        geocodeByAddress(this.props.loan.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setState({ 
            lat: latLng.lat,
            lng: latLng.lng,
        }))
        .catch(error => console.error('Error', error));

    }


    render() {
        return (
            <Card className="SingleLoan" style={{ border: '1px solid #B98757', borderRadius: 12, margin: "1rem", paddingTop: 15 }}>
                <Card.Text style={{ fontWeight: "600", fontSize: 22, margin: 2.5 }}>{this.props.loan.address}</Card.Text>
                <Card.Text><strong>Type: </strong>{this.props.loan.properyType}</Card.Text>
                <Col xs={12} md={8}>
                    <MapContainer
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />
                </Col>
                

                <Button variant="dark" style={{margin: "1rem" }} onClick={()=>this.props.closeLoan()}>Close</Button>
            </Card>
        )
    }
}
