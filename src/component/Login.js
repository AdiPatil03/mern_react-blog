import React from 'react';
import PropTypes from 'prop-types';
import {Translation} from 'react-i18next';
import {AuthService} from '../common/services/auth-service';
import Banner from './Banner';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            username: '',
            password: '',
            banner:   {}
        };
    }

    submit = event => {
        this.authService.login({
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
                banner:   {
                    type:    'danger',
                    message: error.message
                }
            });
        });
        event.preventDefault();
    }

    handleUserNameChange = event => {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    }

    render = () => {
        const translate = (word) => (
            <Translation>
                {
                    (t, {i18n}) => t(word)
                }
            </Translation>
        );
        return (
            <>
                <Banner banner={this.state.banner}/>
                <form style={{marginTop: '50px'}} className="offset-md-2 col-md-9" onSubmit={this.submit}>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">{translate('login.user-name')}:</label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.handleUserNameChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">{translate('login.password')}:</label>
                        <div className="col-sm-6">
                            <input
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary float-right">{translate('nav-bar.log-in')}</button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

Login.propTypes = {
    setLoggedIn: PropTypes.func,
    history:     PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};
