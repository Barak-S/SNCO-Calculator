import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, Modal, Form, Button } from 'react-bootstrap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
  
import MapContainer from '../components/MapComponent'

export default class SingleLoan extends Component {

    state={
        lat: 0,
        lng: 0,
        loan:{},
        loanAttributes: [],
        deleteModal: false,
    }

    componentDidMount(){
        // console.log(window.location.pathname)

        fetch(`https://snco-calculator-backend.herokuapp.com${window.location.pathname}`)
        .then(resp=>resp.json())
        .then(loan=>this.setState({ loan },()=>{
            this.getAddressCoordinates(this.state.loan.address)
            this.mapLoanAttributes(this.state.loan.loan)
        }))
    }

    getAddressCoordinates=(address)=>{
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setState({ 
            lat: latLng.lat,
            lng: latLng.lng,
        }))
        .catch(error => console.error('Error', error));
    }

    numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

    mapLoanAttributes(loanAttributes){
        let attrributes=[]
        for (const [key, value] of Object.entries(loanAttributes)) {
            attrributes.push({key,value})
        }
        this.setState({
            loanAttributes: attrributes
        })
    }

    handleClose=()=>{
        this.setState({ deleteModal: !this.state.deleteModal })
    }

    deleteLoan=(loanID)=>{
        // Delete single loan
        fetch('https://snco-calculator-backend.herokuapp.com/loans',{
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loanID })
        })
        this.props.history.push('/loans')
    }


    render() {

        return (
            <div style={{paddingBottom: 25}}>
                <Card className="SingleLoan" style={{ border: '1px solid #B98757', borderRadius: 12, margin: "1rem", padding: 15 }}>
                    <Card.Text style={{ fontWeight: "600", fontSize: 22, margin: 2.5 }}>{this.state.loan.address}</Card.Text>
                    <Card.Text><strong>Type: </strong>{this.state.loan.properyType}</Card.Text>
                    <Row>
                        <Col xs={12} md={8}>
                            <MapContainer
                                lat={this.state.lat}
                                lng={this.state.lng}
                            />
                        </Col>
                        <Col xs={8} md={4} style={{textAlign: "left"}}>
                            {/* <Card.Text style={{fontSize: 20}}><strong>Purchase Price: </strong>{this.numberFormat(this.state.loan.purchasePrice)}</Card.Text> */}
                            <Card style={{ border: '1px solid #B98757', borderRadius: 10, padding: 5 }}>
                            {this.state.loanAttributes.map(loan=>{
                                return(
                                    <Card.Text style={{fontSize: 18}}><strong>{loan.key}: </strong>{loan.value}</Card.Text>
                                )
                            })}
                            </Card>
                        </Col>
                    </Row>
                    
                    <Col >
                        <Button variant="danger" style={{marginLeft: "1rem", marginRight: "1rem", width: "25%" }} onClick={()=>this.handleClose()}>Delete</Button>
                    </Col>
                    
                    
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
                        <Button variant="danger" onClick={()=>this.deleteLoan(this.state.loan._id)}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    }

                </Card>
            </div>
        )
    }
}

