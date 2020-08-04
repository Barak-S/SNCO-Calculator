import React, { Component } from 'react'
import { FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

export default class CalculatorCard extends Component {

    state={
        dropDownChoice: "Fix & Flip"
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
                        <Dropdown.Item eventKey="Fix & Flip">Fix & Flip</Dropdown.Item>
                        <Dropdown.Item eventKey="Another Action">Another action</Dropdown.Item>
                    </DropdownButton>
                <div style={{ border: '2px solid #B98757',width: "50%", borderRadius: 20, marginLeft: "25%", marginBottom: "1rem"}}>
                    <div>
                        <InputGroup>
                            <FormControl placeholder="Purchase Price" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="Hard Costs" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="" style={{margin:7.5}}></FormControl>
                        </InputGroup>
                        <InputGroup>
                            <FormControl placeholder="" style={{margin:7.5}}></FormControl>
                            <FormControl placeholder="" style={{margin:7.5}}></FormControl>
                        </InputGroup>
            
                    </div>
                </div>
                    <div className="Results">
                        <h5>Results</h5>
                        
                    </div>
            </div>
        )
    }
}
