import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userOperations } from '../../store/user';
import {handleInputChange} from '../../utils/utils';

class UpdateUserForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        name: '',
        last_name:'',
        nick_name: '',
        address: ''
    }
}

componentDidMount() {
  const {name, last_name, nick_name, address} = this.props.userData

  this.setState({ name });
  this.setState({ last_name });
  this.setState({ nick_name });
  this.setState({ address });
}
  
handleInputChange = (evt) => {
  this.setState(handleInputChange(evt));
};


  render() {
    const {name, last_name, nick_name, address} = this.state
    return (
      <>
        <Form className="update-form" >

          <Form.Group controlId="formGridAddress1">
            <Form.Label>{this.context.t("First_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='name'
                          onChange={this.handleInputChange} 
                          value={name} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>{this.context.t("Last_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='last_name'
                          onChange={this.handleInputChange} 
                          value={last_name} />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>{this.context.t("Nick_Name")}</Form.Label>
            <Form.Control type="text" 
                          name='nick_name'
                          onChange={this.handleInputChange} 
                          value={nick_name} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>{this.context.t("Address")}</Form.Label>
            <Form.Control type="text" 
                          name='address'
                          onChange={this.handleInputChange} 
                          value={address} />
          </Form.Group>
          
          <Button variant="primary" 
                  type="submit" 
                  onClick={() => this.props.updateUser (name, last_name, nick_name, address)}>
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
)(UpdateUserForm);