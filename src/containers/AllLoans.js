import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card, Col, Row } from 'react-bootstrap';
import LoanCard from '../components/LoanCard'

import { Link } from 'react-router-dom';


export default class AllLoans extends Component {

    state={
        allLoans: [],
        amountInProgress: 0,
        start: 0,
    }

    componentDidMount(){
        fetch("https://snco-calculator-backend.herokuapp.com/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        },()=>this.getAmountInProgress(this.state.allLoans)))
    }

    loadMoreLoans=()=>{
        if (this.state.start > this.state.allLoans.length-10){
          this.setState({
            start: 0,
          })
        } else {
          this.setState({
            start: this.state.start + 10,
          })
        }
    }

    loadLoans(start){
        return this.state.allLoans.slice(start, start + 10)
    }

    mapLoans(){
        let loanGroupLength = this.state.allLoans.length
        return(
            this.state.allLoans.map((loan, i)=>{
                if (loanGroupLength === i+1){
                    return(<Link to={`/loans/${loan._id}`}>
                        <LoanCard
                        key={loan._id}
                        loan={loan}
                        new={"New"}
                        
                    /></Link>)
                } else {
                    return(<Link to={`/loans/${loan._id}`}>
                        <LoanCard
                        key={loan._id}
                        loan={loan}
                    /></Link>)
                    }
                })
        ) 
    }

    getAmountInProgress(allLoans){
        let amountInProgress = 0
        allLoans.map((loan)=>{
            if (loan.loan.requestLoanAmount){
                amountInProgress += loan.loan.requestLoanAmount
            }
        })
        this.setState({
            amountInProgress
        })
    }

    numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);


    render() {

        return (
            <div className="AllLoans" style={{paddingBottom: 25}}>
                <div>
                    <Card.Text className="appHeader">All Loans</Card.Text>
                    <Col xs={12} md={4} lg={4} className="processDiv">
                        <Card style={{textAlign: "left", padding: "0.5rem", borderRadius: 8}}>
                            <Row>
                                <Col>
                                    <Card.Text style={{fontSize: 11.5}}>Amount In Proccess</Card.Text><Card.Text style={{ fontSize: 18.5, color:"#0F9D58", fontWeight: "600" }}>{this.numberFormat(this.state.amountInProgress)}</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text style={{fontSize: 11.5}}>Loan In Proccess</Card.Text><Card.Text style={{ fontSize: 18.5, color:"#FFB74D", fontWeight: "600" }}>{this.state.allLoans.length}</Card.Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </div>
                {/* {this.state.loading? <Button variant="secondary" style={{opacity: "0.5", marginTop: 7}}>Loading...</Button> : this.mapLoans()} */}
                <Row>
                    <Col xs={12} md={9} lg={9}>
                        {this.mapLoans()}
                    </Col>
                    <Col >
                        <Card style={{textAlign: "left", margin: "1rem", borderRadius: 8}}>
                            <Card.Body>
                                <Card.Text style={{fontSize: 19, fontWeight: "600", textAlign: "center"}}>History</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <Button variant="dark" onClick={()=>this.loadMoreLoans()}>Load More</Button> */}
            </div>
        )
    }
}


