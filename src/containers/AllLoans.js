import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';
import SNCOLogo from '../components/SNCOLogo'
import LoanCard from '../components/LoanCard'

export default class AllLoans extends Component {

    state={
        allLoans: []
    }

    componentDidMount(){
        fetch("https://snco-calculator-backend.herokuapp.com/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        }))
    }

    mapLoans(){
        return(
            this.state.allLoans.map(loan=>{
                return (
                    <LoanCard
                        address={loan.address}
                        properyType={loan.properyType}
                    />
                )
            })
        )
    }

    render() {
        return (
            <div>
                {this.mapLoans()}
            </div>
        )
    }
}
