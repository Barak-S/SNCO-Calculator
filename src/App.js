import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './containers/NavBar'
import Calculators from './containers/CalculatorContainer'
import AllLoans from './containers/AllLoans'
import SingleLoan from './containers/SingleLoan'

class App extends React.Component {

  state={
    singleLoan: {},
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


  render(){

    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path = "/loans" render={(routerProps) => <AllLoans {...routerProps} openLoan={this.openLoan} />}/>
            <Route exact path = "/loans/:id" render={(routerProps) => <SingleLoan {...routerProps} loan={this.state.singleLoan} closeLoan={this.closeLoan} />}/>
            <Route exact path = "/Calculator" render={(routerProps) => <Calculators {...routerProps} />}/>
          </Switch>
        </div>
      </Router>
    );


  }
}

export default App;
