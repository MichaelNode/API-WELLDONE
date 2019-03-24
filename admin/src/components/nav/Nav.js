import React, {Component} from 'react';
import Logout from '../login/Logout';
import DeleteUser from '../deleteUser/deleteUser';

export default class Nav extends Component{
    render(){
        return(
            <nav>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Logout/>
                    </li>
                    <li className="nav-item">
                        <DeleteUser/>
                    </li>
                </ul>
            </nav>
        )
    }
}
