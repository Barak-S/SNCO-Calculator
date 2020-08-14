import React, { Component } from 'react'
import { Form, Input, Row, Col, InputNumber, DatePicker } from "antd";

export default class CurrencyInput extends Component {
    render() {
        return (
            <div>
                    <InputNumber
                    name="purchasePrice "
                    formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={ value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: "100%" }}
                    value={ this.props.purchasePrice }
                    onChange={e => this.props.handleChange("purchasePrice",e)}
                    />
            
            </div>
        )
    }
}
