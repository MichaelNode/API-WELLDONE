import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as types from '../../store/user/types';

class UpdateUser extends Component {
  render() {
    return <span className="nav-link" onClick={this.props.showUpdateForm}>
            {this.context.t("Update_User")}
            </span>;
  }
}

UpdateUser.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    showUpdateForm: () => {
        dispatch({
            type: types.SHOW_UPDATE_FORM
          });
      }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUser);
