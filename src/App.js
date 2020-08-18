import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import MaxRefi from './containers/MaxRefi'
import FixAndFlip from './containers/FixAndFlip'
import SNCOLogo from './components/SNCOLogo'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';

class App extends React.Component {

  state={
    propertyType: "Multifamily Max Refi",
    address: "",
    date: new Date(),
    allLoans: [],

}

  handleAddressChange= (address) => {
    this.setState({ address },()=>console.log(this.state.address))
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


  createLoan=(address, loan)=>{
    if (address !== ""){
      fetch('http://localhost:5000/loans',{
        method: "POST",
        headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({address: address, loan})
      })
      .then(res=>res.json())
      .then(loans=>console.log(loans))
      .catch(() => console.log("Can’t POST loan data"))

    } else {
      console.log("wont post without an address")
    }
  }


  render(){


    return (
      <div className="App">
        <SNCOLogo/>

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
                />
                : 
              null
              
            
            }

            {this.state.propertyType === "1-4 Calculator"? 
              <FixAndFlip 
                address= {this.state.address}
                handleAddressChange = {this.handleAddressChange}
                handleAddressSelect = {this.handleAddressSelect}
              /> 
            : 
            null}

      </div>
    );


  }
}

export default App;
