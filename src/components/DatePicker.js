import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import '../App.css';

 
export default class DateChoose extends Component {
  state = {
    date: new Date(),
  }
 
  dateChange = date => this.setState({ date })
 
  render() {
    return (
      <div>
        <DatePicker
          onChange={this.dateChange}
          value={this.state.date}
          style={{marginRight: 22}}
        />
      </div>
    );
  }
}