import React, { Component } from 'react'
import { FormControl, InputGroup, Dropdown, DropdownButton, Form } from 'react-bootstrap';

export default class CalculatorCard extends Component {

    state={
        dropDownChoice: "Multifamily Max Refi"
    }


    changeDropDownChoice(e){
        this.setState({
            dropDownChoice: e
        },()=>console.log(this.state.dropDownChoice))
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
                <div style={{ border: '2px solid #B98757',width: "50%", borderRadius: 20, marginLeft: "25%", marginBottom: "1rem"}}>
                    <div>
                        <InputGroup>
                            <FormControl placeholder="Address" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="Purchase Price" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Requested Loan Amount" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="Monthly Gross Rents" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Vacancy" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="Taxes" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Insurance" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="Water Sewer" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Utilities" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="Management" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Reserves" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="Hard Costs" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Soft Costs" style={{margin:7.5}}></FormControl>
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
                        
                    </div>
            </div>
        )
    }
}
