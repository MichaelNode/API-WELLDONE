import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userOperations } from '../../store/user';
import * as types from '../../store/user/types';

class UpdateUserForm extends Component {
  
  changeUserName = e => this.props.getFirstName(e.target.value);
  changeUserLastName = e => this.props.getLastName(e.target.value);
  changeUserNickName = e => this.props.getNickName(e.target.value);
  changeUserAddress = e => this.props.getAddress(e.target.value);

  render() {
    return (
      <>
        <Form className="update-form" >

          <Form.Group controlId="formGridAddress1">
            <Form.Label>{this.context.t("First_Name")}</Form.Label>
            <Form.Control onChange={this.changeUserName} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>{this.context.t("Last_Name")}</Form.Label>
            <Form.Control onChange={this.changeUserLastName} />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>{this.context.t("Nick_Name")}</Form.Label>
            <Form.Control onChange={this.changeUserNickName} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>{this.context.t("Address")}</Form.Label>
            <Form.Control onChange={this.changeUserAddress} />
          </Form.Group>
          
          <Button variant="primary" 
                  type="submit" 
                  onClick={() => this.props.updateUser (
                                                        this.props.userFirstName,
                                                        this.props.userLastName, 
                                                        this.props.userNickName, 
                                                        this.props.userAddress
                                                        )}>
                  {this.context.t("Submit")}
          </Button>
        </Form>
        
      </>
    );
  }
}

UpdateUserForm.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({
   userFirstName: state.user.userName,
   userLastName: state.user.lastName,
   userNickName: state.user.nickName,
   userAddress: state.user.address
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (name, lastname, nickname, address) => {
        dispatch(userOperations.updateUser(name, lastname, nickname, address));
    },
    getFirstName: username => {
      dispatch({
        type: types.GET_FIRST_NAME,
        payload: username
      })
    },
    getLastName: lastname => {
      dispatch({
        type: types.GET_LAST_NAME,
        payload: lastname
      })
    },
    getNickName: nickname => {
      dispatch({
        type: types.GET_NICK_NAME,
        payload: nickname
      })
    },
    getAddress: address => {
      dispatch({
        type: types.GET_ADDRESS,
        payload: address
      })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserForm);