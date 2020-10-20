import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button, Alert, Table } from 'react-bootstrap';

import LocationSearchInput from'../components/LocationSearchInput';
import Input from '../components/InputComponent';
export default class FixAndFlip extends Component {

    constructor(props){
        super(props)
        this.state = {
        purchasePrice: 0,
        renovation: 0,
        taxes: 0,

        //fix and flip
        experienceLevel: "",
        creditScore: 0,
        arv: 0,
        turnaroundTime: "",
        exitStrategy : "",
        interest: 0,
        insurance: 0,
        legalResale: 0,
        transferTax: 0,
        broker: 0,
        points: 0,
        titleBill: 0,
        legalClosing: 0,
        legalLender:0,
        alert: false,

        // fix and refi
        requestLoanAmount: 0,
        annualGrossRent: 0,
        insurance: 0,
        waterSewer: 0,
        utilities: 0,
        hardCosts: 0,
        softCosts: 0,
        rate: 0,
        arm: 0,
        payoff: 0,
        marketCapRate: 0,

        // calculations
        carryingCosts: 0,
        resaleCosts: 0,
        closingCosts: 0,
        totalIn: 0,
        totalProfit: 0,
        profitPercent: 0,
        }
        this.baseState = this.state 
    }

    resetForm = () => {
        this.setState(this.baseState)
        this.props.clearAddressFromState()
    }

    handleNumberChange=(key, e)=>{
        // console.log(key, e)
        this.setState({
          [key]: parseInt(e)
        })
    }

    handleRateChange=(key, e)=>{
        this.setState({ [key]: e})
    }
    // handle percent ^^

    changeExitStrategy=(e)=>{
        this.setState({
            exitStrategy: e
        })
    }

    changeExperience=(e)=>{
        this.setState({
            experienceLevel: e
        })
    }

    changeturnaroundTime=(e)=>{
        this.setState({
            turnaroundTime: e
        })
    }

    createLoan=(address, propertyType, carryingCosts, resaleCosts, closingCosts, totalIn, totalProfit, profitPercent)=>{
        this.setState({
            carryingCosts: carryingCosts,
            resaleCosts: resaleCosts,
            closingCosts: closingCosts,
            totalIn: totalIn,
            totalProfit: totalIn,
            profitPercent: profitPercent.toFixed(2)
        },()=>{
            if (address !== ""){
                fetch('https://snco-calculator-backend.herokuapp.com/loans',{
                    method: "POST",
                    headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({address: address, propertyType: propertyType, loan: this.state })
                })
                .then(res=>res.json())
                .then(loan=>{
                        console.log(loan[0]._id)
                        this.resetForm()
                        this.props.alertMessage()
                    })
                .catch(() => console.log("Can’t POST loan data"))
            
                } else {
                console.log("wont post without an address")
                }

        })
    }

    numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

    render() {
       
        let carryingCosts = this.state.interest + this.state.taxes + this.state.insurance
        let resaleCosts = this.state.legalResale + this.state.transferTax + this.state.broker
        let closingCosts = this.state.points + this.state.titleBill + this.state.legalClosing + this.state.legalLender
        
        let totalIn = this.state.purchasePrice + this.state.renovation + carryingCosts + closingCosts;
        let totalProfit = this.state.arv - totalIn - resaleCosts
        let profitPercent = (totalProfit / totalIn) * 100


        let officeExpenses = (this.state.units ) * 500
        let replacementReserves = (this.state.units ) * 250
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

        let sncoMaxLoan = this.state.marketCapRate / noi;

        return (

                <Container fluid>
                    {this.props.alert && <Alert variant={"success"} style={{ margin: "1rem" }}> <Alert.Heading>Loan Saved!</Alert.Heading>Click here to see loan deatails.</Alert>}             
                    <Row>
                        <Col md={7}>
                            <Card style={{ margin: "1rem", borderRadius: 10 }}>
                                <Card.Body>
                                <Form>
                                    <LocationSearchInput 
                                        handleAddressChange={this.props.handleAddressChange} 
                                        handleAddressSelect = {this.props.handleAddressSelect}
                                        address={this.props.address} 
                                    />
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <Form.Label>Purchase Price</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.purchasePrice}
                                            name={"purchasePrice"}
                                            input="currency"

                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3" >
                                        <Form.Label>Renovation Costs</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.renovation}
                                            name={"renovation"}
                                            input="currency"
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <DropdownButton
                                            as={InputGroup.Append}
                                            variant="outline-secondary"
                                            onSelect= {(e)=>this.changeExitStrategy(e)}
                                            title="Exit Strategy"
                                            id="input-group-dropdown-1"
                                            >
                                            <Dropdown.Item eventKey="Fix & Flip">Fix & Flip</Dropdown.Item>
                                            <Dropdown.Item eventKey="Fix & Refinance">Fix & Refinance</Dropdown.Item>
                                        </DropdownButton>
                                        <FormControl name="exitStrategy" value={ this.state.exitStrategy || undefined} type="text" disabled={true} ></FormControl>
                                    </InputGroup>
                                </Form.Row>
                                
