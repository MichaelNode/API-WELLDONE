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
            <span onClick={this.handleLogout}>{this.context.t('Logout')}</span>
        )
    }
}

Logout.contextTypes = {
    t: PropTypes.func
};

export default connect(null, (dispatch) => ({
    logout: () => dispatch(userOperations.logout(false))
}))(Logout);
