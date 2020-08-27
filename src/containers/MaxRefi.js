import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Button, Form } from 'react-bootstrap';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { InputNumber } from "antd";

import DatePicker from 'react-date-picker';
// import GeoCode from '../components/GeoCode';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import LocationSearchInput from'../components/LocationSearchInput';


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

    handleRateChange=(rate, e)=>{
        this.setState({ rate: e})
    }
    
    // numberFormat = (value) =>
    // new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD'
    // }).format(value);


    myFormat(num) {
        return num + '$';
    }

    createLoan=(address,properyType, date, loan,officeExpenses,replacementReserves,management,vacancy,totalProjectCost,noi,capRate,annualDebtService,dscr)=>{
        if (address !== ""){
          fetch('https://snco-calculator-backend.herokuapp.com/loans',{
            method: "POST",
            headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({address: address,
                purchaseDate: date,
                properyType: properyType, 
                loan,
                officeExpenses,replacementReserves,management,vacancy,totalProjectCost,noi,capRate,annualDebtService,dscr
            })
          })
          .then(res=>res.json())
          .then(loans=>this.resetForm())
          .catch(() => console.log("Can’t POST loan data"))
    
        } else {
          console.log("wont post without an address")
        }
    }


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
        let dscr = noi / annualDebtService
        
        return (

                <Container fluid>
                    <Row>

                        <Col md={7}>
                            <Card style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                <Card.Body>
                                <Form>
                                
                                    {/* <GeoCode handleAddressChange={this.props.handleAddressChange}></GeoCode> */}
                                    <LocationSearchInput 
                                        handleAddressChange={this.props.handleAddressChange} 
                                        address={this.props.address} 
                                        // handleAddressSelect={this.props.handleAddressSelect}
                                    />
                                <Form.Row>
                                    <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Units</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <FormControl name="units" value={this.state.units || undefined} type="number" onChange={(e)=>this.handleNumberChange("units" ,e.target.value)}></FormControl>
                                    </InputGroup>
                                    </Col>
                                    <Col>
                                    <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                        <InputGroup.Text>Purchase Date</InputGroup.Text>
                                        </InputGroup.Prepend>
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
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Purchase Price</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.handleNumberChange}
                                            value={this.state.purchasePrice}
                                            name={"purchasePrice"}
                                        />
                                        {/* <InputNumber
                                            name={"purchasePrice"}
                                            formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={ value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{ fontSize: 17, display: "table-cell"  }}
                                            value={ this.state.purchasePrice? this.state.purchasePrice.toFixed(2) : 0}
                                            onChange={e => this.handleNumberChange(this.props.name,e)}
                                            

                                        /> */}
                                    </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Hard Costs</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.hardCosts}
                                                name={"hardCosts"}
                                            /> 
                                        </InputGroup>
                                    </Col>
                                    <Col>   
                                        <InputGroup className="mb-3">                                    
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Soft Costs</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.softCosts}
                                                name={"softCosts"}
                                            />                                    
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Payoff</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.payoff}
                                                name={"payoff"}
                                            /> 
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                     
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Annual Gross Rent</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.annualGrossRent}
                                                name={"annualGrossRent"}
                                            />                                        
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Vacancy</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={ vacancy }
                                                name={"vacancy"}
                                                disabled={true}
                                            /> 
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                                    
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Taxes</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.taxes}
                                                name={"taxes"}
                                            />                                      
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Utilities</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.utilities}
                                                name={"utilities"}
                                            /> 
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                                
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Insurance</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.insurance}
                                                name={"insurance"}
                                            />                                    
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Water Sewer</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.waterSewer}
                                                name={"waterSewer"}
                                            />     
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3">                                          
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Management</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={ management }
                                                name={"management"}
                                                disabled={true}
                                            />                                          
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Replacement Reserves</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={ this.handleNumberChange }
                                                value={ replacementReserves }
                                                name={"replacementReserves"}
                                                disabled={true}
                                            />  
                                        </InputGroup> 
                                    </Col> 
                                    <Col>
                                        <InputGroup className="mb-3" >                                         
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Loan Amount</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <CurrencyInput
                                                handleChange={this.handleNumberChange}
                                                value={this.state.requestLoanAmount}
                                                name={"requestLoanAmount"}
                                            />                                     
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>ARM</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl type="number" name="arm" value={this.state.arm || undefined} onChange={(e)=>this.handleNumberChange("arm",e.target.value)} style={{marginRight: 5}}></FormControl>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Rate</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                {/* <PercentageInput
                                                    handleChange={ this.handleNumberChange }
                                                    value={this.state.rate}
                                                    name={"rate"}
                                                /> */}
                                                <InputNumber
                                                    name={"rate"}
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')}
                                                    style={{ fontSize: 17, paddingTop: 3 }}
                                                    value={this.state.rate? this.state.rate : 0} 
                                                    min={0}
                                                    max={100}
                                                    onChange={e => this.handleRateChange("rate", e)}
                                                />
                                        </InputGroup>
                                    </Col>
                                </Form.Row>
                                </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card style={{  border: '2px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                                <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                <Form>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Gross Annual Income: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={ grossAnnualIncome? grossAnnualIncome : 0}
                                            disabled={true}
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>NOI:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={ noi? noi: 0}
                                            disabled={true}
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Cap Rate:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <PercentageInput
                                                value={capRate}
                                                disabled={true}
                                            />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Annual Debt Service:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={ annualDebtService? annualDebtService : 0}
                                            disabled={true}
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Debt Service Coverage Ratio (DSCR):</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <PercentageInput
                                            value={dscr}
                                            disabled={true}
                                        />
                                    </InputGroup>
                                </Form.Row>
                                </Form>
                                </Card.Body>
                            </Card>
                            <Button 
                                variant="outline-dark" 
                                style={{ marginBottom: 15 }} 
                                onClick={()=>this.createLoan(this.props.address, this.props.propertyType, this.props.date, this.state, officeExpenses,replacementReserves,management,vacancy,totalProjectCost,noi,capRate,annualDebtService,dscr)}
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