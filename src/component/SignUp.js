import React from 'react';
import PropTypes from 'prop-types';
import {Translation} from 'react-i18next';
import {AuthService} from '../common/services/auth-service';
import Error from './Error';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            username: '',
            password: '',
            cPwd:     '',
            error:    ''
        };
    }

    submit = (event) => {
        this.authService.signup({
            username: this.state.username,
            password: this.state.password
        }).then(() => {
            this.props.setLoggedIn(this.state.username);
            this.props.history.push({
                pathname: '/'
            });
        }).catch(error => {
            this.setState({
                username: '',
                password: '',
                error:    error.message
            });
        });
        event.preventDefault();
    }

    handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        let pwd = event.target.value;
        if (this.state.cPwd && this.state.cPwd !== pwd) {
            this.setState({
                error:    'Both passwords do not match',
                password: pwd
            });
        } else {
            this.setState({
                error:    '',
                password: pwd
            });
        }
    }

    handleCPWDChange = (event) => {
        let cPwd = event.target.value;
        if (this.state.password !== cPwd) {
            this.setState({
                error: 'Both passwords do not match',
                cPwd
            });
        } else {
            this.setState({
                error: '',
                cPwd
            });
        }
    }

    render = () => {
        const translate = (word) => (<Translation>{(t, {i18n}) => t(word)}</Translation>);
        return (
            <>
                <Error error={this.state.error}/>
                <form style={{marginTop: '50px'}} className="offset-md-2 col-md-9" onSubmit={this.submit}>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">{translate('signup.user-name')}:</label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.handleUserNameChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">{translate('signup.password')}:</label>
                        <div className="col-sm-6">
                            <input
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">{translate('signup.confirm-password')}:</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control" onChange={this.handleCPWDChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                                disabled={this.state.error}>
                                {translate('nav-bar.sign-up')}
                            </button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

SignUp.propTypes = {
    setLoggedIn: PropTypes.func,
    history:     PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
};
