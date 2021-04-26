import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ArticleThumbnail from './ArticleThumbnail';

const Home = ({articles, user, page, newPage, oldPage}) => {
    const filteredArticles = articles.slice(page * 4, (page * 4) + 4);
    return (
        <>
            {filteredArticles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} thumbnail={true} user={user}></ArticleThumbnail>
            )}
            <nav className="blog-pagination float-right">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    disabled={page === 0}
                    onClick={() => oldPage()}>
                    Older Articles
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    disabled={page >= Math.ceil(articles.length / 4) - 1}
                    onClick={() => newPage()}>
                    Newer Articles
                </button>
            </nav>
        </>
    );
};

const mapStateToProps = state => ({
    page: state.page
});

const mapDispatchToProps = dispatch => ({
    newPage: () => dispatch({type: 'NEW_PAGE'}),
    oldPage: () => dispatch({type: 'OLD_PAGE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
    user:     PropTypes.string,
    articles: PropTypes.array,
    page:     PropTypes.number,
    newPage:  PropTypes.func,
    oldPage:  PropTypes.func
};
