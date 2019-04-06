// Header.js
import React, {Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import PropTypes from "prop-types";
import Logout from '../login/Logout';
import DeleteUser from '../deleteUser/deleteUser';
// Be sure to include styles at some point, probably during your bootstraping


export default class MainNavbar extends Component {
    render(){
        return (
          <>
          <Navbar bg="light" variant="light">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <Dropdown  drop='left'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className="fa fa-user"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>{this.context.t("User")}</Dropdown.Header>
                  <Dropdown.Item href="/admin/update"> {this.context.t("Update_User")}</Dropdown.Item>
                  <Dropdown.Item > <DeleteUser/> </Dropdown.Item>
                  <Dropdown.Item>  <Logout/> </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar>
        </>
        )
    }
}

MainNavbar.contextTypes = {
  t: PropTypes.func
};
