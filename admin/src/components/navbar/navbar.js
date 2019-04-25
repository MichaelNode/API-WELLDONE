// Header.js
import React, {Component} from 'react';

import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import PropTypes from "prop-types";
import Logout from '../login/Logout';
import DeleteUser from '../deleteUser/deleteUser';
import Iso from '../../../public/isowelldone.jpg'
import styled from 'styled-components';

// Be sure to include styles at some point, probably during your bootstraping


export default class MainNavbar extends Component {
  
 
    render(){
        return (
          <>
          <Navbar bg="white" variant="light">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <Nav.Link href={process.env.REACT_APP_API_URL + '/articles'} title="Welldone"> 
                <Logo>
                  <div>
                    <img src={Iso}/>  
                  </div>
                </Logo>
              </Nav.Link>
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

const Logo = styled.div`
  width: 50px;
`;


MainNavbar.contextTypes = {
  t: PropTypes.func
};
