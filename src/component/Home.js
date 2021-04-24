import React from 'react';
import PropTypes from 'prop-types';
import ArticleThumbnail from './ArticleThumbnail';

const Home = ({articles, user, page}) => {
    const filteredArticles = articles.slice(page * 4, (page * 4) + 4);
    return (
        <>
            {filteredArticles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} thumbnail={true} user={user}></ArticleThumbnail>
            )}
        </>
    );
};

export default Home;

Home.propTypes = {
    user:     PropTypes.string,
    articles: PropTypes.array,
    page:     PropTypes.number
};
