import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import _ from 'lodash';
import APIService from '../common/services/api-service';
import {usernameRegex, passwordRegex} from '../common/Regexpattern';

const SignUp = ({banner, setBanner}) => {
    const history = useHistory();
    const {t} = useTranslation();
    const apiService = new APIService();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPwd, setCPwd] = useState('');

    useEffect(() => {
        if (username !== '') {
            if (usernameRegex.test(username)) {
                setBanner({});
            } else {
                setBanner({
                    type:    'danger',
                    message: t('error.username')
                });
            }
        }
    }, [username]);

    useEffect(() => {
        if (password !== '') {
            if (passwordRegex.test(password)) {
                setBanner({});
            } else {
                setBanner({
                    type:    'danger',
                    message: t('error.password')
                });
            }
        }
    }, [password]);

    useEffect(() => {
        if (cPwd !== '') {
            if (password !== cPwd) {
                setBanner({
                    type:    'danger',
                    message: t('error.both-password-match')
                });
            } else {
                setBanner({});
            }
        }
    }, [cPwd]);

    const submit = event => {
        const data = {username, password};

        if (!_.isEmpty(username) && !_.isEmpty(password)) {
            apiService.signup(data)
            .then(() => {
                setUsername('');
                setPassword('');
                setCPwd('');
                setBanner({
                    type:    'info',
                    message: t('info.login')
                });
                setTimeout(() =>
                    history.push({
                        pathname: '/login'
                    }), 2000);
            })
            .catch(error => {
                setUsername('');
                setPassword('');
                setCPwd('');
                setBanner({
                    type:    'danger',
                    message: t(`error.${error.message}`)
                });
            });
        } else {
            setBanner({
                type:    'danger',
                message: t('error.fill-form')
            });
        }

        event.preventDefault();
    };

    return (
        <>
            <form className="offset-md-2 col-md-10 form-style" onSubmit={e => submit(e)}>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">{t('signup.user-name')}:</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={e => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">{t('signup.password')}:</label>
                    <div className="col-sm-6">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">{t('signup.confirm-password')}:</label>
                    <div className="col-sm-6">
                        <input
                            type="password"
                            className="form-control"
                            value={cPwd}
                            onChange={e => setCPwd(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button
                            type="submit"
                            className="btn btn-primary float-right"
                            disabled={banner.type}>
                            {t('navigation.sign-up')}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

const mapStateToProps = state => ({
    banner: state.banner
});

const mapDispatchToProps = dispatch => ({
    setBanner: item => dispatch({type: 'SET_BANNER', item})
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
    banner: PropTypes.shape({
        type:    PropTypes.string,
        message: PropTypes.string
    }),
    setBanner: PropTypes.func
};
