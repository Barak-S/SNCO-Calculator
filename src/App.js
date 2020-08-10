import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CalculatorCard from './containers/Card'
import SNCOLogo from './components/SNCOLogo'

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
        <CalculatorCard
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
          changeDropDownChoice={this.changeDropDownChoice}
          handleNumberChange={this.handleNumberChange}
          handleAddressChange={this.handleAddressChange}
        />
      </div>
    );


  }
}

export default App;
