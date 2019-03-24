import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userOperations } from "../../store/user";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class DeleteUser extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleDelete() {
    this.setState({ show: false });
    this.props.deleteUser();
  }

  render() {
    return (
      <>
        <a className="nav-link" onClick={this.handleShow}>
          {this.context.t("Delete_User")}
        </a>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.context.t("Delete modal title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.context.t("Delete modal body")}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              {this.context.t("Cancel")}
            </Button>
            <Button variant="primary" onClick={this.handleDelete}>
              {this.context.t("Confirm")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
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

export default connect(
  null,
  mapDispatchToProps
)(DeleteUser);
