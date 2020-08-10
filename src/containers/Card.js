import React, { Component } from 'react'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';

import DatePicker from 'react-date-picker';

import GeoCode from '../components/GeoCode'

export default class CalculatorCard extends Component {

    // state={
    //     dropDownChoice: "Multifamily Max Refi",
    //     address: "",
    //     purchasePrice: "",
    //     requestLoanAmount: "",
    //     date: new Date(),
    //     monthlyGrossRent: "",
    //     units: "",
    //     vacancy: "",
    //     taxes: "",
    //     insurance: "",
    //     waterSewer: "",
    //     utilities: "",
    //     management: "",
    //     replacementReserves: "",
    //     hardCosts: "",
    //     softCosts: "",
        // totalProjectCost: 0,

    // }

    // handleAddressChange(e){
    //     this.setState({
    //         address: e.target.value
    //     },()=>console.log(this.state.address))
    // }


    // handleNumberChange(e){

    //     // let typedValue = e.target.value
    //     // if (typedValue === ""){
    //     //     typedValue = 0;
    //     // } 
    //     this.setState({
    //         [e.target.name]: parseInt(e.target.value.toLocaleString())
    //     })
    // }


    // changeDropDownChoice(e){
    //     this.setState({
    //         dropDownChoice: e
    //     })
    // }
      
    // dateChange = date => this.setState({ date })


    // calculateTotalProjectCost(){
    //     // let price = this.state.purchasePrice === "0" ? 0 : this.state.purchasePrice
    //     // let hard = this.state.hardCosts === "0" ? 0 : this.state.hardCosts
    //     // let soft = this.state.softCosts === "0" ? 0 : this.state.softCosts
    //     let price = typeof(this.state.purchasePrice) === NaN ? 0 : this.state.purchasePrice
    //     let hard = typeof(this.state.hardCosts) === NaN ? 0 : this.state.hardCosts
    //     let soft = typeof(this.state.softCosts) === NaN ? 0 : this.state.softCosts
    //     let total = ( price + hard + soft )

    //     this.setState({
    //         totalProjectCost: total
    //     },()=>console.log(total))
             
    // }

    // dateChange = date => this.setState({ date })


    render() {

        let officeExpenses = (this.props.units * 500)
        let replacementReserves = (this.props.units * 250)

        let management = (this.props.annualGrossRent * .04)

        let taxes = parseInt(this.props.taxes *1)
        let utilities = parseInt(this.props.utilities *1)
        let waterSewer = parseInt(this.props.waterSewer *1)

        let totalIncomeGenerated = (((this.props.annualGrossRent + (officeExpenses) + (replacementReserves))) *1);
        let grossAnnualOperatingExpenses = (taxes + utilities + waterSewer + management);
        let noi = (totalIncomeGenerated - grossAnnualOperatingExpenses);
        let capRate = ((noi / this.props.purchasePrice) * 100)

       
        return (
            <Card className="CalculatorCard" style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                <Card.Body>
                    <Card.Text>SNCO Calculator</Card.Text>
                        <DropdownButton 
                            variant="dark"
                            title={this.props.dropDownChoice} 
                            onSelect= {(e)=>this.props.changeDropDownChoice(e)}
                            style={{ margin:7.5 }}
                        >
                            <Dropdown.Item eventKey="Multifamily Max Refi">Multifamily Max Refi</Dropdown.Item>
                            <Dropdown.Item eventKey="Fix & Flip">Fix & Flip</Dropdown.Item>
                            <Dropdown.Item eventKey="Hard Money">Hard Money</Dropdown.Item>
                        </DropdownButton>

                        <Container fluid>
                            <Row>

                                <Col md={6}>
                                    <Card style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                        <Card.Body>
                                    
                                                
                                                    {/* <FormControl aria-label="Address" placeholder="Address" name="address" value={this.props.address} onChange={(e)=>this.handleAddressChange(e)} style={{margin:7.5}}></FormControl> */}

                                                    <GeoCode></GeoCode>
                                                
                                                <InputGroup>
                                                    <FormControl placeholder="Purchase Price" name="purchasePrice" value={this.props.purchasePrice} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Requested Loan Amount" name="requestLoanAmount" value={this.props.requestLoanAmount} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <DatePicker
                                                    onChange={this.dateChange}
                                                    value={this.props.date}
                                                    />
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Annual Gross Rent" name="annualGrossRent" value={this.props.annualGrossRent} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Units" name="units" value={this.props.units} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Vacancy" name="vacancy" disabled={true} value={(parseInt(this.props.annualGrossRent) * .03)} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Taxes" type="number" name="taxes" value={this.props.taxes} onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Insurance"  name="insurance" value={this.props.insurance} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Water Sewer" name="waterSewer" value={this.props.waterSewer} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Utilities" name="utilities" value={this.props.utilities} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Management" name="management" disabled={true} value={management} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Replacement Reserves" name="replacementReserves" value={this.props.replacementReserves} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Hard Costs" name="hardCosts" value={this.props.hardCosts} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Soft Costs" name="softCosts" value={this.props.softCosts} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>

                                
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card style={{  border: '2px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                                        <Card.Body>
                                            <Card.Text style={{textAlign: "left"}}>
                                            <h5>{`Total project cost: $${(((this.props.purchasePrice) + (this.props.hardCosts) + (this.props.softCosts))* 1).toLocaleString()}`}</h5>
                                            <h5>Taxes: ${ (((this.props.taxes)* .03)+ this.props.taxes)}</h5>
                                            <h5>Office Expenses: ${officeExpenses.toLocaleString()}</h5>
                                            <h5>Replacement Reserves: ${replacementReserves.toLocaleString()}</h5>
                                            <h5>Management: ${management.toLocaleString()}</h5>
                                            <h5>Insurance: ${(this.props.insurance *1)}</h5>
                                            <h5>Gross Annual Income: ${totalIncomeGenerated.toLocaleString()}</h5>
                                            <h5>Gross Annual Operating Expenses: ${ grossAnnualOperatingExpenses.toLocaleString()}</h5>
                                            <h5>NOI: ${noi.toLocaleString()}</h5>
                                            <h5>Cap Rate: { capRate ? capRate : 0  }</h5>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                
                                </Col>
                            </Row>
                        </Container>

                </Card.Body>
                

            </Card>
        )
    }
}

{/* <Form.File

    FOR UPLOADING FILES

    className="position-relative"
    required
    name="file"
    label="File"
    onChange={handleChange}
    isInvalid={!!errors.file}
    feedback={errors.file}
    id="validationFormik107"
    feedbackTooltip
/>  */}