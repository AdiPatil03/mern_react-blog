import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router-dom';

const PostThumbnail = ({thumbnail, post, currentUser, setEdit}) => {
    if (_.isUndefined(post.title)) {
        return null;
    }
    return (
        <>
            {thumbnail
                ? <Link className="p-2 text-muted" to={`/post/${post.slug}`}>
                    <h2 className="blog-post-title">{post.title}</h2>
                </Link>
                : <h2 className="blog-post-title">{post.title}</h2>
            }
            <p className="blog-post-meta">{post.createdAt} by {post.author}</p>
            <p>{post.tags.map((tag, key) =>
                <span key={key} className="badge badge-pill badge-info">{tag}</span>
            )}</p>

            <p className="text-justify">{post.body}</p>
            {!thumbnail && currentUser === post.author
                ? <button onClick={setEdit} className="btn btn-link float-right">Edit Post &raquo;</button>
                : ''}
        </>
    );
};

PostThumbnail.propTypes = {
    currentUser: PropTypes.string,
    setEdit:     PropTypes.func,
    thumbnail:   PropTypes.bool,
    post:        PropTypes.shape({
        slug:      PropTypes.string,
        title:     PropTypes.string,
        createdAt: PropTypes.string,
        author:    PropTypes.string,
        tags:      PropTypes.array,
        body:      PropTypes.string
    }).isRequired
};

export default PostThumbnail;
