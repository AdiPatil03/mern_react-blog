import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import i18n from '../i18n';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {ReactComponent as TranslateSVG} from '../resources/icon/translate.svg';
import {ReactComponent as HamburgerSVG} from '../resources/icon/hamburger.svg';
import {ReactComponent as SunSVG} from '../resources/icon/sun.svg';
import {ReactComponent as MoonSVG} from '../resources/icon/moon.svg';

const initialNavigation = {
    logInMenu: [
        {
            title:  'navigation.home',
            linkTo: '/',
            state:  'active'
        },
        {
            title:  'navigation.create-article',
            linkTo: '/create-article',
            state:  'inActive'
        },
        {
            title:  'navigation.log-out',
            linkTo: '/logout',
            state:  'inActive'
        }
    ],
    logOutMenu: [
        {
            title:  'navigation.home',
            linkTo: '/',
            state:  'active'
        },
        {
            title:  'navigation.log-in',
            linkTo: '/login',
            state:  'inActive'
        },
        {
            title:  'navigation.sign-up',
            linkTo: '/signup',
            state:  'inActive'
        },
    ]
};

const Navigation = ({user, setUser, setBanner}) => {
    const {t} = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const [language, setLanguage] = useState('English');
    const [navCollapse, setNavCollapse] = useState(false);
    const [dropdownState, setDropdownState] = useState(false);
    const [navigation, setNavigation] = useState(initialNavigation);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        switch (location.pathname) {
            case '/logout': {
                sessionStorage.removeItem('username');
                setUser('');
                history.push({
                    pathname: '/'
                });
                break;
            }
            default : {
                const logInMenu = navigation.logInMenu.map(nav => {
                    if (nav.linkTo === location.pathname) {
                        nav.state = 'active';
                    } else {
                        nav.state = 'inActive';
                    }
                    return nav;
                });
                const logOutMenu = navigation.logOutMenu.map(nav => {
                    if (nav.linkTo === location.pathname) {
                        nav.state = 'active';
                    } else {
                        nav.state = 'inActive';
                    }
                    return nav;
                });

                setNavigation({logInMenu, logOutMenu});
                setBanner({});
                break;
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        if (dropdownState) {
            document.getElementById('dropdownMenu').classList.add('show');
        } else {
            document.getElementById('dropdownMenu').classList.remove('show');
        }
    }, [dropdownState]);

    useEffect(() => {
        if (navCollapse) {
            document.getElementById('navbarTogglerDemo03').classList.add('show');
        } else {
            document.getElementById('navbarTogglerDemo03').classList.remove('show');
        }
    }, [navCollapse]);

    const setDarkMode = event => {
        if (dark) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
        setDark(!dark);
        event.preventDefault();
    };

    const changeLanguage = (lng) => {
        let newLanguage = '';
        switch (lng) {
            case 'en': {
                newLanguage = 'English';
                break;
            }
            case 'ma': {
                newLanguage = 'Marathi';
                break;
            }
            case 'hi': {
                newLanguage = 'Hindi';
                break;
            }
            default: {
                newLanguage = 'English';
                break;
            }
        }

        setLanguage(newLanguage);
        setDropdownState(prevState => !prevState);
        i18n.changeLanguage(lng);
        document.getElementById('dropdownMenu').classList.remove('show');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Aditya&rsquo;s Blogs</a>
                <button
                    className="navbar-toggler"
                    onClick={() => setNavCollapse(prevState => !prevState)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <HamburgerSVG/>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {user !== ''
                            ? navigation.logInMenu.map((nav, key) => (
                                <li key={key} className="nav-item">
                                    <Link
                                        className={nav.state === 'active' ? 'nav-link active' : 'nav-link'}
                                        to={nav.linkTo}>
                                        {t(nav.title)}
                                    </Link>
                                </li>
                            ))
                            : navigation.logOutMenu.map((nav, key) => (
                                <li key={key} className="nav-item">
                                    <Link
                                        className={nav.state === 'active' ? 'nav-link active' : 'nav-link'}
                                        to={nav.linkTo}>
                                        {t(nav.title)}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <form className="form-inline">
                        <TranslateSVG/>
                        <div className="dropdown">
                            <button
                                className="btn btn-transparent dropdown-toggle"
                                onClick={() => setDropdownState(prevState => !prevState)}
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {language}
                            </button>
                            <div className="dropdown-menu" id="dropdownMenu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => changeLanguage('en')} href="#">English</a>
                                <a className="dropdown-item" onClick={() => changeLanguage('ma')} href="#">Marathi</a>
                                <a className="dropdown-item" onClick={() => changeLanguage('hi')} href="#">Hindi</a>
                            </div>
                        </div>
                    </form>
                    <form className="form-inline">
                        <button onClick={e => setDarkMode(e)} className="btn btn-link">
                            {dark
                                ? <SunSVG/>
                                : <MoonSVG/>
                            }
                        </button>
                    </form>
                </div>
            </nav>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setUser:   item => dispatch({type: 'SET_USER', item}),
    setBanner: item => dispatch({type: 'SET_BANNER', item})
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

Navigation.propTypes = {
    user:      PropTypes.string,
    setUser:   PropTypes.func,
    setBanner: PropTypes.func
};
