import React, { Component } from 'react'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, ControlLabel } from 'react-bootstrap';

import DatePicker from '../components/DatePicker'
export default class CalculatorCard extends Component {

    state={
        dropDownChoice: "Multifamily Max Refi",
        address: "",
        purchasePrice: "",
        requestLoanAmount: "",
        purchaseDate: "",
        monthlyGrossRent: "",
        units: "",
        vacancy: "",
        taxes: "",
        insurance: "",
        waterSewer: "",
        utilities: "",
        management: "",
        replacementReserves: "",
        hardCosts: "",
        softCosts: "",
        totalProjectCost: 0,

    }

    handleAddressChange(e){
        this.setState({
            address: e.target.value
        },()=>console.log(this.state.address))
    }


    handleNumberChange(e){
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        },()=>this.calculateTotalProjectCost())
    }


    changeDropDownChoice(e){
        this.setState({
            dropDownChoice: e
        })
    }
      

    calculateTotalProjectCost(){
        let price = this.state.purchasePrice === "0" ? 0 : this.state.purchasePrice
        let hard = this.state.hardCosts === "0" ? 0 : this.state.hardCosts
        let soft = this.state.softCosts === "0" ? 0 : this.state.softCosts
        let total = ( price + hard + soft )

        this.setState({
            totalProjectCost: total
        },()=>console.log(this.state.totalProjectCost))
             
    }

    


    render() {
        return (
            <div className="CalculatorCard" style={{ border: '2px solid #B98757', margin: "1rem", borderRadius: 20 }}>
                <h3>SNCO Calculator</h3>
                    <DropdownButton 
                        variant="dark"
                        title={this.state.dropDownChoice} 
                        onSelect= {(e)=>this.changeDropDownChoice(e)}
                        style={{ margin:7.5 }}
                    >
                        <Dropdown.Item eventKey="Multifamily Max Refi">Multifamily Max Refi</Dropdown.Item>
                        <Dropdown.Item eventKey="Fix & Flip">Fix & Flip</Dropdown.Item>
                    </DropdownButton>
                <div style={{ border: '2px solid #B98757', minWidth:"45%", borderRadius: 20, marginBottom: "1rem", display: "inline-block" }}>
                    <div>
                
                            <InputGroup>
                                <FormControl aria-label="Address" placeholder="Address" name="address" value={this.state.address} onChange={(e)=>this.handleAddressChange(e)} style={{margin:7.5}}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder="Purchase Price" name="purchasePrice" value={this.state.purchasePrice} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Requested Loan Amount" name="requestLoanAmount" value={this.state.requestLoanAmount} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                    <DatePicker/>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder="Monthly Gross Rent" name="monthlyGrossRent" value={this.state.monthlyGrossRent} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Units" name="units" value={this.state.units} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Vacancy" name="vacancy" disabled={true} value={(parseInt(this.state.monthlyGrossRent) * .03)} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder="Taxes" type="number" name="taxes" value={this.state.taxes} onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Insurance"  name="insurance" value={this.state.insurance} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder="Water Sewer" name="waterSewer" value={this.state.waterSewer} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Utilities" name="utilities" value={this.state.utilities} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder="Management" name="management" value={this.state.management} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Replacement Reserves" name="replacementReserves" value={this.state.replacementReserves} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder="Hard Costs" name="hardCosts" value={this.state.hardCosts} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                                <FormControl placeholder="Soft Costs" name="softCosts" value={this.state.softCosts} type="number" onChange={(e)=>this.handleNumberChange(e)} style={{margin:7.5}}></FormControl>
                            </InputGroup>

                        {/* <Form.File

                            FOR UPLOADING FILES

                            className="position-relative"
                            required
                            name="file"
                            label="File"
                            onChange={handleChange}
                            isInvalid={!!errors.file}
                            feedback={errors.file}
                            id="validationFormik107"
                            feedbackTooltip
                        /> */}
            
                    </div>
                </div>
                    <div className="Results">
                        <h5>Results</h5>
                        <div style={{ border: '2px solid #B98757',height: 350, width:"50%", borderRadius: 20, marginLeft: "25%", marginBottom: "1rem", backgroundColor: "lightgray"}}>
                            <h5>{`Total project cost: ${this.state.totalProjectCost}`}</h5>
                            <h5>{`Taxes: $${(parseInt(this.state.taxes) * .03)+ parseInt(this.state.taxes)}`}</h5>
                            {/* <h5>Taxes: { parseInt(this.state.taxes) === NaN ? 0 : parseInt((this.state.taxes)* .03)+ parseInt(this.state.taxes)}</h5> */}
                            <h5>Office Expenses: ${this.state.units * 500}</h5>

                        </div>
                    </div>
            </div>
        )
    }
}
