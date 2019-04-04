import React, {Component} from 'react';
import Logout from '../login/Logout';
import DeleteUser from '../deleteUser/deleteUser';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Nav extends Component{
    render(){
        return(
            <nav>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="#">
                            <Logout/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#">
                            <DeleteUser/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to='/admin/update'>
                            <span className="nav-link" >
                                {this.context.t("Update_User")}
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

Nav.contextTypes = {
    t: PropTypes.func
  };