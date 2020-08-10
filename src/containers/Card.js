import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container } from 'react-bootstrap';

import DatePicker from 'react-date-picker';

import GeoCode from '../components/GeoCode'

export default class CalculatorCard extends Component {

    render() {

        // console.log(this.props.date)

        let officeExpenses = (this.props.units ) * 500
        let replacementReserves = (this.props.units  ) * 250

        let management = (this.props.annualGrossRent * .04)

        let taxes = (this.props.taxes )
        let utilities = (this.props.utilities )
        let waterSewer = (this.props.waterSewer )

        // let grossAnnualIncome = ((this.props.annualGrossRent + officeExpenses + replacementReserves) );
        let grossAnnualIncome = ( this.props.annualGrossRent );
        let grossAnnualOperatingExpenses = (taxes + utilities + waterSewer + management);
        let noi = (grossAnnualIncome - grossAnnualOperatingExpenses);
        let capRate = ((noi / this.props.purchasePrice) * 100)

       
        return (

                        <Container fluid>
                            <Row>

                                <Col md={6}>
                                    <Card style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                        <Card.Body>
                                    
                                                
                                                    {/* <FormControl aria-label="Address" placeholder="Address" name="address" value={this.props.address} onChange={(e)=>this.handleAddressChange(e)} style={{margin:7.5}}></FormControl> */}

                                                    <GeoCode></GeoCode>
                                                
                                                <InputGroup>
                                                    <FormControl placeholder="Purchase Price" name="purchasePrice" value={this.props.purchasePrice || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Units" name="units" value={this.props.units || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <DatePicker
                                                        onChange={this.props.dateChange}
                                                        value={this.props.date}
                                                    />
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Requested Loan Amount" name="requestLoanAmount" value={this.props.requestLoanAmount || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Annual Gross Rent" name="annualGrossRent" value={this.props.annualGrossRent || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Vacancy" name="vacancy" disabled={true} value={((this.props.annualGrossRent) * .03) || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Arm" type="number" name="arm" value={this.props.arm || undefined} onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Rate"  name="rate" value={this.props.rate || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Taxes" type="number" name="taxes" value={this.props.taxes || undefined} onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Insurance"  name="insurance" value={this.props.insurance || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Water Sewer" name="waterSewer" value={this.props.waterSewer || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Utilities" name="utilities" value={this.props.utilities || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Management" name="management" disabled={true} value={management || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Replacement Reserves" name="replacementReserves" value={this.props.replacementReserves || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                </InputGroup>
                                                <InputGroup>
                                                    <FormControl placeholder="Hard Costs" name="hardCosts" value={this.props.hardCosts || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                    <FormControl placeholder="Soft Costs" name="softCosts" value={this.props.softCosts || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
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
                                            <h5>Insurance: ${(this.props.insurance )}</h5>
                                            <h5>Gross Annual Income: ${grossAnnualIncome.toLocaleString()}</h5>
                                            <h5>Gross Annual Operating Expenses: ${ grossAnnualOperatingExpenses.toLocaleString()}</h5>
                                            <h5>NOI: ${noi.toLocaleString()}</h5>
                                            <h5>Cap Rate: { capRate ? Number((capRate).toFixed(2)) : 0  }</h5>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                
                                </Col>
                            </Row>
                        </Container>

            //     </Card.Body>
                

            // </Card>
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