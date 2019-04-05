import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { userOperations } from '../../store/user';
import {handleInputChange} from '../../utils/utils';
import { TwitterPicker } from 'react-color';

function UpdateUserForm (props, context) {

  const {name, last_name, nick_name, address, description} = props.userData 

  const [nameUpdated, setName] = useState(name)
  const [last_nameUpdated, setLastName] = useState(last_name)
  const [nick_nameUpdated, setNickName] = useState(nick_name)
  const [addressUpdated, setAddress] = useState(address)
  const [color, setColor] = useState('')
  const [descriptionUpdated, setDescription] = useState(description)
  const [selectedFile, setSelectedFile] = useState(null)

  function submit(e){
    e.preventDefault()
    props.updateUser (nameUpdated, last_nameUpdated, nick_nameUpdated, addressUpdated, color, descriptionUpdated, selectedFile)
  }
  
    return (
      <>
        <Form className="update-form" 
              onSubmit={submit}>

          <Form.Group  controlId="formGridAddress1">
            <Form.Label>{context.t("First_Name")}</Form.Label>
            <Form.Control type="text"
                          name='name'
                          onChange={(e) => {
                            setName(e.target.value)
                          }} 
                          value={nameUpdated} />
          </Form.Group>

          <Form.Group  controlId="formGridAddress2">
            <Form.Label>{context.t("Last_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='last_name'
                          onChange={(e) => {
                            setLastName(e.target.value)
                          }} 
                          value={last_nameUpdated} />
          </Form.Group>

          <Form.Group  controlId="formGridAddress1">
            <Form.Label>{context.t("Nick_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='nick_name'
                          onChange={(e) => {
                            setNickName(e.target.value)
                          }} 
                          value={nick_nameUpdated} />
          </Form.Group>

          <Form.Group  controlId="formGridAddress2">
            <Form.Label>{context.t("Address")}</Form.Label>
            <Form.Control type="text" 
                          name='address'
                          onChange={(e) => {
                            setAddress(e.target.value)
                          }} 
                          value={addressUpdated} />
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="formGridAddress2">
            <Form.Label>{context.t("Pick_Color")}</Form.Label>
            <TwitterPicker
                    color={ color }
                    onChangeComplete={(color) => {
                      setColor(color.hex)
                    }} 
                  />
    
          </Form.Group>

          <Form.Group  controlId="formGridAddress2">
            <Form.Label>{context.t("Write_Description")}</Form.Label>
            <Form.Control as="textarea" 
                          size="lg"
                          name="description"
                          maxLength="500"
                          value={descriptionUpdated}
                          onChange={(e) => {
                            setDescription(e.target.value)
                          }} />
          </Form.Group>     

        <Form.Group  controlId="formGridAddress2">
          <Form.Label>{context.t("Choose_Image")}</Form.Label>
            <Form.Control type="file" 
                          onChange={(e) => {
                            setSelectedFile(e.target.files[0])
                          }} />
          </Form.Group>    

          <Button variant="primary" 
                  type="submit">
                  {context.t("Submit")}
          </Button>
         <div>
          <span>{context.t(props.message)}</span>
         </div>             

        </Form>
      </>
    );
  }


UpdateUserForm.contextTypes = {
  t: PropTypes.func
};

const mapStateToProps = state => ({
   userData: state.user.userData,
   message: state.user.message
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (name, lastname, nickname, address, color, description, selectedFile) => {
        dispatch(userOperations.updateUser(name, lastname, nickname, address, color, description, selectedFile));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserForm);