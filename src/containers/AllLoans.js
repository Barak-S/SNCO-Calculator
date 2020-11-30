import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card, Col, Row, Form } from 'react-bootstrap';
import LoanCard from '../components/LoanCard'
import { Link } from 'react-router-dom';


export default class AllLoans extends Component {

    state={
        allLoans: [],
        sortedLoans: [],
        amountInProgress: 0,
        start: 0,
    }

    componentDidMount(){
        fetch("https://snco-calculator-backend.herokuapp.com/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans: allLoans,
          sortedLoans: allLoans
        },()=>this.getAmountInProgress(this.state.allLoans)))
    }

    // loadMoreLoans=()=>{
    //     if (this.state.start > this.state.allLoans.length-10){
    //       this.setState({
    //         start: 0,
    //       })
    //     } else {
    //       this.setState({
    //         start: this.state.start + 10,
    //       })
    //     }
    // }

    // loadLoans(start){
    //     return this.state.allLoans.slice(start, start + 10)
    // }

    mapLoans(){
        let loanGroupLength = this.state.sortedLoans.length
        return(
            this.state.sortedLoans.map((loan, i)=>{
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


    handleSort=(e)=>{
        let sorted = [];
        if (e.target.value === "residential"){
            sorted = this.state.allLoans.filter(loan=>loan.propertyType.includes("residential"))
            this.setState({
                sortedLoans: sorted
            })
        } else if (e.target.value === "commercial"){
            sorted = this.state.allLoans.filter(loan=>loan.propertyType.includes("commercial"))
            this.setState({
                sortedLoans: sorted
            })

        } else {
            this.setState({ sortedLoans: [...this.state.allLoans] })
        }
        
    }


    render() {

        return (
            <div className="AllLoans" style={{paddingBottom: 25}}>
                <Card.Text className="appHeader">All Loans</Card.Text>
                <Col xs={12} md={4} lg={4} className="processDiv">
                    <Card style={{textAlign: "left", padding: "0.5rem", borderRadius: 8}}>
                        <Row>
                            <Col>
                                <Card.Text style={{fontSize: 11.5}}>Amount In Proccess</Card.Text><Card.Text style={{ fontSize: 18.5, color:"#0F9D58", fontWeight: "600" }}>{this.numberFormat(this.state.amountInProgress)}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text style={{fontSize: 11.5}}>Loans In Proccess</Card.Text><Card.Text style={{ fontSize: 18.5, color:"#FFB74D", fontWeight: "600" }}>{this.state.allLoans.length}</Card.Text>
                            </Col>
                        </Row>
                    </Card>
                    <Form.Control
                      style={{ border: "none", fontWeight: "600", marginTop:12}}
                      as="select"
                      onChange={(e)=>this.handleSort(e)}
                      custom
                  >
                      <option value="all">Sort</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                  </Form.Control>
                </Col>
                <Col className="processDiv" xs={12} sm={12} md={10} lg={10}>
                    <hr/>
                    {this.mapLoans()}
                </Col>
            </div>
        )
    }
}


