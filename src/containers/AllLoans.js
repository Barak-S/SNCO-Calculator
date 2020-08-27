import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card, Button } from 'react-bootstrap';
import LoanCard from '../components/LoanCard'

import { Link } from 'react-router-dom';


export default class AllLoans extends Component {

    state={
        allLoans: [],
        start: 0
    }

    componentDidMount(){
        fetch("https://snco-calculator-backend.herokuapp.com/loans")
        .then(resp=>resp.json())
        .then(allLoans=>this.setState({
          allLoans
        }))
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
                // if (loanGroupLength === i+1){
                //     return(<Link to={`/loans/${loan._id}`}>
                //         <LoanCard
                //         key={loan._id}
                //         loan={loan}
                //         new={"New"}
                        
                //     /></Link>)
                // } else {
                    return(<Link to={`/loans/${loan._id}`}>
                        <LoanCard
                        key={loan._id}
                        loan={loan}
                    /></Link>)
                    // }
                })
        ) 
    }

    render() {

        return (
            <div className="AllLoans" style={{paddingBottom: 25}}>
                <div>
                    <Card.Text className="appHeader">All Loans</Card.Text>
                    {/* <Card.Text>results: {this.state.allLoans.length}</Card.Text> */}
                </div>
                {this.mapLoans()}
                {/* <Button variant="dark" onClick={()=>this.loadMoreLoans()}>Load More</Button> */}


            </div>
        )
    }
}
