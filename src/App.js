import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CalculatorCard from './containers/Card'
import SNCOLogo from './components/SNCOLogo'

function App() {
  return (
    <div className="App">
      <SNCOLogo/>
      <CalculatorCard></CalculatorCard>
    </div>
  );
}

export default App;
