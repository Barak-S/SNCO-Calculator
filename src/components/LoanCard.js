import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

export default class LoanCard extends Component {
    render() {
        return (
            <Card className="LoanCard" style={{ border: '1px solid #B98757', borderRadius: 12 }} onClick={()=>this.props.openLoan(this.props.loan)}>
                <Card.Body>
                    <Row>
                        <Col xs lg="4">
                            <Card.Text id="LoanAddress">{this.props.loan.address}</Card.Text>
                        </Col>
                        <Col xs lg="3">
                            <Card.Text><strong>Type: </strong>{this.props.loan.properyType}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
