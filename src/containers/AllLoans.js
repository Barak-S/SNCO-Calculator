import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card } from 'react-bootstrap';
import LoanCard from '../components/LoanCard'
import SingleLoan from '../containers/SingleLoan'

export default class AllLoans extends Component {

    state={
        allLoans: [],
        singleLoan: {},
    }

    componentDidMount(){
        // Gets all Loans
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

    removeLoanFromState(loanID){
        this.setState({
            allLoans: this.state.allLoans.filter(loan => loan._id !== loanID)
        })
    }

    openLoan=(loan)=>{
        this.setState({ singleLoan: loan })
    }

    closeLoan=()=>{
        this.setState({ singleLoan: {} })
    }

    mapLoans(){
        let loanGroupLength = this.state.allLoans.length

        return(

            this.state.allLoans.map((loan, i)=>{
                if (loanGroupLength === i+1){
                    return(<LoanCard
                        key={loan._id}
                        loan={loan}
                        openLoan={this.openLoan}
                        new={"New"}
                    />)
                } else {
                    return(<LoanCard
                        key={loan._id}
                        loan={loan}
                        openLoan={this.openLoan}
                    />)
                }
            })


        )
        
    }

    render() {
        return (
            <div className="AllLoans" style={{paddingBottom: 25}}>
                { !this.state.singleLoan.hasOwnProperty("address") && <Card.Text className="appHeader">All Loans</Card.Text>}
                {this.state.singleLoan.hasOwnProperty("address") ? 
                    <SingleLoan
                        loan={this.state.singleLoan}
                        closeLoan={this.closeLoan}
                        deleteLoan={this.deleteLoan}
                    />
                    : 
                    this.mapLoans()
                }
            </div>
        )
    }
}
