import React from 'react';
import PropTypes from 'prop-types';
import PostThumbnail from './PostThumbnail';

const Home = ({posts, currentUser}) => (
    <>
        {posts.map((post, key) =>
            <PostThumbnail key={key} post={post} thumbnail={true} currentUser={currentUser}></PostThumbnail>
        )}
    </>
);

export default Home;

Home.propTypes = {
    posts:       PropTypes.array,
    currentUser: PropTypes.string
};
