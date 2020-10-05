import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, Modal, Form, Button, Table } from 'react-bootstrap';
import { InputNumber } from "antd";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
  
import MapContainer from '../components/MapComponent'
import Input from '../components/InputComponent'

export default class SingleLoan extends Component {

    state={
        lat: 0,
        lng: 0,
        loan: {},
        editedLoan: {},
        loanAttributes: [],
        deleteModal: false,
        editModal: false,
    }

    componentDidMount(){
        fetch(`https://snco-calculator-backend.herokuapp.com${window.location.pathname}`)
        .then(resp=>resp.json())
        .then(loan=>this.setState({ loan: loan, editedLoan: loan.loan },()=>{
            this.mapLoanAttributes(this.state.loan.loan)
            this.getAddressCoordinates(this.state.loan.address)
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

    mapLoanAttributes(loan){
        let loanAttributes=[]
        for (const [key, value] of Object.entries(loan)) {
            loanAttributes.push({key,value})
        }
        this.setState({
            loanAttributes
        })
    }

    numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);


    handleClose=()=>{
        this.setState({ deleteModal: !this.state.deleteModal })
    }


    deleteLoan=(loanID)=>{
        fetch('https://snco-calculator-backend.herokuapp.com/loans/delete',{
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loanID })
        })
        this.props.history.push('/loans')
    }
    

    saveEdit=(loan)=>{
        fetch(`https://snco-calculator-backend.herokuapp.com/loans/${this.state.loan._id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.loan._id, loan })
        })
        .then(this.mapLoanAttributes(this.state.loan.loan))
    
    }

    handleChange=(key, value)=>{
        let loan = this.state.loan.loan
        loan[key] = parseInt(value)
        this.setState({
            editedLoan: loan
        })
    }

    changeExperience=(e)=>{
        let stateCopy = this.state.loan.loan
        stateCopy.experienceLevel = e
        this.setState({
            editedLoan: stateCopy
        })
    }

    changeturnaroundTime=(e)=>{
        let stateCopy = this.state.loan.loan
        stateCopy.turnaroundTime = e
        this.setState({
            editedLoan: stateCopy
        })
    }

    handleRateChange=(rate, value)=>{
        let stateCopy = this.state.loan.loan
        stateCopy[rate] = value
        this.setState({
            editedLoan: stateCopy
        })
    }

    parseKeyString=(str)=>{
        let result = str.replace(/([a-z])([A-Z]+[a-z])/g, "$1 $2");
        return result.charAt(0).toUpperCase() + result.slice(1)
    }

    myFormat(num) {
        // return (Math.round(parseInt(num) * 10) /10 ).toFixed(2) + '%';
        // return Math.round(num) + '%';
        return num + '%';
    }


    render() {

        return (
            <div style={{paddingBottom: 25}}>
                <Card className="SingleLoan" style={{ borderRadius: 10, margin: "1rem", padding: 15 }}>
                    <Row>
                        <Col xs={12} md={8}>
                            <Card.Text style={{ fontWeight: "600", fontSize: 22, margin: 2.5 }}>{this.state.loan.address}</Card.Text>
                            <Card.Text style={{fontSize: 17}}><strong>Type: </strong>{this.state.loan.propertyType}</Card.Text>
                            <MapContainer
                                lat={this.state.lat}
                                lng={this.state.lng}
                            />
                            <Card style={{ textAlign: "left", padding: "0.5rem", borderRadius: 10, marginBottom: 12}}>
                                <Col xs={12} md={4} lg={4}>
                                    <Row>
                                        <Col>
                                            {this.state.editedLoan.totalProjectCost && this.state.editedLoan.totalProjectCost !== 0 && <p>Total Project Cost: {this.numberFormat(this.state.editedLoan.totalProjectCost)}</p>}      
                                            {this.state.editedLoan.annualDebtService && <p>Annual Debt Service: {this.numberFormat(this.state.editedLoan.annualDebtService)}</p>}      
                                            {this.state.editedLoan.noi && <p>NOI: {this.numberFormat(this.state.editedLoan.noi)}</p>}                     
                                            {this.state.editedLoan.dscr && <p>DSCR: {this.state.editedLoan.dscr}</p>}                     
                                            {this.state.editedLoan.totalIn && <p>Total In: {this.numberFormat(this.state.editedLoan.totalIn)}</p>}                     
                                            {this.state.editedLoan.totalProfit && <p>Total Profit on Flip: {this.numberFormat(this.state.editedLoan.totalProfit)}</p>}                     
                                            {this.state.editedLoan.profitPercent && <p>Profit Percent: {this.state.editedLoan.profitPercent}</p>}                     
                                        </Col>
                                    </Row>
                                </Col>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{textAlign: "left"}}>
                        <Card style={{ padding: 12.5, marginBottom: 5, borderRadius: 10}}>
                            <Card.Text style={{fontSize: 20, textAlign: "center", fontWeight: "600"}}>Loan Details</Card.Text>
                            <Table responsive> 
                                <tbody>
                                    {this.state.loanAttributes.map(loan=>{
                                        if (loan.key !== "dscr" && loan.key !== "noi" && loan.key !== "totalIn" && loan.key !== "totalProfit" && loan.key !== "totalProjectCost" && loan.key !== "profitPercent"){

                                            if (loan.key === "rate" || loan.key === "capRate" || loan.key === "dscr" || loan.key === "profitPercent" || loan.key === "marketCapRate" ){
                                                return(
                                                    <tr><td style={{fontSize: 16}}><strong>{this.parseKeyString(loan.key)}: </strong> </td> <td style={{fontSize: 15}}>{this.myFormat(loan.value)}</td></tr>
                                                    )
                                            }else{
                                                return(
                                                    <tr><td style={{fontSize: 16}}><strong>{this.parseKeyString(loan.key)}: </strong></td> <td style={{fontSize: 15}}>{loan.key === "arm" || loan.key === "units" || loan.key==="creditScore" || loan.key==="exitStrategy" || loan.key === "turnaroundTime" || loan.key === "experienceLevel" ? loan.value : this.numberFormat(loan.value)}</td></tr>
                                                )
                                            }
                                        }
                                    })}
                                </tbody>
                            </Table>
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
                        <Modal.Body>This loan record will permanently be removed.</Modal.Body>
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
                                {Object.entries(this.state.editedLoan).map(attr=>{
                                    if (attr[0] !== "exitStrategy" && attr[0] !== "noi" && attr[0] !== "dscr" && attr[0] !== "totalIn" && attr[0] !== "totalProfit" && attr[0] !== "profitPercent" && attr[0] !== "marketCapRate"){
                                        if (attr[0] === "turnaroundTime"){
                                            return (
                                                <Form.Row>
                                                    <Col>
                                                    <InputGroup className="mb-3">
                                                        <Input
                                                            changeturnaroundTime = {this.changeturnaroundTime}
                                                            value={attr[1]}
                                                            input={"turnaroundTime"}
                                                        />
                                                    </InputGroup>
                                                    </Col>
                                                </Form.Row>
                                            )
                                        } else if (attr[0] === "experienceLevel"){
                                            return(
                                                <Form.Row>
                                                    <Col>
                                                    <InputGroup className="mb-3">
                                                        <Input
                                                            changeExperience = {this.changeExperience}
                                                            value={attr[1]}
                                                            input={"experienceLevel"}
                                                        />
                                                    </InputGroup>
                                                    </Col>
                                                </Form.Row>
                                            )
                                        } else if (attr[0] === "rate" || attr[0] === "capRate" ){
                                            return(
                                                <Form.Row>
                                                    <Col>
                                                    <InputGroup className="mb-3">
                                                        <Form.Label>{this.parseKeyString(attr[0])}</Form.Label>
                                                        <Input
                                                            handleRateChange = {this.handleRateChange}
                                                            value={attr[1]}
                                                            name={attr[0]}
                                                            input={"rate"}
                                                        />
                                                    </InputGroup>
                                                    </Col>
                                                </Form.Row>
                                            )
                                        } else {
                                            return(
                                                <Form.Row>
                                                    <Col>
                                                    <InputGroup className="mb-3">
                                                        <Form.Label>{this.parseKeyString(attr[0])}</Form.Label>
                                                        <Input
                                                            handleChange = {this.handleChange}
                                                            value={attr[1]}
                                                            name={attr[0]}
                                                            input={attr[0] === "arm" || attr[0] === "rate" || attr[0] === "units" || attr[0]==="creditScore" || attr[0] === "turnaroundTime" || attr[0] === "experienceLevel"? null : "currency"}
                                                        />
                                                    </InputGroup>
                                                    </Col>
                                                </Form.Row>
                                            )  
                                        }
                                    }   
                                    
                                })}
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="success" onClick={()=>{this.saveEdit(this.state.editedLoan); this.editModal()}}>
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

