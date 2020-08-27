import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import MaxRefi from '../containers/MaxRefi'
import FixAndFlip from '../containers/FixAndFlip'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';


export default class CalculatorContainer extends Component {
    state={
        propertyType: "Multifamily Max Refi",
        address: "",
        date: new Date(),    
    }
    
    handleAddressChange= (address) => {
    this.setState({ address })
    }
    
    changePropertyType=(e)=>{
    this.setState({
        propertyType: e
    })
    }
    
    dateChange = date => this.setState({ date })

    clearAddressFromState=()=>{
        this.setState({ address: "" },()=>console.log(this.state.address))
    }


    render(){


        return (
            <div className="App">
            {/* <SNCOLogo/> */}

                <Card.Text className="appHeader">SNCO Calculator</Card.Text>
                    <DropdownButton 
                        variant="dark"
                        title={this.state.propertyType} 
                        onSelect= {(e)=>this.changePropertyType(e)}
                        style={{ margin:5 }}
                        id="nav-dropdown">
                    
                        <Dropdown.Item eventKey="Multifamily Max Refi">Multifamily Max Refi</Dropdown.Item>
                        <Dropdown.Item eventKey="1-4 Calculator">1-4 Calculator</Dropdown.Item>
                    </DropdownButton>

                {this.state.propertyType === "Multifamily Max Refi" &&
                <MaxRefi
                    date= {this.state.date}
                    dateChange = {this.dateChange}
                    address= {this.state.address}
                    handleAddressChange = {this.handleAddressChange}
                    handleAddressSelect = {this.handleAddressSelect}
                    propertyType = {this.state.propertyType}
                    clearAddressFromState={this.clearAddressFromState}
                />
                }

                {this.state.propertyType === "1-4 Calculator"&&
                    <FixAndFlip 
                        address = {this.state.address}
                        handleAddressChange = {this.handleAddressChange}
                        handleAddressSelect = {this.handleAddressSelect}
                        propertyType = {this.state.propertyType}
                        clearAddressFromState={this.clearAddressFromState}
                    /> 
                }

            </div>
        );

    
    }
}
