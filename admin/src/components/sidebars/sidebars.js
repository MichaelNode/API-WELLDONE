// Header.js
import React, {Component} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {connect} from "react-redux";
import {Icon} from 'react-fa'
import {Route, Switch} from "react-router-dom";

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Content from '../content/content'
import MainNavbar from '../navbar/navbar'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Login from '../login/Login'
import Loading from '../loading/Loading'
import InstantLogout from "../login/InstantLogout";
import UpdateUserForm from "../updateUser/updateUserForm";
import Logout from '../login/Logout';
import AddArticleForm from '../article/add_article/addarticle_form'

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
                        Charts
                    </NavText>
                    <NavItem eventKey="/">
                        <NavText>
                            <Logout/>
                        </NavText>
                    </NavItem>
                    <NavItem >
                    <NavText>
                        <Link to='/admin/add_article'>
                                <span className="nav-link" >
                                    {this.context.t("Add_Article")}
                                </span>
                        </Link>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                        <Link to='/admin/update'>
                            <span className="nav-link" >
                                {this.context.t("Update_User")}
                            </span>
                        </Link>
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
                      <div className="div_main">
                        <Route exact path="/admin/logout" component={InstantLogout}/>
                        <Route exact path="/admin/update" component={UpdateUserForm}/>
                        <Route exact path="/admin/add_article" component={AddArticleForm}/>
                      </div>
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
    isLoading: state.user.isLoading
  }))(sideBars);