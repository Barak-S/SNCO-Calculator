import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MaxRefi from './containers/MaxRefi'
import FixAndFlip from './containers/FixAndFlip'
import SNCOLogo from './components/SNCOLogo'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';

class App extends React.Component {

  state={
    dropDownChoice: "Multifamily Max Refi",
    address: 0,
    purchasePrice: 0,
    requestLoanAmount: 0,
    date: new Date(),
    annualGrossRent: 0,
    units: 0,
    vacancy: 0,
    taxes: 0,
    insurance: 0,
    waterSewer: 0,
    utilities: 0,
    management: 0,
    replacementReserves: 0,
    hardCosts: 0,
    softCosts: 0,
    rate: 0,
    arm: 0,
    dscr: 0,
    payoff: 0

}

  handleAddressChange=(e)=>{
    this.setState({
        address: e.target.value
    },()=>console.log(this.state.address))
  }


  handleNumberChange=(key, e)=>{
    // console.log(key, e)
    this.setState({
      [key]: e
    })
  }


  changeDropDownChoice=(e)=>{
    this.setState({
        dropDownChoice: e
    })
  }

  dateChange = date => this.setState({ date })



  render(){

    console.log(this.state.purchasePrice)


    return (
      <div className="App">
        <SNCOLogo/>

        <Card className="CalculatorCard" style={{ border: '4px solid #B98757', margin: "1rem", borderRadius: 15 }}>
          <Card.Body>
              <Card.Text style={{fontWeight: "600", fontSize: 22}}>SNCO Calculator</Card.Text>
                  <DropdownButton 
                      variant="dark"
                      title={this.state.dropDownChoice} 
                      onSelect= {(e)=>this.changeDropDownChoice(e)}
                      style={{ margin:7.5 }}
                      id="nav-dropdown">
                  
                      <Dropdown.Item eventKey="Multifamily Max Refi">Multifamily Max Refi</Dropdown.Item>
                      <Dropdown.Item eventKey="1-4 Calculator">1-4 Calculator</Dropdown.Item>
                      {/* <Dropdown.Item eventKey="Hard Money">Hard Money</Dropdown.Item> */}
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
                  rate={this.state.rate}
                  arm={this.state.arm}
                  dscr={this.state.dscr}
                  payoff={this.state.payoff}

                  dateChange={this.dateChange}
                  handleNumberChange={this.handleNumberChange}
                  handleAddressChange={this.handleAddressChange}
                />
                : 
              null
              
            
            }

            {this.state.dropDownChoice === "1-4 Calculator"? <FixAndFlip handleNumberChange={this.handleNumberChange}/> : null}

          </Card.Body>
        </Card>
      </div>
    );


  }
}

export default App;
