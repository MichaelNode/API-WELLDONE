import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Login from './components/login/Login'
import Loading from './components/loading/Loading'

class AdminPanel extends Component {
  render() {
    return (
        <div>
          {
            this.props.isLogged &&  !this.props.isLoading && (
                <div className="App">
                  <h1>Welldone Admin Panel</h1>
                </div>
            )
          }
          {
            !this.props.isLogged && !this.props.isLoading &&
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
  isLogged: state.user.isLogged,
  isLoading: state.user.isLoading
}))(AdminPanel);
