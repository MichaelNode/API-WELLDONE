// Dependencies
import React, {Component} from 'react';
import {handleInputChange} from "../../utils/utils";
import {connect} from 'react-redux';
import {userOperations} from '../../store/user';
import PropTypes from 'prop-types'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        }
    }

    /**
     * Change inputs value on change
     * @param evt
     */
    handleInputChange = (evt) => {
        this.setState(handleInputChange(evt));
    };

    /**
     * @return {boolean} true if is valid
     */
    checkEmail() {
        return !!this.state.email;
    }

    /**
     * @return {boolean} true if is valid
     */
    checkPassword() {
        return !!this.state.password;
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        let errors = false;

        // check if email is valid
        if (!this.checkEmail()) {
            this.setState({emailError: 'error_email'});
            errors = true;
        }else{
            this.setState({emailError: ''});
        }

        // check if password is valid
        if (!this.checkPassword()) {
            this.setState({passwordError: 'error_password'});
            errors = true;
        }else{
            this.setState({passwordError: ''});
        }

        if (errors) return;

        this.props.login(this.state.email, this.state.password);
    };

    render() {
        const {email, password} = this.state;
        console.log(this.props.error);
        return (
            <div>
                {
                    this.props.error &&
                    <span className="error">{this.props.error}</span>
                }
                <form class="form-inline">
                    <div className="form-group">
                        <label htmlFor="email">{this.context.t('Email')}</label>
                        <div className="col">
                            <input type="text" className="form-control mx-sm-3" id='email' name='email' value={email}
                                onChange={this.handleInputChange}/>
                            {this.state.emailError &&
                            <span className="error">{this.context.t(this.state.emailError)}</span>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{this.context.t('Password')}</label>
                        <input type="password" className="form-control mx-sm-3" id='password' name='password' value={password}
                            onChange={this.handleInputChange}/>
                        {this.state.passwordError &&
                        <span className="error">{this.context.t(this.state.passwordError)}</span>
                        }
                    </div>
                    <input type="button" className="btn btn-primary" value='Login' onClick={this.handleSubmit}/>
                </form>
            </div>
                
        )
    }
}

Login.contextTypes = {
    t: PropTypes.func
};

export default connect(
    (state, props) => ({
        error: state.user.error
    }),
    (dispatch) => ({
        login: (email, password) => dispatch(userOperations.auth(email, password))
    }))(Login);
