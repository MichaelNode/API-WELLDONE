import React, { Component } from "react";
import PropTypes from "prop-types";

class UpdateUser extends Component {
  render() {
    return <span className="nav-link" >
            {this.context.t("Update_User")}
            </span>;
  }
}

UpdateUser.contextTypes = {
  t: PropTypes.func
};



export default UpdateUser
