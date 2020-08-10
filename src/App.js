import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MaxRefi from './containers/Card'
import SNCOLogo from './components/SNCOLogo'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';

class App extends React.Component {

  state={
    dropDownChoice: "Multifamily Max Refi",
    address: "",
    purchasePrice: "",
    requestLoanAmount: "",
    date: new Date(),
    annualGrossRent: "",
    units: "",
    vacancy: "",
    taxes: "",
    insurance: "",
    waterSewer: "",
    utilities: "",
    management: "",
    replacementReserves: "",
    hardCosts: "",
    softCosts: "",
    // totalProjectCost: 0,

}

handleAddressChange=(e)=>{
  this.setState({
      address: e.target.value
  },()=>console.log(this.state.address))
}


handleNumberChange=(e)=>{

  // let typedValue = e.target.value
  // if (typedValue === ""){
  //     typedValue = 0;
  // } 
  this.setState({
      [e.target.name]: parseInt(e.target.value)
  })
}


changeDropDownChoice=(e)=>{
  this.setState({
      dropDownChoice: e
  })
}

dateChange = date => this.setState({ date })



  render(){
    return (
      <div className="App">
        <SNCOLogo/>

        <Card className="CalculatorCard" style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15 }}>
          <Card.Body>
              <Card.Text>SNCO Calculator</Card.Text>
                  <DropdownButton 
                      variant="dark"
                      title={this.state.dropDownChoice} 
                      onSelect= {(e)=>this.changeDropDownChoice(e)}
                      style={{ margin:7.5 }}
                  >
                      <Dropdown.Item eventKey="Multifamily Max Refi">Multifamily Max Refi</Dropdown.Item>
                      <Dropdown.Item eventKey="Fix & Flip">Fix & Flip</Dropdown.Item>
                      <Dropdown.Item eventKey="Hard Money">Hard Money</Dropdown.Item>
                  </DropdownButton>

              {this.state.dropDownChoice === "Multifamily Max Refi" ?
                <MaxRefi
                  dropDownChoice={this.state.dropDownChoice}
                  address= {this.state.address}
                  purchasePrice= {this.state.purchasePrice}
                  requestLoanAmount= {this.state.requestLoanAmount}
                  date= {this.state.date}
                  annualGrossRent= {this.state.annualGrossRent}
                  units= {this.state.units}
                  vacancy= {this.state.vacancy}
                  taxes= {this.state.taxes}
                  insurance= {this.state.insurance}
                  waterSewer= {this.state.waterSewer}
                  utilities= {this.state.utilities}
                  management= {this.state.management}
                  replacementReserves= {this.state.replacementReserves}
                  hardCosts= {this.state.hardCosts}
                  softCosts= {this.state.softCosts}

                  dateChange={this.dateChange}
                  handleNumberChange={this.handleNumberChange}
                  handleAddressChange={this.handleAddressChange}
                />
                : 
              < p>{this.state.dropDownChoice}</p>
              
            
            }

          </Card.Body>
        </Card>
      </div>
    );


  }
}

export default App;
