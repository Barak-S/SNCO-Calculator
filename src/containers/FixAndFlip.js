import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap';

// import DatePicker from 'react-date-picker';

import GeoCode from '../components/GeoCode'
import CurrencyInput from '../components/CurrencyInput'
import PercentageInput from '../components/PercentageInput'


export default class FixAndFlip extends Component {

    state={
        purchasePrice: 0,
        renovation: 0,
        carryCosts: 0,
        closingCosts: 0,
        experienceLevel: "",
        creditScore: 0,
        arv: 0,
        turnaroundTime: "",
        resellCosts: 0,
        exitStrategy : ""
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
       
        let totalIn = this.state.purchasePrice + this.state.renovation + this.state.carryCosts + this.state.closingCosts;
        let totalProfit = this.state.arv - totalIn - this.state.resellCosts
        let profitPercent = (totalProfit / totalIn) * 100
       
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
                                        <CurrencyInput
                                            handleChange={this.handleNumberChange}
                                            value={this.state.purchasePrice}
                                            name={"purchasePrice"}
                                        />
                                        {/* <FormControl name="purchasePrice" value={ this.state.purchasePrice || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{marginRight: 7}}></FormControl> */}
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
                                            {/* <FormControl name="renovation" value={ this.state.renovation || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    { this.state.exitStrategy === "Fix & Flip" && <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>ARV</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <CurrencyInput
                                            handleChange={this.handleNumberChange}
                                            value={this.state.arv}
                                            name={"arv"}
                                        />
                                        {/* <FormControl name="arv" value={ this.state.arv || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>}
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
                                                <InputGroup.Text>Carrying Costs</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <CurrencyInput
                                                    handleChange={this.handleNumberChange}
                                                    value={this.state.carryCosts}
                                                    name={"carryCosts"}
                                                />
                                                {/* <FormControl name="carryCosts" value={ this.state.carryCosts || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{marginRight: 7}}></FormControl> */}
                                            </InputGroup>
                                            <InputGroup className="mb-3">   
                                                    <InputGroup.Prepend>
                                                <InputGroup.Text>Closing Costs</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <CurrencyInput
                                                    handleChange={this.handleNumberChange}
                                                    value={this.state.closingCosts}
                                                    name={"closingCosts"}
                                                />
                                                {/* <FormControl name="closingCosts" value={ this.state.closingCosts || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)}></FormControl> */}
                                            </InputGroup>
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
                                            <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                <InputGroup.Text>Resell Costs</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <CurrencyInput
                                                    handleChange={this.handleNumberChange}
                                                    value={this.state.resellCosts}
                                                    name={"resellCosts"}
                                                />
                                                {/* <FormControl name="resellCosts" value={ this.state.resellCosts || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)}></FormControl> */}
                                            </InputGroup>
                                        </div> 
                                            : 
                                        null}

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card style={{  border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15 }}>
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
                                        {/* <FormControl value={ totalIn? (totalIn) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Total Profit on Flip:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <CurrencyInput
                                                value={totalProfit ? totalProfit : 0}
                                                disabled={true}
                                            />
                                            {/* <FormControl value={ totalProfit? (totalProfit) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text style={{fontWeight: "600"}}>Profit Percent: %</InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <PercentageInput
                                                value={profitPercent}
                                                disabled={true}
                                            />
                                            {/* <FormControl value={ profitPercent? profitPercent.toFixed(2) : 0 || undefined} type="number" disabled={true} onChange={(e)=>this.props.handleNumberChange(e)}></FormControl> */}
                                    </InputGroup>
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