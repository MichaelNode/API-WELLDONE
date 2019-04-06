// Header.js
import React, {Component} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {connect} from "react-redux";
import {Icon} from 'react-fa'
import {Route, Switch} from "react-router-dom";

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import MainNavbar from '../navbar/navbar'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Login from '../login/Login'
import Loading from '../loading/Loading'
import InstantLogout from "../login/InstantLogout";
import UpdateUserForm from "../updateUser/updateUserForm";
import Logout from '../login/Logout';
import AddArticleForm from '../article/add_article/addarticle_form'
import DeleteUser from '../deleteUser/deleteUser'
import {Form , Col} from "react-bootstrap";
import CardUSer from '../usercard/usercard'
import './styles.css'

class sideBars extends Component {
    render(){
        return (
        
        <div>
            {this.props.token &&  !this.props.isLoading && 
            <MainNavbar />
            }
            {this.props.token &&  !this.props.isLoading && (
            <SideNav
           
            >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        {this.context.t("Articles")}
                    </NavText>
                    <NavItem >
                    <NavText>
                        <Link to='/admin/add_article'>
                                <span className="nav-link" >
                                    {this.context.t("New_Article")}
                                </span>
                        </Link>
                        </NavText>
                    </NavItem>
                    <NavItem >
                    <NavText>
                       
                                <span className="nav-link" >
                                   <DeleteUser />
                                </span>
                       
                        </NavText>
                    </NavItem>
            
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        )}
             
        {
            this.props.token &&  !this.props.isLoading && (
                <React.Fragment>
                    <Switch>
                        <Form.Row>
                            <Form.Group className="div_main" as={Col}  md="6" >
                           
                                <Route exact path="/admin/logout" component={InstantLogout}/>
                                <Route exact path="/admin/update" component={UpdateUserForm}/>
                                <Route exact path="/admin/add_article" component={AddArticleForm}/>
                          
                            </Form.Group>
                            <Form.Group  as={Col}  md="6" >
                                <CardUSer userData={this.props.userData}/>
                       </Form.Group>
                        </Form.Row>
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
        )
    }
}

sideBars.contextTypes = {
    t: PropTypes.func
};

export default connect(state => ({
    token: state.user.token,
    userData: state.user.userData,
    isLoading: state.user.isLoading
  }))(sideBars);