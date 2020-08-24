import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';


export default class SingleLoan extends Component {
    render() {
        return (
            <Card style={{ border: '1px solid #B98757', borderRadius: 12, margin: "1rem", padding: 10, fontWeight: "600", fontSize: 22, paddingTop: 15 }}>
                <Card.Text>{this.props.loan.address}</Card.Text>
                <Button variant="dark" onClick={()=>this.props.closeLoan()}>Close</Button>
            </Card>
        )
    }
}
