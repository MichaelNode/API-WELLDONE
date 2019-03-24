import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userOperations} from '../../store/user';

class Logout extends Component{

    handleLogout = () => {
        this.props.logout();
    };

    render(){
        return(
            <a className="nav-link" onClick={this.handleLogout}>{this.context.t('Logout')}</a>
        )
    }
}

Logout.contextTypes = {
    t: PropTypes.func
};

export default connect(null, (dispatch) => ({
    logout: () => dispatch(userOperations.logout(false))
}))(Logout);
