import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Login from './components/login/Login'
import Loading from './components/loading/Loading'
import Nav from "./components/nav/Nav";

class AdminPanel extends Component {
  render() {
    return (
        <div>
          {
            this.props.token &&  !this.props.isLoading && (
                <div className="App">
                  <h1>Welldone Admin Panel</h1>
                  <Nav/>
                </div>
            )
          }
          {
            !this.props.token && !this.props.isLoading &&
                <Login/>
          }
          {
            this.props.isLoading &&
            <Loading/>
          }
        </div>
    );
  }
}

export default connect(state => ({
  token: state.user.token,
  isLoading: state.user.isLoading
}))(AdminPanel);
