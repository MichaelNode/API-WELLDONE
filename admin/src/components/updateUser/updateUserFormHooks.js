import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userOperations } from '../../store/user';
import {handleInputChange} from '../../utils/utils';

function UpdateUserFormHooks (props, context) {

  const {name, last_name, nick_name, address} = props.userData 

  const [nameUpdated, setName] = useState(name)
  const [last_nameUpdated, setLastName] = useState(last_name)
  const [nick_nameUpdated, setNickName] = useState(nick_name)
  const [addressUpdated, setAddress] = useState(address)

  function submit(e){
    e.preventDefault()
    props.updateUser (nameUpdated, last_nameUpdated, nick_nameUpdated, addressUpdated)
  }
  
    return (
      <>
        <Form className="update-form" 
              onSubmit={submit}>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>{context.t("First_Name")}</Form.Label>
            <Form.Control type="text" $
                          name='name'
                          onChange={(e) => {
                            setName(e.target.value)
                          }} 
                          value={nameUpdated} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>{context.t("Last_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='last_name'
                          onChange={(e) => {
                            setLastName(e.target.value)
                          }} 
                          value={last_nameUpdated} />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>{context.t("Nick_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='nick_name'
                          onChange={(e) => {
                            setNickName(e.target.value)
                          }} 
                          value={nick_nameUpdated} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>{context.t("Address")}</Form.Label>
            <Form.Control type="text" 
                          name='address'
                          onChange={(e) => {
                            setAddress(e.target.value)
                          }} 
                          value={addressUpdated} />
          </Form.Group>
          
          <Button variant="primary" 
                  type="submit">
                  {context.t("Submit")}
          </Button>
        </Form>
        
      </>
    );
  }


UpdateUserFormHooks.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({
   userData: state.user.userData
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (name, lastname, nickname, address) => {
        dispatch(userOperations.updateUser(name, lastname, nickname, address));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserFormHooks);