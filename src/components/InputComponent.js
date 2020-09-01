import React, { Component } from 'react'
import { InputNumber } from "antd";
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'



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
        } else if (this.props.input === "turnaroundTime"){
            input = <div style={{width: "100%"}}>
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        onSelect= {(e)=>this.props.changeturnaroundTime(e)}
                        title="Turnaround Time"
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item eventKey="3 Months">3 Months</Dropdown.Item>
                        <Dropdown.Item eventKey="6 Months">6 Months</Dropdown.Item>
                        <Dropdown.Item eventKey="12 Months">12 Months</Dropdown.Item>
                        <Dropdown.Item eventKey="18 Months">18 Months</Dropdown.Item>
                        <Dropdown.Item eventKey="24 Months">24 Months</Dropdown.Item>
                    </DropdownButton>
                    <FormControl name="turnaroundTime" value={ this.props.value || undefined} type="text" disabled={true}></FormControl>
                    </div>
        
        } else if (this.props.input === "experienceLevel"){
            input = <div style={{width: "100%"}}>
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            onSelect= {(e)=>this.props.changeExperience(e)}
                            title="Experience Level"
                            id="input-group-dropdown-1"
                            >
                            <Dropdown.Item eventKey="0 properties">0 properties</Dropdown.Item>
                            <Dropdown.Item eventKey="3 properties">3 properties</Dropdown.Item>
                            <Dropdown.Item eventKey="6 properties">6 properties</Dropdown.Item>
                        </DropdownButton>
                        <FormControl name="experienceLevel" value={ this.props.value || undefined} type="text" disabled={true}></FormControl>
                    </div>
        
        } else if (this.props.input === "rate") {
            input = (<InputNumber
                        name={"rate"}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        style={{ width: "100%",fontSize: 17, paddingTop: 3 }}
                        value={this.props.value? this.props.value : 0} 
                        min={0}
                        max={100}
                        onChange={e => this.props.handleRateChange("rate", e)}
                    />)
        
        }else {
            input = <FormControl autoComplete="new-password" style={{width: "100%"}} name={this.props.name} value={this.props.value || undefined} onChange={this.props.handleChange && (e =>this.props.handleChange(this.props.name ,e.target.value))}></FormControl>
        }
        return (
                input
        )
    }
}
