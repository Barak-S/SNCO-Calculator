import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FormControl, InputGroup, Dropdown, DropdownButton, Form, Card, Col, Row, Container } from 'react-bootstrap';
import SNCOLogo from '../components/SNCOLogo'

export default class AllLoans extends Component {

    state={
        allLoans: []
    }

    componentDidMount(){
        fetch("http://localhost:5000/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        },()=>console.log(this.state.allLoans)))
    }

    render() {
        return (
            <div>
                <SNCOLogo/>
                <h5 className="appHeader">All Loans Will render below</h5>
            </div>
        )
    }
}
