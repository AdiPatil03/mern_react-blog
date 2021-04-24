import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router-dom';

const ArticleThumbnail = ({thumbnail, article, user, setEdit}) => {
    if (_.isUndefined(article.title)) {
        return null;
    }
    return (
        <>
            {thumbnail
                ? <Link to={`/article/${article.slug}`}>
                    <h2 className="blog-post-title">{article.title}</h2>
                </Link>
                : <h2 className="blog-post-title">{article.title}</h2>
            }
            <p className="blog-post-meta">{article.createdAt} by {article.author}</p>
            <p>{article.tags.map((tag, key) =>
                <span key={key} className="badge badge-pill badge-info">{tag}</span>
            )}</p>

            <p className="text-justify blog-post-body">{article.body}</p>
            {!thumbnail && user === article.author
                ? <button onClick={setEdit} className="btn btn-link float-right">Edit Article &raquo;</button>
                : ''}
        </>
    );
};

ArticleThumbnail.propTypes = {
    user:      PropTypes.string,
    setEdit:   PropTypes.func,
    thumbnail: PropTypes.bool,
    article:   PropTypes.shape({
        slug:      PropTypes.string,
        title:     PropTypes.string,
        createdAt: PropTypes.string,
        author:    PropTypes.string,
        tags:      PropTypes.array,
        body:      PropTypes.string
    }).isRequired
};

export default ArticleThumbnail;
