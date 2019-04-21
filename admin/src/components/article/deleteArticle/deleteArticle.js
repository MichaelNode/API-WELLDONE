import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { articleOperations } from "../../../store/article";
import * as types from '../../../store/article/types';

function DeleteArticle (props, context) {

  const [showModal2, setShowModal2] = useState(false)
    
  function deleteArt () {
    props.deleteArticle(props.id, props.token)
    setShowModal2(false)
  }
  
    return (
      <>
        <Button className='icon-button' variant="danger" onClick={() => setShowModal2(true)}>
          <i className="fa fa-fw fa-trash"/>
        </Button>

        <Modal
          size="sm"
          show={showModal2}
          onHide={() => setShowModal2(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
            {context.t("Confirm delete article")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="light" onClick={() => setShowModal2(false)}>
                {context.t("Cancel")}
            </Button>
            <Button variant="danger" onClick={deleteArt}>
                {context.t("Confirm")}
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteArticle);