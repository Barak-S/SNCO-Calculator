import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Button, Form, Alert, Table } from 'react-bootstrap';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { InputNumber } from "antd";

import { Link } from 'react-router-dom';

import DatePicker from 'react-date-picker';
// import GeoCode from '../components/GeoCode';
import Input from '../components/InputComponent';
import LocationSearchInput from'../components/LocationSearchInput';

import Notification from '../components/Notification'

export default class MaxRefi extends Component {

    constructor(props){
        super(props)
        this.state = {
        purchasePrice: 0,
        requestLoanAmount: 0,
        annualGrossRent: 0,
        units: 0,
        taxes: 0,
        insurance: 0,
        waterSewer: 0,
        utilities: 0,
        hardCosts: 0,
        softCosts: 0,
        rate: 0,
        arm: 0,
        payoff: 0,
        marketCapRate: 0,
        // alert: false,
        officeExpenses: 0,
        replacementReserves: 0,
        management: 0,
        vacancy: 0,
        totalProjectCost: 0,
        noi: 0,
        capRate: 0,
        annualDebtService: 0,
        dscr: 0,
        }
        this.baseState = this.state 
    }

    resetForm = () => {
        this.setState(this.baseState)
        this.props.clearAddressFromState()
    }

    handleNumberChange= (key, e) =>{
        this.setState({
          [key]: parseInt(e)
        })
    }

    handleRateChange=(key, e)=>{
        this.setState({ [key]: e})
    }

    // myFormat(num) {
    //     return num + '$';
    // }

    createLoan=(address,properyType, date, officeExpenses,replacementReserves,management,vacancy,totalProjectCost,noi,capRate,annualDebtService,dscr)=>{
        this.setState({
            officeExpenses: officeExpenses,
            replacementReserves: replacementReserves,
            management: management,
            vacancy: vacancy,
            totalProjectCost: totalProjectCost,
            noi: noi,
            capRate: capRate,
            annualDebtService: annualDebtService,
            dscr: dscr
        },()=>{
            if (address !== ""){
                fetch('https://snco-calculator-backend.herokuapp.com/loans',{
                    method: "POST",
                    headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({address: address,
                    purchaseDate: date,
                    properyType: properyType, 
                    loan: this.state,
                    })
                })
                .then(res=>res.json())
                .then(loan=>{
                    console.log(loan[0]._id)
                    this.resetForm()
                    //   this.alertMessage()
                    })
                .catch(() => console.log("Can’t POST loan data"))
            } else {
              console.log("wont post without an address")
            }

        })
    }

    alertMessage=()=>{
        this.setState({ alert: true})
        setTimeout(() => {
            this.setState({ alert: false })
        }, 4000)
    }

    numberFormat = (value) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
    }).format(value);


    render() {
        
        let officeExpenses = (this.state.units ) * 500
        let replacementReserves = (this.state.units  ) * 250
        
        let management = (this.state.annualGrossRent * .04)
        let vacancy = (this.state.annualGrossRent * .03)
        
        let taxes = (this.state.taxes )
        let utilities = (this.state.utilities )
        let waterSewer = (this.state.waterSewer )
        
        let totalProjectCost  = (this.state.purchasePrice + this.state.hardCosts + this.state.softCosts);
        
        let grossAnnualIncome = ( this.state.annualGrossRent );
        let grossAnnualOperatingExpenses = (taxes + utilities + waterSewer + management);
        let effectiveAnnualGross = grossAnnualIncome - vacancy
        let noi = (grossAnnualIncome - grossAnnualOperatingExpenses);
        let capRate = ((noi / totalProjectCost) * 100)
        
        let requestLoanAmount = this.state.requestLoanAmount? this.state.requestLoanAmount : 0;
        let ratePercent = this.state.rate? (this.state.rate / 100) : 0;
        let arm = this.state.arm ? this.state.arm : 1;
        
        let annualDebtService = ((requestLoanAmount + (requestLoanAmount * ratePercent))/ arm)
        let dscr = annualDebtService === 0 ? 0 : noi / annualDebtService
        
        return (

                <Container fluid>
                    {/* {this.state.alert && <Alert variant={"success"} style={{ margin: "1rem" }}>Loan Saved! Click here to see loan deatails.</Alert>} */}
                    <Row>
                        <Col md={7}>
                            <Card style={{ margin: "1rem", borderRadius: 15  }}>
                                <Card.Body>
                                <Form>
                                    <LocationSearchInput 
                                        handleAddressChange={this.props.handleAddressChange} 
                                        handleAddressSelect = {this.props.handleAddressSelect}
                                        address={this.props.address} 
                                    />
                                <Form.Row>
                                    <Col>
                                    <InputGroup className="mb-3">
                                        <Form.Label>Units</Form.Label>
                                        <Input name="units" value={this.state.units} type="number" handleChange={this.handleNumberChange}/>
                                    </InputGroup>
                                    </Col>
                                    <Col>
                                    <InputGroup className="mb-3">
                                    <Form.Label style={{width: "100%", textAlign: "left"}}>Purchase Date</Form.Label>
                                        <DatePicker
                                            onChange={this.props.dateChange}
                                            value={this.props.date}
                                        />
                                    </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                    <InputGroup className="mb-3">
                                        <Form.Label>Puchase Price</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.purchasePrice}
                                            name={"purchasePrice"}
                                            input="currency"
                                        />
                                    </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Hard Costs</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.hardCosts}
                                                name={"hardCosts"}
                                                input="currency"
                                            /> 
                                        </InputGroup>
                                    </Col>
                                    <Col>   
                                        <InputGroup className="mb-3">                                    
                                            <Form.Label>Soft Costs</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.softCosts}
                                                name={"softCosts"}
                                                input="currency"
                                            />                                    
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Payoff</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.payoff}
                                                name={"payoff"}
                                                input="currency"
                                            /> 
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                     
                                            <Form.Label>Annual Gross Rent</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.annualGrossRent}
                                                name={"annualGrossRent"}
                                                input="currency"
                                            />                                        
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                        <Form.Label>Vacancy</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={ vacancy }
                                                name={"vacancy"}
                                                disabled={true}
                                                input="currency"
                                            /> 
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                                    
                                        <Form.Label>Taxes</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.taxes}
                                                name={"taxes"}
                                                input="currency"
                                            />                                      
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Utilities</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.utilities}
                                                name={"utilities"}
                                                input="currency"
                                            /> 
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                                
                                            <Form.Label>Insurance</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.insurance}
                                                name={"insurance"}
                                                input="currency"
                                            />                                    
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Water Sewer</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.waterSewer}
                                                name={"waterSewer"}
                                                input="currency"
                                            />     
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                          
                                            <Form.Label>Management</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={ management }
                                                name={"management"}
                                                disabled={true}
                                                input="currency"
                                            />                                          
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Replacement Reserves</Form.Label>
                                            <Input
                                                handleChange={ this.handleNumberChange }
                                                value={ replacementReserves }
                                                name={"replacementReserves"}
                                                disabled={true}
                                                input="currency"
                                            />  
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3" >                                         
                                            <Form.Label>Loan Amount</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.requestLoanAmount}
                                                name={"requestLoanAmount"}
                                                input="currency"
                                            />                                     
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label>ARM</Form.Label>
                                            <Input type="number" name="arm" value={ this.state.arm } handleChange={this.handleNumberChange}/>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Label style={{width: "100%", textAlign: "left"}}>Rate</Form.Label>
                                                <Input
                                                    name={"rate"}
                                                    value={this.state.rate}
                                                    handleRateChange = {this.handleRateChange}
                                                    input={"rate"}
                                                />
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col xs lg="6">
                                        <InputGroup className="mb-3">
                                            <Form.Label style={{width: "100%", textAlign: "left"}}>Market Cap Rate</Form.Label>
                                                <Input
                                                    name={"marketCapRate"}
                                                    value={this.state.marketCapRate}
                                                    handleRateChange = {this.handleRateChange}
                                                    input={"rate"}
                                                />
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card style={{ margin: "1rem", borderRadius: 15 }}>
                                <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td style={{fontSize: 16}}><strong>Gross Annual Income:</strong></td><td style={{fontSize: 15}}>{ grossAnnualIncome? this.numberFormat(grossAnnualIncome.toFixed(2)) : 0 }</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: 16}}><strong>NOI:</strong></td><td style={{fontSize: 15}}>{ noi? this.numberFormat(noi.toFixed(2)) : 0}</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: 16}}><strong>Annual Debt Service:</strong></td><td style={{fontSize: 15}}>{ annualDebtService? this.numberFormat(annualDebtService.toFixed(2)) : 0}</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: 16}}><strong>Debt Service Coverage Ratio (DSCR):</strong></td><td style={{fontSize: 15}}>{dscr? dscr.toFixed(2) : 0}%</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: 16}}><strong>SNCO Max Loan:</strong></td><td style={{fontSize: 15}}>{0}</td>
                                            </tr>
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <Button 
                                variant="outline-dark" 
                                style={{ marginBottom: 15 }} 
                                onClick={()=>this.createLoan( this.props.address, this.props.propertyType, this.props.date, officeExpenses,replacementReserves,management,vacancy,totalProjectCost,noi,capRate,annualDebtService,dscr )}
                            >Save</Button>                        
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