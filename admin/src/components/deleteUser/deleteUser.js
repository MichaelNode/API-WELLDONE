// Dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DeleteUser extends Component {
    render(){
        return (
            <button>{this.context.t('Delete_User')}</button>
        )
    }
}

DeleteUser.contextTypes = {
    t: PropTypes.func
};

export default DeleteUser;
