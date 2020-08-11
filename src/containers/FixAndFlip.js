import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container } from 'react-bootstrap';

// import DatePicker from 'react-date-picker';

import GeoCode from '../components/GeoCode'

export default class FixAndFlip extends Component {

    render() {
       
       
        return (

                        <Container fluid>
                            <Row>

                                <Col md={6}>
                                    <Card style={{ border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15  }}>
                                        <Card.Body>
                                    
                                            <GeoCode></GeoCode>
                                            
                                            <InputGroup>
                                                <FormControl placeholder="Purchase Price" name="purchasePrice" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                <FormControl placeholder="Renovation" name="renovation" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                            </InputGroup>
                                            <InputGroup>
                                                <FormControl placeholder="Carrying Costs" name="carryingCosts" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                <FormControl placeholder="Closing Costs" name="closingCosts" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                            </InputGroup>
                                            <InputGroup>
                                                <FormControl placeholder="Experience Level" name="experienceLevel" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                <FormControl placeholder="Credit Score" name="creditScore" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                <FormControl placeholder="ARV" name="arv" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                            </InputGroup>
                                            <InputGroup>
                                                <FormControl placeholder="Turnaround Time" name="turnaroundTime" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                                <FormControl placeholder="Resell Value" name="resellValue" value={ "" || undefined} type="number" onChange={(e)=>this.props.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                            </InputGroup>

                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card style={{  border: '2.5px solid #B98757', margin: "1rem", borderRadius: 15 }}>
                                    <Card.Body style={{textAlign: "left", fontWeight: "600"}}>
                                            
                                            <Card.Text>Total In: $</Card.Text>
                                            <Card.Text>Total Profit on Flip: $</Card.Text>
                                            <Card.Text>Profit Percent: $</Card.Text>
                                            
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