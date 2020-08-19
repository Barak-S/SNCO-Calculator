import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import MaxRefi from '../containers/MaxRefi'
import FixAndFlip from '../containers/FixAndFlip'
import SNCOLogo from '../components/SNCOLogo'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';


export default class CalculatorContainer extends Component {
    state={
        propertyType: "Multifamily Max Refi",
        address: "",
        date: new Date(),
        allLoans: [],
    
      }
    
      componentDidMount(){
        fetch("http://localhost:5000/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        },()=>console.log(this.state.allLoans)))
      }
    
      handleAddressChange= (address) => {
        this.setState({ address })
      }
    
      // handleAddressSelect = (address) => {
      //   geocodeByAddress(address)
      //     .then(results => getLatLng(results[0]))
      //     this.setState({ address})
      //     .then(latLng => console.log('Success', latLng))
      //     .catch(error => console.error('Error', error));
      // };
    
    
      changePropertyType=(e)=>{
        this.setState({
            propertyType: e
        })
      }
    
      // formatRateInput=(num)=> {
      //   this.setState({
      //       rate: parseFloat(num).toFixed(2)
      //   })
      // }
    
      dateChange = date => this.setState({ date })
    
    
      render(){
    
    
        return (
          <div className="App">
            {/* <SNCOLogo/> */}
    
                  <Card.Text style={{fontWeight: "600", fontSize: 22}}>SNCO Calculator</Card.Text>
                      <DropdownButton 
                          variant="dark"
                          title={this.state.propertyType} 
                          onSelect= {(e)=>this.changePropertyType(e)}
                          style={{ margin:7.5 }}
                          id="nav-dropdown">
                      
                          <Dropdown.Item eventKey="Multifamily Max Refi">Multifamily Max Refi</Dropdown.Item>
                          <Dropdown.Item eventKey="1-4 Calculator">1-4 Calculator</Dropdown.Item>
                      </DropdownButton>
    
                  {this.state.propertyType === "Multifamily Max Refi" ?
                    <MaxRefi
                      date= {this.state.date}
                      dateChange = {this.dateChange}
                      address= {this.state.address}
                      handleAddressChange = {this.handleAddressChange}
                      handleAddressSelect = {this.handleAddressSelect}
                      propertyType = {this.state.propertyType}
                    />
                    : 
                  null
                  
                
                }
    
                {this.state.propertyType === "1-4 Calculator"? 
                  <FixAndFlip 
                    address = {this.state.address}
                    handleAddressChange = {this.handleAddressChange}
                    handleAddressSelect = {this.handleAddressSelect}
                    propertyType = {this.state.propertyType}
                  /> 
                : 
                null}
    
          </div>
        );
    
    
    }
}
