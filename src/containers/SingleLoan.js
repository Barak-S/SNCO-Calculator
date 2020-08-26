import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, Modal, Form, Button } from 'react-bootstrap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
  
import MapContainer from '../components/MapComponent'
import DeleteModal from '../components/deleteLoanModal'

export default class SingleLoan extends Component {

    state={
        lat: 0,
        lng: 0,
        loanAttributes: [],
        deleteModal: false,
    }

    componentDidMount(){
        geocodeByAddress(this.props.loan.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setState({ 
            lat: latLng.lat,
            lng: latLng.lng,
        }))
        .catch(error => console.error('Error', error));

        this.mapLoanAttributes(this.props.loan.loan)

    }

    numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

    mapLoanAttributes(loanAttributes){
        let attrributes=[]
        for (const [key, value] of Object.entries(loanAttributes)) {
            // console.log(key, value);
            attrributes.push({key,value})
            // return(<Card.Text style={{fontSize: 20}}><strong>{key}</strong>{value}</Card.Text>)
        }
        this.setState({
            loanAttributes: attrributes
        },()=>console.log(this.state.loanAttributes))
    }

    handleClose=()=>{
        this.setState({ deleteModal: !this.state.deleteModal })
    }


    render() {

        return (
            <Card className="SingleLoan" style={{ border: '1px solid #B98757', borderRadius: 12, margin: "1rem", padding: 15, marginBottom: "2rem" }}>
                <Card.Text style={{ fontWeight: "600", fontSize: 22, margin: 2.5 }}>{this.props.loan.address}</Card.Text>
                <Card.Text><strong>Type: </strong>{this.props.loan.properyType}</Card.Text>
                <Row>
                    <Col xs={12} md={8}>
                        <MapContainer
                            lat={this.state.lat}
                            lng={this.state.lng}
                        />
                    </Col>
                    <Col xs={6} md={4} style={{textAlign: "left"}}>
                        <Card.Text style={{fontSize: 20}}><strong>Purchase Price: </strong>{this.numberFormat(this.props.loan.loan.purchasePrice)}</Card.Text>

                        {this.state.loanAttributes.map(loan=>{
                            return(
                                <Card.Text style={{fontSize: 20}}><strong>{loan.key}: </strong>{loan.value}</Card.Text>
                            )
                        })}

                    </Col>
                </Row>

                    <Button variant="dark" style={{margin: "1rem" }} onClick={()=>this.props.closeLoan()}>Close</Button>
                    <Button variant="danger" style={{marginLeft: "1rem", marginRight: "1rem" }} onClick={()=>this.handleClose()}>Delete</Button>
                
                {this.state.deleteModal === true && 
                <>
                <Modal
                    show={this.state.deleteModal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    This loan record will permanently be removed.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={()=>{this.props.deleteLoan(this.props.loan._id); this.props.closeLoan()}}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </>
                }

            </Card>
        )
    }
}

