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

const LandingPage = ({tags, archives, user, banner, page, addArchives, addTags, clearArchives, clearTags, setBanner, newPage, oldPage}) => {
    const apiServices = new APIServices();
    const {t} = useTranslation();
    const [articles, setArticles] = useState([]);
    const location = window.location.pathname;

    useEffect(() => {
        if (location === '/') {
            apiServices.allArticlesPreviews()
            .then(response => {
                setArticles(response.previews);
                addArchives(response.archives);
                addTags(response.tags);
            }).catch(error => {
                if (error.message === 'no-article-written') {
                    setArticles([]);
                    clearArchives();
                    clearTags();
                }
                setBanner({
                    type:    'danger',
                    message: t(`error.${error.message}`)
                });
            });
        }
    }, [location]);

    const homeComponent = () => (<Home articles={articles} user={user} page={page}/>);

    return (
        <>
            <Router>
                <UserContext.Provider value={user}>
                    <div>
                        <Navigation/>
                    </div>

                    <main role="main">
                        <div className="row blog-row">
                            <div className="col-md-8">
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
                                <nav className="blog-pagination">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        disabled={page === 0}
                                        onClick={() => oldPage()}>
                                        Older
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        disabled={page >= Math.floor(articles.length / 4)}
                                        onClick={() => newPage()}>
                                        Newer
                                    </button>
                                </nav>
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
    addArchives:   item => dispatch({type: 'ADD_ARCHIVES', item}),
    addTags:       item => dispatch({type: 'ADD_TAGS', item}),
    clearArchives: item => dispatch({type: 'CLEAR_ARCHIVES'}),
    clearTags:     item => dispatch({type: 'CLEAR_TAGS'}),
    setBanner:     item => dispatch({type: 'SET_BANNER', item}),
    newPage:       () => dispatch({type: 'NEW_PAGE'}),
    oldPage:       () => dispatch({type: 'OLD_PAGE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

LandingPage.propTypes = {
    archives:      PropTypes.array,
    tags:          PropTypes.array,
    user:          PropTypes.string,
    page:          PropTypes.number,
    addArchives:   PropTypes.func,
    addTags:       PropTypes.func,
    clearArchives: PropTypes.func,
    clearTags:     PropTypes.func,
    setBanner:     PropTypes.func,
    newPage:       PropTypes.func,
    oldPage:       PropTypes.func,
    banner:        PropTypes.shape({
        type:    PropTypes.string,
        message: PropTypes.string
    }),
};
