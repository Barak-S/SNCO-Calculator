import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './containers/NavBar'
import Calculators from './containers/CalculatorContainer'
import AllLoans from './containers/AllLoans'
import SingleLoan from './containers/SingleLoan'
import Footer from './components/Footer'
import Home from './containers/Home'

class App extends React.Component {


  render(){

    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path = '/' render={(routerProps) => <Home {...routerProps} />}/>
            <Route exact path = "/loans" render={(routerProps) => <AllLoans {...routerProps} />}/>
            <Route exact path = "/loans/:id" render={(routerProps) => <SingleLoan {...routerProps} />}/>
            <Route exact path = "/calculator" render={(routerProps) => <Calculators {...routerProps} />}/>
          </Switch>
        </div>
        <Footer/>
      </Router>
    );


  }
}

export default App;
