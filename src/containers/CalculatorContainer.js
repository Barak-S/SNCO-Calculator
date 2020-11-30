import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import MaxRefi from '../containers/MaxRefi'
import FixAndFlip from '../containers/FixAndFlip'
import { Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';  

export default class CalculatorContainer extends Component {
    state={
        propertyType: "commericial",
        address: "",
        date: new Date(),  
        loan: {},
        alert: false  
    }
    
    handleAddressChange= (address) => {
        this.setState({ address })
    }

    handleAddressSelect = (address) => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        this.setState({ address})
    }
    
    changePropertyType=(e)=>{
        this.setState({
            propertyType: e
        })
    }
    
    dateChange = date => this.setState({ date })

    clearAddressFromState=()=>{
        this.setState({ address: "" })
    }

    alertMessage=()=>{
        this.setState({ alert: true})
        setTimeout(() => {
            this.setState({ alert: false })
        }, 5000)
    }


    createLoan=( loan, puchaseDate )=>{
        if (this.state.address !== ""){
            fetch('https://snco-calculator-backend.herokuapp.com/loans',{
                method: "POST",
                headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({address: this.state.address, propertyType: this.state.propertyType, puchaseDate, loan })
            })
            .then(res=>res.json())
            .then(loans=>{
                //   this.resetForm()
                //   this.alertMessage()
                })
            .catch(() => console.log("Can’t POST loan data"))
        
            } else {
            console.log("wont post without an address")
            }
    }


    render(){


        return (
            <div className="App">
                <div>
                    <Col xs={12} sm={12} md={7} lg={7} className="align-center">
                        <Card.Text className="appHeader">Mortgage Loan Calculator</Card.Text>
                        <h5 style={{padding: '0.5rem'}}>
                            Use our Mortgage Calculators to estimate your monthly mortgage payment. You can input a different home price, down payment, loan term and interest rate to see how your monthly payment changes.
                        </h5>
                        <DropdownButton 
                            variant="dark"
                            title={this.state.propertyType} 
                            onSelect= {(e)=>this.changePropertyType(e)}
                            style={{ margin:5 }}
                            id="nav-dropdown">
                        
                            <Dropdown.Item eventKey="commericial">Commericial</Dropdown.Item>
                            <Dropdown.Item eventKey="residential">Residential</Dropdown.Item>
                        </DropdownButton>
                    </Col>

                {this.state.propertyType === "commericial" &&
                    <MaxRefi
                        date= {this.state.date}
                        dateChange = {this.dateChange}
                        address= {this.state.address}
                        handleAddressChange = {this.handleAddressChange}
                        handleAddressSelect = {this.handleAddressSelect}
                        propertyType = {this.state.propertyType}
                        clearAddressFromState={this.clearAddressFromState}
                        handleAddressSelect = {this.handleAddressSelect}
                        alertMessage = {this.alertMessage}
                        alert = {this.state.alert}
                        createLoan = {this.createLoan}
                    />
                }

                {this.state.propertyType === "residential" &&
                    <FixAndFlip 
                        address = {this.state.address}
                        handleAddressChange = {this.handleAddressChange}
                        handleAddressSelect = {this.handleAddressSelect}
                        propertyType = {this.state.propertyType}
                        clearAddressFromState={this.clearAddressFromState}
                        handleAddressSelect = {this.handleAddressSelect}
                        alertMessage = {this.alertMessage}
                        alert = {this.state.alert}
                        createLoan = {this.createLoan}

                    /> 
                }

                </div>
            </div>
        );

    
    }
}
