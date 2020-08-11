import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container } from 'react-bootstrap';

// import DatePicker from 'react-date-picker';

import GeoCode from '../components/GeoCode'

export default class FixAndFlip extends Component {

    state={
        purchasePrice: 0,
        renovation: 0,
        carryCosts: 0,
        closingCosts: 0,
        experienceLevel: 0,
        creditScore: 0,
        arv: 0,
        turnaroundTime: 0,
        resellValue: 0,
        resellCosts: 0
    }

    handleNumberChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.valueAsNumber
        })
      }

    render() {
       
        let totalIn = this.state.purchasePrice + this.state.renovation + this.state.carryCosts + this.state.closingCosts;
        let totalProfit = this.state.arv - totalIn - this.state.resellCosts
        let profitPercent = (totalProfit / totalIn) * 100
       
        return (


            <Container fluid>
                <Row>

                    <Col md={6}>
                        <Card style={{ border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                            <Card.Body>
                        
                                <GeoCode></GeoCode>
                                
                                <InputGroup>
                                    <FormControl placeholder="Purchase Price" name="purchasePrice" value={ this.state.purchasePrice || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <FormControl placeholder="Renovation" name="renovation" value={ this.state.renovation || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                </InputGroup>
                                <InputGroup>
                                    <FormControl placeholder="Carrying Costs" name="carryCosts" value={ this.state.carryCosts || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <FormControl placeholder="Closing Costs" name="closingCosts" value={ this.state.closingCosts || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                </InputGroup>
                                <InputGroup>
                                    <FormControl placeholder="Experience Level" name="experienceLevel" value={ this.state.experienceLevel || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <FormControl placeholder="Credit Score" name="creditScore" value={ this.state.creditScore || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <FormControl placeholder="ARV" name="arv" value={ this.state.arv || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                </InputGroup>
                                <InputGroup>
                                    <FormControl placeholder="Turnaround Time" name="turnaroundTime" value={ this.state.turnaroundTime || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <FormControl placeholder="Resell Value" name="resellValue" value={ this.state.resellValue || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <FormControl placeholder="Resell Costs" name="resellCosts" value={ this.state.resellCosts || undefined} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                </InputGroup>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card style={{  border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                            <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                
                                <Card.Text>Total In: ${ totalIn.toLocaleString() }</Card.Text>
                                <Card.Text>Total Profit on Flip: ${ totalProfit.toLocaleString() }</Card.Text>
                                <Card.Text>Profit Percent: %{ profitPercent.toFixed(2) }</Card.Text>
                                    
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