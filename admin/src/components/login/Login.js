import React, { Component } from 'react';
import {handleInputChange} from "../../utils/utils";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (evt) => {
    this.setState(handleInputChange(evt));
  };

  handleSubmit = (evt) => {

  };

  render(){
    const {username, password} = this.state;
    return(
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id='username' name='username' value={username} onChange={this.handleInputChange}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' value={password} onChange={this.handleInputChange} />
        </div>
        <input type="button" value='Send' onClick={this.handleSubmit} />
      </div>
    )
  }
}

export default Login;