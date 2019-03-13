import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Login from './components/login/Login'

class AdminPanel extends Component {
  render() {
    return (
        <div>
          {
            this.props.isLogged && (
                <div className="App">
                  <h1>Welldone Admin Panel</h1>
                </div>
            )
          }
          {
            !this.props.isLogged &&
                <Login/>
          }
        </div>
    );
  }
}

export default connect(state => ({
  isLogged: state.user.isLogged
}))(AdminPanel);
