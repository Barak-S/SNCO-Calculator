import React, { Component } from 'react'
import { Input, Row, Col, InputNumber, Form } from "antd";
import { InputGroup, FormControl } from 'react-bootstrap';

// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'



export default class CurrencyInput extends Component {

    render() {
        
        let input;

        if (this.props.input === "currency"){
            input = <InputNumber
                    name={this.props.name}
                    formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={ value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ minWidth: "100%",  fontSize: 17, paddingTop: 3 }}
                    value={ this.props.value? this.props.value : 0}
                    onChange={this.props.handleChange && (e => this.props.handleChange(this.props.name,e))}
                    disabled={this.props.disabled}

                />

        } else if (this.props.input === "percent"){
            input = <InputNumber
                    name={this.props.name}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    style={{ minWidth:"100%", fontSize: 17, paddingTop: 3 }}
                    value={this.props.value? this.props.value : 0} 
                    min={0}
                    max={100}
                    onChange={this.props.handleChange && (e => this.props.handleChange(this.props.name,e))}
                    disabled={this.props.disabled}
                />
        } else {
            input = <FormControl autoComplete="new-password" style={{width: "100%"}} name={this.props.name} value={this.props.value || undefined} onChange={this.props.handleChange && (e =>this.props.handleChange(this.props.name ,e.target.value))}></FormControl>
        }
        return (
                input
        )
    }
}
