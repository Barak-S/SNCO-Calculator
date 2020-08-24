import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card } from 'react-bootstrap';
import SNCOLogo from '../components/SNCOLogo'
import LoanCard from '../components/LoanCard'
import SingleLoan from '../containers/SingleLoan'

export default class AllLoans extends Component {

    state={
        allLoans: [],
        singleLoan: {},
    }

    componentDidMount(){
        fetch("https://snco-calculator-backend.herokuapp.com/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        }))
    }

    openLoan=(loan)=>{
        this.setState({ singleLoan: loan })
    }

    closeLoan=()=>{
        this.setState({ singleLoan: {} })
    }

    mapLoans(){
        return(
            this.state.allLoans.map(loan=>{
                return (
                    <LoanCard
                        loan={loan}
                        openLoan={this.openLoan}
                    />
                )
            })
        )
    }

    render() {
        return (
            <div>
                { !this.state.singleLoan.hasOwnProperty("address") && <Card.Text className="appHeader">All Loans</Card.Text>}
                {this.state.singleLoan.hasOwnProperty("address") ? 
                    <SingleLoan
                        loan={this.state.singleLoan}
                        closeLoan={this.closeLoan}
                    />
                    : 
                    this.mapLoans()
                }
            </div>
        )
    }
}
