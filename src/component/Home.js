import React from 'react';
import PropTypes from 'prop-types';
import ArticleThumbnail from './ArticleThumbnail';

const Home = ({articles, currentUser}) => (
    <>
        {articles.map((article, key) =>
            <ArticleThumbnail key={key} article={article} thumbnail={true} currentUser={currentUser}></ArticleThumbnail>
        )}
    </>
);

export default Home;

Home.propTypes = {
    articles:    PropTypes.array,
    currentUser: PropTypes.string
};
