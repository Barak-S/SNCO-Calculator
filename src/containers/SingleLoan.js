import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, Modal, Form, Button } from 'react-bootstrap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
  
import MapContainer from '../components/MapComponent'
import Input from '../components/InputComponent'

export default class SingleLoan extends Component {

    state={
        lat: 0,
        lng: 0,
        loan:{},
        loanAttributes: [],
        otherAttributes: [],
        deleteModal: false,
        editModal: false,
    }

    componentDidMount(){
        fetch(`https://snco-calculator-backend.herokuapp.com${window.location.pathname}`)
        .then(resp=>resp.json())
        .then(loan=>this.setState({ loan },()=>{
            this.getAddressCoordinates(this.state.loan.address)
            this.mapLoanAttributes(this.state.loan.loan, this.state.loan)
        }))
    }

    editModal=()=>{
        this.setState({ editModal: !this.state.editModal})
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

    
    mapLoanAttributes(loanAttr, otherAttr){
        let loanAttributes=[]
        for (const [key, value] of Object.entries(loanAttr)) {
            loanAttributes.push({key,value})
        }
        this.setState({
            loanAttributes
        })
        let otherAttributes=[]
        for (const [key, value] of Object.entries(otherAttr)) {
            otherAttributes.push({key,value})
        }
        this.setState({
            otherAttributes
        })

    }

    mapOtherAttributes=(details)=>{
        // only gets max refi calculations
        let otherAttributes=[]
        details.map(attr=> {
            if (attr.key === "purchaseDate" || attr.key === "totalProjectCost" || attr.key === "noi" || attr.key === "annualDebtService" || attr.key=== "dscr"){
                otherAttributes.push(attr)
            }
            
        })
        console.log(otherAttributes)
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

    saveEdit=()=>{
        console.log("saving")
    }


    render() {

        this.mapOtherAttributes(this.state.otherAttributes)


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
                            <Card style={{ border: '1px solid #B98757', borderRadius: 10, padding: 7, margin: 5 }}>
                                <Card.Text>Loan Calculation Details...</Card.Text>                                
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{textAlign: "left"}}>
                            <Card style={{ border: '1px solid #B98757', borderRadius: 10, padding: 7, margin: 5 }}>
                            <Card.Text style={{fontSize: 20, textAlign: "center", fontWeight: "600"}}>Loan Details</Card.Text>
                            {this.state.loanAttributes.map(loan=>{
                                return(
                                    <Card.Text style={{fontSize: 18}}><strong>{loan.key}: </strong>{loan.value}</Card.Text>
                                )
                            })}
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row style={{ justifyContent: "center", marginTop: 7 }} >
                        <Button variant="danger" style={{marginLeft: "1rem", marginRight: "0.5rem" }} onClick={()=>this.handleClose()}>Delete</Button>
                        <Button variant="success" style={{marginLeft: "0.5rem", marginRight: "1rem" }} onClick={()=>this.editModal()}>Edit</Button>
                    </Row>
                    
                    
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

                    {this.state.editModal === true && 
                    <>
                    <Modal
                        show={this.state.editModal}
                        onHide={this.editModal}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Edit Loan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {this.state.loanAttributes.map(attr=>{
                                    return(
                                        <Form.Row>
                                            <Col>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text>{attr.key}</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                    <Input
                                                        // handleChange={this.handleNumberChange}
                                                        value={attr.value}
                                                        //input="currency"
                                                        // name={"purchasePrice"}
                                                        input={attr.key === "arm" || attr.key === "rate" || attr.key === "units" || attr.key==="creditScore" || attr.key==="exitStrategy" || attr.key === "turnaroundTime" || attr.key === "experienceLevel"?
                                                            null : 
                                                            "currency"}
                                                    />
                                                
                                            </InputGroup>
                                            </Col>
                                        </Form.Row>
                                    )
                                })}
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="success">
                            {/* onclick not ready */}
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.editModal}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    }

                </Card>
            </div>
        )
    }
}

