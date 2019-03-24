import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Login from './components/login/Login'
import Loading from './components/loading/Loading'
import Nav from "./components/nav/Nav";
import styled from 'styled-components';

class AdminPanel extends Component {
  render() {
    return (
        <div>
          {
            this.props.token &&  !this.props.isLoading && (
                <div className="App">
                  <NavTitle>Welldone Admin Panel</NavTitle>
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

const NavTitle = styled.h1`
  margin-bottom: 0;
`;

export default connect(state => ({
  token: state.user.token,
  isLoading: state.user.isLoading
}))(AdminPanel);
