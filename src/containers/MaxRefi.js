import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container } from 'react-bootstrap';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import DatePicker from 'react-date-picker';
import GeoCode from '../components/GeoCode';
import SubmitButton from '../components/Submit'
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
 

export default class MaxRefi extends Component {
    numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);


    myFormat(num) {
        return num + '$';
    }


    render() {

        
        let officeExpenses = (this.props.units ) * 500
        let replacementReserves = (this.props.units  ) * 250
        
        let management = (this.props.annualGrossRent * .04)
        let vacancy = (this.props.annualGrossRent * .03)
        
        let taxes = (this.props.taxes )
        let utilities = (this.props.utilities )
        let waterSewer = (this.props.waterSewer )
        
        let totalProjectCost  = (this.props.purchasePrice + this.props.hardCosts + this.props.softCosts);
        
        let grossAnnualIncome = ( this.props.annualGrossRent );
        let grossAnnualOperatingExpenses = (taxes + utilities + waterSewer + management);
        let effectiveAnnualGross = grossAnnualIncome - vacancy
        let noi = (grossAnnualIncome - grossAnnualOperatingExpenses);
        let capRate = ((noi / totalProjectCost) * 100)
        
        let requestLoanAmount = this.props.requestLoanAmount? this.props.requestLoanAmount : 0;
        let ratePercent = this.props.rate? (this.props.rate / 100) : 0;
        let arm = this.props.arm ? this.props.arm : 1;
        
        let annualDebtService = ((requestLoanAmount + (requestLoanAmount * ratePercent))/ arm)
        let dscr = noi / annualDebtService
        
        return (

                <Container fluid>
                    <Row>

                        <Col md={7}>
                            <Card style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                <Card.Body>
                            
                                    <GeoCode></GeoCode>

                                    <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Units</InputGroup.Text>
                                    </InputGroup.Prepend>
                                        <FormControl name="units" value={this.props.units || undefined} type="number" onChange={(e)=>this.props.handleNumberChange("units" ,e.target.value)}></FormControl>
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
                                    <InputGroup.Text>Purchase Price</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <CurrencyInput
                                        handleChange={this.props.handleNumberChange}
                                        value={this.props.purchasePrice}
                                        name={"purchasePrice"}
                                    />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Hard Costs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.hardCosts}
                                            name={"hardCosts"}
                                        />                                        
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Soft Costs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.softCosts}
                                            name={"softCosts"}
                                        />                                    
                                        </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Payoff</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.payoff}
                                            name={"payoff"}
                                        />                                        
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Annual Gross Rent</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.annualGrossRent}
                                            name={"annualGrossRent"}
                                        />                                        
                                        </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Vacancy</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={ vacancy }
                                            name={"vacancy"}
                                            disabled={true}
                                        />                                            
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Taxes</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.taxes}
                                            name={"taxes"}
                                        />                                      
                                        </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Utilities</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.utilities}
                                            name={"utilities"}
                                        />                                        
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Insurance</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.insurance}
                                            name={"insurance"}
                                        />                                    
                                        </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Water Sewer</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.waterSewer}
                                            name={"waterSewer"}
                                        />                                          
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Management</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={ management }
                                            name={"management"}
                                            disabled={true}
                                        />                                          
                                        </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Replacement Reserves</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={ this.props.handleNumberChange }
                                            value={ replacementReserves }
                                            name={"replacementReserves"}
                                            disabled={true}
                                        />  
                                    </InputGroup>  
                                    <InputGroup className="mb-3">                                         
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Loan Amount</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.props.handleNumberChange}
                                            value={this.props.requestLoanAmount}
                                            name={"requestLoanAmount"}
                                        />                                     
                                        </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>ARM</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <FormControl type="number" name="arm" value={this.props.arm || undefined} onChange={(e)=>this.props.handleNumberChange("arm",e.target.value)} style={{marginRight: 5}}></FormControl>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Rate</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <PercentageInput
                                                handleChange={ this.props.formatRateInput }
                                                value={this.props.rate}
                                                name={"rate"}
                                            />
                                            {/* <FormControl name="rate" value={this.props.rate || undefined} type="number" onChange={(e)=>this.props.handleNumberChange("rate",e.target.value)}></FormControl> */}
                                    </InputGroup>
                    
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card style={{  border: '2px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                                <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                    
                                    {/* <Card.Text>Total project cost: {totalProjectCost? this.numberFormat(totalProjectCost) : 0}</Card.Text>
                                    <Card.Text>Taxes: { (((this.props.taxes)* .03)+ this.props.taxes).toLocaleString()}</Card.Text>
                                    <Card.Text>Office Expenses: {officeExpenses? this.numberFormat(officeExpenses) : 0}</Card.Text>
                                    <Card.Text>Replacement Reserves: {replacementReserves? this.numberFormat(replacementReserves) : 0}</Card.Text>
                                    <Card.Text>Management: {management ? this.numberFormat(management) : 0}</Card.Text>
                                    <Card.Text>Insurance: {this.props.insurance ? this.numberFormat(this.props.insurance) : 0}</Card.Text> */}
                                    {/* <Card.Text>Gross Annual Income: {grossAnnualIncome? this.numberFormat(grossAnnualIncome) : 0}</Card.Text> */}
                                    {/* <Card.Text>Gross Annual Operating Expenses: { grossAnnualOperatingExpenses? this.numberFormat(grossAnnualOperatingExpenses) : 0}</Card.Text> */}
                                    {/* <Card.Text>Effective Annual Gross: { effectiveAnnualGross? this.numberFormat(effectiveAnnualGross) : 0}</Card.Text> */}
                                    {/* <Card.Text>NOI: {noi? this.numberFormat(noi) : 0}</Card.Text> */}
                                    {/* <Card.Text>Cap Rate: { capRate ? Number((capRate).toFixed(2)) : 0  }%</Card.Text> */}
                                    {/* <Card.Text>Annual Debt Service: { annualDebtService ? annualDebtService.toFixed(2) : 0  }</Card.Text> */}
                                    
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Gross Annual Income: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={ grossAnnualIncome? grossAnnualIncome : 0}
                                            disabled={true}
                                        />
                                        {/* <FormControl value={ grossAnnualIncome? (grossAnnualIncome) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>NOI:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={ noi? noi: 0}
                                            disabled={true}
                                        />
                                        {/* <FormControl value={ noi? (noi) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Cap Rate:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <PercentageInput
                                                value={capRate}
                                                disabled={true}
                                            />
                                            {/* <FormControl value={ capRate ? Number((capRate).toFixed(2)) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Annual Debt Service:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={ annualDebtService? annualDebtService : 0}
                                            disabled={true}
                                        />
                                        {/* <FormControl value={ annualDebtService ? annualDebtService.toFixed(2) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Debt Service Coverage Ratio (DSCR):</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <PercentageInput
                                            value={dscr}
                                            disabled={true}
                                        />
                                        {/* <FormControl name="dscr" value={dscr.toFixed(1) || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                </Card.Body>
                            </Card>
                            <SubmitButton createLoan = {this.props.createLoan}/>
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