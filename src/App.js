import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './containers/NavBar'
import Calculators from './containers/CalculatorContainer'
import AllLoans from './containers/AllLoans'
import SNCOLogo from './components/SNCOLogo'

class App extends React.Component {

  render(){


    return (
      <Router>
        <div className="App">
          {/* <SNCOLogo/> */}
          <NavBar/>
          <Switch>
            <Route exact path = "/" render={(routerProps) => <AllLoans {...routerProps} />}/>
            <Route exact path = "/Calculator" render={(routerProps) => <Calculators {...routerProps} />}/>
          </Switch>
        </div>
      </Router>
    );


  }
}

export default App;
