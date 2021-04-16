import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import {Translation} from 'react-i18next';
import _ from 'lodash';

import Header from './Header';
import NavBar from './NavBar';
import PostService from '../common/services/post-service';
import Home from './Home';
import Login from './Login';
import PostForm from './PostForm';
import SignUp from './SignUp';
import Post from './Post';
import Tag from './Tag';
import Archive from './Archive';
import Banner from './Banner';

/* eslint-disable */
export default class LandingPage extends React.Component {

    constructor(){
        super();
        this.postService = new PostService();
        this.state = {
            archives:    [],
            tags:        [],
            posts:       [],
            currentUser: '',
            navbar:      'home',
            banner:      {}
        };
    }
    
    componentDidMount = () => {    
        this._isMounted = true;    
        this.postService.allArchives().then(data => {
            if (this._isMounted) {
                this.setState({
                    archives: data.archives
                });
            }
        }).catch(error => {
            if (this._isMounted) {
                this.setState({
                    banner: {
                        type:    'danger',
                        message: error.message
                    }
                });
            }
        });       
        this.postService.allTags().then(data => {
            if (this._isMounted) {
                this.setState({
                    tags: data.tags
                });
            }
        }).catch(error => {
            if (this._isMounted) {
                this.setState({
                    banner: {
                        type:    'danger',
                        message: error.message
                    }
                });
            }
        });
        this.postService.allPostPreviews().then(data => {
            if (this._isMounted) {
                this.setState({
                    posts: data.posts
                });
            }
        }).catch(error => {
            if (this._isMounted) {
                this.setState({
                    banner: {
                        type:    'danger',
                        message: error.message
                    }
                });
            }
        });
        this.setNavbarOnLoad();
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    setLoggedIn = user => {
        this.setState({
            currentUser: user,
            navbar: 'home'
        });
    }

    clearLoggedIn = () => {
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

        if (_.isEmpty(nav) || nav === 'post') {
            nav = 'home';
        }
        this.setState({
            navbar: nav
        });
    }

    render = () => {        
        const translate = (word) => (<Translation>{(t, {i18n}) => t(word)}</Translation>);
        const homeComponent = (props) => <Home posts={this.state.posts} currentUser={this.state.currentUser} {...props}/>
        const loginComponent = (props) => <Login setLoggedIn={this.setLoggedIn} {...props}/>;
        const signupComponent = (props) => <SignUp setLoggedIn={this.setLoggedIn} {...props}/>;
        const postFormComponent = (props) => <PostForm tags={this.state.tags} currentUser={this.state.currentUser} {...props}/>;
        const postComponent = (props) => <Post tags={this.state.tags} currentUser={this.state.currentUser} {...props}/>
        const archiveComponent = (props) => <Archive currentUser={this.state.currentUser} {...props}/>
        const tagComponent = (props) => <Tag currentUser={this.state.currentUser} {...props}/>

        return(
            <>
                <Router>
                    <div className="container">
                    <Header/>
                    <NavBar
                        loggedin={this.state.currentUser ? true : false}
                        clearLoggedIn={this.clearLoggedIn}
                        navbar={this.state.navbar}
                        setNavbar={this.setNavbar}/>
                    </div>
        
                    <main role="main" className="container">
                        <div className="row">
                        <div className="col-md-8 blog-main">
                            <div className="blog-post">
                                <Banner banner={this.state.banner}/>
                                <Switch>
                                    <Route path="/" render={homeComponent} exact/>
                                    <Route path="/login" render={loginComponent}/>
                                    <Route path="/post/:slug" render={postComponent}/>
                                    <Route path="/tags/:tag" render={tagComponent}/>
                                    <Route path="/archives/:archive" render={archiveComponent}/>
                                    <Route path="/create-post" render={postFormComponent}/>
                                    <Route path="/signup" render={signupComponent}/>
                                </Switch>
                            </div>       
                        </div>
            
                        <aside className="col-md-4 blog-sidebar">
                            <p>{translate('home.welcome')}, {this.state.currentUser === '' ? translate('home.guest') : this.state.currentUser}</p>
                            <div className="p-3 mb-3 bg-light rounded">
                            <h4 className="font-italic">{translate('home.tags')}</h4>
                            <p className="mb-0">
                                {this.state.tags && this.state.tags.map((tag, key) => (
                                    <Link key={key} to={`/tags/${tag}`}>
                                        <span className="badge badge-pill badge-info">{tag}</span>
                                    </Link>
                                ))}
                            </p>
                            </div>
            
                            <div className="p-3">
                            <h4 className="font-italic">{translate('home.archives')}</h4>
                            <ol className="list-unstyled mb-0">
                                {this.state.archives && this.state.archives.map((archive, key) => (
                                    <li key={key}>
                                        <Link to={`/archives/${archive}`}>{archive}</Link>
                                    </li>
                                ))}
                            </ol>
                            </div>
            
                            {/* <div className="p-3">
                            <h4 className="font-italic">{translate('home.elsewhere')}</h4>
                            <ol className="list-unstyled">
                                <li><a href="#">GitHub</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Facebook</a></li>
                            </ol>
                            </div> */}
                        </aside>        
                        </div>        
                    </main>
            
                    <footer className="blog-footer">
                        <p>
                        <a href="#">Back to top</a>
                        </p>
                    </footer>
                </Router>
            </>
        ); 
    }
}
