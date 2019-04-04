import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import Login from './components/login/Login'
import Loading from './components/loading/Loading'
import {Route, Switch} from "react-router-dom";
import InstantLogout from "./components/login/InstantLogout";
import UpdateUserForm from "./components/updateUser/updateUserForm";
import Header from "./Header";

class AdminPanel extends Component {
  render() {
    return (
        <div>
          {
            this.props.token &&  !this.props.isLoading && (
                <React.Fragment>
                    <Header/>
                    <Switch>
                      <Route exact path="/admin/logout" component={InstantLogout}/>
                      <Route exact path="/admin/update" component={UpdateUserForm}/>
                    </Switch>
                </React.Fragment>
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