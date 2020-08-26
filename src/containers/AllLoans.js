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
    }

    componentDidMount(){
        fetch("https://snco-calculator-backend.herokuapp.com/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        }))
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

    render() {

        return (
            <div className="AllLoans" style={{paddingBottom: 25}}>
                <Card.Text className="appHeader">All Loans</Card.Text>
                {this.mapLoans()}

            </div>
        )
    }
}
