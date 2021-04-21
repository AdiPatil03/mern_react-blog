import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import _ from 'lodash';

import NavBar from './NavBar';
import APIServices from '../common/services/api-service';
import Home from './Home';
import Login from './Login';
import ArticleForm from './ArticleForm';
import SignUp from './SignUp';
import Article from './Article';
import Tag from './Tag';
import Archive from './Archive';
import Sidebar from './Sidebar';
import UserContext from './UserContext';

export default class LandingPage extends React.Component {

    constructor() {
        super();
        this.apiServices = new APIServices();
        this.state = {
            tags:        [],
            currentUser: '',
            navbar:      'home',
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        let currentUser = sessionStorage.getItem('username');
        if (!_.isNull(currentUser)) {
            this.setState({
                currentUser
            });
        }
        this.setNavbarOnLoad();
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    setLoggedIn = user => {
        sessionStorage.setItem('username', user);
        this.setState({
            currentUser: user,
            navbar:      'home'
        });
    }

    setTags = tags => {
        this.setState({
            tags
        });
    }

    clearLoggedIn = () => {
        sessionStorage.removeItem('username');
        this.setState({
            currentUser: ''
        });
    }

    setNavbar = navbar => {
        this.setState({
            navbar
        });
    }

    setNavbarOnLoad = () => {
        let pathname = window.location.pathname;
        let index = pathname.lastIndexOf('/');
        let nav = pathname.substr(1);

        if (index > 0) {
            nav = pathname.substr(1, index - 1);
        }

        if (_.isEmpty(nav) || nav === 'article') {
            nav = 'home';
        }
        this.setState({
            navbar: nav
        });
    }

    render = () => {
        const loginComponent = (props) => (<Login setLoggedIn={this.setLoggedIn} {...props}/>);
        const signupComponent = (props) => (<SignUp setLoggedIn={this.setLoggedIn} {...props}/>);
        const articleFormComponent = (props) => (<ArticleForm previousTags={this.state.tags} {...props}/>);
        const articleComponent = (props) => (<Article tags={this.state.tags} {...props}/>);

        return (
            <>
                <Router>
                    <UserContext.Provider value={this.state.currentUser}>
                        <div className="container">
                            <NavBar
                                loggedin={this.state.currentUser}
                                clearLoggedIn={this.clearLoggedIn}
                                navbar={this.state.navbar}
                                setNavbar={this.setNavbar}/>
                        </div>

                        <main role="main" className="container">
                            <div className="row">
                                <div className="col-md-8 blog-main">
                                    <div className="blog-post">
                                        <Switch>
                                            <Route path="/" component={Home} exact/>
                                            <Route path="/login" render={loginComponent}/>
                                            <Route path="/article/:slug" render={articleComponent}/>
                                            <Route path="/tags/:tag" component={Tag}/>
                                            <Route path="/archives/:archive" component={Archive}/>
                                            <Route path="/create-article" render={articleFormComponent}/>
                                            <Route path="/signup" render={signupComponent}/>
                                        </Switch>
                                    </div>
                                </div>

                                <Sidebar setHomeTags={this.setTags}/>
                            </div>
                        </main>

                        <footer className="blog-footer">
                            <p>
                                <a href="#">Back to top</a>
                            </p>
                        </footer>
                    </UserContext.Provider>
                </Router>
            </>
        );
    }
}
