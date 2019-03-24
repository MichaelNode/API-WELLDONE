import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userOperations } from "../../store/user";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as types from '../../store/user/types';

class DeleteUser extends Component {

  render() {
    return (
      <>
        <a className="nav-link" onClick={this.props.showModal}>
          {this.context.t("Delete_User")}
        </a>

        <Modal show={this.props.show} onHide={this.props.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.context.t("Delete modal title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.context.t("Delete modal body")}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModal}>
              {this.context.t("Cancel")}
            </Button>
            <Button variant="primary" onClick={this.props.deleteUser}>
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

const mapStateToProps = state => ({
    show: state.user.showModal
})

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => {
        dispatch(userOperations.deleteUser());
    },
    showModal: () => {
        dispatch({
            type: types.SHOW_MODAL
          });
      },
    hideModal: () => {
        dispatch({
            type: types.HIDE_MODAL
          });
      }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUser);
