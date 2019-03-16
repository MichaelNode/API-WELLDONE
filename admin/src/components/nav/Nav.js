import React, {Component} from 'react';
import Logout from '../login/Logout';

export default class Nav extends Component{
    render(){
        return(
            <nav>
                <Logout/>
            </nav>
        )
    }
}
