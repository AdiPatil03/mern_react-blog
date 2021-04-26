import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import APIService from '../common/services/api-service';

const Login = ({setUser, setBanner}) => {
    const apiService = new APIService();
    const history = useHistory();
    const {t} = useTranslation();
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const submit = event => {
        const data = {username, password};

        if (!_.isEmpty(username) && !_.isEmpty(password)) {
            apiService.login(data)
            .then(resp => {
                setUser(resp.user);
                history.push({
                    pathname: '/'
                });
            })
            .catch(error => {
                setusername('');
                setPassword('');
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
                    <label className="col-sm-4 col-form-label">{t('login.user-name')}:</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={e => setusername(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">{t('login.password')}:</label>
                    <div className="col-sm-6">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary float-right">{t('navigation.log-in')}</button>
                    </div>
                </div>
            </form>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    setUser:   item => dispatch({type: 'SET_USER', item}),
    setBanner: item => dispatch({type: 'SET_BANNER', item})
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
    setUser:   PropTypes.func,
    setBanner: PropTypes.func
};
