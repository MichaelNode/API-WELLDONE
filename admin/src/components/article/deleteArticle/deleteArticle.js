import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { articleOperations } from "../../../store/article";
import * as types from '../../../store/article/types';

class DeleteArticle extends Component {
    constructor(props){
        super(props)
    }
  delete = () => {
    this.props.deleteArticle(this.props.id, this.props.token);
  };

  render() {
    return (
      <>
        <Button variant="danger" onClick={this.props.showModal}>
          {this.context.t("Delete_Article")}
        </Button>

        <Modal
          size="sm"
          show={this.props.modal}
          onHide={this.props.hideModal}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
            {this.context.t("Confirm delete article")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="light" onClick={this.props.hideModal}>
                {this.context.t("Cancel")}
            </Button>
            <Button variant="danger" onClick={this.delete}>
                {this.context.t("Confirm")}
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

DeleteArticle.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({
  token: state.user.token,
  modal: state.article.show_modal
});

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: (id, token) => {
      dispatch(articleOperations.deleteArticle(id, token));
    },
    showModal: () => {
        dispatch({
          type: types.SHOW_ARTCILE_MODAL
        });
    },
    hideModal: () => {
        dispatch({
            type: types.HIDE_ARTCILE_MODAL
        });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteArticle);