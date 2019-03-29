// Header.js
import React, {Component} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
// Be sure to include styles at some point, probably during your bootstraping


export default class MainNavbar extends Component {
    render(){
        return (
          <>
          <Navbar bg="light" variant="light">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i class="fa fa-user"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar>
        </>
        )
    }
}