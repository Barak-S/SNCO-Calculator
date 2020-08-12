import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container } from 'react-bootstrap';

import DatePicker from 'react-date-picker';

import GeoCode from '../components/GeoCode'

export default class MaxRefi extends Component {

    render() {

        // console.log(this.props.date)

        let officeExpenses = (this.props.units ) * 500
        let replacementReserves = (this.props.units  ) * 250

        let management = (this.props.annualGrossRent * .04)

        let taxes = (this.props.taxes )
        let utilities = (this.props.utilities )
        let waterSewer = (this.props.waterSewer )

        let grossAnnualIncome = ( this.props.annualGrossRent );
        let grossAnnualOperatingExpenses = (taxes + utilities + waterSewer + management);
        let noi = (grossAnnualIncome - grossAnnualOperatingExpenses);
        let capRate = ((noi / this.props.purchasePrice) * 100)

       
        return (

                        <Container fluid>
                            <Row>

                                <Col md={7}>
                                    <Card style={{ border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                        <Card.Body>
                                    
                                                <GeoCode></GeoCode>
                                            
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Purchase Price</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="purchasePrice" value={this.props.purchasePrice || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Purchase Date</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <DatePicker
                                                    onChange={this.props.dateChange}
                                                    value={this.props.date}
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Units</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="units" value={this.props.units || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Annual Gross Rent</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="annualGrossRent" value={this.props.annualGrossRent || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Request Loan Amount</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="requestLoanAmount" value={this.props.requestLoanAmount || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Taxes</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl type="number" name="taxes" value={this.props.taxes || undefined} onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Replacement Reserves</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="replacementReserves" value={this.props.replacementReserves || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Insurance</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="insurance" value={this.props.insurance || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Water Sewer</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="waterSewer" value={this.props.waterSewer || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Utilities</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="utilities" value={this.props.utilities || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Management</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="management" disabled={true} value={management || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Vacancy</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="vacancy" disabled={true} value={((this.props.annualGrossRent) * .03) || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>

                                            
                                            
                                            
                                            
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>ARM</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl type="number" name="arm" value={this.props.arm || undefined} onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Rate</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="rate" value={this.props.rate || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Hard Costs</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="hardCosts" value={this.props.hardCosts || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Soft Costs</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl name="softCosts" value={this.props.softCosts || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>

                            
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={5}>
                                    <Card style={{  border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                                        <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                            
                                            <Card.Text>{`Total project cost: $${(((this.props.purchasePrice) + (this.props.hardCosts) + (this.props.softCosts))* 1).toLocaleString()}`}</Card.Text>
                                            <Card.Text>Taxes: ${ (((this.props.taxes)* .03)+ this.props.taxes).toLocaleString()}</Card.Text>
                                            <Card.Text>Office Expenses: ${officeExpenses? officeExpenses.toLocaleString() : 0}</Card.Text>
                                            <Card.Text>Replacement Reserves: ${replacementReserves? replacementReserves.toLocaleString() : 0}</Card.Text>
                                            <Card.Text>Management: ${management ? management.toLocaleString() : 0}</Card.Text>
                                            <Card.Text>Insurance: ${this.props.insurance ? (this.props.insurance ).toLocaleString() : 0}</Card.Text>
                                            <Card.Text>Gross Annual Income: ${grossAnnualIncome? grossAnnualIncome.toLocaleString() : 0}</Card.Text>
                                            <Card.Text>Gross Annual Operating Expenses: ${ grossAnnualOperatingExpenses? grossAnnualOperatingExpenses.toLocaleString() : 0}</Card.Text>
                                            <Card.Text>NOI: ${noi? noi.toLocaleString() : 0}</Card.Text>
                                            <Card.Text>Cap Rate: { capRate ? Number((capRate).toFixed(2)) : 0  }</Card.Text>
                                            
                                        </Card.Body>
                                    </Card>
                                
                                </Col>
                            </Row>
                        </Container>
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