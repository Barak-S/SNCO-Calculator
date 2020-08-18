import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

import { InputNumber } from "antd";
// import DatePicker from 'react-date-picker';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


// import GeoCode from '../components/GeoCode';
import LocationSearchInput from'../components/LocationSearchInput';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import SubmitButton from '../components/Submit';


export default class FixAndFlip extends Component {

    state={
        purchasePrice: 0,
        renovation: 0,
        experienceLevel: "",
        creditScore: 0,
        arv: 0,
        turnaroundTime: "",
        resellCosts: 0,
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
                            
                                    {/* <GeoCode></GeoCode> */}
                                    <LocationSearchInput 
                                        handleAddressChange={this.props.handleAddressChange} 
                                        address={this.props.address} 
                                        // handleAddressSelect={this.props.handleAddressSelect}
                                    />
                                    
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
                                            name={'purchasePrice'}
                                            formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={ value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{ width: "100%" }}
                                            value={ this.props.purchasePrice? this.props.purchasePrice.toFixed(2) : 0}
                                            onChange={e => this.handleChange(this.props.purchasePrice,e)}
                                            

                                        /> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3" >
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Renovation Costs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.handleNumberChange}
                                            value={this.state.renovation}
                                            name={"renovation"}
                                        />
                                    </InputGroup>
                                    
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
                                        <FormControl name="exitStrategy" value={ this.state.exitStrategy || undefined} type="text" disabled={true} onChange={(e)=>this.handleNumberChange(e)} ></FormControl>
                                        </InputGroup>

                                        {this.state.exitStrategy === "Fix & Flip" ? 
                                        
                                            
                                        <div>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text>ARV</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <CurrencyInput
                                                    handleChange={this.handleNumberChange}
                                                    value={this.state.arv}
                                                    name={"arv"}
                                                />
                                            </InputGroup>


                                            <Card style={{ border: '1px solid #B98757', borderRadius: 7, padding: 5, margin: 5   }}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                    <InputGroup.Text>Carrying Costs</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <CurrencyInput
                                                        handleChange={this.handleNumberChange}
                                                        value={ carryingCosts }
                                                        disabled={true}
                                                    />
                                                </InputGroup>
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
                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Insurance</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.insurance}
                                                            name={"insurance"}
                                                        />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Interest</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.interest}
                                                            name={"interest"}
                                                        />
                                                    
                                                </InputGroup>
                                            </Card>

                                            <Card style={{ border: '1px solid #B98757', borderRadius: 7, padding: 5, margin: 5  }}>
                                                <InputGroup className="mb-3">   
                                                        <InputGroup.Prepend>
                                                    <InputGroup.Text>Closing Costs</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <CurrencyInput
                                                        value={ closingCosts }  
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Points</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.points}
                                                            name={"points"}
                                                        />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Title Bill</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.titleBill}
                                                            name={"titleBill"}
                                                        />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Legal Lender</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.legalLender}
                                                            name={"legalLender"}
                                                        />
                                                </InputGroup>
                                            </Card>

                                            <Card style={{ border: '1px solid #B98757', borderRadius: 7, padding: 5, margin: 5  }}>
                                                <InputGroup className="mb-3">   
                                                        <InputGroup.Prepend>
                                                    <InputGroup.Text>Resale Costs</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <CurrencyInput
                                                        value={ resaleCosts }  
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Legal</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.legalResale}
                                                            name={"legalResale"}
                                                        />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Transfer Tax</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.transferTax}
                                                            name={"transferTax"}
                                                        />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Broker</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <CurrencyInput
                                                            handleChange={this.handleNumberChange}
                                                            value={this.state.broker}
                                                            name={"broker"}
                                                        />
                                                </InputGroup>   
                                            </Card>

                                            <InputGroup className="mb-3">
                                                    <DropdownButton
                                                        as={InputGroup.Append}
                                                        variant="outline-secondary"
                                                        onSelect= {(e)=>this.changeExperience(e)}
                                                        title="Experience Level"
                                                        id="input-group-dropdown-1"
                                                        >
                                                        <Dropdown.Item eventKey="0 properties">0 properties</Dropdown.Item>
                                                        <Dropdown.Item eventKey="3 properties">3 properties</Dropdown.Item>
                                                        <Dropdown.Item eventKey="6 properties">6 properties</Dropdown.Item>
                                                    </DropdownButton>

                                                    <FormControl name="experienceLevel" value={ this.state.experienceLevel || undefined} type="text" disabled={true} onChange={(e)=>this.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                                    <InputGroup.Prepend>
                                                <InputGroup.Text>Credit Score</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                    <FormControl name="creditScore" value={ this.state.creditScore || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} ></FormControl>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <DropdownButton
                                                    as={InputGroup.Append}
                                                    variant="outline-secondary"
                                                    onSelect= {(e)=>this.changeturnaroundTime(e)}
                                                    title="Turnaround Time"
                                                    id="input-group-dropdown-1"
                                                    >
                                                    <Dropdown.Item eventKey="3 Months">3 Months</Dropdown.Item>
                                                    <Dropdown.Item eventKey="6 Months">6 Months</Dropdown.Item>
                                                    <Dropdown.Item eventKey="12 Months">12 Months</Dropdown.Item>
                                                    <Dropdown.Item eventKey="18 Months">18 Months</Dropdown.Item>
                                                    <Dropdown.Item eventKey="24 Months">24 Months</Dropdown.Item>
                                                </DropdownButton>
                                                    <FormControl name="turnaroundTime" value={ this.state.turnaroundTime || undefined} type="text" disabled={true} onChange={(e)=>this.handleNumberChange(e)} style={{marginRight: 7}}></FormControl>
                                            </InputGroup>


                                        </div> 
                                            : 
                                        null}

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card style={{  border: '2px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                                <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                    
                                    {/* <Card.Text>Total In: { this.numberFormat(totalIn) }</Card.Text>
                                    <Card.Text>Total Profit on Flip: { this.numberFormat(totalProfit) }</Card.Text>
                                    <Card.Text>Profit Percent: %{ profitPercent ? profitPercent.toFixed(2) : 0 }</Card.Text> */}
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Total In:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            value={totalIn ? totalIn : 0}
                                            disabled={true}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Total Profit on Flip:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <CurrencyInput
                                                value={totalProfit ? totalProfit : 0}
                                                disabled={true}
                                            />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Profit Percent: %</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <PercentageInput
                                                value={profitPercent}
                                                disabled={true}
                                            />
                                    </InputGroup>
                                </Card.Body>
                            </Card>
                            {/* <SubmitButton 
                                createLoan = {this.props.createLoan}
                            /> */}
                            <Button 
                                variant="outline-dark" 
                                style={{ marginBottom: 15 }} 
                                onClick={()=>this.props.createLoan(this.props.address, this.state)}
                            >Create Loan</Button>
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