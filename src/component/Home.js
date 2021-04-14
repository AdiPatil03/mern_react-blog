import React from 'react';
import PropTypes from 'prop-types';
import PostThumbnail from './PostThumbnail';

const Home = ({posts}) => (
    <>
        {posts.map((post, key) =>
            <PostThumbnail key={key} post={post} thumbnail={true}></PostThumbnail>
        )}
    </>
);

export default Home;

Home.propTypes = {
    posts: PropTypes.array
};