                                {this.state.exitStrategy === "Fix & Flip" && 
                                        
                                <div>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <Form.Label>ARV</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.arv}
                                            name={"arv"}
                                            input="currency"
                                        />
                                    </InputGroup>
                                </Form.Row>


                                <Card style={{ borderRadius: 7, padding: 10, marginBottom: 10 }}>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Carrying Costs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={ carryingCosts }
                                            disabled={true}
                                            input="currency"
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <Form.Label>Taxes</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.taxes}
                                            name={"taxes"}
                                            input="currency"
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3" >
                                        <Form.Label>Insurance</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.insurance}
                                            name={"insurance"}
                                            input="currency"
                                        />
                                    </InputGroup>
                                </Form.Row>
                                <Form.Row>
                                    <InputGroup className="mb-3">
                                        <Form.Label>Interest</Form.Label>
                                        <Input
                                            handleChange={this.handleNumberChange}
                                            value={this.state.interest}
                                            name={"interest"}
                                            input="currency"
                                        />
                                        
                                    </InputGroup>
                                </Form.Row>
                                </Card>

                                    <Card style={{ borderRadius: 7, padding: 10, marginBottom: 10 }}>
                                    <Form.Row>
                                        <InputGroup className="mb-3">   
                                                <InputGroup.Prepend>
                                            <InputGroup.Text>Closing Costs</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Input
                                                value={ closingCosts }  
                                                disabled={true}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Points</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.points}
                                                name={"points"}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Title Bill</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.titleBill}
                                                name={"titleBill"}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Legal Lender</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.legalLender}
                                                name={"legalLender"}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Legal Closing</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.legalClosing}
                                                name={"legalClosing"}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    </Card>

                                    <Card style={{ borderRadius: 7, padding: 10, marginBottom: 10 }}>
                                    <Form.Row>
                                        <InputGroup className="mb-3">   
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Resale Costs</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Input
                                                value={ resaleCosts }  
                                                disabled={true}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>   
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Legal</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.legalResale}
                                                name={"legalResale"}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Transfer Tax</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.transferTax}
                                                name={"transferTax"}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <Form.Label>Broker</Form.Label>
                                            <Input
                                                handleChange={this.handleNumberChange}
                                                value={this.state.broker}
                                                name={"broker"}
                                                input="currency"
                                            />
                                        </InputGroup>  
                                    </Form.Row> 
                                    </Card>
                                    <Form.Row>
                                        <Col xs={12} md={6}>
                                            <InputGroup className="mb-3">
                                                <Input input="experienceLevel" value={this.state.experienceLevel} changeExperience={this.changeExperience}/>
                                            </InputGroup>
                                        </Col>  
                                        <Col xs={12} md={6}>
                                            <InputGroup className="mb-3">
                                                <Input input="turnaroundTime" value={this.state.turnaroundTime} changeturnaroundTime={this.changeturnaroundTime}/>
                                            </InputGroup>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col xs lg="6">
                                            <InputGroup className="mb-3">
                                                <Form.Label>Credit Score</Form.Label>
                                                <Input name="creditScore" value={ this.state.creditScore || undefined} type="number" handleChange={this.handleNumberChange} />
                                            </InputGroup>
                                        </Col>
                                    </Form.Row>

                                </div> 

                                } 
                                {this.state.exitStrategy === "Fix & Refinance" &&

                                <div>
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
                                                value={ "vacancy" }
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
                                                value={ "management" }
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
                                                value={ "replacementReserves" }
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
                                </div>
                                }
                                </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card style={{ margin: "1rem", borderRadius: 10 }}>
                                <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                    <Table responsive>
                                            {this.state.exitStrategy === "" || this.state.exitStrategy === "Fix & Flip" ?
                                            <tbody>
                                                <tr>
                                                    <td style={{fontSize: 16}}><strong>Total In:</strong></td><td>{ totalIn? this.numberFormat(totalIn.toFixed(2)) : 0 }</td>
                                                </tr>
                                                <tr>
                                                    <td style={{fontSize: 16}}><strong>Total Profit on Flip:</strong></td><td>{ totalProfit? this.numberFormat(totalProfit.toFixed(2)) : 0}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{fontSize: 16}}><strong>Profit Percent:</strong></td><td>{ profitPercent > 0 && profitPercent ? profitPercent.toFixed(2) : 0 }%</td>
                                                </tr>
                                            </tbody>
                                            :
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
                                            </tbody>                                      
                                            }
                                    </Table>
                                </Card.Body>
                            </Card>
                            <Button 
                                variant="primary" 
                                style={{ marginBottom: 15 }} 
                                onClick={()=>this.createLoan(this.props.address,this.props.propertyType, carryingCosts, resaleCosts, closingCosts, totalIn, totalProfit, profitPercent )}
                            >Save</Button>
                        </Col>
                    </Row>
                </Container>

        )
    }
}
