import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card } from 'react-bootstrap';
import LoanCard from '../components/LoanCard'
import SingleLoan from '../containers/SingleLoan'

import { Link } from 'react-router-dom';


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

    deleteLoan=(loanID)=>{
        // Delete single loan
        fetch('https://snco-calculator-backend.herokuapp.com/loans',{
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loanID })
        })
        // .then(resp=>resp.json())
        // .then(dbLog=>console.log(dbLog))
        this.removeLoanFromState(loanID)
    }

    mapLoans(){
        let loanGroupLength = this.state.allLoans.length

        return(
            this.state.allLoans.map((loan, i)=>{
                if (loanGroupLength === i+1){
                    return(<Link to={`/loans/${loan._id}`} onClick={()=>this.props.openLoan(loan)}>
                        <LoanCard
                        key={loan._id}
                        loan={loan}
                        openLoan={this.props.openLoan}
                        new={"New"}
                        
                    /></Link>)
                } else {
                    return(<Link to={`/loans/${loan._id}`} onClick={()=>this.props.openLoan(loan)}>
                        <LoanCard
                        key={loan._id}
                        loan={loan}
                        openLoan={this.props.openLoan}
                    /></Link>)
                }
            })


        )
        
    }

    render() {

        console.log(this.props.allLoans)

        return (
            <div className="AllLoans" style={{paddingBottom: 25}}>
                <Card.Text className="appHeader">All Loans</Card.Text>
                {this.mapLoans()}
                
            </div>
        )
    }
}
