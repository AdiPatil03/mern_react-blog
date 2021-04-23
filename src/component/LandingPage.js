import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Navigation from './Navigation';
import APIServices from '../common/services/api-service';
import Home from './Home';
import Login from './Login';
import ArticleForm from './ArticleForm';
import SignUp from './SignUp';
import Article from './Article';
import Tag from './Tag';
import Archive from './Archive';
import Sidebar from './Sidebar';
import Banner from './Banner';

import UserContext from './UserContext';

const LandingPage = ({tags, archives, user, banner, addArchives, addTags, setBanner}) => {
    const apiServices = new APIServices();
    const {t} = useTranslation();
    const [articles, setArticles] = useState([]);
    const location = window.location.pathname;

    useEffect(() => {
        apiServices.allArticlesPreviews()
        .then(response => {
            setArticles(response.previews);
            addArchives(response.archives);
            addTags(response.tags);
        }).catch(error => setBanner({
            type:    'danger',
            message: t(`error.${error.message}`)
        }));
    }, [location]);

    const homeComponent = () => (<Home articles={articles} user={user}/>);

    return (
        <>
            <Router>
                <UserContext.Provider value={user}>
                    <div className="container">
                        <Navigation/>
                    </div>

                    <main role="main" className="container">
                        <div className="row">
                            <div className="col-md-8 blog-main">
                                <div className="blog-post">
                                    <Banner banner={banner}/>
                                    <Switch>
                                        <Route path="/" render={homeComponent} exact/>
                                        <Route path="/login" component={Login}/>
                                        <Route path="/article/:slug" component={Article}/>
                                        <Route path="/tags/:tag" component={Tag}/>
                                        <Route path="/archives/:archive" component={Archive}/>
                                        <Route path="/create-article" component={ArticleForm}/>
                                        <Route path="/signup" component={SignUp}/>
                                    </Switch>
                                </div>
                            </div>

                            <Sidebar user={user} tags={tags} archives={archives}/>
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
};

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    addArchives: item => dispatch({type: 'ADD_ARCHIVES', item}),
    addTags:     item => dispatch({type: 'ADD_TAGS', item}),
    setBanner:   item => dispatch({type: 'SET_BANNER', item})
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

LandingPage.propTypes = {
    archives: PropTypes.array,
    tags:     PropTypes.array,
    user:     PropTypes.string,
    banner:   PropTypes.shape({
        type:    PropTypes.string,
        message: PropTypes.string
    }),
    addArchives: PropTypes.func,
    addTags:     PropTypes.func,
    setBanner:   PropTypes.func
};
