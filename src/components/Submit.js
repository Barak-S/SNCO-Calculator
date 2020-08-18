import React, { Component } from 'react'

import { Button } from 'react-bootstrap';


export default class Submit extends Component {
    render() {
        return (
            <div>
                <Button 
                    variant="outline-dark" 
                    style={{ marginBottom: 15 }} 
                    onClick={()=>this.props.createLoan()}
                >Create Loan</Button>
            </div>
        )
    }
}
