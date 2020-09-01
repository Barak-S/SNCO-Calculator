import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

import { InputNumber } from "antd";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// import GeoCode from '../components/GeoCode';
import LocationSearchInput from'../components/LocationSearchInput';
import Input from '../components/InputComponent';
export default class FixAndFlip extends Component {

    constructor(props){
        super(props)
        this.state = {
        purchasePrice: 0,
        renovation: 0,
        experienceLevel: "",
        creditScore: 0,
        arv: 0,
        turnaroundTime: "",
        exitStrategy : "",
        interest: 0,
        taxes: 0,
        insurance: 0,
        legalResale: 0,
        transferTax: 0,
        broker: 0,
        points: 0,
        titleBill: 0,
        legalClosing: 0,
        legalLender:0,
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

    createLoan=(address,properyType, loan, carryingCosts, resaleCosts, closingCosts, totalIn, totalProfit, profitPercent)=>{
        if (address !== ""){
          fetch('https://snco-calculator-backend.herokuapp.com/loans',{
            method: "POST",
            headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({address: address, properyType: properyType, loan, carryingCosts, resaleCosts, closingCosts, totalIn, totalProfit, profitPercent })
          })
          .then(res=>res.json())
          .then(loans=>this.resetForm())
          .catch(() => console.log("Can’t POST loan data"))
    
        } else {
          console.log("wont post without an address")
        }
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

        return (


                <Container fluid>
                    <Row>

                        <Col md={7}>
                            <Card style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                <Card.Body>
                                <Form>
                                    <LocationSearchInput 
                                        handleAddressChange={this.props.handleAddressChange} 
                                        address={this.props.address} 
                                        // handleAddressSelect={this.props.handleAddressSelect}
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
                                        {this.state.exitStrategy === "Fix & Flip" ? 
                                        
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


                                <Card style={{ border: '1px solid #B98757', borderRadius: 7, padding: 7.5, marginBottom: 10 }}>
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

                                    <Card style={{ border: '1px solid #B98757', borderRadius: 7, padding: 7.5, marginBottom: 10 }}>
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

                                    <Card style={{ border: '1px solid #B98757', borderRadius: 7, padding: 7.5, marginBottom: 10 }}>
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
                                            : 
                                        null}
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
                                            <InputGroup.Text style={{fontWeight: "600"}}>Total In:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Input
                                                value={totalIn ? totalIn : 0}
                                                disabled={true}
                                                input="currency"
                                            />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text style={{fontWeight: "600"}}>Total Profit on Flip:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <Input
                                                    value={totalProfit ? totalProfit : 0}
                                                    disabled={true}
                                                    input="currency"
                                                />
                                        </InputGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text style={{fontWeight: "600"}}>Profit Percent: %</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <Input
                                                    value={profitPercent? profitPercent.toFixed(2) : 0}
                                                    disabled={true}
                                                    input="percent"
                                                />
                                        </InputGroup>
                                    </Form.Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Button 
                                variant="outline-dark" 
                                style={{ marginBottom: 15 }} 
                                onClick={()=>this.createLoan(this.props.address,this.props.propertyType,this.state, carryingCosts, resaleCosts, closingCosts, totalIn, totalProfit, profitPercent )}
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