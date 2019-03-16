import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userOperations} from '../../store/user';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class InstantLogout extends Component {

    constructor(props) {
        super(props);
        this.props.logout(true);
        if(this.props.redirect || !this.props.token){
            this.props.history.push('/admin');
        }
    };

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.redirect);
        if(this.props.redirect || !this.props.token){
            this.props.history.push('/admin');
        }
    }

    render(){
        return("");
    }

}

InstantLogout.propTypes = {
    history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }),
};

export default connect(
    (state) => ({
        redirect: state.user.redirect,
        token: state.user.token
    }),
    (dispatch) => ({
        logout: (redirect) => dispatch(userOperations.logout(redirect))
    }))(withRouter(InstantLogout));
