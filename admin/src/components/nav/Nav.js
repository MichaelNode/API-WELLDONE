import React, {Component} from 'react';
import Logout from '../login/Logout';
import DeleteUser from '../deleteUser/deleteUser';

export default class Nav extends Component{
    render(){
        return(
            <nav>
                <Logout/>
                <DeleteUser/>
            </nav>
        )
    }
}
