import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Badge} from 'react-bootstrap';

export default class LoanCard extends Component {

      
    render() {
        
        return (
            <Card className="LoanCard" style={{ borderRadius: 8 }}>
                <Card.Body style={{color: "#000000"}}>
                    <Row>
                        <Col xs lg="4">
                        {this.props.new ? <Card.Text id="LoanAddress"><Badge variant="danger">{this.props.new}</Badge>{' '}{this.props.loan.address}</Card.Text> : <Card.Text id="LoanAddress">{this.props.loan.address}</Card.Text>}
                        </Col>
                        <Col xs lg="3">
                            <Card.Text><strong>Type: </strong>{this.props.loan.propertyType}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
