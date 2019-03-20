// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userOperations} from '../../store/user';

class DeleteUser extends Component {
    render(){
        return (
            <button onClick={this.props.deleteUser}>{this.context.t('Delete_User')}</button>
        )
    }
}

DeleteUser.contextTypes = {
    t: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: () => {
            dispatch(userOperations.deleteUser());
      }
    };
  };

export default connect(null, mapDispatchToProps)(DeleteUser);
