import React from 'react';
import PropTypes from 'prop-types';
import {Translation} from 'react-i18next';
import APIService from '../common/services/api-service';
import Banner from './Banner';
import Regexpattern from '../common/Regexpattern';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.apiService = new APIService();
        this.regex = Regexpattern();
        this.state = {
            username: '',
            password: '',
            cPwd:     '',
            banner:   {}
        };
    }

    submit = (event) => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        this.apiService.signup(data)
        .then(data => {
            this.props.setLoggedIn(data.user);
            this.props.history.push({
                pathname: '/'
            });
        })
        .catch(error => {
            this.setState({
                username: '',
                password: '',
                cPwd:     '',
                banner:   {
                    type:    'danger',
                    message: error.message
                }
            });
        });

        event.preventDefault();
    }

    handleUserNameChange = (event) => {
        let value = event.target.value;
        if (this.regex.usernameRegex.test(value)) {
            this.setState({
                username: value,
                banner:   {}
            });
        } else {
            this.setState({
                banner: {
                    type:    'danger',
                    message: 'Only alpha-numeric username is allowed!'
                }
            });
        }
    }

    handlePasswordChange = (event) => {
        let pwd = event.target.value;
        if (this.state.cPwd.length > 0) {
            this.setState({
                cPwd: ''
            });
        }
        if (this.regex.passwordRegex.test(pwd)) {
            this.setState({
                banner:   {},
                cPwd:     '',
                password: pwd
            });
        } else {
            this.setState({
                banner: {
                    type:    'danger',
                    message: 'Password must have atleast 1 special character with 6 to 16 charactes in length'
                },
                password: pwd
            });
        }
    }

    handleCPWDChange = (event) => {
        let cPwd = event.target.value;
        if (this.state.password !== cPwd) {
            this.setState({
                banner: {
                    type:    'danger',
                    message: 'Both passwords do not match'
                },
                cPwd
            });
        } else {
            this.setState({
                banner: {},
                cPwd
            });
        }
    }

    render = () => {
        const translate = (word) => (<Translation>{(t, {i18n}) => t(word)}</Translation>);
        return (
            <>
                <Banner banner={this.state.banner}/>
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
                            <input
                                type="password"
                                className="form-control"
                                value={this.state.cPwd}
                                onChange={this.handleCPWDChange}/>
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
