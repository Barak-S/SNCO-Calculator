import React, { Component } from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';


export default class SingleLoan extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.loan.address}</h4>
                <button onClick={()=>this.props.closeLoan()}>Close</button>
            </div>
        )
    }
}
