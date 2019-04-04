import React, { Component } from 'react';
import PropTypes from "prop-types";
import MainNavbar from "./components/navbar/navbar";
import styled from "styled-components";


class Header extends Component{
    render() {
        return (
            <div className="App">
                <MainNavbar /> 
            </div>
        )
    }
}

Header.contextTypes = {
    t: PropTypes.func.isRequired
};

const NavTitle = styled.h1`
  margin-bottom: 0;
`;

export default Header;