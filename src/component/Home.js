import React from 'react';
import PropTypes from 'prop-types';
import ArticleThumbnail from './ArticleThumbnail';

const Home = ({articles, user}) => {
    return (
        <>
            {articles && articles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} thumbnail={true} user={user}></ArticleThumbnail>
            )}
        </>
    );
};

export default Home;

Home.propTypes = {
    user:     PropTypes.string,
    articles: PropTypes.array
};
