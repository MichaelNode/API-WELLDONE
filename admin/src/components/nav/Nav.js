import React, {Component} from 'react';
import Logout from '../login/Logout';
import DeleteUser from '../deleteUser/deleteUser';
import AddArticle from '../article/add_article/addarticle'

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
                </ul>
            </nav>
        )
    }
}
