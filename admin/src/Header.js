import React, { Component } from 'react';
import PropTypes from "prop-types";
import Nav from "./components/nav/Nav";
import styled from "styled-components";

class Header extends Component{
    render() {
        return (
            <div className="App">
                <NavTitle> {this.context.t("Welldone Admin Panel")}</NavTitle>
                <Nav/>
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
