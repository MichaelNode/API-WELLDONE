

// Header.js
import React, {Component} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {Icon} from 'react-fa'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Content from '../content/content'
export default class Header extends Component {
    render(){
        return (
        <BrowserRouter>
        <div>
            <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
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
                    <NavItem eventKey="/add_article">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        <Switch>
            <Route exact path='/add' component={Content} />
        </Switch>
        </div>
        </BrowserRouter> 
        )
    }
}