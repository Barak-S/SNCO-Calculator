import React, { Component } from 'react'
import { Input, Row, Col, InputNumber, Form } from "antd";
import { InputGroup } from 'react-bootstrap';

// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'



export default class CurrencyInput extends Component {
    render() {
        return (
                
                <Row gutter={16}>
                    <Col xs={24} md={12}>

                        <InputNumber
                            name={this.props.name}
                            formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={ value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: "100%",  fontSize: 17 }}
                            value={ this.props.value? this.props.value.toFixed(2) : 0}
                            onChange={e => this.props.handleChange(this.props.name,e)}
                            disabled={this.props.disabled}

                        />

                    </Col>
                </Row>
                

        )
    }
}
