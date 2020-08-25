import React, { Component } from 'react'
import { Input, Row, Col, InputNumber, Form } from "antd";
import { InputGroup } from 'react-bootstrap';


export default class PercentageInput extends Component {
    render() {
        return (
            
                <InputNumber
                    name={this.props.name}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    style={{ minWidth:"50%", fontSize: 17 }}
                    value={this.props.value? this.props.value.toFixed(2) : 0} 
                    min={0}
                    max={100}
                    onChange={e => this.props.handleChange(this.props.name,e)}
                    disabled={this.props.disabled}
                />
        )
    }
}
