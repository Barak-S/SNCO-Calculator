import React, { Component } from 'react'
import { Form, Input, Row, Col, InputNumber, DatePicker } from "antd";

export default class CurrencyInput extends Component {
    render() {
        return (
            <div>
                    <InputNumber
                        name={this.props.name}
                        formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={ value => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: "100%", height: 39, fontSize: 17, paddingTop: 4 }}
                        value={ this.props.value }
                        onChange={e => this.props.handleChange(this.props.name,e)}
                    />
            
            </div>
        )
    }
}
